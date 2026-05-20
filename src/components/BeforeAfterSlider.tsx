import { useRef, useState, useCallback, FC } from "react";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: FC<BeforeAfterSliderProps> = ({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}) => {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - left) / width) * 100));
    setPos(pct);
  }, []);

  const bubbleVariants = {
    animate: {
      y: [0, -8, 0],
      scale: [1, 1.02, 1],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl cursor-ew-resize select-none border border-black/5"
      style={{ aspectRatio: "16/9" }}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) updatePos(e.touches[0].clientX); }}
      onTouchEnd={() => (dragging.current = false)}
    >

      <img
        src={afterSrc}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
      />


      <img
        src={beforeSrc}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />


      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/50 backdrop-blur-sm pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/20"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 12h10M7 12l3-3M7 12l3 3M17 12l-3-3M17 12l-3 3"
              stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>


      <motion.span 
        variants={bubbleVariants}
        animate="animate"
        className="absolute top-6 left-6 text-[10px] md:text-xs font-bold text-white bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 pointer-events-none uppercase tracking-widest shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
      >
        {beforeLabel}
      </motion.span>
      <motion.span 
        variants={bubbleVariants}
        animate="animate"
        className="absolute top-6 right-6 text-[10px] md:text-xs font-bold text-white bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/20 pointer-events-none uppercase tracking-widest shadow-[0_8px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/10"
      >
        {afterLabel}
      </motion.span>
    </div>
  );
}
