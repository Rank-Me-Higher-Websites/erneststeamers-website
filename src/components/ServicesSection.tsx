import { Home, Sofa, Layers, Building2, Grid3X3 } from "lucide-react";
import vanHouse from "@/assets/van-house.png";

const services = [
  {
    icon: Home,
    title: "Professional Carpet Cleaning",
    desc: "Our expert carpet cleaning eliminates dirt, dust, allergens, and contaminants, restoring your carpets to their best condition.",
  },
  {
    icon: Sofa,
    title: "Upholstery Cleaning",
    desc: "Advanced deep-cleaning methods remove stains, embedded dirt, and allergens—restoring sofas, chairs, and ottomans to like-new condition.",
  },
  {
    icon: Layers,
    title: "Area Rug Cleaning",
    desc: "Top-rated area rug cleaning restores Persian, Oriental, and synthetic rugs by removing dirt, stains, and odors.",
  },
  {
    icon: Building2,
    title: "Commercial Carpet Cleaning",
    desc: "Flexible, cost-effective commercial cleaning solutions for businesses of all sizes across Chicago and surrounding areas.",
  },
  {
    icon: Grid3X3,
    title: "Tile and Grout Cleaning",
    desc: "Professional tile and grout cleaning restores your floors by effectively removing dirt, grime, and stains.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-stretch">
          {/* Left: Intro card with image */}
          <div className="bg-cta-orange rounded-xl overflow-hidden border-2 border-accent/30 flex flex-col">
            <img
              src={vanHouse}
              alt="Ernest Steamers service van"
              className="w-full h-48 lg:h-56 object-cover"
            />
            <div className="p-6 flex flex-col justify-center flex-1">
              <h2 className="font-heading font-bold text-3xl text-primary-foreground mb-3">
                Our Services
              </h2>
              <div className="w-12 h-1 bg-primary-foreground mb-4" />
              <p className="text-primary-foreground/90 leading-relaxed text-sm">
                We provide residential and commercial cleaning services with tailored solutions for every space.
              </p>
            </div>
          </div>

          {/* Right: Service cards in a 2-col grid, all equal height */}
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl p-5 border-2 border-muted-foreground/40 bg-background hover:border-accent/50 transition-colors group shadow-sm flex flex-col"
              >
                <s.icon className="w-8 h-8 text-accent-yellow mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-base mb-2 text-foreground">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
