import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import SocialProof from "@/components/SocialProof";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <AboutSection />
      <WhyChooseUs />
      <ServicesSection />
      <SocialProof />
      <FAQSection />
      <CTASection />
      <Footer />
      <StickyMobileBar />
    </div>
  );
};

export default Index;
