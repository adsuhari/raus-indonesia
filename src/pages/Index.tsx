import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingSearch from "@/components/FloatingSearch";
import HeroSection from "@/components/HeroSection";
import IdeasCarousel from "@/components/IdeasCarousel";
import AboutSection from "@/components/AboutSection";
import JournalSection from "@/components/JournalSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div ref={sentinelRef} />
      <FloatingSearch sticky={isSticky} />
      <IdeasCarousel />
      <AboutSection />
      <JournalSection />
      <Footer />
    </div>
  );
};

export default Index;
