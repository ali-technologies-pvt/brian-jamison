import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';
import { BROKER_INFO } from '../data/realEstateData';

interface InteriorHeroVideoProps {
  kicker?: string;
  title: string;
  subtitle: string;
  categoryLabel?: string;
  categorySlug?: string;
  heroVideoUrl: string;
  heroFallbackImage: string;
  metrics?: { label: string; value: string }[];
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const InteriorHeroVideo: React.FC<InteriorHeroVideoProps> = ({
  title,
  subtitle,
  heroVideoUrl,
  heroFallbackImage,
  onOpenConsultation,
  onOpenValuation
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [heroVideoUrl]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full min-h-[68vh] lg:min-h-[74vh] flex items-center overflow-hidden border-b border-[#E6E2DA] bg-[#FAF9F6]">
      {/* Background Video Engine: Warm Sunlit Golden-Hour Drone */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={heroVideoUrl}
          poster={heroFallbackImage}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-85'
          }`}
        />
        {/* Warm Filmic Scrim: Sunlit warmth with deep graphite contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D21]/85 via-[#1B1D21]/50 to-amber-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D21]/80 via-transparent to-black/25" />
      </div>

      {/* Hero Content: Clean, Breathable, Luxury Editorial */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-16 lg:pt-36 lg:pb-20 text-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* License & Authority Marker (Clean & Minimalist) */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-6 shadow-xs">
            <BrianAvatar
              size={22}
              priority={true}
              showStatusDot={true}
              alt="Brian Jamison - License #184931"
            />
            <span className="text-xs font-sans font-medium text-stone-200 tracking-wide flex items-center gap-2">
              <span className="font-semibold text-white">Brian Jamison</span>
              <span className="text-white/40">·</span>
              <span className="text-[#B38F68] font-semibold">{BROKER_INFO.license}</span>
              <span className="text-white/40 hidden sm:inline">·</span>
              <span className="text-stone-300 hidden sm:inline">Salt Real Estate Corporate Office</span>
            </span>
          </div>

          {/* Heading: Pure Editorial Playfair Display */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold !text-white leading-[1.14] tracking-tight mb-5 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            {title}
          </h1>

          {/* Description: Clean, Legible DM Sans */}
          <p className="font-sans text-base sm:text-lg !text-stone-200 leading-relaxed mb-8 max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {subtitle}
          </p>

          {/* Exactly 2 CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-7 py-3.5 bg-[#B38F68] hover:bg-[#9E7A56] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#B38F68]/35 hover:shadow-xl hover:scale-[1.02] cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-7 py-3.5 bg-black/40 hover:bg-[#FAF9F6] hover:text-[#1B1D21] text-white border border-white/30 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Request Confidential Appraisal
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Audio Toggle (Discreet in Bottom Right) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 shadow-md text-stone-200 hover:text-white text-[11px] transition-all cursor-pointer"
        title={isMuted ? "Unmute Ambient Atmosphere" : "Mute Sound"}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-stone-300" />
            <span className="hidden sm:inline font-sans font-medium">Unmute Atmosphere</span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-[#B38F68]" />
            <span className="hidden sm:inline font-sans font-medium text-[#B38F68]">Audio Active</span>
          </>
        )}
      </button>
    </section>
  );
};
