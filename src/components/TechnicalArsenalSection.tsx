import { FC, useRef } from "react";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

// @ts-ignore
import arsenalToolkit from "../assets/arsenal_toolkit.png";
// @ts-ignore
import arsenalSphere from "../assets/arsenal_sphere.png";
// @ts-ignore
import arsenalCube from "../assets/arsenal_cube.png";

type TechItem = {
  name: string;
  iconSrc?: string;
  iconAlt?: string;
  color: string;
  category: string;
};

const TECH_STACK: TechItem[] = [
  {
    name: "HTML5",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    iconAlt: "HTML5",
    color: "#f97316",
    category: "Frontend",
  },
  {
    name: "CSS3",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    iconAlt: "CSS3",
    color: "#0ea5e9",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    iconAlt: "JavaScript",
    color: "#facc15",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    iconAlt: "TypeScript",
    color: "#60a5fa",
    category: "Frontend",
  },
  {
    name: "React",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    iconAlt: "React",
    color: "#22d3ee",
    category: "Frontend",
  },
  {
    name: "Tailwind",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    iconAlt: "Tailwind",
    color: "#2dd4bf",
    category: "Frontend",
  },
  {
    name: "Python",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    iconAlt: "Python",
    color: "#3b82f6",
    category: "AI/ML",
  },
  {
    name: "TensorFlow",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    iconAlt: "TensorFlow",
    color: "#fbbf24",
    category: "AI/ML",
  },
  {
    name: "Keras",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
    iconAlt: "Keras",
    color: "#ef4444",
    category: "AI/ML",
  },
  {
    name: "OpenCV",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    iconAlt: "OpenCV",
    color: "#8b5cf6",
    category: "AI/ML",
  },
  {
    name: "YOLOv8",
    color: "#d946ef",
    category: "AI/ML",
  },
  {
    name: "Ultralytics",
    color: "#06b6d4",
    category: "AI/ML",
  },
  {
    name: "Git",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    iconAlt: "Git",
    color: "#fb7185",
    category: "Tooling",
  },
  {
    name: "Docker",
    iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    iconAlt: "Docker",
    color: "#38bdf8",
    category: "Tooling",
  },
];

const CATEGORIES = ["Frontend", "AI/ML", "Tooling"] as const;
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#22d3ee",
  "AI/ML": "#8b5cf6",
  Tooling: "#f43f5e",
};

export const TechnicalArsenalSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const toolkitY = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const toolkitRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const sphereY = useTransform(scrollYProgress, [0, 1], [-50, 70]);
  const cubeY = useTransform(scrollYProgress, [0, 1], [60, -50]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28"
    >

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-1/2 -translate-x-1/2 h-[520px] w-[980px] rounded-full bg-gradient-to-r from-cyan-500/8 via-indigo-500/6 to-fuchsia-500/8 blur-3xl" />
        <div className="absolute -bottom-56 left-[10%] h-[520px] w-[720px] rounded-full bg-gradient-to-r from-fuchsia-500/8 via-sky-500/6 to-cyan-500/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] bg-noise mix-blend-overlay" />
      </div>


      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[-6%] sm:left-[1%] top-[6%] z-[1] pointer-events-none hidden sm:block"
      >
        <motion.div style={{ y: toolkitY, rotate: toolkitRotate }}>
          <motion.img
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            src={arsenalToolkit}
            alt=""
            className="w-[280px] md:w-[380px] lg:w-[460px] xl:w-[520px] opacity-[0.3]"
            style={{ filter: "drop-shadow(0 0 50px rgba(34,211,238,0.15))" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-cyan-500/8 blur-[80px] rounded-full" />
        </motion.div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-[-6%] sm:right-[2%] top-[3%] z-[1] pointer-events-none hidden md:block"
      >
        <motion.div style={{ y: sphereY }}>
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src={arsenalSphere}
            alt=""
            className="w-[220px] lg:w-[320px] xl:w-[400px] opacity-[0.25]"
            style={{ filter: "drop-shadow(0 0 40px rgba(34,211,238,0.12))" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 w-[60%] h-[25%] bg-indigo-500/6 blur-[60px] rounded-full" />
        </motion.div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-[-4%] sm:left-[5%] bottom-[3%] z-[1] pointer-events-none hidden md:block"
      >
        <motion.div style={{ y: cubeY }}>
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src={arsenalCube}
            alt=""
            className="w-[200px] lg:w-[280px] xl:w-[340px] opacity-[0.25]"
            style={{ filter: "drop-shadow(0 0 40px rgba(139,92,246,0.12))" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-[-8%] left-1/2 -translate-x-1/2 w-[60%] h-[25%] bg-violet-500/6 blur-[60px] rounded-full" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">

        <FadeIn y={30} delay={0.05}>
          <div className="mb-14 sm:mb-20">
            <SectionHeading
              eyebrow="Stack / 02"
              title="Technical Arsenal"
              meta="Tools and frameworks I use to design, build, and ship high-impact products."
            />
          </div>
        </FadeIn>


        <div className="flex flex-col gap-10 sm:gap-14">
          {CATEGORIES.map((category, catIdx) => {
            const catColor = CATEGORY_COLORS[category];
            const items = TECH_STACK.filter((t) => t.category === category);

            return (
              <FadeIn key={category} y={30} delay={0.1 + catIdx * 0.08}>
                <div className="relative">

                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] border backdrop-blur-md"
                      style={{
                        color: catColor,
                        borderColor: `${catColor}30`,
                        background: `${catColor}10`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: catColor }}
                      />
                      {category}
                    </span>
                    <div className="flex-1 h-px max-w-xs" style={{ background: `linear-gradient(to right, ${catColor}30, transparent)` }} />
                  </div>


                  <motion.div
                    initial={isMobile ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                      },
                    }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
                  >
                    {items.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={{
                          hidden: { opacity: 0, y: 20, scale: 0.95 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
                          },
                        }}
                      >
                        <div className="group relative overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/[0.07] bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/[0.12]"
                          style={{
                            boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.04)",
                          }}
                        >

                          <div
                            className="absolute left-0 top-0 bottom-0 w-[2px] opacity-40 group-hover:opacity-80 transition-opacity duration-400"
                            style={{
                              background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`,
                            }}
                          />


                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${item.color}08, transparent 70%)`,
                            }}
                          />

                          <div className="relative flex flex-col items-center justify-center gap-3 px-3 py-5 sm:gap-4 sm:px-4 sm:py-6">
                            {item.iconSrc ? (
                              <img
                                src={item.iconSrc}
                                alt={item.iconAlt ?? item.name}
                                className="h-8 w-8 sm:h-10 sm:w-10 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                              />
                            ) : (
                              <div
                                className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ borderColor: item.color }}
                              >
                                <span
                                  className="text-[10px] sm:text-xs font-bold"
                                  style={{ color: item.color }}
                                >
                                  {item.name.slice(0, 2)}
                                </span>
                              </div>
                            )}

                            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/70 group-hover:text-white/90 transition-colors duration-300 text-center">
                              {item.name}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
