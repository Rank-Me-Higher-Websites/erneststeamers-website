import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";
import Contact from "@/pages/Contact";
import Funnel from "@/pages/Funnel";
import { SISTER_COMPANY, WINDOWS_FRANCHISE_URL } from "@/data/locations";

const FRANCHISE_NAME = "Franchise (opens in a new tab)";

function expectExternalLink(link: HTMLElement, href: string) {
  expect(link.getAttribute("href")).toBe(href);
  expect(link.getAttribute("target")).toBe("_blank");
  expect(link.getAttribute("rel")).toContain("noopener");
  expect(link.getAttribute("rel")).toContain("noreferrer");
}

function headerNav() {
  const nav = screen.getByRole("button", { name: /menu/i }).closest("nav");
  if (!(nav instanceof HTMLElement)) throw new Error("header nav missing");
  return nav;
}

function expectSingleHeaderRow(nav: HTMLElement) {
  const rows = nav.querySelectorAll(":scope > div");
  expect(rows).toHaveLength(1);
  expect(rows[0]?.className).toMatch(/\bh-16\b|\bh-14\b/);
  expect(nav.querySelector("[data-testid='header-sister-links']")).toBeNull();
  expect(nav.querySelector("[data-testid='header-ernest-windows-link']")).toBeNull();
  expect(nav.textContent).not.toContain("Sister company");
}

describe("franchise link in the existing navigation", () => {
  it("puts Franchise in the primary nav and keeps one header row", () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>,
    );

    const nav = headerNav();
    expectSingleHeaderRow(nav);

    const franchise = screen.getByTestId("nav-franchise-link");
    expect(franchise.closest("nav")).toBe(nav);
    expect(franchise.parentElement?.textContent).toContain("Home");
    expect(franchise.parentElement?.textContent).toContain("Contact");
    expectExternalLink(franchise, WINDOWS_FRANCHISE_URL);
    expect(franchise).toHaveAccessibleName(FRANCHISE_NAME);
    expect(nav.querySelector('a[href="https://ernestwindows.com"]')).toBeNull();

    const footerFranchise = screen.getByTestId("footer-franchise-link");
    expect(footerFranchise.closest("footer")).toBeTruthy();
    expectExternalLink(footerFranchise, WINDOWS_FRANCHISE_URL);
    expect(footerFranchise).toHaveAccessibleName("Ernest Windows franchise (opens in a new tab)");

    const sister = screen.getByRole("link", { name: `Sister company: ${SISTER_COMPANY.name}` });
    expect(sister.getAttribute("href")).toBe(SISTER_COMPANY.url);
    expect(sister.getAttribute("target")).toBeNull();
    expect(sister.closest("footer")).toBeTruthy();

    expect(document.body.textContent).not.toContain("(800)");
    expect(document.body.innerHTML).not.toContain("tel:+18002706228");
    expect(screen.getAllByRole("link", { name: /\(630\) 403-0180/ }).length).toBeGreaterThan(0);

    const desktop = screen.getByTestId("primary-nav");
    expect(desktop.className).toContain("hidden");
    expect(desktop.className).toContain("lg:flex");
    expect(desktop.className).not.toContain("md:flex");
    for (const link of desktop.querySelectorAll("a")) {
      expect(link.className).toContain("whitespace-nowrap");
      expect(link.className).toContain("shrink-0");
    }
    const row = screen.getByTestId("header-row");
    expect(row.className).toContain("h-16");
    expect(row.className).toContain("flex-nowrap");
    const menuButton = screen.getByRole("button", { name: "Open menu" });
    expect(menuButton.className).toContain("lg:hidden");
    expect(menuButton.className).not.toContain("md:hidden");
  });

  it("lists Franchise with the other items in the mobile menu", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );

    const nav = headerNav();
    expectSingleHeaderRow(nav);
    expect(screen.queryByTestId("nav-franchise-link-mobile")).toBeNull();
    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(nav.querySelectorAll(":scope > div")).toHaveLength(2);
    const menu = screen.getByTestId("mobile-menu");
    expect(menu.className).toContain("overflow-y-auto");
    expect(menu.className).toContain("max-h-[calc(100dvh-4rem)]");
    expect(menu.className).toContain("lg:hidden");
    for (const link of menu.querySelectorAll("a")) {
      expect(link.className).toContain("whitespace-nowrap");
    }
    const mobileFranchise = screen.getByTestId("nav-franchise-link-mobile");
    expectExternalLink(mobileFranchise, WINDOWS_FRANCHISE_URL);
    expect(mobileFranchise).toHaveAccessibleName(FRANCHISE_NAME);
    for (const label of ["Home", "Services", "Service Areas", "About Us", "Blog", "Contact"]) {
      expect(menu.textContent).toContain(label);
    }
    expect(screen.getAllByRole("link", { name: "Services" })).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(nav.querySelectorAll(":scope > div")).toHaveLength(1);
    expect(screen.queryByTestId("nav-franchise-link-mobile")).toBeNull();
  });

  it("does not add a header row on the funnel page", () => {
    render(
      <MemoryRouter>
        <Funnel />
      </MemoryRouter>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav.querySelectorAll(":scope > div")).toHaveLength(1);
    expect(nav.querySelector("[data-testid='header-sister-links']")).toBeNull();
    expect(nav.querySelector(`a[href='${WINDOWS_FRANCHISE_URL}']`)).toBeNull();
    expect(screen.getByTestId("footer-franchise-link").closest("footer")).toBeTruthy();
    expect(screen.getByRole("link", { name: `Sister company: ${SISTER_COMPANY.name}` }).closest("footer")).toBeTruthy();
  });
});
