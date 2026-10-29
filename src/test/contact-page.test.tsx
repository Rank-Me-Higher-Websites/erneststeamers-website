import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { render as prerender } from "@/entry-server";
import Contact from "@/pages/Contact";

const leadFields = ["name", "phone", "email", "address", "service", "rooms", "squareFootage", "preferredDate", "message", "website"];

const banned =
  /500\+|10\+|400\+|100%|5\.0|4\.9|BBB|IICRC|eco-friendly|non-toxic|satisfied|years in business|founder|testimonial|Insured|Bonded|Top-rated|same-day|24-hour|kids and pets|★★|aggregateRating|7 am|9 am|Business Hours|Monday to Friday/i;

describe("contact page", () => {
  it("has one h1, a full quote form, both offices, and a click-to-call number", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/contact/"]}>
        <Contact />
      </MemoryRouter>,
    );

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([
      "Get a Free Carpet Cleaning Quote",
    ]);

    const main = container.querySelector("main");
    const mainText = main?.textContent ?? "";
    expect(mainText).toContain("Certified technicians");
    expect(mainText).toContain("starts at $99");
    expect(mainText).toContain("Primary office");
    expect(mainText).toContain("1018 Hummingbird Way");
    expect(mainText).toContain("Bartlett, IL 60103");
    expect(mainText).toContain("10549 Crown Rd #4");
    expect(mainText).toContain("Franklin Park, IL 60131");
    expect(mainText).toContain("(630) 403-0180");
    expect(mainText).toContain("info@erneststeamers.com");
    expect(mainText).toContain("What happens next");
    expect(mainText).not.toMatch(banned);

    expect(container.querySelector("a[href='tel:6308309867']")).toBeNull();
    expect(container.querySelectorAll("a[href='tel:+16304030180']").length).toBeGreaterThan(0);
    expect(container.querySelector("a[href='/contact/']")).toBeTruthy();
    expect(container.querySelector("a[href='/locations/franklin-park/']")).toBeTruthy();
    expect(container.querySelector("a[href='/services/']")).toBeTruthy();
    expect(container.querySelector("a[href='/service-areas/']")).toBeTruthy();
    expect(container.querySelector("a[href='#contact-quote']")).toBeTruthy();

    const directions = [...container.querySelectorAll("a[href*='google.com/maps/search']")];
    expect(directions.length).toBeGreaterThanOrEqual(2);
    const hrefs = directions.map((link) => link.getAttribute("href") ?? "");
    expect(hrefs.some((href) => href.includes(encodeURIComponent("1018 Hummingbird Way, Bartlett, IL 60103")))).toBe(true);
    expect(hrefs.some((href) => href.includes(encodeURIComponent("10549 Crown Rd #4, Franklin Park, IL 60131")))).toBe(
      true,
    );

    expect(container.querySelectorAll("[aria-labelledby='next-heading'] ol > li")).toHaveLength(3);

    const photos = [...container.querySelectorAll("main picture img")];
    expect(photos).toHaveLength(2);
    for (const photo of photos) {
      expect(photo.getAttribute("width")).toBeTruthy();
      expect(photo.getAttribute("height")).toBeTruthy();
      const alt = photo.getAttribute("alt") ?? "";
      expect(alt.length).toBeGreaterThan(10);
      expect(alt.length).toBeLessThanOrEqual(125);
      expect(photo.getAttribute("loading")).toBe("lazy");
    }

    const form = container.querySelector("#contact-quote");
    expect(form?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    for (const name of leadFields) {
      const field = form?.querySelector(`[name='${name}']`);
      expect(field).toBeTruthy();
      expect(field?.closest("[hidden]")).toBeNull();
    }
    expect(form?.getAttribute("action")).toBeNull();

    const bar = container.querySelector("[data-testid='bar-sticky-mobile']");
    expect(bar?.textContent).toContain("Call (630) 403-0180");
    expect(bar?.textContent).not.toMatch(/Get a quote/i);

    for (const link of container.querySelectorAll("a[href^='/']")) {
      const href = link.getAttribute("href") ?? "";
      const base = href.split(/[?#]/)[0];
      if (base === "/" || base.includes(".")) continue;
      expect(base.endsWith("/"), href).toBe(true);
    }
  });

  it("prerenders the contact page and LocalBusiness schema with info@erneststeamers.com", () => {
    const { html, head } = prerender("/contact/");
    expect(html).toContain("mailto:info@erneststeamers.com");
    expect(html).toContain("info@erneststeamers.com");
    expect(head).toContain('"email":"info@erneststeamers.com"');

    const blocks = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) =>
      JSON.parse(match[1]) as unknown,
    );
    expect(blocks.length).toBeGreaterThan(0);

    const nodes: Array<Record<string, unknown>> = [];
    const walk = (value: unknown) => {
      if (Array.isArray(value)) {
        value.forEach(walk);
        return;
      }
      if (!value || typeof value !== "object") return;
      nodes.push(value as Record<string, unknown>);
      for (const child of Object.values(value as Record<string, unknown>)) walk(child);
    };
    blocks.forEach(walk);

    const businesses = nodes.filter((node) => node["@type"] === "LocalBusiness");
    expect(businesses.length).toBeGreaterThanOrEqual(2);
    for (const business of businesses) {
      expect(business.email).toBe("info@erneststeamers.com");
    }

    const emails = `${head}\n${html}`.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) ?? [];
    expect([...new Set(emails)]).toEqual(["info@erneststeamers.com"]);
  });

  it("prerenders Monday–Friday and Saturday–Sunday hours on the contact page and every LocalBusiness node", () => {
    const { html, head } = prerender("/contact/");
    expect(html).toContain("Monday–Friday");
    expect(html).toContain("7:00 AM–9:00 PM");
    expect(html).toContain("Saturday–Sunday");
    expect(html).toContain("7:00 AM–5:00 PM");
    expect(html).not.toContain("7 am to 7 pm");
    expect(html).not.toContain("9 am to 3 pm");

    const blocks = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) =>
      JSON.parse(match[1]) as unknown,
    );
    const nodes: Array<Record<string, unknown>> = [];
    const walk = (value: unknown) => {
      if (Array.isArray(value)) {
        value.forEach(walk);
        return;
      }
      if (!value || typeof value !== "object") return;
      nodes.push(value as Record<string, unknown>);
      for (const child of Object.values(value as Record<string, unknown>)) walk(child);
    };
    blocks.forEach(walk);

    const hours = [
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
    ];
    const businesses = nodes.filter((node) => node["@type"] === "LocalBusiness");
    expect(businesses.length).toBeGreaterThanOrEqual(2);
    for (const business of businesses) {
      expect(business.openingHoursSpecification).toEqual(hours);
    }
    expect(head).toContain('"opens":"07:00","closes":"21:00"');
    expect(head).toContain('"opens":"07:00","closes":"17:00"');
    expect(head).not.toContain('"closes":"19:00"');
    expect(head).not.toContain('"closes":"15:00"');
  });
});
