

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./MagneticButton";

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeSection;
};

const NavBar: FC<{ navItems: string[] }> = ({ navItems }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const vertNavItems = ["Home", ...navItems];
  const sectionIds = ["hero", ...navItems.map((i) => i.toLowerCase())];
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const showHorizontal = !scrolled || isMobile;

  return (
    <AnimatePresence mode="wait">
      {showHorizontal ? (
        <motion.nav
          key="top"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center ${
            isMobile ? "w-full gap-3 px-4" : "gap-14 px-14"
          } py-3 sm:py-4 bg-black rounded-b-2xl md:rounded-b-3xl`}
        >
          {navItems.map((item) => (
            <HorizNavLink
              key={item}
              item={item}
              isMobile={isMobile}
              isActive={activeSection === item.toLowerCase()}
            />
          ))}
        </motion.nav>
      ) : (
        <motion.nav
          key="side"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 top-[42%] z-50 flex flex-col items-center py-6 bg-black rounded-r-2xl border-r border-y border-white/[0.08]"
          style={{ transform: "translateY(-50%)" }}
        >
          {vertNavItems.map((item) => (
            <VertNavLink
              key={item}
              item={item}
              isActive={
                item.toLowerCase() === "home"
                  ? activeSection === "hero"
                  : activeSection === item.toLowerCase()
              }
            />
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const HorizNavLink: FC<{ item: string; isMobile?: boolean; isActive?: boolean }> = ({
  item,
  isMobile,
  isActive,
}) => (
  <a
    href={`#${item.toLowerCase()}`}
    className="relative group"
    style={{
      fontSize: isMobile ? "9px" : "13px",
      fontWeight: 500,
      letterSpacing: isMobile ? "0.08em" : "0.18em",
      textTransform: "uppercase",
      color: isActive ? "rgba(225,218,190,1)" : "rgba(225,218,190,0.5)",
      textDecoration: "none",
      transition: "color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(225,218,190,1)")}
    onMouseLeave={(e) => {
      if (!isActive)
        e.currentTarget.style.color = "rgba(225,218,190,0.5)";
    }}
  >
    {item}
    {isActive && (
      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
    )}
  </a>
);

const VertNavLink: FC<{ item: string; isActive?: boolean }> = ({ item, isActive }) => {
  const isHome = item.toLowerCase() === "home";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href={isHome ? "#" : `#${item.toLowerCase()}`}
      onClick={handleClick}
      className="relative flex items-center justify-center"
      style={{
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: isActive ? "rgba(225,218,190,1)" : "rgba(225,218,190,0.5)",
        textDecoration: "none",
        writingMode: "vertical-rl",
        padding: "0.9rem 1.1rem",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(225,218,190,1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = isActive
          ? "rgba(225,218,190,1)"
          : "rgba(225,218,190,0.5)";
      }}
    >
      {item}
      {isActive && (
        <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </a>
  );
};



const slideUp = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const riseUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, delay } },
});

export const HeroSectionPrisma: FC = () => {
  const navItems = ["About", "Arsenal", "Expertise", "Projects"];

  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden bg-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >

      

      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%230C0C0C' width='1920' height='1080'/%3E%3C/svg%3E"
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-[1]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
      />

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none z-[1]" />

      {/* Simple gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      <NavBar navItems={navItems} />

      <motion.div
        variants={fadeIn(1.2)}
        initial="hidden"
        animate="visible"
        className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex"
        style={{ writingMode: "vertical-rl" }}
      >
        <span
          className="inline-block w-[5px] h-[5px] rounded-full"
          style={{
            background: "rgba(150,220,150,0.6)",
            writingMode: "horizontal-tb",
          }}
        />
        <span
          className="text-[9px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "rgba(225,218,190,0.3)" }}
        >
          Available
        </span>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-8 sm:px-8 sm:pb-10 md:px-14 md:pb-12">
        <motion.div
          variants={riseUp(0.3)}
          initial="hidden"
          animate="visible"
          className="mb-3 flex items-center gap-3 sm:mb-4"
        >
          <span
            className="block w-7 h-px"
            style={{ background: "rgba(225,218,190,0.3)" }}
          />
          <span
            className="text-[9px] font-medium uppercase tracking-[0.24em] sm:text-[10px] sm:tracking-[0.35em]"
            style={{ color: "rgba(225,218,190,0.45)" }}
          >
            Portfolio · Developer
          </span>
        </motion.div>

        <div className="overflow-hidden mb-1">
          <motion.h1
            variants={slideUp}
            initial="hidden"
            animate="visible"
            className="leading-[0.88] select-none font-serif"
            style={{
              fontSize: "clamp(3.4rem, 16vw, 11rem)",
              letterSpacing: "-0.03em",
              color: "#F0ECD8",
            }}
          >
            Hi, I'm Dhairya
          </motion.h1>
        </div>

        <motion.div
          variants={riseUp(0.65)}
          initial="hidden"
          animate="visible"
          className="mt-4 flex flex-col justify-between gap-4 pt-4 md:mt-5 md:flex-row md:items-end md:gap-5 md:pt-5"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)" }}
        >
          <p
            className="font-light leading-relaxed max-w-lg"
            style={{
              fontSize: "clamp(13px, 3.8vw, 18px)",
              color: "rgba(225,218,190,0.55)",
            }}
          >
            A{" "}
            <em
              className="font-serif"
              style={{
                color: "rgba(225,218,190,0.95)",
                fontSize: "1.05em",
              }}
            >
              Developer
            </em>{" "}
            driven by crafting striking, unforgettable digital experiences that
            push every boundary.
          </p>

          <motion.div
            variants={riseUp(0.9)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start md:items-end gap-3 shrink-0"
          >
            <span
              className="text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.3em]"
              style={{ color: "rgba(225,218,190,0.28)" }}
            >
              Made in India · Available Worldwide
            </span>

            <MagneticButton>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
                style={{
                  color: "rgba(225,218,190,0.85)",
                  border: "0.5px solid rgba(225,218,190,0.25)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "#0d0d0d";
                  el.style.background = "rgba(225,218,190,0.92)";
                  el.style.borderColor = "transparent";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "rgba(225,218,190,0.85)";
                  el.style.background = "transparent";
                  el.style.borderColor = "rgba(225,218,190,0.25)";
                }}
              >
                View work
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={riseUp(1.4)}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1 pointer-events-none sm:flex"
      >
        <div
          className="w-px h-9"
          style={{
            background: "linear-gradient(to bottom, rgba(225,218,190,0.3), transparent)",
          }}
        />
        <span
          className="text-[9px] font-medium tracking-[0.3em] uppercase mt-1"
          style={{ color: "rgba(225,218,190,0.2)" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
};

export default HeroSectionPrisma;
