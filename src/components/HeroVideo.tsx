import React, { useState, useEffect, useRef } from 'react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { ArrowDown, ArrowRight, Award } from 'lucide-react';
import { EditableText } from './EditableText';

interface HeroVideoProps {
  onOpenValuation: () => void;
  onExploreMethod: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onOpenValuation,
  onExploreMethod
}) => {
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
    <section id="hero" className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-0 overflow-hidden bg-[#FAF9F6]">
      {/* 
        Hero Video Background Engine:
        Full-bleed background featuring requested high-quality video (https://www.pexels.com/download/video/29383137/).
        Plays automatically, silently (muted), seamlessly looped.
        Strictly zero play buttons, zero controls, zero WordPress artifacts.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          onLoadedData={() => setVideoLoaded(true)}
          poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          className={`w-full h-full object-cover object-center scale-105 transform motion-safe:transition-opacity motion-safe:duration-1000 ${
            videoLoaded ? 'opacity-95' : 'opacity-80'
          }`}
        >
          {/* User's specified high-definition video source */}
          <source
            src="https://www.pexels.com/download/video/29383137/"
            type="video/mp4"
          />
          {/* High-reliability architectural drone estate fallback source */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-with-houses-and-gardens-41662-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Warm Filmic Scrim: Sunlit warmth with deep graphite contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D21]/88 via-[#1B1D21]/55 to-amber-950/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D21]/90 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Main Hero Content constrained strictly inside max-w-[1440px] */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 pb-14 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* 1. License & Authority Badge */}
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

          {/* 2. Heading */}
          <div className="mb-6 sm:mb-7">
            <EditableText
              contentKey="home_hero_title"
              initialContent="The Agent Who Works Like Every Deal Is Personal."
              as="h1"
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold leading-[1.08] tracking-tight !text-white text-balance drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* 3. Description */}
          <div className="mb-8 sm:mb-9">
            <EditableText
              contentKey="home_hero_subtitle"
              initialContent="I help Oklahoma City, Edmond and Nichols Hills homeowners sell for top dollar with professional video, real marketing, and a listing you can cancel anytime."
              as="p"
              className="font-sans text-base sm:text-lg md:text-xl !text-stone-200 leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* 4. Exactly 2 Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-8 py-4 bg-[#B38F68] hover:bg-[#9E7A56] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#B38F68]/35 hover:shadow-2xl hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-3 text-center"
            >
              <span>What&apos;s My Home Worth?</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onExploreMethod}
              className="px-8 py-4 bg-black/40 hover:bg-[#FAF9F6] hover:text-[#1B1D21] text-white backdrop-blur-md border border-white/30 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2.5 text-center"
            >
              <span>Explore The 6-Step Blueprint</span>
              <ArrowDown className="w-3.5 h-3.5" />
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
        className="relative z-10 w-full bg-[#1B1D21]/95 border-t border-b border-white/15 backdrop-blur-md py-6 sm:py-8 shadow-lg text-white"
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {/* Stat 1: Volume */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#B38F68] transition-colors duration-300 drop-shadow-xs">
                ${counts.volume}M+
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                Volume Sold
              </span>
            </div>

            {/* Stat 2: Closings */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#B38F68] transition-colors duration-300 drop-shadow-xs">
                {counts.closings}+
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                Career Closings
              </span>
            </div>

            {/* Stat 3: Rank */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#B38F68] transition-colors duration-300 drop-shadow-xs">
                Top {counts.percent}%
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                OKC Producer
              </span>
            </div>

            {/* Stat 4: Guarantee */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold !text-white tracking-tight tabular-nums group-hover:text-[#B38F68] transition-colors duration-300 drop-shadow-xs">
                {counts.pledge}%
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans font-bold !text-stone-100 mt-1.5">
                Cancel-Anytime Pledge
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
