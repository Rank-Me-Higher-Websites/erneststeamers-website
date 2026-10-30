import QuoteFormDialog from "./QuoteFormDialog";
import { phoneTelHref } from "@/data/locations";

const HeroSection = () => {
  return (
    <section className="bg-hero lg:py-16">
      <div className="container max-w-7xl mx-auto px-3 sm:px-4">

        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-10 items-center">
          <div className="flex flex-col gap-5">
            <h1 className="font-heading font-bold text-[3.25rem] xl:text-[3.5rem] leading-[1.1] text-primary-foreground" data-testid="text-hero-title">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>
            <div className="w-16 h-1 bg-cta-orange" />
            <p className="text-primary-foreground/80 text-lg leading-snug max-w-xl" data-testid="text-hero-description">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>
            <p className="text-primary-foreground font-semibold text-lg" data-testid="text-hero-offer">
              Certified technicians. Carpet cleaning starts at $99.
            </p>
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
          </div>
        </div>

        <div className="flex flex-col lg:hidden py-4 gap-3">
          <p className="font-heading font-bold text-[1.65rem] sm:text-3xl leading-[1.1] text-primary-foreground">
            Expert Carpet Cleaning in Chicago &amp; Suburbs
          </p>

          <p className="text-primary-foreground/80 text-sm leading-snug">
            Top-quality carpet cleaning across Chicago and nearby suburbs — a deeper, longer-lasting clean.
          </p>

          <p className="text-primary-foreground font-semibold text-sm">
            Certified technicians. Carpet cleaning starts at $99.
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
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
