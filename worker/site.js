// Site-specific rules for Ernest Steamers. The site came from Cloudflare Pages, so its rules live in
// public/_redirects and public/_headers (copied into dist/). Workers static assets apply both files
// to responses served through the ASSETS binding, so they stay the single source of truth there.
// The redirects are mirrored here so they hold even if that ever changes; the destinations match
// _redirects exactly.

// Exact-path 301s. Matching ignores a trailing slash.
const EXACT = {
  '/about-us': '/about/',
  '/contact-us': '/contact/',
  '/carpet-cleaning': '/services/',
  '/services/carpet-cleaning': '/services/',
  '/is-professional-upholstery-cleaning-worthit-heres-what-you-need-to-know': '/blog/upholstery-cleaning-benefits/',
  '/author': '/blog/',
  '/category': '/blog/',
};

// Prefix 301s (_redirects `/x/*`). The trailing slash is dropped before matching, so `/author/`
// is caught by EXACT and `/author/anything` by the prefix below. `/blog/page` (no slash) is a 404 live.
const PREFIX = [
  ['/blog/page/', '/blog/'],
  ['/author/', '/blog/'],
  ['/category/', '/blog/'],
];

export function redirect(url) {
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, '') : url.pathname;
  let to = EXACT[path];
  if (!to) for (const [from, dest] of PREFIX) if (path.startsWith(from)) { to = dest; break; }
  // `/blog/page/` itself: Pages' `/blog/page/*` matches the empty splat.
  if (!to && url.pathname === '/blog/page/') to = '/blog/';
  if (!to) return null;
  const dest = new URL(to, url);
  if (!to.includes('?')) dest.search = url.search;
  return Response.redirect(dest.toString(), 301);
}

// No VPS-backed paths: /api/leads is handled in worker/main.js.
export const PROXIES = [];

// Same as the `/*` block in public/_headers (only added when the asset didn't set them).
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
