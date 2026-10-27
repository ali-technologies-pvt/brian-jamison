import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Megaphone,
  MessageSquare,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react';
import {
  PROCESS_ONE_DELIVERABLES,
  PROCESS_TWO_DELIVERABLES,
  PROCESS_THREE_DELIVERABLES,
  PROCESS_FOUR_DELIVERABLES,
  PROCESS_FIVE_DELIVERABLES,
  PROCESS_SIX_DELIVERABLES
} from '../pages/serviceData';

interface CompanyServicesProcessSectionProps {
  onOpenConsultation?: () => void;
  onOpenValuation?: () => void;
  onNavigate?: (path: string) => void;
}

export interface SubProcessItem {
  id: string;
  number: string;
  title: string;
  image: string;
  description: string;
  slug: string;
  executionDetail?: string;
  sellerImpact?: string;
}

export interface ProcessCategory {
  id: string;
  number: string;
  name: string;
  slug: string;
  subheading: string;
  items: SubProcessItem[];
}

const PROCESS_ICONS = [
  Megaphone,
  MessageSquare,
  Clock,
  Users,
  TrendingUp,
  ShieldCheck
];

export const toTitleCase = (str: string): string => {
  if (!str) return '';
  return str.replace(/\b([a-z])/g, (char) => char.toUpperCase());
};

export const PROCESS_CATEGORIES: ProcessCategory[] = [
  {
    id: 'marketing-plan-and-process',
    number: '1',
    name: 'Marketing Plan And Process',
    slug: '/services/marketing-plan-and-process',
    subheading:
      'A plan to prepare, present, and promote your property, so it gets noticed by buyers and their agents.',
    items: PROCESS_ONE_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: toTitleCase(d.title),
      image: d.image,
      description: d.desc,
      slug: d.slug,
      executionDetail: d.executionDetail,
      sellerImpact: d.sellerImpact
    }))
  },
  {
    id: 'communication',
    number: '2',
    name: 'Communication',
    slug: '/services/communication',
    subheading:
      'Clear, timely updates keep you informed, so decisions feel manageable from the first conversation to the final signature.',
    items: PROCESS_TWO_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: toTitleCase(d.title),
      image: d.image,
      description: d.desc,
      slug: d.slug,
      executionDetail: d.executionDetail,
      sellerImpact: d.sellerImpact
    }))
  },
  {
    id: 'accessibility',
    number: '3',
    name: 'Accessibility',
    slug: '/services/accessibility',
    subheading:
      'Brian makes it easy to reach him, so questions get answered, and time-sensitive decisions are not left waiting.',
    items: PROCESS_THREE_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: toTitleCase(d.title),
      image: d.image,
      description: d.desc,
      slug: d.slug,
      executionDetail: d.executionDetail,
      sellerImpact: d.sellerImpact
    }))
  },
  {
    id: 'team-support',
    number: '4',
    name: 'Team Support',
    slug: '/services/team-support',
    subheading:
      'Brian’s team handles scheduling, paperwork, preparation, and marketing, so daily details stay covered while he focuses on you.',
    items: PROCESS_FOUR_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: toTitleCase(d.title),
      image: d.image,
      description: d.desc,
      slug: d.slug,
      executionDetail: d.executionDetail,
      sellerImpact: d.sellerImpact
    }))
  },
  {
    id: 'pricing-strategy',
    number: '5',
    name: 'Pricing Strategy',
    slug: '/services/pricing-strategy',
    subheading:
      'Pricing starts with local data and ends with a clear plan that attracts buyers without leaving value behind.',
    items: PROCESS_FIVE_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: toTitleCase(d.title),
      image: d.image,
      description: d.desc,
      slug: d.slug,
      executionDetail: d.executionDetail,
      sellerImpact: d.sellerImpact
    }))
  },
  {
    id: 'fair-pricing-and-contract-flexibility',
    number: '6',
    name: 'Fair Pricing And Contract Flexibility',
    slug: '/services/fair-pricing-and-contract-flexibility',
    subheading:
      'Fair pricing and a flexible agreement keep the focus on results and give you room to change course.',
    items: PROCESS_SIX_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: toTitleCase(d.title),
      image: d.image,
      description: d.desc,
      slug: d.slug,
      executionDetail: d.executionDetail,
      sellerImpact: d.sellerImpact
    }))
  }
];

export const CompanyServicesProcessSection: React.FC<CompanyServicesProcessSectionProps> = ({
  onOpenConsultation,
  onOpenValuation,
  onNavigate
}) => {
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);

  const activeProcess = PROCESS_CATEGORIES[activeProcessIndex];

  const handleGoToSinglePage = (slug: string) => {
    if (onNavigate) {
      onNavigate(slug);
    } else {
      window.location.href = slug;
    }
  };

  return (
    <section
      id="the-method"
      className="w-full py-20 sm:py-24 bg-[#FAF8F5] border-b border-[#E5E0D8]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-bold tracking-[0.2em] uppercase text-[#E07A28] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A28]" />
            <span>Our 6 Core Selling Processes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A2540] font-bold tracking-tight">
            Six Processes That Keep Sellers Informed
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#6B7280] mt-3 leading-relaxed">
            Every listing follows the same six-part approach, from marketing and communication to pricing and contract flexibility, so you know what Brian is doing and why.
          </p>
        </div>

        {/* 
          ULTRA-PREMIUM PROCESS NAVIGATION (Processes 1 to 6)
          Designed with luxury glassmorphism, gold accents, and architectural depth
        */}
        <div className="relative bg-gradient-to-b from-[#002D61] via-[#00234B] to-[#001D40] p-2 sm:p-2.5 rounded-2xl mb-8 border border-white/15 shadow-2xl shadow-[#002D61]/25 overflow-hidden">
          {/* Subtle Golden Ambient Horizon Glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#EA580C]/60 to-transparent pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {PROCESS_CATEGORIES.map((process, idx) => {
              const isSelected = activeProcessIndex === idx;
              const Icon = PROCESS_ICONS[idx % PROCESS_ICONS.length];

              return (
                <button
                  key={process.id}
                  type="button"
                  onClick={() => setActiveProcessIndex(idx)}
                  className={`group relative p-3 sm:p-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden min-h-[92px] sm:min-h-[102px] ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#EA580C] via-[#C2410C] to-[#9A3412] !text-white font-bold shadow-xl shadow-orange-950/60 border border-amber-300/40 ring-1 ring-amber-300/30 -translate-y-0.5'
                      : 'bg-white/[0.06] hover:bg-white/[0.14] !text-white border border-white/10 hover:border-white/25 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Subtle Shimmer for active button */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 pointer-events-none" />
                  )}

                  <div className="flex items-center justify-between w-full mb-2 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-serif text-xs font-bold tracking-wider ${
                        isSelected ? 'text-amber-100' : 'text-[#F59E0B] group-hover:text-amber-300'
                      }`}>
                        0{process.number}
                      </span>
                      <Icon className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-white' : 'text-stone-300 group-hover:text-white transition-colors'
                      }`} />
                    </div>

                    <span
                      className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full transition-colors ${
                        isSelected
                          ? 'bg-black/30 text-amber-100 border border-white/20'
                          : 'bg-black/25 text-stone-300 border border-white/10 group-hover:text-white'
                      }`}
                    >
                      {process.items.length} Steps
                    </span>
                  </div>

                  <div className={`font-serif text-xs sm:text-[13px] font-bold leading-snug relative z-10 transition-colors ${
                    isSelected ? '!text-white drop-shadow-xs' : 'text-stone-100 group-hover:text-white'
                  }`}>
                    {process.name}
                  </div>

                  {/* Active bottom accent bar */}
                  {isSelected && (
                    <div className="h-0.5 w-8 bg-gradient-to-r from-amber-200 to-amber-400 rounded-full mt-2.5 mx-auto relative z-10 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 
          ACTIVE PROCESS HEADER BANNER
          Provides clean, instant context for the active process + LINK TO DEDICATED SINGLE PAGE
        */}
        <div className="bg-white/95 backdrop-blur-md border border-[#EA580C]/25 rounded-2xl p-6 sm:p-7 mb-8 shadow-md shadow-stone-900/5 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#002D61] via-[#EA580C] to-[#002D61] pointer-events-none" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#EA580C]/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#EA580C]" />
                <span>Process 0{activeProcess.number} of 06 · {activeProcess.items.length} Strategic Protocols</span>
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] tracking-tight">
              {activeProcess.number}. {activeProcess.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-2 font-sans leading-relaxed max-w-3xl">
              {activeProcess.subheading}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Link to Dedicated Single Page */}
            <button
              type="button"
              onClick={() => handleGoToSinglePage(activeProcess.slug)}
              className="px-5 py-2.5 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 border border-white/10"
            >
              <span>View Dedicated Process Page</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-orange-600/30 hover:shadow-orange-600/50 cursor-pointer items-center gap-2"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 
          UNIFORM SUB-PROCESS VISUAL CARD GRID
          EVERY sub-process has:
          1. Dedicated high-quality picture
          2. Number badge
          3. Exact title from client
          4. Professional company-perspective description
          5. Link to the dedicated single sub-page
        */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProcess.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeProcess.items.map((item, iIdx) => (
              <div
                key={item.id || iIdx}
                onClick={() => handleGoToSinglePage(item.slug || activeProcess.slug)}
                className="group bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#E07A28] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Photo Header with 100% Crisp White Title & Dark Scrim */}
                  <div className="relative h-52 w-full overflow-hidden bg-[#0A2540]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />
                    {/* Deep Scrim Overlay for maximum text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/45 to-transparent" />

                    {/* Step Number Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider border border-white/20">
                        {item.number}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0A2540] text-[9px] font-bold tracking-wider flex items-center gap-1 shadow-sm">
                        <span>Open Subpage</span>
                        <ExternalLink className="w-2.5 h-2.5 text-[#E07A28]" />
                      </span>
                    </div>

                    {/* Title on Graphic bottom in Crisp 100% White */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h4 className="font-serif text-base sm:text-lg font-bold !text-white group-hover:!text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                        {toTitleCase(item.title)}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Company-Perspective Description */}
                    <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Bottom Meta Bar */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#E5E0D8]/60 flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span className="inline-flex items-center gap-1.5 text-[#0A2540] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A28]" />
                      <span>Corporate Standard</span>
                    </span>
                    <span className="text-[11px] font-bold text-[#E07A28] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Explore Subpage</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 
          BOTTOM GUARANTEE SEAL & CONSULTATION BANNER
        */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-[#0A2540] text-white border border-[#0A2540] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase text-[#F59E0B] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>100% Risk-Free Seller Protection</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Sell With Confidence, Knowing You Can Walk Away Anytime
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              This listing agreement has no long-term lock-in. If promises are not met, you can cancel and move forward without penalty, so the choice stays yours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenValuation}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-[#0A2540] hover:bg-[#FAF8F5] text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer text-center"
            >
              Get Free Valuation
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E07A28] hover:bg-[#C86518] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#E07A28]/30 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
