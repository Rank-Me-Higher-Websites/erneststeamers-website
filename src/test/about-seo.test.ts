import { describe, expect, it } from "vitest";
import { getSeo, renderSeoHead } from "@/seo";

describe("about SEO", () => {
  const seo = getSeo("/about/");

  it("keeps one short title, a description with the phone, and a trailing-slash canonical", () => {
    expect(seo.title).toBe("About Ernest Steamers | Carpet Cleaning in Franklin Park, IL");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(
      "Meet Ernest Steamers, a Franklin Park, IL carpet, rug and upholstery steam cleaning company serving Chicago and the suburbs. Call (630) 403-0180.",
    );
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("(630) 403-0180");
    expect(seo.canonical).toBe("https://erneststeamers.com/about/");
  });

  it("uses AboutPage and breadcrumb schema without ratings or a NAP change", () => {
    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const nodes = block["@graph"];
    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);

    const page = nodes.find((node) => node["@type"] === "AboutPage");
    expect(page?.["@id"]).toBe("https://erneststeamers.com/about/#webpage");

    const businesses = nodes.filter((node) => node["@type"] === "LocalBusiness");
    expect(businesses).toHaveLength(1);
    const main = businesses[0];
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(main?.["@id"]).toBe("https://erneststeamers.com/#business");
    expect(address.streetAddress).toBe("10549 Crown Rd #4");
    expect(address.postalCode).toBe("60131");
    expect(main?.telephone).toBe("+1-630-403-0180");
    expect(serialized).not.toMatch(/branchOf|Hummingbird|60103/);

    const crumbs = nodes.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string; item: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual(["Home", "About"]);
    expect(crumbs.itemListElement[1].item).toBe("https://erneststeamers.com/about/");
  });

  it("preloads the van photo and uses the real share image", () => {
    const head = renderSeoHead(seo);
    expect(head).toContain("/images/home/van-768.avif");
    expect(head).toContain('rel="preload" as="image"');
    expect(head).not.toContain("hero-1200.avif");
    expect(head).not.toContain("carpet-768.avif");
    expect(head).toContain('property="og:image" content="https://erneststeamers.com/images/home/og.jpg"');
    expect(head).toContain('property="og:image:width" content="1200"');
    expect(head).toContain('property="og:image:height" content="630"');
    expect(head).toContain('property="og:locale" content="en_US"');
    expect(head).toContain('name="twitter:image" content="https://erneststeamers.com/images/home/og.jpg"');
    expect(head).not.toMatch(/apple-touch-icon\.png/);
  });
});
