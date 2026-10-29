/**
 * Business locations.
 *
 * The primary NAP is Bartlett. Secondary offices are added to this list:
 * the footer, location routes, prerender paths, and LocalBusiness nodes
 * read it. Also add each office path to public/sitemap.xml (the build checks).
 */

/**
 * Call-tracking number. Display text, tel: links, and LocalBusiness
 * telephone are all derived from this one national number.
 */
const TRACKING_NATIONAL = "6304030180";
const trackingArea = TRACKING_NATIONAL.slice(0, 3);
const trackingPrefix = TRACKING_NATIONAL.slice(3, 6);
const trackingLine = TRACKING_NATIONAL.slice(6);

export const PHONE_DISPLAY = `(${trackingArea}) ${trackingPrefix}-${trackingLine}`;
export const PHONE_SCHEMA = `+1-${trackingArea}-${trackingPrefix}-${trackingLine}`;

/**
 * Direct office line. The footer may list it as an alternate.
 * It is not a click-to-call target and not the schema telephone.
 */
export const PHONE_ALT_DISPLAY = "630-830-9867";
export const EMAIL = "info@erneststeamers.com";

/**
 * Business hours. Visible copy and every LocalBusiness
 * openingHoursSpecification read this list.
 */
export const BUSINESS_HOURS = [
  {
    label: "Monday–Friday",
    hours: "7:00 AM–9:00 PM",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "21:00",
  },
  {
    label: "Saturday–Sunday",
    hours: "7:00 AM–5:00 PM",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "07:00",
    closes: "17:00",
  },
] as const;

export const PRIMARY_LOCATION = {
  id: "bartlett",
  name: "Ernest Steamers",
  street: "1018 Hummingbird Way",
  city: "Bartlett",
  region: "IL",
  postalCode: "60103",
  country: "US",
  phoneDisplay: PHONE_DISPLAY,
  phoneSchema: PHONE_SCHEMA,
  email: EMAIL,
} as const;

export const NAP = {
  name: PRIMARY_LOCATION.name,
  phoneDisplay: PRIMARY_LOCATION.phoneDisplay,
  phoneSchema: PRIMARY_LOCATION.phoneSchema,
  street: PRIMARY_LOCATION.street,
  city: PRIMARY_LOCATION.city,
  region: PRIMARY_LOCATION.region,
  postalCode: PRIMARY_LOCATION.postalCode,
  email: PRIMARY_LOCATION.email,
} as const;

/**
 * Sister company. Referenced from the footer and from the main LocalBusiness.
 * It is a separate organization: do not copy its phone number or ratings.
 */
export const SISTER_COMPANY = {
  name: "Ernest Windows",
  url: "https://ernestwindows.com",
  id: "https://ernestwindows.com/#organization",
} as const;

export type SecondaryOffice = {
  id: string;
  slug: string;
  /** Public path. Non-root routes include the trailing slash Pages redirects to. */
  path: string;
  /** Visible h1. Keep it a single text node so prerender can find it. */
  h1: string;
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: "US";
  phoneDisplay: string;
  phoneSchema: string;
  email: string;
  title: string;
  description: string;
  /**
   * SERP description. When set, LocalBusiness.description stays `description`
   * so the branch schema does not change.
   */
  metaDescription?: string;
  /** Hero sentence for the location page. */
  intro: string;
  /** Body sentence describing the work at this office. */
  details: string;
  nearby: readonly string[];
};

export const SECONDARY_OFFICES: readonly SecondaryOffice[] = [
  {
    id: "franklin-park",
    slug: "franklin-park",
    path: "/locations/franklin-park/",
    h1: "Carpet and Upholstery Cleaning in Franklin Park, IL",
    name: "Ernest Steamers Franklin Park",
    street: "10549 Crown Rd #4",
    city: "Franklin Park",
    region: "IL",
    postalCode: "60131",
    country: "US",
    phoneDisplay: PHONE_DISPLAY,
    phoneSchema: PHONE_SCHEMA,
    email: EMAIL,
    title: "Carpet Cleaning in Franklin Park, IL | Ernest Steamers",
    description: `Carpet, rug, and upholstery steam cleaning at the Ernest Steamers office, 10549 Crown Rd #4, Franklin Park, IL 60131. Serving Franklin Park and nearby suburbs. Call ${PHONE_DISPLAY}.`,
    metaDescription: `Carpet, rug and upholstery steam cleaning from our Franklin Park office, 10549 Crown Rd #4. Call ${PHONE_DISPLAY} for a quote.`,
    intro: "Carpet, rug, and upholstery steam cleaning for Franklin Park and nearby suburbs.",
    details:
      "The Franklin Park office provides carpet, rug, and upholstery steam cleaning for homes and businesses.",
    nearby: ["Chicago", "Des Plaines", "Elmhurst", "Niles"],
  },
];

export function formatCityLine(location: { city: string; region: string; postalCode: string }) {
  return `${location.city}, ${location.region} ${location.postalCode}`;
}

export function formatAddress(location: {
  street: string;
  city: string;
  region: string;
  postalCode: string;
}) {
  return `${location.street}, ${formatCityLine(location)}`;
}

export function mapsEmbedSrc(location: {
  street: string;
  city: string;
  region: string;
  postalCode: string;
}) {
  const query = encodeURIComponent(`Ernest Steamers, ${formatAddress(location)}`);
  return `https://www.google.com/maps?q=${query}&output=embed&z=10`;
}

/** Google Maps search for the exact street address. Does not change the NAP. */
export function mapsDirectionsHref(location: {
  street: string;
  city: string;
  region: string;
  postalCode: string;
}) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress(location))}`;
}

export function phoneTelHref(phoneSchema: string = PHONE_SCHEMA) {
  return `tel:+${phoneSchema.replace(/\D/g, "")}`;
}

export function joinList(items: readonly string[]) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function getOfficeBySlug(slug: string) {
  return SECONDARY_OFFICES.find((office) => office.slug === slug);
}

function stripRouteSlash(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function getOfficeByPath(path: string) {
  const key = stripRouteSlash(path);
  return SECONDARY_OFFICES.find((office) => stripRouteSlash(office.path) === key);
}
