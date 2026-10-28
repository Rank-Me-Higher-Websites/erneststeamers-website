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

export default function AreaChips({ items, id }: { items: AreaChip[]; id?: string }) {
  return (
    <ul id={id} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.label} hidden={item.hidden || undefined}>
          {item.href ? (
            <Link to={item.href} className={`${chipClass} ${focusRing}`}>
              {item.label}
            </Link>
          ) : (
            <span className={chipClass}>{item.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
