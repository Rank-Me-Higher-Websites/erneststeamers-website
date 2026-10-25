import { Link } from "react-router-dom";
import cleaningAction from "@/assets/cleaning-action.png";
import vanHouse from "@/assets/van-house.png";

const AboutSection = () => {
  return (
    <section className="py-6 lg:py-12 px-3 lg:px-4 bg-primary">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          <div className="grid grid-cols-2 gap-2 lg:gap-3">
            <img
              src={cleaningAction}
              alt="Ernest Steamers technician cleaning carpet"
              className="rounded-lg lg:rounded-xl border-2 border-primary-foreground/10 w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover shadow-xl"
            />
            <img
              src={vanHouse}
              alt="Ernest Steamers van at customer home"
              className="rounded-lg lg:rounded-xl border-2 border-primary-foreground/10 w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover shadow-xl"
            />
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl lg:text-4xl text-primary-foreground mb-1.5 lg:mb-2">
              Need a Reliable{" "}
              <span className="text-accent-yellow">Carpet Cleaning in Chicago?</span>
            </h2>
            <div className="w-12 lg:w-16 h-0.5 lg:h-1 bg-cta-orange my-2 lg:my-4" />

            <p className="text-primary-foreground/80 text-xs lg:text-sm leading-relaxed mb-2 lg:mb-3">
              Ernest Steamers provides professional carpet cleaning in Chicago and surrounding suburbs. We specialize in residential and commercial carpet cleaning, upholstery cleaning, area rug cleaning, tile and grout cleaning, and stain removal.
            </p>
            <p className="text-primary-foreground/80 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-6">
              Our certified technicians use industry-grade equipment to deliver deep, effective cleaning that extends the life of your carpets and flooring.
            </p>

            <Link
              to="/about/"
              className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base transition-all"
            >
              Read More <span className="text-base lg:text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
