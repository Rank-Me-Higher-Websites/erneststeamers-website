// Ernest Steamers entry point. Keeps worker/index.js (the shared site template) untouched and adds
// the two things only this site needs:
//   1. POST /api/leads, ported from the Pages Function functions/api/leads.js
//      (www -> apex from functions/_middleware.js is the template's ALIAS_HOSTS rule).
//   2. Trailing-slash redirects from the asset layer come back as 307; Pages sent 308, so they
//      are re-issued as 308 to keep the live status codes. 404s get Cache-Control: no-store, as on Pages.
import template from './index.js';
import { onRequestPost as leadsPost } from '../functions/api/leads.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const aliases = (env.ALIAS_HOSTS || '').split(',').map((s) => s.trim().toLowerCase());

    // Pages only defined onRequestPost, so GET/OPTIONS/etc. fall through to assets as before.
    if (request.method === 'POST' && url.pathname === '/api/leads' && !aliases.includes(host)) {
      return leadsPost({ request, env, ctx });
    }

    const res = await template.fetch(request, env, ctx);
    if (res.status === 307 && res.headers.has('location')) {
      const out = new Response(res.body, res);
      return new Response(out.body, { status: 308, headers: out.headers });
    }
    // Pages sent its 404 page with Cache-Control: no-store; _headers rules (e.g. the year-long
    // /assets/* cache) must not apply to a not-found response.
    if (res.status === 404) {
      const out = new Response(res.body, res);
      out.headers.set('Cache-Control', 'no-store');
      return out;
    }
    return res;
  },
};
