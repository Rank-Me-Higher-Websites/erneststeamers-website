import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import NotFound from "./NotFound";
import {
  PRIMARY_LOCATION,
  formatAddress,
  getOfficeBySlug,
  joinList,
  mapsEmbedSrc,
  phoneTelHref,
} from "@/data/locations";
import { Mail, MapPin, Phone } from "lucide-react";

const LocationPage = () => {
  const { slug } = useParams();
  const office = slug ? getOfficeBySlug(slug) : undefined;

  if (!office) return <NotFound />;

  const nearby = joinList(office.nearby);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-hero py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            {office.h1}
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-6">
            {office.intro}
          </p>
          <QuoteFormDialog>
            <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              Get A Free Quote →
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      <section className="py-12 lg:py-16 px-4 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4">
            Carpet, rug, and upholstery steam cleaning
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{office.details}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            This office serves {office.city}
            {nearby ? ` and nearby suburbs, including ${nearby}` : ""}.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            The main Ernest Steamers location is {formatAddress(PRIMARY_LOCATION)}.{" "}
            <Link to="/service-areas" className="text-foreground underline hover:text-cta-orange">
              View service areas
            </Link>
            .
          </p>

          <div className="rounded-xl border-2 border-primary-foreground/10 bg-primary text-primary-foreground p-6 md:p-8">
            <h2 className="font-heading font-bold text-xl text-primary-foreground mb-4">
              {office.city} office
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{formatAddress(office)}</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href={phoneTelHref(office.phoneSchema)}
                  className="text-primary-foreground font-heading font-bold hover:text-accent transition-colors"
                >
                  {office.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <a
                  href={`mailto:${office.email}`}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  {office.email}
                </a>
              </li>
            </ul>
            <h3 className="font-heading font-bold text-sm text-primary-foreground mb-2">Business hours</h3>
            <ul className="space-y-1 text-sm text-primary-foreground/80 mb-6">
              <li>Monday to Friday: 7 am to 7 pm</li>
              <li>Saturday: 9 am to 3 pm</li>
              <li>Sunday: Closed</li>
            </ul>
            <QuoteFormDialog>
              <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-6 py-3 rounded-lg text-base transition-all">
                Get A Free Quote →
              </button>
            </QuoteFormDialog>
          </div>
        </div>
      </section>

      <div className="w-full h-64 lg:h-80">
        <iframe
          src={mapsEmbedSrc(office)}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Ernest Steamers ${office.city} office`}
        />
      </div>

      <section className="bg-hero py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Request a quote
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Call {office.phoneDisplay} or send a quote request for carpet, rug, or upholstery steam cleaning
            from the {office.city} office.
          </p>
          <QuoteFormDialog>
            <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              GET A FREE QUOTE
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
