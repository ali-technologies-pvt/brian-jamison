import React from 'react';
import { MICRO_MARKETS } from '../data/realEstateData';
import { ArrowUpRight, ChevronRight, MapPin } from 'lucide-react';

interface MicroMarketsSectionProps {
  onSelectMarket: (marketId: string) => void;
}

export const MicroMarketsSection: React.FC<MicroMarketsSectionProps> = ({ onSelectMarket }) => {
  const luxuryMarkets = MICRO_MARKETS.filter((m) => m.category === 'luxury');
  const northMarkets = MICRO_MARKETS.filter((m) => m.category === 'north');
  const westSouthMarkets = MICRO_MARKETS.filter((m) => m.category === 'west-south');

  return (
    <section id="micro-markets" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#E5A93C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#E5A93C] block mb-3">
            Oklahoma Market
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A192F] font-medium tracking-tight">
            21 Oklahoma City Micro-Markets
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-3">
            Hyper-local intelligence across every enclave, school district, and golf community.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FAF9F6] border border-[#E5A93C]/30 rounded-2xl p-6 sm:p-10 shadow-xs">
          {/* Column 1: Luxury & Historic */}
          <div>
            <div className="border-b border-[#E5A93C]/30 pb-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-[#0A192F] tracking-tight">
                Luxury & Historic
              </h3>
              <span className="text-[10px] tracking-wider uppercase text-[#6B7280] font-sans">
                Central Metropolitan Enclaves
              </span>
            </div>

            <ul className="space-y-1">
              {luxuryMarkets.map((market) => (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => onSelectMarket(market.id)}
                    className="w-full text-left py-2.5 px-2 rounded-md hover:bg-[#F5EFE6] transition-colors flex items-center justify-between group cursor-pointer text-xs sm:text-sm text-[#0A192F]"
                  >
                    <span className="group-hover:text-[#E5A93C] transition-colors font-medium">
                      {market.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#E5A93C] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: North Metro & Edmond */}
          <div>
            <div className="border-b border-[#E5A93C]/30 pb-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-[#0A192F] tracking-tight">
                North Metro & Edmond
              </h3>
              <span className="text-[10px] tracking-wider uppercase text-[#6B7280] font-sans">
                Gold-Standard Schools & Acreages
              </span>
            </div>

            <ul className="space-y-1">
              {northMarkets.map((market) => (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => onSelectMarket(market.id)}
                    className="w-full text-left py-2.5 px-2 rounded-md hover:bg-[#F5EFE6] transition-colors flex items-center justify-between group cursor-pointer text-xs sm:text-sm text-[#0A192F]"
                  >
                    <span className="group-hover:text-[#E5A93C] transition-colors font-medium">
                      {market.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#E5A93C] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: West & South Metro */}
          <div>
            <div className="border-b border-[#E5A93C]/30 pb-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-[#0A192F] tracking-tight">
                West & South Metro
              </h3>
              <span className="text-[10px] tracking-wider uppercase text-[#6B7280] font-sans">
                Suburban Corridors & Acreage Living
              </span>
            </div>

            <ul className="space-y-1">
              {westSouthMarkets.map((market) => (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => onSelectMarket(market.id)}
                    className="w-full text-left py-2.5 px-2 rounded-md hover:bg-[#F5EFE6] transition-colors flex items-center justify-between group cursor-pointer text-xs sm:text-sm text-[#0A192F]"
                  >
                    <span className="group-hover:text-[#E5A93C] transition-colors font-medium">
                      {market.name}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#E5A93C] group-hover:translate-x-0.5 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
