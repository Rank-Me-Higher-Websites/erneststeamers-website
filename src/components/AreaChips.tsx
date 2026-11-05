import { Link } from "react-router-dom";
import { focusRing } from "@/components/home/ui";

export type AreaChip = {
  label: string;
  /** Omit when the town has no page of its own. */
  href?: string;
  hidden?: boolean;
};

const chipClass =
  "inline-flex min-h-12 items-center rounded-full border border-border bg-white px-4 text-base font-semibold text-primary";

export default function AreaChips({
  items,
  id,
  onSelect,
}: {
  items: AreaChip[];
  id?: string;
  /** When set, a town without its own page becomes a button that chooses it. */
  onSelect?: (label: string) => void;
}) {
  return (
    <ul id={id} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.label} hidden={item.hidden || undefined}>
          {item.href ? (
            <Link to={item.href} className={`${chipClass} ${focusRing}`}>
              {item.label}
            </Link>
          ) : onSelect ? (
            <button
              type="button"
              className={`${chipClass} ${focusRing}`}
              onClick={() => onSelect(item.label)}
              aria-label={`Use ${item.label} in the quote`}
            >
              {item.label}
            </button>
          ) : (
            <span className={chipClass}>{item.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
