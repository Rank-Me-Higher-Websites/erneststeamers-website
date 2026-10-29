import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SERVICE_OPTIONS } from "@/components/QuoteForm";
import { partsText, serviceBlocks, serviceFaqs } from "@/data/servicesPage";
import Services from "@/pages/Services";

const banned =
  /Top-rated|High-pressure|Stain protection|Pickup & delivery|Pickup and delivery|IICRC|BBB|5\.0|4\.9|★★|aggregateRating|same-day|24 hours|24-hour|non-toxic|Insured|Bonded|100% satisfaction|500\+/i;

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

describe("services page", () => {
  it("has one h1, anchored services, real photos, and the existing blog links", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/services/"]}>
        <Services />
      </MemoryRouter>,
    );

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([
      "Carpet, Rug & Upholstery Cleaning Services",
    ]);

    const main = container.querySelector("main");
    const mainText = main?.textContent ?? "";
    expect(words(mainText).length).toBeGreaterThanOrEqual(400);
    expect(mainText).toContain("Certified technicians");
    expect(mainText).toContain("(630) 403-0180");
    expect(mainText).not.toMatch(banned);

    const pageText = container.textContent ?? "";
    expect(pageText).toContain("1018 Hummingbird Way");
    expect(pageText).toContain("Bartlett, IL 60103");
    expect(pageText).toContain("Franklin Park office");
    expect(container.querySelector("a[href='tel:6308309867']")).toBeNull();
    expect(container.querySelectorAll("a[href='tel:+16304030180']").length).toBeGreaterThan(0);

    const allergies = container.querySelector("a[href='/blog/carpet-cleaning-allergies-indoor-air-quality/']");
    expect(allergies?.textContent).toBe("carpet cleaning and allergies");
    const commercial = container.querySelector("a[href='/blog/commercial-carpet-cleaning-business/']");
    expect(commercial?.textContent).toBe("commercial carpet cleaning for your business");

    expect(serviceBlocks.map((service) => service.service)).toEqual([...SERVICE_OPTIONS]);
    for (const service of serviceBlocks) {
      const section = document.getElementById(service.id);
      expect(section?.querySelector("h2")?.textContent).toBe(service.title);
      const count = words(partsText(service.body)).length;
      expect(count).toBeGreaterThanOrEqual(80);
      expect(count).toBeLessThanOrEqual(120);
      if (service.startsAt) {
        expect(section?.textContent).toContain("Starts at $99");
      } else {
        expect(section?.textContent).not.toMatch(/\$99|Starts at/);
      }
    }

    for (const faq of serviceFaqs) {
      expect(mainText).toContain(faq.q);
      expect(mainText).toContain(faq.a);
    }

    const photos = [...container.querySelectorAll("main picture img")];
    expect(photos).toHaveLength(5);
    for (const photo of photos) {
      expect(photo.getAttribute("width")).toBeTruthy();
      expect(photo.getAttribute("height")).toBeTruthy();
      const alt = photo.getAttribute("alt") ?? "";
      expect(alt.length).toBeGreaterThan(10);
      expect(alt.length).toBeLessThanOrEqual(125);
      expect(photo.getAttribute("src")).toMatch(/\.jpg$/);
    }
    expect(photos[0].getAttribute("fetchpriority")).toBe("high");
    expect(photos[0].getAttribute("loading")).toBe("eager");
    expect(photos.slice(1).every((photo) => photo.getAttribute("loading") === "lazy")).toBe(true);

    const form = container.querySelector("#services-quote-form");
    expect(form?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    for (const name of ["name", "phone", "email", "address", "service", "rooms", "squareFootage", "preferredDate", "message", "website"]) {
      expect(form?.querySelector(`[name='${name}']`)).toBeTruthy();
    }
    expect(form?.getAttribute("action") ?? "").not.toContain("http");

    const quoteLinks = [...container.querySelectorAll("a[href='#services-quote']")];
    expect(quoteLinks.length).toBeGreaterThanOrEqual(2);

    fireEvent.click(document.getElementById("upholstery")!.querySelector("button")!);
    const dialog = await screen.findByRole("dialog");
    expect(dialog.querySelector("select[name='service']")).toHaveValue("Upholstery Cleaning");
    expect(dialog.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();

    for (const link of container.querySelectorAll("a[href^='/']")) {
      const href = link.getAttribute("href") ?? "";
      const base = href.split(/[?#]/)[0];
      if (base === "/" || base.includes(".")) continue;
      expect(base.endsWith("/"), href).toBe(true);
    }
  });
});
