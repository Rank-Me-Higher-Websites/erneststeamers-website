import { CheckCircle } from "lucide-react";
import equipment from "@/assets/equipment.png";
import vanCloseup from "@/assets/van-closeup.png";

const reasons = [
  "We utilize advanced, professional-grade equipment and innovative techniques to deliver a deep, thorough carpet clean.",
  "Our certified technicians are extensively trained and highly experienced in residential and commercial carpet cleaning.",
  "We deliver high-quality home maintenance services with precision, efficiency, and professional expertise.",
  "Every service is backed by our 100% satisfaction guarantee for quality and reliability you can trust.",
  "We provide steam cleaning, upholstery cleaning, area rug cleaning, tile and grout cleaning, and commercial carpet care throughout Chicagoland.",
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 px-4 bg-cta-orange">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Copy */}
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary-foreground mb-3">
              Searching for a Trusted Carpet Cleaning Service in Chicago, IL?
            </h2>
            <p className="text-primary-foreground/90 font-semibold text-base mb-6">
              Why Choose Ernest Steamers? Here Are Just a Few Reasons:
            </p>

            <div className="space-y-4 mb-6">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle className="w-6 h-6 text-primary-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-sm leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-6 py-3 rounded-lg text-base hover:brightness-110 transition-all"
            >
              Contact Us <span className="text-lg">→</span>
            </a>
          </div>

          {/* Right: Photos stacked */}
          <div className="grid grid-cols-1 gap-3">
            <img
              src={equipment}
              alt="Ernest Steamers professional equipment"
              className="rounded-xl border-4 border-primary-foreground/20 w-full h-52 md:h-64 object-cover"
            />
            <img
              src={vanCloseup}
              alt="Ernest Steamers van close-up"
              className="rounded-xl border-4 border-primary-foreground/20 w-full h-52 md:h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
