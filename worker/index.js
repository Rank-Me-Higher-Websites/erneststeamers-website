// Cloudflare Worker front for a static site (CDL Agency site-worker template, 2026-11-23).
// The static build is served from the ASSETS binding; this file only adds what the old
// Caddy block did: host canonicalisation, path redirects, headers, and /api-style proxies.
//
// wrangler.jsonc vars:
//   CANONICAL_HOST  the one indexable host, e.g. "example.com" or "www.example.com"
//   ALIAS_HOSTS     comma list of hosts that 301 to CANONICAL_HOST (e.g. "www.example.com")
// Site-specific rules live in ./site.js (redirects, proxies, headers) so this file stays identical everywhere.
import { redirect, PROXIES, SECURITY_HEADERS } from './site.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const canonical = (env.CANONICAL_HOST || '').toLowerCase();
    const aliases = (env.ALIAS_HOSTS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    // 1. alias host (usually www <-> apex) -> canonical, keep path + query
    if (aliases.includes(host)) {
      url.hostname = canonical;
      url.protocol = 'https:';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }
    // 2. plain http on the real domain -> https
    if (url.protocol === 'http:' && host === canonical) {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    // 3. site path redirects (ported from Caddy `redir` rules)
    const r = redirect(url);
    if (r) return r;

    // 4. proxies to services that still run on the VPS (forms, APIs)
    for (const p of PROXIES) {
      if (url.pathname === p.prefix.replace(/\/$/, '') || url.pathname.startsWith(p.prefix)) {
        const target = new URL(url.pathname + url.search, p.origin);
        const init = {
          method: request.method,
          headers: new Headers(request.headers),
          body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
          redirect: 'manual',
        };
        init.headers.set('X-Forwarded-Host', host);
        init.headers.set('X-Forwarded-Proto', 'https');
        return fetch(target.toString(), init);
      }
    }

    // 5. static files
    let res = await env.ASSETS.fetch(request);
    res = new Response(res.body, res);
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
      if (!res.headers.has(k)) res.headers.set(k, v);
    }
    // previews (workers.dev, customers.cdlagency.com, ...) must never be indexed
    if (host !== canonical) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  },
};
