import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import QuoteForm from "@/components/QuoteForm";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import StartsAtBadge from "@/components/StartsAtBadge";
import FaqAccordion from "@/components/FaqAccordion";
import AreaTeaser from "@/components/home/AreaTeaser";
import HowItWorks from "@/components/home/HowItWorks";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, buttonOrange, buttonOutline, focusRing, sectionTitle } from "@/components/home/ui";
import { PHONE_DISPLAY } from "@/data/locations";
import { SERVICES_CARPET_SIZES } from "@/lib/homeImages";
import { serviceBlocks, serviceFaqs, type CopyPart } from "@/data/servicesPage";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

function AreasAnswer() {
  return (
    <>
      We clean homes and businesses in Chicago and the suburbs. The main office is in Bartlett, and a second office is in
      Franklin Park. See the{" "}
      <Link to="/service-areas/" className={linkClass}>
        service areas page
      </Link>{" "}
      for the town list, or call {PHONE_DISPLAY} to ask about your town.
    </>
  );
}

function ServiceCopy({ parts }: { parts: CopyPart[] }) {
  return (
    <p className={`${bodyText} mt-4`}>
      {parts.map((part, index) =>
        part.href ? (
          <Link key={index} to={part.href} className={linkClass}>
            {part.text}
          </Link>
        ) : (
          part.text
        ),
      )}
    </p>
  );
}

const Services = () => {
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
                  Services
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 max-w-4xl font-heading text-[1.75rem] font-bold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
              Carpet, Rug & Upholstery Cleaning Services
            </h1>
            <p className={`${bodyText} mt-4 max-w-2xl lg:text-lg`}>
              Certified technicians for homes and businesses in Chicago and the suburbs. Carpet cleaning starts at $99.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#services-quote" className={`${buttonOrange} w-full sm:w-auto`}>
                Get a Quote
              </a>
              <CallButton className={`${buttonOutline} w-full sm:w-auto`} />
            </div>
          </div>
        </section>

        <nav
          aria-label="Services on this page"
          className="sticky top-16 z-40 border-y border-border bg-white/95 backdrop-blur"
        >
          <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 md:flex-wrap md:overflow-visible">
            {serviceBlocks.map((service) => (
              <li key={service.id} className="shrink-0">
                <a
                  href={`#${service.id}`}
                  className={`inline-flex min-h-12 items-center rounded-full border border-border bg-white px-4 text-base font-semibold text-primary ${focusRing}`}
                >
                  {service.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-white px-4 pb-4 pt-10 lg:pt-14">
          <p className={`${bodyText} mx-auto max-w-6xl`}>
            Five services for homes and businesses in Chicago and the suburbs, from the Bartlett office and the{" "}
            <Link to="/locations/franklin-park/" className={linkClass}>
              Franklin Park office
            </Link>
            . Certified technicians do the cleaning. Carpet cleaning starts at $99. Upholstery, area rugs, tile and grout,
            and commercial carpet are quoted for the rooms, the size, and the condition. The towns we cover are on the{" "}
            <Link to="/service-areas/" className={linkClass}>
              service areas
            </Link>{" "}
            page.
          </p>
        </div>

        {serviceBlocks.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-36 px-4 py-12 lg:py-16 ${index % 2 === 1 ? "bg-[hsl(210,40%,98%)]" : "bg-white"}`}
          >
            <article
              aria-labelledby={`${service.id}-heading`}
              tabIndex={-1}
              className="mx-auto grid max-w-6xl items-center gap-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(174,62%,26%)] lg:grid-cols-2"
            >
              <figure className={index % 2 === 1 ? "lg:order-2" : ""}>
                <ResponsiveImage
                  name={service.image}
                  alt={service.alt}
                  sizes={SERVICES_CARPET_SIZES}
                  priority={index === 0}
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                />
              </figure>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <h2 id={`${service.id}-heading`} className="font-heading text-3xl font-bold text-primary">
                  {service.title}
                </h2>
                {service.startsAt ? (
                  <StartsAtBadge className="mt-4" />
                ) : (
                  <p className="mt-4 text-base font-semibold text-primary">Request a quote</p>
                )}
                <ServiceCopy parts={service.body} />
                <h3 className="mt-6 font-heading text-xl font-bold text-primary">What's included</h3>
                <ul className={`${bodyText} mt-3 list-disc space-y-2 pl-5`}>
                  {service.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <QuoteFormDialog defaultService={service.service}>
                  <button type="button" className={`${buttonOrange} mt-6 w-full lg:w-auto`}>
                    Get a quote for this service
                  </button>
                </QuoteFormDialog>
              </div>
            </article>
          </section>
        ))}

        <HowItWorks />

        <section className="border-t border-border bg-white px-4 py-16 lg:py-24" aria-labelledby="services-faq-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="services-faq-heading" className={sectionTitle}>
              Questions about these services
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>Price, how to prepare, and where we clean.</p>
            <div className="mt-8">
              <FaqAccordion
                defaultOpen
                items={serviceFaqs.map((item) =>
                  item.q.startsWith("Which areas") ? { q: item.q, a: <AreasAnswer /> } : item,
                )}
              />
            </div>
          </div>
        </section>

        <div className="border-t border-border">
          <AreaTeaser />
        </div>

        <section id="services-quote" className="scroll-mt-36 border-t border-border bg-white px-4 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitle}>Request a quote</h2>
              <p className={`${bodyText} mt-4 max-w-xl`}>
                Call {PHONE_DISPLAY} or send the form. Carpet cleaning starts at $99. Certified technicians do the work.
                Choose the service and the address, and we will confirm the quote before scheduling.
              </p>
              <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <QuoteForm id="services-quote-form" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileBar scrollTo="services-quote" />
    </div>
  );
};

export default Services;
