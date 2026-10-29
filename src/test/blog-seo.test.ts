import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { getSeo } from "@/seo";

const currentTitles: Record<string, string> = {
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
    expect(seo.image).toBe("https://erneststeamers.com/images/blog/carpet-tips.jpg");

    const serialized = JSON.stringify(seo.jsonLd);
    expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|BlogPosting|"Review"/);
    expect(serialized).toContain('"@type":"Blog"');
    expect(serialized).toContain('"@type":"Article"');
    expect(serialized).toContain('"@type":"BreadcrumbList"');
    for (const post of blogPosts) {
      expect(serialized).toContain(post.title);
    }

    const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
    const main = block["@graph"].find((node) => node["@id"] === "https://erneststeamers.com/#business");
    const address = main?.address as { streetAddress: string; postalCode: string };
    expect(address.streetAddress).toBe("1018 Hummingbird Way");
    expect(address.postalCode).toBe("60103");
    expect(main?.telephone).toBe("+1-630-403-0180");
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
      expect(serialized).not.toMatch(/aggregateRating|reviewCount|ratingValue|BlogPosting|"Review"/);
      expect(serialized).toContain('"@type":"Article"');
      expect(serialized).toContain('"@type":"BreadcrumbList"');
      expect(serialized).toContain(`"headline":${JSON.stringify(post.title)}`);
      expect(serialized).toContain(`"datePublished":"${post.date}"`);
      expect(serialized).toContain(`"dateModified":"${post.date}"`);
      expect(serialized).toContain('"@type":"Organization"');
      expect(serialized).not.toContain("Person");

      const block = seo.jsonLd[0] as { "@graph": Array<Record<string, unknown>> };
      const franklin = block["@graph"].find(
        (node) => node["@id"] === "https://erneststeamers.com/locations/franklin-park/#business",
      );
      const franklinAddress = franklin?.address as { streetAddress: string };
      expect(franklinAddress.streetAddress).toBe("10549 Crown Rd #4");
    }
  });
});
