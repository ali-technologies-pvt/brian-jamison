import React from 'react';
import { motion } from 'motion/react';
import { MICRO_MARKETS } from '../../data/realEstateData';
import { ArrowUpRight, Award, ChevronRight, Sparkles } from 'lucide-react';

interface MegaMenuCommunitiesProps {
  onOpenMarket: (marketId: string) => void;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MegaMenuCommunities: React.FC<MegaMenuCommunitiesProps> = ({
  onOpenMarket,
  onClose,
  onNavigate,
  onMouseEnter,
  onMouseLeave
}) => {
  const luxuryMarkets = MICRO_MARKETS.filter((m) => m.category === 'luxury');
  const northMarkets = MICRO_MARKETS.filter((m) => m.category === 'north');
  const westSouthMarkets = MICRO_MARKETS.filter((m) => m.category === 'west-south');

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mega-menu-card absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[1060px] max-w-[96vw] z-50 pointer-events-auto"
    >
      {/* 
        Glossy Primary Royal Navy Glass Container:
        - Reflects brand primary #002D61 & midnight #001D40
        - Multi-layer frosted glass backdrop (backdrop-blur-2xl)
        - Top specular highlight bar
        - Ambient radial glow reflections
      */}
      <div className="relative rounded-2xl p-7 bg-gradient-to-b from-[#002D61]/95 via-[#001D40]/95 to-[#00142C]/98 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-[#00142C]/70 text-white overflow-hidden">
        {/* Specular Top Edge Gloss Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Ambient Primary Glow Spheres */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#EA580C]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-12 gap-6 items-stretch">
          {/* Col 1: Historic & Luxury (Cols 3) */}
          <div className="col-span-3 border-r border-white/15 pr-4">
            <span className="font-serif text-sm font-bold text-white block mb-1">
              Historic & Luxury
            </span>
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#FB923C] block mb-3 pb-2 border-b border-white/15">
              Central OKC Enclaves
            </span>

            <ul className="space-y-1">
              {luxuryMarkets.map((market) => (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigate) {
                        onNavigate('/areas/' + market.id);
                      } else {
                        onOpenMarket(market.id);
                      }
                    }}
                    className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-white/10 hover:text-[#FB923C] transition-all text-xs text-stone-200 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate group-hover:translate-x-0.5 transition-transform">{market.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#FB923C] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: North Metro & Waterfront (Cols 3) */}
          <div className="col-span-3 border-r border-white/15 pr-4">
            <span className="font-serif text-sm font-bold text-white block mb-1">
              North Metro & Waterfront
            </span>
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#FB923C] block mb-3 pb-2 border-b border-white/15">
              Edmond & Acreages
            </span>

            <ul className="space-y-1">
              {northMarkets.map((market) => (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigate) {
                        onNavigate('/areas/' + market.id);
                      } else {
                        onOpenMarket(market.id);
                      }
                    }}
                    className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-white/10 hover:text-[#FB923C] transition-all text-xs text-stone-200 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate group-hover:translate-x-0.5 transition-transform">{market.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#FB923C] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: West & South Metro (Cols 3) */}
          <div className="col-span-3 border-r border-white/15 pr-4">
            <span className="font-serif text-sm font-bold text-white block mb-1">
              West & South Metro
            </span>
            <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#FB923C] block mb-3 pb-2 border-b border-white/15">
              Suburban Growth Corridors
            </span>

            <ul className="space-y-1">
              {westSouthMarkets.map((market) => (
                <li key={market.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigate) {
                        onNavigate('/areas/' + market.id);
                      } else {
                        onOpenMarket(market.id);
                      }
                    }}
                    className="w-full text-left py-1.5 px-2.5 rounded-lg hover:bg-white/10 hover:text-[#FB923C] transition-all text-xs text-stone-200 flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate group-hover:translate-x-0.5 transition-transform">{market.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#FB923C] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Featured Spotlight Card (Cols 3) */}
          <div className="col-span-3 flex flex-col justify-between bg-white/10 hover:bg-white/[0.13] backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-inner transition-all duration-300 group">
            <div>
              <div className="relative rounded-lg overflow-hidden h-32 mb-3 shadow-md">
                <img
                  src="/media/gallery/modern-estate-pool-lawn.jpeg"
                  alt="Edmond / Nichols Hills estate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase font-bold tracking-wider border border-white/20">
                  Spotlight Enclave
                </span>
              </div>

              <span className="font-serif text-sm font-bold text-white block">
                Nichols Hills & Edmond Corridors
              </span>
              <p className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                Brian Jamison leads transactions across Oklahoma City's highest-tier residential enclaves.
              </p>
            </div>

            <div className="pt-3 border-t border-white/15">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-2.5">
                <Award className="w-3.5 h-3.5 text-[#FB923C]" />
                <span className="tabular-nums font-bold text-white">$70M+ Volume Sold</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/areas');
                  } else {
                    window.location.href = '/areas';
                  }
                }}
                className="w-full py-2 px-3 bg-gradient-to-r from-[#EA580C] to-[#FB923C] hover:from-[#C2410C] hover:to-[#EA580C] text-white rounded-md text-[11px] font-semibold transition-all duration-300 flex items-center justify-between shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>View All 21 Metro Reports</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
