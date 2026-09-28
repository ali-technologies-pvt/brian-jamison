import React, { useState } from 'react';
import { METHOD_PHASES, BROKER_INFO, BRIAN_HEADSHOT_IMG } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Maximize2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  FileCheck,
  Video,
  Target,
  Users
} from 'lucide-react';

interface TheMethodSectionProps {
  onOpenMethodModal: (phaseIndex: number) => void;
}

// Interactive virtual rooms simulated for the 3D Matterport tour feature in Phase 1
const VIRTUAL_ROOMS = [
  {
    name: "Great Room",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    detail: "24-ft beamed ceilings, European limestone fireplace, ambient golden hour lighting."
  },
  {
    name: "Chef's Scullery Kitchen",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    detail: "Calacatta marble island, dual Wolf ranges, bespoke white oak joinery."
  },
  {
    name: "Primary Retreat",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    detail: "Private sunset terrace, dual spa baths, heated marble floors."
  },
  {
    name: "Pool Pavilion & Loggia",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    detail: "Zero-edge pool, outdoor living kitchen, mature private oak perimeter."
  },
  {
    name: "HD Aerial Drone View",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    detail: "FAA-certified lot boundary mapping and golf course fairway proximity."
  }
];

// Phase visual showcase data for phases 2 to 6 so visitor is engaged instantly
const PHASE_VISUAL_CARDS = [
  {
    phaseNum: "01",
    icon: Video,
    metric: "350+ Portals",
    metricLabel: "Global Reach",
    insight: "Bespoke 4K architectural films & targeted Meta retargeting capture qualified buyers.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
  },
  {
    phaseNum: "02",
    icon: Clock,
    metric: "<2 Hours",
    metricLabel: "Mandatory Agent Feedback",
    insight: "Direct telephone debrief with every showing broker within 120 minutes of leaving.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
  },
  {
    phaseNum: "03",
    icon: ShieldCheck,
    metric: "7 Days / Wk",
    metricLabel: "Zero Lead Lag",
    insight: "High-net-worth buyers tour on evenings & weekends. Brian personally answers calls.",
    image: BRIAN_HEADSHOT_IMG
  },
  {
    phaseNum: "04",
    icon: Users,
    metric: "7 Specialists",
    metricLabel: "Dedicated Division",
    insight: "Escrow coordinator, staging pro, FAA drone pilot, and media designers manage logistics.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80"
  },
  {
    phaseNum: "05",
    icon: Target,
    metric: "3-Tier CMA",
    metricLabel: "Bidding War Architecture",
    insight: "Calibrated conservative, target, and aspirational pricing beneath search brackets.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
  },
  {
    phaseNum: "06",
    icon: FileCheck,
    metric: "100% Risk-Free",
    metricLabel: "Cancel-Anytime Pledge",
    insight: "Full performance accountability. If commitments are not met, cancel with zero penalty.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
  }
];

export const TheMethodSection: React.FC<TheMethodSectionProps> = ({ onOpenMethodModal }) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'3d' | 'dollhouse' | 'aerial'>('3d');

  const phase = METHOD_PHASES[currentPhaseIndex];
  const visualCard = PHASE_VISUAL_CARDS[currentPhaseIndex];

  const nextPhase = () => {
    setCurrentPhaseIndex((prev) => (prev + 1) % METHOD_PHASES.length);
  };

  const prevPhase = () => {
    setCurrentPhaseIndex((prev) => (prev - 1 + METHOD_PHASES.length) % METHOD_PHASES.length);
  };

  const phaseTabLabels = [
    "01 MEDIA SUITE",
    "02 COMMUNICATION",
    "03 24/7 ACCESS",
    "04 TEAM SUPPORT",
    "05 PRICING STRATEGY",
    "06 CANCEL-ANYTIME PLEDGE"
  ];

  return (
    <section id="the-method" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Intro & Value Proposition Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C]">
                The Proprietary Core Mechanism
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-medium tracking-tight">
              The 6-Step Seller Blueprint
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed mt-3">
              Instead of passive MLS bullet points, explore our visual selling engine designed to turn Oklahoma listings into high-demand bidding wars.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#6B7280] font-sans hidden sm:inline-block">
              Interactive Phase Walkthrough:
            </span>
            <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#EA580C]/30 rounded-lg shadow-xs">
              <button
                type="button"
                onClick={prevPhase}
                className="p-2 rounded-md hover:bg-[#FAF9F6] text-[#002D61] hover:text-[#EA580C] transition-colors cursor-pointer"
                aria-label="Previous Phase"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-semibold tabular-nums text-[#002D61]">
                Phase {currentPhaseIndex + 1} of 6
              </span>
              <button
                type="button"
                onClick={nextPhase}
                className="p-2 rounded-md hover:bg-[#FAF9F6] text-[#002D61] hover:text-[#EA580C] transition-colors cursor-pointer"
                aria-label="Next Phase"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 
          Main Interactive Stage:
          Grid with Left Summary Card & Right Deep-Dive Visual Experience.
          Seamlessly changes on stepper or tab click without confusing the visitor.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Left Column: Stage Intro & Stepper (Cols 4) */}
          <div className="lg:col-span-4 bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#EA580C]">
                  Phase {phase.number} Roadmap
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EA580C]/15 text-[#002D61] text-[10px] uppercase font-bold tracking-wider border border-[#EA580C]/30">
                  Active Focus
                </span>
              </div>

              <span className="font-serif text-6xl sm:text-7xl font-light text-[#EA580C] block mb-2">
                {phase.number}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#002D61] font-bold tracking-tight mb-4">
                {phase.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-6">
                {phase.summary}
              </p>

              {/* Key Impact Callout */}
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#EA580C]/30 mb-6">
                <span className="text-[10px] uppercase tracking-wider text-[#EA580C] font-bold block mb-1 font-sans">
                  The Seller Advantage
                </span>
                <p className="text-xs text-[#002D61] leading-relaxed mb-3">
                  {phase.tacticalImpact}
                </p>

                {/* Step 2 & Step 3: Direct Contact Pledge with Brian Avatar (48px) */}
                {(currentPhaseIndex === 1 || currentPhaseIndex === 2) && (
                  <div className="pt-3 border-t border-[#EA580C]/20 flex items-center gap-3">
                    <BrianAvatar size={48} alt="Brian Jamison Direct Contact" />
                    <div>
                      <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#EA580C] block">
                        Direct Cell Access
                      </span>
                      <p className="text-xs font-serif font-bold text-[#002D61] leading-tight">
                        “You communicate directly with Brian, 7 days a week.”
                      </p>
                      <span className="text-[10px] text-[#6B7280]">
                        Direct Phone: {BROKER_INFO.phone}
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 6: Cancel-Anytime Listing Pledge with Brian Avatar (48px) & Gold Seal */}
                {currentPhaseIndex === 5 && (
                  <div className="pt-3 border-t border-[#EA580C]/20 flex items-center gap-3">
                    <BrianAvatar size={48} showStatusDot={true} alt="Brian Jamison Personal Commitment Guarantee" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#EA580C]">
                          Personal Pledge
                        </span>
                        <span className="text-[9px] font-sans font-bold text-[#002D61] bg-white px-2 py-0.5 rounded border border-[#EA580C]">
                          100% Risk-Free
                        </span>
                      </div>
                      <p className="text-xs font-serif font-bold text-[#002D61] leading-tight mt-0.5">
                        Cancel-Anytime Listing Guarantee
                      </p>
                      <span className="text-[10px] text-[#6B7280] block font-sans">
                        “If my commitments are not met, cancel immediately. Zero penalty.”
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step Controls */}
            <div className="pt-6 border-t border-[#EA580C]/30 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onOpenMethodModal(currentPhaseIndex)}
                className="text-xs font-semibold uppercase tracking-wider text-[#EA580C] hover:text-[#C2410C] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Full Deliverables Checklist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevPhase}
                  className="w-9 h-9 rounded-full border border-[#EA580C]/30 bg-white flex items-center justify-center text-[#002D61] hover:text-[#EA580C] hover:border-[#EA580C] transition-all cursor-pointer shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextPhase}
                  className="w-9 h-9 rounded-full border border-[#EA580C]/30 bg-white flex items-center justify-center text-[#002D61] hover:text-[#EA580C] hover:border-[#EA580C] transition-all cursor-pointer shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Media Simulator & Standards (Cols 8) */}
          <div className="lg:col-span-8 bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              {/* Media Module: Phase 1 features the 3D Matterport Interactive Tour, other phases feature rich visual proof */}
              {currentPhaseIndex === 0 ? (
                <div className="mb-6 rounded-xl overflow-hidden border border-[#EA580C]/30 bg-[#002D61] text-white">
                  {/* Tour Header Bar */}
                  <div className="px-4 py-3 bg-[#002D61] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-sans font-medium tracking-wide uppercase text-[11px] text-stone-200">
                        Matterport 3D Interactive Walkthrough · Nichols Hills Listing
                      </span>
                    </div>

                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md">
                      <button
                        type="button"
                        onClick={() => setViewMode('3d')}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-medium transition-colors ${
                          viewMode === '3d' ? 'bg-[#EA580C] text-[#002D61] font-bold' : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        3D Walkthrough
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('dollhouse')}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-medium transition-colors ${
                          viewMode === 'dollhouse' ? 'bg-[#EA580C] text-[#002D61] font-bold' : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        Dollhouse View
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('aerial')}
                        className={`px-2.5 py-1 rounded text-[10px] uppercase font-medium transition-colors ${
                          viewMode === 'aerial' ? 'bg-[#EA580C] text-[#002D61] font-bold' : 'text-stone-300 hover:text-white'
                        }`}
                      >
                        Drone Aerial
                      </button>
                    </div>
                  </div>

                  {/* Room Display Canvas */}
                  <div className="relative h-64 sm:h-80 w-full overflow-hidden group">
                    <img
                      src={VIRTUAL_ROOMS[activeRoomIndex].image}
                      alt={VIRTUAL_ROOMS[activeRoomIndex].name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Room Overlay Details */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#FB923C] block font-sans font-semibold drop-shadow-xs">
                          Active Virtual Hotspot
                        </span>
                        <h4
                          style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)' }}
                          className="font-serif text-lg sm:text-xl !text-white font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                        >
                          {VIRTUAL_ROOMS[activeRoomIndex].name}
                        </h4>
                        <p className="text-xs text-stone-200 max-w-md hidden sm:block drop-shadow-xs">
                          {VIRTUAL_ROOMS[activeRoomIndex].detail}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenMethodModal(0)}
                        className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all cursor-pointer hover:scale-105"
                        title="Expand Full Screen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Room Quick-Switcher */}
                  <div className="p-3 bg-[#002D61] flex items-center gap-2 overflow-x-auto border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#FB923C] font-sans shrink-0 pl-1 font-bold">
                      Jump Room:
                    </span>
                    {VIRTUAL_ROOMS.map((room, rIdx) => (
                      <button
                        key={room.name}
                        type="button"
                        onClick={() => setActiveRoomIndex(rIdx)}
                        className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                          activeRoomIndex === rIdx
                            ? 'bg-[#EA580C] text-white font-bold shadow-xs'
                            : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        {room.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Dynamic Visual Card for Phases 2 - 6 */
                <div className="mb-6 rounded-xl overflow-hidden border border-[#EA580C]/30 bg-white shadow-xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                    <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#EA580C]/30 text-xs font-semibold text-[#EA580C] mb-4">
                          <visualCard.icon className="w-3.5 h-3.5" />
                          <span>{visualCard.metricLabel}</span>
                        </div>

                        <div className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] mb-2 tracking-tight">
                          {visualCard.metric}
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                          {visualCard.insight}
                        </p>
                      </div>

                      {currentPhaseIndex === 5 ? (
                        <div className="pt-4 border-t border-[#EA580C]/30 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <BrianAvatar size={48} showStatusDot={true} alt="Brian Jamison - Cancel Anytime Signature" />
                            <div>
                              <span className="font-serif font-bold text-sm text-[#002D61] block">
                                Brian Jamison
                              </span>
                              <span className="text-[10px] font-sans text-[#6B7280]">
                                Broker Associate · {BROKER_INFO.license}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] border-2 border-[#EA580C] rounded-lg text-[11px] font-bold text-[#002D61]">
                            <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
                            <span>Cancel-Anytime Pledge</span>
                          </div>
                        </div>
                      ) : (currentPhaseIndex === 1 || currentPhaseIndex === 2) ? (
                        <div className="pt-4 border-t border-[#EA580C]/30 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <BrianAvatar size={48} alt="Brian Jamison - Direct Accessibility" />
                            <div>
                              <span className="font-serif font-bold text-xs text-[#002D61] block">
                                Direct Advisor
                              </span>
                              <span className="text-[11px] font-sans text-[#6B7280]">
                                {BROKER_INFO.phone} · Mon-Sun
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#EA580C] block">
                              Availability
                            </span>
                            <span className="text-xs font-semibold text-[#002D61]">
                              7 Days / Week
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-4 border-t border-[#EA580C]/30 flex items-center gap-2 text-xs text-[#002D61] font-medium">
                          <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
                          <span>Enforced on 100% of Brian Jamison listings</span>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-5 relative h-48 md:h-auto min-h-[200px]">
                      <img
                        src={visualCard.image}
                        alt={phase.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/40 to-transparent" />
                    </div>
                  </div>
                </div>
              )}

              {/* Deliverables Checklist Grid */}
              <div className="border-t border-[#EA580C]/30 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#002D61]">
                    Key Deliverables in Phase {phase.number}
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    {phase.keyDeliverables.length} Standards Enforced
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {phase.keyDeliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#002D61] p-2 rounded-lg hover:bg-white transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#EA580C]/20 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="font-normal text-[#002D61]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Phase CTA */}
            <div className="mt-8 pt-6 border-t border-[#EA580C]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-[#6B7280]">
                Want this exact blueprint applied to your property?
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenMethodModal(currentPhaseIndex)}
                  className="px-7 py-3.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 cursor-pointer text-center"
                >
                  View Full 6-Phase System & Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 
          Horizontal Phase Navigation Tabs (Segmented Controller):
          Allow direct one-click jump to any phase.
          Visitors easily understand each phase at a glance without feeling lost.
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {phaseTabLabels.map((label, idx) => {
            const isSelected = currentPhaseIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentPhaseIndex(idx)}
                className={`py-3.5 px-3 text-[11px] font-sans tracking-wider uppercase text-center rounded-xl border transition-all duration-200 cursor-pointer truncate ${
                  isSelected
                    ? 'bg-[#EA580C] text-white font-bold border-2 border-[#EA580C] shadow-md shadow-orange-600/25 -translate-y-0.5'
                    : 'bg-[#FAF9F6] text-[#6B7280] hover:text-[#002D61] border border-[#EA580C]/30 hover:border-[#EA580C] hover:bg-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
