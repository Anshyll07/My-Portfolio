import { FC } from "react";
import { motion } from "framer-motion";
import { Github, Youtube, Mail, Instagram } from "lucide-react";

// @ts-ignore
import knightImg from "../assets/knight.png";

export const KnightFooter: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0C0C0C] pt-24 pb-12 overflow-hidden border-t border-white/5">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-rose-600/10 blur-[100px] rounded-full" />
      </div>


      <motion.div
        initial={{ opacity: 0, x: 60, y: 40 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 z-0 pointer-events-none hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[750px] lg:h-[750px] xl:w-[850px] xl:h-[850px]"
        >
          <img
            src={knightImg}
            alt="The Knight"
            className="w-full h-full object-contain object-bottom filter drop-shadow-[0_0_40px_rgba(182,0,168,0.25)] brightness-90 contrast-110"
            loading="lazy"
          />

          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0C0C0C] to-transparent" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tighter text-[#D7E2EA] mb-6 leading-[0.9]">
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B600A8] to-[#7621B0]">Future</span>
          </h2>

          <p className="max-w-md text-white/50 text-base sm:text-lg leading-relaxed mb-10">
            Fusing cutting-edge technology with cinematic design to create digital experiences that resonate.
          </p>

          <div className="flex items-center gap-6 mb-10">
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
                className="p-4 bg-white/5 border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon size={20} className="transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>


          <nav className="relative z-20 mb-8">
            <ul className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4">
              {["Home", "About", "Arsenal", "Expertise", "Projects"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-white/40 hover:text-[#B600A8] transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#B600A8] transition-all group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>


        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            Made in {currentYear} by Dhairya
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/10">Made in India</span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
};
