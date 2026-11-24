// Cloudflare Worker front for a static site (CDL Agency site-worker template v2, 2026-11-24).
// The static build is served from the ASSETS binding; this file only adds what the old
// Caddy block / Pages did: host canonicalisation, path redirects, headers, and /api-style proxies.
// IDENTICAL ON EVERY SITE — site-specific rules belong in ./site.js.
//
// wrangler.jsonc vars:
//   CANONICAL_HOST  the one indexable host, e.g. "example.com" or "www.example.com"
//   ALIAS_HOSTS     comma list of hosts that 301 to CANONICAL_HOST (e.g. "www.example.com")
// site.js exports: redirect(url) -> Response|null, PROXIES, SECURITY_HEADERS,
//   optional BODY_END_HTML (snippet appended before </body>, e.g. the Web Analytics beacon Pages injected).
// PROXIES entries: { prefix, origin, path?, exact? }
//   prefix '/api/'           -> everything under /api/ (and /api itself)
//   exact: true              -> only that one path
//   path: '/webhook/abc'     -> that one path, rewritten upstream (Caddy `rewrite` + reverse_proxy)
import * as site from './site.js';

const { redirect, PROXIES, SECURITY_HEADERS } = site;

function withHeaders(res) {
  for (const [k, v] of Object.entries(SECURITY_HEADERS || {})) {
    if (!res.headers.has(k)) res.headers.set(k, v);
  }
  return res;
}

function redirectTo(location, status = 301) {
  return withHeaders(new Response(null, { status, headers: { Location: location } }));
}

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
      return redirectTo(url.toString());
    }
    // 2. plain http on the real domain -> https
    if (url.protocol === 'http:' && host === canonical) {
      url.protocol = 'https:';
      return redirectTo(url.toString());
    }
    // 3. site path redirects (ported from Caddy `redir` rules / Pages _redirects extras)
    const r = redirect(url);
    if (r) return withHeaders(new Response(null, { status: r.status, headers: r.headers }));

    // 4. proxies to services that still run on the VPS (forms, APIs)
    for (const p of PROXIES || []) {
      const hit = p.path || p.exact
        ? url.pathname === p.prefix
        : url.pathname === p.prefix.replace(/\/$/, '') || url.pathname.startsWith(p.prefix);
      if (!hit) continue;
      const target = new URL((p.path || url.pathname) + url.search, p.origin);
      const headers = new Headers(request.headers);
      // The origin sees Cloudflare's egress IP; hand it the visitor's IP for rate limits and logs.
      const ip = request.headers.get('CF-Connecting-IP');
      if (ip) {
        headers.set('X-Forwarded-For', ip);
        headers.set('X-Real-IP', ip);
      }
      headers.set('X-Forwarded-Host', host);
      headers.set('X-Forwarded-Proto', 'https');
      return fetch(target.toString(), {
        method: request.method,
        headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
        redirect: 'manual',
      });
    }

    // 5. static files
    let res = await env.ASSETS.fetch(request);
    // Assets answer html_handling fixes (/page -> /page/, /index.html -> /) with a temporary 307;
    // Caddy and Pages sent a permanent 308, which is what search engines should see.
    res = res.status === 307 && res.headers.has('Location')
      ? new Response(null, { status: 308, statusText: 'Permanent Redirect', headers: res.headers })
      : new Response(res.body, res);
    // Pages/Caddy labelled text as UTF-8; assets send a bare type.
    const ct = res.headers.get('Content-Type') || '';
    if (/^text\/(html|plain|css|xml)\b/i.test(ct) && !/charset=/i.test(ct)) {
      res.headers.set('Content-Type', ct + '; charset=utf-8');
    }
    // Assets ignore Range; Caddy answered 206 (iOS Safari will not play an MP4 without it).
    const range = request.headers.get('Range');
    if (range && request.method === 'GET' && res.status === 200) res = await byteRange(res, range, request);
    if (res.status === 200 && !res.headers.has('Accept-Ranges') && !/^text\/html/i.test(ct)) {
      res.headers.set('Accept-Ranges', 'bytes');
    }
    if (site.BODY_END_HTML && res.status === 200 && /^text\/html/i.test(ct) &&
        (request.headers.get('Accept') || '').includes('text/html')) {
      res = new HTMLRewriter()
        .on('body', { element(el) { el.append(site.BODY_END_HTML, { html: true }); } })
        .transform(res);
      res.headers.delete('Content-Length');
    }
    withHeaders(res);
    // previews (workers.dev, customers.cdlagency.com, ...) must never be indexed
    if (host !== canonical) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  },
};

// Single byte range (bytes=a-b, bytes=a-, bytes=-n) -> 206, like Caddy's file_server.
// Multi-range or a stale If-Range falls back to the full 200; an impossible range -> 416.
async function byteRange(res, range, request) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!m || (m[1] === '' && m[2] === '')) return res;
  const ifRange = request.headers.get('If-Range');
  if (ifRange && ifRange !== res.headers.get('ETag') && ifRange !== res.headers.get('Last-Modified')) return res;
  let size = Number(res.headers.get('Content-Length'));
  let body = res.body;
  if (!res.headers.has('Content-Length') || res.headers.has('Content-Encoding')) {
    const buf = await res.arrayBuffer();
    size = buf.byteLength;
    body = buf;
  }
  let start, end;
  if (m[1] === '') {
    start = Math.max(0, size - Number(m[2]));
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  const headers = new Headers(res.headers);
  headers.delete('Content-Encoding');
  if (start >= size || start > end) {
    headers.set('Content-Range', `bytes */${size}`);
    headers.set('Content-Length', '0');
    if (body instanceof ReadableStream) body.cancel();
    return new Response(null, { status: 416, headers });
  }
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  const out = body instanceof ArrayBuffer ? body.slice(start, end + 1) : body.pipeThrough(sliceStream(start, end + 1));
  return new Response(out, { status: 206, headers });
}

// Streams bytes [start, stop) of the source without buffering the whole file.
function sliceStream(start, stop) {
  let pos = 0;
  return new TransformStream({
    transform(chunk, controller) {
      const a = pos, b = pos + chunk.byteLength;
      pos = b;
      if (b <= start || a >= stop) {
        if (a >= stop) controller.terminate();
        return;
      }
      controller.enqueue(chunk.subarray(Math.max(0, start - a), Math.min(chunk.byteLength, stop - a)));
      if (b >= stop) controller.terminate();
    },
  });
}
