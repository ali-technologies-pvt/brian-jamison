import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Target,
  FileCheck,
  Star,
  Sparkles,
  Building2,
  Users2,
  TrendingUp,
  Compass,
  Zap,
  HelpCircle
} from 'lucide-react';
import { BROKER_INFO, GOOGLE_REVIEWS_GMB_URL } from '../data/realEstateData';
import { BrianAvatar } from '../components/BrianAvatar';
import { EditableText } from '../components/EditableText';
import { SocialLinks } from '../components/SocialLinks';

interface AboutJamisonPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const AboutJamisonPage: React.FC<AboutJamisonPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const careerPillars = [
    {
      icon: Trophy,
      title: "Collegiate Athlete Discipline",
      badge: "Work Ethic",
      desc: "Brian brings the rigor of collegiate competitive athletics to every real estate transaction. That means 5:30 AM market analysis, rigorous negotiation stamina, and an obsessive focus on detail. Real estate isn't a hobby—it's high-stakes fiduciary execution."
    },
    {
      icon: Target,
      title: "Direct Fiduciary Representation",
      badge: "Zero Delegation",
      desc: "When you hire Brian Jamison, you work directly with Brian Jamison. Your property appraisal, contract negotiations, and buyer showings are never handed off to an inexperienced junior licensee. Brian personally attends every critical milestone."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Pricing Architecture",
      badge: "Top 2% Producer",
      desc: "With over $62M+ in career volume and 370+ closed transactions, Brian doesn't guess. He utilizes 3-tier algorithmic pricing models calibrated beneath key MLS search brackets to spark multi-offer bidding environments."
    },
    {
      icon: ShieldCheck,
      title: "100% Cancel-Anytime Guarantee",
      badge: "Zero Risk",
      desc: "Brian stands behind every promise in writing. If he fails to deliver on any aspect of his marketing plan or transparent communication standards, you have the unilateral right to cancel the listing agreement with zero penalty."
    }
  ];

  const milestones = [
    { year: "2018", title: "Collegiate Athletics to Real Estate", desc: "Transitioned athletic discipline and relentless competitive work ethic into Oklahoma residential representation, obtaining license #184931." },
    { year: "2020", title: "Top 5% Statewide Production", desc: "Surpassed 100+ closed transactions, specializing in Edmond custom builds, north OKC acreage, and historic renovations." },
    { year: "2022", title: "Salt Corporate Office Alliance", desc: "Partnered with Salt Real Estate Corporate Headquarters at 1508 W. Edmond Rd., gaining direct institutional media and drone syndication resources." },
    { year: "2024", title: "Top 2% Statewide Producer", desc: "Crossed $62M+ career sales volume and 370+ career closings, consistently ranking among central Oklahoma's most trusted luxury negotiators." },
    { year: "Present", title: "The 6-Phase Selling Machine", desc: "Deployed the proprietary 6-Step Seller Blueprint, ensuring Oklahoma homeowners sell for peak market value with zero anxiety." }
  ];

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#B38F68]/20 selection:text-[#1B1D21]">
      {/* 1. CINEMATIC HERO SECTION (CLEAN EDITORIAL) */}
      <section className="relative w-full min-h-[640px] pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[#FAF9F6] border-b border-[#E6E2DA]">
        {/* Subtle Background Lighting & Filmic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1D21]/90 via-[#1B1D21]/70 to-[#1B1D21]/85 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(179,143,104,0.18),transparent_50%)] z-0 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content: Strictly License, Heading, Description, 2 CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-white"
            >
              {/* 1. License Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-6 shadow-xs">
                <BrianAvatar
                  size={22}
                  priority={true}
                  showStatusDot={true}
                  alt="Brian Jamison - License #184931"
                />
                <span className="text-xs font-sans font-medium text-stone-200 tracking-wide flex items-center gap-2">
                  <span className="font-semibold text-white">Brian Jamison</span>
                  <span className="text-white/40">·</span>
                  <span className="text-[#B38F68] font-semibold">{BROKER_INFO.license}</span>
                  <span className="text-white/40 hidden sm:inline">·</span>
                  <span className="text-stone-300 hidden sm:inline">Salt Real Estate Corporate Office</span>
                </span>
              </div>

              {/* 2. Heading */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.12] mb-6 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                The Agent Who Works Like <span className="italic font-normal text-[#B38F68]">Every Deal</span> Is Personal.
              </h1>

              {/* 3. Description */}
              <p className="font-sans text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mb-8 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] font-normal">
                Brian Jamison is a Top 2% Real Estate Producer in Oklahoma with over $62M+ volume sold and 370+ career closings. A former collegiate athlete, Brian combines championship preparation, transparent communication, and a 100% Risk-Free Cancel-Anytime Listing Guarantee.
              </p>

              {/* 4. Exactly 2 Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-8 py-4 rounded-full bg-[#B38F68] hover:bg-[#9E7A56] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#B38F68]/35 hover:shadow-2xl hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book Private Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="px-8 py-4 rounded-full bg-black/40 hover:bg-[#FAF9F6] hover:text-[#1B1D21] text-white font-sans text-xs font-bold uppercase tracking-wider border border-white/30 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Request Market Valuation
                </button>
              </div>
            </motion.div>

            {/* Right Card / Headshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#B38F68]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-5">
                    <BrianAvatar
                      size={180}
                      priority={true}
                      showStatusDot={true}
                      className="w-40 h-40 sm:w-48 sm:h-48 shadow-2xl border-4 border-white/30"
                      alt="Brian Jamison - Salt Real Estate Corporate Office"
                    />
                    <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#B38F68] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Top 2%
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Brian Jamison
                  </h3>
                  <p className="font-sans text-xs text-[#B38F68] font-semibold mt-1">
                    License #184931 · REALTOR® · Former Collegiate Athlete
                  </p>
                  <p className="text-xs text-stone-300 mt-2 max-w-sm">
                    Salt Real Estate Corporate Office, 1508 W. Edmond Rd., Edmond, OK 73003
                  </p>

                  {/* 4 Fast Stats Pill Grid */}
                  <div className="grid grid-cols-2 gap-3 w-full mt-6">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                      <span className="block font-serif text-xl sm:text-2xl font-bold text-white">$62M+</span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">Volume Sold</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                      <span className="block font-serif text-xl sm:text-2xl font-bold text-white">370+</span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">Career Closings</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                      <span className="block font-serif text-xl sm:text-2xl font-bold text-white">Top 2%</span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">Statewide Rank</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-center">
                      <span className="block font-serif text-xl sm:text-2xl font-bold text-[#B38F68]">100%</span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-300 font-medium">Cancel Anytime</span>
                    </div>
                  </div>

                  {/* Verified Social & Regulatory Portals Strip */}
                  <div className="w-full mt-6 pt-5 border-t border-white/15">
                    <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#B38F68] block mb-2.5">
                      Verified Profiles & Networks
                    </span>
                    <div className="flex justify-center">
                      <SocialLinks variant="hero" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE ATHLETIC PEDIGREE & CORE VALUES */}
      <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B38F68] block mb-2">
              The Athlete’s Mindset
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B1D21] leading-tight mb-4">
              Why an Athletic Background Changes Real Estate Representation
            </h2>
            <p className="font-sans text-base text-[#4B5563] leading-relaxed">
              In college athletics, success is earned in off-season preparation, tape analysis, and relentless conditioning. Brian brings that exact championship work ethic to your real estate transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl p-8 bg-[#F4F1EB] border border-[#E6E2DA] shadow-xs hover:border-[#B38F68]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#1B1D21] text-white flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-[#B38F68]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E6E2DA] text-[10px] font-bold uppercase tracking-wider text-[#1B1D21]">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1B1D21] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SALT REAL ESTATE CORPORATE HEADQUARTERS ADVANTAGE */}
      <section className="w-full py-20 sm:py-28 bg-[#F4F1EB] border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B38F68] block mb-2">
                Brokerage Strength
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1D21] leading-tight mb-6">
                Backed by Salt Real Estate Corporate Headquarters
              </h2>
              <p className="font-sans text-base text-[#4B5563] leading-relaxed mb-6">
                Based out of Salt Real Estate’s corporate office at <strong>1508 W. Edmond Rd., Edmond, Oklahoma</strong>, Brian operates with independent agile firepower. Salt Real Estate isn't weighed down by bloated national franchise royalties; every dollar is reinvested directly into high-impact client marketing.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B38F68] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-base text-[#374151]">
                    <strong>Corporate Media Hub:</strong> In-house 4K cinema cameras, FAA-certified drone operators, and Matterport 3D imaging specialists.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B38F68] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-base text-[#374151]">
                    <strong>350+ Global Portals:</strong> Immediate worldwide syndication to Zillow, Realtor.com, Redfin, luxury feeder networks, and social channels.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#B38F68] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-base text-[#374151]">
                    <strong>7-Person Transaction Squad:</strong> Transaction coordinators, personal assistants, staging advisors, and title liaisons.
                  </span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1B1D21] hover:bg-[#1B1D21] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <span>Visit Salt Corporate Office</span>
                <ArrowRight className="w-4 h-4 text-[#B38F68]" />
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#E6E2DA] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Salt Real Estate Corporate Headquarters Edmond OK"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1D21]/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-widest text-[#B38F68] font-bold block mb-1">
                      Corporate Office · Edmond OK
                    </span>
                    <h3 className="font-serif text-2xl font-bold">1508 W. Edmond Rd., Edmond, OK 73003</h3>
                    <p className="text-xs text-stone-200 mt-1">Direct: (405) 513-3039 · BJamison@Salt.RealEstate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHRONOLOGICAL MILESTONES & REPUTATION */}
      <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E6E2DA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B38F68] block mb-2">
              Career Trajectory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B1D21] leading-tight">
              A History of Relentless Execution
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-[#F4F1EB] border border-[#E6E2DA] hover:border-[#B38F68]/40 transition-colors"
              >
                <div className="px-4 py-2 rounded-xl bg-[#1B1D21] text-white font-serif text-lg font-bold shrink-0">
                  {m.year}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#1B1D21] mb-1">
                    {m.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 6-STEP SELLER BLUEPRINT CTA BANNER */}
      <section className="w-full py-20 sm:py-24 bg-[#1B1D21] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#B38F68] block mb-3">
            The Proprietary Machine
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Ready to See the 6-Phase Selling Machine in Action?
          </h2>
          <p className="font-sans text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mx-auto mb-10">
            Explore all 30+ specific deliverables—from HDR drone imaging and reverse prospecting to mandatory 2-hour showing feedback and 100% risk-free cancel-anytime protection.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/seller-blueprint')}
              className="px-8 py-4 rounded-full bg-[#B38F68] hover:bg-[#9E7A56] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-orange-600/30 hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore 6-Step Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
            >
              Schedule Direct Call With Brian
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
