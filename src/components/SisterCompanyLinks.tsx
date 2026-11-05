import { ArrowUpRight } from "lucide-react";
import { SISTER_COMPANY, WINDOWS_FRANCHISE_URL } from "@/data/locations";
import { focusRing } from "@/components/home/ui";

const footerFranchiseClass =
  "inline-flex min-h-8 items-center gap-1 text-xs text-accent transition-colors hover:text-primary-foreground lg:text-sm";

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
        target="_blank"
        rel="noopener noreferrer"
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
