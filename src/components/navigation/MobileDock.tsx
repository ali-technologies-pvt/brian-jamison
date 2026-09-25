import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BROKER_INFO, METHOD_PHASES, MICRO_MARKETS } from '../../data/realEstateData';
import { BrianAvatar } from '../BrianAvatar';
import {
  Phone,
  Home,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Shield,
  FileText,
  Calculator,
  MapPin,
  Mail,
  Award
} from 'lucide-react';

interface MobileDockProps {
  onOpenValuation: (initialAddress?: string) => void;
  onOpenConsultation: () => void;
  onOpenMarket: (marketId: string) => void;
  onOpenChapter: (chapterId: string) => void;
  onOpenMethod: (phaseIndex?: number) => void;
  onOpenCalculator: () => void;
  onOpenChecklist: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'fairhousing') => void;
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

export const MobileDock: React.FC<MobileDockProps> = ({
  onOpenValuation,
  onOpenConsultation,
  onOpenMarket,
  onOpenChapter,
  onOpenMethod,
  onOpenCalculator,
  onOpenChecklist,
  onOpenLegal,
  onNavigate
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'blueprint' | 'areas' | 'guides' | null>('blueprint');

  const toggleSection = (section: 'blueprint' | 'areas' | 'guides') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      {/* 
        Bottom Floating Concierge Dock (Mobile Only):
        Pill-shaped glass container at bottom-4 inset-x-4
      */}
      <div className="lg:hidden fixed bottom-4 inset-x-4 z-50 pointer-events-auto">
        <div className="bg-[#FAF9F6]/90 backdrop-blur-xl border border-stone-200/90 shadow-2xl rounded-full py-2 px-3.5 flex items-center justify-between gap-2 text-xs">
          {/* Left: Tap-to-Call */}
          <a
            href={`tel:${BROKER_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/90 text-[#1B1D21] font-semibold border border-[#E6E2DA] active:scale-95 transition-transform"
          >
            <Phone className="w-3.5 h-3.5 text-[#B38F68]" />
            <span className="text-[11px] tabular-nums">(405) 513-3039</span>
          </a>

          {/* Center: Primary Action (Free Valuation Pill) */}
          <button
            type="button"
            onClick={() => onOpenValuation()}
            className="flex-1 py-2 px-3 rounded-full bg-[#B38F68] hover:bg-[#9E7A56] text-white font-semibold text-center uppercase tracking-wider text-[10px] shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer truncate"
          >
            <Home className="w-3 h-3 shrink-0" />
            <span className="truncate">Free Valuation</span>
          </button>

          {/* Right: Full Directory Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open Directory Menu"
            className="p-2 rounded-full bg-white/90 text-[#1B1D21] border border-[#E6E2DA] active:scale-95 transition-transform cursor-pointer"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 
        Fullscreen Slide-Out Concierge Drawer:
        Smooth slide-in from right with Framer Motion
      */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-in Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF9F6] border-l border-[#E6E2DA] shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#E6E2DA] flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <BrianAvatar size={36} className="w-9 h-9 shrink-0" alt="Brian Jamison · Salt Real Estate" />
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-bold text-[#1B1D21]">
                      Brian Jamison
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#6B7280]">
                      Salt Real Estate · Edmond, OK
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-[#F4F1EB] text-[#1B1D21] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Accordions */}
              <div className="p-5 space-y-4 flex-1">
                {/* Accordion 1: The 6 Steps */}
                <div className="border border-[#E6E2DA] rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => toggleSection('blueprint')}
                    className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-[#1B1D21] text-sm"
                  >
                    <span>The 6-Step Seller Blueprint</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B38F68] transition-transform ${
                        expandedSection === 'blueprint' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection === 'blueprint' && (
                    <div className="p-4 pt-0 border-t border-[#E6E2DA] space-y-2 bg-[#FAF9F6]">
                      {METHOD_PHASES.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setDrawerOpen(false);
                            if (onNavigate && PHASE_PATHS[idx]) {
                              onNavigate(PHASE_PATHS[idx]);
                            } else {
                              onOpenMethod(idx);
                            }
                          }}
                          className="w-full text-left py-2 px-2.5 rounded-lg hover:bg-white text-xs text-[#1B1D21] flex items-start gap-2.5"
                        >
                          <span className="font-serif font-bold text-[#B38F68]">
                            {p.number}
                          </span>
                          <div>
                            <span className="font-semibold block">{p.title}</span>
                            <span className="text-[11px] text-[#6B7280] line-clamp-1">{p.summary}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion 2: 21 Service Areas */}
                <div className="border border-[#E6E2DA] rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => toggleSection('areas')}
                    className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-[#1B1D21] text-sm"
                  >
                    <span>21 Oklahoma Metro Communities</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B38F68] transition-transform ${
                        expandedSection === 'areas' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection === 'areas' && (
                    <div className="p-4 pt-0 border-t border-[#E6E2DA] max-h-60 overflow-y-auto bg-[#FAF9F6] space-y-1">
                      {MICRO_MARKETS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setDrawerOpen(false);
                            if (onNavigate) {
                              onNavigate('/areas/' + m.id);
                            } else {
                              onOpenMarket(m.id);
                            }
                          }}
                          className="w-full text-left py-1.5 px-2 rounded-md hover:bg-white text-xs text-[#1B1D21] flex justify-between"
                        >
                          <span>{m.name}</span>
                          <span className="text-[10px] text-[#6B7280]">{m.medianPrice}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion 3: Client Guides & Tools */}
                <div className="border border-[#E6E2DA] rounded-xl overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => toggleSection('guides')}
                    className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-[#1B1D21] text-sm"
                  >
                    <span>Client Guides & Financial Calculators</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B38F68] transition-transform ${
                        expandedSection === 'guides' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection === 'guides' && (
                    <div className="p-4 pt-0 border-t border-[#E6E2DA] bg-[#FAF9F6] space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setDrawerOpen(false);
                          if (onNavigate) {
                            onNavigate('/home-valuation');
                          } else {
                            onOpenValuation();
                          }
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-lg hover:bg-white text-xs text-[#1B1D21] flex items-center gap-2"
                      >
                        <Calculator className="w-3.5 h-3.5 text-[#B38F68]" />
                        <span>Instant 3-Tier Home Valuation</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDrawerOpen(false);
                          if (onNavigate) {
                            onNavigate('/resources/home-sellers-checklist');
                          } else {
                            onOpenChecklist();
                          }
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-lg hover:bg-white text-xs text-[#1B1D21] flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#B38F68]" />
                        <span>28-Point Seller Checklist (PDF)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDrawerOpen(false);
                          if (onNavigate) {
                            onNavigate('/resources/mortgage-calculator');
                          } else {
                            onOpenCalculator();
                          }
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-lg hover:bg-white text-xs text-[#1B1D21] flex items-center gap-2"
                      >
                        <Calculator className="w-3.5 h-3.5 text-[#B38F68]" />
                        <span>Mortgage & Affordability Calculator</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDrawerOpen(false);
                          onOpenCalculator();
                        }}
                        className="w-full text-left py-2 px-2.5 rounded-lg hover:bg-white text-xs text-[#1B1D21] flex items-center gap-2"
                      >
                        <Calculator className="w-3.5 h-3.5 text-[#B38F68]" />
                        <span>OKC Mortgage Calculator</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenValuation();
                    }}
                    className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-[#B38F68] rounded-xl shadow-sm"
                  >
                    Request Bespoke Home Valuation
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDrawerOpen(false);
                      onOpenConsultation();
                    }}
                    className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#1B1D21] bg-white border border-[#1B1D21] rounded-xl"
                  >
                    Book Private Strategy Session
                  </button>
                </div>
              </div>

              {/* Drawer Footer: Corporate Office & Licensing */}
              <div className="p-5 border-t border-[#E6E2DA] bg-[#F4F1EB] text-xs text-[#6B7280] space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#B38F68] shrink-0 mt-0.5" />
                  <span>1508 W. Edmond Rd., Edmond, OK 73003</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#B38F68]" />
                  <span>Salt Real Estate Corporate Office · {BROKER_INFO.license}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#B38F68]" />
                  <span>Top 2% Producer Oklahoma City</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
