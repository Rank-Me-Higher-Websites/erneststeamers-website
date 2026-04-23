import { Phone } from "lucide-react";
import QuoteFormDialog from "@/components/QuoteFormDialog";

const StickyMobileBar = () => {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-primary-foreground/10 shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      data-testid="bar-sticky-mobile"
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href="tel:+16308309867"
          className="flex items-center justify-center gap-1.5 bg-cta-orange text-primary-foreground font-heading font-bold px-3 py-3 rounded-lg text-sm"
          data-testid="button-mobile-call"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <QuoteFormDialog>
          <button
            className="w-full flex items-center justify-center gap-1.5 btn-flash-yellow text-accent-foreground font-heading font-bold px-3 py-3 rounded-lg text-sm"
            data-testid="button-mobile-quote"
          >
            Get A Quote
          </button>
        </QuoteFormDialog>
      </div>
    </div>
  );
};

export default StickyMobileBar;
