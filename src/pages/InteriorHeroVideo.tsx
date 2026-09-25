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
        {/* Warm-sand light gradient overlay for 100% legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/85 to-[#FAF9F6]/65 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]/40" />
      </div>

      {/* Hero Content (Restrained to max-w-[1440px]) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-3xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-sans text-[#6B7280] mb-5 tracking-wide">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-[#E5A93C] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
            <span className="text-[#6B7280]">{categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-[#A8A29E]" />
            <span className="text-[#0A192F] font-medium truncate max-w-[200px] sm:max-w-none">{title}</span>
          </nav>

          {/* Floating Trust Pill & Authority Proof */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border border-[#E5A93C]/30 shadow-xs">
              <BrianAvatar
                size={28}
                priority={true}
                showStatusDot={true}
                alt="Brian Jamison - Top 2% OKC Metro Real Estate Producer"
              />
              <span className="text-[11px] font-sans font-semibold text-[#0A192F] tracking-wide flex items-center gap-1">
                <span className="text-[#E5A93C]">★</span>
                <span>Top 2% OKC Metro Producer</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#E5A93C]/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#E5A93C]">
                {kicker}
              </span>
            </div>
          </div>

          {/* Page Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0A192F] leading-[1.12] tracking-tight mb-5">
            {title}
          </h1>

          {/* Plain English Subtitle */}
          <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8 max-w-2xl font-normal">
            {subtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-[#E5A93C] hover:bg-[#C5902B] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-6 py-3.5 bg-white hover:bg-[#F5EFE6] text-[#0A192F] border border-[#E5A93C]/30 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer"
            >
              Request Confidential Appraisal
            </button>
          </div>

          {/* Hero Metrics Badges (if provided) */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E5A93C]/30">
              {metrics.map((m, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-xs border border-[#E5A93C]/30 rounded-xl p-3 shadow-2xs">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#6B7280] block">
                    {m.label}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#0A192F]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Video Micro-Controls (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-[#FAF9F6]/85 backdrop-blur-md border border-[#E5A93C]/30 rounded-full px-3 py-1.5 shadow-md">
        <button
          onClick={togglePlay}
          className="p-1.5 text-[#0A192F] hover:text-[#E5A93C] transition-colors cursor-pointer"
          title={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
          aria-label={isPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <div className="w-[1px] h-3 bg-[rgba(229,169,60,0.3)]" />
        <button
          onClick={toggleMute}
          className="p-1.5 text-[#0A192F] hover:text-[#E5A93C] transition-colors cursor-pointer"
          title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
          aria-label={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
        <span className="text-[10px] font-sans uppercase tracking-wider text-[#6B7280] pl-1 hidden sm:inline">
          Ambient HD
        </span>
      </div>
    </section>
  );
};
