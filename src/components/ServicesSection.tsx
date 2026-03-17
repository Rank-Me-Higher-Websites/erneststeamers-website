import { Home, Sofa, Layers, Building2, Grid3X3, Sparkles } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Professional Carpet Cleaning",
    desc: "Our expert carpet cleaning in Chicago eliminates dirt, dust, allergens, and other contaminants, restoring your carpets to their best appearance and feel.",
  },
  {
    icon: Sofa,
    title: "Upholstery Cleaning",
    desc: "Our upholstery cleaning uses advanced deep-cleaning methods to remove stains, embedded dirt, and allergens—restoring sofas, chairs, and ottomans to like-new condition.",
  },
  {
    icon: Layers,
    title: "Area Rug Cleaning",
    desc: "Our top-rated area rug cleaning restores Persian, Oriental, and synthetic rugs by removing dirt, stains, and odors—while protecting color, texture, and fiber integrity.",
  },
  {
    icon: Building2,
    title: "Commercial Carpet Cleaning",
    desc: "Our commercial carpet cleaning services cover Chicago and surrounding areas, offering flexible, cost-effective solutions for businesses of all sizes and types.",
  },
  {
    icon: Grid3X3,
    title: "Tile and Grout Cleaning",
    desc: "Our professional tile and grout cleaning service restores your floors by effectively removing dirt, grime, and stains, leaving your tiles and grout spotless and looking like new.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Intro card */}
          <div className="bg-cta-orange rounded-xl p-8 flex flex-col justify-center border border-accent/30">
            <h2 className="font-heading font-bold text-4xl text-primary-foreground mb-4">
              Our Services
            </h2>
            <div className="w-12 h-1 bg-primary-foreground mb-6" />
            <p className="text-primary-foreground/90 leading-relaxed">
              We provide residential and commercial cleaning services with tailored solutions for every space. Explore our full range of professional offerings:
            </p>
          </div>

          {/* Service cards */}
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl p-6 border-2 border-muted-foreground/25 bg-background hover:border-accent/50 transition-colors group shadow-sm"
            >
              <s.icon className="w-10 h-10 text-accent-yellow mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading font-bold text-lg mb-3 text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
