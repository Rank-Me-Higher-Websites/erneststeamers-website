import { PHONE_DISPLAY } from "@/data/locations";
import { serviceRegions } from "@/data/serviceAreas";

export const franklinParkFaqs = [
  {
    q: "How much does carpet cleaning cost?",
    a: `Carpet cleaning starts at $99. The price for a job depends on the rooms, the size, and the condition. Upholstery, area rugs, tile and grout, and commercial carpet are quoted for that job. Call ${PHONE_DISPLAY} for a quote.`,
  },
  {
    q: "What services does the Franklin Park office offer?",
    a: "The Franklin Park office offers carpet cleaning, upholstery cleaning, area rug cleaning, tile and grout cleaning, and commercial carpet cleaning. Certified technicians do the work.",
  },
  {
    q: "How do I request a quote from this office?",
    a: `Call ${PHONE_DISPLAY} or send the form on this page. Include the service and the address. We confirm the details before the visit is scheduled.`,
  },
];

/**
 * Nearby chips: the office's existing nearby list, then the rest of the
 * Chicago & Cook County group. Every name is already published.
 */
export function franklinNearbyLabels(nearby: readonly string[]) {
  const cook = serviceRegions.find((region) => region.id === "cook");
  const rest = (cook?.towns ?? []).filter((town) => !nearby.includes(town));
  return [...nearby, ...rest];
}

export const franklinParkParagraphs = [
  "The Franklin Park office is a branch of Ernest Steamers. The main office is in Bartlett. Certified technicians steam clean carpet, rugs, and upholstery for homes and businesses from 10549 Crown Rd #4, Franklin Park, IL 60131. Carpet cleaning starts at $99. Other services are quoted for the rooms, the size, and the condition.",
  "Carpet cleaning from this office covers wall-to-wall carpet in the rooms you list, including living rooms, hallways, bedrooms, and stairs. Certified technicians use hot-water extraction, also called steam cleaning, and they work through those rooms during the visit. Cleaning the carpet in place suits a home that wants those rooms done in one visit. The price depends on the rooms, the size, and the condition. We confirm an exact quote before the visit is scheduled.",
  "Upholstery cleaning covers fabric furniture that stays in the room, including sofas, chairs, sectionals, and ottomans. Certified technicians clean the pieces you list, working across seats, arms, and the front of the back cushions. It is a practical visit when those pieces are used every day and you want them cleaned at home. Upholstery is quoted for the pieces and their condition, and we confirm that quote before scheduling.",
  "Area rug cleaning is for rugs that remain in the home, such as a living-room rug, a hallway runner, or a bedroom rug. Certified technicians clean the rugs you include in the visit and walk the space with you when the work is finished. On-site cleaning is a fit when the rug can stay in the room for the appointment. Each rug is quoted from its size and condition.",
  "Tile and grout cleaning covers tile floors and the grout lines between the tiles. Certified technicians clean the floor area you put on the quote, whether that is a kitchen, a bathroom, an entry, or another tiled room. The visit is a fit when dirt has settled in the grout and you want that floor cleaned in place. Tile and grout is quoted for the floor size and the condition.",
  "Commercial carpet cleaning is for offices, lobbies, and other business spaces. Certified technicians clean the carpeted areas you list with hot-water extraction, the same method used in homes. The visit is a fit when a business wants those areas cleaned and then walked through before we leave. Commercial carpet is quoted for the space and its condition.",
  `Call ${PHONE_DISPLAY} or send the form on this page. Tell us the service and the service address, and which rooms or pieces to clean. You can add the approximate size, a date you prefer, and a note about the condition. We look at those details and confirm the quote before the visit is scheduled. On the visit, certified technicians clean and walk the finished work with you.`,
  "Nearby towns already listed with this office are Chicago, Des Plaines, Elmhurst, and Niles. The Chicago and Cook County group on the service areas page also includes Franklin Park, Wheeling, Morton Grove, Arlington Hts, Mt Prospect, and Skokie. Those chips link to the service areas page. This office does not publish a separate page for each town.",
];
