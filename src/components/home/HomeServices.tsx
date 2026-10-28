import ServiceCard from "@/components/ServiceCard";
import { bodyText, sectionTitle } from "@/components/home/ui";

const services = [
  {
    title: "Carpet Cleaning",
    description: "Hot-water extraction for wall-to-wall carpet in homes.",
    href: "/services/#carpet",
    image: "carpet" as const,
    alt: "Ernest Steamers technician steam cleaning a living room carpet with a wand",
    service: "Carpet Cleaning",
    startsAt: true,
  },
  {
    title: "Upholstery Cleaning",
    description: "Cleaning for sofas, chairs, and other upholstered furniture.",
    href: "/services/#upholstery",
    image: "upholstery" as const,
    alt: "Technician cleaning a light sofa with an upholstery wand and blue hose",
    service: "Upholstery Cleaning",
  },
  {
    title: "Area Rug Cleaning",
    description: "Cleaning for area rugs.",
    href: "/services/#rugs",
    image: "rug" as const,
    alt: "Technician cleaning a patterned area rug with a rotary brush",
    service: "Area Rug Cleaning",
  },
  {
    title: "Tile & Grout Cleaning",
    description: "Cleaning for tile floors and the grout lines between them.",
    href: "/services/#tile-grout",
    image: "tile" as const,
    alt: "Technician cleaning a white tile floor with a rotary machine",
    service: "Tile & Grout Cleaning",
  },
  {
    title: "Commercial Carpet Cleaning",
    description: "Carpet cleaning for offices, lobbies, and other commercial spaces.",
    href: "/services/#commercial",
    image: "equipment" as const,
    alt: "Technician operating a truck-mounted carpet cleaning machine in the van",
    service: "Commercial Carpet Cleaning",
  },
];

export default function HomeServices() {
  return (
    <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="services-heading" className={sectionTitle}>
          Cleaning services
        </h2>
        <p className={`${bodyText} mt-3 max-w-2xl`}>
          Carpet cleaning starts at $99. Other services are quoted for the rooms, size, and condition.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.service} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
