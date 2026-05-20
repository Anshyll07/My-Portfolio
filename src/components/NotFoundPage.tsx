import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, delay } },
});

const riseUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
});

export const NotFoundPage: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main
      className="relative w-full h-[100svh] overflow-hidden bg-[#0C0C0C] flex flex-col items-center justify-center selection:bg-[#B600A8]/30 selection:text-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-64 right-[6%] h-[520px] w-[760px] rounded-full bg-gradient-to-r from-[#B600A8]/10 via-[#7621B0]/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-64 left-[4%] h-[520px] w-[760px] rounded-full bg-gradient-to-r from-[#BE4C00]/8 via-[#7621B0]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] bg-noise mix-blend-overlay" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
          opacity: 0.35,
        }}
      />

      <motion.div
        variants={fadeIn(0.6)}
        initial="hidden"
        animate="visible"
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none z-[2]"
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
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute z-[5] h-8 w-8 border-white/20 sm:h-12 sm:w-12 ${cls}`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] pointer-events-none select-none z-0"
        style={{ x: -mousePosition.x * 0.4, y: -mousePosition.y * 0.4 }}
      >
        <div className="glitch-wrapper">
          <div
            className="glitch-404 font-display font-black tracking-tighter"
            data-text="404"
            style={{
              fontSize: "clamp(14rem, 38vw, 32rem)",
              lineHeight: 0.85,
              color: "rgba(255,255,255,0.06)",
            }}
          >
            404
          </div>
          <div className="glitch-scanline" />
        </div>
      </motion.div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-xl px-6">
        <motion.div
          variants={riseUp(0.3)}
          initial="hidden"
          animate="visible"
          className="mb-6 flex items-center gap-3"
        >
          <span className="block w-7 h-px" style={{ background: "rgba(225,218,190,0.3)" }} />
          <span
            className="text-[9px] font-medium uppercase tracking-[0.24em] sm:text-[10px] sm:tracking-[0.35em]"
            style={{ color: "rgba(225,218,190,0.45)" }}
          >
            Error · 404
          </span>
          <span className="block w-7 h-px" style={{ background: "rgba(225,218,190,0.3)" }} />
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="glitch-title leading-[0.88] uppercase select-none font-display font-extrabold"
            data-text="Signal Lost"
            style={{
              fontSize: "clamp(2.2rem, 10vw, 5.5rem)",
              color: "#F0ECD8",
              textShadow: "0 0 80px rgba(255,240,200,0.07)",
            }}
          >
            Signal Lost
          </motion.h1>
        </div>

        <motion.div
          variants={riseUp(0.75)}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xs h-px mb-8 overflow-hidden mx-auto"
        >
          <div
            className="h-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(182,0,168,0.4) 25%, rgba(118,33,176,0.5) 50%, rgba(182,0,168,0.4) 75%, transparent 100%)",
            }}
          />
        </motion.div>

        <motion.p
          variants={riseUp(0.9)}
          initial="hidden"
          animate="visible"
          className="font-light leading-relaxed max-w-md mb-10"
          style={{
            fontSize: "clamp(13px, 3.8vw, 17px)",
            color: "rgba(225,218,190,0.5)",
          }}
        >
          The page you're looking for has drifted beyond reach. It may have been moved, deleted, or never existed.
        </motion.p>

        <motion.div
          variants={riseUp(1.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:px-6 sm:text-[11px] sm:tracking-[0.18em] cursor-pointer"
              style={{
                color: "rgba(225,218,190,0.85)",
                border: "0.5px solid rgba(225,218,190,0.25)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.color = "#0d0d0d";
                el.style.background = "rgba(225,218,190,0.92)";
                el.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.color = "rgba(225,218,190,0.85)";
                el.style.background = "transparent";
                el.style.borderColor = "rgba(225,218,190,0.25)";
              }}
            >
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return Home
            </motion.span>
          </Link>

          <span
            className="text-[9px] font-medium uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.3em]"
            style={{ color: "rgba(225,218,190,0.2)" }}
          >
            dhairya.dev
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn(1.6)}
        initial="hidden"
        animate="visible"
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 pointer-events-none sm:flex"
      >
        <span
          className="inline-block w-[5px] h-[5px] rounded-full bg-[#B600A8]"
          style={{ animation: "notFoundPulse 2.5s ease-in-out infinite" }}
        />
        <span
          className="text-[9px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "rgba(225,218,190,0.2)" }}
        >
          Lost
        </span>
      </motion.div>

      <style>{`
        .glitch-wrapper {
          position: relative;
        }

        .glitch-404 {
          position: relative;
          animation: glitchSkew 4s infinite linear alternate-reverse;
        }

        .glitch-404::before,
        .glitch-404::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .glitch-404::before {
          color: rgba(182, 0, 168, 0.35);
          text-shadow: -2px 0 rgba(182, 0, 168, 0.15);
          animation: glitchTop 3s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        .glitch-404::after {
          color: rgba(118, 33, 176, 0.3);
          text-shadow: 2px 0 rgba(190, 76, 0, 0.1);
          animation: glitchBottom 2.5s infinite linear alternate-reverse;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        .glitch-scanline {
          position: absolute;
          left: -5%;
          width: 110%;
          height: 4px;
          background: linear-gradient(90deg, transparent, rgba(182,0,168,0.25), rgba(118,33,176,0.2), transparent);
          opacity: 0;
          pointer-events: none;
          animation: scanDrop 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        @keyframes glitchTop {
          0% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          2% { clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%); transform: translate(-8px, 0); }
          4% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          6% { clip-path: polygon(0 20%, 100% 20%, 100% 28%, 0 28%); transform: translate(6px, 0); }
          8% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          40% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          42% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); transform: translate(-10px, 0); }
          43% { clip-path: polygon(0 2%, 100% 2%, 100% 12%, 0 12%); transform: translate(5px, 0); }
          44% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          70% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          72% { clip-path: polygon(0 8%, 100% 8%, 100% 22%, 0 22%); transform: translate(-6px, 0); }
          73% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%); transform: translate(0); }
        }

        @keyframes glitchBottom {
          0% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          3% { clip-path: polygon(0 75%, 100% 75%, 100% 90%, 0 90%); transform: translate(10px, 0); }
          5% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          7% { clip-path: polygon(0 80%, 100% 80%, 100% 95%, 0 95%); transform: translate(-7px, 0); }
          9% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          50% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          52% { clip-path: polygon(0 72%, 100% 72%, 100% 85%, 0 85%); transform: translate(8px, 0); }
          53% { clip-path: polygon(0 67%, 100% 67%, 100% 78%, 0 78%); transform: translate(-5px, 0); }
          54% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          80% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          82% { clip-path: polygon(0 70%, 100% 70%, 100% 88%, 0 88%); transform: translate(6px, 0); }
          83% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
          100% { clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%); transform: translate(0); }
        }

        @keyframes glitchSkew {
          0% { transform: skew(0deg); }
          48% { transform: skew(0deg); }
          50% { transform: skew(-0.5deg); }
          52% { transform: skew(0.3deg); }
          54% { transform: skew(0deg); }
          78% { transform: skew(0deg); }
          80% { transform: skew(0.4deg); }
          81% { transform: skew(-0.3deg); }
          82% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }

        @keyframes scanDrop {
          0%, 15% { top: -5%; opacity: 0; }
          16% { opacity: 0.8; }
          35% { top: 110%; opacity: 0.6; }
          36%, 100% { opacity: 0; top: 110%; }
        }

        .glitch-title {
          position: relative;
        }

        .glitch-title::before,
        .glitch-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .glitch-title::before {
          color: rgba(182, 0, 168, 0.6);
          animation: titleGlitch 5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
        }

        .glitch-title::after {
          color: rgba(118, 33, 176, 0.5);
          animation: titleGlitch 5s infinite reverse;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }

        @keyframes titleGlitch {
          0%, 90%, 100% { transform: translate(0); opacity: 0; }
          91% { transform: translate(-3px, 1px); opacity: 1; }
          92% { transform: translate(2px, -1px); opacity: 1; }
          93% { transform: translate(-1px, 0); opacity: 1; }
          94% { transform: translate(0); opacity: 0; }
        }

        @keyframes notFoundPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
      `}</style>
    </main>
  );
};
