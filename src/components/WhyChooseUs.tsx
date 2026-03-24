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
    <section className="py-6 lg:py-12 px-3 lg:px-4 bg-cta-orange">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-start">
          <div>
            <h2 className="font-heading font-bold text-xl lg:text-4xl text-primary-foreground mb-1.5 lg:mb-3">
              Searching for a Trusted Carpet Cleaning Service in Chicago, IL?
            </h2>
            <p className="text-primary-foreground/90 font-semibold text-sm lg:text-base mb-3 lg:mb-6">
              Why Choose Ernest Steamers? Here Are Just a Few Reasons:
            </p>

            <div className="space-y-2 lg:space-y-4 mb-3 lg:mb-6">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-2 lg:gap-3 items-start">
                  <CheckCircle className="w-4 h-4 lg:w-6 lg:h-6 text-primary-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-foreground text-xs lg:text-sm leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-heading font-bold px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base hover:brightness-110 transition-all"
            >
              Contact Us <span className="text-base lg:text-lg">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
            <img
              src={equipment}
              alt="Ernest Steamers professional equipment"
              className="rounded-lg lg:rounded-xl border-2 lg:border-4 border-primary-foreground/20 w-full h-32 sm:h-40 lg:h-64 object-cover"
            />
            <img
              src={vanCloseup}
              alt="Ernest Steamers van close-up"
              className="rounded-lg lg:rounded-xl border-2 lg:border-4 border-primary-foreground/20 w-full h-32 sm:h-40 lg:h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
