import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Royalty-free emotional/cinematic instrumental (Pixabay CDN, license: Pixabay Content License)
// "Cinematic Documentary Violins" — somber, fitting the satirical-serious tone.
const BGM_SRC = "https://cdn.pixabay.com/download/audio/2022/10/18/audio_31c2730e64.mp3?filename=cinematic-documentary-violins-piano-115348.mp3";

export const BgmPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const a = new Audio(BGM_SRC);
    a.loop = true;
    a.volume = 0.35;
    a.muted = true;
    audioRef.current = a;
    a.play().catch(() => {/* autoplay blocked, user must click */});
    const hideHint = setTimeout(() => setShowHint(false), 6000);
    return () => {
      clearTimeout(hideHint);
      a.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    const next = !muted;
    a.muted = next;
    if (!next) a.play().catch(() => {});
    setMuted(next);
    setShowHint(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3">
      <AnimatePresence>
        {showHint && muted && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-card/90 backdrop-blur-md border border-primary/40 rounded-full shadow-gold text-xs font-serif italic text-muted-foreground"
          >
            <Music className="w-3 h-3 text-primary" />
            Unmute for the full mood
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-12 h-12 rounded-full gradient-gold text-primary-foreground flex items-center justify-center shadow-gold border border-primary/60"
        aria-label={muted ? "Unmute background music" : "Mute background music"}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        {!muted && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/60 animate-ping" />
        )}
      </motion.button>
    </div>
  );
};
