import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import QuoteForm, { SERVICE_OPTIONS } from "@/components/QuoteForm";
import Index from "@/pages/Index";

const leadFields = ["name", "phone", "email", "address", "service", "rooms", "squareFootage", "preferredDate", "message", "website"];

describe("home page", () => {
  it("has one h1, real job photos, and no unverifiable trust content", () => {
    const { container } = render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    const headings = [...container.querySelectorAll("h1")].map((node) => node.textContent);
    expect(headings).toEqual(["Carpet, Rug & Upholstery Steam Cleaning in Chicago & the Suburbs"]);

    const text = container.textContent ?? "";
    expect(text).toContain("Starts at $99");
    expect(text).toContain("Certified technicians");
    expect(text).toContain("(630) 403-0180");
    expect(text).toContain("1018 Hummingbird Way");
    expect(text).toContain("10549 Crown Rd #4");
    expect(text).toContain("Recent jobs");
    expect(text).not.toMatch(/5\.0|4\.9|500\+|BBB|IICRC|★★★★★|Marcus T\.|Sarah K\.|David R\.|Alanas/);
    expect(container.querySelector('footer a[href="/blog/"]')).toBeTruthy();
    expect(container.querySelector('footer a[href="/about/"]')).toBeTruthy();
    expect(container.querySelector('footer a[href="/services/#carpet"]')).toBeTruthy();
    expect(container.querySelector('footer a[href="/services/#upholstery"]')).toBeTruthy();
    expect(container.querySelector('footer a[href="/services/#tile-grout"]')?.textContent).toContain("Tile & Grout Cleaning");
    expect(container.querySelector('footer a[href="/services/#commercial"]')).toBeTruthy();
    expect(container.querySelector('footer a[href="/services/#rugs"]')).toBeTruthy();
    expect(container.querySelector('footer a[href="/blog/remove-pet-stains-odors/"]')?.textContent).toContain(
      "Pet Stain/Odor Removal",
    );
    expect(container.querySelector("footer")).not.toBeNull();
    expect(container.querySelector("footer")?.innerHTML ?? "").not.toContain('href="#"');
    expect(container.querySelector("footer")?.innerHTML ?? "").not.toContain("/#about");
    expect(text).not.toContain("Stain Cleaning");
    expect(text).not.toContain("HSdigital");
    expect(text).not.toContain("Privacy Policy");

    expect(container.querySelector("iframe[src*='mediadelivery']")).toBeNull();
    expect(container.querySelectorAll("a[href='tel:+16304030180']").length).toBeGreaterThan(0);

    const photos = [...container.querySelectorAll("picture img")];
    expect(photos.length).toBeGreaterThanOrEqual(8);
    for (const photo of photos) {
      expect(photo.getAttribute("width")).toBeTruthy();
      expect(photo.getAttribute("height")).toBeTruthy();
      const alt = photo.getAttribute("alt") ?? "";
      expect(alt.length).toBeGreaterThan(10);
      expect(alt.length).toBeLessThanOrEqual(125);
      expect(photo.getAttribute("src")).toMatch(/\.jpg$/);
    }
    const hero = container.querySelector("img[fetchpriority='high']");
    expect(hero?.getAttribute("loading")).toBe("eager");
    expect(photos.filter((photo) => photo.getAttribute("loading") === "lazy").length).toBe(photos.length - 1);

    const heroForm = container.querySelector("#hero-quote");
    expect(heroForm?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    for (const name of leadFields) {
      expect(heroForm?.querySelector(`[name='${name}']`)).toBeTruthy();
      expect(container.querySelector(`#contact-quote [name='${name}']`)).toBeTruthy();
    }

    for (const link of container.querySelectorAll("a[href^='/']")) {
      const href = link.getAttribute("href") ?? "";
      const base = href.split(/[?#]/)[0];
      if (base === "/" || base.includes(".")) continue;
      expect(base.endsWith("/"), href).toBe(true);
    }
  });
});

describe("quote form", () => {
  it("posts the existing /api/leads fields", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    render(<QuoteForm id="quote-test" defaultService="Carpet Cleaning" />);

    fireEvent.change(screen.getByLabelText(/Full name/), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText(/^Phone/), { target: { value: "6305550100" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText(/Service address/), { target: { value: "1 Main St, Bartlett, IL" } });
    fireEvent.submit(screen.getByRole("button", { name: /Get my free quote/i }).closest("form")!);

    expect(await screen.findByText("Thanks — we'll contact you shortly.")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledWith("/api/leads", expect.objectContaining({ method: "POST" }));
    const options = fetchMock.mock.calls[0][1] as RequestInit;
    const body = JSON.parse(String(options.body));
    expect(body).toMatchObject({
      name: "Ada Lovelace",
      phone: "6305550100",
      email: "ada@example.com",
      address: "1 Main St, Bartlett, IL",
      service: "Carpet Cleaning",
      rooms: "",
      squareFootage: "",
      preferredDate: "",
      message: "",
      website: "",
    });
    expect(typeof body.source).toBe("string");
    expect(Object.keys(body).sort()).toEqual([...leadFields, "source"].sort());
    expect(SERVICE_OPTIONS).toEqual([
      "Carpet Cleaning",
      "Upholstery Cleaning",
      "Area Rug Cleaning",
      "Tile & Grout Cleaning",
      "Commercial Carpet Cleaning",
    ]);
    vi.unstubAllGlobals();
  });
});
