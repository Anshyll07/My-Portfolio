import { FC, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Music, User, Drum, Guitar, Eye,  } from "lucide-react";

// @ts-ignore
import background_music_path from "../assets/audio_seperator_data/background_music_only.wav";
// @ts-ignore
import drums_path from "../assets/audio_seperator_data/drums.wav";
// @ts-ignore
import guitar_path from "../assets/audio_seperator_data/guitar.wav";
// @ts-ignore
import vocals_path from "../assets/audio_seperator_data/vocals.wav";

interface AudioFile {
  name: string;
  label: string;
  icon: any;
  path: string;
}

const AUDIO_FILES: AudioFile[] = [
  { name: "Vocals", label: "Vocals Only", icon: User, path: vocals_path },
  { name: "Drums", label: "Drums Only", icon: Drum, path: drums_path },
  { name: "Guitar", label: "Guitar Only", icon: Guitar, path: guitar_path },
  { name: "Backing", label: "Background Music", icon: Music, path: background_music_path },
];

export const AudioSeparatorModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [revealed, setRevealed] = useState(false);
  
  const handleClose = () => {
    setRevealed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-3xl bg-[#0C0C0C] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-[110] w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="flex flex-col gap-6 md:gap-7">
              <div className="flex flex-col gap-2 text-center items-center">
                <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-rose-500/80 mb-1">
                  Stem Extraction Demo
                </div>
                
                <div className="relative">
                  <h2 className={`text-xl md:text-2xl font-display font-bold text-white transition-all duration-700 ${!revealed ? 'blur-md select-none' : 'blur-0'}`}>
                    {revealed ? "Shape of You" : "Secret Masterpiece"}
                  </h2>
                  {!revealed && (
                    <button 
                      onClick={() => setRevealed(true)}
                      className="absolute inset-0 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/90 hover:text-rose-400 transition-colors"
                    >
                      <Eye size={12} /> Reveal
                    </button>
                  )}
                </div>
                
                {revealed && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-white/40 uppercase tracking-[0.2em]"
                  >
                    Ed Sheeran · 2017
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                {AUDIO_FILES.map((file, idx) => (
                  <AudioTrack key={file.name} file={file} index={idx} />
                ))}
              </div>

              <div className="flex flex-col gap-3 text-center border-t border-white/5 pt-4">
                <div className="px-5 py-2 rounded-xl bg-white/[0.03] border border-white/5 max-w-2xl mx-auto">
                  <p className="text-[9px] md:text-[10px] text-white/30 leading-relaxed italic">
                    <span className="text-rose-400/60 font-bold not-italic mr-1">Note:</span> 
                    Certain stems may contain periods of silence or lower volume corresponding to the original arrangement and song length.
                  </p>
                </div>
                <div className="text-[8px] uppercase tracking-[0.5em] text-white/10">
                  AI Surgical Extraction Framework
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AudioTrack: FC<{ file: AudioFile; index: number }> = ({ file }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = new Audio(file.path);
    audioRef.current = audio;
    
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('timeupdate', () => setProgress(audio.currentTime));
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [file.path]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !audioRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clickX = clientX - left;
    const seekPct = Math.max(0, Math.min(1, clickX / width));
    
    audioRef.current.currentTime = seekPct * duration;
    setProgress(seekPct * duration);
  };

  return (
    <div className="group flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-rose-500/20 hover:border-rose-500/30 hover:text-rose-400 transition-all active:scale-95"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} className="ml-0.5" fill="currentColor" />}
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest">{file.name}</span>
            <span className="text-[9px] text-white/30 uppercase tracking-tighter">{file.label}</span>
          </div>
        </div>
        
        <div className="text-[10px] font-mono text-white tabular-nums font-bold">
          {formatTime(progress)} / {formatTime(duration)}
        </div>
      </div>

      <div 
        ref={containerRef}
        onClick={handleSeek}
        className="relative h-12 w-full cursor-pointer flex items-center gap-[3px]"
      >
        {Array.from({ length: 40 }).map((_, i) => {
          const isActive = (i / 40) <= (progress / duration);
          const baseHeight = [40, 60, 30, 80, 50, 70, 40, 90, 60, 30, 50, 40, 70, 30, 60, 40, 50, 80, 30, 40, 60, 50, 70, 30, 40, 80, 60, 40, 30, 70, 50, 90, 40, 60, 30, 50, 40, 70, 30, 40][i];
          
          return (
            <motion.div 
              key={i}
              initial={false}
              animate={{ 
                height: isPlaying ? `${baseHeight}%` : "10%",
                backgroundColor: isActive ? 'rgba(244, 63, 94, 0.8)' : 'rgba(255, 255, 255, 0.05)',
                opacity: isPlaying ? 1 : 0.3
              }}
              transition={{
                height: { 
                  duration: isPlaying ? 0.3 : 0.6,
                  repeat: isPlaying ? Infinity : 0,
                  repeatType: "reverse",
                  delay: i * 0.02
                },
                backgroundColor: { duration: 0.2 }
              }}
              className="flex-1 rounded-full"
              style={{ 
                boxShadow: isActive && isPlaying ? '0 0 10px rgba(244, 63, 94, 0.2)' : 'none'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
