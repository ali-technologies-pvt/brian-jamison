import React from 'react';
import { motion } from 'motion/react';
import { MICRO_MARKETS } from '../../data/realEstateData';
import { ArrowUpRight, MapPin, Award, ChevronRight } from 'lucide-react';

interface MegaMenuCommunitiesProps {
  onOpenMarket: (marketId: string) => void;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const MegaMenuCommunities: React.FC<MegaMenuCommunitiesProps> = ({
  onOpenMarket,
  onClose,
  onNavigate
}) => {
  const luxuryMarkets = MICRO_MARKETS.filter((m) => m.category === 'luxury');
  const northMarkets = MICRO_MARKETS.filter((m) => m.category === 'north');
  const westSouthMarkets = MICRO_MARKETS.filter((m) => m.category === 'west-south');

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[1040px] max-w-[96vw] z-50 pointer-events-auto"
    >
      <div className="bg-[#FAF9F6]/95 backdrop-blur-2xl border border-[#EA580C]/30 rounded-2xl p-7 shadow-2xl shadow-[#0A192F]/10 text-[#0A192F]">
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Col 1: Historic & Luxury (Cols 3) */}
          <div className="col-span-3 border-r border-[#EA580C]/30 pr-4">
            <span className="font-serif text-sm font-bold text-[#0A192F] block mb-1">
              Historic & Luxury
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#6B7280] block mb-3 pb-2 border-b border-[#EA580C]/30">
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
                    className="w-full text-left py-1.5 px-2 rounded-md hover:bg-[#F5EFE6] hover:text-[#EA580C] transition-colors text-xs text-[#0A192F] flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{market.name}</span>
                    <ChevronRight className="w-3 h-3 text-[#6B7280] group-hover:text-[#EA580C] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: North Metro & Waterfront (Cols 3) */}
          <div className="col-span-3 border-r border-[#EA580C]/30 pr-4">
            <span className="font-serif text-sm font-bold text-[#0A192F] block mb-1">
              North Metro & Waterfront
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#6B7280] block mb-3 pb-2 border-b border-[#EA580C]/30">
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
                    className="w-full text-left py-1.5 px-2 rounded-md hover:bg-[#F5EFE6] hover:text-[#EA580C] transition-colors text-xs text-[#0A192F] flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{market.name}</span>
                    <ChevronRight className="w-3 h-3 text-[#6B7280] group-hover:text-[#EA580C] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: West & South Metro (Cols 3) */}
          <div className="col-span-3 border-r border-[#EA580C]/30 pr-4">
            <span className="font-serif text-sm font-bold text-[#0A192F] block mb-1">
              West & South Metro
            </span>
            <span className="text-[10px] uppercase font-sans tracking-wider text-[#6B7280] block mb-3 pb-2 border-b border-[#EA580C]/30">
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
                    className="w-full text-left py-1.5 px-2 rounded-md hover:bg-[#F5EFE6] hover:text-[#EA580C] transition-colors text-xs text-[#0A192F] flex items-center justify-between group cursor-pointer"
                  >
                    <span className="truncate">{market.name}</span>
                    <ChevronRight className="w-3 h-3 text-[#6B7280] group-hover:text-[#EA580C] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Featured Spotlight Card (Cols 3) */}
          <div className="col-span-3 flex flex-col justify-between bg-[#F5EFE6] rounded-xl p-4 border border-[#EA580C]/30">
            <div>
              <div className="relative rounded-lg overflow-hidden h-32 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                  alt="Edmond / Nichols Hills estate"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase font-bold tracking-wider">
                  Spotlight Enclave
                </span>
              </div>

              <span className="font-serif text-sm font-bold text-[#0A192F] block">
                Nichols Hills & Edmond Corridors
              </span>
              <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                Brian Jamison leads transactions across Oklahoma City's highest-tier residential enclaves.
              </p>
            </div>

            <div className="pt-3 border-t border-[#EA580C]/30">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A192F] mb-2">
                <Award className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>$62M+ Volume Sold</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('micro-markets');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2 px-2.5 bg-white hover:bg-[#FAF9F6] border border-[#EA580C]/30 rounded-md text-[11px] font-semibold text-[#0A192F] hover:text-[#EA580C] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>View All 21 Metro Reports</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#EA580C]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
