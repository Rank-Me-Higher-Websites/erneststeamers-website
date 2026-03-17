import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

import SocialProof from "@/components/SocialProof";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SocialProof />
      <ServicesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
