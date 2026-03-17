import { CheckCircle } from "lucide-react";

const reasons = [
  "We utilize advanced, professional-grade equipment and innovative techniques to deliver a deep, thorough carpet clean.",
  "Our certified technicians in Bartlett, IL are extensively trained and highly experienced in residential and commercial carpet cleaning.",
  "We deliver high-quality home maintenance services with precision, efficiency, and professional expertise.",
  "Every service is backed by our 100% satisfaction guarantee for quality and reliability you can trust.",
  "Based in Bartlett, IL, we provide steam cleaning, upholstery cleaning, area rug cleaning, tile and grout cleaning, and commercial carpet care to cover all your cleaning needs throughout Chicagoland.",
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-cta-orange">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Copy */}
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-4">
              Searching for a Trusted Carpet Cleaning Service in Chicago, IL?
            </h2>
            <p className="text-primary-foreground/90 font-semibold text-lg mb-10">
              Why Choose Ernest Steamers? Here Are Just a Few Reasons:
            </p>

            <div className="space-y-6 mb-10">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <CheckCircle className="w-8 h-8 text-primary-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-base leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-lg hover:brightness-110 transition-all"
            >
              Contact Us <span className="text-xl">→</span>
            </a>
          </div>

          {/* Right: Photo placeholder */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-xl border-4 border-primary-foreground/20 bg-primary-foreground/10 flex items-center justify-center">
              <p className="text-primary-foreground/50 font-medium text-sm">Photo placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
