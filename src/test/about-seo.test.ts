import { describe, expect, it } from "vitest";
import { getSeo, renderSeoHead } from "@/seo";

describe("about SEO", () => {
  const seo = getSeo("/about/");

  it("keeps one short title, a description with the phone, and a trailing-slash canonical", () => {
    expect(seo.title).toBe("About Ernest Steamers | Carpet Cleaning in Bartlett, IL");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(
      "Meet Ernest Steamers, a Bartlett, IL carpet, rug and upholstery steam cleaning company serving Chicago and the suburbs. Call 630-830-9867.",
    );
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("630-830-9867");
    expect(seo.canonical).toBe("https://erneststeamers.com/about/");
  });

  it("uses AboutPage and breadcrumb schema without ratings or a NAP change", () => {
    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const nodes = block["@graph"];
    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);

    const page = nodes.find((node) => node["@type"] === "AboutPage");
    expect(page?.["@id"]).toBe("https://erneststeamers.com/about/#webpage");

    const main = nodes.find((node) => node["@id"] === "https://erneststeamers.com/#business");
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(address.streetAddress).toBe("1018 Hummingbird Way");
    expect(address.postalCode).toBe("60103");
    expect(main?.telephone).toBe("+1-630-830-9867");

    const franklin = nodes.find((node) => node["@id"] === "https://erneststeamers.com/locations/franklin-park/#business");
    const franklinAddress = franklin?.address as { streetAddress: string; postalCode: string };
    expect(franklinAddress.streetAddress).toBe("10549 Crown Rd #4");
    expect(franklinAddress.postalCode).toBe("60131");

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
    expect(head).toContain('name="twitter:image" content="https://erneststeamers.com/images/home/og.jpg"');
    expect(head).not.toMatch(/property="og:image" content="[^"]*apple-touch-icon\.png"/);
  });
});
