import { Link } from "react-router-dom";
import { focusRing } from "@/components/home/ui";

export type AreaChip = {
  label: string;
  href: string;
};

export default function AreaChips({ items }: { items: AreaChip[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.label}>
          <Link
            to={item.href}
            className={`inline-flex min-h-12 items-center rounded-full border border-border bg-white px-4 text-base font-semibold text-primary ${focusRing}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
