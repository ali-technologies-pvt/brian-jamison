import React, { useState, useEffect, useRef } from 'react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { ArrowDown, Shield, Sparkles } from 'lucide-react';

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
              volume: Math.floor(easeOut * 62),
              closings: Math.floor(easeOut * 370),
              percent: Math.floor(easeOut * 2),
              pledge: Math.floor(easeOut * 100),
            });

            if (progress < 1) {
              requestAnimationFrame(animateCounts);
            } else {
              setCounts({
                volume: 62,
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

        {/* 
          Warm Alabaster Linen architectural scrim:
          Balances 4.5:1 text contrast while preserving sunlit, golden-hour luxury warmth.
          No dark theme or zebra striping.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/96 via-[#FAF9F6]/88 to-[#FAF9F6]/55 lg:to-transparent transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]/40" />
      </div>

      {/* Main Hero Content constrained strictly inside max-w-[1440px] */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-14 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Floating Authority Proof Trust Pill: 28px mini avatar with emerald live-status verification dot */}
          <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#E5A93C]/30 shadow-xs mb-4 sm:mb-5">
            <BrianAvatar
              size={28}
              priority={true}
              showStatusDot={true}
              alt="Brian Jamison - Top 2% OKC Metro Real Estate Producer"
            />
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-semibold text-[#0A192F] tracking-wide">
              <span className="text-[#E5A93C]">★</span>
              <span>Top 2% OKC Metro Real Estate Producer</span>
              <span className="text-[#E5A93C]/50 hidden sm:inline">·</span>
              <span className="text-[#6B7280] font-normal hidden sm:inline">$62M+ Volume Sold</span>
            </div>
          </div>

          {/* Kicker badge with subtle entrance animation */}
          <div className="animate-fade-in-up flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C] animate-ping" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#E5A93C]">
              The One-And-Only Seller Blueprint in Oklahoma
            </span>
          </div>

          {/* Display Headline with Playfair Serif, Italic Accent and subtle staggered fade */}
          <h1 className="animate-fade-in-delayed font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-[#0A192F] mb-6 sm:mb-8 text-balance">
            The Agent Who Works Like Every Deal Is{' '}
            <span className="italic font-normal text-[#E5A93C] pr-1 inline-block transition-transform hover:scale-105 duration-300">
              Personal.
            </span>
          </h1>

          {/* Subtitle with staggered animation */}
          <p className="animate-fade-in-delayed-2 font-sans text-base sm:text-lg md:text-xl text-[#6B7280] leading-relaxed max-w-xl mb-8 sm:mb-10 font-normal">
            Elevating Oklahoma City home sales through cinematic marketing, uncompromised transparency, and zero-risk listing agreements.
          </p>

          {/* Action CTAs with subtle hover elevate physics */}
          <div className="animate-fade-in-delayed-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-7 py-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#E5A93C] hover:bg-[#C5902B] rounded-md transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
            >
              Request Bespoke Valuation
            </button>

            <button
              type="button"
              onClick={onExploreMethod}
              className="group px-7 py-4 text-xs font-semibold tracking-wider uppercase text-[#0A192F] bg-white/85 hover:bg-white border border-[#E5A93C]/30 hover:border-[#0A192F] rounded-md transition-all duration-300 backdrop-blur-xs flex items-center justify-center gap-2.5 cursor-pointer text-center shadow-xs hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Explore The Method</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#E5A93C] group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        Live Stats Strip Banner:
        Full width section, but inner content is strictly constrained inside 1440px.
        Dynamic live count-up transitions for $62M+, 370+ Closings, Top 2% Producer, and 100% Cancel-Anytime Pledge.
      */}
      <div
        ref={statsRef}
        className="relative z-10 w-full bg-[#FAF9F6]/95 border-t border-b border-[#E5A93C]/30 backdrop-blur-sm py-6 sm:py-8"
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#E5A93C]/20">
            {/* Stat 1: Volume */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A192F] tracking-tight tabular-nums group-hover:text-[#E5A93C] transition-colors duration-300">
                ${counts.volume}M+
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans text-[#6B7280] mt-1.5">
                Volume Sold
              </span>
            </div>

            {/* Stat 2: Closings */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A192F] tracking-tight tabular-nums group-hover:text-[#E5A93C] transition-colors duration-300">
                {counts.closings}+
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans text-[#6B7280] mt-1.5">
                Career Closings
              </span>
            </div>

            {/* Stat 3: Rank */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A192F] tracking-tight tabular-nums group-hover:text-[#E5A93C] transition-colors duration-300">
                Top {counts.percent}%
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans text-[#6B7280] mt-1.5">
                OKC Producer
              </span>
            </div>

            {/* Stat 4: Guarantee */}
            <div className="flex flex-col items-center justify-center px-3 pt-3 sm:pt-0 group cursor-default">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A192F] tracking-tight tabular-nums group-hover:text-[#E5A93C] transition-colors duration-300">
                {counts.pledge}%
              </span>
              <span className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-sans text-[#6B7280] mt-1.5">
                Cancel-Anytime Pledge
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
