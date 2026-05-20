import { FC } from "react";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";

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

  return (
    <section
      id="arsenal"
      className="relative overflow-hidden bg-[#0C0C0C] px-5 py-24 sm:px-8 sm:py-32 md:px-10 md:py-40"
    >

      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />




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
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] border"
                      style={{
                        color: catColor,
                        borderColor: `${catColor}30`,
                        background: `${catColor}08`,
                      }}
                    >
                      {category}
                    </span>
                    <div className="flex-1 h-px max-w-xs" style={{ background: `linear-gradient(to right, ${catColor}30, transparent)` }} />
                  </div>


                  <div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4"
                  >
                    {items.map((item) => (
                      <div
                        key={item.name}
                      >
                        <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">

                          <div
                            className="absolute left-0 top-0 bottom-0 w-px opacity-40 group-hover:opacity-80 transition-opacity duration-400"
                            style={{
                              background: `linear-gradient(to bottom, transparent, ${item.color}, transparent)`,
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
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
