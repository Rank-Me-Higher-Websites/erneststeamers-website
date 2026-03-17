import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { MapPin, Phone } from "lucide-react";

const areas = [
  {
    region: "Chicago",
    locations: ["Downtown Chicago", "Lincoln Park", "Lakeview", "Wicker Park", "Hyde Park", "Logan Square", "Bucktown", "Old Town"],
  },
  {
    region: "West Suburbs",
    locations: ["Naperville", "Aurora", "Wheaton", "Glen Ellyn", "Lombard", "Downers Grove", "Elmhurst", "Oak Brook"],
  },
  {
    region: "South Suburbs",
    locations: ["Orland Park", "Tinley Park", "Joliet", "Plainfield", "Bolingbrook", "Romeoville", "Lemont", "Homer Glen"],
  },
  {
    region: "North Suburbs",
    locations: ["Evanston", "Skokie", "Schaumburg", "Arlington Heights", "Des Plaines", "Park Ridge", "Glenview", "Wilmette"],
  },
];

const ServiceAreas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-hero py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            Service Areas
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-6">
            Ernest Steamers proudly serves Chicago and the greater Chicagoland area with professional carpet and upholstery cleaning.
          </p>
          <QuoteFormDialog>
            <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              Get A Free Quote →
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area) => (
              <div
                key={area.region}
                className="rounded-xl border-2 border-muted-foreground/20 p-6 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-foreground">{area.region}</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {area.locations.map((loc) => (
                    <div key={loc} className="flex items-center gap-2 text-sm text-muted-foreground py-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {loc}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <QuoteFormDialog>
                    <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-5 py-2 rounded-lg text-sm transition-all">
                      Get A Quote in {area.region} →
                    </button>
                  </QuoteFormDialog>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-2">Don't see your area? Give us a call — we may still be able to help!</p>
            <a
              href="tel:+16308309867"
              className="inline-flex items-center gap-2 text-foreground font-heading font-bold text-lg hover:text-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
              630-830-9867
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-hero py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Serving All of Chicagoland
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Whether you're in the city or suburbs, Ernest Steamers has you covered. Get your free quote today!
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

export default ServiceAreas;
