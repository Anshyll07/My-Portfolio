import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, FC, useState, useEffect } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: FC<AnimatedTextProps> = ({ text, className = "", style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });
  
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Check on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, i) => {
        return (
          <span key={i} className="inline-block mr-[0.25em]">
            {word.split("").map((char, j) => {
              const charIndex = text.indexOf(word) + j;
              const start = charIndex / text.length;
              const end = (charIndex + 1) / text.length;

              return <Character key={j} progress={scrollYProgress} range={[start, end]} char={char} />;
            })}
          </span>
        );
      })}
    </p>
  );
};

interface CharacterProps {
  progress: any;
  range: [number, number];
  char: string;
}

const Character: FC<CharacterProps> = ({ progress, range, char }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative">
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};
