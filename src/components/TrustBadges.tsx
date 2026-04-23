import { ShieldCheck, Award, Leaf, Star, Clock, BadgeCheck, Sparkles, ThumbsUp } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Insured & Bonded" },
  { icon: BadgeCheck, label: "IICRC Certified" },
  { icon: Star, label: "5.0★ Rated" },
  { icon: Award, label: "BBB A+ Rating" },
  { icon: Leaf, label: "Eco-Friendly" },
  { icon: Clock, label: "Same-Day Service" },
  { icon: Sparkles, label: "Pet & Kid Safe" },
  { icon: ThumbsUp, label: "100% Satisfaction" },
];

const TrustBadges = () => {
  const loop = [...badges, ...badges, ...badges];
  return (
    <section
      className="py-1.5 lg:py-4 bg-background border-y border-border overflow-hidden relative"
      data-testid="section-trust-badges"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 hidden lg:block"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 hidden lg:block"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
      />

      <div className="relative w-full">
        <div className="flex items-center gap-1.5 lg:gap-3 animate-marquee whitespace-nowrap w-max">
          {loop.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 lg:gap-3 flex-shrink-0">
              <div
                className="flex items-center gap-1.5 lg:gap-2 px-2 py-1 lg:px-4 lg:py-2 rounded-full bg-primary border border-accent-yellow/40 shadow-sm flex-shrink-0"
                data-testid={`badge-${i}`}
              >
                <span className="flex items-center justify-center w-4 h-4 lg:w-6 lg:h-6 rounded-full bg-accent-yellow/20 flex-shrink-0">
                  <b.icon className="w-2.5 h-2.5 lg:w-3.5 lg:h-3.5 text-accent-yellow" />
                </span>
                <span className="text-[11px] lg:text-sm font-heading font-semibold text-accent-yellow">
                  {b.label}
                </span>
              </div>
              <span className="text-accent-yellow text-sm lg:text-lg flex-shrink-0">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
