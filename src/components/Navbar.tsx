import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Phone, Menu, X } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";
import { PHONE_DISPLAY, phoneTelHref } from "@/data/locations";
import { focusRing } from "@/components/home/ui";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services/" },
  { label: "Service Areas", path: "/service-areas/" },
  { label: "About Us", path: "/about/" },
  { label: "Blog", path: "/blog/" },
];

function isCurrentPath(pathname: string, path: string) {
  const strip = (value: string) => (value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value);
  return strip(pathname) === strip(path);
}

const quoteClass = `inline-flex min-h-12 items-center gap-1 rounded-lg bg-cta-orange px-3 font-heading text-sm font-bold text-[hsl(216,50%,12%)] transition hover:brightness-95 sm:px-4 ${focusRing}`;

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
        : null;

  const quote = quoteHref ? (
    <a href={quoteHref} className={quoteClass} onClick={() => setMobileOpen(false)}>
      Get a Quote
    </a>
  ) : (
    <QuoteFormDialog>
      <button type="button" className={quoteClass}>
        Get a Quote
      </button>
    </QuoteFormDialog>
  );

  return (
    <nav className="sticky top-0 z-50 bg-accent-yellow shadow-sm" style={{ backgroundColor: "hsl(36, 100%, 55%)" }}>
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link to="/" className={`shrink-0 ${focusRing}`}>
            <img src={logo} alt="Ernest Steamers" width={283} height={67} className="h-7 w-auto" />
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-semibold text-foreground transition-colors hover:text-primary ${focusRing} ${
                  isCurrentPath(location.pathname, link.path) ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={phoneTelHref()}
            className={`inline-flex min-h-12 min-w-12 items-center justify-center text-foreground sm:hidden ${focusRing}`}
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={phoneTelHref()}
            className={`hidden min-h-12 items-center gap-1.5 text-foreground sm:inline-flex ${focusRing}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-semibold">{PHONE_DISPLAY}</span>
          </a>
          {quote}
          <button
            type="button"
            className={`inline-flex min-h-12 min-w-12 items-center justify-center text-foreground md:hidden ${focusRing}`}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="space-y-1 px-4 pb-4 md:hidden" style={{ backgroundColor: "hsl(36, 100%, 55%)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex min-h-12 items-center border-b border-foreground/10 text-base font-semibold text-foreground ${focusRing}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
