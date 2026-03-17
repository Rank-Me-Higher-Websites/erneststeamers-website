import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Mail, MapPin, Clock, Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      {/* Main footer content */}
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div>
            <img src={logo} alt="Ernest Steamers" className="h-14 mb-4" />
            <a href="tel:+16308309867" className="block font-heading font-bold text-primary-foreground text-xl mb-3">
              630-830-9867
            </a>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@erneststeamers.com" className="text-primary-foreground/70 hover:text-accent text-sm transition-colors">
                  info@erneststeamers.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-sm">
                  1018 Hummingbird Way,<br />Bartlett, IL 60103, United States
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-base mb-2">
              Our Services
            </h3>
            <div className="w-8 h-0.5 bg-accent mb-4" />
            <ul className="space-y-2">
              {[
                "Carpet Cleaning",
                "Upholstery Cleaning",
                "Tile And Grout Cleaning",
                "Stain Cleaning",
                "Commercial Carpet Cleaning",
                "Area Rug Cleaning",
                "Pet Stain/Odor Removal",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-accent text-xs">›</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-base mb-2">
              Quick Links
            </h3>
            <div className="w-8 h-0.5 bg-accent mb-4" />
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Service Areas", path: "/service-areas" },
                { label: "About Us", path: "/#about" },
                { label: "Blog", path: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-accent text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-accent text-xs">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-base mb-2">
              Business Hours
            </h3>
            <div className="w-8 h-0.5 bg-accent mb-4" />
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-sm">Monday to Friday</p>
                  <p className="text-primary-foreground/70 text-sm">7 am to 7 pm</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-sm">Saturday</p>
                  <p className="text-primary-foreground/70 text-sm">9 am to 3 pm</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-sm">Sunday</p>
                  <p className="text-primary-foreground/70 text-sm">Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Google Map - compact */}
      <div className="w-full h-40">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95000!2d-88.18!3d41.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880faf9b8f5a1cd1%3A0x9e38c2dd0b87696f!2sErnest%20Steamers!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ernest Steamers location"
        />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10 bg-primary">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <a href="#" className="text-accent hover:text-primary-foreground/80 text-xs transition-colors">
              Privacy Policy
            </a>
            <span className="text-primary-foreground/20">|</span>
            <a href="#" className="text-accent hover:text-primary-foreground/80 text-xs transition-colors">
              Terms & Conditions
            </a>
          </div>
          <p className="text-primary-foreground/50 text-xs">
            © Copyright Ernest Steamers. All rights reserved – Website by{" "}
            <a href="#" className="text-accent hover:underline">HSdigital</a> {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
