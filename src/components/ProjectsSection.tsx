import { FC, useState, useRef } from "react";
import { FadeIn } from "./FadeIn";
import { SectionHeading } from "./SectionHeading";
import { motion } from "framer-motion";
import { AudioSeparatorModal } from "./AudioSeparatorModal";
import { ArtisanConnectModal } from "./ArtisanConnectModal";
import { MagneticButton } from "./MagneticButton";
import { Play, Eye } from "lucide-react";

// @ts-ignore
import crystalImg from "../assets/projects_crystal.png";
// @ts-ignore
import dnaImg from "../assets/project_dna.png";
// @ts-ignore
import audioImg from "../assets/project_audio.png";
// @ts-ignore
import trafficImg from "../assets/project_traffic.png";

interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  accent: string;
  link: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    name: "AI Skin Analysis",
    category: "Healthcare",
    year: "2025",
    description:
      "Real-time dermatological analysis powered by computer vision — detecting conditions and delivering clinical-grade insights.",
    accent: "from-emerald-500/20 to-emerald-500/0",
    link: "https://github.com/Anshyll07/AI-Skin-Analysis",
    image: dnaImg,
  },
  {
    id: "02",
    name: "Artisan Connect",
    category: "Ecommerce Platform",
    year: "2025",
    description:
      "A platform designed to connect artisans with customers, showcasing unique handcrafted products and supporting traditional craftsmanship with full backend and frontend development with database setup in mysql database.",
    accent: "from-violet-500/20 to-violet-500/0",
    link: "https://github.com/Anshyll07/takneev5",
    image: crystalImg,
  },
  {
    id: "03",
    name: "Audio Separator",
    category: "AI Audio",
    year: "2023",
    description:
      "Isolate vocals, instruments, and ambience from any audio source with surgical precision using state-of-the-art models.",
    accent: "from-rose-500/20 to-rose-500/0",
    link: "https://github.com/Anshyll07/Audio-Separator",
    image: audioImg,
  },
  {
    id: "04",
    name: "Smart Traffic System",
    category: "Automation",
    year: "2023",
    description:
      "Adaptive traffic orchestration that reads live city data and dynamically reroutes flow to cut commute times.",
    accent: "from-amber-500/20 to-amber-500/0",
    link: "https://github.com/Anshyll07/Smart-Traffic-Light-System",
    image: trafficImg,
  },
];

export const ProjectsSection: FC = () => {
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isArtisanModalOpen, setIsArtisanModalOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);


  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen px-6 sm:px-12 md:px-20 py-24 sm:py-32 md:py-40 bg-[#0C0C0C] overflow-hidden"
    >
      <AudioSeparatorModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />
      <ArtisanConnectModal
        isOpen={isArtisanModalOpen}
        onClose={() => setIsArtisanModalOpen(false)}
      />


      <div className="absolute inset-0 opacity-[0.03] bg-noise pointer-events-none" />



      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="mb-12 sm:mb-20">
          <SectionHeading
            eyebrow="Work / 04"
            title="Projects"
            meta="A selection of intelligent tools and immersive experiences built with precision and purpose."
          />
        </div>


        <div className="flex flex-col gap-12 sm:gap-16">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 1;
            const accentColors: Record<string, string> = {
              "01": "#10b981",
              "02": "#8b5cf6",
              "03": "#f43f5e",
              "04": "#f59e0b",
            };
            const accent = accentColors[project.id] || "#B600A8";


            const imgPosition = isEven
              ? "left-[-8%] sm:left-[-6%] bottom-[-18%] sm:bottom-[-22%]"
              : "right-[-8%] sm:right-[-6%] top-[-18%] sm:top-[-22%]";

            return (
              <FadeIn key={project.id} y={40} delay={0.08 + idx * 0.1}>

                <div
                  className={`relative transition-opacity duration-500 ${
                    hoveredId !== null && hoveredId !== project.id ? "opacity-30" : "opacity-100"
                  }`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >

                  <motion.div
                    className={`absolute ${imgPosition} z-[1] pointer-events-none hidden sm:block`}
                  >
                    <motion.img
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 5 + idx, repeat: Infinity, ease: "easeInOut" }}
                      src={project.image}
                      alt=""
                      className="w-[280px] md:w-[380px] lg:w-[460px] xl:w-[520px] opacity-[0.2]"
                      style={{ filter: `drop-shadow(0 0 30px ${accent}10)` }}
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>


                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.1]"
                  >

                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] sm:w-[4px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
                      }}
                    />





                    <div
                      className={`absolute ${isEven ? 'right-4 sm:right-10' : 'left-4 sm:left-10'} top-1/2 -translate-y-1/2 pointer-events-none select-none`}
                    >
                      <span
                        className="font-display font-black uppercase leading-none text-white/[0.025] group-hover:text-white/[0.05] transition-colors duration-700"
                        style={{ fontSize: "clamp(8rem, 22vw, 20rem)" }}
                      >
                        {project.id}
                      </span>
                    </div>


                    <div className={`relative z-10 p-6 sm:p-10 md:p-14 ${isEven ? 'md:pl-[30%]' : 'md:pl-[6%]'}`}>

                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] border"
                          style={{
                            color: accent,
                            borderColor: `${accent}30`,
                            background: `${accent}08`,
                          }}
                        >
                          {project.category}
                        </span>
                        <span className="text-[10px] font-medium text-white/25 tracking-wider">
                          {project.year}
                        </span>
                      </div>


                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#D7E2EA] mb-4 sm:mb-6 tracking-tight leading-[1.1] group-hover:text-white transition-colors duration-300">
                        {project.name}
                      </h3>





                      <p className="text-sm sm:text-base text-white/45 leading-relaxed max-w-lg mb-8 group-hover:text-white/65 transition-colors duration-300">
                        {project.description}
                      </p>


                      <div className="flex flex-wrap items-center gap-3">
                        <MagneticButton>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] text-white/80 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                          >
                            View Project
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            >
                              <path
                                d="M1 11L11 1M11 1H3.5M11 1V8.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </motion.a>
                        </MagneticButton>

                        {project.id === "03" && (
                          <MagneticButton>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsAudioModalOpen(true);
                              }}
                              className="flex items-center gap-2 px-4 py-3 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/25 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-rose-300 transition-all"
                            >
                              <Play size={12} fill="currentColor" />
                              Live Demo
                            </motion.button>
                          </MagneticButton>
                        )}

                        {project.id === "02" && (
                          <MagneticButton>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsArtisanModalOpen(true);
                              }}
                              className="flex items-center gap-2 px-4 py-3 bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/25 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-violet-300 transition-all"
                            >
                              <Eye size={12} />
                              View Work
                            </motion.button>
                          </MagneticButton>
                        )}
                      </div>
                    </div>
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
