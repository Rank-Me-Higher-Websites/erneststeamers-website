import { Shield, Award, Leaf, Star } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "4.9★", label: "Rating" },
  { value: "100%", label: "Satisfaction" },
  { value: "24hr", label: "Response" },
];

const ratingBadges = [
  { platform: "Google", score: "5.0" },
  { platform: "Facebook", score: "5.0" },
  { platform: "BBB A+", score: "5.0" },
];

const HeroSection = () => {
  return (
    <section className="bg-hero py-4 sm:py-6 lg:py-10">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-3 sm:gap-5 lg:gap-10 items-center">

          <div className="flex flex-col gap-2 sm:gap-3 lg:gap-5 order-2 lg:order-1">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {ratingBadges.map((badge) => (
                <div key={badge.platform} className="flex items-center gap-1 sm:gap-1.5" data-testid={`badge-${badge.platform.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-[9px] sm:text-[10px] lg:text-xs">{badge.platform.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-[9px] sm:text-[10px] lg:text-sm leading-tight">{badge.platform}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-accent-yellow font-bold text-[9px] sm:text-[10px] lg:text-sm">{badge.score}</span>
                      <div className="flex gap-px">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h1 className="font-heading font-bold text-xl sm:text-2xl md:text-4xl lg:text-[3.25rem] xl:text-[3.5rem] leading-[1.1] text-primary-foreground" data-testid="text-hero-title">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>

            <div className="w-10 sm:w-14 lg:w-16 h-0.5 sm:h-1 bg-cta-orange" />

            <p className="text-primary-foreground/80 text-xs sm:text-sm lg:text-lg leading-snug max-w-xl" data-testid="text-hero-description">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <div className="badge-card rounded-md sm:rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-[10px] sm:text-xs lg:text-sm">Professional</span>
              </div>
              <div className="badge-card rounded-md sm:rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-[10px] sm:text-xs lg:text-sm">Proven Results</span>
              </div>
              <div className="badge-card rounded-md sm:rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 lg:px-3 lg:py-2 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-[10px] sm:text-xs lg:text-sm">Eco-Friendly</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="tel:+16308309867"
                className="inline-flex items-center gap-1.5 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-4 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 rounded-lg text-xs sm:text-sm lg:text-lg transition-all"
                data-testid="link-call-now"
              >
                CALL NOW <span className="text-sm sm:text-lg">→</span>
              </a>
              <QuoteFormDialog>
                <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-4 py-2 sm:px-5 sm:py-2.5 lg:px-7 lg:py-3.5 rounded-lg text-xs sm:text-sm lg:text-lg transition-all" data-testid="button-get-quote">
                  GET A QUOTE
                </button>
              </QuoteFormDialog>
            </div>
          </div>

          <div id="vsl" className="flex flex-col gap-1.5 sm:gap-2 lg:gap-3 order-1 lg:order-2">
            <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl" data-testid="video-vsl">
              <iframe
                src="https://iframe.mediadelivery.net/embed/619469/fdc92897-83b6-4c5a-884d-5423d5c9910c?autoplay=true&muted=true&preload=true&loop=true"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            <div className="grid grid-cols-4 gap-1 sm:gap-1.5 lg:gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="badge-card rounded-md sm:rounded-lg py-1 px-1 sm:py-1.5 sm:px-1.5 lg:py-3 lg:px-2 text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="font-heading font-bold text-[11px] sm:text-sm lg:text-xl text-accent-yellow">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-[7px] sm:text-[9px] lg:text-[11px]">{stat.label}</div>
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
