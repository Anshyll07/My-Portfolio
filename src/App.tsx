
import { HeroSectionPrisma } from "./components/HeroSectionPrisma";
import { AboutSection } from "./components/AboutSection";
import { TechnicalArsenalSection } from "./components/TechnicalArsenalSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { NotFoundPage } from "./components/NotFoundPage";
import { MobileDisclaimer } from "./components/MobileDisclaimer";

import { SocialRail } from "./components/SocialRail";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { KnightFooter } from "./components/KnightFooter";

import { Preloader } from "./components/Preloader";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { useState, useEffect } from "react";
import Lenis from 'lenis';

const MainPortfolio = () => (
  <main className="w-full overflow-x-clip bg-[#0C0C0C]">
    <MobileDisclaimer />
    <SocialRail />
    <ScrollToTopButton />
    <HeroSectionPrisma />

    <div className="section-divider" />
    <AboutSection />

    <div className="section-divider" />
    <TechnicalArsenalSection />
    <ServicesSection />
    <ProjectsSection />

    <KnightFooter />
  </main>
);

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", checkMobile);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
      <Preloader />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MotionConfig>
  );
}
