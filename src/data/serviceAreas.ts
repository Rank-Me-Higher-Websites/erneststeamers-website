/**
 * Towns and groups already published on /service-areas/.
 * Do not add towns. Aurora is in the LocalBusiness areaServed list and the
 * homepage FAQ only — it is not in these groups, so it stays off this page.
 * Groupings are unchanged, including St Charles and Orland Park under
 * "DuPage County & South Suburbs".
 */

export const serviceAreasTitle = "Service Areas | Chicago & Suburbs | Ernest Steamers";

export const serviceAreasDescription =
  "Carpet, rug and upholstery steam cleaning in Chicago, North Shore, DuPage and northwest suburbs. Based in Bartlett and Franklin Park. Call 630-830-9867.";

export type ServiceRegion = {
  id: string;
  region: string;
  /** File stem in /images/areas/. Northwest keeps the photo previously named area-south. */
  image: "chicago" | "west" | "north" | "northwest";
  alt: string;
  towns: readonly string[];
};

export const serviceRegions: readonly ServiceRegion[] = [
  {
    id: "cook",
    region: "Chicago & Cook County",
    image: "chicago",
    alt: "Aerial view of the Chicago skyline and Lake Michigan shoreline",
    towns: [
      "Chicago",
      "Franklin Park",
      "Wheeling",
      "Des Plaines",
      "Morton Grove",
      "Arlington Hts",
      "Niles",
      "Mt Prospect",
      "Skokie",
    ],
  },
  {
    id: "dupage",
    region: "DuPage County & South Suburbs",
    image: "west",
    alt: "Aerial view of a tree-lined neighborhood of detached houses",
    towns: [
      "Bloomingdale",
      "Clarendon Hills",
      "St Charles",
      "Downers Grove",
      "Glen Ellyn",
      "Naperville",
      "Elmhurst",
      "Orland Park",
    ],
  },
  {
    id: "north-shore",
    region: "North Shore Neighborhoods",
    image: "north",
    alt: "Aerial view of houses along a beach beside a large lake",
    towns: [
      "Northbrook",
      "Libertyville",
      "Northfield",
      "Lake Forest",
      "Glencoe",
      "Evanston",
      "Deerfield",
      "Winnetka",
      "Highland Park",
      "Wilmette",
      "Lake Bluff",
      "Glenview",
    ],
  },
  {
    id: "northwest",
    region: "Northwest Lake & Cook Counties",
    image: "northwest",
    alt: "Aerial view of suburban houses, lawns, and a long red-roofed building",
    towns: [
      "Bartlett",
      "Barrington",
      "Long Grove",
      "Palatine",
      "Hawthorn Woods",
      "Elgin",
      "Vernon Hills",
      "Schaumburg",
      "Buffalo Grove",
    ],
  },
];

export const publishedTowns: readonly string[] = serviceRegions.flatMap((region) => [...region.towns]);

/** Towns with their own page. Every other town stays plain text. */
export const townPageHref: Readonly<Record<string, string>> = {
  "Franklin Park": "/locations/franklin-park/",
};

export const serviceAreaParagraphs = [
  "Ernest Steamers steam cleans carpet, rugs, and upholstery for homes and businesses in Chicago and the suburbs. The main office is at 1018 Hummingbird Way, Bartlett, IL 60103. A second office is at 10549 Crown Rd #4, Franklin Park, IL 60131. Certified technicians do the cleaning. Carpet cleaning starts at $99. Upholstery, area rugs, tile and grout, and commercial carpet are quoted for the rooms, the size, and the condition.",
  "Carpet cleaning covers wall-to-wall carpet in the rooms you list, including living rooms, hallways, bedrooms, and stairs. Certified technicians use hot-water extraction, also called steam cleaning, and they work through those rooms during the visit. Cleaning the carpet in place suits a home that wants those rooms done in one visit. The price for a carpet job depends on the rooms, the size, and the condition. We confirm an exact quote before the visit is scheduled.",
  "Upholstery cleaning covers fabric furniture that stays in the room, including sofas, chairs, sectionals, and ottomans. Certified technicians clean the pieces you list, working across seats, arms, and the front of the back cushions. It is a practical visit when those pieces are used every day and you want them cleaned at home. Upholstery is quoted for the pieces and their condition, and we confirm that quote before scheduling.",
  "Area rug cleaning is for rugs that remain in the home, such as a living-room rug, a hallway runner, or a bedroom rug. Certified technicians clean the rugs you include in the visit and walk the space with you when the work is finished. On-site cleaning is a fit when the rug can stay in the room for the appointment. Each rug is quoted from its size and condition.",
  "Tile and grout cleaning covers tile floors and the grout lines between the tiles. Certified technicians clean the floor area you put on the quote, whether that is a kitchen, a bathroom, an entry, or another tiled room. The visit is a fit when dirt has settled in the grout and you want that floor cleaned in place. Tile and grout is quoted for the floor size and the condition.",
  "Commercial carpet cleaning is for offices, lobbies, and other business spaces in the towns on this page. Certified technicians clean the carpeted areas you list with hot-water extraction, the same method used in homes. The visit is a fit when a business wants those areas cleaned and then walked through before we leave. Commercial carpet is quoted for the space and its condition.",
  "Request a quote by calling 630-830-9867 or by sending the form on this page. Tell us the service and the service address, and which rooms or pieces to clean. You can add the approximate size, a date you prefer, and a note about the condition. We look at those details and confirm the quote before the visit is scheduled. On the visit, certified technicians clean and walk the finished work with you.",
  "The towns below are the ones already published for Ernest Steamers. They stay in four groups: Chicago and Cook County, DuPage County and the south suburbs, the North Shore, and northwest Lake and Cook counties. The same five services are available in every town in those groups. A town is plain text unless it has an office page. Franklin Park links to the Franklin Park office. If your town is not listed, call 630-830-9867 and we will tell you whether we can come to that address.",
];
