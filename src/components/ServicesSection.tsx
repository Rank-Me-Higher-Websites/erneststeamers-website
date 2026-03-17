import { Droplets, Home, Building2, Sparkles } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Driveways, patios, decks, siding — we restore your home's curb appeal to day-one condition.",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    desc: "Storefronts, parking lots, loading docks — first impressions matter. We make yours flawless.",
  },
  {
    icon: Droplets,
    title: "Pressure Washing",
    desc: "Industrial-grade equipment with eco-friendly solutions. Tough on grime, gentle on surfaces.",
  },
  {
    icon: Sparkles,
    title: "Surface Restoration",
    desc: "Concrete sealing, stain removal, and protective coatings to keep your property pristine longer.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 bg-primary">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent-yellow font-heading font-semibold text-sm tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary-foreground">
            Services That Deliver Results
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-xl badge-card hover:border-accent/40 transition-colors group"
            >
              <s.icon className="w-10 h-10 text-accent-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-bold text-xl mb-2 text-primary-foreground">{s.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
