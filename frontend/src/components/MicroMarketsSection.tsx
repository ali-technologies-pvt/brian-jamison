import React, { useState } from 'react';
import { MICRO_MARKETS, MicroMarket } from '../data/realEstateData';
import { ArrowUpRight, ChevronDown, ChevronUp, MapPin, Sparkles, Compass } from 'lucide-react';

interface MicroMarketsSectionProps {
  onSelectMarket: (marketId: string) => void;
  onNavigate?: (path: string) => void;
}

export const MicroMarketsSection: React.FC<MicroMarketsSectionProps> = ({
  onSelectMarket,
  onNavigate
}) => {
  // Show 6 in a single line initially
  const [isExpanded, setIsExpanded] = useState(false);

  // Top 6 communities for the single desktop line
  const displayedMarkets = isExpanded ? MICRO_MARKETS : MICRO_MARKETS.slice(0, 6);

  const handleViewAllPage = () => {
    if (onNavigate) {
      onNavigate('/areas');
    } else {
      onSelectMarket('oklahoma-city');
    }
  };

  return (
    <section id="micro-markets" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
              Oklahoma Service Areas & Enclaves
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight">
              Edmond Roots, Metro-Wide Reach
            </h2>
          </div>

          <div className="max-w-md flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Brian is a local real estate agent working from the Edmond office and serving Greater Oklahoma City.
            </p>
          </div>
        </div>

        {/* 
          6 In a Single Line Grid (Desktop):
          grid-cols-2 (mobile) -> grid-cols-3 (tablet) -> grid-cols-6 (desktop)
          Clean, elegant layout matching user reference screenshot.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mb-10">
          {displayedMarkets.map((market: MicroMarket) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-2xl bg-[#001D40] aspect-[4/5] sm:aspect-[3/4] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 border border-[#E5E0D8] hover:border-[#EA580C]"
            >
              {/* High-Resolution Architectural Image */}
              <img
                src={market.image}
                alt={market.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* High-Contrast Scrim Gradient for Crisp White Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300" />

              {/* Top Corner Circular Frosted Glass Arrow Icon */}
              <div className="absolute top-3 right-3 z-10">
                <span className="w-8 h-8 rounded-full bg-black/45 hover:bg-white text-white hover:text-[#002D61] flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-md border border-white/20">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#002D61] transition-colors" />
                </span>
              </div>

              {/* Bottom: Crisp Bold White Community Name at Bottom Left */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
                <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold !text-white group-hover:!text-white tracking-tight leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {market.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls: Load More Toggle & Main Service Areas Page Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Inline Toggle: Load More / Show Less */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#F5EFE6] text-[#002D61] border border-[#EA580C]/40 text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isExpanded ? 'Show Top 6 Only' : 'Load More Communities (15 More)'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#EA580C]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#EA580C]" />
            )}
          </button>

          {/* Primary Button: Navigate to Dedicated Service Areas Hub Page */}
          <button
            type="button"
            onClick={handleViewAllPage}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center gap-2.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explore All 21 Oklahoma Service Areas & Reports</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
