import { Shield, Award, Leaf, Star } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";
import { phoneTelHref } from "@/data/locations";

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
    <section className="bg-hero lg:py-16">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4">

        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-10 items-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-3">
              {ratingBadges.map((badge) => (
                <div key={badge.platform} className="flex items-center gap-1.5" data-testid={`badge-${badge.platform.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">{badge.platform.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-primary-foreground font-semibold text-sm leading-tight">{badge.platform}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-accent-yellow font-bold text-sm">{badge.score}</span>
                      <div className="flex gap-px">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h1 className="font-heading font-bold text-[3.25rem] xl:text-[3.5rem] leading-[1.1] text-primary-foreground" data-testid="text-hero-title">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>
            <div className="w-16 h-1 bg-cta-orange" />
            <p className="text-primary-foreground/80 text-lg leading-snug max-w-xl" data-testid="text-hero-description">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="badge-card rounded-lg px-3 py-2 flex items-center gap-1.5">
                <Shield className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Professional</span>
              </div>
              <div className="badge-card rounded-lg px-3 py-2 flex items-center gap-1.5">
                <Award className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Proven Results</span>
              </div>
              <div className="badge-card rounded-lg px-3 py-2 flex items-center gap-1.5">
                <Leaf className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Eco-Friendly</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a href={phoneTelHref()} className="inline-flex items-center gap-1.5 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-7 py-3.5 rounded-lg text-lg transition-all" data-testid="link-call-now">
                CALL NOW <span className="text-lg">→</span>
              </a>
              <QuoteFormDialog>
                <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-7 py-3.5 rounded-lg text-lg transition-all" data-testid="button-get-quote">
                  GET A QUOTE
                </button>
              </QuoteFormDialog>
            </div>
          </div>

          <div id="vsl" className="flex flex-col gap-3">
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
                <div key={stat.label} className="badge-card rounded-lg py-3 px-2 text-center" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                  <div className="font-heading font-bold text-xl text-accent-yellow">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-[11px]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:hidden py-4 gap-3">
          <div className="flex flex-wrap gap-2">
            {ratingBadges.map((badge) => (
              <div key={badge.platform} className="badge-card rounded-full px-3 py-1.5 flex items-center gap-1.5">
                <span className="text-primary-foreground font-semibold text-[11px]">{badge.platform}</span>
                <span className="text-accent-yellow font-bold text-[11px]">{badge.score}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="font-heading font-bold text-[1.65rem] sm:text-3xl leading-[1.1] text-primary-foreground">
            Expert Carpet Cleaning in Chicago &amp; Suburbs
          </p>

          <p className="text-primary-foreground/80 text-sm leading-snug">
            Top-quality carpet cleaning across Chicago and nearby suburbs — a deeper, longer-lasting clean.
          </p>

          <div className="flex gap-2.5">
            <a href={phoneTelHref()} className="inline-flex items-center justify-center gap-1.5 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold py-3 rounded-xl text-sm transition-all flex-1" data-testid="link-call-now-mobile">
              CALL NOW →
            </a>
            <QuoteFormDialog>
              <button className="btn-flash-yellow text-accent-foreground font-heading font-bold py-3 rounded-xl text-sm transition-all flex-1" data-testid="button-get-quote-mobile">
                GET A QUOTE
              </button>
            </QuoteFormDialog>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-xl">
            <iframe
              src="https://iframe.mediadelivery.net/embed/619469/fdc92897-83b6-4c5a-884d-5423d5c9910c?autoplay=true&muted=true&preload=true&loop=true"
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {stats.map((stat) => (
              <div key={stat.label} className="badge-card rounded-lg py-2 px-1 text-center">
                <div className="font-heading font-bold text-sm text-accent-yellow">{stat.value}</div>
                <div className="text-primary-foreground/60 text-[8px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
