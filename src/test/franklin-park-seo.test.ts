import { describe, expect, it } from "vitest";
import { franklinParkFaqs } from "@/data/franklinParkPage";
import { getSeo, renderSeoHead } from "@/seo";

describe("Franklin Park SEO", () => {
  const seo = getSeo("/locations/franklin-park/");

  it("shortens the title and description without moving the canonical", () => {
    expect(seo.title).toBe("Carpet Cleaning in Franklin Park, IL | Ernest Steamers");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(
      "Carpet, rug and upholstery steam cleaning from our Franklin Park office, 10549 Crown Rd #4. Call (630) 403-0180 for a quote.",
    );
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("(630) 403-0180");
    expect(seo.canonical).toBe("https://erneststeamers.com/locations/franklin-park/");
  });

  it("keeps the branch LocalBusiness and adds breadcrumb and FAQ schema, with no rating", () => {
    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const nodes = block["@graph"];
    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);
    expect(serialized).not.toMatch(/"geo"|latitude|longitude/);

    const franklin = nodes.find((node) => node["@id"] === "https://erneststeamers.com/locations/franklin-park/#business");
    expect(franklin?.name).toBe("Ernest Steamers Franklin Park");
    expect(franklin?.url).toBe("https://erneststeamers.com/locations/franklin-park/");
    expect(franklin?.telephone).toBe("+1-630-403-0180");
    expect(franklin?.email).toBe("info@erneststeamers.com");
    expect(franklin?.description).toBe(
      "Carpet, rug, and upholstery steam cleaning at the Ernest Steamers office, 10549 Crown Rd #4, Franklin Park, IL 60131. Serving Franklin Park and nearby suburbs. Call (630) 403-0180.",
    );
    const address = franklin?.address as {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
    };
    expect(address).toMatchObject({
      streetAddress: "10549 Crown Rd #4",
      addressLocality: "Franklin Park",
      addressRegion: "IL",
      postalCode: "60131",
    });
    expect((franklin?.branchOf as { "@id": string })["@id"]).toBe("https://erneststeamers.com/#business");
    expect((franklin?.parentOrganization as { "@id": string })["@id"]).toBe("https://erneststeamers.com/#business");
    expect((franklin?.areaServed as Array<{ name: string }>).map((city) => city.name)).toEqual([
      "Franklin Park",
      "Chicago",
      "Des Plaines",
      "Elmhurst",
      "Niles",
    ]);
    expect(franklin?.openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "07:00",
        closes: "17:00",
      },
    ]);

    const main = nodes.find((node) => node["@id"] === "https://erneststeamers.com/#business");
    const mainAddress = main?.address as { streetAddress: string; postalCode: string };
    expect(mainAddress.streetAddress).toBe("1018 Hummingbird Way");
    expect(mainAddress.postalCode).toBe("60103");
    expect(main?.openingHoursSpecification).toEqual(franklin?.openingHoursSpecification);

    const page = nodes.find((node) => node["@type"] === "WebPage");
    expect(page?.description).toBe(seo.description);
    expect(page?.name).toBe(seo.title);

    const crumbs = nodes.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string; item: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual(["Home", "Service Areas", "Franklin Park"]);
    expect(crumbs.itemListElement[2].item).toBe("https://erneststeamers.com/locations/franklin-park/");

    const faq = nodes.find((node) => node["@type"] === "FAQPage") as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(faq.mainEntity.map((item) => item.name)).toEqual(franklinParkFaqs.map((item) => item.q));
    expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(franklinParkFaqs.map((item) => item.a));
  });

  it("preloads the carpet photo used in the hero", () => {
    const head = renderSeoHead(seo);
    expect(head).toContain('rel="preload" as="image"');
    expect(head).toContain("/images/home/carpet-768.avif");
    expect(head).not.toContain("hero-1200.avif");
  });
});
