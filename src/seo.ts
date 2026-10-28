import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import { partsText, serviceBlocks, serviceFaqs } from "@/data/servicesPage";
import { BLOG_FEATURED_SIZES, BLOG_HERO_SIZES, blogImageSrc, blogPreload } from "@/lib/blogImages";
import {
  HERO_AVIF_SRCSET,
  HERO_IMAGE_SIZES,
  HERO_PRELOAD_HREF,
  ABOUT_STORY_AVIF_SRCSET,
  ABOUT_STORY_PRELOAD_HREF,
  ABOUT_STORY_SIZES,
  SERVICES_CARPET_AVIF_SRCSET,
  SERVICES_CARPET_PRELOAD_HREF,
  SERVICES_CARPET_SIZES,
} from "@/lib/homeImages";
import { faqs } from "@/data/faqs";
import { franklinParkFaqs } from "@/data/franklinParkPage";
import { serviceAreasDescription, serviceAreasTitle } from "@/data/serviceAreas";
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
    title: "Carpet, Rug & Upholstery Cleaning Services | Ernest Steamers",
    description:
      "Carpet, upholstery, area rug, tile & grout and commercial carpet cleaning in Chicago and suburbs. Carpet cleaning starts at $99. Call 630-830-9867.",
  },
  "/service-areas": {
    title: serviceAreasTitle,
    description: serviceAreasDescription,
  },
  "/about": {
    title: "About Ernest Steamers | Carpet Cleaning in Bartlett, IL",
    description:
      "Meet Ernest Steamers, a Bartlett, IL carpet, rug and upholstery steam cleaning company serving Chicago and the suburbs. Call 630-830-9867.",
  },
  "/contact": {
    title: "Free Carpet Cleaning Quote | Ernest Steamers",
    description:
      "Request a free carpet, rug or upholstery cleaning quote from Ernest Steamers in Chicago & suburbs. Starts at $99. Call 630-830-9867.",
  },
  "/blog": {
    title: "Carpet Cleaning Blog | Ernest Steamers",
    description:
      "Carpet, upholstery and pet-stain cleaning guides from Ernest Steamers in Bartlett, IL. Practical tips for Chicago-area homes. Call 630-830-9867.",
  },
  "/funnel": {
    title: "Carpet Cleaning Quote Request | Ernest Steamers",
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
  image?: string;
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

function breadcrumbNode(items: { name: string; item: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

function articleNode(post: (typeof blogPosts)[number], canonical: string) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE}${blogImageSrc(post.image)}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: NAP.name, url: `${SITE}/` },
    publisher: { "@id": MAIN_BUSINESS_ID },
    mainEntityOfPage: canonical,
  };
}

function faqNodeFrom(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function faqNode() {
  return faqNodeFrom(faqs);
}

function serviceNodes(canonical: string) {
  return serviceBlocks.map((service) => {
    const node: Record<string, unknown> = {
      "@type": "Service",
      "@id": `${canonical}#${service.id}`,
      name: service.service,
      serviceType: service.service,
      url: `${canonical}#${service.id}`,
      description: partsText(service.body),
      provider: { "@id": MAIN_BUSINESS_ID },
    };
    if (service.startsAt) {
      node.offers = {
        "@type": "Offer",
        description: "Starts at $99",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: 99,
          priceCurrency: "USD",
        },
      };
    }
    return node;
  });
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
      image: `${SITE}${blogImageSrc(post.image)}`,
      jsonLd: [
        graph([
          pageNode({ title: schemaTitle, description, canonical }, "WebPage"),
          breadcrumbNode([
            { name: "Home", item: `${SITE}/` },
            { name: "Blog", item: absoluteRoute("/blog") },
            { name: post.title, item: canonical },
          ]),
          articleNode(post, canonical),
        ]),
      ],
    };
  }

  const office = getOfficeByPath(path);
  if (office) {
    const canonical = absoluteRoute(office.path);
    const description = office.metaDescription ?? office.description;
    const nodes = [
      pageNode({ title: office.title, description, canonical }, "WebPage", officeId(office.path)),
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE}/service-areas/` },
          { "@type": "ListItem", position: 3, name: office.city, item: canonical },
        ],
      } as unknown as ReturnType<typeof pageNode>,
    ];
    if (office.slug === "franklin-park") {
      nodes.push(faqNodeFrom(franklinParkFaqs) as unknown as ReturnType<typeof pageNode>);
    }
    return {
      title: office.title,
      description,
      canonical,
      robots: "index, follow",
      ogType: "website",
      jsonLd: [graph(nodes)],
    };
  }

  const copy = pages[path];
  if (!copy) return notFound(path);
  const canonical = absoluteRoute(path);
  const pageType = path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : "WebPage";
  const nodes = [pageNode({ title: copy.title, description: copy.description, canonical }, pageType)];
  if (path === "/") {
    nodes.unshift({
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: NAP.name,
      publisher: { "@id": MAIN_BUSINESS_ID },
    } as unknown as ReturnType<typeof pageNode>);
  }
  if (path === "/services") {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: canonical },
      ],
    } as unknown as ReturnType<typeof pageNode>);
    for (const service of serviceNodes(canonical)) {
      nodes.push(service as unknown as ReturnType<typeof pageNode>);
    }
    nodes.push(faqNodeFrom(serviceFaqs) as unknown as ReturnType<typeof pageNode>);
  }
  if (path === "/about" || path === "/contact") {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: path === "/contact" ? "Contact" : "About", item: canonical },
      ],
    } as unknown as ReturnType<typeof pageNode>);
  }
  if (path === "/service-areas") {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: canonical },
      ],
    } as unknown as ReturnType<typeof pageNode>);
  }
  if (copy.faq) nodes.push(faqNode() as unknown as ReturnType<typeof pageNode>);
  if (path === "/blog") {
    nodes.push({
      "@type": "Blog",
      "@id": `${canonical}#blog`,
      url: canonical,
      name: copy.title,
      description: copy.description,
      blogPost: blogPosts.map((post) => ({
        "@type": "Article",
        headline: post.title,
        url: absoluteRoute(`/blog/${post.slug}`),
        datePublished: post.date,
        image: `${SITE}${blogImageSrc(post.image)}`,
      })),
    } as unknown as ReturnType<typeof pageNode>);
    nodes.push(
      breadcrumbNode([
        { name: "Home", item: `${SITE}/` },
        { name: "Blog", item: canonical },
      ]) as unknown as ReturnType<typeof pageNode>,
    );
  }
  const featured = blogPosts[0];
  return {
    title: copy.title,
    description: copy.description,
    canonical,
    robots: copy.robots ?? "index, follow",
    ogType: "website",
    image: path === "/blog" ? `${SITE}${blogImageSrc(featured.image)}` : undefined,
    jsonLd: [graph(nodes)],
  };
}

export function getPrerenderPaths(): string[] {
  return [
    "/",
    "/services",
    "/service-areas",
    "/about",
    "/contact",
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

function shareImage(seo: SeoMeta): string {
  if (seo.image) return seo.image;
  if (seo.canonical === `${SITE}/` || seo.canonical === `${SITE}/about/`) return `${SITE}/images/home/og.jpg`;
  return `${SITE}/apple-touch-icon.png`;
}

function lcpImage(canonical: string) {
  if (canonical === `${SITE}/`) {
    return { href: HERO_PRELOAD_HREF, srcset: HERO_AVIF_SRCSET, sizes: HERO_IMAGE_SIZES };
  }
  if (canonical === `${SITE}/services/`) {
    return {
      href: SERVICES_CARPET_PRELOAD_HREF,
      srcset: SERVICES_CARPET_AVIF_SRCSET,
      sizes: SERVICES_CARPET_SIZES,
    };
  }
  if (canonical === `${SITE}/about/`) {
    return {
      href: ABOUT_STORY_PRELOAD_HREF,
      srcset: ABOUT_STORY_AVIF_SRCSET,
      sizes: ABOUT_STORY_SIZES,
    };
  }
  if (canonical === `${SITE}/blog/`) {
    const preload = blogPreload(blogPosts[0].image, BLOG_FEATURED_SIZES);
    return { href: preload.href, srcset: preload.srcSet, sizes: preload.sizes };
  }
  const slug = canonical.match(/\/blog\/([^/]+)\/$/)?.[1];
  const post = slug ? getPostBySlug(slug) : undefined;
  if (post) {
    const preload = blogPreload(post.image, BLOG_HERO_SIZES);
    return { href: preload.href, srcset: preload.srcSet, sizes: preload.sizes };
  }
  if (canonical === `${SITE}/locations/franklin-park/`) {
    return {
      href: SERVICES_CARPET_PRELOAD_HREF,
      srcset: SERVICES_CARPET_AVIF_SRCSET,
      sizes: SERVICES_CARPET_SIZES,
    };
  }
  return null;
}

function heroPreload(canonical: string): string {
  const image = lcpImage(canonical);
  if (!image) return "";
  return `<link rel="preload" as="image" type="image/avif" href="${image.href}" imagesrcset="${image.srcset}" imagesizes="${image.sizes}" fetchpriority="high" />`;
}

export function renderSeoHead(seo: SeoMeta): string {
  const scripts = seo.jsonLd
    .map(
      (block) =>
        `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");
  const image = shareImage(seo);
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
  const image = lcpImage(canonical);
  const links = [...document.head.querySelectorAll('link[rel="preload"][as="image"]')];
  if (!image) {
    links.forEach((node) => node.remove());
    return;
  }
  let link = links[0];
  for (const extra of links.slice(1)) extra.remove();
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "preload");
    link.setAttribute("as", "image");
    document.head.appendChild(link);
  }
  link.setAttribute("data-lcp-preload", "");
  link.setAttribute("type", "image/avif");
  link.setAttribute("href", image.href);
  link.setAttribute("imagesrcset", image.srcset);
  link.setAttribute("imagesizes", image.sizes);
  link.setAttribute("fetchpriority", "high");
}

export function applySeoToDocument(seo: SeoMeta) {
  const image = shareImage(seo);
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
