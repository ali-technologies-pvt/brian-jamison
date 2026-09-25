import React from 'react';
import { InteriorPageData } from './types';
import { InteriorHeroVideo } from './InteriorHeroVideo';
import { InteriorGallery } from './InteriorGallery';
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
  FileCheck
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from '../components/BrianAvatar';

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
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#B38F68]/20 selection:text-[#1B1D21]">
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
      <section className="w-full py-16 sm:py-24 border-b border-[#E6E2DA] bg-[#FAF9F6]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#B38F68] block mb-3">
                Strategic Briefing
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1D21] leading-tight mb-6">
                Uncompromising Execution for Oklahoma Property Owners
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 font-normal">
                {page.overview}
              </p>

              {/* Dedicated Architectural Warm-Sand Card (#F5EFE6) for About Page */}
              {page.id === 'about' && (
                <div className="my-8 p-6 sm:p-8 rounded-3xl bg-[#F5EFE6] border border-[#E6E2DA] shadow-md">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                    <BrianAvatar
                      size={160}
                      priority={false}
                      showStatusDot={true}
                      className="w-36 h-36 sm:w-40 sm:h-40 shadow-lg shrink-0"
                      alt="Brian Jamison - Collegiate Athlete & Top 2% Producer"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold text-[#B38F68] block mb-1">
                        License #184931 · REALTOR®
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1D21] mb-1">
                        Brian Jamison
                      </h3>
                      <p className="font-sans text-xs text-[#6B7280]">
                        Salt Real Estate Corporate Office · 1508 W. Edmond Rd., Edmond, OK 73003
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-white border border-[#E6E2DA] text-[11px] font-semibold text-[#1B1D21]">
                          Top 2% Producer OKC Metro
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white border border-[#E6E2DA] text-[11px] font-semibold text-[#1B1D21]">
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
              <div className="bg-[#F4F1EB] border border-[#E6E2DA] rounded-2xl p-6 sm:p-8 mt-8">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-[#B38F68]" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B1D21]">
                    Key Takeaways & Differentiators
                  </h3>
                </div>
                <ul className="space-y-3.5">
                  {page.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#B38F68] shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Card Column: Cancel-Anytime & Advisory Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cancel-Anytime Pledge Callout with Brian Headshot & Commitment Signature */}
              <div className="bg-white border border-[#E6E2DA] rounded-2xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F4F1EB] flex items-center justify-center text-[#B38F68]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#B38F68] bg-[#F4F1EB] px-2.5 py-1 rounded-full border border-[#E6E2DA]">
                    100% Risk-Free Guarantee
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1B1D21] mb-2">
                  Cancel-Anytime Listing Pledge
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-5">
                  Brian Jamison believes that trust is earned through execution. If every written commitment is not met to your exact satisfaction, you may cancel your listing agreement immediately. Zero penalty, zero hassle.
                </p>

                {/* Personal Commitment Signature Block */}
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5A93C]/40 mb-5 flex items-center gap-3">
                  <BrianAvatar size={48} showStatusDot={true} alt="Brian Jamison - Personal Guarantee" />
                  <div>
                    <span className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#B38F68] block">
                      Personal Signature Pledge
                    </span>
                    <span className="font-serif text-sm font-bold text-[#1B1D21] block">
                      Brian Jamison
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      License #184931 · Salt Corporate Office
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E6E2DA] text-xs text-[#1B1D21] font-medium flex items-center justify-between mb-5">
                  <span>Contract Termination Fee:</span>
                  <span className="font-serif font-bold text-[#B38F68]">$0.00 Guaranteed</span>
                </div>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 bg-[#B38F68] hover:bg-[#9E7A56] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs text-center"
                >
                  Consult with Brian Jamison
                </button>
              </div>

              {/* Direct Desk Badge with BrianAvatar */}
              <div className="p-6 bg-[#F4F1EB] border border-[#E6E2DA] rounded-2xl flex items-center gap-4">
                <BrianAvatar size={48} alt={BROKER_INFO.name} />
                <div>
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#B38F68] block">
                    Direct Representation
                  </span>
                  <span className="font-serif text-base font-bold text-[#1B1D21] block">
                    {BROKER_INFO.name}
                  </span>
                  <a
                    href={`tel:${BROKER_INFO.phoneRaw}`}
                    className="text-xs text-[#4B5563] hover:text-[#B38F68] flex items-center gap-1 mt-0.5"
                  >
                    <Phone className="w-3 h-3 text-[#B38F68]" />
                    <span>{BROKER_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deliverables Matrix (For Services / Audience Pages) */}
      {page.deliverables && page.deliverables.length > 0 && (
        <section className="w-full py-16 sm:py-24 bg-[#F4F1EB] border-b border-[#E6E2DA]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#B38F68] block mb-2">
                Execution Deliverables
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1D21]">
                Systematic Roadmap & Standards
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-2">
                Every deliverable below is executed with precision, audited contract timelines, and dedicated staff.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E6E2DA] rounded-2xl p-6 shadow-2xs hover:shadow-md hover:border-[#B38F68]/40 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#E6E2DA] flex items-center justify-center text-[#B38F68] mb-4 font-serif font-bold text-sm">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B1D21] mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Local Schools & Lifestyle Matrix (For Community Pages) */}
      {page.schools && page.schools.length > 0 && (
        <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#E6E2DA]">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Schools Column */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-[#B38F68]" />
                  <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#B38F68]">
                    Education & Feeder Zones
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1D21] mb-6">
                  Top-Performing Local Schools
                </h2>
                <div className="space-y-4">
                  {page.schools.map((school, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-xl bg-white border border-[#E6E2DA] flex items-center justify-between shadow-2xs"
                    >
                      <div>
                        <h4 className="font-serif text-base font-bold text-[#1B1D21]">
                          {school.name}
                        </h4>
                        <span className="text-xs text-[#6B7280]">
                          {school.type} {school.dist ? `· ${school.dist}` : ''}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#FAF9F6] border border-[#E6E2DA] text-xs font-bold text-[#B38F68] shrink-0">
                        {school.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Highlights Column */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-5 h-5 text-[#B38F68]" />
                  <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#B38F68]">
                    Area Culture & Amenities
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1D21] mb-6">
                  Lifestyle Highlights
                </h2>
                {page.lifestyleHighlights && (
                  <div className="bg-[#F4F1EB] border border-[#E6E2DA] rounded-2xl p-6 sm:p-8">
                    <ul className="space-y-4">
                      {page.lifestyleHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#374151]">
                          <MapPin className="w-4 h-4 text-[#B38F68] shrink-0 mt-0.5" />
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

      {/* 5. Embedded Media & Interactive Virtual Tour Suite (Videos 2 & 3 + Matterport) */}
      <InteriorMediaTour
        title={`Virtual Tour & 4K Drone Suite · ${page.title}`}
        matterportTitle={`${page.title} — Matterport Pro3 Spatial Scan`}
      />

      {/* 6. Curated 12-Image Visual Portfolio & Before/After Staging Slider */}
      <InteriorGallery
        title={`Architectural Portfolio · ${page.title}`}
        subtitle="12 high-resolution editorial captures demonstrating interior light, luxury finishes, and curb appeal."
        images={page.images}
      />

      {/* 7. Bottom Call to Action Banner */}
      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-t border-[#E6E2DA]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#B38F68] block mb-2">
              Ready to Take Action?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1D21] mb-4">
              Schedule A Private Strategy Session
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] mb-8">
              Discuss your home's valuation trajectory, view unlisted micro-market comps, or review our cancel-anytime guarantee in detail.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-[#B38F68] hover:bg-[#9E7A56] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Book Direct Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenValuation}
                className="px-8 py-4 bg-white hover:bg-[#F4F1EB] text-[#1B1D21] border border-[#E6E2DA] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer"
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
