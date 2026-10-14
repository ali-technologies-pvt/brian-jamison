import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronRight, Sparkles, Shield, ArrowRight, Phone } from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';
import { SocialLinks } from '../components/SocialLinks';
import { BROKER_INFO } from '../data/realEstateData';

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
  categorySlug,
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
    <section className="relative w-full min-h-[72vh] lg:min-h-[78vh] flex items-center overflow-hidden border-b border-[#E6E2DA] bg-[#FAF9F6]">
      {/* Background Video Engine: Golden-Hour Warmth */}
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
        {/* Warm Sunlit Filmic Scrim: Preserves Golden Hour Lighting while delivering high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D21]/88 via-[#1B1D21]/55 to-amber-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D21]/90 via-transparent to-black/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent opacity-10" />
      </div>

      {/* Hero Content (Restrained to max-w-[1440px]) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-32 pb-16 lg:pt-36 lg:pb-20 text-white">
        <div className="max-w-3xl">
          {/* Breadcrumb Navigation: Crisp high-contrast stone text */}
          <nav className="flex items-center gap-2 text-xs font-sans text-stone-200 mb-5 tracking-wide drop-shadow-xs">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer font-semibold"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <button
              onClick={() => {
                if (categorySlug) onNavigate(categorySlug);
                else if (categoryLabel.toLowerCase().includes('service') || categoryLabel.toLowerCase().includes('blueprint')) onNavigate('/services');
                else if (categoryLabel.toLowerCase().includes('communit')) onNavigate('/areas');
                else onNavigate('/');
              }}
              className="text-stone-300 hover:text-white transition-colors cursor-pointer font-semibold"
            >
              {categoryLabel}
            </button>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="text-[#B38F68] font-bold truncate max-w-[200px] sm:max-w-none">{title}</span>
          </nav>

          {/* Authority Proof Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 shadow-sm">
              <BrianAvatar
                size={28}
                priority={true}
                showStatusDot={true}
                alt="Brian Jamison - Top 2% OKC Metro Real Estate Producer"
              />
              <span className="text-[11px] font-sans font-bold text-white tracking-wide flex items-center gap-1.5">
                <span className="text-[#B38F68]">★</span>
                <span>Top 2% Producer</span>
                <span className="text-white/40">·</span>
                <span className="text-stone-300 font-normal">{BROKER_INFO.license}</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-[#B38F68]/50 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#B38F68]" />
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#B38F68]">
                {kicker}
              </span>
            </div>
          </div>

          {/* Page Title: Serif Editorial Masterpiece */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold !text-white leading-[1.12] tracking-tight mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            {title}
          </h1>

          {/* Subtitle: High legibility warm sand font */}
          <p className="font-sans text-base sm:text-lg !text-stone-200 leading-relaxed mb-8 max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {subtitle}
          </p>

          {/* Action CTAs in Warm Camel Tan & Oat */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-[#B38F68] hover:bg-[#9E7A56] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#B38F68]/35 hover:shadow-[#B38F68]/50 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-6 py-3.5 bg-black/40 hover:bg-[#FAF9F6] hover:text-[#1B1D21] text-white border border-white/30 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Request Confidential Appraisal
            </button>
            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white border border-white/20 text-xs font-semibold transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#B38F68]" />
              <span>{BROKER_INFO.phone}</span>
            </a>
          </div>

          {/* Official Verification Social Links Strip */}
          <div className="pt-5 border-t border-white/20 flex flex-wrap items-center gap-4">
            <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-stone-300">
              Verified Portals:
            </span>
            <SocialLinks variant="hero" />
          </div>

          {/* Hero Metrics Badges (if provided) */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/15">
              {metrics.map((m, idx) => (
                <div key={idx} className="bg-black/45 backdrop-blur-md border border-white/20 rounded-xl p-3.5 shadow-sm">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-wider !text-stone-300 block">
                    {m.label}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold !text-white tabular-nums drop-shadow-xs">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Video Micro-Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/55 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 shadow-md text-white">
        <button
          onClick={togglePlay}
          className="p-1 text-white hover:text-[#B38F68] transition-colors cursor-pointer"
          title={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
          aria-label={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <span className="text-white/30 text-xs">|</span>
        <button
          onClick={toggleMute}
          className="p-1 text-white hover:text-[#B38F68] transition-colors cursor-pointer"
          title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          aria-label={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-stone-300 pl-1 hidden sm:inline">
          Ambient 4K
        </span>
      </div>
    </section>
  );
};
