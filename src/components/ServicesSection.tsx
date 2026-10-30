import { Home, Sofa, Layers, Building2, Grid3X3 } from "lucide-react";
import vanHouse from "@/assets/van-house.png";

const services = [
  {
    icon: Home,
    title: "Professional Carpet Cleaning",
    desc: "Ernest Steamers cleans wall-to-wall carpet in houses and apartments across Chicago and the suburbs. Certified technicians use hot-water extraction, also called steam cleaning.",
  },
  {
    icon: Sofa,
    title: "Upholstery Cleaning",
    desc: "Upholstery cleaning covers the fabric furniture that stays in the room, including sofas, chairs, sectionals, and ottomans. Certified technicians clean the pieces you list.",
  },
  {
    icon: Layers,
    title: "Area Rug Cleaning",
    desc: "Area rug cleaning is for rugs that remain in the home, such as a living-room rug, a hallway runner, or a bedroom rug. Certified technicians clean the rugs you include in the visit.",
  },
  {
    icon: Building2,
    title: "Commercial Carpet Cleaning",
    desc: "Commercial carpet cleaning is for offices, lobbies, and other business spaces in Chicago and the suburbs. Certified technicians clean the carpeted areas you list with hot-water extraction.",
  },
  {
    icon: Grid3X3,
    title: "Tile and Grout Cleaning",
    desc: "Tile and grout cleaning covers tile floors and the grout lines between the tiles. Certified technicians clean the floor area you put on the quote.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-6 lg:py-12 px-3 lg:px-4 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-3 lg:gap-6 items-stretch">
          <div className="rounded-lg lg:rounded-xl overflow-hidden border-2 border-muted-foreground/40 shadow-sm">
            <img
              src={vanHouse}
              alt="Ernest Steamers service van"
              className="w-full h-40 sm:h-48 lg:h-full lg:min-h-0 object-cover"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4">
            <div className="rounded-lg lg:rounded-xl p-3 lg:p-5 bg-cta-orange border-2 border-accent/30 flex flex-col justify-center col-span-2 sm:col-span-1">
              <h2 className="font-heading font-bold text-lg lg:text-2xl text-primary-foreground mb-1 lg:mb-2">
                Our Services
              </h2>
              <div className="w-8 lg:w-10 h-0.5 lg:h-1 bg-primary-foreground mb-1.5 lg:mb-3" />
              <p className="text-primary-foreground/90 leading-relaxed text-[10px] lg:text-xs">
                We provide residential and commercial cleaning services with tailored solutions for every space.
              </p>
            </div>

            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-lg lg:rounded-xl p-3 lg:p-5 bg-primary border border-primary-foreground/10 hover:border-accent/50 transition-colors group shadow-sm flex flex-col"
              >
                <s.icon className="w-5 h-5 lg:w-8 lg:h-8 text-accent-yellow mb-1.5 lg:mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-heading font-bold text-xs lg:text-base mb-1 lg:mb-2 text-primary-foreground">{s.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed text-[10px] lg:text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
