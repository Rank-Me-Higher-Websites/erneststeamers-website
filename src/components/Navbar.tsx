import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Phone, Menu, X } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "About Us", path: "/about" },
  { label: "Blog", path: "#" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-accent-yellow sticky top-0 z-50 shadow-sm" style={{ backgroundColor: 'hsl(36, 100%, 55%)' }}>
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-6">
          <Link to="/">
            <img src={logo} alt="Ernest Steamers" className="h-7" />
          </Link>
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-foreground text-xs font-semibold hover:text-primary transition-colors ${
                  location.pathname === link.path ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+16308309867" className="hidden sm:flex items-center gap-1.5 text-foreground">
            <Phone className="w-3.5 h-3.5 text-foreground" />
            <span className="text-xs font-semibold">630-830-9867</span>
          </a>
          <QuoteFormDialog>
            <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1">
              Get A Free Quote <span>→</span>
            </button>
          </QuoteFormDialog>
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2" style={{ backgroundColor: 'hsl(36, 100%, 55%)' }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block text-foreground text-sm font-semibold py-2 border-b border-foreground/10"
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
