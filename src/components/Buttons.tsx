import { FC } from "react";

export const ContactButton: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <a
      id="contact-button"
      href="mailto:dhai.agarwal@gmail.com"
      className={`inline-block rounded-full uppercase font-medium tracking-widest text-[#FFFFFF] transition-transform hover:scale-105 active:scale-95 text-center ${className}`}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
        padding: "clamp(0.75rem, 1.25vw, 1rem) clamp(2rem, 3.5vw, 3rem)",
        fontSize: "clamp(0.75rem, 1.1vw, 1rem)",
        textDecoration: "none",
      }}
    >
      Contact Me
    </a>
  );
};

export const LiveProjectButton: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <button
      id="live-project-button"
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors ${className}`}
      style={{
        padding: "clamp(0.6rem, 1.1vw, 0.85rem) clamp(1.8rem, 3.2vw, 2.5rem)",
        fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
      }}
    >
      Live Project
    </button>
  );
};
