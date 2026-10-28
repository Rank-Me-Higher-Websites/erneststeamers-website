import type { HomeImageName } from "@/lib/homeImages";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, sectionTitle } from "@/components/home/ui";

const photos: { name: HomeImageName; alt: string; caption: string }[] = [
  {
    name: "carpet",
    alt: "Ernest Steamers technician steam cleaning a living room carpet with a wand",
    caption: "Living room carpet steam cleaning",
  },
  {
    name: "upholstery",
    alt: "Technician cleaning a light sofa with an upholstery wand and blue hose",
    caption: "Sofa upholstery cleaning",
  },
  {
    name: "rug",
    alt: "Technician cleaning a patterned area rug with a rotary brush",
    caption: "Area rug cleaning",
  },
  {
    name: "tile",
    alt: "Technician cleaning a white tile floor with a rotary machine",
    caption: "Tile floor cleaning",
  },
  {
    name: "equipment",
    alt: "Technician operating a truck-mounted carpet cleaning machine in the van",
    caption: "Truck-mounted cleaner on a job",
  },
  {
    name: "van-setup",
    alt: "Technician preparing the truck-mounted cleaner inside the Ernest Steamers van",
    caption: "Setting up the van-mounted cleaner",
  },
];

export default function WorkGallery() {
  return (
    <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="work-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="work-heading" className={sectionTitle}>
          Recent jobs
        </h2>
        <p className={`${bodyText} mt-3 max-w-2xl`}>Photos from Ernest Steamers jobs. Captions describe the work shown.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.caption}>
              <figure>
                <ResponsiveImage
                  name={photo.name}
                  alt={photo.alt}
                  sizes="(min-width: 1024px) 360px, 50vw"
                  className="aspect-[3/2] w-full rounded-xl object-cover"
                />
                <figcaption className={`${bodyText} mt-2`}>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
