import { fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ServiceAreas from "@/pages/ServiceAreas";
import { publishedTowns, serviceRegions } from "@/data/serviceAreas";

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

describe("service areas page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists only the published towns, with one h1 and a quote form", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = render(
      <MemoryRouter initialEntries={["/service-areas/"]}>
        <ServiceAreas />
      </MemoryRouter>,
    );

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([
      "Service Areas in Chicago & the Suburbs",
    ]);

    const main = container.querySelector("main");
    const mainText = main?.textContent ?? "";
    expect(words(mainText).length).toBeGreaterThanOrEqual(400);
    expect(mainText).toContain("Certified technicians");
    expect(mainText).toContain("starts at $99");
    expect(mainText).toContain("630-830-9867");
    expect(mainText).toContain("hot-water extraction");
    expect(mainText).not.toMatch(banned);
    expect(mainText).not.toMatch(hours);

    expect(container.querySelector("a[href='tel:6308309867']")).toBeNull();
    expect(container.querySelectorAll("a[href='tel:+16308309867']").length).toBeGreaterThan(0);
    expect(mainText).toContain("1018 Hummingbird Way");
    expect(mainText).toContain("Bartlett, IL 60103");
    expect(mainText).toContain("10549 Crown Rd #4");
    expect(mainText).toContain("Franklin Park, IL 60131");

    const seen: string[] = [];
    for (const region of serviceRegions) {
      const card = container.querySelector(`[data-region="${region.region}"]`);
      expect(card?.querySelector("h2")?.textContent).toBe(region.region);
      const labels = [...(card?.querySelectorAll("li") ?? [])].map((item) => item.textContent);
      expect(labels).toEqual([...region.towns]);
      seen.push(...labels.filter((label): label is string => Boolean(label)));
      const links = [...(card?.querySelectorAll("a") ?? [])];
      if (region.towns.includes("Franklin Park")) {
        expect(links.map((link) => link.textContent)).toEqual(["Franklin Park"]);
        expect(links[0]?.getAttribute("href")).toBe("/locations/franklin-park/");
      } else {
        expect(links).toHaveLength(0);
      }
    }
    expect(seen).toEqual([...publishedTowns]);
    expect(new Set(seen).size).toBe(seen.length);

    const photos = [...container.querySelectorAll("main picture img")];
    expect(photos.length).toBeGreaterThanOrEqual(4);
    for (const photo of photos) {
      expect(photo.getAttribute("width")).toBeTruthy();
      expect(photo.getAttribute("height")).toBeTruthy();
      const alt = photo.getAttribute("alt") ?? "";
      expect(alt.length).toBeGreaterThan(10);
      expect(alt.length).toBeLessThanOrEqual(125);
    }
    expect(photos.slice(0, 4).every((photo) => photo.getAttribute("loading") === "lazy")).toBe(true);
    expect(photos.some((photo) => (photo.getAttribute("src") ?? "").includes("/images/areas/"))).toBe(true);

    const directions = [...container.querySelectorAll("a[href*='google.com/maps/search']")];
    expect(directions.length).toBeGreaterThanOrEqual(2);
    const hrefs = directions.map((link) => link.getAttribute("href") ?? "");
    expect(hrefs.some((href) => href.includes(encodeURIComponent("1018 Hummingbird Way, Bartlett, IL 60103")))).toBe(
      true,
    );
    expect(
      hrefs.some((href) => href.includes(encodeURIComponent("10549 Crown Rd #4, Franklin Park, IL 60131"))),
    ).toBe(true);

    const chicago = container.querySelector('[data-region="Chicago & Cook County"]');
    const town = (name: string) => [...(chicago?.querySelectorAll("li") ?? [])].find((item) => item.textContent === name);
    fireEvent.change(container.querySelector("#town-filter")!, { target: { value: "niles" } });
    expect(town("Niles")?.hasAttribute("hidden")).toBe(false);
    expect(town("Chicago")?.hasAttribute("hidden")).toBe(true);
    expect(town("Chicago")?.textContent).toBe("Chicago");

    const form = container.querySelector("#areas-quote-form");
    expect(form?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    for (const name of leadFields) {
      expect(form?.querySelector(`[name='${name}']`)).toBeTruthy();
    }
    expect(form?.getAttribute("action")).toBeNull();

    fireEvent.change(form!.querySelector("[name='name']")!, { target: { value: "Ada Lovelace" } });
    fireEvent.change(form!.querySelector("[name='phone']")!, { target: { value: "6305550100" } });
    fireEvent.change(form!.querySelector("[name='email']")!, { target: { value: "ada@example.com" } });
    fireEvent.change(form!.querySelector("[name='address']")!, { target: { value: "1 Oak St, Niles, IL" } });
    fireEvent.change(form!.querySelector("[name='service']")!, { target: { value: "Carpet Cleaning" } });
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
      address: "1 Oak St, Niles, IL",
      service: "Carpet Cleaning",
      website: "",
    });
    for (const name of ["rooms", "squareFootage", "preferredDate", "message", "source"]) {
      expect(body).toHaveProperty(name);
    }

    expect(container.querySelector("a[href='/services/']")).toBeTruthy();
    expect(container.querySelector("a[href='/blog/']")).toBeTruthy();
    expect(container.querySelector("a[href='/blog/carpet-cleaning-tips-homeowners/']")).toBeTruthy();
    expect(container.querySelector("a[href='#areas-quote']")).toBeTruthy();

    for (const link of container.querySelectorAll("a[href^='/']")) {
      const href = link.getAttribute("href") ?? "";
      const base = href.split(/[?#]/)[0];
      if (base === "/" || base.includes(".")) continue;
      expect(base.endsWith("/"), href).toBe(true);
    }
  });
});
