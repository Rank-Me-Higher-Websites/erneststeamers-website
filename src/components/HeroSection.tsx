import { Shield, Award, Leaf } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Satisfaction" },
  { value: "24hr", label: "Response Time" },
];

const HeroSection = () => {
  return (
    <section className="bg-hero flex items-center py-6 md:py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Copy */}
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-primary-foreground mb-4">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>

            <div className="w-16 h-1 bg-cta-orange mb-4" />

            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="badge-card rounded-lg px-4 py-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-xs">Professional<br/>Services</span>
              </div>
              <div className="badge-card rounded-lg px-4 py-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-xs">Proven<br/>Results</span>
              </div>
              <div className="badge-card rounded-lg px-4 py-2 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-xs">Eco-Friendly<br/>Cleaning</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+16308309867"
                className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-6 py-3 rounded-lg text-base transition-all"
              >
                CALL NOW <span className="text-lg">→</span>
              </a>
              <QuoteFormDialog>
                <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-6 py-3 rounded-lg text-base transition-all">
                  GET A QUOTE
                </button>
              </QuoteFormDialog>
            </div>
          </div>

          {/* Right: VSL Video + Stats below */}
          <div id="vsl" className="flex flex-col gap-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-cta-orange flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="white" />
                  </svg>
                </div>
                <p className="text-primary-foreground/60 text-xs font-medium">Watch how we transform your space</p>
              </div>
            </div>

            {/* Stats row below VSL */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="badge-card rounded-lg py-2 px-1 text-center">
                  <div className="font-heading font-bold text-sm md:text-base text-accent-yellow">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-[10px]">{stat.label}</div>
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
