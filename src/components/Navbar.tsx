import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Phone, Menu, X } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";
import { PHONE_DISPLAY, WINDOWS_FRANCHISE_URL, phoneTelHref } from "@/data/locations";
import { focusRing } from "@/components/home/ui";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services/" },
  { label: "Service Areas", path: "/service-areas/" },
  { label: "About Us", path: "/about/" },
  { label: "Blog", path: "/blog/" },
  { label: "Contact", path: "/contact/" },
];

function isCurrentPath(pathname: string, path: string) {
  const strip = (value: string) => (value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value);
  return strip(pathname) === strip(path);
}

const quoteClass = `inline-flex min-h-12 shrink-0 items-center gap-1 whitespace-nowrap rounded-lg bg-cta-orange px-3 font-heading text-sm font-bold text-[hsl(216,50%,12%)] transition hover:brightness-95 sm:px-4 ${focusRing}`;

const desktopNavClass = `shrink-0 whitespace-nowrap text-sm font-semibold text-foreground transition-colors hover:text-primary ${focusRing}`;
const mobileNavClass = `flex min-h-11 shrink-0 items-center whitespace-nowrap border-b border-foreground/10 text-base font-semibold text-foreground ${focusRing}`;

function QuoteLabel() {
  return (
    <>
      <span className="min-[380px]:hidden">Quote</span>
      <span className="hidden min-[380px]:inline">Get a Quote</span>
    </>
  );
}

function FranchiseNavLink({ className, testId, onClick }: { className: string; testId: string; onClick?: () => void }) {
  return (
    <a
      href={WINDOWS_FRANCHISE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
      onClick={onClick}
      className={className}
    >
      Franchise
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const onHome = isCurrentPath(location.pathname, "/");
  const quoteHref = onHome
    ? "#hero-quote"
    : isCurrentPath(location.pathname, "/services")
      ? "#services-quote"
        : isCurrentPath(location.pathname, "/about")
          ? "#about-quote"
          : isCurrentPath(location.pathname, "/contact")
            ? "#contact-quote"
            : isCurrentPath(location.pathname, "/service-areas")
              ? "#areas-quote"
              : isCurrentPath(location.pathname, "/locations/franklin-park")
                ? "#franklin-park-quote"
                : null;

  const quote = quoteHref ? (
    <a href={quoteHref} className={quoteClass} aria-label="Get a Quote" onClick={() => setMobileOpen(false)}>
      <QuoteLabel />
    </a>
  ) : (
    <QuoteFormDialog>
      <button type="button" className={quoteClass} aria-label="Get a Quote">
        <QuoteLabel />
      </button>
    </QuoteFormDialog>
  );

  return (
    <nav className="sticky top-0 z-50 bg-accent-yellow shadow-sm" style={{ backgroundColor: "hsl(36, 100%, 55%)" }}>
      <div
        data-testid="header-row"
        className="container mx-auto flex h-16 max-w-7xl flex-nowrap items-center justify-between gap-1 px-2 min-[380px]:gap-2 min-[380px]:px-3 min-[480px]:px-4"
      >
        <div className="flex shrink-0 items-center gap-4 lg:gap-6">
          <Link to="/" className={`shrink-0 ${focusRing}`}>
            <img src={logo} alt="Ernest Steamers" width={283} height={67} className="h-7 w-auto" />
          </Link>
          {/* Full labels fit on one row from 1024px. Narrower widths use the menu. */}
          <div data-testid="primary-nav" className="hidden shrink-0 items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`${desktopNavClass} ${
                  isCurrentPath(location.pathname, link.path) ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <FranchiseNavLink className={desktopNavClass} testId="nav-franchise-link" />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 min-[380px]:gap-2">
          <a
            href={phoneTelHref()}
            className={`inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center whitespace-nowrap text-foreground sm:hidden ${focusRing}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={phoneTelHref()}
            className={`hidden min-h-12 shrink-0 items-center gap-1.5 whitespace-nowrap text-foreground sm:inline-flex ${focusRing}`}
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap text-sm font-semibold">{PHONE_DISPLAY}</span>
          </a>
          {quote}
          <button
            type="button"
            className={`inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center text-foreground lg:hidden ${focusRing}`}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain px-4 pb-2 lg:hidden"
          style={{ backgroundColor: "hsl(36, 100%, 55%)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={mobileNavClass}
            >
              {link.label}
            </Link>
          ))}
          <FranchiseNavLink
            className={mobileNavClass}
            testId="nav-franchise-link-mobile"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
