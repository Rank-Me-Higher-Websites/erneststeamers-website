import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { getSeo } from "@/seo";

const currentTitles: Record<string, string> = {
  "how-often-clean-tile-grout": "How Often to Clean Tile and Grout | Ernest Steamers",
  "winter-salt-slush-carpet-care": "Winter Salt and Slush on Carpet | Ernest Steamers",
  "carpet-cleaning-tips-homeowners": "Carpet Cleaning Tips for Homeowners | Ernest Steamers",
  "remove-pet-stains-odors": "How to Remove Pet Stains & Odors for Good | Ernest Steamers",
  "steam-cleaning-vs-dry-cleaning-carpet": "Steam Cleaning vs. Dry Cleaning Carpet | Ernest Steamers",
  "upholstery-cleaning-benefits": "Upholstery Cleaning Benefits | Ernest Steamers",
  "carpet-cleaning-allergies-indoor-air-quality": "Carpet Cleaning and Allergies | Ernest Steamers",
  "commercial-carpet-cleaning-business": "Commercial Carpet Cleaning | Ernest Steamers",
};

describe("blog SEO", () => {
  it("keeps the index title and uses Blog plus Article schema without ratings", () => {
    const seo = getSeo("/blog/");
    expect(seo.title).toBe("Carpet Cleaning Blog | Ernest Steamers");
    expect(seo.title.length).toBeLessThanOrEqual(60);
    expect(seo.description.length).toBeGreaterThanOrEqual(120);
    expect(seo.description.length).toBeLessThanOrEqual(155);
    expect(seo.description).toContain("(630) 403-0180");
    expect(seo.canonical).toBe("https://erneststeamers.com/blog/");
    expect(seo.image).toBe("https://erneststeamers.com/images/blog/upholstery.jpg");

    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|BlogPosting|"Review"/);
    expect(serialized).toContain('"@type":"Blog"');
    expect(serialized).toContain('"@type":"Article"');
    expect(serialized).toContain('"@type":"BreadcrumbList"');
    for (const post of blogPosts) {
      expect(serialized).toContain(post.title);
    }

    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const businesses = block["@graph"].filter((node) => node["@type"] === "LocalBusiness");
    expect(businesses).toHaveLength(1);
    const main = businesses[0];
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(main?.["@id"]).toBe("https://erneststeamers.com/#business");
    expect(address.streetAddress).toBe("10549 Crown Rd #4");
    expect(address.postalCode).toBe("60131");
    expect(main?.telephone).toBe("+1-630-403-0180");
    expect(serialized).not.toMatch(/branchOf|Hummingbird|60103/);
  });

  it("keeps each post title at 60 characters or fewer and emits Article schema", () => {
    for (const post of blogPosts) {
      const seo = getSeo(`/blog/${post.slug}/`);
      expect(seo.title).toBe(currentTitles[post.slug]);
      expect(seo.title.length).toBeLessThanOrEqual(60);
      expect(seo.description.length).toBeGreaterThanOrEqual(120);
      expect(seo.description.length).toBeLessThanOrEqual(155);
      expect(seo.description).toContain("(630) 403-0180");
      expect(seo.canonical).toBe(`https://erneststeamers.com/blog/${post.slug}/`);
      expect(seo.ogType).toBe("article");
      expect(seo.image).toBe(`https://erneststeamers.com/images/blog/${post.image}.jpg`);

      const serialized = JSON.stringify(seo.jsonLd);
      const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
      expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|"Review"/);
      if (post.slug === "winter-salt-slush-carpet-care") {
        expect(serialized).toContain('"@type":"BlogPosting"');
        expect(serialized).toContain('"@type":"FAQPage"');
        expect(serialized).not.toContain('"@type":"Article"');
        const faq = block["@graph"].find((node) => node["@type"] === "FAQPage") as {
          mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
        };
        expect(faq.mainEntity).toHaveLength(2);
        expect(faq.mainEntity.map((item) => item.name)).toEqual(post.faqs?.map((item) => item.q));
        expect(faq.mainEntity.map((item) => item.acceptedAnswer.text)).toEqual(post.faqs?.map((item) => item.a));
      } else {
        expect(serialized).not.toContain("BlogPosting");
        expect(serialized).not.toContain("FAQPage");
        expect(serialized).toContain('"@type":"Article"');
      }
      expect(serialized).toContain('"@type":"BreadcrumbList"');
      expect(serialized).toContain(`"headline":${JSON.stringify(post.title)}`);
      expect(serialized).toContain(`"datePublished":"${post.date}"`);
      expect(serialized).toContain(`"dateModified":"${post.date}"`);
      expect(serialized).toContain('"@type":"Organization"');
      expect(serialized).not.toContain("Person");

      const businesses = block["@graph"].filter((node) => node["@type"] === "LocalBusiness");
      expect(businesses).toHaveLength(1);
      const address = businesses[0]?.address as { streetAddress: string; postalCode: string };
      expect(businesses[0]?.["@id"]).toBe("https://erneststeamers.com/#business");
      expect(address.streetAddress).toBe("10549 Crown Rd #4");
      expect(address.postalCode).toBe("60131");
      expect(serialized).not.toMatch(/branchOf|Hummingbird|60103/);
    }
  });
});
