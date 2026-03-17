import cleaningAction from "@/assets/cleaning-action.png";
import vanHouse from "@/assets/van-house.png";
import { CheckCircle, Leaf, ShieldCheck, Users } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "500+" },
  { label: "Years of Experience", value: "10+" },
  { label: "Happy Customers", value: "400+" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-4 bg-primary">
      <div className="container max-w-7xl mx-auto space-y-16">

        {/* Top: Photos + Intro */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-3">
            <img
              src={cleaningAction}
              alt="Ernest Steamers technician cleaning carpet"
              className="rounded-xl border-2 border-primary-foreground/10 w-full h-48 md:h-64 object-cover shadow-xl"
            />
            <img
              src={vanHouse}
              alt="Ernest Steamers van at customer home"
              className="rounded-xl border-2 border-primary-foreground/10 w-full h-48 md:h-64 object-cover shadow-xl"
            />
          </div>

          <div>
            <h2 className="font-heading font-bold text-2xl md:text-4xl text-primary-foreground mb-2">
              About Carpet Cleaning Experts{" "}
              <span className="text-accent-yellow">You Can Trust</span>
            </h2>
            <div className="w-16 h-1 bg-cta-orange my-4" />

            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-3">
              Ernest Steamers provides safe, high-quality carpet cleaning for homes and businesses across Chicago. Built on integrity and professionalism, we've earned a trusted reputation through consistent results and client satisfaction.
            </p>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-3">
              We go beyond surface-level clean — using non-toxic, residue-free products and advanced steam technology for deep, lasting results that are safe for kids, pets, and the planet.
            </p>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              From residential carpets to commercial floors, tile, upholstery, and pet stain removal, every job is handled with expert care and top-tier equipment. Our eco-friendly solutions are trusted throughout the Chicagoland area.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border-2 border-primary-foreground/10 bg-primary-foreground/5 p-5 text-center"
            >
              <p className="font-heading font-bold text-2xl md:text-3xl text-accent">{stat.value}</p>
              <p className="text-primary-foreground/70 text-xs md:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Vision & Goal */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border-2 border-primary-foreground/10 bg-primary-foreground/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-foreground">Our Vision</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              At Ernest Steamers, our vision is to transform the way Chicago experiences carpet cleaning. We aim to lead the industry with a commitment to safe, eco-conscious cleaning that prioritizes both results and responsibility. We see a future where every home and business has access to high-quality, non-toxic carpet care — delivered by experts who care about your health, your space, and the planet.
            </p>
          </div>
          <div className="rounded-xl border-2 border-primary-foreground/10 bg-primary-foreground/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-foreground">Our Goal</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Our goal is to provide dependable, eco-friendly carpet cleaning services in Chicago with no shortcuts. Whether it's a home or business, we focus on delivering consistent, high-quality results using non-toxic methods and industry-leading equipment.
            </p>
          </div>
        </div>

        {/* Cleaning Process */}
        <div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground text-center mb-2">
            What to Expect: <span className="text-accent-yellow">Our Cleaning Process</span>
          </h2>
          <p className="text-primary-foreground/60 text-center text-sm mb-8 max-w-2xl mx-auto">
            From booking to post-clean care, here's how we deliver results you can count on.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: "Book Your Appointment",
                desc: "It all starts with a quick call or online booking. We'll confirm your location, cleaning needs, and schedule a time that works for you.",
              },
              {
                step: "2",
                title: "Customized Estimate",
                desc: "Our technician walks through the space with you, identifies problem areas like stains or odors, and explains the best approach.",
              },
              {
                step: "3",
                title: "Deep Cleaning Service",
                desc: "We use powerful steam extraction and non-toxic, residue-free products. Safe for kids, pets, and delivers deep, lasting results.",
              },
              {
                step: "4",
                title: "Satisfaction Check",
                desc: "We do a complete walkthrough with you to ensure everything meets your expectations. We don't leave until you're 100% satisfied.",
              },
              {
                step: "5",
                title: "Post-Clean Care Tips",
                desc: "We provide expert guidance on how to keep your carpets looking their best — spot-cleaning advice and tips for maintaining freshness.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border-2 border-primary-foreground/10 bg-primary-foreground/5 p-5 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground font-heading font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-heading font-bold text-sm text-primary-foreground mb-2">{item.title}</h4>
                <p className="text-primary-foreground/70 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-base transition-all"
          >
            Get Your Free Quote <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
