import { createServer } from "vite";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

const REQUIRED = [
  "630-830-9867",
  "10549 Crown Rd",
  "Franklin Park",
  "LocalBusiness",
  'rel="canonical"',
  'name="description"',
  'type="application/ld+json"',
];

const H1_SNIPPET = {
  "/": "Expert Carpet Cleaning in Chicago",
  "/services": "Our Cleaning Services",
  "/service-areas": "Service Areas",
  "/about": "About Ernest Steamers",
  "/blog": "Blog",
  "/funnel": "Expert Carpet Cleaning in Chicago",
};

function hasHeading(html, text) {
  const flat = html.replace(/\s+/g, " ");
  return new RegExp(`<h1[^>]*>[^<]*${text}[^<]*</h1>`).test(flat);
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

function outputPath(route) {
  if (route === "/") return "dist/index.html";
  return join("dist", route.replace(/^\//, ""), "index.html");
}

function assertPage(file, html, { route, h1 }) {
  const problems = [];
  if (html.includes("<!--seo-->")) problems.push("seo marker was not replaced");
  if (html.includes("<div id=\"root\"></div>")) problems.push("root is empty");
  if (html.includes("aggregateRating")) problems.push("contains aggregateRating");
  if (html.includes("Hummingbird")) problems.push("contains old address");
  if (html.includes("555-1234") || html.includes("123 Main St")) problems.push("contains placeholder contact data");
  const title = html.match(/<title>([^<]*)<\/title>/);
  if (!title || !title[1].includes("Ernest Steamers")) problems.push("missing title");
  for (const needle of REQUIRED) {
    if (!html.includes(needle)) problems.push(`missing ${needle}`);
  }
  if (h1 && !hasHeading(html, h1)) problems.push(`missing h1 snippet: ${h1}`);
  if (!html.includes("<h1")) problems.push("missing h1");
  const canonical = route === "/"
    ? "https://erneststeamers.com/"
    : `https://erneststeamers.com${route}`;
  if (route && !html.includes(`href="${canonical}"`)) problems.push(`missing canonical ${canonical}`);
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
    const title = assertPage(file, page, { route, h1: H1_SNIPPET[route] });
    if (titles.has(title)) {
      throw new Error(`duplicate title "${title}" on ${route} and ${titles.get(title)}`);
    }
    titles.set(title, route);
    console.log(`prerendered ${route}`);
  }

  const notFound = readFileSync("dist/404.html", "utf8");
  assertPage("dist/404.html", notFound, { route: null, h1: "Page not found" });
  if (!notFound.includes('href="https://erneststeamers.com/404"')) {
    throw new Error("dist/404.html is missing its canonical");
  }
  console.log(`prerendered ${routes.length} routes; 404.html ok`);
} finally {
  await vite.close();
}
