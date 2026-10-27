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
      desc: "Competitive athletics demands preparation, consistency, and attention to detail. These habits carry into the real estate process through market research, negotiation planning, and clear communication. Each transaction receives a structured approach designed to help clients understand their options and make informed decisions."
    },
    {
      icon: Target,
      title: "Direct Fiduciary Representation",
      badge: "Hands-On",
      desc: "Clients work directly with their agent throughout the transaction. From pricing discussions and marketing plans to offer reviews and contract negotiations, he stays involved in key decisions. This hands-on approach helps clients understand their options and know who is guiding their next move."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Pricing Architecture",
      badge: "Top 2% Producer",
      desc: "With more than $62 million in reported career sales volume and over 370 closings, Brian brings transaction experience to his work. Market data, comparable sales, and property-specific factors help inform pricing discussions and negotiation strategies."
    },
    {
      icon: ShieldCheck,
      title: "100% Cancel-Anytime Guarantee",
      badge: "Zero Risk",
      desc: "Transparent communication and clear expectations guide the listing process. The written agreement should outline the marketing plan, service commitments, fees, and cancellation terms. Clients can review these details before signing to understand their rights and any conditions that apply."
    }
  ];

  const milestones = [
    { year: "2018", title: "Collegiate Athletics to Real Estate", desc: "Transitioned athletic discipline and relentless competitive work ethic into Oklahoma residential representation, obtaining license #184931." },
    { year: "2020", title: "Top 5% Statewide Production", desc: "Surpassed 100+ closed transactions, specializing in Edmond custom builds, north OKC acreage, and historic renovations." },
    { year: "2022", title: "Salt Corporate Office Alliance", desc: "Partnered with Salt Real Estate Corporate Headquarters at 1508 W. Edmond Rd., gaining direct institutional media and drone syndication resources." },
    { year: "2024", title: "Top 2% Statewide Producer", desc: "Crossed $70M+ career sales volume and 370+ career closings, consistently ranking among central Oklahoma's most trusted luxury negotiators." },
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
        kicker="Salt Real Estate · Edmond, Oklahoma"
        title="The Agent Who Works Like Every Deal Is Personal."
        subtitle="Brian Jamison brings a competitive mindset, direct communication, and a results-focused approach to real estate across Edmond and Greater Oklahoma City. His collegiate athletic background and reported career record of $70M+ in sales volume and 370+ closings shape how he prepares, negotiates, and guides clients through important property decisions."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/brian-jamison-skyline.jpeg"
        metrics={[
          { value: '$70M+', label: 'Career Volume Sold' },
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
                The Athlete’s Mindset
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-4">
                Personal Representation With a Competitive Edge
              </h2>
              <p className="font-sans text-base text-[#4B5563] leading-relaxed mb-4">
                Years of competitive athletics helped shape Brian’s approach to preparation, discipline, and performance. Today, those principles guide his real estate practice, from pricing and marketing to negotiations and transaction planning. His focus remains on clear advice, careful preparation, and the details that matter to each client.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#E6E2DA] shadow-xl group">
                <img
                  src="/media/gallery/brian-jamison-sunset.jpeg"
                  alt="Brian Jamison Collegiate Athlete Discipline"
                  className="w-full h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-widest text-[#FB923C] font-bold block mb-1">
                      Championship Preparation
                    </span>
                    <h3 className="font-serif text-xl font-bold">Relentless Conditioning & Fiduciary Execution</h3>
                  </div>
                </div>
              </div>
            </div>
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
                Brokerage Connection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] leading-tight mb-6">
                Backed by Salt Real Estate in Edmond
              </h2>
              <p className="font-sans text-base text-[#4B5563] leading-relaxed mb-6">
                Brian is associated with Salt Real Estate, with an office listed at <strong>1508 W. Edmond Rd., Edmond, Oklahoma</strong>. This local connection supports his work with clients across Edmond and Greater Oklahoma City. Current office and brokerage details should be confirmed before publication.
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
              <div className="relative rounded-3xl overflow-hidden border border-[#E6E2DA] shadow-xl group">
                <img
                  src="/media/gallery/brian-closing-clients.jpeg"
                  alt="Brian Jamison celebrating closing with clients at Oklahoma Family Title"
                  className="w-full h-[440px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/85 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-widest text-[#FB923C] font-bold block mb-1">
                      Successful Closings · Edmond & OKC
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Personalized Fiduciary Representation</h3>
                    <p className="text-xs text-stone-200 mt-1">1508 W. Edmond Rd., Edmond, OK · Direct: (405) 513-3039</p>
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
              A Background Shaped by Preparation and Progress
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
            The Professional Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Discover Brian Jamison’s Real Estate Background in Edmond, OK
          </h2>
          <p className="font-sans text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mx-auto mb-10">
            Explore how an athletic background, career milestones, brokerage connections, and hands-on service shape this approach to real estate. The goal is to make complex decisions easier to understand through preparation, direct communication, and a clear plan for each transaction.
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
              Schedule Private Consultation
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
