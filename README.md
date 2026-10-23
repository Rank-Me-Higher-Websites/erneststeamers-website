# Ernest Steamers

Carpet, rug, and upholstery steam-cleaning lead site for Chicago and the suburbs. Vite and React frontend, with `serve.js` serving the production build and writing quote requests to Postgres.

**NAP:** Ernest Steamers · 630-830-9867 · 10549 Crown Rd #4, Franklin Park, IL 60131

## Environment

Copy `.env.example` to `.env`. Never commit `.env` or a real webhook URL.

| Variable | Where it is read | Required |
| --- | --- | --- |
| `DATABASE_URL` | `serve.js` (`pg` pool for `POST /api/leads`) | Required to store leads |
| `N8N_LEAD_WEBHOOK` | `serve.js` only, after the lead insert | Optional |

`N8N_LEAD_WEBHOOK` is server-side. The quote form posts to `/api/leads`; the browser never sees the webhook. If `N8N_LEAD_WEBHOOK` is unset, or the forward fails, the lead is still saved and the API still returns success. Do not put this URL in client code or in a `VITE_` variable.

Set `N8N_LEAD_WEBHOOK` in the host's environment (for example Replit secrets). This repo does not change deploy targets.

## Scripts

```bash
npm run dev      # Vite dev server
npm run build    # production client build into dist/
npm test         # vitest
node serve.js    # serve dist/ and POST /api/leads on port 5000
```

Production start is `npm run build && node serve.js`.
