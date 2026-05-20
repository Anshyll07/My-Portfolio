

import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-0 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center ${
            isMobile ? "w-[calc(100vw-1.5rem)] gap-3 px-4" : "gap-14 px-14"
          } py-3 sm:py-4`}
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderLeft: "0.5px solid rgba(255,255,255,0.08)",
            borderRight: "0.5px solid rgba(255,255,255,0.08)",
            borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            borderRadius: isMobile ? "0 0 1rem 1rem" : "0 0 1.5rem 1.5rem",
            width: isMobile ? "calc(100vw - 1.5rem)" : "auto",
          }}
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
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 top-[42%] z-50 flex flex-col items-center py-6"
          style={{
            background: "#000000",
            borderTop: "0.5px solid rgba(255,255,255,0.1)",
            borderRight: "0.5px solid rgba(255,255,255,0.1)",
            borderBottom: "0.5px solid rgba(255,255,255,0.1)",
            borderRadius: "0 1.5rem 1.5rem 0",
            transform: "translateY(-50%)",
          }}
        >
          <span
            className="block mb-4 w-1 h-1 rounded-full"
            style={{ background: "rgba(225,218,190,0.3)" }}
          />
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
          <span
            className="block mt-4 w-1 h-1 rounded-full"
            style={{ background: "rgba(225,218,190,0.3)" }}
          />
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
      fontFamily: "'DM Sans', sans-serif",
      fontSize: isMobile ? "9px" : "13px",
      fontWeight: isActive ? 600 : 500,
      letterSpacing: isMobile ? "0.08em" : "0.18em",
      textTransform: "uppercase",
      color: isActive ? "rgba(225,218,190,1)" : "rgba(225,218,190,0.5)",
      textDecoration: "none",
      transition: "color 0.3s ease, font-weight 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(225,218,190,1)")}
    onMouseLeave={(e) => {
      if (!isActive)
        e.currentTarget.style.color = "rgba(225,218,190,0.5)";
    }}
  >
    {item}
    <span
      className={`absolute -bottom-1 left-0 right-0 h-px origin-left transition-transform duration-300 ${
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
      style={{ background: isActive ? "rgba(182,0,168,0.7)" : "rgba(225,218,190,0.4)" }}
    />
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
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: isActive ? 700 : 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: isActive ? "rgba(182,0,168,1)" : "rgba(243, 233, 194, 0.65)",
        textDecoration: "none",
        listStyle: "none",
        writingMode: "vertical-rl",
        padding: "0.9rem 1.1rem",
        transition: "color 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(225,218,190,1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = isActive
          ? "rgba(182,0,168,1)"
          : "rgba(225,218,190,0.65)";
      }}
    >
      {item}
      {isActive && (
        <motion.span
          layoutId="activeVertDot"
          className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#B600A8]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
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

      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0C0C0C]"
        style={{ zIndex: 0 }}
      />
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%230C0C0C' width='1920' height='1080'/%3E%3C/svg%3E"
        className="absolute inset-0 w-full h-full object-cover opacity-75 z-[1]"
        src="https://cdn.artstation.com/p/video_sources/000/146/133/2k.mp4"
      />

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
          opacity: 0.4,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.12) 70%, transparent 100%)",
        }}
      />

      <motion.div
        variants={fadeIn(1)}
        initial="hidden"
        animate="visible"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none z-[4]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
        }}
      />

      {(
        [
          "top-5 left-5 border-t border-l rounded-tl",
          "top-5 right-5 border-t border-r rounded-tr",
          "bottom-5 left-5 border-b border-l rounded-bl",
          "bottom-5 right-5 border-b border-r rounded-br",
        ] as const
      ).map((cls, i) => (
        <motion.div
          key={i}
          variants={fadeIn(0.5)}
          initial="hidden"
          animate="visible"
          className={`absolute z-[5] h-8 w-8 border-white/20 sm:h-12 sm:w-12 ${cls}`}
        />
      ))}

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
            background: "rgba(150,220,150,0.75)",
            writingMode: "horizontal-tb",
            animation: "heroPulse 2.5s ease-in-out infinite",
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
            className="leading-[0.88] uppercase select-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3.4rem, 18vw, 12rem)",
              letterSpacing: "0",
              color: "#F0ECD8",
              textShadow: "0 0 80px rgba(255,240,200,0.07)",
            }}
          >
            Hi, I&apos;m Dhairya
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
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontStyle: "italic",
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
            background: "linear-gradient(to bottom, rgba(225,218,190,0.4), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
        <span
          className="text-[9px] font-medium tracking-[0.3em] uppercase mt-1"
          style={{ color: "rgba(225,218,190,0.22)" }}
        >
          Scroll
        </span>
      </motion.div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.35); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.55; transform: scaleY(1);    transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1.15); }
        }
      `}</style>
    </section>
  );
};

export default HeroSectionPrisma;
