import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Search,
  Compass,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Sparkles,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Home,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { MICRO_MARKETS, MicroMarket, BROKER_INFO } from '../data/realEstateData';
import { InteriorHeroVideo } from './InteriorHeroVideo';

interface CommunityHubPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const CommunityHubPage: React.FC<CommunityHubPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'luxury' | 'north' | 'west-south'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkets = useMemo(() => {
    return MICRO_MARKETS.filter((market) => {
      const matchesCategory =
        activeCategory === 'all' || market.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        market.name.toLowerCase().includes(q) ||
        market.lifestyle.toLowerCase().includes(q) ||
        market.overview.toLowerCase().includes(q) ||
        market.schoolRating.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 
        ========================================================================
        SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage)
        ========================================================================
      */}
      <InteriorHeroVideo
        kicker="Comprehensive 21-Area Regional Guide"
        title="21 Oklahoma City Metropolitan Communities & Micro-Markets."
        subtitle="From the historic brick mansions of Nichols Hills and Heritage Hills to the top-rated academic districts of Edmond and the private wooded acreages of Arcadia and Piedmont, explore dedicated intelligence reports on every major enclave in central Oklahoma."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '21', label: 'Dedicated Metro Hubs' },
          { value: '$70M+', label: 'Closed Track Record' },
          { value: '100%', label: 'Real-Time MLS Data' },
          { value: 'Top 2%', label: 'Fiduciary Advisory' },
        ]}
        primaryCtaText="Book Community Advisory"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Request Area Valuation"
        onSecondaryCtaClick={onOpenValuation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* 2. FILTER TABS & DIRECTORY GRID */}
      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Live Search Input */}
          <div className="relative max-w-2xl mb-8">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by community name, school, or keyword (e.g., Edmond, Lake, Acreage)..."
                className="w-full pl-12 pr-16 py-3.5 rounded-full bg-white border border-[#E6E2DA] text-[#002D61] placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs text-stone-400 hover:text-stone-700 uppercase font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E6E2DA]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#002D61] text-white shadow-sm'
                    : 'bg-[#F4F1EB] text-[#4B5563] hover:text-[#002D61] hover:bg-[#EFECE6]'
                }`}
              >
                All 21 Communities ({MICRO_MARKETS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('luxury')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === 'luxury'
                    ? 'bg-[#002D61] text-white shadow-sm'
                    : 'bg-[#F4F1EB] text-[#4B5563] hover:text-[#002D61] hover:bg-[#EFECE6]'
                }`}
              >
                Historic & Luxury Central
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('north')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === 'north'
                    ? 'bg-[#002D61] text-white shadow-sm'
                    : 'bg-[#F4F1EB] text-[#4B5563] hover:text-[#002D61] hover:bg-[#EFECE6]'
                }`}
              >
                Northern Corridors & Acreage
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('west-south')}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeCategory === 'west-south'
                    ? 'bg-[#002D61] text-white shadow-sm'
                    : 'bg-[#F4F1EB] text-[#4B5563] hover:text-[#002D61] hover:bg-[#EFECE6]'
                }`}
              >
                West & South Suburbs / Ranches
              </button>
            </div>

            <span className="text-xs text-[#6B7280] font-sans">
              Showing <strong>{filteredMarkets.length}</strong> matching enclaves
            </span>
          </div>

          {/* Markets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMarkets.map((market, idx) => {
                const areaPath = `/areas/${market.id}`;
                return (
                  <motion.div
                    key={market.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className="group rounded-3xl bg-[#F4F1EB] border border-[#E6E2DA] overflow-hidden hover:border-[#EA580C]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Preview with Category Badge */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={market.image}
                          alt={market.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider border border-white/20">
                          {market.category === 'luxury'
                            ? 'Luxury Enclave'
                            : market.category === 'north'
                            ? 'North Academic Corridor'
                            : 'West/South Suburb'}
                        </span>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] uppercase tracking-wider text-[#FB923C] font-bold block">
                            Oklahoma City Metro
                          </span>
                          <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                            {market.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6">
                        <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 line-clamp-2">
                          {market.overview}
                        </p>

                        {/* 3 Metric Pills */}
                        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white border border-[#E6E2DA] text-center mb-6">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#6B7280] block font-semibold">Median</span>
                            <span className="font-serif text-xs sm:text-sm font-bold text-[#002D61]">{market.medianPrice}</span>
                          </div>
                          <div className="border-x border-[#E6E2DA]">
                            <span className="text-[9px] uppercase tracking-wider text-[#6B7280] block font-semibold">DOM</span>
                            <span className="font-serif text-xs sm:text-sm font-bold text-[#002D61]">{market.avgDom}</span>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#6B7280] block font-semibold">Feeder</span>
                            <span className="font-serif text-xs sm:text-sm font-bold text-[#EA580C]">{market.schoolRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Button linking directly to /areas/:id */}
                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => onNavigate(areaPath)}
                        className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#E6E2DA] hover:border-[#002D61] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between group/btn cursor-pointer shadow-2xs"
                      >
                        <span>Explore {market.name} Dossier</span>
                        <ArrowRight className="w-4 h-4 text-[#EA580C] group-hover/btn:text-[#FB923C] group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredMarkets.length === 0 && (
            <div className="text-center py-16 bg-[#F4F1EB] rounded-3xl border border-[#E6E2DA]">
              <Compass className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-[#002D61] mb-1">
                No matching micro-markets found
              </h3>
              <p className="text-xs text-[#6B7280] mb-4">
                Try searching for another neighborhood name or reset your filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2 rounded-full bg-[#002D61] text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. RELOCATION & VALUATION CTA */}
      <section className="w-full py-20 bg-[#002D61] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#FB923C] block mb-3">
            Bespoke Relocation Advisory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Relocating to Central Oklahoma or Selling in One of These Enclaves?
          </h2>
          <p className="font-sans text-base text-stone-200 leading-relaxed max-w-2xl mx-auto mb-10">
            Request an algorithmic micro-market comparative valuation or schedule a private consultation with Brian Jamison at Salt Real Estate Corporate Office.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-orange-600/30 hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Instant Market Valuation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              Consult With Brian Jamison
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
