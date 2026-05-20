import { FC, useRef } from "react";
import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./Buttons";
import { SectionHeading } from "./SectionHeading";

export const AboutSection: FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen px-6 sm:px-12 md:px-20 py-24 sm:py-32 md:py-40 flex items-center bg-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.03] bg-noise mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          <FadeIn y={35} delay={0}>
            <div className="relative">
              <SectionHeading
                eyebrow="Profile / 01"
                title="About Me"
                meta="Designer-minded developer building sharp visual systems and usable digital experiences."
              />

              <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
                {["Developing", "Web Design", "AI Systems"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/70 sm:text-xs hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn y={30} delay={0.12}>
            <div className="relative">
              <div className="absolute -left-4 top-4 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-transparent via-white/[0.15] to-transparent sm:-left-8" />
              <div className="absolute -left-[18.5px] top-4 h-2 w-2 rounded-full bg-primary sm:-left-[34px]" />

              <div className="relative pl-6 sm:pl-10">
                <div className="flex max-w-xl flex-col gap-10 sm:gap-12">
                  <AnimatedText
                    className="text-[#D7E2EA] font-medium leading-relaxed"
                    style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)" } as any}
                    text="With a passion for AI, futuristic design, and immersive digital experiences, I focus on building intelligent products that blend creativity with real-world impact. From AI-powered tools to cinematic web experiences, I enjoy crafting projects that feel innovative, memorable, and visually striking. My goal is to create technology that not only works seamlessly but leaves a lasting impression."
                  />

                  <div className="grid max-w-md grid-cols-3 gap-6 sm:gap-8">
                    {[
                      [`${new Date().getFullYear() - 2023}+`, "Years"],
                      ["20+", "Projects"],
                      ["∞", "Ideas"],
                    ].map(([value, label]) => (
                      <div key={label} className="border-t border-white/10 pt-4 sm:pt-5">
                        <div className="font-serif text-3xl font-normal text-primary sm:text-4xl">
                          {value}
                        </div>
                        <div className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.25em]">
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

