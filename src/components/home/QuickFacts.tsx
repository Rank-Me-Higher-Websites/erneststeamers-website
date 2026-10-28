import { BadgeCheck, CircleDollarSign, MapPin, Phone } from "lucide-react";
import { sectionTitle } from "@/components/home/ui";

const facts = [
  { icon: CircleDollarSign, label: "Starts at $99" },
  { icon: BadgeCheck, label: "Certified technicians" },
  { icon: MapPin, label: "Chicago & suburbs" },
  { icon: Phone, label: "Call or request a quote online" },
];

export default function QuickFacts() {
  return (
    <section className="bg-[hsl(174,42%,96%)] px-4 py-12 lg:py-16" aria-labelledby="quick-facts-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="quick-facts-heading" className={sectionTitle}>
          Quick facts
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.label} className="flex min-h-12 items-center gap-3 rounded-2xl bg-white px-4 py-4">
              <fact.icon className="h-6 w-6 shrink-0 text-[hsl(174,62%,26%)]" aria-hidden="true" />
              <p className="text-base font-semibold text-primary">{fact.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
