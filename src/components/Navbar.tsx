import logo from "@/assets/logo.png";
import { Phone } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";

const navLinks = ["Home", "Services", "Service Areas", "About Us", "Blog"];

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-6">
          <img src={logo} alt="Ernest Steamers" className="h-7 brightness-0" />
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-foreground text-xs font-medium hover:text-accent transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="tel:+16308309867" className="hidden sm:flex items-center gap-1.5 text-foreground">
            <Phone className="w-3.5 h-3.5 text-accent-yellow" />
            <span className="text-xs font-semibold">630-830-9867</span>
          </a>
          <QuoteFormDialog>
            <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1">
              Get A Free Quote <span>→</span>
            </button>
          </QuoteFormDialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
