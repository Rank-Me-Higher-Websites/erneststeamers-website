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
    <section className="bg-hero h-[calc(100vh-3.5rem)] flex items-center py-4 lg:py-0">
      <div className="container max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
          {/* Left: Copy */}
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-[2.75rem] leading-[1.1] text-primary-foreground mb-3">
              Expert Carpet Cleaning in Chicago &amp; Suburbs
            </h1>

            <div className="w-14 h-1 bg-cta-orange mb-3" />

            <p className="text-primary-foreground/80 text-sm lg:text-base leading-relaxed mb-4 max-w-lg">
              Ernest Steamers delivers top-quality carpet cleaning services across Chicago and nearby suburbs, ensuring a deeper, longer-lasting clean.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge-card rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-[11px]">Professional<br/>Services</span>
              </div>
              <div className="badge-card rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Award className="w-4 h-4 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-[11px]">Proven<br/>Results</span>
              </div>
              <div className="badge-card rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-accent-yellow" />
                <span className="text-primary-foreground font-semibold text-[11px]">Eco-Friendly<br/>Cleaning</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+16308309867"
                className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-5 py-2.5 rounded-lg text-sm transition-all"
              >
                CALL NOW <span className="text-base">→</span>
              </a>
              <QuoteFormDialog>
                <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-5 py-2.5 rounded-lg text-sm transition-all">
                  GET A QUOTE
                </button>
              </QuoteFormDialog>
            </div>
          </div>

          {/* Right: VSL Video + Stats below */}
          <div id="vsl" className="flex flex-col gap-3">
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary-foreground/10 bg-hero-dark shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <div className="w-14 h-14 rounded-full bg-cta-orange flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M8 5v14l11-7L8 5z" fill="white" />
                  </svg>
                </div>
                <p className="text-primary-foreground/60 text-[11px] font-medium">Watch how we transform your space</p>
              </div>
            </div>

            {/* Stats row below VSL */}
            <div className="grid grid-cols-4 gap-2">
              {stats.map((stat) => (
                <div key={stat.label} className="badge-card rounded-lg py-1.5 px-1 text-center">
                  <div className="font-heading font-bold text-sm text-accent-yellow">{stat.value}</div>
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
