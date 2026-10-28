import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { PHONE_DISPLAY, phoneTelHref } from "@/data/locations";
import { buttonOrange, focusRing } from "@/components/home/ui";

type StickyMobileBarProps = {
  /** When set, "Get a quote" scrolls to this element instead of opening the dialog. */
  scrollTo?: string;
  /** The quote form is already on the page, so the bar only offers a call. */
  callOnly?: boolean;
};

const quoteClass = `min-h-12 w-full rounded-lg bg-primary px-3 text-left text-base font-heading font-bold leading-tight text-primary-foreground ${focusRing}`;

export default function StickyMobileBar({ scrollTo, callOnly = false }: StickyMobileBarProps) {
  const [visible, setVisible] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const isField = (node: EventTarget | null) =>
      node instanceof HTMLElement && node.matches("input, textarea, select");

    const onFocusIn = (event: FocusEvent) => {
      if (isField(event.target)) setKeyboardOpen(true);
    };
    const onFocusOut = () => {
      window.requestAnimationFrame(() => {
        if (!isField(document.activeElement)) setKeyboardOpen(false);
      });
    };
    const viewport = window.visualViewport;
    const onResize = () => {
      if (!viewport) return;
      setKeyboardOpen(window.innerHeight - viewport.height > 150);
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    viewport?.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      viewport?.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollToForm = () => {
    if (!scrollTo) return;
    const target = document.getElementById(scrollTo);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    target?.querySelector<HTMLElement>("input[name='name']")?.focus();
  };

  const quoteLabel = "Starts at $99 · Get a quote";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white shadow-[0_-8px_24px_rgba(14,42,71,0.12)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      hidden={!visible || keyboardOpen}
      data-testid="bar-sticky-mobile"
    >
      <div className={callOnly ? "p-2" : "grid grid-cols-[minmax(0,1fr)_auto] items-stretch gap-2 p-2"}>
        {callOnly ? null : scrollTo ? (
          <button type="button" className={quoteClass} onClick={scrollToForm}>
            {quoteLabel}
          </button>
        ) : (
          <QuoteFormDialog>
            <button type="button" className={quoteClass}>
              {quoteLabel}
            </button>
          </QuoteFormDialog>
        )}
        <a
          href={phoneTelHref()}
          aria-label={`Call ${PHONE_DISPLAY}`}
          className={callOnly ? `${buttonOrange} w-full` : `${buttonOrange} min-w-12 px-4`}
          data-testid="button-mobile-call"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          {callOnly ? `Call ${PHONE_DISPLAY}` : "Call"}
        </a>
      </div>
    </div>
  );
}
