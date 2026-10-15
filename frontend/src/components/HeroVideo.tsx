import React, { useState, useEffect, useRef } from 'react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { ArrowDown, ArrowRight, Award, Video, Palette } from 'lucide-react';
import { EditableText } from './EditableText';
import { useAdmin } from '../context/AdminContext';
import { StyleInspectorModal } from './admin/StyleInspectorModal';

interface HeroVideoProps {
  onOpenValuation: () => void;
  onExploreMethod: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onOpenValuation,
  onExploreMethod
}) => {
  const { isAdmin, isEditMode, contentMap, getElementStyle } = useAdmin();
  const [showHeroMediaModal, setShowHeroMediaModal] = useState(false);

  const heroStyle = getElementStyle('hero_video_section');
  const videoSrc = heroStyle.backgroundVideo || contentMap['home_hero_video_src'] || 'https://www.pexels.com/download/video/29383137/';
  const videoPoster = heroStyle.videoPoster || contentMap['home_hero_video_poster'] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';
  const overlayColor = heroStyle.overlayColor || contentMap['home_hero_overlay_color'] || '#001D40';
  const overlayOpacity = heroStyle.overlayOpacity !== undefined ? heroStyle.overlayOpacity : (Number(contentMap['home_hero_overlay_opacity']) || 50);
  const heroBgColor = heroStyle.backgroundColor || contentMap['home_hero_bg_color'] || '#FAF9F6';

  const [counts, setCounts] = useState({
    volume: 0,
    closings: 0,
    percent: 0,
    pledge: 0,
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video auto-playback assurance: silently loops without any UI controls or play button
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().then(() => {
        setVideoLoaded(true);
      }).catch(() => {
        // Fallback gracefully to video still poster
      });
    }
  }, []);

  // Intersection Observer for the live stat counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800; // ms
          const startTime = performance.now();

          const animateCounts = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCounts({
              volume: Math.floor(easeOut * 70),
              closings: Math.floor(easeOut * 370),
              percent: Math.floor(easeOut * 2),
              pledge: Math.floor(easeOut * 100),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setCounts({
                volume: 70,
                closings: 370,
                percent: 2,
                pledge: 100,
              });
            }
          };

          requestAnimationFrame(animateCounts);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

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
            onClick={() => setShowHeroMediaModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide shadow-2xl border-2 border-white/80 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
            title="Change background video, poster image, and overlay colors"
          >
            <Video className="w-4 h-4 text-white" />
            <span>🎬 Change Background Video & Overlays</span>
          </button>
        </div>
      )}

      {/* Hero Video Background Engine */}
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
          {/* Dynamic Video Source */}
          <source src={videoSrc} type="video/mp4" />
          {/* Architectural drone estate fallback source */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-with-houses-and-gardens-41662-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* 
          Ultra-Premium Cinematic Color Engine:
          Customizable overlay color & opacity
        */}
        <div
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity / 100,
          }}
          className="absolute inset-0 transition-opacity"
        />
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
              <span className="text-stone-300 font-medium hidden sm:inline">$70M+ Volume Sold</span>
            </div>
          </div>

          {/* Display Headline: Bold luxury serif with inline editing support */}
          <div className="mb-6 sm:mb-7">
            <EditableText
              contentKey="home_hero_title"
              initialContent="The Agent Who Works Like Every Deal Is Personal."
              as="h1"
              className="animate-fade-in-delayed font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold leading-[1.08] tracking-tight !text-white text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Subtitle: High-contrast white font with inline editing support */}
          <div className="mb-8 sm:mb-9">
            <EditableText
              contentKey="home_hero_subtitle"
              initialContent="I help Oklahoma City, Edmond and Nichols Hills homeowners sell for top dollar with professional video, real marketing, and a listing you can cancel anytime."
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
                  contentKey="hero_btn_valuation_text"
                  initialContent="What&apos;s My Home Worth?"
                  as="span"
                />
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            <button
              type="button"
              onClick={onExploreMethod}
              className="group px-7 py-4 text-xs font-bold tracking-wider uppercase text-white bg-black/45 hover:bg-white hover:text-[#001D40] border border-white/35 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 backdrop-blur-xl"
            >
              <EditableText
                contentKey="hero_btn_services_text"
                initialContent="Explore 3 Major Services"
                as="span"
              />
              <ArrowDown className="w-3.5 h-3.5 text-white group-hover:text-[#001D40] group-hover:translate-y-1 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        Live Stats Strip Banner:
        Full width section, inner content constrained strictly inside 1440px.
        Dynamic live count-up transitions for $70M+, 370+ Closings, Top 2% Producer, and 100% Cancel-Anytime Pledge.
      */}
      <div
        ref={statsRef}
        className="relative z-10 w-full bg-[#001D40]/95 border-t border-b border-white/20 backdrop-blur-md py-6 sm:py-8 shadow-lg text-white"
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {/* Stat 1: Volume */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#FB923C] transition-colors duration-300 drop-shadow-xs">
                $<EditableText contentKey="stat_volume_num" initialContent={String(counts.volume)} as="span" />M+
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                <EditableText contentKey="stat_volume_label" initialContent="Volume Sold" as="span" />
              </span>
            </div>

            {/* Stat 2: Closings */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#FB923C] transition-colors duration-300 drop-shadow-xs">
                <EditableText contentKey="stat_closings_num" initialContent={String(counts.closings)} as="span" />+
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                <EditableText contentKey="stat_closings_label" initialContent="Career Closings" as="span" />
              </span>
            </div>

            {/* Stat 3: Rank */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#FB923C] transition-colors duration-300 drop-shadow-xs">
                Top <EditableText contentKey="stat_rank_num" initialContent={String(counts.percent)} as="span" />%
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                <EditableText contentKey="stat_rank_label" initialContent="OKC Producer" as="span" />
              </span>
            </div>

            {/* Stat 4: Guarantee */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#FB923C] transition-colors duration-300 drop-shadow-xs">
                <EditableText contentKey="stat_pledge_num" initialContent={String(counts.pledge)} as="span" />%
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                <EditableText contentKey="stat_pledge_label" initialContent="Cancel-Anytime Pledge" as="span" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Style & Video Inspector Modal */}
      {showHeroMediaModal && (
        <StyleInspectorModal
          isOpen={showHeroMediaModal}
          elementKey="hero_video_section"
          elementLabel="Homepage Hero Background Video, Poster & Overlays"
          initialStyle={{
            backgroundVideo: videoSrc,
            videoPoster: videoPoster,
            overlayColor: overlayColor,
            overlayOpacity: overlayOpacity,
            backgroundColor: heroBgColor,
          }}
          onClose={() => setShowHeroMediaModal(false)}
        />
      )}
    </section>
  );
};
