import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon } from "lucide-react";

// @ts-ignore
import img1 from "../assets/articians_web/CR2025-10-29_8-26-55_0.png";
// @ts-ignore
import img2 from "../assets/articians_web/CR2025-10-29_8-26-55_3.png";
// @ts-ignore
import img3 from "../assets/articians_web/CR2025-10-29_8-26-55_4.png";

const IMAGES = [img1, img2, img3];

export const ArtisanConnectModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-5xl bg-[#0C0C0C] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[110] w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-2 text-center items-center">
                <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-violet-500/80 mb-1">
                  Full-Stack Showcase
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight">
                  Artisan Connect Platform
                </h2>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  Ecommerce · Backend · Frontend
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {IMAGES.map((src, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]"
                  >
                    <img 
                      src={src} 
                      alt={`Artisan Connect Screenshot ${idx + 1}`} 
                      className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">
                        View 0{idx + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-4 text-center border-t border-white/5 pt-6">
                <div className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 max-w-2xl mx-auto">
                  <p className="text-[9px] md:text-[10px] text-white/30 leading-relaxed italic">
                    <span className="text-violet-400/60 font-bold not-italic mr-1">Project Note:</span> 
                    This platform features a robust artisan-to-customer connection system with integrated database setup and real-time inventory management.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-[8px] uppercase tracking-[0.5em] text-white/10">
                  <ImageIcon size={10} />
                  Visual System Breakdown
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </AnimatePresence>
  );
};
