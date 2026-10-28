import { describe, expect, it } from "vitest";
import { getPrerenderPaths, getSeo } from "@/seo";

describe("contact SEO", () => {
  const seo = getSeo("/contact/");

  it("keeps a short title, a description with the phone, and a trailing-slash canonical", () => {
    expect(seo.title).toBe("Free Carpet Cleaning Quote | Ernest Steamers");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(
      "Request a free carpet, rug or upholstery cleaning quote from Ernest Steamers in Chicago & suburbs. Starts at $99. Call 630-830-9867.",
    );
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("630-830-9867");
    expect(seo.canonical).toBe("https://erneststeamers.com/contact/");
    expect(seo.robots).toBe("index, follow");
  });

  it("uses ContactPage and breadcrumb schema without ratings", () => {
    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const nodes = block["@graph"];
    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);

    const page = nodes.find((node) => node["@type"] === "ContactPage");
    expect(page?.["@id"]).toBe("https://erneststeamers.com/contact/#webpage");
    expect(page?.url).toBe("https://erneststeamers.com/contact/");

    const crumbs = nodes.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string; item: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual(["Home", "Contact"]);
    expect(crumbs.itemListElement[0].item).toBe("https://erneststeamers.com/");
    expect(crumbs.itemListElement[1].item).toBe("https://erneststeamers.com/contact/");

    const main = nodes.find((node) => node["@id"] === "https://erneststeamers.com/#business");
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(address.streetAddress).toBe("1018 Hummingbird Way");
    expect(address.postalCode).toBe("60103");
    expect(main?.telephone).toBe("+1-630-830-9867");
  });

  it("is in the prerender list and does not reuse the noindex funnel title", () => {
    expect(getPrerenderPaths()).toContain("/contact/");
    expect(getSeo("/funnel").title).not.toBe(seo.title);
    expect(getSeo("/funnel").robots).toBe("noindex, nofollow");
  });
});
