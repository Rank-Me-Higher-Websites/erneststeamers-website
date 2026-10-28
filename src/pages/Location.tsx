import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import AreaChips from "@/components/AreaChips";
import FaqAccordion from "@/components/FaqAccordion";
import OfficeCard from "@/components/OfficeCard";
import QuoteForm from "@/components/QuoteForm";
import ServiceCard from "@/components/ServiceCard";
import HowItWorks from "@/components/home/HowItWorks";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, buttonOrange, buttonOutline, focusRing, sectionTitle } from "@/components/home/ui";
import { SERVICES_CARPET_SIZES } from "@/lib/homeImages";
import { serviceBlocks } from "@/data/servicesPage";
import { franklinNearbyLabels, franklinParkFaqs, franklinParkParagraphs } from "@/data/franklinParkPage";
import {
  PRIMARY_LOCATION,
  formatAddress,
  getOfficeBySlug,
  mapsDirectionsHref,
  mapsEmbedSrc,
} from "@/data/locations";
import NotFound from "./NotFound";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

const serviceBlurbs: Record<string, string> = {
  carpet: "Wall-to-wall carpet cleaned with hot-water extraction in the rooms you list.",
  upholstery: "Sofas, chairs, and other upholstered pieces cleaned in the room.",
  rugs: "Area rugs cleaned in the home during the visit.",
  "tile-grout": "Tile floors and grout lines cleaned in the rooms you list.",
  commercial: "Carpet in offices, lobbies, and other business spaces.",
};

function focusQuoteForm() {
  window.setTimeout(() => {
    document.querySelector<HTMLElement>("#franklin-park-quote-form input[name='name']")?.focus();
  }, 0);
}

const LocationPage = () => {
  const { slug } = useParams();
  const office = slug ? getOfficeBySlug(slug) : undefined;
  const [mapOpen, setMapOpen] = useState(false);

  if (!office) return <NotFound />;

  const paragraphs = office.slug === "franklin-park" ? franklinParkParagraphs : [office.intro, office.details];
  const faqs = office.slug === "franklin-park" ? franklinParkFaqs : [];
  const nearby =
    office.slug === "franklin-park" ? franklinNearbyLabels(office.nearby) : [...office.nearby];

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main>
        <section className="bg-white px-4 pb-8 pt-8 lg:pb-12 lg:pt-14">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
            <div>
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-2 text-base text-[hsl(216,30%,26%)]">
                  <li>
                    <Link to="/" className={linkClass}>
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to="/service-areas/" className={linkClass}>
                      Service Areas
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="font-semibold text-primary">
                    {office.city}
                  </li>
                </ol>
              </nav>
              <h1 className="mt-4 max-w-4xl font-heading text-[1.75rem] font-bold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
                {office.h1}
              </h1>
              <p className={`${bodyText} mt-4 max-w-xl lg:text-lg`}>{formatAddress(office)}</p>
              <p className={`${bodyText} mt-3 max-w-xl`}>
                Certified technicians. Carpet cleaning starts at $99. This office is a branch of the Bartlett location.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#franklin-park-quote" onClick={focusQuoteForm} className={`${buttonOrange} w-full sm:w-auto`}>
                  Get A Free Quote
                </a>
                <CallButton className={`${buttonOutline} w-full sm:w-auto`} />
              </div>
            </div>
            <figure>
              <ResponsiveImage
                name="carpet"
                alt="Ernest Steamers technician steam cleaning a living room carpet with a wand"
                sizes={SERVICES_CARPET_SIZES}
                priority
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
              <figcaption className={`${bodyText} mt-3`}>Steam cleaning a living room carpet.</figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="visit-heading">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 id="visit-heading" className={sectionTitle}>
                Visit our office
              </h2>
              <p className={`${bodyText} mt-3 max-w-xl`}>
                {office.name} is at {formatAddress(office)}. Call {office.phoneDisplay} or email{" "}
                <a href={`mailto:${office.email}`} className={linkClass}>
                  {office.email}
                </a>
                .
              </p>
              <div className="mt-6">
                <OfficeCard
                  name={office.name}
                  street={office.street}
                  city={office.city}
                  region={office.region}
                  postalCode={office.postalCode}
                  image="equipment"
                  imageAlt="Technician operating a truck-mounted carpet cleaning machine in the van"
                  imageCaption="Truck-mounted cleaner on a job."
                />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              {mapOpen ? (
                <iframe
                  src={mapsEmbedSrc(office)}
                  title={`Map of the Ernest Steamers office at ${formatAddress(office)}`}
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-80 flex-col items-start justify-center gap-4 p-6">
                  <p className={bodyText}>
                    Map of {formatAddress(office)}. The map loads when you ask for it.
                  </p>
                  <button type="button" className={`${buttonOutline} w-full sm:w-auto`} onClick={() => setMapOpen(true)}>
                    Show map
                  </button>
                  <a
                    href={mapsDirectionsHref(office)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${buttonOrange} w-full sm:w-auto`}
                  >
                    Open in Google Maps
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="services-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="services-heading" className={sectionTitle}>
              Services
            </h2>
            <div className={`${bodyText} mt-4 max-w-3xl space-y-4`}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              <p>
                See the{" "}
                <Link to="/services/" className={linkClass}>
                  cleaning services
                </Link>
                , the{" "}
                <Link to="/service-areas/" className={linkClass}>
                  service areas
                </Link>
                , and{" "}
                <Link to="/blog/carpet-cleaning-tips-homeowners/" className={linkClass}>
                  carpet cleaning tips for homeowners
                </Link>
                .
              </p>
            </div>
            <p className={`${bodyText} mt-6 max-w-2xl`}>
              Carpet cleaning starts at $99. Upholstery, area rugs, tile and grout, and commercial carpet are quoted for
              the job. Each card links to the service details.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceBlocks.map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={serviceBlurbs[service.id]}
                  href={`/services/#${service.id}`}
                  image={service.image}
                  alt={service.alt}
                  service={service.service}
                  startsAt={service.startsAt}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="nearby-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="nearby-heading" className={sectionTitle}>
              Nearby towns
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              These towns are already listed for Chicago, Cook County, and the Franklin Park office. Each chip goes to
              the service areas page.
            </p>
            <div className="mt-6">
              <AreaChips items={nearby.map((label) => ({ label, href: "/service-areas/" }))} />
            </div>
          </div>
        </section>

        <HowItWorks />

        {faqs.length > 0 ? (
          <section className="border-t border-border bg-white px-4 py-16 lg:py-24" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-6xl">
              <h2 id="faq-heading" className={sectionTitle}>
                FAQ
              </h2>
              <div className="mt-8">
                <FaqAccordion defaultOpen items={faqs} />
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-[hsl(210,40%,98%)] px-4 py-12" aria-labelledby="main-office-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="main-office-heading" className={sectionTitle}>
              Main office: Bartlett
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              The main office is{" "}
              <Link to="/service-areas/" className={linkClass}>
                Bartlett
              </Link>{" "}
              at {formatAddress(PRIMARY_LOCATION)}. The {office.city} office is a branch of that location.
            </p>
          </div>
        </section>

        <section id="franklin-park-quote" className="scroll-mt-24 border-t border-border bg-white px-4 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitle}>Request a quote</h2>
              <p className={`${bodyText} mt-4 max-w-xl`}>
                Call {office.phoneDisplay} or send the form. Carpet cleaning starts at $99. Certified technicians do the
                work. The page address is sent with the request so we know it came from the {office.city} office.
              </p>
              <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <QuoteForm id="franklin-park-quote-form" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileBar scrollTo="franklin-park-quote" />
    </div>
  );
};

export default LocationPage;
