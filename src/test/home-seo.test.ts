import { describe, expect, it } from "vitest";
import { faqs } from "@/data/faqs";
import { getPrerenderPaths, getSeo, renderSeoHead, applySeoToDocument } from "@/seo";

describe("home SEO", () => {
  const seo = getSeo("/");

  it("keeps the title and description within the SERP limits", () => {
    expect(seo.title).toBe("Carpet Cleaning in Chicago & Suburbs | Ernest Steamers");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(
      "Steam cleaning for carpet, rugs and upholstery in Chicago and the suburbs. Certified technicians, carpet cleaning starts at $99. Call (630) 403-0180.",
    );
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.canonical).toBe("https://erneststeamers.com/");
  });

  it("keeps LocalBusiness NAP and FAQ text, with no rating schema", () => {
    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const nodes = block["@graph"];
    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);

    const main = nodes.find((node) => node["@id"] === "https://erneststeamers.com/#business");
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(address.streetAddress).toBe("1018 Hummingbird Way");
    expect(address.postalCode).toBe("60103");
    expect(main?.telephone).toBe("+1-630-403-0180");

    const franklin = nodes.find((node) => node["@id"] === "https://erneststeamers.com/locations/franklin-park/#business");
    const franklinAddress = franklin?.address as { streetAddress: string; postalCode: string };
    expect(franklinAddress.streetAddress).toBe("10549 Crown Rd #4");
    expect(franklinAddress.postalCode).toBe("60131");

    const faq = nodes.find((node) => node["@type"] === "FAQPage") as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(faq.mainEntity.map((item) => item.name)).toEqual(faqs.map((item) => item.q));
    expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(faqs.map((item) => item.a));
    const answers = faqs.map((item) => item.a).join("\n");
    expect(answers).toContain("Carpet cleaning starts at $99.");
    expect(answers).not.toMatch(/Aurora|4–6 hours|eco-friendly|non-toxic|enzyme|same-day|24 hours|Absolutely|kids and pets/);
  });

  it("emits one WebSite node and the 1200x630 share image on non-blog pages", () => {
    for (const path of getPrerenderPaths()) {
      const seo = getSeo(path);
      const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
      const websites = block["@graph"].filter((node) => node["@type"] === "WebSite");
      expect(websites).toHaveLength(1);
      expect(websites[0]["@id"]).toBe("https://erneststeamers.com/#website");
      const businesses = block["@graph"].filter((node) => node["@type"] === "LocalBusiness");
      expect(businesses.length).toBeGreaterThanOrEqual(2);
      for (const business of businesses) {
        expect(business.image).toBe("https://erneststeamers.com/images/home/og.jpg");
      }
      const head = renderSeoHead(seo);
      expect(head).toContain('property="og:locale" content="en_US"');
      expect(head).not.toContain("apple-touch-icon.png");
      if (path === "/blog" || path.startsWith("/blog/")) {
        expect(head).not.toContain('property="og:image:width"');
        expect(seo.image).toMatch(/\/images\/blog\/.+\.jpg$/);
      } else {
        expect(head).toContain('property="og:image" content="https://erneststeamers.com/images/home/og.jpg"');
        expect(head).toContain('property="og:image:width" content="1200"');
        expect(head).toContain('property="og:image:height" content="630"');
      }
    }

    document.head.innerHTML = "";
    applySeoToDocument(getSeo("/services/"));
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      "https://erneststeamers.com/images/home/og.jpg",
    );
    expect(document.head.querySelector('meta[property="og:image:width"]')?.getAttribute("content")).toBe("1200");
    expect(document.head.querySelector('meta[property="og:image:height"]')?.getAttribute("content")).toBe("630");
    expect(document.head.querySelector('meta[property="og:locale"]')?.getAttribute("content")).toBe("en_US");

    applySeoToDocument(getSeo("/blog/carpet-cleaning-tips-homeowners/"));
    expect(document.head.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      "https://erneststeamers.com/images/blog/carpet-tips.jpg",
    );
    expect(document.head.querySelector('meta[property="og:image:width"]')).toBeNull();
    expect(document.head.querySelector('meta[property="og:image:height"]')).toBeNull();
    expect(document.head.querySelector('meta[property="og:locale"]')?.getAttribute("content")).toBe("en_US");
  });
});
