import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Mail, MapPin, Clock } from "lucide-react";
import {
  BUSINESS_HOURS,
  EMAIL,
  PHONE_ALT_DISPLAY,
  PHONE_DISPLAY,
  PRIMARY_LOCATION,
  SECONDARY_OFFICES,
  SISTER_COMPANY,
  mapsEmbedSrc,
  phoneTelHref,
} from "@/data/locations";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services/" },
  { label: "Service Areas", path: "/service-areas/" },
  ...SECONDARY_OFFICES.map((office) => ({ label: `${office.city} Office`, path: office.path })),
  { label: "About Us", path: "/about/" },
  { label: "Blog", path: "/blog/" },
  { label: "Contact", path: "/contact/" },
];

const serviceLinks = [
  { label: "Carpet Cleaning", path: "/services/#carpet" },
  { label: "Upholstery Cleaning", path: "/services/#upholstery" },
  { label: "Tile & Grout Cleaning", path: "/services/#tile-grout" },
  { label: "Commercial Carpet Cleaning", path: "/services/#commercial" },
  { label: "Area Rug Cleaning", path: "/services/#rugs" },
  { label: "Pet Stain/Odor Removal", path: "/blog/remove-pet-stains-odors/" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      <div className="container max-w-7xl mx-auto px-3 lg:px-4 py-6 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          <div className="col-span-2 sm:col-span-1">
            <img src={logo} alt="Ernest Steamers" width={283} height={67} className="mb-2 h-10 w-auto lg:mb-4 lg:h-14" />
            <a href={phoneTelHref()} className="block font-heading font-bold text-primary-foreground text-base lg:text-xl">
              {PHONE_DISPLAY}
            </a>
            <p className="mb-2 text-xs text-primary-foreground/70 lg:mb-3 lg:text-sm">{`alt ${PHONE_ALT_DISPLAY}`}</p>
            <ul className="space-y-1.5 lg:space-y-2.5">
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href={`mailto:${EMAIL}`} className="text-primary-foreground/70 hover:text-accent text-xs lg:text-sm transition-colors">
                  {EMAIL}
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
          </div>

          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm lg:text-base mb-1.5 lg:mb-2">
              Our Services
            </h3>
            <div className="w-6 lg:w-8 h-0.5 bg-accent mb-2 lg:mb-4" />
            <ul className="space-y-1 lg:space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="inline-flex min-h-8 items-center gap-1 py-1 text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                  >
                    <span className="text-accent text-[10px] lg:text-xs">›</span> {service.label}
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
                    className="inline-flex min-h-8 items-center gap-1 py-1 text-sm text-primary-foreground/80 transition-colors hover:text-accent"
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
              {BUSINESS_HOURS.map((span) => (
                <li key={span.label} className="flex items-start gap-1.5 lg:gap-2">
                  <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-accent font-semibold text-[11px] lg:text-sm">{span.label}</p>
                    <p className="text-primary-foreground/70 text-[11px] lg:text-sm">{span.hours}</p>
                  </div>
                </li>
              ))}
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
        <div className="container max-w-7xl mx-auto px-3 lg:px-4 py-3 lg:py-4 text-center">
          <p className="text-xs text-primary-foreground/80 lg:text-sm">
            © Copyright Ernest Steamers. All rights reserved {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
