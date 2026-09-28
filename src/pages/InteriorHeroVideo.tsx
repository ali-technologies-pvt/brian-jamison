import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronRight, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';

interface InteriorHeroVideoProps {
  kicker: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  categorySlug?: string;
  heroVideoUrl: string;
  heroFallbackImage: string;
  metrics?: { label: string; value: string }[];
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const InteriorHeroVideo: React.FC<InteriorHeroVideoProps> = ({
  kicker,
  title,
  subtitle,
  categoryLabel,
  heroVideoUrl,
  heroFallbackImage,
  metrics,
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [heroVideoUrl]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] flex items-center overflow-hidden border-b border-[#E5A93C]/30">
      {/* Background Video Engine */}
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
            videoLoaded ? 'opacity-100' : 'opacity-80'
          }`}
        />
        {/* Luminous Light-Blue Primary Color Overlay Engine: Reduced opacity so video is prominent and vibrant */}
        <div className="absolute inset-0 bg-[#002D61]/35 mix-blend-multiply transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001D40]/85 via-[#002D61]/50 to-[#0284C7]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/90 via-transparent to-black/35" />
      </div>

      {/* Hero Content (Restrained to max-w-[1440px]) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-20 text-white">
        <div className="max-w-3xl">
          {/* Breadcrumb Navigation: Crisp high-contrast white text */}
          <nav className="flex items-center gap-2 text-xs font-sans text-stone-100 mb-5 tracking-wide drop-shadow-xs">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer font-semibold"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-stone-200 font-semibold">{categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-white/70" />
            <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">{title}</span>
          </nav>

          {/* Floating Trust Pill & Authority Proof */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-md">
              <BrianAvatar
                size={28}
                priority={true}
                showStatusDot={true}
                alt="Brian Jamison - Top 2% OKC Metro Real Estate Producer"
              />
              <span className="text-[11px] font-sans font-bold text-white tracking-wide flex items-center gap-1">
                <span className="text-[#FB923C]">★</span>
                <span>Top 2% OKC Metro Producer</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/25 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#FB923C]">
                {kicker}
              </span>
            </div>
          </div>

          {/* Page Title: Extra Bold Pure White with High-Contrast Drop Shadow */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold !text-white leading-[1.12] tracking-tight mb-5 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
            {title}
          </h1>

          {/* Plain English Subtitle: Pure White Font to Avoid Blending with Background */}
          <p className="font-sans text-base sm:text-lg !text-white leading-relaxed mb-8 max-w-2xl font-medium drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-orange-600/40 hover:shadow-orange-600/60 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-6 py-3.5 bg-black/40 hover:bg-white hover:text-[#002D61] text-white border border-white/35 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
            >
              Request Confidential Appraisal
            </button>
          </div>

          {/* Hero Metrics Badges (if provided) */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/20">
              {metrics.map((m, idx) => (
                <div key={idx} className="bg-black/40 backdrop-blur-md border border-white/25 rounded-xl p-3.5 shadow-md">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-wider !text-stone-200 block drop-shadow-xs">
                    {m.label}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-extrabold !text-white tabular-nums drop-shadow-xs">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Video Micro-Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/25 rounded-full px-3 py-1.5 shadow-lg text-white">
        <button
          onClick={togglePlay}
          className="p-1.5 text-white hover:text-[#FB923C] transition-colors cursor-pointer"
          title={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
          aria-label={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <span className="text-white/40 text-xs">|</span>
        <button
          onClick={toggleMute}
          className="p-1.5 text-white hover:text-[#FB923C] transition-colors cursor-pointer"
          title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          aria-label={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white pl-1 hidden sm:inline">
          Ambient HD
        </span>
      </div>
    </section>
  );
};
