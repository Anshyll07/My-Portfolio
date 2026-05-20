import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MonitorSmartphone } from "lucide-react";

export const MobileDisclaimer: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const isMobile = window.innerWidth < 768;
    const hasDismissed = localStorage.getItem("mobileDisclaimerDismissed");
    
    if (isMobile && !hasDismissed) {

      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      const autoHideTimer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("mobileDisclaimerDismissed", "true");
      }, 6000);
      return () => clearTimeout(autoHideTimer);
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("mobileDisclaimerDismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-4 right-4 z-50 md:hidden"
        >
          <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-4 flex items-start gap-3">

            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#22d3ee] via-[#B600A8] to-[#f43f5e]" />
            
            <div className="mt-0.5 p-2 rounded-full bg-white/5 border border-white/10 shrink-0 text-[#22d3ee]">
              <MonitorSmartphone size={16} />
            </div>
            
            <div className="flex-1 pr-2">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/90 mb-1">
                Optimal Experience
              </h4>
              <p className="text-[11px] leading-relaxed text-white/60">
                For the best cinematic and 3D experience, please view this portfolio in <strong className="text-white">Desktop Mode</strong> or on a larger screen.
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors shrink-0"
              aria-label="Dismiss disclaimer"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
