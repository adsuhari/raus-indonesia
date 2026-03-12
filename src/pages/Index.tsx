import Navbar from "@/components/Navbar";
import FloatingSearch from "@/components/FloatingSearch";
import HeroSection from "@/components/HeroSection";
import IdeasCarousel from "@/components/IdeasCarousel";
import AboutSection from "@/components/AboutSection";
import JournalSection from "@/components/JournalSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <FloatingSearch />
      <HeroSection />
      <IdeasCarousel />
      <AboutSection />
      <JournalSection />
      <Footer />
    </div>
  );
};

export default Index;
