import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Funnel from "@/pages/Funnel";
import { SISTER_COMPANY, WINDOWS_FRANCHISE_URL } from "@/data/locations";

const WINDOWS_NAME = `${SISTER_COMPANY.name} (opens in a new tab)`;
const FRANCHISE_NAME = "Ernest Windows franchise (opens in a new tab)";

function expectExternalLink(link: HTMLElement, href: string) {
  expect(link.getAttribute("href")).toBe(href);
  expect(link.getAttribute("target")).toBe("_blank");
  expect(link.getAttribute("rel")).toContain("noopener");
  expect(link.getAttribute("rel")).toContain("noreferrer");
}

function expectSisterLinks() {
  const windows = screen.getByTestId("header-ernest-windows-link");
  const headerFranchise = screen.getByTestId("header-franchise-link");
  const footerFranchise = screen.getByTestId("footer-franchise-link");
  const bar = screen.getByTestId("header-sister-links");

  expect(windows.closest("nav")).toBeTruthy();
  expect(headerFranchise.closest("nav")).toBe(windows.closest("nav"));
  expect(bar.className).not.toMatch(/\bhidden\b/);
  expectExternalLink(windows, SISTER_COMPANY.url);
  expect(windows).toHaveAccessibleName(WINDOWS_NAME);
  expect(windows.textContent).toContain(SISTER_COMPANY.name);

  expectExternalLink(headerFranchise, WINDOWS_FRANCHISE_URL);
  expect(headerFranchise).toHaveAccessibleName(FRANCHISE_NAME);
  expect(headerFranchise.textContent).toContain("Franchise");

  expectExternalLink(footerFranchise, WINDOWS_FRANCHISE_URL);
  expect(footerFranchise).toHaveAccessibleName(FRANCHISE_NAME);

  const sister = screen.getByRole("link", { name: `Sister company: ${SISTER_COMPANY.name}` });
  expect(sister.getAttribute("href")).toBe(SISTER_COMPANY.url);
  expect(sister.getAttribute("target")).toBeNull();

  const copy = `${bar.textContent ?? ""} ${footerFranchise.textContent ?? ""}`;
  expect(copy).not.toMatch(/fee|royalty|investment|brochure|\$|own your/i);
  expect(copy).not.toMatch(/800|270-6228/);
  expect(screen.getAllByRole("link", { name: /\(630\) 403-0180/ }).length).toBeGreaterThan(0);
  expect(document.body.textContent).not.toContain("(800)");
  expect(document.body.innerHTML).not.toContain("tel:+18002706228");
}

describe("Ernest Windows and franchise links", () => {
  it("shows both destinations in the header and footer on the home page", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );
    expectSisterLinks();
    const home = screen.getAllByRole("link", { name: "Home" }).find((link) => link.closest("nav"));
    expect(screen.getByTestId("header-ernest-windows-link").closest("nav")).toBe(home?.closest("nav"));
  });

  it("keeps the links available while the mobile menu is open", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    expectSisterLinks();
    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThan(1);
    expect(screen.getByTestId("header-ernest-windows-link")).toBeTruthy();
    expect(screen.getByTestId("header-franchise-link")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(1);
  });

  it("shows the same destinations on the funnel page", () => {
    render(
      <MemoryRouter>
        <Funnel />
      </MemoryRouter>,
    );
    expectSisterLinks();
  });
});
