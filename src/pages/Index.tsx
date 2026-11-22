import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import HomeHero from "@/components/home/HomeHero";
import HomeServices from "@/components/home/HomeServices";
import WorkGallery from "@/components/home/WorkGallery";
import AreaTeaser from "@/components/home/AreaTeaser";
import HomeFaq from "@/components/home/HomeFaq";
import HomeFinalCta from "@/components/home/HomeFinalCta";

const Index = () => {
  return (
    <div className="clean-home min-h-screen bg-background pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main>
        <HomeHero />
        <HomeServices />
        <WorkGallery />
        <AreaTeaser />
        <HomeFinalCta />
        <HomeFaq />
      </main>
      <Footer />
      <StickyMobileBar scrollTo="hero-quote" />
    </div>
  );
};

export default Index;
