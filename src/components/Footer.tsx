import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Mail, MapPin, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import { PRIMARY_LOCATION, SECONDARY_OFFICES, SISTER_COMPANY, mapsEmbedSrc } from "@/data/locations";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Service Areas", path: "/service-areas" },
  ...SECONDARY_OFFICES.map((office) => ({ label: `${office.city} Office`, path: office.path })),
  { label: "About Us", path: "/#about" },
  { label: "Blog", path: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      <div className="container max-w-7xl mx-auto px-3 lg:px-4 py-6 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <img src={logo} alt="Ernest Steamers" className="h-10 lg:h-14 mb-2 lg:mb-4" />
            <a href="tel:+16308309867" className="block font-heading font-bold text-primary-foreground text-base lg:text-xl mb-2 lg:mb-3">
              630-830-9867
            </a>
            <ul className="space-y-1.5 lg:space-y-2.5">
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@erneststeamers.com" className="text-primary-foreground/70 hover:text-accent text-xs lg:text-sm transition-colors">
                  info@erneststeamers.com
                </a>
              </li>
              <li className="flex items-start gap-1.5 lg:gap-2">
                <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-xs lg:text-sm">
                  {PRIMARY_LOCATION.street},<br />
                  {PRIMARY_LOCATION.city}, {PRIMARY_LOCATION.region} {PRIMARY_LOCATION.postalCode}
                </span>
              </li>
              {SECONDARY_OFFICES.map((office) => (
                <li key={office.id} className="flex items-start gap-1.5 lg:gap-2">
                  <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                  <Link
                    to={office.path}
                    className="text-primary-foreground/70 hover:text-accent text-xs lg:text-sm transition-colors"
                  >
                    {office.city} office
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={SISTER_COMPANY.url}
              className="inline-block mt-2 lg:mt-3 text-accent hover:text-primary-foreground text-xs lg:text-sm transition-colors"
              rel="noopener noreferrer"
            >
              {`Sister company: ${SISTER_COMPANY.name}`}
            </a>
            <div className="flex items-center gap-2 mt-2 lg:mt-4">
              {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm lg:text-base mb-1.5 lg:mb-2">
              Our Services
            </h3>
            <div className="w-6 lg:w-8 h-0.5 bg-accent mb-2 lg:mb-4" />
            <ul className="space-y-1 lg:space-y-2">
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
                    className="text-primary-foreground/70 hover:text-accent text-[11px] lg:text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-accent text-[10px] lg:text-xs">›</span> {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm lg:text-base mb-1.5 lg:mb-2">
              Quick Links
            </h3>
            <div className="w-6 lg:w-8 h-0.5 bg-accent mb-2 lg:mb-4" />
            <ul className="space-y-1 lg:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-accent text-[11px] lg:text-sm transition-colors flex items-center gap-1"
                  >
                    <span className="text-accent text-[10px] lg:text-xs">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm lg:text-base mb-1.5 lg:mb-2">
              Business Hours
            </h3>
            <div className="w-6 lg:w-8 h-0.5 bg-accent mb-2 lg:mb-4" />
            <ul className="space-y-1.5 lg:space-y-3">
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-[11px] lg:text-sm">Monday to Friday</p>
                  <p className="text-primary-foreground/70 text-[11px] lg:text-sm">7 am to 7 pm</p>
                </div>
              </li>
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-[11px] lg:text-sm">Saturday</p>
                  <p className="text-primary-foreground/70 text-[11px] lg:text-sm">9 am to 3 pm</p>
                </div>
              </li>
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-[11px] lg:text-sm">Sunday</p>
                  <p className="text-primary-foreground/70 text-[11px] lg:text-sm">Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-32 lg:h-44">
        <iframe
          src={mapsEmbedSrc(PRIMARY_LOCATION)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ernest Steamers Bartlett location"
        />
      </div>

      <div className="border-t border-primary-foreground/10 bg-primary">
        <div className="container max-w-7xl mx-auto px-3 lg:px-4 py-3 lg:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 lg:gap-3">
          <div className="flex items-center gap-3 lg:gap-4">
            <a href="#" className="text-accent hover:text-primary-foreground/80 text-[10px] lg:text-xs transition-colors">
              Privacy Policy
            </a>
            <span className="text-primary-foreground/20">|</span>
            <a href="#" className="text-accent hover:text-primary-foreground/80 text-[10px] lg:text-xs transition-colors">
              Terms & Conditions
            </a>
          </div>
          <p className="text-primary-foreground/50 text-[10px] lg:text-xs">
            © Copyright Ernest Steamers. All rights reserved – Website by{" "}
            <a href="#" className="text-accent hover:underline">HSdigital</a> {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
