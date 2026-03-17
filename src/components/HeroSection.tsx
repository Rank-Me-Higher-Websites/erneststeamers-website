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
    <section className="bg-hero min-h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-3.5rem)] flex items-center">
      <div className="container max-w-7xl mx-auto px-4 h-full">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-10 items-center lg:items-stretch w-full h-full py-3 lg:py-0">
          {/* Left: Copy */}
          <div className="lg:flex lg:flex-col lg:justify-between lg:h-full lg:py-5">
            <div>
              {/* Rating trust badges */}
              <div className="flex flex-wrap gap-4 mb-4">
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

              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.08] text-primary-foreground mb-4">
                Expert Carpet Cleaning in Chicago &amp; Suburbs
              </h1>

              <div className="w-16 h-1 bg-cta-orange mb-4" />

              <p className="text-primary-foreground/80 text-base lg:text-lg xl:text-xl leading-relaxed mb-5 max-w-xl">
                Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
              </p>

              <div className="flex flex-wrap gap-3 mb-5 lg:mb-0">
                <div className="badge-card rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                  <Shield className="w-6 h-6 text-accent-yellow" />
                  <span className="text-primary-foreground font-semibold text-sm">
                    Professional
                    <br />
                    Services
                  </span>
                </div>
                <div className="badge-card rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                  <Award className="w-6 h-6 text-accent-yellow" />
                  <span className="text-primary-foreground font-semibold text-sm">
                    Proven
                    <br />
                    Results
                  </span>
                </div>
                <div className="badge-card rounded-lg px-4 py-2.5 flex items-center gap-2.5">
                  <Leaf className="w-6 h-6 text-accent-yellow" />
                  <span className="text-primary-foreground font-semibold text-sm">
                    Eco-Friendly
                    <br />
                    Cleaning
                  </span>
                </div>
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
          <div id="vsl" className="flex flex-col gap-4 lg:justify-between lg:h-full lg:py-5">
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-cta-orange flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
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
                  <div className="font-heading font-bold text-base lg:text-xl text-accent-yellow">{stat.value}</div>
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
