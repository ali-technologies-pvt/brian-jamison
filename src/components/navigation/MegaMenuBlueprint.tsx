import React from 'react';
import { motion } from 'motion/react';
import { METHOD_PHASES } from '../../data/realEstateData';
import { BrianAvatar } from '../BrianAvatar';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Check,
  Video,
  Clock,
  Users,
  Target,
  FileCheck
} from 'lucide-react';

interface MegaMenuBlueprintProps {
  onOpenMethod: (phaseIndex?: number) => void;
  onOpenConsultation: () => void;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

const CORE_PROCESSES = [
  {
    title: 'Marketing plan and process',
    summary: 'Cinema-grade 4K films, drone mapping, 3D Matterport, and 350+ portal syndication.',
    slug: '/services/marketing-plan-and-process',
    icon: Video
  },
  {
    title: 'Communication',
    summary: 'Mandatory showing feedback within 2 hours and weekly milestone traffic dashboards.',
    slug: '/services/communication',
    icon: Clock
  },
  {
    title: 'Accessibility',
    summary: 'Seven-day-a-week reachability with dedicated backup desk coverage.',
    slug: '/services/accessibility',
    icon: ShieldCheck
  },
  {
    title: 'Team support',
    summary: 'Specialized 7-person operations, legal compliance, staging, and media matrix.',
    slug: '/services/team-support',
    icon: Users
  },
  {
    title: 'Pricing strategy',
    summary: 'Econometric 3-tier valuation calibrated beneath search brackets for bidding wars.',
    slug: '/services/pricing-strategy',
    icon: Target
  },
  {
    title: 'Fair pricing and contract flexibility',
    summary: 'Partnership approach backed by our 100% risk-free cancel-anytime guarantee.',
    slug: '/services/fair-pricing-and-contract-flexibility',
    icon: FileCheck
  }
];

export const MegaMenuBlueprint: React.FC<MegaMenuBlueprintProps> = ({
  onOpenMethod,
  onOpenConsultation,
  onClose,
  onNavigate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[940px] max-w-[95vw] z-50 pointer-events-auto"
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

        <div className="relative z-10 grid grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Value Proposition & Seal (Cols 4) */}
          <div className="col-span-4 bg-white/10 hover:bg-white/[0.13] border border-white/20 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md shadow-inner transition-all duration-300 group">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-[#FB923C]/40 text-[10px] uppercase font-bold tracking-[0.2em] text-[#FB923C] mb-4 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#FB923C] animate-pulse" />
                <span>The Proven Selling Machine</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white leading-tight mb-3 drop-shadow-sm">
                How We Sell Your Home for Top Dollar
              </h3>

              <p className="font-sans text-xs text-stone-200 leading-relaxed mb-5">
                Our 6-phase proprietary blueprint eliminates passive listing mistakes and systematically sparks multiple competing offers.
              </p>

              {/* Cancel-Anytime Guarantee Micro-Badge with BrianAvatar */}
              <div className="p-3 bg-white/10 border border-white/15 rounded-lg mb-4 flex items-center gap-3 backdrop-blur-sm group-hover:border-white/30 transition-colors">
                <BrianAvatar size={38} showStatusDot={true} alt="Brian Jamison - Cancel Anytime Guarantee" />
                <div>
                  <span className="font-serif text-xs font-bold text-white block">
                    Cancel-Anytime Guarantee
                  </span>
                  <span className="text-[11px] text-stone-300 leading-snug block">
                    100% Risk-Free. Fired if commitments aren't met.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigate) {
                  onNavigate('/seller-blueprint');
                } else {
                  onOpenMethod(0);
                }
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-[#EA580C] to-[#FB923C] hover:from-[#C2410C] hover:to-[#EA580C] text-white rounded-md text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore The 6 Phases</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Columns 2 & 3: Interactive 6-Phase Matrix (Cols 8) - Clean without numbering */}
          <div className="col-span-8 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
              <div>
                <span className="text-[11px] font-sans font-bold tracking-wider uppercase text-white">
                  The 6-Phase Execution Hierarchy
                </span>
                <span className="text-[11px] text-stone-300 ml-2">
                  (Click any phase for dedicated interior guide)
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#FB923C] tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15">
                30+ Milestones
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CORE_PROCESSES.map((proc, idx) => {
                const IconComponent = proc.icon;
                return (
                  <button
                    key={proc.slug}
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onNavigate) {
                        onNavigate(proc.slug);
                      } else {
                        onOpenMethod(idx);
                      }
                    }}
                    className="group text-left p-3.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 backdrop-blur-md transition-all duration-300 flex items-start gap-3.5 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 text-[#FB923C] group-hover:bg-[#EA580C] group-hover:text-white group-hover:scale-110 transition-all duration-300 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-serif text-sm font-bold text-white group-hover:text-[#FB923C] transition-colors block truncate">
                        {proc.title}
                      </span>
                      <span className="text-[11px] text-stone-300 line-clamp-1 block mt-0.5 font-sans">
                        {proc.summary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Strip */}
            <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs text-stone-200">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#FB923C]" />
                Direct Representation by Jamison Real Estate Corporate Office
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="font-semibold text-[#FB923C] hover:text-white hover:underline cursor-pointer flex items-center gap-1 transition-colors"
              >
                <span>Schedule Private Strategy Briefing</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
