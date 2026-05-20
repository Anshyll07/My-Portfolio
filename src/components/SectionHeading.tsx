import { FC } from "react";
import { FadeIn } from "./FadeIn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  meta?: string;
  className?: string;
};

export const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  align = "left",
  tone = "dark",
  meta,
  className = "",
}) => {
  const isLight = tone === "light";
  const words = title.split(" ");
  const textColor = isLight ? "text-[#0C0C0C]" : "text-[#D7E2EA]";
  const mutedColor = isLight ? "text-[#0C0C0C]/45" : "text-white/45";
  const ruleColor = isLight ? "bg-[#0C0C0C]/20" : "bg-white/20";
  const ghostColor = isLight ? "text-[#0C0C0C]/[0.035]" : "text-white/[0.035]";

  return (
    <FadeIn y={30} delay={0.02} className={className}>
      <div
        className={`relative ${
          align === "center" ? "mx-auto text-center items-center" : "items-start"
        } flex max-w-full flex-col gap-3 sm:gap-4`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -top-5 left-1/2 hidden -translate-x-1/2 select-none font-display text-7xl font-extrabold uppercase leading-none sm:block sm:text-8xl md:text-9xl ${ghostColor}`}
        >
          {words[0]}
        </span>

        <div
          className={`relative flex max-w-full items-center gap-2 sm:gap-3 ${
            align === "center" ? "justify-center" : "justify-start"
          }`}
        >
          <span className={`h-px w-6 shrink-0 sm:w-10 ${ruleColor}`} />
          <span
            className={`min-w-0 text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.32em] ${mutedColor}`}
          >
            {eyebrow}
          </span>
          <span className={`h-px w-6 shrink-0 sm:w-10 ${ruleColor}`} />
        </div>

        <h2
          className={`relative max-w-full font-display font-extrabold uppercase leading-[0.94] tracking-normal mt-4 text-balance ${textColor}`}
        >
          <span className="block text-[clamp(1.5rem,8vw,5.75rem)] md:text-8xl lg:text-9xl">
            {words.map((word, index) => (
              <span key={`${word}-${index}`} className="inline-block mr-[0.16em]">
                {word}
              </span>
            ))}
          </span>
        </h2>

        {meta && (
          <p
            className={`relative max-w-xl text-sm leading-relaxed sm:text-base ${
              align === "center" ? "mx-auto" : ""
            } ${isLight ? "text-[#0C0C0C]/55" : "text-white/55"}`}
          >
            {meta}
          </p>
        )}
      </div>
    </FadeIn>
  );
};
