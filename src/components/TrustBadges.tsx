import { ShieldCheck, Award, Leaf, Star, Clock, BadgeCheck } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Insured & Bonded" },
  { icon: BadgeCheck, label: "IICRC Certified" },
  { icon: Star, label: "5.0★ Rated" },
  { icon: Award, label: "BBB A+ Rating" },
  { icon: Leaf, label: "Eco-Friendly" },
  { icon: Clock, label: "Same-Day Service" },
];

const TrustBadges = () => {
  return (
    <section className="py-4 lg:py-6 px-3 lg:px-4 bg-background border-y border-border" data-testid="section-trust-badges">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col lg:flex-row items-center justify-center gap-1 lg:gap-2 px-1 py-2 lg:px-3 lg:py-3 rounded-lg bg-card border border-border text-center"
              data-testid={`badge-${b.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              <b.icon className="w-5 h-5 lg:w-5 lg:h-5 text-cta-orange flex-shrink-0" />
              <span className="text-[10px] lg:text-sm font-heading font-semibold text-foreground leading-tight">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
