import React from 'react';
import { motion } from 'motion/react';
import { METHOD_PHASES } from '../../data/realEstateData';
import { BrianAvatar } from '../BrianAvatar';
import { ShieldCheck, ArrowRight, Sparkles, Check, CheckCircle2 } from 'lucide-react';

interface MegaMenuBlueprintProps {
  onOpenMethod: (phaseIndex?: number) => void;
  onOpenConsultation: () => void;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

const PHASE_PATHS = [
  '/services/elite-marketing',
  '/services/transparent-communication',
  '/services/accessibility-guarantee',
  '/services/support-team',
  '/services/precision-pricing',
  '/services/cancel-anytime-guarantee'
];

export const MegaMenuBlueprint: React.FC<MegaMenuBlueprintProps> = ({
  onOpenMethod,
  onOpenConsultation,
  onClose,
  onNavigate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[920px] max-w-[95vw] z-50 pointer-events-auto"
    >
      <div className="bg-[#FAF9F6]/95 backdrop-blur-2xl border border-[#EA580C]/30 rounded-2xl p-7 shadow-2xl shadow-[#0A192F]/10 text-[#0A192F]">
        <div className="grid grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Value Proposition & Seal (Cols 4) */}
          <div className="col-span-4 bg-[#F5EFE6] border border-[#EA580C]/30 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#EA580C]/30 text-[10px] uppercase font-bold tracking-[0.2em] text-[#EA580C] mb-4">
                <Sparkles className="w-3 h-3 text-[#EA580C]" />
                <span>The Proven Selling Machine</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#0A192F] leading-tight mb-3">
                How We Sell Your Home for Top Dollar
              </h3>

              <p className="font-sans text-xs text-[#6B7280] leading-relaxed mb-5">
                Our 6-phase proprietary blueprint eliminates passive listing mistakes and systematically sparks multiple competing offers.
              </p>

              {/* Cancel-Anytime Guarantee Micro-Badge with BrianAvatar */}
              <div className="p-3 bg-white border border-[#EA580C]/30 rounded-lg mb-4 flex items-center gap-3">
                <BrianAvatar size={36} showStatusDot={true} alt="Brian Jamison - Cancel Anytime Guarantee" />
                <div>
                  <span className="font-serif text-xs font-bold text-[#0A192F] block">
                    Cancel-Anytime Guarantee
                  </span>
                  <span className="text-[11px] text-[#6B7280] leading-snug block">
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
              className="w-full py-2.5 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-md text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Explore The 6 Phases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Columns 2 & 3: Interactive 6-Phase Matrix (Cols 8) */}
          <div className="col-span-8 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#EA580C]/30 pb-3 mb-4">
              <div>
                <span className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#0A192F]">
                  The 6-Phase Execution Hierarchy
                </span>
                <span className="text-[11px] text-[#6B7280] ml-2">
                  (Click any phase for dedicated interior page)
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#EA580C] tracking-widest">
                30+ Milestones
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {METHOD_PHASES.map((phase, idx) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigate && PHASE_PATHS[idx]) {
                      onNavigate(PHASE_PATHS[idx]);
                    } else {
                      onOpenMethod(idx);
                    }
                  }}
                  className="group text-left p-3.5 rounded-xl border border-[#EA580C]/30 bg-white hover:bg-[#F5EFE6] hover:border-[#EA580C]/50 transition-all duration-200 flex items-start gap-3 cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
                >
                  <span className="font-serif text-lg font-bold text-[#EA580C] group-hover:text-[#C2410C] tabular-nums shrink-0 mt-0.5">
                    {phase.number}
                  </span>
                  <div className="min-w-0">
                    <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block truncate">
                      {phase.title}
                    </span>
                    <span className="text-[11px] text-[#6B7280] line-clamp-1 block mt-0.5 font-sans">
                      {phase.summary}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Strip */}
            <div className="mt-5 pt-3.5 border-t border-[#EA580C]/30 flex items-center justify-between text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#EA580C]" />
                Direct Lead Representation by Brian Jamison
              </span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="font-medium text-[#EA580C] hover:text-[#C2410C] hover:underline cursor-pointer"
              >
                Schedule Private Strategy Briefing →
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
