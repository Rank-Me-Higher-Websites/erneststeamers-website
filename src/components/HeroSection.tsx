import { Shield, Award, Leaf } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-hero min-h-[90vh] flex items-center">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-primary-foreground mb-6">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>

            <div className="w-16 h-1 bg-cta-orange mb-6" />

            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="badge-card rounded-lg px-5 py-3 flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Professional<br/>Services</span>
              </div>
              <div className="badge-card rounded-lg px-5 py-3 flex items-center gap-3">
                <Award className="w-6 h-6 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Proven<br/>Results</span>
              </div>
              <div className="badge-card rounded-lg px-5 py-3 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-sm">Eco-Friendly<br/>Cleaning</span>
              </div>
            </div>

            <a
              href="tel:+16308309867"
              className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-lg transition-all"
            >
              CALL NOW <span className="text-xl">→</span>
            </a>
          </div>

          {/* Right: VSL Video */}
          <div id="vsl" className="relative">
            <div className="aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-cta-orange flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="white" />
                  </svg>
                </div>
                <p className="text-primary-foreground/60 text-sm font-medium">Watch how we transform your space</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
