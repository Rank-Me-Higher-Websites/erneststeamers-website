import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import OfficeCard from "@/components/OfficeCard";
import QuoteForm from "@/components/QuoteForm";
import StartsAtBadge from "@/components/StartsAtBadge";
import Steps from "@/components/Steps";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, buttonOrange, buttonOutline, focusRing, sectionTitle } from "@/components/home/ui";
import { ABOUT_STORY_SIZES } from "@/lib/homeImages";
import { PHONE_DISPLAY, PRIMARY_LOCATION, SECONDARY_OFFICES, formatAddress } from "@/data/locations";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

const services = [
  { label: "Carpet Cleaning", href: "/services/#carpet", startsAt: true },
  { label: "Upholstery Cleaning", href: "/services/#upholstery" },
  { label: "Area Rug Cleaning", href: "/services/#rugs" },
  { label: "Tile & Grout Cleaning", href: "/services/#tile-grout" },
  { label: "Commercial Carpet Cleaning", href: "/services/#commercial" },
];

function focusQuoteForm() {
  window.setTimeout(() => {
    document.querySelector<HTMLElement>("#about-quote-form input[name='name']")?.focus();
  }, 0);
}

const About = () => {
  const franklinPark = SECONDARY_OFFICES[0];

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
                  About
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 max-w-4xl font-heading text-[1.75rem] font-bold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
              About Ernest Steamers — Chicago-Area Carpet Cleaners
            </h1>
            <p className={`${bodyText} mt-4 max-w-2xl lg:text-lg`}>
              Certified technicians. Carpet cleaning starts at $99.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#about-quote" onClick={focusQuoteForm} className={`${buttonOrange} w-full sm:w-auto`}>
                Get a Quote
              </a>
              <CallButton className={`${buttonOutline} w-full sm:w-auto`} />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-12 lg:py-20" aria-labelledby="story-heading">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12">
            <figure className="lg:col-span-6">
              <ResponsiveImage
                name="van"
                alt="Ernest Steamers van parked in the driveway of a brick house"
                sizes={ABOUT_STORY_SIZES}
                priority
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
              <figcaption className={`${bodyText} mt-3`}>Ernest Steamers van on a residential job.</figcaption>
            </figure>
            <div className="lg:col-span-6">
              <p className="text-sm font-bold uppercase tracking-wide text-[hsl(174,62%,26%)]">About us</p>
              <h2 id="story-heading" className={`${sectionTitle} mt-2`}>
                Our story
              </h2>
              <div className={`${bodyText} mt-4 space-y-4`}>
                <p>
                  Ernest Steamers is based in Bartlett, IL, with a second office in Franklin Park. Certified technicians
                  steam clean carpet, rugs, and upholstery for homes and businesses in Chicago and the suburbs.
                </p>
                <p>
                  Carpet cleaning starts at $99. The price for a job depends on the rooms, the size, and the condition. We
                  confirm a quote before the visit is scheduled.
                </p>
                <p>
                  The Bartlett office is at {formatAddress(PRIMARY_LOCATION)}. The{" "}
                  <Link to={franklinPark.path} className={linkClass}>
                    Franklin Park office
                  </Link>{" "}
                  is at {formatAddress(franklinPark)}. See the{" "}
                  <Link to="/services/" className={linkClass}>
                    cleaning services
                  </Link>
                  , the{" "}
                  <Link to="/service-areas/" className={linkClass}>
                    service areas
                  </Link>
                  , and the{" "}
                  <Link to="/blog/" className={linkClass}>
                    blog
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="what-to-expect" className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="expect-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="expect-heading" className={sectionTitle}>
              What to expect
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>Four steps from the first call to the walkthrough.</p>
            <div className="mt-8">
              <Steps
                columns={4}
                steps={[
                  {
                    title: "Request a quote",
                    body: `Call ${PHONE_DISPLAY} or send the form. Tell us the service and the address.`,
                  },
                  {
                    title: "Review the space",
                    body: "We look at the rooms and the condition and confirm the work before cleaning starts.",
                  },
                  {
                    title: "Steam clean",
                    body: "Certified technicians clean with hot-water extraction.",
                  },
                  {
                    title: "Walk the result",
                    body: "We walk the finished work with you.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="offices-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="offices-heading" className={sectionTitle}>
              Our offices
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              Two offices serve Chicago and the suburbs. Call {PHONE_DISPLAY} or request a quote online.
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

        <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="services-strip-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="services-strip-heading" className={sectionTitle}>
              Cleaning services
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              Carpet cleaning starts at $99. Other services are quoted for the rooms, the size, and the condition.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <li key={service.href} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4">
                  <Link to={service.href} className={`${buttonOutline} w-full`}>
                    {service.label}
                  </Link>
                  {service.startsAt ? <StartsAtBadge /> : <p className="text-base font-semibold text-primary">Request a quote</p>}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/services/" className={`${buttonOutline} w-full sm:w-auto`}>
                See all services
              </Link>
              <Link to="/service-areas/" className={`${buttonOutline} w-full sm:w-auto`}>
                Service areas
              </Link>
              <Link to="/blog/" className={`${buttonOutline} w-full sm:w-auto`}>
                Blog
              </Link>
            </div>
          </div>
        </section>

        <section id="about-quote" className="scroll-mt-24 border-t border-border bg-white px-4 py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitle}>Request a quote</h2>
              <p className={`${bodyText} mt-4 max-w-xl`}>
                Call {PHONE_DISPLAY} or send the form. Carpet cleaning starts at $99. Certified technicians do the work.
              </p>
              <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <QuoteForm id="about-quote-form" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileBar scrollTo="about-quote" />
    </div>
  );
};

export default About;
