import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { Phone, ChevronsRight } from "lucide-react";

import areaChicago from "@/assets/area-chicago.jpg";
import areaWest from "@/assets/area-west.jpg";
import areaSouth from "@/assets/area-south.jpg";
import areaNorth from "@/assets/area-north.jpg";

const areas = [
  {
    region: "Chicago & Cook County",
    image: areaChicago,
    locations: ["Chicago", "Wheeling", "Des Plaines", "Morton Grove", "Arlington Hts", "Niles", "Mt Prospect", "Skokie"],
  },
  {
    region: "DuPage County & South Suburbs",
    image: areaWest,
    locations: ["Bloomingdale", "Clarendon Hills", "St Charles", "Downers Grove", "Glen Ellyn", "Naperville", "Elmhurst", "Orland Park"],
  },
  {
    region: "North Shore Neighborhoods",
    image: areaNorth,
    locations: ["Northbrook", "Libertyville", "Northfield", "Lake Forest", "Glencoe", "Evanston", "Deerfield", "Winnetka", "Highland Park", "Wilmette", "Lake Bluff", "Glenview"],
  },
  {
    region: "Northwest Lake & Cook Counties",
    image: areaSouth,
    locations: ["Barrington", "Long Grove", "Palatine", "Hawthorn Woods", "Elgin", "Vernon Hills", "Schaumburg", "Buffalo Grove"],
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

      {/* Areas Cards */}
      <section className="py-12 px-4 bg-background">
        <div className="container max-w-6xl mx-auto space-y-8">
          {areas.map((area, index) => {
            const imageFirst = index % 2 === 0;
            return (
              <div
                key={area.region}
                className="rounded-xl border-2 border-primary-foreground/10 bg-primary text-primary-foreground overflow-hidden flex flex-col md:flex-row"
              >
                {imageFirst ? (
                  <>
                    <div className="md:w-5/12 h-56 md:h-auto">
                      <img src={area.image} alt={area.region} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-center">
                      <h2 className="font-heading font-bold text-xl md:text-2xl text-primary-foreground mb-5">{area.region}</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                        {area.locations.map((loc) => (
                          <div key={loc} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                            <ChevronsRight className="w-4 h-4 text-accent flex-shrink-0" />
                            {loc}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-center order-2 md:order-1">
                      <h2 className="font-heading font-bold text-xl md:text-2xl text-primary-foreground mb-5">{area.region}</h2>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {area.locations.map((loc) => (
                          <div key={loc} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                            <ChevronsRight className="w-4 h-4 text-accent flex-shrink-0" />
                            {loc}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="md:w-5/12 h-56 md:h-auto order-1 md:order-2">
                      <img src={area.image} alt={area.region} className="w-full h-full object-cover" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
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
