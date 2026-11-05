import { ArrowUpRight } from "lucide-react";
import { SISTER_COMPANY, WINDOWS_FRANCHISE_URL } from "@/data/locations";
import { focusRing } from "@/components/home/ui";

const externalProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const windowsButtonClass = `inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border-2 border-foreground px-3.5 font-heading text-sm font-bold text-foreground transition hover:bg-foreground hover:text-white ${focusRing}`;

const headerFranchiseClass = `inline-flex min-h-11 shrink-0 items-center gap-1 rounded-full px-2 font-heading text-sm font-bold text-foreground underline-offset-4 transition hover:underline ${focusRing}`;

const footerFranchiseClass =
  "inline-flex min-h-8 items-center gap-1 text-xs text-accent transition-colors hover:text-primary-foreground lg:text-sm";

/** Outlined header control for the sister company, plus the public franchise link. */
export function HeaderSisterCompanyBar() {
  return (
    <div data-testid="header-sister-links" className="border-t border-foreground/15">
      <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-1.5 sm:justify-between">
        <p className="hidden text-sm font-semibold text-foreground sm:block">Sister company</p>
        <div className="flex flex-wrap items-center justify-center gap-1 sm:justify-end sm:gap-2">
          <a
            href={SISTER_COMPANY.url}
            {...externalProps}
            aria-label={`${SISTER_COMPANY.name} (opens in a new tab)`}
            data-testid="header-ernest-windows-link"
            className={windowsButtonClass}
          >
            {SISTER_COMPANY.name}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={WINDOWS_FRANCHISE_URL}
            {...externalProps}
            aria-label="Ernest Windows franchise (opens in a new tab)"
            data-testid="header-franchise-link"
            className={headerFranchiseClass}
          >
            Franchise
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Compact footer entry. The sister-company link keeps its existing same-tab behavior. */
export function SisterCompanyFooterLinks() {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 lg:mt-3">
      <a
        href={SISTER_COMPANY.url}
        className="text-xs text-accent transition-colors hover:text-primary-foreground lg:text-sm"
        rel="noopener noreferrer"
      >
        {`Sister company: ${SISTER_COMPANY.name}`}
      </a>
      <a
        href={WINDOWS_FRANCHISE_URL}
        {...externalProps}
        aria-label="Ernest Windows franchise (opens in a new tab)"
        data-testid="footer-franchise-link"
        className={`${footerFranchiseClass} ${focusRing}`}
      >
        Franchise
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
