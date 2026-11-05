import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import AreaChips from "@/components/AreaChips";
import OfficeCard from "@/components/OfficeCard";
import QuoteForm from "@/components/QuoteForm";
import CoverageMap from "@/components/CoverageMap";
import HowItWorks from "@/components/home/HowItWorks";
import { bodyText, buttonOrange, buttonOutline, focusRing, inputClass, sectionTitle } from "@/components/home/ui";
import { FRANKLIN_PARK_PAGE, PHONE_DISPLAY, PRIMARY_LOCATION, formatAddress } from "@/data/locations";
import {
  marketingRegionNote,
  publishedTowns,
  quotingAcrossTowns,
  serviceRegions,
  townPageHref,
  type ServiceRegion,
} from "@/data/serviceAreas";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

const AREA_WIDTHS = [480, 768] as const;

const serviceLinks = [
  { label: "Carpet cleaning", href: "/services/#carpet" },
  { label: "Upholstery cleaning", href: "/services/#upholstery" },
  { label: "Area rug cleaning", href: "/services/#rugs" },
  { label: "Tile and grout cleaning", href: "/services/#tile-grout" },
  { label: "Commercial carpet cleaning", href: "/services/#commercial" },
] as const;

function focusQuoteForm() {
  window.setTimeout(() => {
    document.querySelector<HTMLElement>("#areas-quote-form input[name='name']")?.focus();
  }, 0);
}

function AreaPhoto({ name, alt }: { name: ServiceRegion["image"]; alt: string }) {
  const srcSet = (extension: "avif" | "webp") =>
    AREA_WIDTHS.map((width) => `/images/areas/${name}-${width}.${extension} ${width}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes="(min-width: 1024px) 560px, 100vw" />
      <source type="image/webp" srcSet={srcSet("webp")} sizes="(min-width: 1024px) 560px, 100vw" />
      <img
        src={`/images/areas/${name}.jpg`}
        alt={alt}
        width={768}
        height={492}
        sizes="(min-width: 1024px) 560px, 100vw"
        loading="lazy"
        decoding="async"
        className="aspect-[768/492] w-full rounded-xl object-cover"
      />
    </picture>
  );
}

function RegionCard({
  region,
  query,
  open,
  onToggle,
  onSelectTown,
}: {
  region: ServiceRegion;
  query: string;
  open: boolean;
  onToggle: (open: boolean) => void;
  onSelectTown: (town: string) => void;
}) {
  const needle = query.trim().toLowerCase();
  const visible = region.towns.filter((town) => needle.length === 0 || town.toLowerCase().includes(needle));
  return (
    <details
      open={open}
      onToggle={(event) => onToggle(event.currentTarget.open)}
      data-region={region.region}
      className="rounded-2xl border border-border bg-white shadow-sm"
    >
      <summary
        className={`flex min-h-12 cursor-pointer list-none items-start justify-between gap-3 px-5 py-4 ${focusRing} [&::-webkit-details-marker]:hidden`}
      >
        <span className="min-w-0">
          <h2 className="font-heading text-2xl font-bold text-primary">{region.region}</h2>
          <span className="mt-1 block text-sm font-semibold text-[hsl(174,62%,26%)]">Marketing region</span>
        </span>
        <span aria-hidden="true" className="text-2xl font-bold leading-none text-[hsl(174,62%,26%)] lg:hidden">
          {open ? "–" : "+"}
        </span>
      </summary>
      <div className="px-5 pb-5">
        <AreaPhoto name={region.image} alt={region.alt} />
        <p className={`${bodyText} mt-4`}>{region.access}</p>
        <p className="mt-3">
          <Link to={region.serviceHref} className={linkClass}>
            {region.serviceLabel}
          </Link>
        </p>
        <div className="mt-4">
          <AreaChips
            onSelect={onSelectTown}
            items={region.towns.map((town) => ({
              label: town,
              href: townPageHref[town],
              hidden: needle.length > 0 && !town.toLowerCase().includes(needle),
            }))}
          />
        </div>
        <p hidden={needle.length === 0 || visible.length > 0} className={`${bodyText} mt-3`}>
          No towns in this group match that search.
        </p>
      </div>
    </details>
  );
}

const ServiceAreas = () => {
  const [query, setQuery] = useState("");
  const [openRegions, setOpenRegions] = useState(() => serviceRegions.map((_, index) => index === 0));
  const needle = query.trim().toLowerCase();
  const matchedTowns = publishedTowns.filter((town) => needle.length > 0 && town.toLowerCase().includes(needle));
  const selectedTown = matchedTowns.length === 1 ? matchedTowns[0] : "";
  const addressPrefill = selectedTown ? `${selectedTown}, IL` : "";

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const openOnDesktop = () => {
      if (!media.matches) return;
      setOpenRegions((current) => (current.every(Boolean) ? current : current.map(() => true)));
    };
    openOnDesktop();
    media.addEventListener("change", openOnDesktop);
    return () => media.removeEventListener("change", openOnDesktop);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main>
        <section className="bg-white px-4 pb-8 pt-8 lg:pb-10 lg:pt-14">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-base text-[hsl(216,30%,26%)]">
                <li>
                  <Link to="/" className={linkClass}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-primary">
                  Service Areas
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 max-w-4xl font-heading text-[1.75rem] font-bold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
              Service Areas in Chicago & the Suburbs
            </h1>
            <p className={`${bodyText} mt-4 max-w-2xl lg:text-lg`}>
              Carpet, rug, upholstery, tile, and commercial carpet cleaning for the towns on this page. Carpet
              cleaning starts at $99. Call {PHONE_DISPLAY} or request a quote. The office is in Franklin Park.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#areas-quote" onClick={focusQuoteForm} className={`${buttonOrange} w-full sm:w-auto`}>
                Get a Quote
              </a>
              <CallButton className={`${buttonOutline} w-full sm:w-auto`} />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 pb-10" aria-labelledby="coverage-map-heading">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 id="coverage-map-heading" className={sectionTitle}>
                Listed towns
              </h2>
              <p className={`${bodyText} mt-4`}>{marketingRegionNote}</p>
              <p className={`${bodyText} mt-4`}>
                Search the list or open a group. Choosing a town puts that name on the quote form. Add the street
                address there. We check the address against this list.
              </p>
            </div>
            <CoverageMap />
          </div>
        </section>

        <div className="sticky top-16 z-40 border-y border-border bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <label htmlFor="town-filter" className="mb-1 block text-base font-semibold text-foreground">
              Find your town
            </label>
            <input
              id="town-filter"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
              className={inputClass}
            />
          </div>
        </div>

        <section className="bg-[hsl(210,40%,98%)] px-4 py-10 lg:py-14" aria-label="Towns by region">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {serviceRegions.map((region, index) => (
              <RegionCard
                key={region.id}
                region={region}
                query={query}
                open={openRegions[index]}
                onSelectTown={(town) => setQuery(town)}
                onToggle={(next) =>
                  setOpenRegions((current) => {
                    if (current[index] === next) return current;
                    const copy = [...current];
                    copy[index] = next;
                    return copy;
                  })
                }
              />
            ))}
          </div>
        </section>

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="quoting-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="quoting-heading" className={sectionTitle}>
              How quoting works across towns
            </h2>
            <p className={`${bodyText} mt-4`}>{quotingAcrossTowns}</p>
            <h3 className="mt-8 font-heading text-2xl font-bold text-primary">Services in these towns</h3>
            <p className={`${bodyText} mt-3`}>
              The same five services are available in every town listed above. Carpet cleaning starts at $99. The
              other four are quoted from the rooms or pieces, the size, and the condition.
            </p>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link to={service.href} className={linkClass}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={`${bodyText} mt-4`}>
              The{" "}
              <Link to="/locations/franklin-park/" className={linkClass}>
                Franklin Park office
              </Link>{" "}
              schedules the work. For care between visits, see{" "}
              <Link to="/blog/carpet-cleaning-tips-homeowners/" className={linkClass}>
                carpet cleaning tips for homeowners
              </Link>
              .
            </p>
          </div>
        </section>

        <HowItWorks />

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="offices-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="offices-heading" className={sectionTitle}>
              Our office
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              The office is in Franklin Park, at {formatAddress(PRIMARY_LOCATION)}. Bartlett is on the town list. Call{" "}
              {PHONE_DISPLAY} or request a quote online.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <OfficeCard
                name={PRIMARY_LOCATION.name}
                street={PRIMARY_LOCATION.street}
                city={PRIMARY_LOCATION.city}
                region={PRIMARY_LOCATION.region}
                postalCode={PRIMARY_LOCATION.postalCode}
                primary
                pageHref={FRANKLIN_PARK_PAGE.path}
                image="van-setup"
                imageAlt="Technician preparing the truck-mounted cleaner inside the Ernest Steamers van"
                imageCaption="Setting up the van-mounted cleaner on a job."
              />
            </div>
          </div>
        </section>

        <section className="bg-[hsl(210,40%,98%)] px-4 py-12" aria-labelledby="related-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="related-heading" className={sectionTitle}>
              Related pages
            </h2>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/services/" className={`${buttonOutline} w-full sm:w-auto`}>
                Cleaning services
              </Link>
              <Link to={FRANKLIN_PARK_PAGE.path} className={`${buttonOutline} w-full sm:w-auto`}>
                Franklin Park office
              </Link>
              <Link to="/blog/" className={`${buttonOutline} w-full sm:w-auto`}>
                Blog
              </Link>
            </div>
          </div>
        </section>

        <section id="areas-quote" className="scroll-mt-24 border-t border-border bg-white px-4 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitle}>Don&apos;t see your town?</h2>
              <p className={`${bodyText} mt-4 max-w-xl`}>
                Send the service address on the form. We check it against the town list. A dot on the map, or a town
                in a group, does not mean every surrounding address is covered. Carpet cleaning starts at $99.
              </p>
              {selectedTown ? (
                <p className={`${bodyText} mt-4 max-w-xl`}>
                  The form starts with {selectedTown}, IL. Add the street address before you send it.
                </p>
              ) : (
                <p className={`${bodyText} mt-4 max-w-xl`}>
                  Choose a town in a group above to start the form with that town, then add the street.
                </p>
              )}
              <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p id="quote-coverage-note" className={`${bodyText} mb-4`}>
                Coverage is the published town list, checked from the address you enter.
              </p>
              <QuoteForm id="areas-quote-form" addressPrefill={addressPrefill} describedBy="quote-coverage-note" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileBar scrollTo="areas-quote" />
    </div>
  );
};

export default ServiceAreas;
