import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import AreaChips from "@/components/AreaChips";
import OfficeCard from "@/components/OfficeCard";
import QuoteForm from "@/components/QuoteForm";
import HowItWorks from "@/components/home/HowItWorks";
import { bodyText, buttonOrange, buttonOutline, focusRing, inputClass, sectionTitle } from "@/components/home/ui";
import { PHONE_DISPLAY, PRIMARY_LOCATION, SECONDARY_OFFICES, formatAddress } from "@/data/locations";
import {
  serviceAreaParagraphs,
  serviceRegions,
  townPageHref,
  type ServiceRegion,
} from "@/data/serviceAreas";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

const AREA_WIDTHS = [480, 768] as const;

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
}: {
  region: ServiceRegion;
  query: string;
  open: boolean;
  onToggle: (open: boolean) => void;
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
        className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 ${focusRing} [&::-webkit-details-marker]:hidden`}
      >
        <h2 className="font-heading text-2xl font-bold text-primary">{region.region}</h2>
        <span aria-hidden="true" className="text-2xl font-bold leading-none text-[hsl(174,62%,26%)] lg:hidden">
          {open ? "–" : "+"}
        </span>
      </summary>
      <div className="px-5 pb-5">
        <AreaPhoto name={region.image} alt={region.alt} />
        <div className="mt-4">
          <AreaChips
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
  const franklinPark = SECONDARY_OFFICES[0];
  const [query, setQuery] = useState("");
  const [openRegions, setOpenRegions] = useState(() => serviceRegions.map((_, index) => index === 0));

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
              Certified technicians. Carpet cleaning starts at $99. Call {PHONE_DISPLAY} or request a quote.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#areas-quote" onClick={focusQuoteForm} className={`${buttonOrange} w-full sm:w-auto`}>
                Get a Quote
              </a>
              <CallButton className={`${buttonOutline} w-full sm:w-auto`} />
            </div>
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

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="areas-services-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="areas-services-heading" className={sectionTitle}>
              Services in these towns
            </h2>
            <div className={`${bodyText} mt-4 space-y-4`}>
              {serviceAreaParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              <p>
                See the{" "}
                <Link to="/services/" className={linkClass}>
                  cleaning services
                </Link>
                , the{" "}
                <Link to="/locations/franklin-park/" className={linkClass}>
                  Franklin Park office
                </Link>
                , and{" "}
                <Link to="/blog/carpet-cleaning-tips-homeowners/" className={linkClass}>
                  carpet cleaning tips for homeowners
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <HowItWorks />

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="offices-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="offices-heading" className={sectionTitle}>
              Our offices
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              Bartlett is the main office, at {formatAddress(PRIMARY_LOCATION)}. Franklin Park is the branch office, at{" "}
              {formatAddress(franklinPark)}. Call {PHONE_DISPLAY} or request a quote online.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <OfficeCard
                name={PRIMARY_LOCATION.name}
                street={PRIMARY_LOCATION.street}
                city={PRIMARY_LOCATION.city}
                region={PRIMARY_LOCATION.region}
                postalCode={PRIMARY_LOCATION.postalCode}
                primary
                image="van-setup"
                imageAlt="Technician preparing the truck-mounted cleaner inside the Ernest Steamers van"
                imageCaption="Setting up the van-mounted cleaner on a job."
              />
              <OfficeCard
                name={franklinPark.name}
                street={franklinPark.street}
                city={franklinPark.city}
                region={franklinPark.region}
                postalCode={franklinPark.postalCode}
                pageHref={franklinPark.path}
                image="equipment"
                imageAlt="Technician operating a truck-mounted carpet cleaning machine in the van"
                imageCaption="Truck-mounted cleaner on a job."
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
              <Link to={franklinPark.path} className={`${buttonOutline} w-full sm:w-auto`}>
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
                Call {PHONE_DISPLAY} and we will tell you whether we can come. Or send the form with the service
                address. Carpet cleaning starts at $99. Certified technicians do the work.
              </p>
              <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <QuoteForm id="areas-quote-form" />
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
