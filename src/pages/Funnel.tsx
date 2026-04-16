import { Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import SocialProof from "@/components/SocialProof";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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

const Funnel = () => {
  return (
    <div className="min-h-screen bg-background">
      <FunnelNav />
      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <SocialProof />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Funnel;
