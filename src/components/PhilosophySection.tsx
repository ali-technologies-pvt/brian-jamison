import React from 'react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { Phone, ArrowUpRight, Award, Shield, CheckCircle2, Trophy, GraduationCap } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenConsultation: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="leadership" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Warm-Sand Framed Card (#F5EFE6) with Brian's Headshot & Athletic Background */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#EA580C]/40 shadow-xl bg-[#F5EFE6] p-6 sm:p-8">
              {/* Top Authority Header & Headshot Presentation (160px dynamic sizing) */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mb-6">
                <div className="shrink-0 relative">
                  <BrianAvatar
                    size={160}
                    priority={false}
                    showStatusDot={true}
                    className="w-36 h-36 sm:w-40 sm:h-40 shadow-xl"
                    alt="Brian Jamison - Collegiate Athlete & Top 2% Producer"
                  />
                  {/* Athletic Division Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-[#0A192F] text-white p-2 rounded-full border-2 border-[#EA580C] shadow-md" title="Collegiate Athlete Alum">
                    <Trophy className="w-4 h-4 text-[#EA580C]" />
                  </div>
                </div>

                <div className="flex-1">
                  <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-1">
                    Lead Representative
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A192F] mb-1">
                    Brian Jamison
                  </h3>
                  <p className="font-sans text-xs font-semibold text-[#0A192F] mb-1">
                    {BROKER_INFO.license} · REALTOR®
                  </p>
                  <p className="font-sans text-xs text-[#6B7280] leading-snug">
                    Salt Real Estate Corporate Office
                  </p>
                  <p className="font-sans text-[11px] text-[#6B7280] mt-0.5">
                    1508 W. Edmond Rd., Edmond, OK 73003
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#EA580C]/30 text-[11px] font-semibold text-[#0A192F]">
                      <Award className="w-3.5 h-3.5 text-[#EA580C]" />
                      Top 2% Producer OKC
                    </span>
                  </div>
                </div>
              </div>

              {/* Collegiate Athletic Discipline & Background Block */}
              <div className="bg-white/95 backdrop-blur-xs border border-[#EA580C]/30 rounded-2xl p-4 sm:p-5 mb-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#0A192F]">
                  <GraduationCap className="w-4 h-4 text-[#EA580C]" />
                  <span>Collegiate Athletic Ethos</span>
                </div>
                <p className="font-sans text-xs text-[#4B5563] leading-relaxed">
                  Brian channels collegiate athletic discipline into relentless real estate negotiations. Every contingency, appraisal defense, and closing detail is managed with championship preparation and zero compromise.
                </p>
                <div className="pt-2.5 border-t border-[#EA580C]/20 flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span>Track Record: $62M+ Volume</span>
                  <span className="font-semibold text-[#0A192F]">370+ Closings</span>
                </div>
              </div>

              {/* Direct Reachability & Call CTA */}
              <div className="flex items-center justify-between bg-[#FAF9F6] border border-[#EA580C]/30 rounded-xl p-3 sm:p-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#EA580C]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#6B7280] block">
                      Direct Cell (7 Days)
                    </span>
                    <a
                      href={`tel:${BROKER_INFO.phoneRaw}`}
                      className="font-serif font-bold text-xs sm:text-sm text-[#0A192F] hover:text-[#EA580C] transition-colors"
                    >
                      {BROKER_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-emerald-600 block flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available Today
                  </span>
                  <span className="text-[10px] text-[#6B7280]">
                    Cancel-Anytime Pledge
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle decorative architectural stone badge */}
            <div className="hidden sm:flex absolute -top-3 -right-3 bg-white border border-[#EA580C]/40 rounded-xl p-3 shadow-md items-center gap-2 text-xs font-semibold text-[#0A192F] z-10">
              <Shield className="w-4 h-4 text-[#EA580C]" />
              <span>100% Risk-Free Guarantee</span>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy & 3 Grounding Principles */}
          <div className="lg:col-span-7">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-3">
              Philosophy & Ethos
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A192F] leading-tight font-medium tracking-tight mb-6 text-balance">
              “The Most Expensive Part of Any Real Estate Deal Is What You Don’t Know.”
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed mb-8 font-normal">
              Real estate is easy when everything goes smoothly. The real value of an elite advisor reveals itself when high-stakes tension rises, multiple offers arrive, or appraisal and inspection disputes threaten your equity.
            </p>

            {/* 3 Pillar Statements */}
            <div className="space-y-6 mb-10">
              {/* Pillar 01 */}
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#EA580C] tabular-nums shrink-0 mt-0.5">
                  01
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#0A192F] mb-1">
                    He Shows Up
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    Details matter. Brian is personally present at home inspections, appraisals, repair bid walk-throughs, and closing day. Your equity is never handed off to an inexperienced junior assistant.
                  </p>
                </div>
              </div>

              {/* Pillar 02 */}
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#EA580C] tabular-nums shrink-0 mt-0.5">
                  02
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#0A192F] mb-1">
                    He's Straight With You
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    Unfiltered truths over comfortable flattery. Brian delivers precise local data on Oklahoma City absorption velocities, buyer psychology, and pricing brackets that actually spark multiple bids.
                  </p>
                </div>
              </div>

              {/* Pillar 03 */}
              <div className="flex items-start gap-4">
                <span className="font-serif text-lg sm:text-xl font-bold text-[#EA580C] tabular-nums shrink-0 mt-0.5">
                  03
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#0A192F] mb-1">
                    He Knows The Room
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                    Division-I collegiate athletic discipline channeled into high-stakes contract leverage. When opposing agents attempt re-negotiations, Brian protects the seller’s net proceed margins relentlessly.
                  </p>
                </div>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={`tel:${BROKER_INFO.phoneRaw}`}
                className="px-7 py-3.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Direct: {BROKER_INFO.phone}</span>
              </a>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-7 py-3.5 text-xs font-semibold tracking-wide uppercase text-[#0A192F] hover:text-white bg-white hover:bg-[#0A192F] border border-[#0A192F] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Request Private Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
