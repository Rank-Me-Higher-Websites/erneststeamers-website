# Deploy Ernest Steamers on Cloudflare Pages

This repo does not change DNS, the Cloudflare zone, or the Pages project. Create the project in the dashboard and attach the domain there.

## Pages project settings

| Setting | Value |
| --- | --- |
| Git repository | This repository |
| Production branch | `main` (after the Pages pull request is merged) |
| Framework preset | Vite |
| Root directory | `/` (leave the default; the app is at the repo root) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22` (builds on Node 22; Node 20 also works) |

`npm run build` runs `vite build` and then prerenders every route into `dist/`. Pages publishes that directory. Do not set the output directory to `public` or to the repo root.

Pages Functions are picked up from `/functions` automatically. There is no second build step and no Worker deploy command.

## Environment variables

Set this for **Production** and **Preview**. Mark it **Encrypt** (secret). Do not prefix it with `VITE_`.

| Name | Required | Value |
| --- | --- | --- |
| `N8N_LEAD_WEBHOOK` | Yes | The full n8n webhook URL that should receive quote requests |

The browser posts the quote form to `/api/leads`. `functions/api/leads.js` reads `N8N_LEAD_WEBHOOK` from `context.env` and forwards the JSON. A 2xx response from n8n returns `{ok:true}`. If the variable is missing, or n8n returns a non-2xx, the function returns `502`. A non-empty `website` field is a honeypot: the function returns `{ok:true}` and does not call n8n.

Do not set `DATABASE_URL`. Nothing in the Pages build or the Function reads it.

Local check, without committing the URL:

```bash
# .dev.vars (gitignored)
N8N_LEAD_WEBHOOK=https://example.test/webhook
npx wrangler pages dev dist --port 8788 --ip 127.0.0.1
```

`node scripts/test-pages-function.mjs` runs that path against a local mock webhook.

## What the build publishes

| Path | Role |
| --- | --- |
| `dist/index.html`, `dist/about/index.html`, `dist/services/index.html`, `dist/service-areas/index.html`, `dist/blog/index.html`, `dist/blog/<slug>/index.html`, `dist/funnel/index.html` | Prerendered pages. Crawlers see the title, meta description, canonical, NAP, and JSON-LD without JavaScript. |
| `dist/404.html` | Not-found page (from `public/404.html`). |
| `dist/sitemap.xml` | Static sitemap copied from `public/sitemap.xml`. |
| `dist/robots.txt` | Static robots file copied from `public/robots.txt`. It allows `/`, disallows `/funnel`, and points at `https://erneststeamers.com/sitemap.xml`. |
| `dist/_headers` | Content types for the sitemap and robots file, long cache for `/assets/*`, and short cache for HTML. |
| `dist/_redirects` | Does **not** add a `/* /index.html 200` rewrite. Static files already cover every app route. |
| `/api/leads` | Pages Function, not a file in `dist`. |

## Redirects and the SPA

A Vite SPA usually needs this rule so unknown paths load the client router:

```
/*    /index.html   200
```

Do not add it here. Pages serves a matching static file before `_redirects`. Every route in `src/App.tsx` is prerendered, so `/services` is `dist/services/index.html`, not a client-only path. `/sitemap.xml` and `/robots.txt` are real files and must stay those files. A splat rewrite would also answer missing URLs with the homepage and HTTP 200, and Pages would never serve `404.html`.

In-app navigation still uses the React router. A direct request for an unknown URL returns `404.html`.

## Postgres

`serve.js` used to insert each quote into a Postgres `leads` table (`DATABASE_URL`, columns for name, email, phone, address, service, rooms, square footage, preferred date, message, source, user agent, and IP) and then POST the same lead to n8n.

That database was only a second copy of the quote. n8n is the store the business actually uses. The Pages Function does not write to Postgres.

| Option | Why it is not used |
| --- | --- |
| Keep Postgres via Hyperdrive | Would preserve the duplicate log, but the Function would need a database binding and the external database would have to stay up. A failed insert would be a second way for the form to break. |
| Move `leads` to D1 | Would be a new database and a new write path that can drift from n8n. Nothing else in the app reads historical leads. |
| Drop Postgres | The form still delivers the lead to n8n. No `pg` client, no `DATABASE_URL`, no Hyperdrive or D1 binding. |

Postgres is dropped. Do not add a D1 or Hyperdrive binding for this site.

## After the project exists

Attach `erneststeamers.com` in the Pages project when the zone is ready. Do that in Cloudflare, not in this repository.
