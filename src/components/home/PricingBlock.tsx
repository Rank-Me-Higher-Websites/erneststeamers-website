import CallButton from "@/components/CallButton";
import { buttonOrange, focusRing } from "@/components/home/ui";

export default function PricingBlock() {
  return (
    <section className="bg-white px-4 pb-16 lg:pb-24" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-primary px-6 py-10 text-primary-foreground lg:px-12 lg:py-14">
          <p className="text-base font-semibold text-[hsl(174,45%,78%)]">Carpet cleaning</p>
          <h2 id="pricing-heading" className="mt-2 font-heading text-3xl font-bold leading-tight lg:text-4xl">
            Carpet cleaning starts at $99
          </h2>
          <p className="mt-4 font-heading text-6xl font-bold">$99</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground">
            Price depends on rooms, size and condition — get an exact quote.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#hero-quote" className={`${buttonOrange} w-full sm:w-auto`}>
              Get an exact quote
            </a>
            <CallButton
              className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-white bg-white px-5 text-base font-heading font-bold text-primary sm:w-auto ${focusRing}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
