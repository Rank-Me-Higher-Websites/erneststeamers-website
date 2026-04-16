import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import SocialProof from "@/components/SocialProof";
import cleaningAction from "@/assets/cleaning-action.png";
import vanHouse from "@/assets/van-house.png";

const FunnelNav = () => (
  <nav className="bg-accent-yellow sticky top-0 z-50 shadow-sm" style={{ backgroundColor: 'hsl(36, 100%, 55%)' }}>
    <div className="container max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
      <img src={logo} alt="Ernest Steamers" className="h-7" />
      <div className="flex items-center gap-3">
        <a href="tel:+16308309867" className="flex items-center gap-1.5 text-foreground">
          <Phone className="w-3.5 h-3.5 text-foreground" />
          <span className="text-xs font-semibold hidden sm:inline">630-830-9867</span>
        </a>
        <QuoteFormDialog>
          <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-4 py-2 rounded-lg text-xs transition-all flex items-center gap-1" data-testid="button-funnel-quote">
            Get A Free Quote <span>→</span>
          </button>
        </QuoteFormDialog>
      </div>
    </div>
  </nav>
);

const FunnelAbout = () => (
  <section className="py-6 lg:py-12 px-3 lg:px-4 bg-primary">
    <div className="container max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
        <div className="grid grid-cols-2 gap-2 lg:gap-3">
          <img src={cleaningAction} alt="Ernest Steamers technician cleaning carpet" className="rounded-lg lg:rounded-xl border-2 border-primary-foreground/10 w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover shadow-xl" />
          <img src={vanHouse} alt="Ernest Steamers van at customer home" className="rounded-lg lg:rounded-xl border-2 border-primary-foreground/10 w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover shadow-xl" />
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
          <QuoteFormDialog>
            <button className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base transition-all">
              Get A Free Quote <span className="text-base lg:text-lg">→</span>
            </button>
          </QuoteFormDialog>
        </div>
      </div>
    </div>
  </section>
);

const FunnelCTA = () => (
  <section className="py-6 lg:py-12 px-3 lg:px-4 bg-background">
    <div className="container max-w-3xl mx-auto text-center">
      <div className="p-5 lg:p-12 rounded-xl lg:rounded-2xl bg-primary border border-primary-foreground/10">
        <h2 className="font-heading font-bold text-xl lg:text-4xl mb-1.5 lg:mb-3 text-primary-foreground">
          Get Your <span className="text-accent-yellow">Free Estimate</span> Today
        </h2>
        <p className="text-primary-foreground/70 text-xs lg:text-base mb-3 lg:mb-6 max-w-lg mx-auto">
          No hidden fees. No commitments. Just a transparent quote and incredible results.
        </p>
        <div className="flex gap-2 lg:gap-3 justify-center">
          <a href="tel:+16308309867" className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-5 py-2 lg:px-8 lg:py-3 rounded-lg text-sm lg:text-base transition-all">
            CALL NOW
          </a>
          <QuoteFormDialog>
            <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-5 py-2 lg:px-8 lg:py-3 rounded-lg text-sm lg:text-base transition-all">
              GET A QUOTE
            </button>
          </QuoteFormDialog>
        </div>
      </div>
    </div>
  </section>
);

const FunnelFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      <div className="container max-w-7xl mx-auto px-3 lg:px-4 py-6 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <img src={logo} alt="Ernest Steamers" className="h-10 lg:h-14 mb-2 lg:mb-4" />
            <a href="tel:+16308309867" className="block font-heading font-bold text-primary-foreground text-base lg:text-xl mb-2 lg:mb-3">
              630-830-9867
            </a>
            <ul className="space-y-1.5 lg:space-y-2.5">
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <a href="mailto:info@erneststeamers.com" className="text-primary-foreground/70 hover:text-accent text-xs lg:text-sm transition-colors">
                  info@erneststeamers.com
                </a>
              </li>
              <li className="flex items-start gap-1.5 lg:gap-2">
                <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/70 text-xs lg:text-sm">
                  1018 Hummingbird Way,<br />Bartlett, IL 60103
                </span>
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-2 lg:mt-4">
              {[Facebook, Linkedin, Instagram].map((Icon, i) => (
                <span key={i} className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary-foreground" />
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm lg:text-base mb-1.5 lg:mb-2">
              Our Services
            </h3>
            <div className="w-6 lg:w-8 h-0.5 bg-accent mb-2 lg:mb-4" />
            <ul className="space-y-1 lg:space-y-2">
              {["Carpet Cleaning", "Upholstery Cleaning", "Tile And Grout Cleaning", "Stain Cleaning", "Commercial Carpet Cleaning", "Area Rug Cleaning", "Pet Stain/Odor Removal"].map((service) => (
                <li key={service} className="text-primary-foreground/70 text-[11px] lg:text-sm flex items-center gap-1">
                  <span className="text-accent text-[10px] lg:text-xs">›</span> {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-primary-foreground text-sm lg:text-base mb-1.5 lg:mb-2">
              Business Hours
            </h3>
            <div className="w-6 lg:w-8 h-0.5 bg-accent mb-2 lg:mb-4" />
            <ul className="space-y-1.5 lg:space-y-3">
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-[11px] lg:text-sm">Monday to Friday</p>
                  <p className="text-primary-foreground/70 text-[11px] lg:text-sm">7 am to 7 pm</p>
                </div>
              </li>
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-[11px] lg:text-sm">Saturday</p>
                  <p className="text-primary-foreground/70 text-[11px] lg:text-sm">9 am to 3 pm</p>
                </div>
              </li>
              <li className="flex items-start gap-1.5 lg:gap-2">
                <Clock className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-accent font-semibold text-[11px] lg:text-sm">Sunday</p>
                  <p className="text-primary-foreground/70 text-[11px] lg:text-sm">Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full h-32 lg:h-44">
        <iframe
          src="https://www.google.com/maps?q=Ernest+Steamers,+10549+Crown+Rd+%234,+Franklin+Park,+IL&output=embed&z=10"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ernest Steamers location"
        />
      </div>

      <div className="border-t border-primary-foreground/10 bg-primary">
        <div className="container max-w-7xl mx-auto px-3 lg:px-4 py-3 lg:py-4 text-center">
          <p className="text-primary-foreground/50 text-[10px] lg:text-xs">
            © Copyright Ernest Steamers. All rights reserved – Website by{" "}
            <span className="text-accent">HSdigital</span> {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

const Funnel = () => {
  return (
    <div className="min-h-screen bg-background">
      <FunnelNav />
      <HeroSection />
      <FunnelAbout />
      <WhyChooseUs />
      <ServicesSection />
      <SocialProof />
      <FunnelCTA />
      <FunnelFooter />
    </div>
  );
};

export default Funnel;
