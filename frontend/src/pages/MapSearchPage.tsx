import React, { useState } from 'react';
import { InteriorHeroVideo } from './InteriorHeroVideo';
import { IdxUniversalWidget } from '../components/IdxUniversalWidget';
import {
  MapPin,
  Building,
  ShieldCheck,
  Sparkles,
  Compass,
  Sliders,
  Layers,
  Phone
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';

interface MapSearchPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const MapSearchPage: React.FC<MapSearchPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [activeMapWidget, setActiveMapWidget] = useState<'176756' | '20755' | '15847'>('176756');

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 1. Cinematic Hero Video */}
      <InteriorHeroVideo
        kicker="GEOSPATIAL MLS EXPLORATION"
        title="Interactive Oklahoma City MLS Map Search"
        subtitle="Explore active luxury residences, golf enclaves, historic districts, and acreage estates across the entire Oklahoma City metropolitan region."
        categoryLabel="Map Search"
        metrics={[
          { label: 'MLS Syndication', value: 'Live' },
          { label: 'Enclaves Mapped', value: '21 Areas' },
          { label: 'Property Types', value: 'All Classes' }
        ]}
        onNavigate={onNavigate}
        onOpenValuation={onOpenValuation}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 2. Map Filter Mode Switcher */}
      <section className="w-full py-8 bg-[#001D40] text-white border-y border-white/10">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FB923C]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FB923C] block">
                Geographic MLS Filter
              </span>
              <p className="font-serif text-sm sm:text-base font-bold text-white">
                Select Your Preferred Geospatial Search Engine
              </p>
            </div>
          </div>

          {/* Interactive Map Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/10 rounded-2xl border border-white/15">
            <button
              type="button"
              onClick={() => setActiveMapWidget('176756')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMapWidget === '176756'
                  ? 'bg-[#EA580C] text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Prime Metro Map (176756)
            </button>
            <button
              type="button"
              onClick={() => setActiveMapWidget('20755')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMapWidget === '20755'
                  ? 'bg-[#EA580C] text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Residential Enclaves (20755)
            </button>
            <button
              type="button"
              onClick={() => setActiveMapWidget('15847')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMapWidget === '15847'
                  ? 'bg-[#EA580C] text-white shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Classic Map Search (15847)
            </button>
          </div>
        </div>
      </section>

      {/* 3. Interactive Map Container */}
      <section className="w-full py-12 sm:py-20">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          {activeMapWidget === '176756' && (
            <IdxUniversalWidget
              widgetId="176756"
              type="map"
              title="Prime MLS Interactive Map Search"
              subtitle="Full-screen geospatial exploration of all verified active homes, condominiums, and land listings in Oklahoma."
              badge="Prime Map Engine"
              minHeight="680px"
            />
          )}

          {activeMapWidget === '20755' && (
            <IdxUniversalWidget
              widgetId="20755"
              type="map"
              title="Residential Neighborhood & Single Family Map"
              subtitle="Dedicated residential property boundaries covering Nichols Hills, Edmond, Deer Creek, Norman, and Oak Tree."
              badge="Residential Engine"
              minHeight="680px"
            />
          )}

          {activeMapWidget === '15847' && (
            <IdxUniversalWidget
              widgetId="15847"
              type="map"
              title="Metro OKC Quick Map Search"
              subtitle="Streamlined map search with live MLS property pins and rapid boundary rendering."
              badge="Metro Engine"
              minHeight="680px"
            />
          )}

          {/* Concierge Consultation Bar */}
          <div className="mt-12 p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
                Custom Geospatial MLS Search
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#002D61]">
                Looking For Off-Market or Specific School District Boundaries?
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                Brian Jamison can configure a bespoke MLS automated search directly filtered to specific streets, school districts (Oakdale, Deer Creek, Edmond), or private acreage.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer shrink-0"
            >
              Request Custom Search Setup
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};
