import CallButton from "@/components/CallButton";
import QuoteForm from "@/components/QuoteForm";
import { bodyText, buttonOutline } from "@/components/home/ui";

type InlineQuoteCtaProps = {
  id: string;
  defaultService?: string;
};

export default function InlineQuoteCta({ id, defaultService }: InlineQuoteCtaProps) {
  return (
    <aside aria-label="Request a quote" className="my-10 rounded-2xl border border-border bg-[hsl(216,40%,97%)] p-5">
      <h2 className="font-heading text-2xl font-bold text-primary">Ready for a professional clean?</h2>
      <p className={`${bodyText} mt-2`}>Carpet cleaning starts at $99. Call 630-830-9867 or send a quote request.</p>
      <CallButton className={`${buttonOutline} mt-4 w-full sm:w-auto`} />
      <div className="mt-5 rounded-2xl border border-border bg-white p-4">
        <QuoteForm id={id} compact defaultService={defaultService} />
      </div>
    </aside>
  );
}
