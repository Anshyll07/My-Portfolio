import { FC, useRef } from "react";
import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./Buttons";
import { SectionHeading } from "./SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";

export const AboutSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const float1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const float2Y = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const float3Y = useTransform(scrollYProgress, [0, 1], [50, -40]);
  const float4Y = useTransform(scrollYProgress, [0, 1], [-30, 60]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 flex items-center bg-[#0C0C0C] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-64 right-[6%] h-[520px] w-[760px] rounded-full bg-gradient-to-r from-[#B600A8]/10 via-[#22d3ee]/8 to-transparent blur-3xl" />
        <div className="absolute -bottom-64 left-[4%] h-[520px] w-[760px] rounded-full bg-gradient-to-r from-[#BE4C00]/10 via-[#7621B0]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] bg-noise mix-blend-overlay" />
      </div>

      <motion.div
        style={{ y: float1Y }}
        className="absolute top-[4%] left-[-8%] z-0 opacity-35 sm:left-[3%] sm:top-[6%] sm:opacity-100 md:left-[5%]"
      >
        <FadeIn x={-40} delay={0.12} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon Icon"
            className="w-[110px] sm:w-[150px] md:w-[200px] opacity-55"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </FadeIn>
      </motion.div>

      <motion.div
        style={{ y: float2Y }}
        className="absolute top-[6%] right-[-10%] z-0 opacity-35 sm:right-[4%] sm:top-[8%] sm:opacity-100 md:right-[6%]"
      >
        <FadeIn x={50} delay={0.18} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego Icon"
            className="w-[110px] sm:w-[150px] md:w-[200px] opacity-60"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </FadeIn>
      </motion.div>

      <motion.div
        style={{ y: float3Y }}
        className="absolute bottom-[4%] left-[-8%] z-0 opacity-25 sm:bottom-[7%] sm:left-[8%] sm:opacity-100 md:left-[12%]"
      >
        <FadeIn x={-45} delay={0.24} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object"
            className="w-[90px] sm:w-[130px] md:w-[175px] opacity-40"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </FadeIn>
      </motion.div>

      <motion.div
        style={{ y: float4Y }}
        className="absolute bottom-[5%] right-[-10%] z-0 opacity-35 sm:bottom-[8%] sm:right-[7%] sm:opacity-100 md:right-[11%]"
      >
        <FadeIn x={45} delay={0.3} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[120px] sm:w-[160px] md:w-[215px] opacity-90"
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
          />
        </FadeIn>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 items-center">
          <FadeIn y={35} delay={0}>
            <div className="relative">
              <div className="hidden lg:flex absolute -left-8 top-3 flex-col items-center gap-3">
                <div className="vertical-rail text-[10px] uppercase tracking-[0.42em] opacity-40 font-bold">
                  about / profile
                </div>
                <div className="h-14 w-[1px] bg-white/15" />
              </div>

              <SectionHeading
                eyebrow="Profile / 01"
                title="About Me"
                meta="Designer-minded developer building sharp visual systems and usable digital experiences."
              />

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {["Developing", "Web Design", "AI Systems"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md sm:px-4 sm:text-xs sm:tracking-[0.24em]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn y={30} delay={0.12}>
            <div className="relative">
              <div className="absolute -left-3 top-4 h-[calc(100%-2rem)] w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent sm:-left-6" />
              <div className="absolute -left-4 top-4 h-2 w-2 rounded-full bg-[#B600A8] sm:-left-[29px]" />

              <div className="relative pl-4 sm:pl-8">
                <div className="flex max-w-xl flex-col gap-7 sm:gap-8">
                  <AnimatedText
                    className="text-[#D7E2EA] font-medium leading-relaxed"
                    style={{ fontSize: "clamp(0.98rem, 4vw, 1.35rem)" } as any}
                    text="With a passion for AI, futuristic design, and immersive digital experiences, I focus on building intelligent products that blend creativity with real-world impact. From AI-powered tools to cinematic web experiences, I enjoy crafting projects that feel innovative, memorable, and visually striking. My goal is to create technology that not only works seamlessly but leaves a lasting impression."
                  />

                  <div className="grid max-w-md grid-cols-3 gap-2 sm:gap-3">
                    {[
                      [`${new Date().getFullYear() - 2023}+`, "Years"],
                      ["20+", "Projects"],
                      ["∞", "Ideas"],
                    ].map(([value, label]) => (
                      <div key={label} className="border-t border-white/15 pt-3 sm:pt-4">
                        <div className="font-display text-2xl font-bold text-white sm:text-4xl">
                          {value}
                        </div>
                        <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/45 sm:text-[10px] sm:tracking-[0.24em]">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ContactButton className="w-fit" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
