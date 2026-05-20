import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "unset";
    }, 2200);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0C0C0C]"
        >

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />


          {[
            "top-8 left-8 border-t border-l",
            "top-8 right-8 border-t border-r",
            "bottom-8 left-8 border-b border-l",
            "bottom-8 right-8 border-b border-r",
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className={`absolute h-6 w-6 border-white/20 sm:h-10 sm:w-10 ${cls}`}
            />
          ))}


          <div className="relative flex flex-col items-center gap-8">

            <motion.div
              className="relative h-[1px] overflow-hidden"
              style={{ width: 120 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-[#B600A8] to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ width: "100%", height: "100%" }}
              />
              <div className="absolute inset-0 bg-white/10" />
            </motion.div>


            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl sm:text-6xl font-display font-extrabold uppercase tracking-tight text-[#F0ECD8]"
              >
                Dhairya
              </motion.h1>
            </div>


            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/30 font-medium"
            >
              Developer · Engineer · Creator
            </motion.span>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-2"
            >
              <span
                className="inline-block w-[6px] h-[6px] rounded-full bg-[#B600A8]"
                style={{ animation: "preloaderPulse 1.5s ease-in-out infinite" }}
              />
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Loading
              </span>
            </motion.div>
          </div>

          <style>{`
            @keyframes preloaderPulse {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
