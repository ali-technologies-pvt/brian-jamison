import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
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

export const PROCESS_CATEGORIES: ProcessCategory[] = [
  {
    id: 'marketing-plan-and-process',
    number: '1',
    name: 'Marketing plan and process',
    slug: '/services/marketing-plan-and-process',
    subheading:
      'Every listing gets a full marketing campaign built to put your home in front of every qualified buyer.',
    items: PROCESS_ONE_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: d.title,
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
      'Jamison Real Estate enforces transparent, timely, and disciplined communication so you retain total control throughout the transaction.',
    items: PROCESS_TWO_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: d.title,
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
      'Our agency maintains uninterrupted seven-day reachability with dedicated backup coverage so opportunities are never missed.',
    items: PROCESS_THREE_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: d.title,
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
    name: 'Team support',
    slug: '/services/team-support',
    subheading:
      'Jamison Real Estate operates a dedicated specialized support network so every operational, legal, and creative detail is handled by an expert.',
    items: PROCESS_FOUR_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: d.title,
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
    name: 'Pricing strategy',
    slug: '/services/pricing-strategy',
    subheading:
      'Our pricing methodology is data-driven and buyer-minded, calculated to trigger multiple competing offers.',
    items: PROCESS_FIVE_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: d.title,
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
    name: 'Fair pricing and contract flexibility',
    slug: '/services/fair-pricing-and-contract-flexibility',
    subheading:
      'Our partnership model guarantees 100% mutual alignment with our unconditional cancel-anytime pledge.',
    items: PROCESS_SIX_DELIVERABLES.map((d) => ({
      id: d.id,
      number: d.badge.replace('Step ', ''),
      title: d.title,
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
            <span>Services We Provide</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A2540] font-bold tracking-tight">
            Our 6 Core Selling Processes
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#6B7280] mt-3 leading-relaxed">
            Jamison Real Estate executes a structured, 6-phase corporate selling methodology. Select any process to examine its sub-processes, or click to open its dedicated single page.
          </p>
        </div>

        {/* 
          100% CONSISTENT PROCESS TABS (Processes 1 to 6 in exact user sequence)
          Styled in a luxury dark container with 100% crisp white text
        */}
        <div className="bg-[#0A2540] p-2.5 sm:p-3.5 rounded-2xl mb-10 border border-white/10 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
            {PROCESS_CATEGORIES.map((process, idx) => {
              const isSelected = activeProcessIndex === idx;
              return (
                <button
                  key={process.id}
                  type="button"
                  onClick={() => setActiveProcessIndex(idx)}
                  className={`group p-3 sm:p-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#E07A28] !text-white font-bold shadow-md scale-102 ring-2 ring-white/50 -translate-y-0.5'
                      : 'bg-white/10 hover:bg-white/20 !text-white border border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <span className="font-serif text-xs font-bold !text-white">
                      {process.number}.
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-black/30 !text-white'
                          : 'bg-black/25 !text-white'
                      }`}
                    >
                      {process.items.length} Steps
                    </span>
                  </div>

                  <div className="font-serif text-xs sm:text-sm font-bold !text-white line-clamp-2 leading-snug">
                    {process.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 
          ACTIVE PROCESS HEADER BANNER
          Provides clean, instant context for the active process + LINK TO DEDICATED SINGLE PAGE
        */}
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-7 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A28] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#E5E0D8]">
                Process {activeProcess.number} of 6
              </span>
              <span className="text-xs text-[#6B7280] font-medium">
                {activeProcess.items.length} Dedicated Sub-Processes
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2540]">
              {activeProcess.number}. {activeProcess.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1.5 font-sans leading-relaxed max-w-3xl">
              {activeProcess.subheading}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Link to Dedicated Single Page */}
            <button
              type="button"
              onClick={() => handleGoToSinglePage(activeProcess.slug)}
              className="px-5 py-2.5 rounded-full bg-[#0A2540] hover:bg-[#E07A28] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-sm cursor-pointer flex items-center gap-2"
            >
              <span>View Dedicated Process Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-[#E07A28] hover:bg-[#C86518] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-sm cursor-pointer items-center gap-2"
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
                        {item.title}
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
              Ready to sell with a Top 2% OKC agent?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              Every listing agreement includes our unconditional Cancel-Anytime Pledge: if Brian Jamison fails to meet our contractual marketing, communication, and fiduciary commitments, fire us with zero penalty.
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
