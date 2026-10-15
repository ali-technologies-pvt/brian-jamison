import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowDown, Sparkles, Video, Volume2, VolumeX } from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';
import { EditableText } from '../components/EditableText';
import { useAdmin } from '../context/AdminContext';
import { StyleInspectorModal } from '../components/admin/StyleInspectorModal';

export interface InteriorHeroVideoProps {
  kicker?: string;
  title: string;
  subtitle: string;
  categoryLabel?: string;
  categorySlug?: string;
  heroVideoUrl?: string;
  heroFallbackImage?: string;
  metrics?: { label: string; value: string }[];
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
}

export const InteriorHeroVideo: React.FC<InteriorHeroVideoProps> = ({
  kicker = 'Oklahoma City Metro',
  title,
  subtitle,
  categoryLabel,
  categorySlug,
  heroVideoUrl = 'https://www.pexels.com/download/video/29383137/',
  heroFallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  metrics,
  onNavigate,
  onOpenConsultation,
  onOpenValuation,
  primaryCtaText = "What's My Home Worth?",
  secondaryCtaText = 'Schedule Consultation',
  onSecondaryCtaClick
}) => {
  const { isAdmin, isEditMode, getElementStyle } = useAdmin();
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate deterministic key for this page hero
  const slugKey = title.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 32);
  const elementKey = `hero_interior_${slugKey}`;
  const savedStyle = getElementStyle(elementKey);

  const videoSrc = savedStyle.backgroundVideo || heroVideoUrl;
  const videoPoster = savedStyle.videoPoster || heroFallbackImage;
  const overlayColor = savedStyle.overlayColor || '#001D40';
  const overlayOpacity = savedStyle.overlayOpacity !== undefined ? savedStyle.overlayOpacity : 50;
  const heroBgColor = savedStyle.backgroundColor || '#FAF9F6';

  // Video silent auto-playback assurance
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setVideoLoaded(true);
      }).catch(() => {
        // Fallback to poster
      });
    }
  }, [videoSrc]);

  // Default flagship stats fallback if no specific metrics given
  const defaultStats = [
    { value: '$70M+', label: 'Volume Sold' },
    { value: '370+', label: 'Career Closings' },
    { value: 'Top 2%', label: 'OKC Producer' },
    { value: '100%', label: 'Cancel-Anytime Pledge' },
  ];

  const statsToRender = metrics && metrics.length >= 2 ? metrics.slice(0, 4) : defaultStats;

  return (
    <section
      id="hero"
      style={{ backgroundColor: heroBgColor }}
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-0 overflow-hidden"
    >
      {/* Admin Floating Control for Hero Video & Overlays */}
      {isAdmin && isEditMode && (
        <div className="absolute top-24 left-6 z-30">
          <button
            type="button"
            onClick={() => setShowStyleModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide shadow-2xl border-2 border-white/80 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
            title="Change background video, poster image, and overlay colors"
          >
            <Video className="w-4 h-4 text-white" />
            <span>🎬 Change Background Video & Overlays</span>
          </button>
        </div>
      )}

      {/* Hero Video Background Engine (Identical to Homepage) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          onLoadedData={() => setVideoLoaded(true)}
          poster={videoPoster}
          className={`w-full h-full object-cover object-center scale-105 transform motion-safe:transition-opacity motion-safe:duration-1000 ${
            videoLoaded ? 'opacity-95' : 'opacity-80'
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-with-houses-and-gardens-41662-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ultra-Premium Cinematic Color Engine: Identical to Homepage */}
        <div
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
          }}
          className="absolute inset-0 transition-opacity"
        />
        <div className="absolute inset-0 bg-[#001D40]/50 mix-blend-multiply transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00142C]/90 via-[#001D40]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00142C]/95 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Main Hero Content constrained strictly inside max-w-[1440px] */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 pb-14 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Floating Authority Proof Trust Pill: Frosted crystal glass container */}
          <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/55 backdrop-blur-xl border border-white/25 shadow-xl shadow-black/30 mb-4 sm:mb-5">
            <BrianAvatar
              size={28}
              priority={true}
              showStatusDot={true}
              alt="Brian Jamison - Top 2% OKC Metro Real Estate Producer"
            />
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-sans font-semibold text-white tracking-wide">
              <span className="text-[#F59E0B]">★</span>
              <span className="text-white font-bold">Top 2% Producer</span>
              <span className="text-white/40">·</span>
              <span className="text-stone-200">Oklahoma City Metro</span>
              <span className="text-white/40 hidden sm:inline">·</span>
              <span className="text-stone-300 font-medium hidden sm:inline">{kicker}</span>
            </div>
          </div>

          {/* Display Headline: Bold luxury serif with inline editing support */}
          <div className="mb-6 sm:mb-7">
            <EditableText
              contentKey={`hero_title_${slugKey}`}
              initialContent={title}
              as="h1"
              className="animate-fade-in-delayed font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold leading-[1.08] tracking-tight !text-white text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Subtitle: High-contrast white font with inline editing support */}
          <div className="mb-8 sm:mb-9">
            <EditableText
              contentKey={`hero_subtitle_${slugKey}`}
              initialContent={subtitle}
              as="p"
              className="animate-fade-in-delayed-2 font-sans text-base sm:text-lg md:text-xl !text-white leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Action CTAs: Bespoke Luxury Styling with Warm Gold Shimmer & Frosted Glass */}
          <div className="animate-fade-in-delayed-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onOpenValuation}
              className="group relative px-8 py-4 text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#92400E] hover:from-[#B45309] hover:to-[#78350F] rounded-xl transition-all duration-300 shadow-xl shadow-amber-950/40 hover:shadow-amber-600/40 border border-amber-300/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <EditableText
                  contentKey={`hero_cta_val_${slugKey}`}
                  initialContent={primaryCtaText}
                  as="span"
                />
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            <button
              type="button"
              onClick={onSecondaryCtaClick || onOpenConsultation}
              className="group px-7 py-4 text-xs font-bold tracking-wider uppercase text-white bg-black/45 hover:bg-white hover:text-[#002D61] border border-white/35 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-xl"
            >
              <EditableText
                contentKey={`hero_cta_sec_${slugKey}`}
                initialContent={secondaryCtaText}
                as="span"
              />
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#002D61] group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Stats Strip Banner (Identical Full-Width 4-Column Layout) */}
      <div className="relative z-10 w-full bg-[#001D40]/95 border-t border-b border-white/20 backdrop-blur-md py-6 sm:py-8 shadow-lg text-white">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {statsToRender.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#FB923C] transition-colors duration-300 drop-shadow-xs">
                  <EditableText
                    contentKey={`hero_stat_num_${slugKey}_${idx}`}
                    initialContent={s.value}
                    as="span"
                  />
                </span>
                <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                  <EditableText
                    contentKey={`hero_stat_label_${slugKey}_${idx}`}
                    initialContent={s.label}
                    as="span"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Style & Video Inspector Modal */}
      {showStyleModal && (
        <StyleInspectorModal
          isOpen={showStyleModal}
          elementKey={elementKey}
          elementLabel={`Hero Section: ${title}`}
          initialStyle={{
            backgroundVideo: videoSrc,
            videoPoster: videoPoster,
            overlayColor: overlayColor,
            overlayOpacity: overlayOpacity,
            backgroundColor: heroBgColor,
          }}
          onClose={() => setShowStyleModal(false)}
        />
      )}
    </section>
  );
};

export default InteriorHeroVideo;
