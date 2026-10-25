import { createServer } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const SITE = "https://erneststeamers.com";
const MAIN_ID = `${SITE}/#business`;

const H1_SNIPPET = {
  "/": "Expert Carpet Cleaning in Chicago",
  "/services": "Our Cleaning Services",
  "/service-areas": "Service Areas",
  "/about": "About Ernest Steamers",
  "/blog": "Blog",
  "/funnel": "Expert Carpet Cleaning in Chicago",
};

const BANNED_HTML = [
  "(800) 270-6228",
  "800-270-6228",
  "800.270.6228",
  "+1-800-270-6228",
  "1-800-270-6228",
  "(800)270-6228",
  "Diehl",
];

function hasHeading(html, text) {
  const flat = html.replace(/\s+/g, " ");
  return new RegExp(`<h1[^>]*>[^<]*${text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^<]*</h1>`).test(flat);
}

function rewriteAssets(html, manifest) {
  let out = html;
  for (const [src, item] of Object.entries(manifest)) {
    if (!item || typeof item.file !== "string") continue;
    if (!/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(src)) continue;
    const hashed = `/${item.file}`;
    out = out.split(`/${src}`).join(hashed);
    out = out.split(src).join(hashed);
  }
  return out;
}

function bareRoute(route) {
  if (!route || route === "/") return "/";
  return route.replace(/\/+$/, "");
}

function outputPath(route) {
  if (route === "/") return "dist/index.html";
  return join("dist", bareRoute(route).replace(/^\//, ""), "index.html");
}

function isFilePath(path) {
  const leaf = path.split("/").pop() || "";
  return /\.[a-z0-9]+$/i.test(leaf);
}

/** True when an href or absolute site URL is a non-root route missing its slash. */
function bareInternalRoute(value) {
  if (!value || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("#")) return false;
  let path = value;
  if (value.startsWith(`${SITE}/`) || value === SITE || value === `${SITE}/`) {
    path = value.slice(SITE.length) || "/";
  } else if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    return false;
  } else if (!value.startsWith("/")) {
    return false;
  }
  const end = path.search(/[?#]/);
  const base = end === -1 ? path : path.slice(0, end);
  if (base === "" || base === "/") return false;
  if (isFilePath(base)) return false;
  return !base.endsWith("/");
}

function assertTrailingSlashRoutes(file, text) {
  const found = new Set();
  const attr = /(?:href|content)="([^"]*)"/g;
  let match;
  while ((match = attr.exec(text))) {
    if (bareInternalRoute(match[1])) found.add(match[1]);
  }
  const abs = /https:\/\/erneststeamers\.com(\/[^\s"'<\\]*)/g;
  while ((match = abs.exec(text))) {
    const url = `${SITE}${match[1]}`;
    if (bareInternalRoute(url)) found.add(url);
  }
  if (found.size) {
    throw new Error(`${file}: non-slash internal route:\n- ${[...found].join("\n- ")}`);
  }
}

function typesOf(node) {
  const type = node["@type"];
  if (!type) return [];
  return Array.isArray(type) ? type : [type];
}

function walk(value, visit) {
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
    return;
  }
  if (!value || typeof value !== "object") return;
  visit(value);
  for (const key of Object.keys(value)) {
    if (key === "@context") continue;
    const child = value[key];
    if (child && typeof child === "object") walk(child, visit);
  }
}

function extractJsonLd(file, html) {
  const blocks = [];
  const re = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    try {
      blocks.push(JSON.parse(match[1]));
    } catch (error) {
      throw new Error(`${file}: JSON-LD did not parse: ${error.message}`);
    }
  }
  if (!blocks.length) throw new Error(`${file}: missing JSON-LD`);
  return blocks;
}

function assertJsonLd(file, html, { primary, offices, sister, requireOffices }) {
  const blocks = extractJsonLd(file, html);
  const nodes = [];
  for (const block of blocks) walk(block, (node) => nodes.push(node));

  for (const node of nodes) {
    const types = typesOf(node);
    if (types.some((type) => type === "AggregateRating" || type === "Review" || type === "Rating")) {
      throw new Error(`${file}: JSON-LD includes ${types.join(", ")}`);
    }
    for (const key of ["aggregateRating", "reviewCount", "ratingValue", "review", "geo", "latitude", "longitude"]) {
      if (Object.prototype.hasOwnProperty.call(node, key)) {
        throw new Error(`${file}: JSON-LD includes ${key}`);
      }
    }
    if (typeof node.telephone === "string" && node.telephone !== primary.phoneSchema) {
      throw new Error(`${file}: unexpected telephone ${node.telephone}`);
    }
    const serialized = JSON.stringify(node);
    if (serialized.includes("270-6228") || serialized.includes("Diehl")) {
      throw new Error(`${file}: JSON-LD includes a disallowed phone or address`);
    }
  }

  const businesses = nodes.filter((node) => typesOf(node).includes("LocalBusiness"));
  const main = businesses.find((node) => node["@id"] === MAIN_ID);
  if (!main) throw new Error(`${file}: missing main LocalBusiness`);
  const address = main.address || {};
  const expected = {
    streetAddress: primary.street,
    addressLocality: primary.city,
    addressRegion: primary.region,
    postalCode: primary.postalCode,
    addressCountry: "US",
  };
  for (const [key, value] of Object.entries(expected)) {
    if (address[key] !== value) {
      throw new Error(`${file}: main address ${key} is ${JSON.stringify(address[key])}, expected ${value}`);
    }
  }
  if (main.telephone !== primary.phoneSchema) {
    throw new Error(`${file}: main telephone is not ${primary.phoneSchema}`);
  }

  const parent = main.parentOrganization;
  if (!parent || parent.name !== sister.name || parent.url !== sister.url) {
    throw new Error(`${file}: main LocalBusiness is missing the ${sister.name} organization`);
  }
  const sameAs = Array.isArray(parent.sameAs) ? parent.sameAs : parent.sameAs ? [parent.sameAs] : [];
  if (!sameAs.includes(sister.url)) {
    throw new Error(`${file}: ${sister.name} organization is missing sameAs ${sister.url}`);
  }
  if (parent.telephone || parent.aggregateRating || parent.reviewCount) {
    throw new Error(`${file}: ${sister.name} schema includes a phone or rating`);
  }

  if (!requireOffices) return;

  const departments = Array.isArray(main.department) ? main.department : main.department ? [main.department] : [];
  const departmentIds = new Set(departments.map((item) => item && item["@id"]));
  for (const office of offices) {
    const officeId = `${SITE}${bareRoute(office.path)}/#business`;
    const node = businesses.find((item) => item["@id"] === officeId);
    if (!node) throw new Error(`${file}: missing LocalBusiness ${officeId}`);
    const officeAddress = node.address || {};
    if (officeAddress.streetAddress !== office.street) {
      throw new Error(`${file}: ${office.city} streetAddress is ${JSON.stringify(officeAddress.streetAddress)}`);
    }
    if (officeAddress.addressLocality !== office.city) throw new Error(`${file}: ${office.city} locality`);
    if (officeAddress.addressRegion !== office.region) throw new Error(`${file}: ${office.city} region`);
    if (officeAddress.postalCode !== office.postalCode) throw new Error(`${file}: ${office.city} postalCode`);
    if (officeAddress.addressCountry !== "US") throw new Error(`${file}: ${office.city} country`);
    if (!officeAddress.streetAddress || !officeAddress.postalCode) {
      throw new Error(`${file}: ${office.city} address is missing a street or postal code`);
    }
    if (node.branchOf?.["@id"] !== MAIN_ID) throw new Error(`${file}: ${office.city} branchOf`);
    if (node.parentOrganization?.["@id"] !== MAIN_ID) {
      throw new Error(`${file}: ${office.city} parentOrganization`);
    }
    if (!departmentIds.has(officeId)) {
      throw new Error(`${file}: ${office.city} is not a department of the main business`);
    }
    if (node.telephone !== office.phoneSchema) throw new Error(`${file}: ${office.city} telephone`);
  }
}

function assertPage(file, html, { route, h1, required, offices }) {
  const problems = [];
  if (html.includes("<!--seo-->")) problems.push("seo marker was not replaced");
  if (html.includes("<div id=\"root\"></div>")) problems.push("root is empty");
  if (html.includes("aggregateRating")) problems.push("contains aggregateRating");
  if (html.includes("reviewCount")) problems.push("contains reviewCount");
  if (html.includes("555-1234") || html.includes("123 Main St")) problems.push("contains placeholder contact data");
  for (const needle of BANNED_HTML) {
    if (html.includes(needle)) problems.push(`contains disallowed text: ${needle}`);
  }
  const title = html.match(/<title>([^<]*)<\/title>/);
  if (!title || !title[1].includes("Ernest Steamers")) problems.push("missing title");
  for (const needle of required) {
    if (!html.includes(needle)) problems.push(`missing ${needle}`);
  }
  if (h1 && !hasHeading(html, h1)) problems.push(`missing h1 snippet: ${h1}`);
  if (!html.includes("<h1")) problems.push("missing h1");
  const canonical = route === "/"
    ? `${SITE}/`
    : `${SITE}${bareRoute(route)}/`;
  if (route && !html.includes(`href="${canonical}"`)) problems.push(`missing canonical ${canonical}`);
  if (route) {
    const visible = html.replace(/<!--.*?-->/g, "");
    if (!visible.includes("Sister company: Ernest Windows")) problems.push("missing sister company link");
    if (!html.includes("https://ernestwindows.com")) problems.push("missing sister company url");
  }
  const office = offices?.find((item) => bareRoute(item.path) === bareRoute(route));
  if (office) {
    for (const needle of [office.street, office.city, office.postalCode, "Get A Free Quote"]) {
      if (!html.includes(needle)) problems.push(`missing ${needle}`);
    }
  }
  if (problems.length) {
    throw new Error(`${file}:\n- ${problems.join("\n- ")}`);
  }
  return title[1];
}

const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});

try {
  const template = readFileSync("dist/index.html", "utf8");
  if (!template.includes("<!--seo-->")) {
    throw new Error("dist/index.html is missing the <!--seo--> marker");
  }
  const manifest = JSON.parse(readFileSync("dist/.vite/manifest.json", "utf8"));
  const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const { getPrerenderPaths } = await vite.ssrLoadModule("/src/seo.ts");
  const { PRIMARY_LOCATION, SECONDARY_OFFICES, SISTER_COMPANY } = await vite.ssrLoadModule(
    "/src/data/locations.ts",
  );
  for (const office of SECONDARY_OFFICES) {
    H1_SNIPPET[bareRoute(office.path)] = office.h1;
  }
  const required = [
    PRIMARY_LOCATION.phoneDisplay,
    PRIMARY_LOCATION.street,
    PRIMARY_LOCATION.city,
    PRIMARY_LOCATION.postalCode,
    "LocalBusiness",
    'rel="canonical"',
    'name="description"',
    'type="application/ld+json"',
  ];
  const routes = getPrerenderPaths();
  const titles = new Map();

  for (const route of routes) {
    const { html, head } = await render(route);
    const page = template
      .replace("<!--seo-->", head)
      .replace('<div id="root"></div>', `<div id="root">${rewriteAssets(html, manifest)}</div>`);
    const file = outputPath(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page);
    const title = assertPage(file, page, {
      route,
      h1: H1_SNIPPET[bareRoute(route)],
      required,
      offices: SECONDARY_OFFICES,
    });
    assertTrailingSlashRoutes(file, page);
    assertJsonLd(file, page, {
      primary: PRIMARY_LOCATION,
      offices: SECONDARY_OFFICES,
      sister: SISTER_COMPANY,
      requireOffices: true,
    });
    if (titles.has(title)) {
      throw new Error(`duplicate title "${title}" on ${route} and ${titles.get(title)}`);
    }
    titles.set(title, route);
    console.log(`prerendered ${route}`);
  }

  const notFound = readFileSync("dist/404.html", "utf8");
  assertPage("dist/404.html", notFound, { route: null, h1: "Page not found", required, offices: [] });
  assertJsonLd("dist/404.html", notFound, {
    primary: PRIMARY_LOCATION,
    offices: SECONDARY_OFFICES,
    sister: SISTER_COMPANY,
    requireOffices: false,
  });
  if (!notFound.includes('href="https://erneststeamers.com/404/"')) {
    throw new Error("dist/404.html is missing its canonical");
  }
  assertTrailingSlashRoutes("dist/404.html", notFound);
  console.log(`prerendered ${routes.length} routes; 404.html ok`);

  const staticFiles = {
    "dist/sitemap.xml": ["<urlset", "<loc>https://erneststeamers.com/</loc>", "https://erneststeamers.com/blog/carpet-cleaning-tips-homeowners/"],
    "dist/robots.txt": ["User-agent:", "Disallow: /funnel", "Sitemap: https://erneststeamers.com/sitemap.xml"],
    "dist/_headers": ["/sitemap.xml", "application/xml", "/robots.txt", "text/plain", "/assets/*"],
    "dist/_redirects": ["404.html"],
  };
  for (const [file, needles] of Object.entries(staticFiles)) {
    const text = readFileSync(file, "utf8");
    for (const needle of needles) {
      if (!text.includes(needle)) throw new Error(`${file} is missing ${needle}`);
    }
    console.log(`static ${file} ok`);
  }
  const sitemap = readFileSync("dist/sitemap.xml", "utf8");
  assertTrailingSlashRoutes("dist/sitemap.xml", sitemap);
  for (const route of routes) {
    const bare = bareRoute(route);
    const loc = bare === "/" ? `${SITE}/` : `${SITE}${bare}/`;
    const listed = sitemap.includes(`<loc>${loc}</loc>`);
    if (bare === "/funnel") {
      if (listed) throw new Error("sitemap should not list /funnel");
      continue;
    }
    if (!listed) throw new Error(`sitemap is missing ${loc}`);
  }
  console.log("sitemap routes ok");
  const redirects = readFileSync("dist/_redirects", "utf8");
  if (/^\s*\*\s+\/index\.html\s+200/m.test(redirects)) {
    throw new Error("dist/_redirects rewrites every path to index.html");
  }
} finally {
  await vite.close();
}
