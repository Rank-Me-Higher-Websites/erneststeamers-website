import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VSLSection from "@/components/VSLSection";
import SocialProof from "@/components/SocialProof";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <VSLSection />
      <div className="section-divider" />
      <SocialProof />
      <div className="section-divider" />
      <ServicesSection />
      <div className="section-divider" />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
