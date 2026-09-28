import React, { useState, useMemo } from 'react';
import { MICRO_MARKETS, MicroMarket } from '../data/realEstateData';
import { ArrowUpRight, Search, MapPin, Sparkles, TrendingUp, Clock, GraduationCap } from 'lucide-react';

interface MicroMarketsSectionProps {
  onSelectMarket: (marketId: string) => void;
}

export const MicroMarketsSection: React.FC<MicroMarketsSectionProps> = ({ onSelectMarket }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'luxury' | 'north' | 'west-south'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkets = useMemo(() => {
    return MICRO_MARKETS.filter((market) => {
      const matchesCategory = activeCategory === 'all' || market.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        market.name.toLowerCase().includes(query) ||
        market.lifestyle.toLowerCase().includes(query) ||
        market.keySubdivisions.some((sub) => sub.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="micro-markets" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
              Oklahoma Service Areas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight text-balance">
              21 Oklahoma City Metro Service Areas
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-3 leading-relaxed">
              Curated architectural photography and immediate market analytics across Brian Jamison's core representation zones. Click any area to view closed comparables.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search area or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#002D61]/20 text-xs font-sans text-[#002D61] placeholder:text-[#6B7280] focus:outline-none focus:border-[#EA580C] shadow-xs transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#002D61]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-white/70 backdrop-blur-md rounded-2xl border border-[#002D61]/15 shadow-xs max-w-fit">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#002D61] hover:bg-[#002D61]/10'
            }`}
          >
            All Service Areas (21)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('luxury')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'luxury'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#002D61] hover:bg-[#002D61]/10'
            }`}
          >
            Luxury & Historic (7)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('north')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'north'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#002D61] hover:bg-[#002D61]/10'
            }`}
          >
            North Metro & Edmond (7)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('west-south')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeCategory === 'west-south'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#002D61] hover:bg-[#002D61]/10'
            }`}
          >
            West & South Metro (7)
          </button>
        </div>

        {/* 
          Visual-First Service Areas Grid:
          Emphasis on high-definition architectural imagery with minimal, scannable text.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredMarkets.map((market: MicroMarket) => (
            <div
              key={market.id}
              onClick={() => onSelectMarket(market.id)}
              className="group relative rounded-2xl overflow-hidden border-2 border-[#002D61]/25 shadow-md hover:shadow-xl bg-[#002D61] h-[340px] sm:h-[370px] cursor-pointer flex flex-col justify-between transition-all duration-500 hover:-translate-y-1"
            >
              {/* Architectural Image */}
              <img
                src={market.image}
                alt={`${market.name} - Oklahoma City Real Estate`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Royal Navy Gradient Scrim (#002D61) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002D61] via-[#002D61]/55 to-black/35 group-hover:via-[#002D61]/45 transition-colors" />

              {/* Top Meta Bar */}
              <div className="relative z-10 p-5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25">
                    {market.category === 'luxury'
                      ? 'Luxury Enclave'
                      : market.category === 'north'
                      ? 'North Metro'
                      : 'West & South'}
                  </span>
                  {market.highlightBadge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold bg-[#EA580C] text-white shadow-xs">
                      {market.highlightBadge}
                    </span>
                  )}
                </div>

                <span className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#002D61] flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-110 shadow-xs shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Information (Visuals first, concise scannable text) */}
              <div className="relative z-10 p-5 sm:p-6">
                {/* Heading: Always crisp pure white on dark background */}
                <h3
                  style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                  className="font-serif text-2xl font-bold !text-white tracking-tight leading-snug mb-2 group-hover:text-[#FB923C] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                >
                  {market.name}
                </h3>

                {/* Key Metrics Strip (Price & DOM) */}
                <div className="flex items-center justify-between text-xs text-white border-t border-white/20 pt-3 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-sans tracking-wider !text-stone-200 font-bold drop-shadow-xs">
                      Median Price
                    </span>
                    <span className="font-serif font-bold text-sm text-[#FB923C] tabular-nums drop-shadow-xs">
                      {market.medianPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span className="font-sans font-bold text-xs !text-white tabular-nums drop-shadow-xs">
                      {market.avgDom}
                    </span>
                  </div>
                </div>

                {/* 1-Line Lifestyle Summary (Short, punchy) */}
                <p className="font-sans text-[11px] sm:text-xs !text-stone-100 line-clamp-1 leading-relaxed font-medium drop-shadow-xs">
                  {market.lifestyle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#002D61]/15 p-8">
            <MapPin className="w-8 h-8 text-[#EA580C] mx-auto mb-3" />
            <h4 className="font-serif text-xl font-bold text-[#002D61] mb-1">
              No service areas found
            </h4>
            <p className="font-sans text-xs text-[#6B7280] mb-4">
              We couldn't find a service area matching "{searchQuery}". Brian serves the entire 21 Oklahoma City metro communities.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2 text-xs font-semibold bg-[#002D61] text-white rounded-xl shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
