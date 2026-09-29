import React from 'react';
import { MICRO_MARKETS, MicroMarket } from '../data/realEstateData';
import { ArrowUpRight } from 'lucide-react';

interface MicroMarketsSectionProps {
  onSelectMarket: (marketId: string) => void;
}

export const MicroMarketsSection: React.FC<MicroMarketsSectionProps> = ({ onSelectMarket }) => {
  return (
    <section id="micro-markets" className="w-full py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E5E0D8]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#E07A28] block mb-2">
            Oklahoma Service Areas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A2540] font-bold tracking-tight">
            Oklahoma City Metro Communities
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B7280] mt-3 leading-relaxed">
            Explore our primary service areas across the greater Oklahoma City metropolitan area.
          </p>
        </div>

        {/* 
          Clean Minimalist Gallery Grid:
          JUST Image and Name — No extra stats, no descriptions, no clutter.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {MICRO_MARKETS.map((market: MicroMarket) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl bg-[#0A2540] h-[260px] sm:h-[280px] cursor-pointer transition-all duration-500 hover:-translate-y-1 border border-[#E5E0D8]"
            >
              {/* Image */}
              <img
                src={market.image}
                alt={market.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Overlay for Clean Legibility: Deep dark scrim so white text is crisp & punchy */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:from-black/95 transition-all duration-300" />

              {/* Top Corner Icon */}
              <div className="absolute top-3.5 right-3.5 z-10">
                <span className="w-8 h-8 rounded-full bg-black/40 hover:bg-white text-white hover:text-[#0A2540] flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-xs border border-white/20">
                  <ArrowUpRight className="w-4 h-4 text-white hover:text-[#0A2540]" />
                </span>
              </div>

              {/* Bottom: ONLY Name in 100% Crisp White (Never turns orange/amber) */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                <h3 className="font-serif text-xl sm:text-2xl font-bold !text-white group-hover:!text-white tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {market.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
