import CallButton from "@/components/CallButton";
import QuoteForm from "@/components/QuoteForm";
import { bodyText, buttonOutline, sectionTitle } from "@/components/home/ui";
import { PHONE_DISPLAY } from "@/data/locations";

export default function HomeFinalCta() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white px-4 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2">
        <div>
          <h2 className={sectionTitle}>Ready for cleaner carpets?</h2>
          <p className={`${bodyText} mt-4 max-w-xl`}>
            Call {PHONE_DISPLAY} or send the form. Carpet cleaning starts at $99. Certified technicians do the work.
          </p>
          <CallButton className={`${buttonOutline} mt-6 w-full sm:w-auto`} />
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
          <QuoteForm id="contact-quote" />
        </div>
      </div>
    </section>
  );
}
