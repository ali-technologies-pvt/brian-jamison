import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PremiumPreloaderProps {
  durationMs?: number;
  onFinish?: () => void;
}

export const PremiumPreloader: React.FC<PremiumPreloaderProps> = ({
  durationMs = 1000,
  onFinish
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start progress fill immediately
    const startTimer = setTimeout(() => {
      setProgress(100);
    }, 40);

    // Fade out at exact durationMs (1000ms)
    const endTimer = setTimeout(() => {
      setVisible(false);
    }, durationMs);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [durationMs]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#00142C] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none"
        >
          {/* Subtle Ambient Radial Light Aura */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 48%, rgba(234, 88, 12, 0.16) 0%, rgba(0, 45, 97, 0.45) 45%, transparent 75%)'
            }}
          />

          {/* Delicate Architectural Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '48px 48px'
            }}
          />

          {/* Central Luxury Emblem & Brand Showcase */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
            {/* Animated Crest Icon */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6"
            >
              {/* Outer Golden Halo Ring */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-[#EA580C]/40 flex items-center justify-center p-1.5 shadow-[0_0_35px_rgba(234,88,12,0.25)]">
                {/* Inner Navy Disc with Monogram */}
                <div className="w-full h-full rounded-full bg-gradient-to-b from-[#002D61] to-[#00142C] border border-white/20 flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-white">
                    BJ
                  </span>
                  <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-[#FB923C] font-bold">
                    SALT
                  </span>
                </div>
              </div>

              {/* Orbiting Shimmer Pulse */}
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#EA580C] animate-ping opacity-75" />
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[0.14em] uppercase drop-shadow-md">
                Brian Jamison
              </h1>
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <span className="h-px w-6 bg-[#EA580C]/60" />
                <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.3em] uppercase text-[#FB923C]">
                  Salt Real Estate
                </span>
                <span className="h-px w-6 bg-[#EA580C]/60" />
              </div>
              <p className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] text-white/50 uppercase pt-1">
                Edmond & Greater Oklahoma City
              </p>
            </motion.div>

            {/* Precision 1-Second Progress Indicator */}
            <div className="w-48 sm:w-56 mt-8 relative">
              {/* Progress Track */}
              <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#EA580C] via-[#FB923C] to-white rounded-full transition-all ease-out"
                  style={{
                    width: `${progress}%`,
                    transitionDuration: `${durationMs - 120}ms`
                  }}
                />
              </div>

              {/* Micro Status Label */}
              <div className="flex items-center justify-between text-[9px] font-sans font-semibold text-white/45 tracking-[0.18em] uppercase mt-2.5">
                <span className="flex items-center gap-1.5 text-[#FB923C]">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                  <span>Curating Experience</span>
                </span>
                <span>{progress === 100 ? '100%' : 'Loading'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

