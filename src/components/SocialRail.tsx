import { FC } from "react";
import { Github, Youtube, Instagram, Mail } from "lucide-react";

export const SocialRail: FC = () => {
  return (
    <div
      className="fixed right-0 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-40 flex flex-col items-center gap-4 py-4 px-2 md:py-6 md:px-3"
      style={{
        background: "#000000",
        borderTop: "0.5px solid rgba(255,255,255,0.1)",
        borderLeft: "0.5px solid rgba(255,255,255,0.1)",
        borderBottom: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: "1.5rem 0 0 1.5rem",
      }}
    >
      {[
        { icon: Github, href: "https://github.com/Anshyll07", label: "GitHub" },
        { icon: Youtube, href: "https://www.youtube.com/@Bullet_and_Blood", label: "YouTube" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Mail, href: "mailto:dhai.agarwal@gmail.com", label: "Email" },
      ].map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 group"
          aria-label={social.label}
        >
          <social.icon size={18} className="transition-transform group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
};
