import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Play } from "lucide-react";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { SectionHeading } from "./SectionHeading";

// Image imports
import before1 from "../assets/before1.png";
import after1 from "../assets/after1.png";
import before2 from "../assets/before2.png";
import after2 from "../assets/after2.png";

interface PreviewItem {
  url: string;
  type: "image" | "video" | "slider";
  beforeUrl?: string;
  afterUrl?: string;
}

interface ServiceDetails {
  id: string;
  name: string;
  shortPara: string;
  technologies: string[];
  previews?: PreviewItem[];
}

const SERVICES: ServiceDetails[] = [
  {
    id: "01",
    name: "AI & Automation",
    shortPara:
      "I specialize in building intelligent systems that streamline workflows. From custom LLM integrations to automated content pipelines, I leverage AI to solve complex problems and enhance productivity.",
    technologies: ["Python", "OpenAI API", "Google Api", "Keras", "n8n", "Tensorflow", "CV"],
  },
  {
    id: "02",
    name: "Frontend Development",
    shortPara:
      "Creating highly interactive and performant web applications. I focus on pixel-perfect designs, smooth animations, and robust architecture using modern frontend frameworks.",
    technologies: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Vite"],
    previews: [
      {
        url: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
        type: "image",
      },
      {
        url: "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
        type: "image",
      },
      {
        url: "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
        type: "image",
      }
    ],
  },
  {
    id: "03",
    name: "Photo Editing",
    shortPara:
      "Professional-grade visual storytelling through advanced post-processing. I create high-impact composites and color-graded visuals that elevate brand identity and digital presence.",
    technologies: ["Adobe Photoshop", "Lightroom", "After Effects", "Midjourney"],
    previews: [
      {
        url: "",
        type: "slider",
        beforeUrl: before1,
        afterUrl: after1,
      },
      {
        url: "",
        type: "slider",
        beforeUrl: before2,
        afterUrl: after2,
      }
    ],
  },
];

export const ServicesSection: FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [previewItem, setPreviewItem] = useState<ServiceDetails | null>(null);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  const previewList = previewItem?.previews ?? [];


  useEffect(() => {
    if (previewItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [previewItem]);

  const handleOpenPreview = (service: ServiceDetails) => {
    setPreviewItem(service);
    setActivePreviewIndex(0);
  };

  const nextPreview = () => {
    if (previewList.length > 1) {
      setActivePreviewIndex((prev) => (prev + 1) % previewList.length);
    }
  };

  const prevPreview = () => {
    if (previewList.length > 1) {
      setActivePreviewIndex((prev) => (prev - 1 + previewList.length) % previewList.length);
    }
  };

  return (
    <section id="expertise" className="relative z-20 rounded-t-[32px] bg-black px-6 py-24 sm:rounded-t-[50px] sm:px-12 sm:py-32 md:rounded-t-[60px] md:px-20 md:py-40 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <SectionHeading
          eyebrow="Services / 03"
          title="Expertise"
          align="center"
          meta="Focused capabilities for automation, frontend experiences, and visual production."
          className="mb-16 sm:mb-24 md:mb-32"
        />

        <div className="w-full max-w-5xl">
          {SERVICES.map((service) => (
            <div key={service.id} className="border-t border-white/10 last:border-b overflow-hidden">
              <div className="group">
                <button
                  onClick={() => setOpenId(openId === service.id ? null : service.id)}
                  className="flex w-full flex-col items-start gap-4 py-8 text-left transition-colors hover:bg-white/[0.02] sm:py-12 md:flex-row md:items-center md:gap-12 md:py-16"
                >
                  <span className="min-w-[88px] font-serif leading-none text-white/20 md:min-w-[120px]"
                    style={{ fontSize: "clamp(2.5rem, 12vw, 80px)" }}>
                    {service.id}
                  </span>
                  <div className="flex w-full flex-1 items-center justify-between gap-6">
                    <h3 className="font-medium uppercase tracking-wide leading-tight text-white/90 group-hover:text-primary transition-colors"
                      style={{ fontSize: "clamp(1.1rem, 5vw, 1.8rem)" }}>
                      {service.name}
                    </h3>
                    <motion.div
                      animate={{ rotate: openId === service.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/30 group-hover:text-primary/70 transition-colors"
                    >
                      <ChevronDown size={28} strokeWidth={1.5} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openId === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                        opacity: { duration: 0.3 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-7 pb-10 md:gap-8 md:pb-12 md:pl-[160px]">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          className="flex flex-col gap-6"
                        >
                          <p className="max-w-2xl text-base font-light leading-relaxed text-white/60 sm:text-lg md:text-xl">
                            {service.shortPara}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, idx) => (
                              <motion.span
                                key={tech}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 + (idx * 0.05), duration: 0.3 }}
                                className="px-4 py-1.5 border border-white/[0.08] bg-white/[0.02] rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-widest text-white/50"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>

                        {(service.previews?.length ?? 0) > 0 && (
                          <motion.button
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            onClick={() => handleOpenPreview(service)}
                            className="group/btn flex w-fit items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/80 transition-all hover:bg-primary hover:text-black hover:border-primary sm:px-8 sm:py-4"
                          >
                            Show Preview ({service.previews?.length})
                            <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 transition-transform group-hover/btn:scale-110 group-hover/btn:bg-black/20">
                              {service.previews?.[0]?.type === "video" ? (
                                <Play size={14} fill="currentColor" />
                              ) : (
                                <ChevronDown size={14} className="-rotate-90" />
                              )}
                            </div>

                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>


      <AnimatePresence>
        {previewItem && previewList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md"
            onClick={() => setPreviewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full bg-[#0C0C0C] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={24} />
              </button>

              {previewList.length > 1 && (
                <>
                  <button
                    onClick={prevPreview}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors group"
                  >
                    <ChevronDown size={32} className="rotate-90 transition-transform group-hover:-translate-x-1" />
                  </button>
                  <button
                    onClick={nextPreview}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors group"
                  >
                    <ChevronDown size={32} className="-rotate-90 transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              )}

              <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePreviewIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {previewList[activePreviewIndex].type === "video" ? (
                      <video
                        src={previewList[activePreviewIndex].url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : previewList[activePreviewIndex].type === "slider" ? (
                      <div className="w-full h-full p-6 md:p-12 flex items-center justify-center">
                        <BeforeAfterSlider
                          beforeSrc={previewList[activePreviewIndex].beforeUrl || ""}
                          afterSrc={previewList[activePreviewIndex].afterUrl || ""}
                          beforeLabel="Before Color Grading"
                          afterLabel="After Color Grading"
                        />
                      </div>
                    ) : (
                      <img
                        src={previewList[activePreviewIndex].url}
                        alt={`${previewItem.name} Proof ${activePreviewIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>


                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/70 text-sm font-medium">
                  {activePreviewIndex + 1} / {previewList.length}
                </div>
              </div>

              <div className="p-8 md:p-10 border-t border-white/5 bg-[#0C0C0C]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h4 className="text-white font-display font-bold uppercase text-2xl md:text-3xl mb-2">
                      {previewItem.name}
                    </h4>
                    <p className="text-white/60 font-light text-lg">
                      Showcase item {activePreviewIndex + 1} of {previewList.length} for {previewItem.name.toLowerCase()}.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {previewList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePreviewIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${idx === activePreviewIndex ? 'bg-primary w-8' : 'bg-white/20 hover:bg-white/40'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
