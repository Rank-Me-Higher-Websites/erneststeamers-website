import { PHONE_DISPLAY, PRIMARY_LOCATION, formatAddress } from "@/data/locations";

/**
 * Towns and groups already published on /service-areas/.
 * Do not add towns. Aurora is in the LocalBusiness areaServed list only.
 * It is not in these groups and not in the homepage FAQ, so it stays off this page.
 * Do not add or drop Aurora without confirmation.
 * Groupings are unchanged, including St Charles and Orland Park under
 * "DuPage County & South Suburbs". Those headings are marketing regions,
 * not county boundaries.
 *
 * Coordinates are U.S. Census Bureau 2025 Gazetteer internal points
 * (INTPTLAT / INTPTLONG) for the incorporated Illinois place. The published
 * chip "Arlington Hts" is the village whose Census name is Arlington Heights.
 * "Mt Prospect" is Mount Prospect village. "St Charles" is St. Charles city.
 * The office point is the Census geocoder match for 10549 Crown Rd, not a
 * second place and not a service radius.
 */

export const serviceAreasTitle = "Service Areas | Chicago & Suburbs | Ernest Steamers";

export const serviceAreasDescription = `Carpet, rug and upholstery steam cleaning in Chicago, North Shore, DuPage and northwest suburbs. Based in Franklin Park. Call ${PHONE_DISPLAY}.`;

export type ServiceRegion = {
  id: string;
  region: string;
  /** File stem in /images/areas/. Northwest keeps the photo previously named area-south. */
  image: "chicago" | "west" | "north" | "northwest";
  alt: string;
  /** Scheduling and access differences for this marketing region. */
  access: string;
  serviceHref: string;
  serviceLabel: string;
  towns: readonly string[];
};

export const serviceRegions: readonly ServiceRegion[] = [
  {
    id: "cook",
    region: "Chicago & Cook County",
    image: "chicago",
    alt: "Aerial view of the Chicago skyline and Lake Michigan shoreline",
    access:
      "In Chicago, scheduling depends on the building: the floor, whether an elevator or a dock is available, and where the van can stand. A hose run through a lobby or garage takes more setup than a side door on a house. Houses in this group, including Franklin Park, more often have a driveway or an alley, which shortens that run. Winter salt and road grit build up on entry carpet and stair runners, including along the busy roads near O'Hare. Say whether the stop is a curb, a lot, or a driveway.",
    serviceHref: "/services/#carpet",
    serviceLabel: "Carpet cleaning for rooms and stairs",
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
    access:
      "Most stops in this group are detached houses on courts, so the driveway is often longer than at a city walk-up. Townhomes in downtown Glen Ellyn, Elmhurst, Downers Grove, and Naperville may use a guest stall instead of a private drive. St. Charles is listed here as a west stop, and Orland Park as a south stop, even though neither town is in DuPage County. On a tight cul-de-sac the van stays at the curb and the hose runs up the drive. Winter grit collects in the mudroom and on the carpet just inside the garage.",
    serviceHref: "/services/#tile-grout",
    serviceLabel: "Tile and grout cleaning for entries",
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
    access:
      "Evanston stops are more often a courtyard building or a shared lot. Houses in Winnetka, Glencoe, Highland Park, and Lake Forest commonly sit back from the street, on a ravine lot or a circular drive, so hose length and a place for the van decide whether the visit fits. Sidewalk salt and lake-effect slush land on entry rugs and in the first room past the door. Put a gate code or the lot name on the quote with the address.",
    serviceHref: "/services/#rugs",
    serviceLabel: "On-site area rug cleaning",
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
    access:
      "Schaumburg, Palatine, Buffalo Grove, and Vernon Hills mix townhome parking lots and carpeted offices with house streets. Barrington, Long Grove, and Hawthorn Woods tend to have a long private drive and little curb, so say if the van can pull onto the drive. Bartlett is a town we serve in this group, not an Ernest Steamers office. Elgin is the longer trip to the west. Salt from subdivision roads tracks in from the garage to the rooms beyond it.",
    serviceHref: "/services/#commercial",
    serviceLabel: "Commercial carpet cleaning",
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

export const marketingRegionNote =
  "Each group is a marketing region, not a county boundary. A town in a group is not a promise that every address around it is covered.";

export const quotingAcrossTowns = `Quoting works the same way in every town on this list. You supply the service address, the service, and the rooms or pieces to clean. We check that address against the towns published on this page before a visit is scheduled. The office is at ${formatAddress(PRIMARY_LOCATION)}. Bartlett is a served town, not a second office. If your town is not listed, call ${PHONE_DISPLAY} and ask whether that address is covered.`;

/**
 * Census 2025 Gazetteer internal points, keyed by the published town label.
 * Franklin Park the town uses this village point. The office diamond uses
 * franklinParkOfficePoint instead, because the street match sits on top of
 * the village point at this scale.
 */
export const townCoordinates: Readonly<Record<string, { lat: number; lon: number }>> = {
  Chicago: { lat: 41.837045, lon: -87.684939 },
  "Franklin Park": { lat: 41.935983, lon: -87.879197 },
  Wheeling: { lat: 42.129614, lon: -87.921503 },
  "Des Plaines": { lat: 42.034398, lon: -87.901136 },
  "Morton Grove": { lat: 42.042321, lon: -87.789012 },
  "Arlington Hts": { lat: 42.097362, lon: -87.981671 },
  Niles: { lat: 42.027862, lon: -87.809973 },
  "Mt Prospect": { lat: 42.064202, lon: -87.937364 },
  Skokie: { lat: 42.03597, lon: -87.739994 },
  Bloomingdale: { lat: 41.951525, lon: -88.089118 },
  "Clarendon Hills": { lat: 41.798448, lon: -87.957239 },
  "St Charles": { lat: 41.919447, lon: -88.310743 },
  "Downers Grove": { lat: 41.79503, lon: -88.021055 },
  "Glen Ellyn": { lat: 41.866715, lon: -88.062711 },
  Naperville: { lat: 41.749173, lon: -88.162019 },
  Elmhurst: { lat: 41.897014, lon: -87.943657 },
  "Orland Park": { lat: 41.608145, lon: -87.85929 },
  Northbrook: { lat: 42.128745, lon: -87.835162 },
  Libertyville: { lat: 42.284667, lon: -87.966503 },
  Northfield: { lat: 42.102968, lon: -87.777376 },
  "Lake Forest": { lat: 42.23535, lon: -87.857305 },
  Glencoe: { lat: 42.134489, lon: -87.763178 },
  Evanston: { lat: 42.046391, lon: -87.694352 },
  Deerfield: { lat: 42.166069, lon: -87.852467 },
  Winnetka: { lat: 42.10621, lon: -87.742764 },
  "Highland Park": { lat: 42.182372, lon: -87.810845 },
  Wilmette: { lat: 42.077323, lon: -87.728621 },
  "Lake Bluff": { lat: 42.282695, lon: -87.852306 },
  Glenview: { lat: 42.085162, lon: -87.827388 },
  Bartlett: { lat: 41.960637, lon: -88.177747 },
  Barrington: { lat: 42.151535, lon: -88.128534 },
  "Long Grove": { lat: 42.195016, lon: -88.011032 },
  Palatine: { lat: 42.116467, lon: -88.044361 },
  "Hawthorn Woods": { lat: 42.235755, lon: -88.067833 },
  Elgin: { lat: 42.038963, lon: -88.325671 },
  "Vernon Hills": { lat: 42.234407, lon: -87.961064 },
  Schaumburg: { lat: 42.0289, lon: -88.083773 },
  "Buffalo Grove": { lat: 42.165981, lon: -87.961826 },
};

/** Census geocoder, Public Address Ranges current benchmark, 10549 Crown Rd, Franklin Park, IL 60131. */
export const franklinParkOfficePoint = { lat: 41.932162, lon: -87.888649 };
