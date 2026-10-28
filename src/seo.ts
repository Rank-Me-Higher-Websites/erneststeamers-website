import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import { HERO_AVIF_SRCSET, HERO_IMAGE_SIZES, HERO_PRELOAD_HREF } from "@/lib/homeImages";
import { faqs } from "@/data/faqs";
import {
  NAP,
  PRIMARY_LOCATION,
  SECONDARY_OFFICES,
  SISTER_COMPANY,
  formatAddress,
  getOfficeByPath,
} from "@/data/locations";

export { NAP };

export const SITE = "https://erneststeamers.com";

const MAIN_BUSINESS_ID = `${SITE}/#business`;

const AREA_SERVED = [
  "Chicago",
  "Wheeling",
  "Des Plaines",
  "Morton Grove",
  "Arlington Heights",
  "Niles",
  "Mt Prospect",
  "Skokie",
  "Bloomingdale",
  "Clarendon Hills",
  "St Charles",
  "Downers Grove",
  "Glen Ellyn",
  "Naperville",
  "Elmhurst",
  "Orland Park",
  "Northbrook",
  "Libertyville",
  "Northfield",
  "Lake Forest",
  "Glencoe",
  "Evanston",
  "Deerfield",
  "Winnetka",
  "Highland Park",
  "Wilmette",
  "Lake Bluff",
  "Glenview",
  "Barrington",
  "Long Grove",
  "Palatine",
  "Hawthorn Woods",
  "Elgin",
  "Vernon Hills",
  "Schaumburg",
  "Buffalo Grove",
  "Bartlett",
  "Aurora",
  "Franklin Park",
];

type PageCopy = {
  title: string;
  description: string;
  robots?: string;
  faq?: boolean;
};

const primaryAddress = formatAddress(PRIMARY_LOCATION);
const cityLabel = `${PRIMARY_LOCATION.city}, ${PRIMARY_LOCATION.region}`;

const pages: Record<string, PageCopy> = {
  "/": {
    title: "Carpet Cleaning in Chicago & Suburbs | Ernest Steamers",
    description:
      "Steam cleaning for carpet, rugs and upholstery in Chicago and the suburbs. Certified technicians, carpet cleaning starts at $99. Call 630-830-9867.",
    faq: true,
  },
  "/services": {
    title: "Cleaning Services | Ernest Steamers",
    description: `Carpet cleaning, upholstery cleaning, area rug cleaning, tile and grout, and commercial carpet care from Ernest Steamers in ${cityLabel}. Call ${NAP.phoneDisplay}.`,
  },
  "/service-areas": {
    title: "Service Areas | Ernest Steamers",
    description: `Ernest Steamers cleans carpets and upholstery across Chicago, the North Shore, DuPage County, and the northwest suburbs from ${cityLabel}. Call ${NAP.phoneDisplay}.`,
  },
  "/about": {
    title: "About Us | Ernest Steamers",
    description: `Ernest Steamers is a ${cityLabel} carpet, rug, and upholstery cleaning company serving Chicago and the suburbs. ${primaryAddress}. Call ${NAP.phoneDisplay}.`,
  },
  "/blog": {
    title: "Carpet Cleaning Blog | Ernest Steamers",
    description: `Carpet cleaning tips, pet stain guides, and upholstery advice from Ernest Steamers in ${cityLabel}. Call ${NAP.phoneDisplay}.`,
  },
  "/funnel": {
    title: "Free Carpet Cleaning Quote | Ernest Steamers",
    description: `Request a free carpet, rug, or upholstery cleaning quote from Ernest Steamers in ${cityLabel}. Call ${NAP.phoneDisplay}.`,
    robots: "noindex, nofollow",
    faq: true,
  },
};

export type SeoMeta = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: "website" | "article";
  jsonLd: Record<string, unknown>[];
};

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "19:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "09:00",
    closes: "15:00",
  },
];

function postalAddress(location: { street: string; city: string; region: string; postalCode: string }) {
  return {
    "@type": "PostalAddress",
    streetAddress: location.street,
    addressLocality: location.city,
    addressRegion: location.region,
    postalCode: location.postalCode,
    addressCountry: "US",
  };
}

/** Root stays "/". Every other route uses the trailing slash Pages serves. */
function publicPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

function absoluteRoute(path: string): string {
  return `${SITE}${publicPath(path)}`;
}

function officeId(path: string) {
  return `${absoluteRoute(path)}#business`;
}

function sisterOrganization() {
  return {
    "@type": "Organization",
    "@id": SISTER_COMPANY.id,
    name: SISTER_COMPANY.name,
    url: SISTER_COMPANY.url,
    sameAs: SISTER_COMPANY.url,
  };
}

function localBusiness() {
  return {
    "@type": "LocalBusiness",
    "@id": MAIN_BUSINESS_ID,
    name: NAP.name,
    url: `${SITE}/`,
    telephone: NAP.phoneSchema,
    email: NAP.email,
    image: `${SITE}/apple-touch-icon.png`,
    description:
      "Carpet, rug, and upholstery steam cleaning for homes and businesses in Chicago and the suburbs.",
    address: postalAddress(PRIMARY_LOCATION),
    parentOrganization: sisterOrganization(),
    department: SECONDARY_OFFICES.map((office) => ({ "@id": officeId(office.path) })),
    areaServed: AREA_SERVED.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: OPENING_HOURS,
  };
}

function secondaryBusinesses() {
  return SECONDARY_OFFICES.map((office) => ({
    "@type": "LocalBusiness",
    "@id": officeId(office.path),
    name: office.name,
    url: absoluteRoute(office.path),
    telephone: office.phoneSchema,
    email: office.email,
    image: `${SITE}/apple-touch-icon.png`,
    description: office.description,
    address: postalAddress(office),
    parentOrganization: { "@id": MAIN_BUSINESS_ID },
    branchOf: { "@id": MAIN_BUSINESS_ID },
    areaServed: [office.city, ...office.nearby].map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: OPENING_HOURS,
  }));
}

function graph(nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness(), ...secondaryBusinesses(), ...nodes],
  };
}

function faqNode() {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function pageNode(
  seo: { title: string; description: string; canonical: string },
  type = "WebPage",
  aboutId = MAIN_BUSINESS_ID,
) {
  return {
    "@type": type,
    "@id": `${seo.canonical}#webpage`,
    url: seo.canonical,
    name: seo.title,
    description: seo.description,
    about: { "@id": aboutId },
    isPartOf: { "@id": `${SITE}/#website` },
  };
}

function notFound(path: string): SeoMeta {
  const canonical = absoluteRoute(path);
  const title = "Page Not Found | Ernest Steamers";
  const description = `That page is not on the Ernest Steamers site. Call ${NAP.phoneDisplay} for carpet, rug, and upholstery cleaning in Chicago and the suburbs. ${primaryAddress}.`;
  return {
    title,
    description,
    canonical,
    robots: "noindex, nofollow",
    ogType: "website",
    jsonLd: [graph([pageNode({ title, description, canonical })])],
  };
}

export function getSeo(pathname: string): SeoMeta {
  const path = normalizePath(pathname);
  const blogSlug = path.match(/^\/blog\/([^/]+)$/);
  if (blogSlug) {
    const post = getPostBySlug(decodeURIComponent(blogSlug[1]));
    if (!post) return notFound(path);
    const canonical = absoluteRoute(`/blog/${post.slug}`);
    const schemaTitle = `${post.title} | Ernest Steamers`;
    const title = post.metaTitle ?? schemaTitle;
    const description = post.metaDescription;
    return {
      title,
      description,
      canonical,
      robots: "index, follow",
      ogType: "article",
      jsonLd: [
        graph([
          pageNode({ title: schemaTitle, description, canonical }, "WebPage"),
          {
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            author: { "@type": "Organization", name: NAP.name, url: `${SITE}/` },
            publisher: { "@id": MAIN_BUSINESS_ID },
            mainEntityOfPage: canonical,
          },
        ]),
      ],
    };
  }

  const office = getOfficeByPath(path);
  if (office) {
    const canonical = absoluteRoute(office.path);
    return {
      title: office.title,
      description: office.description,
      canonical,
      robots: "index, follow",
      ogType: "website",
      jsonLd: [
        graph([
          pageNode(
            { title: office.title, description: office.description, canonical },
            "WebPage",
            officeId(office.path),
          ),
        ]),
      ],
    };
  }

  const copy = pages[path];
  if (!copy) return notFound(path);
  const canonical = absoluteRoute(path);
  const nodes = [pageNode({ title: copy.title, description: copy.description, canonical })];
  if (path === "/") {
    nodes.unshift({
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: NAP.name,
      publisher: { "@id": MAIN_BUSINESS_ID },
    } as unknown as ReturnType<typeof pageNode>);
  }
  if (copy.faq) nodes.push(faqNode() as unknown as ReturnType<typeof pageNode>);
  return {
    title: copy.title,
    description: copy.description,
    canonical,
    robots: copy.robots ?? "index, follow",
    ogType: "website",
    jsonLd: [graph(nodes)],
  };
}

export function getPrerenderPaths(): string[] {
  return [
    "/",
    "/services",
    "/service-areas",
    "/about",
    "/blog",
    ...SECONDARY_OFFICES.map((office) => office.path),
    "/funnel",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ].map(publicPath);
}

function normalizePath(pathname: string): string {
  const bare = (pathname || "/").split("?")[0].split("#")[0] || "/";
  if (bare.length > 1 && bare.endsWith("/")) return bare.slice(0, -1);
  return bare;
}

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return escapeText(value).replace(/"/g, "&quot;");
}

function shareImage(canonical: string): string {
  return canonical === `${SITE}/` ? `${SITE}/images/home/og.jpg` : `${SITE}/apple-touch-icon.png`;
}

function heroPreload(canonical: string): string {
  if (canonical !== `${SITE}/`) return "";
  return `<link rel="preload" as="image" type="image/avif" href="${HERO_PRELOAD_HREF}" imagesrcset="${HERO_AVIF_SRCSET}" imagesizes="${HERO_IMAGE_SIZES}" fetchpriority="high" />`;
}

export function renderSeoHead(seo: SeoMeta): string {
  const scripts = seo.jsonLd
    .map(
      (block) =>
        `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");
  const image = shareImage(seo.canonical);
  const preload = heroPreload(seo.canonical);
  return [
    `<title>${escapeText(seo.title)}</title>`,
    `<meta name="description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="robots" content="${escapeAttr(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`,
    preload,
    `<meta property="og:title" content="${escapeAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(seo.description)}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:url" content="${escapeAttr(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:site_name" content="${escapeAttr(NAP.name)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    scripts,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function syncHeroPreload(canonical: string) {
  let link = document.head.querySelector("link[data-hero-preload]");
  if (canonical !== `${SITE}/`) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("as", "image");
    link.setAttribute("data-hero-preload", "");
    document.head.appendChild(link);
  }
  link.setAttribute("type", "image/avif");
  link.setAttribute("href", HERO_PRELOAD_HREF);
  link.setAttribute("imagesrcset", HERO_AVIF_SRCSET);
  link.setAttribute("imagesizes", HERO_IMAGE_SIZES);
  link.setAttribute("fetchpriority", "high");
}

/** Keep the document head in sync after client-side navigations. */
export function applySeoToDocument(seo: SeoMeta) {
  const image = shareImage(seo.canonical);
  document.title = seo.title;
  upsertMeta("name", "description", seo.description);
  upsertMeta("name", "robots", seo.robots);
  upsertMeta("property", "og:title", seo.title);
  upsertMeta("property", "og:description", seo.description);
  upsertMeta("property", "og:type", seo.ogType);
  upsertMeta("property", "og:url", seo.canonical);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:site_name", NAP.name);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", seo.title);
  upsertMeta("name", "twitter:description", seo.description);
  upsertMeta("name", "twitter:image", image);
  syncHeroPreload(seo.canonical);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", seo.canonical);

  document.head.querySelectorAll("script[data-seo-jsonld]").forEach((node) => node.remove());
  for (const block of seo.jsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo-jsonld", "");
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}
