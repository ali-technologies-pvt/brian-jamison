import React, { useState } from 'react';
import { CHAPTERS } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ChapterAccordionProps {
  onSelectChapter?: (chapterId: string) => void;
  onOpenChapter?: (chapterId: string) => void;
  onOpenConsultation?: () => void;
}

// Curated high-fidelity architectural imagery for our 3 major services
const CHAPTER_IMAGES = [
  // 01 Home Buying: Warm luxury estate exterior & welcoming front porch
  "/media/properties/136-nw-18th-heritage-hills.jpeg",
  // 02 Home Selling: Grand architectural luxury great room & fireplace showcase
  "/media/gallery/modern-estate-pool-lawn.jpeg",
  // 03 Land Buying and Selling: Panoramic Oklahoma estate acreage & development grounds
  "/media/properties/11616-estrella-arcadia.jpeg"
];

export const ChapterAccordion: React.FC<ChapterAccordionProps> = ({
  onSelectChapter,
  onOpenChapter,
  onOpenConsultation
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTrigger = (chapterId: string) => {
    if (onOpenChapter) {
      onOpenChapter(chapterId);
    } else if (onSelectChapter) {
      onSelectChapter(chapterId);
    }
  };

  return (
    <section id="major-services" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
              Core Representation · Full-Spectrum Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] tracking-tight font-bold text-balance">
              Guidance for Every Property Move
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Brian Jamison offers personal real estate services in Edmond, OK, for buyers, sellers, and landowners.
            </p>
          </div>
        </div>

        {/* 
          Interactive Horizontal Accordion (Desktop - 3 Major Services):
          Subtle & sophisticated spring-like easing physics, hover-expansion, and smooth layered transitions.
        */}
        <div className="hidden md:flex h-[520px] lg:h-[580px] gap-3.5 rounded-2xl overflow-hidden p-1.5 bg-[#F5EFE6] border border-[#EA580C]/30 shadow-xs">
          {CHAPTERS.map((chapter, index) => {
            const isActive = activeIndex === index;
            const bgImage = CHAPTER_IMAGES[index % CHAPTER_IMAGES.length];

            return (
              <div
                key={chapter.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleTrigger(chapter.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end bg-[#002D61] border border-[#002D61]/30 ${
                  isActive ? 'flex-[3.5] shadow-2xl' : 'flex-1 hover:flex-[1.15]'
                }`}
              >
                {/* Background Image with subtle zoom on active */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                  }}
                />

                {/* Dark Vignette Overlay with rich #002D61 Royal Navy depth for crisp contrast */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-[#002D61]/95 via-[#002D61]/65 to-black/35'
                      : 'bg-[#002D61]/75 hover:bg-[#002D61]/60'
                  }`}
                />

                {/* Subtle border shine on active */}
                <div
                  className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 border-2 ${
                    isActive ? 'border-[#002D61] ring-1 ring-[#EA580C]/40' : 'border-transparent'
                  }`}
                />

                {/* Collapsed State: Vertical Text & Index */}
                {!isActive && (
                  <div className="absolute inset-0 p-6 flex flex-col justify-between items-center z-10 select-none transition-opacity duration-300">
                    <span className="font-serif text-xl font-bold !text-white drop-shadow-xs">
                      {chapter.index}
                    </span>
                    <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold !text-white whitespace-nowrap drop-shadow-xs">
                        {chapter.title}
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                  </div>
                )}

                {/* Expanded State: Full Story, Metrics & Interactive Button */}
                <div
                  className={`relative z-10 p-8 lg:p-12 flex flex-col justify-end transition-all duration-500 ${
                    isActive
                      ? 'opacity-100 translate-y-0 delay-100'
                      : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#EA580C] shadow-sm shadow-orange-500/50" />
                    <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold text-[#FB923C] drop-shadow-xs">
                      {chapter.tag}
                    </span>
                  </div>

                  <h3
                    style={{ color: '#FFFFFF', textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)' }}
                    className="font-serif text-3xl lg:text-4xl !text-white font-bold mb-3 tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                  >
                    {chapter.title}
                  </h3>

                  <p className="font-sans text-sm lg:text-base !text-white leading-relaxed max-w-lg mb-6 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] whitespace-pre-line">
                    {chapter.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-8 pt-3 border-t border-white/20 mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider !text-stone-200 block font-sans font-bold drop-shadow-xs">
                        {chapter.metrics.label}
                      </span>
                      <span className="font-serif text-xl font-extrabold !text-white tabular-nums drop-shadow-xs">
                        {chapter.metrics.value}
                      </span>
                    </div>

                    <div className="hidden sm:flex items-center gap-2.5">
                      <BrianAvatar size={28} showStatusDot={true} alt="Brian Jamison Direct Advisory" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider !text-stone-200 block font-sans font-bold">
                          Representation
                        </span>
                        <span className="text-xs sm:text-sm font-bold !text-white drop-shadow-xs">
                          Direct Advisory by Brian Jamison
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrigger(chapter.id);
                      }}
                      className="group inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-bold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/40 hover:shadow-orange-600/60 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                      <span className="text-white font-bold">{chapter.ctaText}</span>
                      <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          Mobile Accordion (Vertical Stack):
          Clean touch targets and tap-to-expand responsiveness.
        */}
        <div className="flex md:hidden flex-col gap-4">
          {CHAPTERS.map((chapter, index) => {
            const isActive = activeIndex === index;
            const bgImage = CHAPTER_IMAGES[index % CHAPTER_IMAGES.length];

            return (
              <div
                key={chapter.id}
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                className="relative rounded-2xl overflow-hidden border-2 border-[#002D61] bg-[#002D61] shadow-md cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${bgImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D61]/95 via-[#002D61]/70 to-black/40" />

                <div className="relative z-10 p-6 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-bold text-[#FB923C]">
                      {chapter.tag}
                    </span>
                    <span className="font-serif text-sm font-bold text-white">
                      {chapter.index}
                    </span>
                  </div>

                  <h3
                    style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                    className="font-serif text-2xl !text-white font-bold mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                  >
                    {chapter.title}
                  </h3>

                  {isActive ? (
                    <div className="mt-2 pt-3 border-t border-white/20 animate-in fade-in duration-200">
                      <p className="font-sans text-xs !text-white leading-relaxed mb-4 font-medium drop-shadow-xs whitespace-pre-line">
                        {chapter.summary}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTrigger(chapter.id);
                        }}
                        className="group w-full py-3.5 px-7 text-center text-xs font-bold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl shadow-lg shadow-orange-600/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <span className="text-white font-bold">{chapter.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] !text-white font-sans font-semibold mt-1 drop-shadow-xs">
                      Tap to examine playbook →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
