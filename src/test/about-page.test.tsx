import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import About from "@/pages/About";

const leadFields = ["name", "phone", "email", "address", "service", "rooms", "squareFootage", "preferredDate", "message", "website"];

const banned =
  /500\+|10\+|400\+|100%|5\.0|4\.9|BBB|IICRC|eco-friendly|non-toxic|satisfied|years in business|founder|testimonial|Insured|Bonded|Top-rated|same-day|24-hour|kids and pets|★★|aggregateRating/i;

describe("about page", () => {
  it("has one h1, two offices, real job photos, and no invented trust content", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/about/"]}>
        <About />
      </MemoryRouter>,
    );

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([
      "About Ernest Steamers — Chicago-Area Carpet Cleaners",
    ]);

    const main = container.querySelector("main");
    const mainText = main?.textContent ?? "";
    expect(mainText).toContain("Our story");
    expect(mainText).toContain("What to expect");
    expect(mainText).toContain("Our offices");
    expect(mainText).toContain("Certified technicians");
    expect(mainText).toContain("starts at $99");
    expect(mainText).toContain("Primary office");
    expect(mainText).toContain("1018 Hummingbird Way");
    expect(mainText).toContain("Bartlett, IL 60103");
    expect(mainText).toContain("10549 Crown Rd #4");
    expect(mainText).toContain("Franklin Park, IL 60131");
    expect(mainText).toContain("630-830-9867");
    expect(mainText).not.toMatch(banned);

    expect(container.querySelector("a[href='tel:6308309867']")).toBeNull();
    expect(container.querySelectorAll("a[href='tel:+16308309867']").length).toBeGreaterThan(0);
    expect(container.querySelector("a[href='/locations/franklin-park/']")).toBeTruthy();
    expect(container.querySelector("a[href='/services/']")).toBeTruthy();
    expect(container.querySelector("a[href='/service-areas/']")).toBeTruthy();
    expect(container.querySelector("a[href='/blog/']")).toBeTruthy();
    expect(container.querySelector("a[href='#about-quote']")).toBeTruthy();

    const directions = [...container.querySelectorAll("a[href*='google.com/maps/search']")];
    expect(directions).toHaveLength(2);
    const hrefs = directions.map((link) => link.getAttribute("href") ?? "");
    expect(hrefs.some((href) => href.includes(encodeURIComponent("1018 Hummingbird Way, Bartlett, IL 60103")))).toBe(true);
    expect(hrefs.some((href) => href.includes(encodeURIComponent("10549 Crown Rd #4, Franklin Park, IL 60131")))).toBe(
      true,
    );

    expect(container.querySelectorAll("#what-to-expect ol > li")).toHaveLength(4);

    const photos = [...container.querySelectorAll("main picture img")];
    expect(photos).toHaveLength(3);
    for (const photo of photos) {
      expect(photo.getAttribute("width")).toBeTruthy();
      expect(photo.getAttribute("height")).toBeTruthy();
      const alt = photo.getAttribute("alt") ?? "";
      expect(alt.length).toBeGreaterThan(10);
      expect(alt.length).toBeLessThanOrEqual(125);
      expect(photo.getAttribute("src")).toMatch(/\/images\/home\/.+\.jpg$/);
    }
    expect(photos[0].getAttribute("fetchpriority")).toBe("high");
    expect(photos[0].getAttribute("loading")).toBe("eager");
    expect(photos.slice(1).every((photo) => photo.getAttribute("loading") === "lazy")).toBe(true);

    const form = container.querySelector("#about-quote-form");
    expect(form?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    for (const name of leadFields) {
      expect(form?.querySelector(`[name='${name}']`)).toBeTruthy();
    }
    expect(form?.getAttribute("action")).toBeNull();

    for (const link of container.querySelectorAll("a[href^='/']")) {
      const href = link.getAttribute("href") ?? "";
      const base = href.split(/[?#]/)[0];
      if (base === "/" || base.includes(".")) continue;
      expect(base.endsWith("/"), href).toBe(true);
    }
  });
});
