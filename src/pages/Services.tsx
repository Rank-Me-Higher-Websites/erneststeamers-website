import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { Home, Sofa, Layers, Building2, Grid3X3, CheckCircle } from "lucide-react";
import serviceCarpet from "@/assets/service-carpet.png";
import serviceUpholstery from "@/assets/service-upholstery.jpg";
import serviceRug from "@/assets/service-rug.jpg";
import vanHouse from "@/assets/van-house.png";
import serviceTile from "@/assets/service-tile.jpg";

const services = [
  {
    icon: Home,
    title: "Professional Carpet Cleaning",
    desc: "Our expert carpet cleaning eliminates dirt, dust, allergens, and contaminants, restoring your carpets to their best condition.",
    more: {
      href: "/blog/carpet-cleaning-allergies-indoor-air-quality/",
      lead: " Read how ",
      anchor: "carpet cleaning and allergies",
      tail: " affect the air in your home.",
    },
    image: serviceCarpet,
    details: [
      "Deep steam extraction technology",
      "Pet stain & odor removal",
      "Safe for children and pets",
      "Fast drying times",
    ],
  },
  {
    icon: Sofa,
    title: "Upholstery Cleaning",
    desc: "Advanced deep-cleaning methods remove stains, embedded dirt, and allergens—restoring sofas, chairs, and ottomans to like-new condition.",
    image: serviceUpholstery,
    details: [
      "Fabric-safe cleaning solutions",
      "Stain protection treatment",
      "Deodorizing included",
      "All furniture types serviced",
    ],
  },
  {
    icon: Layers,
    title: "Area Rug Cleaning",
    desc: "Top-rated area rug cleaning restores Persian, Oriental, and synthetic rugs by removing dirt, stains, and odors.",
    image: serviceRug,
    details: [
      "Hand-washing available",
      "Color-safe treatments",
      "Fringe cleaning",
      "Pickup & delivery available",
    ],
  },
  {
    icon: Building2,
    title: "Commercial Carpet Cleaning",
    desc: "Flexible, cost-effective commercial cleaning solutions for businesses of all sizes across Chicago and surrounding areas.",
    more: {
      href: "/blog/commercial-carpet-cleaning-business/",
      lead: " See why ",
      anchor: "commercial carpet cleaning for your business",
      tail: " keeps lobbies and work areas presentable.",
    },
    image: vanHouse,
    details: [
      "After-hours scheduling",
      "Contract & one-time service",
      "High-traffic area specialists",
      "Minimal business disruption",
    ],
  },
  {
    icon: Grid3X3,
    title: "Tile and Grout Cleaning",
    desc: "Professional tile and grout cleaning restores your floors by effectively removing dirt, grime, and stains.",
    image: serviceTile,
    details: [
      "High-pressure steam cleaning",
      "Grout sealing available",
      "Kitchen & bathroom floors",
      "Restores original color",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-hero py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            Our Cleaning Services
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-6">
            Professional carpet, upholstery, and tile cleaning for homes and businesses across Chicago and the suburbs.
          </p>
          <QuoteFormDialog>
            <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              Get A Free Quote →
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 px-4">
        <div className="container max-w-7xl mx-auto space-y-16">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`grid md:grid-cols-2 gap-8 items-center`}
            >
              <div className={`space-y-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-foreground">{service.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.desc}
                  {"more" in service && service.more && (
                    <>
                      {service.more.lead}
                      <a href={service.more.href} className="text-accent hover:underline font-medium">
                        {service.more.anchor}
                      </a>
                      {service.more.tail}
                    </>
                  )}
                </p>
                <ul className="space-y-2">
                  {service.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-foreground text-sm">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                <QuoteFormDialog>
                  <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-6 py-2.5 rounded-lg text-sm transition-all">
                    Get A Quote →
                  </button>
                </QuoteFormDialog>
              </div>
              <div className={`rounded-xl overflow-hidden shadow-lg ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-hero py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Contact us today for a free, no-obligation quote. We'll respond within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+16308309867"
              className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all"
            >
              Call 630-830-9867
            </a>
            <QuoteFormDialog>
              <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
                GET A FREE QUOTE
              </button>
            </QuoteFormDialog>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
