import { Shield, Award, Leaf, Star } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Satisfaction" },
  { value: "24hr", label: "Response Time" },
];

const ratingBadges = [
  { platform: "Google Rating", score: "5.0" },
  { platform: "Facebook Rating", score: "5.0" },
  { platform: "BBB A+ Rating", score: "5.0" },
];

const HeroSection = () => {
  return (
    <section className="bg-hero h-[calc(100vh-3.5rem)] flex items-center">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-center w-full">
          {/* Left: Copy */}
          <div className="space-y-5">
            {/* Rating trust badges */}
            <div className="flex flex-wrap gap-5">
              {ratingBadges.map((badge) => (
                <div key={badge.platform} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">{badge.platform.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-sm leading-tight">{badge.platform}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-accent-yellow font-bold text-sm">{badge.score}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-[2.8rem] xl:text-5xl leading-[1.08] text-primary-foreground">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>

            <div className="w-16 h-1 bg-cta-orange" />

            <p className="text-primary-foreground/80 text-base lg:text-lg leading-relaxed max-w-xl">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="badge-card rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Professional<br />Services</span>
              </div>
              <div className="badge-card rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                <Award className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Proven<br />Results</span>
              </div>
              <div className="badge-card rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                <Leaf className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Eco-Friendly<br />Cleaning</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+16308309867"
                className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-7 py-3.5 rounded-lg text-lg transition-all"
              >
                CALL NOW <span className="text-xl">→</span>
              </a>
              <QuoteFormDialog>
                <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-7 py-3.5 rounded-lg text-lg transition-all">
                  GET A QUOTE
                </button>
              </QuoteFormDialog>
            </div>
          </div>

          {/* Right: VSL Video + Stats below */}
          <div id="vsl" className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-cta-orange flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="white" />
                  </svg>
                </div>
                <p className="text-primary-foreground/60 text-sm font-medium">Watch how we transform your space</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="badge-card rounded-lg py-3 px-2 text-center">
                  <div className="font-heading font-bold text-lg lg:text-xl text-accent-yellow">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
