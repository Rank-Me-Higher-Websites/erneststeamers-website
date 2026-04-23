import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import cleaningAction from "@/assets/cleaning-action.png";
import vanHouse from "@/assets/van-house.png";
import { Leaf, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: "500+" },
  { label: "Years of Experience", value: "10+" },
  { label: "Happy Customers", value: "400+" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner - NAVY */}
      <section className="bg-hero py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            About Ernest Steamers
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-6">
            Carpet cleaning experts you can trust — serving Chicago and Chicagoland with integrity, professionalism, and eco-friendly results.
          </p>
          <QuoteFormDialog>
            <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              Get A Free Quote →
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      {/* Intro Photos + Text - WHITE */}
      <section className="py-12 lg:py-16 px-4 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-3">
              <img
                src={cleaningAction}
                alt="Ernest Steamers technician cleaning carpet"
                className="rounded-xl border-2 border-border w-full h-48 md:h-64 object-cover shadow-xl"
              />
              <img
                src={vanHouse}
                alt="Ernest Steamers van at customer home"
                className="rounded-xl border-2 border-border w-full h-48 md:h-64 object-cover shadow-xl"
              />
            </div>

            <div>
              <h2 className="font-heading font-bold text-2xl md:text-4xl text-foreground mb-2">
                About Carpet Cleaning Experts{" "}
                <span className="text-cta-orange">You Can Trust</span>
              </h2>
              <div className="w-16 h-1 bg-cta-orange my-4" />

              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Ernest Steamers provides safe, high-quality carpet cleaning for homes and businesses across Chicago. Built on integrity and professionalism, we've earned a trusted reputation through consistent results and client satisfaction.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                We go beyond surface-level clean — using non-toxic, residue-free products and advanced steam technology for deep, lasting results that are safe for kids, pets, and the planet.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                From residential carpets to commercial floors, tile, upholstery, and pet stain removal, every job is handled with expert care and top-tier equipment. Our eco-friendly solutions are trusted throughout the Chicagoland area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - YELLOW */}
      <section className="py-10 lg:py-12 px-4 bg-cta-orange">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/90 text-xs md:text-sm mt-1 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Goal - NAVY */}
      <section className="py-12 lg:py-16 px-4 bg-primary">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border-2 border-primary-foreground/10 bg-primary-foreground/5 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-yellow/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-accent-yellow" />
                </div>
                <h3 className="font-heading font-bold text-lg text-primary-foreground">Our Vision</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                At Ernest Steamers, our vision is to transform the way Chicago experiences carpet cleaning. We aim to lead the industry with a commitment to safe, eco-conscious cleaning that prioritizes both results and responsibility. We see a future where every home and business has access to high-quality, non-toxic carpet care — delivered by experts who care about your health, your space, and the planet.
              </p>
            </div>
            <div className="rounded-xl border-2 border-primary-foreground/10 bg-primary-foreground/5 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent-yellow/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-accent-yellow" />
                </div>
                <h3 className="font-heading font-bold text-lg text-primary-foreground">Our Goal</h3>
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Our goal is to provide dependable, eco-friendly carpet cleaning services in Chicago with no shortcuts. Whether it's a home or business, we focus on delivering consistent, high-quality results using non-toxic methods and industry-leading equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cleaning Process - WHITE */}
      <section className="py-12 lg:py-16 px-4 bg-background">
        <div className="container max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground text-center mb-2">
            What to Expect: <span className="text-cta-orange">Our Cleaning Process</span>
          </h2>
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-2xl mx-auto">
            From booking to post-clean care, here's how we deliver results you can count on.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Book Your Appointment", desc: "It all starts with a quick call or online booking. We'll confirm your location, cleaning needs, and schedule a time that works for you." },
              { step: "2", title: "Customized Estimate", desc: "Our technician walks through the space with you, identifies problem areas like stains or odors, and explains the best approach." },
              { step: "3", title: "Deep Cleaning Service", desc: "We use powerful steam extraction and non-toxic, residue-free products. Safe for kids, pets, and delivers deep, lasting results." },
              { step: "4", title: "Satisfaction Check", desc: "We do a complete walkthrough with you to ensure everything meets your expectations. We don't leave until you're 100% satisfied." },
              { step: "5", title: "Post-Clean Care Tips", desc: "We provide expert guidance on how to keep your carpets looking their best — spot-cleaning advice and tips for maintaining freshness." },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border-2 border-primary-foreground/10 bg-primary text-primary-foreground p-5 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-accent-yellow text-primary font-heading font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h4 className="font-heading font-bold text-sm text-primary-foreground mb-2">{item.title}</h4>
                <p className="text-primary-foreground/70 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA - NAVY */}
      <section className="bg-hero py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Ready for a Cleaner Space?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Whether it's your home or business, Ernest Steamers delivers results you can count on. Get your free quote today!
          </p>
          <QuoteFormDialog>
            <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              GET A FREE QUOTE
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
