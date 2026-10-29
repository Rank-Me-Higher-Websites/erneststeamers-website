import { describe, expect, it } from "vitest";
import { faqs } from "@/data/faqs";
import { getSeo } from "@/seo";

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
  });
});
