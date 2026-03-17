import logo from "@/assets/logo.png";
import { Phone } from "lucide-react";

const navLinks = ["Home", "Services", "Service Areas", "About Us", "Blog"];

const Navbar = () => {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-8">
          <img src={logo} alt="Ernest Steamers" className="h-8 brightness-0" />
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-foreground text-sm font-medium hover:text-accent transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+16308309867" className="hidden sm:flex items-center gap-2 text-foreground">
            <Phone className="w-4 h-4 text-accent-yellow" />
            <span className="text-sm font-semibold">630-830-9867</span>
          </a>
          <a
            href="#contact"
            className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-5 py-2.5 rounded-lg text-sm transition-all flex items-center gap-1"
          >
            Get A Free Quote <span>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
