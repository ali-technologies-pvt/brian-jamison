import React from 'react';
import { motion } from 'motion/react';
import { BrianAvatar } from '../BrianAvatar';
import {
  FileText,
  Calculator,
  Compass,
  Building,
  Shield,
  ArrowRight,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

interface MegaMenuHubProps {
  onOpenCalculator: () => void;
  onOpenChecklist: () => void;
  onOpenValuation: () => void;
  onOpenConsultation: () => void;
  onOpenChapter: (chapterId: string) => void;
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MegaMenuHub: React.FC<MegaMenuHubProps> = ({
  onOpenCalculator,
  onOpenChecklist,
  onOpenValuation,
  onOpenConsultation,
  onOpenChapter,
  onClose,
  onNavigate,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mega-menu-card absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[840px] max-w-[95vw] z-50 pointer-events-auto"
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

        <div className="relative z-10 grid grid-cols-2 gap-8">
          {/* Seller Resources */}
          <div>
            <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-white/15">
              <Sparkles className="w-4 h-4 text-[#FB923C] animate-pulse" />
              <span className="font-serif text-sm font-bold text-white tracking-wide">
                Seller Intelligence & Playbooks
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/home-valuation');
                  } else {
                    onOpenValuation();
                  }
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-[#FB923C] group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block">
                    Instant CMA Valuation Tool
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block mt-0.5">
                    3-tier pricing breakdown calibrated for Oklahoma City homes.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/resources/home-sellers-checklist');
                  } else {
                    onOpenChecklist();
                  }
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-[#FB923C] group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block">
                    28-Point Pre-Listing Checklist (PDF)
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block mt-0.5">
                    Highest ROI home preparation checklist before listing.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/expired-listings');
                  } else {
                    onOpenChapter('expired-listings');
                  }
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-[#FB923C] group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block">
                    Expired Listing Turnaround Protocol
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block mt-0.5">
                    Why failed listings close in under 21 days with Brian Jamison.
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Buyer & Advisory Tools */}
          <div>
            <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-white/15">
              <Building className="w-4 h-4 text-[#FB923C]" />
              <span className="font-serif text-sm font-bold text-white tracking-wide">
                Buyer Concierge & Relocation
              </span>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/resources/mortgage-calculator');
                  } else {
                    onOpenCalculator();
                  }
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-[#FB923C] group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block">
                    OKC Mortgage & Affordability Calculator
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block mt-0.5">
                    Includes real Oklahoma county property tax rates & insurance.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/luxury-buyers');
                  } else {
                    onOpenChapter('private-estates');
                  }
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-[#FB923C] group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block">
                    Private & Discreet Estates
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block mt-0.5">
                    Off-market syndication for high-net-worth Oklahoma luxury estates.
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onNavigate) {
                    onNavigate('/contact');
                  } else {
                    onOpenConsultation();
                  }
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="shrink-0 mt-0.5">
                  <BrianAvatar size={38} showStatusDot={true} alt="Brian Jamison - Direct Consultation" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block">
                    Direct Consultation Booking
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block mt-0.5">
                    Schedule a private strategy meeting with Brian Jamison in Edmond.
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-200">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate('/map-search');
              }}
              className="text-stone-300 hover:text-[#FB923C] cursor-pointer flex items-center gap-1 transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Interactive MLS Map Search</span>
            </button>
            <span className="text-white/20">•</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigate) onNavigate('/listings');
              }}
              className="text-stone-300 hover:text-[#FB923C] cursor-pointer flex items-center gap-1 transition-colors"
            >
              <Building className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Active Listings</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="font-semibold text-[#FB923C] hover:text-white hover:underline cursor-pointer flex items-center gap-1.5 transition-colors group"
          >
            <span>Book Private Strategy Session</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
