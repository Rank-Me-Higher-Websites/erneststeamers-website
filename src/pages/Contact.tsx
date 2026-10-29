import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import OfficeCard from "@/components/OfficeCard";
import QuoteForm from "@/components/QuoteForm";
import Steps from "@/components/Steps";
import FaqAccordion from "@/components/FaqAccordion";
import { bodyText, buttonOrange, focusRing, sectionTitle } from "@/components/home/ui";
import { EMAIL, PHONE_DISPLAY, PRIMARY_LOCATION, SECONDARY_OFFICES } from "@/data/locations";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

const contactFaqs = [
  {
    q: "How much does carpet cleaning cost?",
    a: `Carpet cleaning starts at $99. The price for a job depends on the rooms, the size, and the condition. Call ${PHONE_DISPLAY} or send the form for a quote.`,
  },
  {
    q: "Which areas do you clean?",
    a: `We clean homes and businesses in Chicago and the suburbs. The main office is in Bartlett, and a second office is in Franklin Park. Call ${PHONE_DISPLAY} to ask about your town.`,
  },
  {
    q: "What should I prepare for a quote?",
    a: "Tell us the service, the address, and the rooms or approximate size. Add a note in the message if there is anything you want us to know about the space.",
  },
];

export default function Contact() {
  const franklinPark = SECONDARY_OFFICES[0];

  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main>
        <section className="bg-white px-4 pb-12 pt-8 lg:pb-16 lg:pt-14">
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
                  Contact
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 max-w-4xl font-heading text-[1.75rem] font-bold leading-[1.15] text-primary sm:text-4xl lg:text-5xl">
              Get a Free Carpet Cleaning Quote
            </h1>
            <p className={`${bodyText} mt-4 max-w-2xl lg:text-lg`}>
              Certified technicians. Carpet cleaning starts at $99. Tell us about your space, or call {PHONE_DISPLAY}.
            </p>
            <div className="mt-6 lg:hidden">
              <CallButton className={`${buttonOrange} w-full`} />
            </div>
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
              <div className="rounded-2xl border border-border bg-white p-5 shadow-sm lg:col-span-7">
                <QuoteForm id="contact-quote" heading="Request your quote" />
              </div>
              <aside className="flex flex-col gap-4 lg:col-span-5">
                <div className="rounded-2xl border border-border bg-[hsl(210,40%,98%)] p-5">
                  <h2 className="font-heading text-2xl font-bold text-primary">Call or email</h2>
                  <p className={`${bodyText} mt-2`}>Certified technicians. Carpet cleaning starts at $99.</p>
                  <div className="mt-4 hidden lg:block">
                    <CallButton className={`${buttonOrange} w-full`} />
                  </div>
                  <a href={`mailto:${EMAIL}`} className={`${linkClass} mt-4 inline-flex min-h-12 items-center`}>
                    {EMAIL}
                  </a>
                </div>
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
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(210,40%,98%)] px-4 py-16 lg:py-24" aria-labelledby="next-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="next-heading" className={sectionTitle}>
              What happens next
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>Three steps from the form or the call to the walkthrough.</p>
            <div className="mt-8">
              <Steps
                steps={[
                  {
                    title: "Request a quote",
                    body: `Call ${PHONE_DISPLAY} or send the form on this page. Tell us the service and the address.`,
                  },
                  {
                    title: "We confirm details and schedule",
                    body: "We review the rooms, size, and condition, then confirm a time.",
                  },
                  {
                    title: "Steam clean and walkthrough",
                    body: "Certified technicians clean the space and walk it with you.",
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="contact-faq-heading">
          <div className="mx-auto max-w-6xl">
            <h2 id="contact-faq-heading" className={sectionTitle}>
              Questions
            </h2>
            <p className={`${bodyText} mt-3 max-w-2xl`}>Price, service areas, and what to include with a quote.</p>
            <div className="mt-8">
              <FaqAccordion defaultOpen items={contactFaqs} />
            </div>
            <p className={`${bodyText} mt-6`}>
              Town lists are on the{" "}
              <Link to="/service-areas/" className={linkClass}>
                service areas
              </Link>{" "}
              page. Cleaning details are on the{" "}
              <Link to="/services/" className={linkClass}>
                services
              </Link>{" "}
              page.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileBar callOnly />
    </div>
  );
}
