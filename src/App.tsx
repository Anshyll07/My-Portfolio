
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
  return (
    <>
      <Preloader />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
