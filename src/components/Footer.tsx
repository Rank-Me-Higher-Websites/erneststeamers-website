import logo from "@/assets/logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      {/* Main footer content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="Ernest Steamers" className="h-14 mb-4" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Professional carpet cleaning services in Chicago and surrounding suburbs. Trusted by homeowners and businesses since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-base mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Services", "About Us", "Reviews", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-base mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {[
                "Carpet Cleaning",
                "Upholstery Cleaning",
                "Area Rug Cleaning",
                "Tile & Grout Cleaning",
                "Commercial Cleaning",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-primary-foreground/60 hover:text-accent text-sm transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-base mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="tel:+17734980455" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                  (773) 498-0455
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@erneststeamers.com" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors">
                  info@erneststeamers.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/60 text-sm">
                  Chicago, IL & Surrounding Suburbs
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-primary-foreground/50 text-xs">
            © {currentYear} Ernest Steamers. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground/80 text-xs transition-colors">
              Privacy Policy
            </a>
            <span className="text-primary-foreground/20">|</span>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground/80 text-xs transition-colors">
              Terms of Service
            </a>
            <span className="text-primary-foreground/20">|</span>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground/80 text-xs transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
