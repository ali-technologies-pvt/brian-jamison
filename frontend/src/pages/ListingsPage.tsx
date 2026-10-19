import React, { useState } from 'react';
import { InteriorHeroVideo } from './InteriorHeroVideo';
import { IdxUniversalWidget } from '../components/IdxUniversalWidget';
import {
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Compass,
  Calendar,
  Layers,
  Camera,
  CheckCircle2
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';

interface ListingsPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const ListingsPage: React.FC<ListingsPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [activeTab, setActiveTab] = useState<'showcase' | 'slideshow'>('showcase');

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 1. Cinematic Hero Video */}
      <InteriorHeroVideo
        kicker="ACTIVE PORTFOLIO"
        title="Active & Featured Luxury Listings"
        subtitle="Explore current residences exclusively represented by Brian Jamison across Nichols Hills, Edmond, Gaillardia, Lake Arcadia, and the Greater Oklahoma City metro."
        categoryLabel="Active Portfolio"
        metrics={[
          { label: 'Active Volume', value: '$8.4M' },
          { label: '3D Matterport', value: 'Included' },
          { label: 'Private Tours', value: 'Available' }
        ]}
        onNavigate={onNavigate}
        onOpenValuation={onOpenValuation}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 2. Editorial Standards Banner */}
      <section className="w-full py-8 bg-[#001D40] text-white border-y border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FB923C]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FB923C] block">
                The Jamison Standard
              </span>
              <p className="font-serif text-sm sm:text-base font-bold text-white">
                Every Active Listing Receives Cinema Film, 3D Dollhouse & HDR Photography
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 p-1 bg-white/10 rounded-full border border-white/15">
            <button
              type="button"
              onClick={() => setActiveTab('showcase')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'showcase'
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Grid Showcase
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('slideshow')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'slideshow'
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Featured Slide Show
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main Live IDX Listings Showcase */}
      <section className="w-full py-16 sm:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {activeTab === 'showcase' ? (
            /* Widget 176753: Featured Showcase */
            <IdxUniversalWidget
              widgetId="176753"
              type="showcase"
              title="Current Featured Listings · Oklahoma City Metro"
              subtitle="Live MLSOK broker syndication for Brian Jamison's featured properties and premier residential enclaves."
              badge="Active MLS Feed"
              minHeight="500px"
            />
          ) : (
            /* Widget 176755: Featured Slide Show */
            <IdxUniversalWidget
              widgetId="176755"
              type="slideshow"
              title="Featured Property Slideshow"
              subtitle="Interactive editorial preview of highlighted estates and signature residences across Oklahoma."
              badge="Signature Slide Show"
              minHeight="520px"
            />
          )}

          {/* Showing Concierge Callout */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
                Private Escorted Showings
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#002D61]">
                Interested in Touring a Featured Listing?
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                Brian Jamison personally coordinates private, discreet showings for qualified buyers. Contact Brian directly or request a confidential walkthrough appointment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer text-center"
              >
                Schedule Private Showing
              </button>
              <a
                href={`tel:${BROKER_INFO.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#002D61]/25 hover:border-[#EA580C] text-[#002D61] hover:text-[#EA580C] text-xs font-bold tracking-wider uppercase transition-all cursor-pointer text-center inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Call {BROKER_INFO.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
