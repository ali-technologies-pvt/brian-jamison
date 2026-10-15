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
import { InteriorHeroVideo } from './InteriorHeroVideo';

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
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 
        ========================================================================
        SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage)
        ========================================================================
      */}
      <InteriorHeroVideo
        kicker="Salt Real Estate Corporate Office · Edmond, Oklahoma"
        title="The Agent Who Works Like Every Deal Is Personal."
        subtitle="Brian Jamison is a Top 2% Real Estate Producer in Oklahoma with over $62M+ volume sold and 370+ career closings. A former collegiate athlete, Brian combines championship preparation, transparent communication, and a 100% Risk-Free Cancel-Anytime Listing Guarantee."
        heroVideoUrl="https://www.pexels.com/download/video/29383137/"
        heroFallbackImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
        metrics={[
          { value: '$62M+', label: 'Career Volume Sold' },
          { value: '370+', label: 'Career Closings' },
          { value: 'Top 2%', label: 'Statewide Producer' },
          { value: '100%', label: 'Cancel-Anytime Pledge' },
        ]}
        primaryCtaText="Book Private Consultation"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Request Market Valuation"
        onSecondaryCtaClick={onOpenValuation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* 2. THE ATHLETIC PEDIGREE & CORE VALUES */}
      <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
              The Athlete’s Mindset
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-4">
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
                  className="rounded-3xl p-8 bg-[#F4F1EB] border border-[#E6E2DA] shadow-xs hover:border-[#EA580C]/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-white flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-[#FB923C]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E6E2DA] text-[10px] font-bold uppercase tracking-wider text-[#002D61]">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
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
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
                Brokerage Strength
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] leading-tight mb-6">
                Backed by Salt Real Estate Corporate Headquarters
              </h2>
              <p className="font-sans text-base text-[#4B5563] leading-relaxed mb-6">
                Based out of Salt Real Estate’s corporate office at <strong>1508 W. Edmond Rd., Edmond, Oklahoma</strong>, Brian operates with independent agile firepower. Salt Real Estate isn't weighed down by bloated national franchise royalties; every dollar is reinvested directly into high-impact client marketing.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-base text-[#374151]">
                    <strong>Corporate Media Hub:</strong> In-house 4K cinema cameras, FAA-certified drone operators, and Matterport 3D imaging specialists.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-base text-[#374151]">
                    <strong>350+ Global Portals:</strong> Immediate worldwide syndication to Zillow, Realtor.com, Redfin, luxury feeder networks, and social channels.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm sm:text-base text-[#374151]">
                    <strong>7-Person Transaction Squad:</strong> Transaction coordinators, personal assistants, staging advisors, and title liaisons.
                  </span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onNavigate('/contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <span>Visit Salt Corporate Office</span>
                <ArrowRight className="w-4 h-4 text-[#FB923C]" />
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#E6E2DA] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Salt Real Estate Corporate Headquarters Edmond OK"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/80 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-widest text-[#FB923C] font-bold block mb-1">
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
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
              Career Trajectory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] leading-tight">
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
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 p-6 rounded-2xl bg-[#F4F1EB] border border-[#E6E2DA] hover:border-[#EA580C]/40 transition-colors"
              >
                <div className="px-4 py-2 rounded-xl bg-[#002D61] text-white font-serif text-lg font-bold shrink-0">
                  {m.year}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#002D61] mb-1">
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
      <section className="w-full py-20 sm:py-24 bg-[#002D61] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#FB923C] block mb-3">
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
              className="px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xl shadow-orange-600/30 hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
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
