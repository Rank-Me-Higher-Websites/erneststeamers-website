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
    <section className="bg-hero py-6 lg:py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5 lg:gap-10 items-start">
          <div className="space-y-4 order-2 lg:order-1">
            <div className="flex flex-wrap gap-3 lg:gap-4">
              {ratingBadges.map((badge) => (
                <div key={badge.platform} className="flex items-center gap-2" data-testid={`badge-${badge.platform.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">{badge.platform.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-xs lg:text-sm leading-tight">{badge.platform}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-accent-yellow font-bold text-xs lg:text-sm">{badge.score}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h1 className="font-heading font-bold text-2xl md:text-4xl lg:text-5xl leading-[1.08] text-primary-foreground" data-testid="text-hero-title">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>

            <div className="w-16 h-1 bg-cta-orange" />

            <p className="text-primary-foreground/80 text-sm lg:text-lg leading-relaxed max-w-xl" data-testid="text-hero-description">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>

            <div className="flex flex-wrap gap-2">
              <div className="badge-card rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 flex items-center gap-2">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-xs lg:text-sm">Professional<br />Services</span>
              </div>
              <div className="badge-card rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 flex items-center gap-2">
                <Award className="w-4 h-4 lg:w-5 lg:h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-xs lg:text-sm">Proven<br />Results</span>
              </div>
              <div className="badge-card rounded-lg px-2.5 py-1.5 lg:px-3 lg:py-2 flex items-center gap-2">
                <Leaf className="w-4 h-4 lg:w-5 lg:h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-xs lg:text-sm">Eco-Friendly<br />Cleaning</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="tel:+16308309867"
                className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-lg transition-all"
                data-testid="link-call-now"
              >
                CALL NOW <span className="text-lg">→</span>
              </a>
              <QuoteFormDialog>
                <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-5 py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-lg transition-all" data-testid="button-get-quote">
                  GET A QUOTE
                </button>
              </QuoteFormDialog>
            </div>
          </div>

          <div id="vsl" className="space-y-3 order-1 lg:order-2">
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl" data-testid="video-vsl">
              <iframe
                src="https://iframe.mediadelivery.net/embed/619469/fdc92897-83b6-4c5a-884d-5423d5c9910c?autoplay=true&muted=true&preload=true&loop=true"
                loading="lazy"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="badge-card rounded-lg py-2 px-1.5 lg:py-2.5 lg:px-2 text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="font-heading font-bold text-sm lg:text-xl text-accent-yellow">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-[10px] lg:text-[11px]">{stat.label}</div>
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
