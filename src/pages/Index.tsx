import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IdeasCarousel from "@/components/IdeasCarousel";
import AboutSection from "@/components/AboutSection";
import JournalSection from "@/components/JournalSection";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <IdeasCarousel />
      <AboutSection />
      <JournalSection />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default Index;
