import React from 'react';
import { motion } from 'motion/react';
import { BrianAvatar } from '../BrianAvatar';
import {
  FileText,
  Calculator,
  Compass,
  Building,
  Shield,
  HelpCircle,
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
}

export const MegaMenuHub: React.FC<MegaMenuHubProps> = ({
  onOpenCalculator,
  onOpenChecklist,
  onOpenValuation,
  onOpenConsultation,
  onOpenChapter,
  onClose,
  onNavigate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.985 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[820px] max-w-[95vw] z-50 pointer-events-auto"
    >
      <div className="bg-[#FAF9F6]/95 backdrop-blur-2xl border border-[#EA580C]/30 rounded-2xl p-7 shadow-2xl shadow-[#0A192F]/10 text-[#0A192F]">
        <div className="grid grid-cols-2 gap-8">
          {/* Seller Resources */}
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#EA580C]/30">
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <span className="font-serif text-sm font-bold text-[#0A192F]">
                Seller Intelligence & Playbooks
              </span>
            </div>

            <div className="space-y-2">
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
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#EA580C]/30 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C] group-hover:bg-white">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block">
                    Instant CMA Valuation Tool
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    3-tier pricing breakdown for Oklahoma City homes.
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
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#EA580C]/30 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C] group-hover:bg-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block">
                    28-Point Pre-Listing Checklist (PDF)
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
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
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#EA580C]/30 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C] group-hover:bg-white">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block">
                    Expired Listing Turnaround Protocol
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    Why failed listings close in under 21 days with Brian.
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Buyer & Advisory Tools */}
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#EA580C]/30">
              <Building className="w-4 h-4 text-[#EA580C]" />
              <span className="font-serif text-sm font-bold text-[#0A192F]">
                Buyer Concierge & Relocation
              </span>
            </div>

            <div className="space-y-2">
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
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#EA580C]/30 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C] group-hover:bg-white">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block">
                    OKC Mortgage & Affordability Calculator
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
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
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#EA580C]/30 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C] group-hover:bg-white">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block">
                    Private & Discreet Estates
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    Off-market syndication for Oklahoma luxury estates.
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
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#EA580C]/30 transition-all flex items-start gap-3 group cursor-pointer"
              >
                <BrianAvatar size={36} showStatusDot={true} alt="Brian Jamison - Direct Consultation" />
                <div>
                  <span className="font-serif text-sm font-semibold text-[#0A192F] group-hover:text-[#EA580C] transition-colors block">
                    Direct Consultation Booking
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    Schedule a private strategy meeting at Salt Corporate Office.
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-6 pt-4 border-t border-[#EA580C]/30 flex items-center justify-between text-xs text-[#6B7280]">
          <span>Corporate Office: 1508 W. Edmond Rd., Edmond, OK 73003</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="font-medium text-[#EA580C] hover:text-[#C2410C] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Book Private Strategy Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
