import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import HomeHero from "@/components/home/HomeHero";
import QuickFacts from "@/components/home/QuickFacts";
import HomeServices from "@/components/home/HomeServices";
import PricingBlock from "@/components/home/PricingBlock";
import HowItWorks from "@/components/home/HowItWorks";
import WhyLocal from "@/components/home/WhyLocal";
import WorkGallery from "@/components/home/WorkGallery";
import AreaTeaser from "@/components/home/AreaTeaser";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main>
        <HomeHero />
        <QuickFacts />
        <HomeServices />
        <PricingBlock />
        <HowItWorks />
        <WhyLocal />
        <WorkGallery />
        <AreaTeaser />
        <HomeFaq />
        <HomeFinalCta />
      </main>
      <Footer />
      <StickyMobileBar scrollTo="hero-quote" />
    </div>
  );
};

export default Index;
