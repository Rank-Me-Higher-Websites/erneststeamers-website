import CallButton from "@/components/CallButton";
import QuoteForm from "@/components/QuoteForm";
import { bodyText, buttonOutline, sectionTitle } from "@/components/home/ui";
import { PHONE_DISPLAY } from "@/data/locations";

export default function HomeFinalCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white px-4 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className={sectionTitle}>Request your cleaning</h2>
          <p className={`${bodyText} mt-4 max-w-xl`}>
            Send your service, address and preferred date. Our technicians will confirm the price and scheduling with you. You can also call {PHONE_DISPLAY}.
          </p>
          <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div id="hero-quote" className="scroll-mt-24"><QuoteForm id="contact-quote" compact /></div>
        </div>
      </div>
    </section>
  );
}
