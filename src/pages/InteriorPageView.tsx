import React, { useState } from 'react';
import { InteriorPageData } from './types';
import { InteriorHeroVideo } from './InteriorHeroVideo';
import { InteriorMediaTour } from './InteriorMediaTour';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Compass,
  MapPin,
  Clock,
  Phone,
  HelpCircle,
  FileCheck,
  ChevronRight,
  Layers,
  ArrowUpRight,
  Search,
  Building
} from 'lucide-react';
import { BROKER_INFO, MICRO_MARKETS, MicroMarket } from '../data/realEstateData';
import { BrianAvatar } from '../components/BrianAvatar';
import { PhilosophySection } from '../components/PhilosophySection';
import { LISTING_STANDARDS_DATA } from '../components/ListingStandardsSection';
import { CORE_PROCESSES_NAV } from './serviceData';
import { HomeSellingPage } from './HomeSellingPage';
import { HomeBuyingPage } from './HomeBuyingPage';
import { LandSalesPage } from './LandSalesPage';
import { NeighborhoodDetailView } from './NeighborhoodDetailView';

interface InteriorPageViewProps {
  page: InteriorPageData;
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const InteriorPageView: React.FC<InteriorPageViewProps> = ({
  page,
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [areasCategoryFilter, setAreasCategoryFilter] = useState<'all' | 'luxury' | 'north' | 'west-south'>('all');
  const [areasSearchQuery, setAreasSearchQuery] = useState('');
  // 1. Dedicated Home Buying Service Page (/services/home-buying)
  if (
    page.id === 'home-buying' ||
    page.id === 'home-buying-direct' ||
    page.slug === '/services/home-buying' ||
    page.slug === '/home-buying'
  ) {
    return (
      <HomeBuyingPage
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />
    );
  }

  // 2. Dedicated Home Selling Service Page (/services/home-selling)
  if (
    page.id === 'home-selling' ||
    page.id === 'home-selling-direct' ||
    page.slug === '/services/home-selling' ||
    page.slug === '/home-selling'
  ) {
    return (
      <HomeSellingPage
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />
    );
  }

  // 3. Dedicated Land Buying & Selling Service Page (/services/land-sales & /services/land-buying-and-selling)
  if (
    page.id === 'land-buying-and-selling' ||
    page.id === 'land-buying-direct' ||
    page.id === 'land-sales' ||
    page.id === 'land-sales-direct' ||
    page.slug === '/services/land-sales' ||
    page.slug === '/services/land-buying-and-selling' ||
    page.slug === '/land-sales' ||
    page.slug === '/land-buying-and-selling'
  ) {
    return (
      <LandSalesPage
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />
    );
  }

  // 4. Dedicated 8-Section Neighborhood & Community Detail View for all 21 Oklahoma Enclaves
  if (
    page.category === 'community' &&
    page.id !== 'areas' &&
    page.slug !== '/areas'
  ) {
    return (
      <NeighborhoodDetailView
        page={page}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />
    );
  }

  const getCategoryLabel = () => {
    switch (page.category) {
      case 'service':
        return '6-Phase Blueprint';
      case 'community':
        return 'OKC Communities';
      case 'audience':
        return 'Client Hub';
      case 'brand':
        return 'Company & Track Record';
      default:
        return 'Advisory';
    }
  };

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 1. Cinematic Video Background Hero */}
      <InteriorHeroVideo
        kicker={page.kicker}
        title={page.title}
        subtitle={page.subtitle}
        categoryLabel={getCategoryLabel()}
        heroVideoUrl={page.heroVideoUrl}
        heroFallbackImage={page.heroFallbackImage}
        metrics={page.heroMetrics}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* 2. Executive Overview & Takeaway Highlights */}
      <section className="w-full py-16 sm:py-24 border-b border-[#EA580C]/30 bg-[#FAF9F6]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              {page.parentProcess && (
                <div className="mb-5">
                  <button
                    type="button"
                    onClick={() => onNavigate(page.parentProcess!.slug)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#EA580C]/40 text-xs font-semibold text-[#002D61] shadow-2xs hover:border-[#EA580C] transition-all cursor-pointer group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] rotate-180 group-hover:-translate-x-1 transition-transform" />
                    <span>Part of Process {page.parentProcess.number}: <strong className="text-[#EA580C] underline decoration-[#EA580C]/40 underline-offset-2">{page.parentProcess.title}</strong></span>
                  </button>
                </div>
              )}
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
                Strategic Briefing
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#002D61] leading-tight mb-6">
                Uncompromising Execution for Oklahoma Property Owners
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 font-normal">
                {page.overview}
              </p>

              {/* Dedicated Architectural Warm-Sand Card (#F5EFE6) for About Page */}
              {page.id === 'about' && (
                <div className="my-8 p-6 sm:p-8 rounded-3xl bg-[#F5EFE6] border border-[#EA580C]/30 shadow-md">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                    <BrianAvatar
                      size={160}
                      priority={false}
                      showStatusDot={true}
                      className="w-36 h-36 sm:w-40 sm:h-40 shadow-lg shrink-0"
                      alt="Brian Jamison - Collegiate Athlete & Top 2% Producer"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-1">
                        License #184931 · REALTOR®
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-1">
                        Brian Jamison
                      </h3>
                      <p className="font-sans text-xs text-[#6B7280]">
                        Salt Real Estate Corporate Office · 1508 W. Edmond Rd., Edmond, OK 73003
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white border border-[#EA580C]/30 text-[11px] font-semibold text-[#002D61]">
                          Top 2% Producer OKC Metro
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white border border-[#EA580C]/30 text-[11px] font-semibold text-[#002D61]">
                          Collegiate Athlete Alum
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    A former collegiate athlete, Brian brings championship discipline, physical presence at every inspection and appraisal, and relentless negotiating stamina to Oklahoma City real estate. Your equity is never handed off to junior assistants.
                  </p>
                </div>
              )}

              {/* Key Takeaways Grid */}
              <div className="bg-[#F5EFE6] border border-[#EA580C]/30 rounded-2xl p-6 sm:p-8 mt-8">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-[#EA580C]" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#002D61]">
                    Key Takeaways & Differentiators
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {page.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card Column: Cancel-Anytime & Advisory Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cancel-Anytime Pledge Callout with Brian Headshot & Commitment Signature */}
              <div className="bg-white border border-[#EA580C]/30 rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#EA580C]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#EA580C] bg-[#F5EFE6] px-2.5 py-1 rounded-full border border-[#EA580C]/30">
                    100% Risk-Free Guarantee
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#002D61] mb-2">
                  Cancel-Anytime Listing Pledge
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-5">
                  Brian Jamison believes that trust is earned through execution. If every written commitment is not met to your exact satisfaction, you may cancel your listing agreement immediately. Zero penalty, zero hassle.
                </p>

                {/* Personal Commitment Signature Block */}
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/40 mb-5 flex items-center gap-3">
                  <BrianAvatar size={48} showStatusDot={true} alt="Brian Jamison - Personal Guarantee" />
                  <div>
                    <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#EA580C] block">
                      Personal Signature Pledge
                    </span>
                    <span className="font-serif text-sm font-bold text-[#002D61] block">
                      Brian Jamison
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      License #184931 · Salt Corporate Office
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/30 text-xs text-[#002D61] font-medium flex items-center justify-between mb-5">
                  <span>Contract Termination Fee:</span>
                  <span className="font-serif font-bold text-[#EA580C]">$0.00 Guaranteed</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs text-center"
                >
                  Consult with Brian Jamison
                </button>
              </div>

              {/* Direct Desk Badge with BrianAvatar */}
              <div className="p-6 bg-[#F5EFE6] border border-[#EA580C]/30 rounded-2xl flex items-center gap-4">
                <BrianAvatar size={48} alt={BROKER_INFO.name} />
                <div>
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#EA580C] block">
                    Direct Representation
                  </span>
                  <span className="font-serif text-base font-bold text-[#002D61] block">
                    {BROKER_INFO.name}
                  </span>
                  <a
                    href={`tel:${BROKER_INFO.phoneRaw}`}
                    className="text-xs text-[#4B5563] hover:text-[#EA580C] flex items-center gap-1 mt-0.5"
                  >
                    <Phone className="w-3 h-3 text-[#EA580C]" />
                    <span>{BROKER_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. Dedicated 21-Community Directory on /areas Index Page */}
      {page.id === 'areas' && (
        <section className="w-full py-16 sm:py-24 bg-[#F4F1EB] border-b border-[#EA580C]/30">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EA580C]/30 text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
                  <Building className="w-3.5 h-3.5" />
                  <span>Oklahoma City Metropolitan Enclaves</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002D61] tracking-tight">
                  Browse All 21 Service Areas
                </h2>
              </div>

              {/* Search Input Filter */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#EA580C] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={areasSearchQuery}
                  onChange={(e) => setAreasSearchQuery(e.target.value)}
                  placeholder="Search city or school district..."
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#EA580C]/30 text-xs font-medium text-[#002D61] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                type="button"
                onClick={() => setAreasCategoryFilter('all')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  areasCategoryFilter === 'all'
                    ? 'bg-[#002D61] text-white shadow-md'
                    : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                }`}
              >
                All 21 Communities
              </button>
              <button
                type="button"
                onClick={() => setAreasCategoryFilter('luxury')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  areasCategoryFilter === 'luxury'
                    ? 'bg-[#002D61] text-white shadow-md'
                    : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                }`}
              >
                Historic & Luxury Enclaves
              </button>
              <button
                type="button"
                onClick={() => setAreasCategoryFilter('north')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  areasCategoryFilter === 'north'
                    ? 'bg-[#002D61] text-white shadow-md'
                    : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                }`}
              >
                North Metro & Edmond Corridors
              </button>
              <button
                type="button"
                onClick={() => setAreasCategoryFilter('west-south')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  areasCategoryFilter === 'west-south'
                    ? 'bg-[#002D61] text-white shadow-md'
                    : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                }`}
              >
                West & South Metro Expansion
              </button>
            </div>

            {/* Communities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MICRO_MARKETS.filter((m) => {
                const matchesCat =
                  areasCategoryFilter === 'all' || m.category === areasCategoryFilter;
                const matchesSearch =
                  !areasSearchQuery.trim() ||
                  m.name.toLowerCase().includes(areasSearchQuery.toLowerCase()) ||
                  m.overview.toLowerCase().includes(areasSearchQuery.toLowerCase()) ||
                  m.lifestyle.toLowerCase().includes(areasSearchQuery.toLowerCase());
                return matchesCat && matchesSearch;
              }).map((market) => (
                <div
                  key={market.id}
                  onClick={() => onNavigate(`/areas/${market.id}`)}
                  className="group rounded-2xl overflow-hidden bg-white border border-[#EA580C]/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-[#001D40]">
                      <img
                        src={market.image}
                        alt={market.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider bg-[#001D40]/90 backdrop-blur-md text-white border border-white/20">
                          {market.highlightBadge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="font-serif text-xl font-bold !text-white drop-shadow-md">
                          {market.name}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                        {market.lifestyle}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#EA580C]/20 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#EA580C] block">Median Price</span>
                          <span className="font-serif font-bold text-[#002D61] text-sm">{market.medianPrice}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#EA580C] block">Avg DOM</span>
                          <span className="font-serif font-bold text-[#002D61] text-sm">{market.avgDom}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F6] group-hover:bg-[#002D61] text-[#002D61] group-hover:text-white border border-[#002D61]/20 group-hover:border-[#002D61] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-between"
                    >
                      <span>Explore 8-Section Enclave Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Deliverables Matrix (For Services / Audience Pages / Standards) */}
      {page.deliverables && page.deliverables.length > 0 && (
        <section id="systematic-standards" className="w-full py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#EA580C]/30">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            {/* 6 Core Corporate Selling Processes Switcher */}
            <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#002D61] text-white shadow-lg border border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse" />
                  <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-white">
                    Our 6 Core Selling Processes
                  </span>
                </div>
                <span className="text-xs text-stone-300">
                  Select any process to explore corporate standards & sub-processes
                </span>
              </div>

              {/* Horizontal Grid of 6 Processes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {CORE_PROCESSES_NAV.map((proc) => {
                  const isCurrent =
                    page.id === proc.id ||
                    page.slug === proc.slug ||
                    page.parentProcess?.slug === proc.slug;
                  return (
                    <button
                      key={proc.id}
                      type="button"
                      onClick={() => onNavigate(proc.slug)}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#EA580C] !text-white font-bold shadow-md scale-102 ring-2 ring-white/50'
                          : 'bg-white/10 hover:bg-white/20 !text-white border border-white/10'
                      }`}
                    >
                      <span className="text-[10px] font-sans font-bold tracking-wider block !text-white">
                        Process {proc.number}
                      </span>
                      <span className="text-[11px] font-serif font-semibold leading-tight line-clamp-2 mt-1 !text-white">
                        {proc.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white border border-[#EA580C]/30 text-xs font-semibold text-[#EA580C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="tracking-[0.25em] uppercase font-sans">
                  Execution Deliverables & Standards
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#002D61] tracking-tight">
                Systematic Roadmap & Standards
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#4B5563] mt-3 leading-relaxed">
                Here is the exact visual transformation and marketing machine deployed for your property. We don't just put a sign in the yard; we execute each of these standards to maximize your net proceeds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {page.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white border-2 border-[#EA580C]/25 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#EA580C] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Graphic Header with High-Resolution Photography */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#002D61]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#002D61] to-[#001D40] flex items-center justify-center text-white">
                          <Sparkles className="w-10 h-10 text-[#FB923C]" />
                        </div>
                      )}

                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/92 via-[#002D61]/40 to-transparent" />

                      {/* Badges on Graphic */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider bg-[#002D61]/90 backdrop-blur-md text-white border border-white/20">
                          {idx + 1 < 10 ? `Step 0${idx + 1}` : `Step ${idx + 1}`}
                        </span>
                        {item.badge && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold bg-[#EA580C] text-white shadow-xs">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Title on Graphic bottom in Crisp White */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-serif text-lg font-bold !text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                        {item.desc}
                      </p>

                      {/* What We Do to Your Property Callout */}
                      {item.executionDetail && (
                        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/25 text-xs text-[#002D61]">
                          <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#EA580C] block mb-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                            What We Do To Your Property
                          </span>
                          <p className="text-xs text-[#374151] leading-relaxed">
                            {item.executionDetail}
                          </p>
                        </div>
                      )}

                      {/* Seller Impact & Value */}
                      {item.sellerImpact && (
                        <div className="flex items-start gap-2 pt-1 text-xs text-[#4B5563]">
                          <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                          <span className="leading-snug">
                            <strong className="text-[#002D61]">Seller Benefit: </strong>
                            {item.sellerImpact}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA Link */}
                  <div className="p-5 sm:p-6 pt-0">
                    {item.slug ? (
                      <button
                        type="button"
                        onClick={() => onNavigate(item.slug!)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F6] hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#002D61]/20 hover:border-[#002D61] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-between cursor-pointer group/btn"
                      >
                        <span>Explore Standard Subpage</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                      </button>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-2 border-t border-[#EA580C]/20">
                        <span className="font-medium text-[#EA580C]">Standard Execution Protocol</span>
                        <span>Included 100%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Next in Sequence Navigator */}
            {(() => {
              // 1. If this is a main process page
              const currentProcIndex = CORE_PROCESSES_NAV.findIndex(
                (p) => p.id === page.id || p.slug === page.slug
              );
              if (currentProcIndex >= 0) {
                const nextProc = CORE_PROCESSES_NAV[(currentProcIndex + 1) % CORE_PROCESSES_NAV.length];
                return (
                  <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#EA580C]/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#EA580C] block mb-1">
                        Next Process in the Corporate Sequence
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61]">
                        Process {nextProc.number}: {nextProc.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-xl">
                        Discover how our firm executes the next stage of listing marketing and transaction management.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate(nextProc.slug)}
                      className="px-6 py-3.5 bg-[#002D61] hover:bg-[#EA580C] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>Explore Process {nextProc.number}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              }

              // 2. If this is a sub-process page with parentProcess
              if (page.parentProcess) {
                return (
                  <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#EA580C]/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#EA580C] block mb-1">
                        Corporate Hierarchy
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61]">
                        Process {page.parentProcess.number}: {page.parentProcess.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#6B7280] mt-1 max-w-xl">
                        Explore all sister deliverables and marketing standards within this core phase.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigate(page.parentProcess!.slug)}
                      className="px-6 py-3.5 bg-[#002D61] hover:bg-[#EA580C] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>View Full Process Overview</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              }

              return null;
            })()}
          </div>
        </section>
      )}

      {/* 4. Local Schools & Lifestyle Matrix (For Community Pages) */}
      {page.schools && page.schools.length > 0 && (
        <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#EA580C]/30">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Schools Column */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-[#EA580C]" />
                  <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C]">
                    Education & Feeder Zones
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-6">
                  Top-Performing Local Schools
                </h2>
                <div className="space-y-4">
                  {page.schools.map((school, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl bg-white border border-[#EA580C]/30 flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#002D61]">
                          {school.name}
                        </h4>
                        <span className="text-xs text-[#6B7280]">
                          {school.type} {school.dist ? `· ${school.dist}` : ''}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#EA580C]/30 text-xs font-bold text-[#EA580C] shrink-0">
                        {school.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Highlights Column */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5 text-[#EA580C]" />
                  <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C]">
                    Area Culture & Amenities
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-6">
                  Lifestyle Highlights
                </h2>
                {page.lifestyleHighlights && (
                  <div className="bg-[#F5EFE6] border border-[#EA580C]/30 rounded-2xl p-6 sm:p-8">
                    <ul className="space-y-4">
                      {page.lifestyleHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#374151]">
                          <MapPin className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Embedded Media & Interactive Virtual Tour Suite: Rendered ONLY on Community pages to keep standards pages clean */}
      {page.category === 'community' && (
        <InteriorMediaTour
          title={`Virtual Tour & 4K Drone Suite · ${page.title}`}
          matterportTitle={`${page.title} — Matterport Pro3 Spatial Scan`}
        />
      )}

      {/* Philosophy & Athletic Ethos Section (Dedicated for About Page) */}
      {page.id === 'about' && (
        <PhilosophySection onOpenConsultation={onOpenConsultation} />
      )}

      {/* 7. Bottom Call to Action Banner */}
      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-t border-[#EA580C]/30">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-2">
              Ready to Take Action?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] mb-4">
              Schedule A Private Strategy Session
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] mb-8">
              Discuss your home's valuation trajectory, view unlisted micro-market comps, or review our cancel-anytime guarantee in detail.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Book Direct Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenValuation}
                className="px-8 py-4 bg-white hover:bg-[#F5EFE6] text-[#002D61] border border-[#EA580C]/30 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer"
              >
                Request 3-Tier Valuation
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
