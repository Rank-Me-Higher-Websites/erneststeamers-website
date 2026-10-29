import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { franklinNearbyLabels, franklinParkFaqs } from "@/data/franklinParkPage";
import { publishedTowns } from "@/data/serviceAreas";
import { SECONDARY_OFFICES } from "@/data/locations";
import { serviceBlocks } from "@/data/servicesPage";
import LocationPage from "@/pages/Location";

const leadFields = [
  "name",
  "phone",
  "email",
  "address",
  "service",
  "rooms",
  "squareFootage",
  "preferredDate",
  "message",
  "website",
];

const banned =
  /Top-rated|High-pressure|Stain protection|Pickup & delivery|IICRC|BBB|5\.0|4\.9|★★|aggregateRating|same-day|24-hour|24 hours|non-toxic|Insured|Bonded|100%|500\+|testimonial|years in business|kids and pets|eco-friendly|Aurora|Arlington Heights/i;

const hours = /\bhours\b|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|7 am|9 am/i;

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean);
}

describe("Franklin Park page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps the NAP, a map link, real photos, and the existing quote form", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(
      <MemoryRouter initialEntries={["/locations/franklin-park/"]}>
        <Routes>
          <Route path="/locations/:slug" element={<LocationPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([
      "Carpet and Upholstery Cleaning in Franklin Park, IL",
    ]);

    const main = container.querySelector("main");
    const mainText = main?.textContent ?? "";
    expect(words(mainText).length).toBeGreaterThanOrEqual(400);
    expect(mainText).toContain("Certified technicians");
    expect(mainText).toContain("starts at $99");
    expect(mainText).toContain("10549 Crown Rd #4");
    expect(mainText).toContain("Franklin Park, IL 60131");
    expect(mainText).toContain("(630) 403-0180");
    expect(mainText).toContain("info@erneststeamers.com");
    expect(mainText).toContain("1018 Hummingbird Way");
    expect(mainText).toContain("Bartlett, IL 60103");
    expect(mainText).toContain("branch");
    expect(mainText).toContain("Get A Free Quote");
    expect(mainText).not.toMatch(banned);
    expect(mainText).not.toMatch(hours);

    for (const faq of franklinParkFaqs) {
      expect(mainText).toContain(faq.q);
      expect(mainText).toContain(faq.a);
    }

    expect(container.querySelector("a[href='tel:6308309867']")).toBeNull();
    expect(container.querySelectorAll("a[href='tel:+16304030180']").length).toBeGreaterThan(0);

    const nearby = franklinNearbyLabels(SECONDARY_OFFICES[0].nearby);
    const chips = [...(document.getElementById("nearby-heading")?.closest("section")?.querySelectorAll("a") ?? [])];
    expect(chips.map((chip) => chip.textContent)).toEqual(nearby);
    for (const chip of chips) {
      expect(chip.getAttribute("href")).toBe("/service-areas/");
      expect(publishedTowns).toContain(chip.textContent);
    }
    expect(nearby).toEqual([
      "Chicago",
      "Des Plaines",
      "Elmhurst",
      "Niles",
      "Franklin Park",
      "Wheeling",
      "Morton Grove",
      "Arlington Hts",
      "Mt Prospect",
      "Skokie",
    ]);

    const services = document.getElementById("services-heading")?.closest("section");
    const cards = [...(services?.querySelectorAll("article") ?? [])];
    expect(cards.map((card) => card.querySelector("h3")?.textContent)).toEqual(serviceBlocks.map((service) => service.title));
    expect(cards[0]?.textContent).toContain("Starts at $99");
    for (const card of cards.slice(1)) {
      expect(card.textContent).not.toMatch(/\$99|Starts at/);
    }

    const photos = [...container.querySelectorAll("main picture img")];
    expect(photos).toHaveLength(7);
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

    expect(container.querySelector("main iframe")).toBeNull();
    const showMap = [...container.querySelectorAll("button")].find((button) => button.textContent === "Show map");
    fireEvent.click(showMap!);
    const frame = container.querySelector("main iframe");
    expect(frame?.getAttribute("src")).toContain("google.com/maps");
    expect(frame?.getAttribute("src")).toContain(encodeURIComponent("10549 Crown Rd #4, Franklin Park, IL 60131"));

    const directions = [...container.querySelectorAll("a[href*='google.com/maps/search']")];
    expect(directions.length).toBeGreaterThanOrEqual(1);
    expect(
      directions.some((link) =>
        (link.getAttribute("href") ?? "").includes(encodeURIComponent("10549 Crown Rd #4, Franklin Park, IL 60131")),
      ),
    ).toBe(true);

    expect(container.querySelector("a[href='/']")).toBeTruthy();
    expect(container.querySelector("a[href='/services/']")).toBeTruthy();
    expect(container.querySelector("a[href='/service-areas/']")).toBeTruthy();
    expect(container.querySelector("a[href='/blog/carpet-cleaning-tips-homeowners/']")).toBeTruthy();
    expect(container.querySelector("a[href='#franklin-park-quote']")).toBeTruthy();

    const form = container.querySelector("#franklin-park-quote-form");
    expect(form?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    for (const name of leadFields) {
      expect(form?.querySelector(`[name='${name}']`)).toBeTruthy();
    }
    expect(form?.getAttribute("action")).toBeNull();

    fireEvent.change(form!.querySelector("[name='name']")!, { target: { value: "Ada Lovelace" } });
    fireEvent.change(form!.querySelector("[name='phone']")!, { target: { value: "6305550100" } });
    fireEvent.change(form!.querySelector("[name='email']")!, { target: { value: "ada@example.com" } });
    fireEvent.change(form!.querySelector("[name='address']")!, { target: { value: "10549 Crown Rd, Franklin Park" } });
    fireEvent.change(form!.querySelector("[name='service']")!, { target: { value: "Upholstery Cleaning" } });
    fireEvent.submit(form!);

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/leads");
    expect(init.method).toBe("POST");
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      name: "Ada Lovelace",
      phone: "6305550100",
      email: "ada@example.com",
      address: "10549 Crown Rd, Franklin Park",
      service: "Upholstery Cleaning",
      website: "",
    });
    for (const name of ["rooms", "squareFootage", "preferredDate", "message", "source"]) {
      expect(body).toHaveProperty(name);
    }

    for (const link of container.querySelectorAll("a[href^='/']")) {
      const href = link.getAttribute("href") ?? "";
      const base = href.split(/[?#]/)[0];
      if (base === "/" || base.includes(".")) continue;
      expect(base.endsWith("/"), href).toBe(true);
    }
  });
});
