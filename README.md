# Ernest Steamers

Carpet, rug, and upholstery steam-cleaning lead site for Chicago and the suburbs. The production build is static HTML for Cloudflare Pages. Quote requests go to n8n through a Pages Function.

**NAP:** Ernest Steamers · 630-830-9867 · 10549 Crown Rd #4, Franklin Park, IL 60131

## Build

```bash
npm run build    # Vite client build, then prerender every route into dist/
npm test         # vitest
npm run dev      # Vite dev server
```

Cloudflare Pages build command: `npm run build`. Output directory: `dist`. This repo does not set DNS or the Pages project.

`npm run build` writes one HTML file per route (`/`, `/services`, `/service-areas`, `/about`, `/blog`, each `/blog/:slug`, and `/funnel`) plus `dist/404.html` from `public/404.html`. Each file includes that page's title, meta description, canonical, NAP, and JSON-LD without requiring JavaScript.

## Quote form

The form posts JSON to `/api/leads`. `functions/api/leads.js` forwards that JSON to n8n.

| Variable | Where it is read | Required |
| --- | --- | --- |
| `N8N_LEAD_WEBHOOK` | Pages Function `context.env` | Required for delivery |

Set `N8N_LEAD_WEBHOOK` as a Pages secret (locally, in `.dev.vars`). Do not commit the URL, and do not put it in client code or a `VITE_` variable. If it is unset, or n8n does not return a 2xx, the function responds with `502`. A filled `website` honeypot is dropped and still returns `{ok:true}`.

Leads are not written to Postgres. n8n is the store.
