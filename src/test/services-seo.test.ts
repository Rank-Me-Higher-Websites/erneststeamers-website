import { describe, expect, it } from "vitest";
import { SERVICE_OPTIONS } from "@/components/QuoteForm";
import { partsText, serviceBlocks, serviceFaqs } from "@/data/servicesPage";
import { getSeo, renderSeoHead } from "@/seo";

describe("services SEO", () => {
  const seo = getSeo("/services/");

  it("keeps the title, description, and canonical within the SERP limits", () => {
    expect(seo.title).toBe("Carpet, Rug & Upholstery Cleaning Services | Ernest Steamers");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(
      "Carpet, upholstery, area rug, tile & grout and commercial carpet cleaning in Chicago and suburbs. Carpet cleaning starts at $99. Call (630) 403-0180.",
    );
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("(630) 403-0180");
    expect(seo.canonical).toBe("https://erneststeamers.com/services/");
  });

  it("adds breadcrumb, service, and FAQ schema without ratings or a NAP change", () => {
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

    const crumbs = nodes.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ position: number; name: string; item: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual(["Home", "Services"]);
    expect(crumbs.itemListElement[1].item).toBe("https://erneststeamers.com/services/");

    const services = nodes.filter((node) => node["@type"] === "Service");
    expect(services.map((node) => node.name)).toEqual([...SERVICE_OPTIONS]);
    for (const service of services) {
      const source = serviceBlocks.find((block) => block.service === service.name);
      expect(service.description).toBe(partsText(source!.body));
      expect(service.url).toBe(`https://erneststeamers.com/services/#${source!.id}`);
      if (source?.startsAt) {
        const offers = service.offers as { description: string; price?: string };
        expect(offers.description).toBe("Starts at $99");
        expect(offers.price).toBeUndefined();
      } else {
        expect(service.offers).toBeUndefined();
      }
    }

    const faq = nodes.find((node) => node["@type"] === "FAQPage") as {
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
    };
    expect(faq.mainEntity.map((item) => item.name)).toEqual(serviceFaqs.map((item) => item.q));
    expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(serviceFaqs.map((item) => item.a));
  });

  it("preloads the carpet photo on services and leaves other pages alone", () => {
    const servicesHead = renderSeoHead(seo);
    expect(servicesHead).toContain("/images/home/carpet-768.avif");
    expect(servicesHead).not.toContain("hero-1200.avif");

    const homeHead = renderSeoHead(getSeo("/"));
    expect(homeHead).toContain("/images/home/hero-1200.avif");
    expect(homeHead).not.toContain("carpet-768.avif");

    const aboutHead = renderSeoHead(getSeo("/about"));
    expect(aboutHead).not.toContain("carpet-768.avif");
    expect(aboutHead).not.toContain("hero-1200.avif");
  });
});
