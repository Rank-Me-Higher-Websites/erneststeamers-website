import { describe, expect, it } from "vitest";
import { serviceAreasDescription, serviceAreasTitle } from "@/data/serviceAreas";
import { getSeo, renderSeoHead } from "@/seo";

const areaServed = [
  "Chicago",
  "Wheeling",
  "Des Plaines",
  "Morton Grove",
  "Arlington Heights",
  "Niles",
  "Mt Prospect",
  "Skokie",
  "Bloomingdale",
  "Clarendon Hills",
  "St Charles",
  "Downers Grove",
  "Glen Ellyn",
  "Naperville",
  "Elmhurst",
  "Orland Park",
  "Northbrook",
  "Libertyville",
  "Northfield",
  "Lake Forest",
  "Glencoe",
  "Evanston",
  "Deerfield",
  "Winnetka",
  "Highland Park",
  "Wilmette",
  "Lake Bluff",
  "Glenview",
  "Barrington",
  "Long Grove",
  "Palatine",
  "Hawthorn Woods",
  "Elgin",
  "Vernon Hills",
  "Schaumburg",
  "Buffalo Grove",
  "Bartlett",
  "Aurora",
  "Franklin Park",
];

describe("service areas SEO", () => {
  const seo = getSeo("/service-areas/");

  it("keeps a short title, a description with the phone, and the trailing-slash canonical", () => {
    expect(seo.title).toBe(serviceAreasTitle);
    expect(seo.title).toBe("Service Areas | Chicago & Suburbs | Ernest Steamers");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description).toBe(serviceAreasDescription);
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("(630) 403-0180");
    expect(seo.canonical).toBe("https://erneststeamers.com/service-areas/");
  });

  it("adds a breadcrumb and keeps LocalBusiness areaServed, with no rating", () => {
    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const nodes = block["@graph"];
    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);
    expect(nodes.some((node) => node["@type"] === "FAQPage")).toBe(false);

    const businesses = nodes.filter((node) => node["@type"] === "LocalBusiness");
    expect(businesses).toHaveLength(1);
    const main = businesses[0];
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(main?.["@id"]).toBe("https://erneststeamers.com/#business");
    expect(address.streetAddress).toBe("10549 Crown Rd #4");
    expect(address.postalCode).toBe("60131");
    expect(main?.telephone).toBe("+1-630-403-0180");
    const served = (main?.areaServed as Array<{ name: string }>).map((city) => city.name);
    expect(served).toEqual(areaServed);
    expect(serialized).not.toMatch(/branchOf|Hummingbird|60103/);

    const crumbs = nodes.find((node) => node["@type"] === "BreadcrumbList") as {
      itemListElement: Array<{ name: string; item: string }>;
    };
    expect(crumbs.itemListElement.map((item) => item.name)).toEqual(["Home", "Service Areas"]);
    expect(crumbs.itemListElement[1].item).toBe("https://erneststeamers.com/service-areas/");
  });

  it("does not preload a hero image", () => {
    const head = renderSeoHead(seo);
    expect(head).not.toContain('rel="preload" as="image"');
  });
});
