import { PHONE_DISPLAY } from "@/data/locations";
import type { HomeImageName } from "@/lib/homeImages";

/** Visible copy may state only "starts at $99" and "certified technicians". */
export type CopyPart = {
  text: string;
  href?: string;
};

export type ServiceBlock = {
  id: string;
  nav: string;
  title: string;
  service: string;
  image: HomeImageName;
  alt: string;
  startsAt: boolean;
  body: CopyPart[];
  included: string[];
};

export function partsText(parts: CopyPart[]) {
  return parts.map((part) => part.text).join("");
}

export const serviceBlocks: ServiceBlock[] = [
  {
    id: "carpet",
    nav: "Carpet",
    title: "Carpet Cleaning",
    service: "Carpet Cleaning",
    image: "carpet",
    alt: "Ernest Steamers technician steam cleaning a living room carpet with a wand",
    startsAt: true,
    body: [
      {
        text: "Ernest Steamers cleans wall-to-wall carpet in houses and apartments across Chicago and the suburbs. Certified technicians use hot-water extraction, also called steam cleaning, and they work through the rooms you list: living rooms, hallways, bedrooms, and stairs. Cleaning the carpet in place suits a home that wants those rooms done during one visit. Carpet cleaning starts at $99. The price for your job depends on the rooms, the size, and the condition, and we confirm an exact quote before the visit is scheduled. Read how ",
      },
      {
        text: "carpet cleaning and allergies",
        href: "/blog/carpet-cleaning-allergies-indoor-air-quality/",
      },
      { text: " affect the air in your home. You can also read how " },
      {
        text: "steam cleaning compares with dry cleaning",
        href: "/blog/steam-cleaning-vs-dry-cleaning-carpet/",
      },
      { text: "." },
    ],
    included: [
      "Wall-to-wall carpet in the rooms you list",
      "Hot-water extraction by certified technicians",
      "A quote based on rooms, size, and condition",
      "A walkthrough of the rooms when the cleaning is finished",
    ],
  },
  {
    id: "upholstery",
    nav: "Upholstery",
    title: "Upholstery Cleaning",
    service: "Upholstery Cleaning",
    image: "upholstery",
    alt: "Technician cleaning a light sofa with an upholstery wand and blue hose",
    startsAt: false,
    body: [
      {
        text: "Upholstery cleaning covers the fabric furniture that stays in the room, including sofas, chairs, sectionals, and ottomans. Certified technicians clean the pieces you list, working across seats, arms, and the front of the back cushions. It is a practical visit when those pieces are used every day and you want them cleaned at home. Upholstery is quoted for the pieces and their condition, and we confirm that quote before scheduling. Read the guide to ",
      },
      {
        text: "upholstery cleaning benefits",
        href: "/blog/upholstery-cleaning-benefits/",
      },
      { text: " for the questions homeowners ask before they book." },
    ],
    included: [
      "Sofas, chairs, and other upholstered pieces you list",
      "Cleaning by certified technicians",
      "A quote based on the pieces and their condition",
      "A walkthrough when the cleaning is finished",
    ],
  },
  {
    id: "rugs",
    nav: "Area Rugs",
    title: "Area Rug Cleaning",
    service: "Area Rug Cleaning",
    image: "rug",
    alt: "Technician cleaning a patterned area rug with a rotary brush",
    startsAt: false,
    body: [
      {
        text: "Area rug cleaning is for rugs that remain in the home, such as a living-room rug, a hallway runner, or a bedroom rug. Certified technicians clean the rugs you include in the visit and walk the space with you when the work is finished. On-site cleaning is a fit when the rug can stay in the room for the appointment. Each rug is quoted from its size and condition. If pets share the room, the guide to ",
      },
      {
        text: "pet stains and odors",
        href: "/blog/remove-pet-stains-odors/",
      },
      { text: " describes what you can do between visits." },
    ],
    included: [
      "Area rugs cleaned in the room during the visit",
      "Cleaning by certified technicians",
      "A quote based on the rug's size and condition",
      "A walkthrough when the cleaning is finished",
    ],
  },
  {
    id: "tile-grout",
    nav: "Tile & Grout",
    title: "Tile & Grout Cleaning",
    service: "Tile & Grout Cleaning",
    image: "tile",
    alt: "Technician cleaning a white tile floor with a rotary machine",
    startsAt: false,
    body: [
      {
        text: "Tile and grout cleaning covers tile floors and the grout lines between the tiles. Certified technicians clean the floor area you put on the quote, whether that is a kitchen, a bathroom, an entry, or another tiled room in the home. The visit is a fit when dirt has settled in the grout and you want that floor cleaned in place. Tile and grout is quoted for the floor size and the condition. If the same home also has wall-to-wall carpet, the ",
      },
      {
        text: "carpet cleaning tips for homeowners",
        href: "/blog/carpet-cleaning-tips-homeowners/",
      },
      { text: " cover everyday care between visits." },
    ],
    included: [
      "Tile floors and the grout lines in the rooms you list",
      "Cleaning by certified technicians",
      "A quote based on the floor size and condition",
      "A walkthrough when the cleaning is finished",
    ],
  },
  {
    id: "commercial",
    nav: "Commercial",
    title: "Commercial Carpet Cleaning",
    service: "Commercial Carpet Cleaning",
    image: "equipment",
    alt: "Technician operating a truck-mounted carpet cleaning machine in the van",
    startsAt: false,
    body: [
      {
        text: "Commercial carpet cleaning is for offices, lobbies, and other business spaces in Chicago and the suburbs. Certified technicians clean the carpeted areas you list with hot-water extraction, the same method we use in homes. The visit is a fit when a business wants those areas cleaned and then walked through before we leave. Commercial carpet is quoted for the space and its condition, and we confirm that quote before the visit is scheduled. See why ",
      },
      {
        text: "commercial carpet cleaning for your business",
        href: "/blog/commercial-carpet-cleaning-business/",
      },
      { text: " keeps lobbies and work areas presentable." },
    ],
    included: [
      "Carpet in the offices, lobbies, or other spaces you list",
      "Hot-water extraction by certified technicians",
      "A quote based on the space and its condition",
      "A walkthrough when the cleaning is finished",
    ],
  },
];

export const serviceFaqs = [
  {
    q: "How much does carpet cleaning cost?",
    a: `Carpet cleaning starts at $99. The price for a job depends on the rooms, the size, and the condition. Upholstery, area rugs, tile and grout, and commercial carpet are quoted for that job. Call ${PHONE_DISPLAY} for an exact quote.`,
  },
  {
    q: "What should I prepare before the visit?",
    a: "Tell us which rooms or pieces you want cleaned, and describe the condition. Move fragile items and small belongings out of the work area before we arrive. We confirm the details with you before the visit is scheduled.",
  },
  {
    q: "Which areas do you clean?",
    a: `We clean homes and businesses in Chicago and the suburbs. The main office is in Bartlett, and a second office is in Franklin Park. See the service areas page for the town list, or call ${PHONE_DISPLAY} to ask about your town.`,
  },
];
