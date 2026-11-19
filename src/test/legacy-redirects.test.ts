import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const LEGACY_RULES = [
  "/about-us /about/ 301",
  "/about-us/ /about/ 301",
  "/contact-us /contact/ 301",
  "/contact-us/ /contact/ 301",
  "/carpet-cleaning /services/ 301",
  "/carpet-cleaning/ /services/ 301",
  "/services/carpet-cleaning /services/ 301",
  "/services/carpet-cleaning/ /services/ 301",
  "/is-professional-upholstery-cleaning-worthit-heres-what-you-need-to-know /blog/upholstery-cleaning-benefits/ 301",
  "/is-professional-upholstery-cleaning-worthit-heres-what-you-need-to-know/ /blog/upholstery-cleaning-benefits/ 301",
  "/blog/page/* /blog/ 301",
  "/author/* /blog/ 301",
  "/author /blog/ 301",
  "/category/* /blog/ 301",
  "/category /blog/ 301",
];

describe("legacy WordPress 404 redirects", () => {
  const text = readFileSync(resolve(process.cwd(), "public/_redirects"), "utf8");
  const rules = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  it("keeps the existing comments and does not add an SPA fallback", () => {
    expect(text).toContain("# Cloudflare Pages checks Pages Functions first, then static files, then this file.");
    expect(text).toContain("# There is no `/* /index.html 200` SPA fallback. Every app route is already");
    expect(text).not.toMatch(/^\s*\/\*\s+\/index\.html\s+200/m);
  });

  it("301s the GSC not-found URLs to the trailing-slash page for the same content", () => {
    expect(text).toContain("# legacy pre-redesign WordPress URLs from GSC 'Not found (404)', 2026-11-19.");
    expect(rules).toEqual(LEGACY_RULES);
    const firstSplat = rules.findIndex((rule) => rule.includes("*"));
    expect(firstSplat).toBe(10);
    expect(rules.slice(0, firstSplat).every((rule) => !rule.includes("*"))).toBe(true);
  });
});
