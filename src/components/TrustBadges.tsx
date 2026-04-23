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
  const loop = [...badges, ...badges];
  return (
    <section className="py-3 lg:py-4 bg-background border-y border-border overflow-hidden" data-testid="section-trust-badges">
      <div className="relative w-full">
        <div className="flex gap-2 lg:gap-3 animate-marquee whitespace-nowrap w-max">
          {loop.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 lg:gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-md bg-white border border-gray-300 flex-shrink-0"
              data-testid={`badge-${i}`}
            >
              <b.icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-black flex-shrink-0" />
              <span className="text-xs lg:text-sm font-heading font-semibold text-black">
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
