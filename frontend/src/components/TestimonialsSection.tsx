import React, { useState, useEffect, useRef } from 'react';
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_GMB_URL, BROKER_INFO, GoogleReview } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import {
  Star,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Award,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenConsultation: () => void;
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

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onOpenConsultation,
}) => {
  const [filter, setFilter] = useState<'all' | 'seller' | 'buyer' | 'guide'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const filteredReviews = GOOGLE_REVIEWS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'seller') return item.verifiedCategory === 'Seller' || item.verifiedCategory === 'Repeat Client' || item.verifiedCategory === 'Investor';
    if (filter === 'buyer') return item.verifiedCategory === 'Buyer';
    if (filter === 'guide') return item.isLocalGuide;
    return true;
  });

  // Calculate items visible per view based on viewport width
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

  // Reset to first slide when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  const maxIndex = Math.max(0, filteredReviews.length - itemsPerView);

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
        {/* Header with Google Business Profile Verification Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5A93C]/40 shadow-xs mb-3">
              <GoogleLogoIcon className="w-4 h-4" />
              <span className="text-[11px] font-bold tracking-wide uppercase font-sans text-[#002D61]">
                Google Verified Reviews · 5.0 Rating
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight">
              Clients Describe the Difference
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-2 max-w-xl">
              Buyers and sellers share what it was like to work with Brian, from the first call through closing, including how he communicated, solved problems, and guided decisions. Each review is from a verified client.
            </p>
          </div>

          {/* GMB Summary Badge & Write Review Direct Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-white rounded-2xl border border-[#E5A93C]/40 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#E5A93C]/30 flex items-center justify-center">
                <GoogleLogoIcon className="w-6 h-6" />
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
                  Based on 11 Google Reviews
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[#E5E0D8] mx-1" />

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
          </div>
        </div>

        {/* Filter Bar & Slider Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              All Google Reviews ({GOOGLE_REVIEWS.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('seller')}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                filter === 'seller'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              Sellers & Investors
            </button>
            <button
              type="button"
              onClick={() => setFilter('buyer')}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                filter === 'buyer'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              Home Buyers
            </button>
            <button
              type="button"
              onClick={() => setFilter('guide')}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                filter === 'guide'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              Local Guides
            </button>
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
          PREMIUM RESPONSIVE SLIDER CONTAINER
          - Desktop: 3 cards visible
          - Tablet: 2 cards visible
          - Mobile: 1 card visible
          - Smooth CSS transform transitions
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
            {filteredReviews.map((item) => (
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
                          <span className="font-sans text-[11px] text-[#6B7280] block">
                            {item.authorBadge || item.reviewCountText}
                          </span>
                        </div>
                      </div>

                      {/* Google G Stamp */}
                      <a
                        href={GOOGLE_REVIEWS_GMB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on Google"
                        className="p-1.5 rounded-lg hover:bg-[#FAF9F6] transition-colors"
                      >
                        <GoogleLogoIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>

                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-1 text-[#FBBC04]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#FBBC04]" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-sans flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Google Review
                      </span>
                    </div>

                    {/* Highlight Callout */}
                    <div className="mb-3 px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E5E0D8] inline-block">
                      <span className="text-[11px] font-semibold text-[#002D61]">
                        &ldquo;{item.highlight}&rdquo;
                      </span>
                    </div>

                    {/* Review Body */}
                    <p className="font-serif text-sm sm:text-base text-[#1F2937] leading-relaxed italic mb-4">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="font-sans font-medium text-[#EA580C]">
                      {item.verifiedCategory}
                    </span>
                    <a
                      href={GOOGLE_REVIEWS_GMB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#002D61] font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Google Review</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Pagination Dots & Autoplay Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 mb-12">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#EA580C]'
                  : 'w-2 bg-[#E5E0D8] hover:bg-[#002D61]/50'
              }`}
            />
          ))}
        </div>

        {/* Brian's Personal Trust Commitment with Cancel-Anytime Pledge */}
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
              <button
                type="button"
                onClick={onOpenConsultation}
                className="text-xs font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors cursor-pointer"
              >
                Schedule Confidential Review →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
