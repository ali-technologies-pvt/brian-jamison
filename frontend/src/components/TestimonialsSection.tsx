import React, { useState, useEffect, useRef } from 'react';
import {
  GOOGLE_REVIEWS,
  GOOGLE_REVIEWS_GMB_URL,
  ZILLOW_REVIEWS,
  ZILLOW_REVIEWS_URL,
  BROKER_INFO,
  GoogleReview,
  ZillowReview
} from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import {
  Star,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenConsultation?: () => void;
  initialExpandAll?: boolean;
}

// Google Official 4-Color 'G' Logo SVG
export const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      fill="#4285F4"
    />
    <path
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      fill="#34A853"
    />
    <path
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.02 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      fill="#FBBC05"
    />
    <path
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      fill="#EA4335"
    />
  </svg>
);

// Zillow Official House & 'Z' Logo SVG
export const ZillowLogoIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L2 10.2H5.2V20.5H18.8V10.2H22L12 2Z"
      fill="#006AFF"
    />
    <path
      d="M9 16.2H15V15H11.2L15 11.2V10H9V11.2H12.8L9 15V16.2Z"
      fill="white"
    />
  </svg>
);

interface UnifiedReviewItem {
  id: string;
  author: string;
  authorBadge?: string;
  rating: number;
  review: string;
  date: string;
  initials: string;
  bgColor: string;
  verifiedCategory: string;
  highlight: string;
  platform: 'google' | 'zillow';
  isLocalGuide?: boolean;
  serviceType?: string;
  platformUrl: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenConsultation,
}) => {
  // 2 Major Source Platform Tabs: 'google' vs 'zillow'
  const [activePlatform, setActivePlatform] = useState<'google' | 'zillow'>('google');

  // Sub-category filters
  const [googleFilter, setGoogleFilter] = useState<'all' | 'seller' | 'buyer' | 'guide'>('all');
  const [zillowFilter, setZillowFilter] = useState<'all' | 'seller' | 'buyer' | 'repeat'>('all');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Normalized review lists for seamless UI rendering
  const activeReviews: UnifiedReviewItem[] = React.useMemo(() => {
    if (activePlatform === 'google') {
      return GOOGLE_REVIEWS.filter((item) => {
        if (googleFilter === 'all') return true;
        if (googleFilter === 'seller') {
          return item.verifiedCategory === 'Seller' || item.verifiedCategory === 'Repeat Client' || item.verifiedCategory === 'Investor';
        }
        if (googleFilter === 'buyer') return item.verifiedCategory === 'Buyer';
        if (googleFilter === 'guide') return item.isLocalGuide;
        return true;
      }).map((g) => ({
        id: g.id,
        author: g.author,
        authorBadge: g.authorBadge || g.reviewCountText,
        rating: g.rating,
        review: g.review,
        date: "Verified Google Review",
        initials: g.initials,
        bgColor: g.bgColor,
        verifiedCategory: g.verifiedCategory,
        highlight: g.highlight,
        platform: 'google',
        isLocalGuide: g.isLocalGuide,
        platformUrl: GOOGLE_REVIEWS_GMB_URL
      }));
    } else {
      return ZILLOW_REVIEWS.filter((item) => {
        if (zillowFilter === 'all') return true;
        if (zillowFilter === 'seller') {
          return item.verifiedCategory === 'Seller' || item.verifiedCategory === 'Repeat Client';
        }
        if (zillowFilter === 'buyer') {
          return item.verifiedCategory === 'Buyer' || item.verifiedCategory === 'Repeat Client';
        }
        if (zillowFilter === 'repeat') {
          return item.verifiedCategory === 'Repeat Client';
        }
        return true;
      }).map((z) => ({
        id: z.id,
        author: z.author,
        authorBadge: z.authorBadge || z.serviceType,
        rating: z.rating,
        review: z.review,
        date: "Verified Zillow Premier Review",
        initials: z.initials,
        bgColor: z.bgColor,
        verifiedCategory: z.verifiedCategory,
        highlight: z.highlight,
        platform: 'zillow',
        serviceType: z.serviceType,
        platformUrl: ZILLOW_REVIEWS_URL
      }));
    }
  }, [activePlatform, googleFilter, zillowFilter]);

  // Viewport-based responsive items visible
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet: 2 cards
      } else {
        setItemsPerView(3); // Desktop: 3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to first slide on platform or filter change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activePlatform, googleFilter, zillowFilter]);

  const maxIndex = Math.max(0, activeReviews.length - itemsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Autoplay functionality (pauses on hover)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, maxIndex]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section id="testimonials" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5A93C]/30 relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* 1. PRIMARY PLATFORM TABS: GOOGLE REVIEWS VS ZILLOW REVIEWS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div className="inline-flex items-center gap-2 p-1.5 bg-[#F5EFE6] rounded-2xl border border-[#E5A93C]/40 shadow-xs">
            {/* Tab 1: Google Reviews */}
            <button
              type="button"
              onClick={() => setActivePlatform('google')}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activePlatform === 'google'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'text-[#002D61] hover:text-[#EA580C] hover:bg-white/60'
              }`}
            >
              <GoogleLogoIcon className="w-4 h-4 shrink-0" />
              <span>Google Reviews</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activePlatform === 'google'
                    ? 'bg-[#EA580C] text-white'
                    : 'bg-stone-200 text-[#002D61]'
                }`}
              >
                {GOOGLE_REVIEWS.length}
              </span>
            </button>

            {/* Tab 2: Zillow Reviews */}
            <button
              type="button"
              onClick={() => setActivePlatform('zillow')}
              className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activePlatform === 'zillow'
                  ? 'bg-[#006AFF] text-white shadow-md'
                  : 'text-[#002D61] hover:text-[#006AFF] hover:bg-white/60'
              }`}
            >
              <ZillowLogoIcon className="w-4 h-4 shrink-0" />
              <span>Zillow Reviews</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activePlatform === 'zillow'
                    ? 'bg-white text-[#006AFF]'
                    : 'bg-stone-200 text-[#002D61]'
                }`}
              >
                {ZILLOW_REVIEWS.length}
              </span>
            </button>
          </div>

          <div className="text-xs text-[#6B7280] font-sans flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% 5-Star Verified Client Record Across Platforms</span>
          </div>
        </div>

        {/* 2. DYNAMIC HEADER BY ACTIVE PLATFORM */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5A93C]/40 shadow-xs mb-3">
              {activePlatform === 'google' ? (
                <>
                  <GoogleLogoIcon className="w-4 h-4" />
                  <span className="text-[11px] font-bold tracking-wide uppercase font-sans text-[#002D61]">
                    Google Verified Reviews · 5.0 Rating
                  </span>
                </>
              ) : (
                <>
                  <ZillowLogoIcon className="w-4 h-4" />
                  <span className="text-[11px] font-bold tracking-wide uppercase font-sans text-[#006AFF]">
                    Zillow Premier Agent · 5.0 Star Client Rating
                  </span>
                </>
              )}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight">
              {activePlatform === 'google'
                ? 'Clients Describe the Difference'
                : 'Verified Zillow Client Testimonials'}
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-2 max-w-xl">
              {activePlatform === 'google'
                ? 'Buyers and sellers share what it was like to work with Brian, from the first call through closing, including how he communicated, solved problems, and guided decisions. Each review is from a verified Google client.'
                : "Read verified feedback from Brian Jamison's official Zillow Premier Agent profile. Homeowners, luxury buyers, and land sellers rate his local knowledge, responsiveness, process expertise, and negotiation skills."}
            </p>
          </div>

          {/* Platform Summary Badge & Direct Action Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-white rounded-2xl border border-[#E5A93C]/40 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E5A93C]/30 flex items-center justify-center">
                {activePlatform === 'google' ? (
                  <GoogleLogoIcon className="w-6 h-6" />
                ) : (
                  <ZillowLogoIcon className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xl font-bold text-[#002D61]">5.0</span>
                  <div className="flex text-[#FBBC04]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FBBC04]" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] text-[#6B7280] block font-sans">
                  {activePlatform === 'google'
                    ? `Based on ${GOOGLE_REVIEWS.length} Google Reviews`
                    : `Based on ${ZILLOW_REVIEWS.length} Zillow Reviews`}
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[#E5E0D8] mx-1" />

            {activePlatform === 'google' ? (
              <a
                href={GOOGLE_REVIEWS_GMB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <GoogleLogoIcon className="w-3.5 h-3.5" />
                <span>Write a Review on Google</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-300" />
              </a>
            ) : (
              <a
                href={ZILLOW_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006AFF] hover:bg-[#0051C4] text-white text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <ZillowLogoIcon className="w-3.5 h-3.5" />
                <span>View Profile on Zillow</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-200" />
              </a>
            )}
          </div>
        </div>

        {/* 3. SUB-FILTER BAR & SLIDER CONTROLS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {activePlatform === 'google' ? (
              <>
                <button
                  type="button"
                  onClick={() => setGoogleFilter('all')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    googleFilter === 'all'
                      ? 'bg-[#002D61] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
                  }`}
                >
                  All Google Reviews ({GOOGLE_REVIEWS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleFilter('seller')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    googleFilter === 'seller'
                      ? 'bg-[#002D61] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
                  }`}
                >
                  Sellers & Investors
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleFilter('buyer')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    googleFilter === 'buyer'
                      ? 'bg-[#002D61] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
                  }`}
                >
                  Home Buyers
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleFilter('guide')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    googleFilter === 'guide'
                      ? 'bg-[#002D61] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
                  }`}
                >
                  Local Guides
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setZillowFilter('all')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    zillowFilter === 'all'
                      ? 'bg-[#006AFF] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#006AFF] border border-[#E5E0D8]'
                  }`}
                >
                  All Zillow Reviews ({ZILLOW_REVIEWS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setZillowFilter('seller')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    zillowFilter === 'seller'
                      ? 'bg-[#006AFF] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#006AFF] border border-[#E5E0D8]'
                  }`}
                >
                  Home Sellers
                </button>
                <button
                  type="button"
                  onClick={() => setZillowFilter('buyer')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    zillowFilter === 'buyer'
                      ? 'bg-[#006AFF] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#006AFF] border border-[#E5E0D8]'
                  }`}
                >
                  Home Buyers
                </button>
                <button
                  type="button"
                  onClick={() => setZillowFilter('repeat')}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    zillowFilter === 'repeat'
                      ? 'bg-[#006AFF] text-white shadow-md'
                      : 'bg-white text-[#4B5563] hover:text-[#006AFF] border border-[#E5E0D8]'
                  }`}
                >
                  Repeat & Multi-Property
                </button>
              </>
            )}
          </div>

          {/* Slider Prev / Next Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <span className="text-xs text-[#6B7280] font-sans mr-2 hidden sm:inline">
              Slide {currentIndex + 1} of {maxIndex + 1}
            </span>

            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Reviews"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#E5E0D8] shadow-xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Reviews"
              className="w-10 h-10 rounded-full bg-white hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#E5E0D8] shadow-xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 
          4. EXACT LUXURY RESPONSIVE SLIDER CONTAINER
          - Desktop: 3 cards
          - Tablet: 2 cards
          - Mobile: 1 card
          - Auto-play with pause on hover
          - Touch swipe & drag support
        */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {activeReviews.map((item) => (
              <div
                key={item.id}
                className="shrink-0 px-3 py-2"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div className="h-full bg-white border border-[#E5A93C]/35 hover:border-[#EA580C] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative group">
                  {/* Top Reviewer Header */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar Initials Circle */}
                        <div
                          className={`w-11 h-11 rounded-full ${item.bgColor} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {item.initials}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-sans font-bold text-sm text-[#002D61]">
                              {item.author}
                            </span>
                            {item.isLocalGuide && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EA580C]/10 text-[#EA580C]">
                                <Award className="w-3 h-3 text-[#EA580C]" />
                                Local Guide
                              </span>
                            )}
                          </div>
                          <span className="font-sans text-[11px] text-[#6B7280] block truncate max-w-[210px] sm:max-w-[250px]">
                            {item.authorBadge}
                          </span>
                        </div>
                      </div>

                      {/* Official Platform Stamp on Card */}
                      <a
                        href={item.platformUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={item.platform === 'google' ? "View on Google" : "View on Zillow"}
                        className="p-1.5 rounded-lg hover:bg-[#FAF9F6] transition-colors shrink-0"
                      >
                        {item.platform === 'google' ? (
                          <GoogleLogoIcon className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                        ) : (
                          <ZillowLogoIcon className="w-4 h-4 opacity-85 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </div>

                    {/* Stars & Verified Stamp */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-1 text-[#FBBC04]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FBBC04]" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-sans flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {item.date}
                      </span>
                    </div>

                    {/* Highlight Callout */}
                    <div className="mb-3 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E5E0D8] inline-block">
                      <span className="text-[11px] font-semibold text-[#002D61]">
                        &ldquo;{item.highlight}&rdquo;
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="font-serif text-sm sm:text-base text-[#1F2937] leading-relaxed italic mb-4 line-clamp-6">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="font-sans font-medium text-[#EA580C]">
                      {item.verifiedCategory}
                    </span>
                    <a
                      href={item.platformUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#002D61] font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{item.platform === 'google' ? 'Google Review' : 'Zillow Review'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. SLIDER PAGINATION DOTS */}
        <div className="flex items-center justify-center gap-2 mt-8 mb-12">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? activePlatform === 'google' ? 'w-8 bg-[#EA580C]' : 'w-8 bg-[#006AFF]'
                  : 'w-2 bg-[#E5E0D8] hover:bg-[#002D61]/50'
              }`}
            />
          ))}
        </div>

        {/* 6. BRIAN'S PERSONAL TRUST COMMITMENT WITH CANCEL-ANYTIME PLEDGE */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-white border border-[#E5A93C]/40 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <BrianAvatar size={56} showStatusDot={true} alt="Brian Jamison - Client Satisfaction Commitment" />
          <div className="flex-1">
            <div className="flex items-center justify-center sm:justify-between flex-wrap gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#EA580C]">
                Personal Fiduciary Commitment
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E5A93C]/40 text-xs font-bold text-[#002D61]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
                100% Cancel-Anytime Listing Guarantee
              </span>
            </div>
            <p className="font-serif italic text-sm sm:text-base text-[#002D61] leading-relaxed">
              &ldquo;Every review above represents a client who put their equity in my hands. Whether selling a starter home or a multi-million-dollar estate, I treat your listing as if it were my own. If I ever fall short of what I promised, you can cancel our agreement at any time with zero penalty.&rdquo;
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs text-[#6B7280] pt-3 border-t border-[#F3EFEA]">
              <div>
                <strong className="text-[#002D61] font-serif text-sm">Brian Jamison</strong> · Top 2% Producer · {BROKER_INFO.license} · {BROKER_INFO.firmName}
              </div>
              {onOpenConsultation && (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  Schedule Confidential Review →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
