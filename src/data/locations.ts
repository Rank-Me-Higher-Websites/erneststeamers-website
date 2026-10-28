/**
 * Business locations.
 *
 * The primary NAP is Bartlett. Secondary offices are added to this list:
 * the footer, location routes, prerender paths, and LocalBusiness nodes
 * read it. Also add each office path to public/sitemap.xml (the build checks).
 */

export const PHONE_DISPLAY = "630-830-9867";
export const PHONE_SCHEMA = "+1-630-830-9867";
export const EMAIL = "info@erneststeamers.com";

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
    h1: "Franklin Park Office",
    name: "Ernest Steamers Franklin Park",
    street: "10549 Crown Rd #4",
    city: "Franklin Park",
    region: "IL",
    postalCode: "60131",
    country: "US",
    phoneDisplay: PHONE_DISPLAY,
    phoneSchema: PHONE_SCHEMA,
    email: EMAIL,
    title: "Franklin Park Office | Ernest Steamers",
    description:
      "Carpet, rug, and upholstery steam cleaning at the Ernest Steamers office, 10549 Crown Rd #4, Franklin Park, IL 60131. Serving Franklin Park and nearby suburbs. Call 630-830-9867.",
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
