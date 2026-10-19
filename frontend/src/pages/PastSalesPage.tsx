import React from 'react';
import { InteriorHeroVideo } from './InteriorHeroVideo';
import { IdxUniversalWidget } from '../components/IdxUniversalWidget';
import {
  Award,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Phone,
  CheckCircle2,
  Building
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';

interface PastSalesPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const PastSalesPage: React.FC<PastSalesPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 1. Cinematic Hero Video */}
      <InteriorHeroVideo
        kicker="VERIFIED TRACK RECORD"
        title="$70M+ Past Sales & Track Record"
        subtitle="Over 370+ career closings across central Oklahoma. Explore our public MLS history of sold, pending, and record-setting neighborhood transactions."
        categoryLabel="Track Record"
        metrics={[
          { label: 'Career Volume', value: '$70M+' },
          { label: 'Total Closings', value: '370+' },
          { label: 'Avg Escrow', value: '11 Days' }
        ]}
        onNavigate={onNavigate}
        onOpenValuation={onOpenValuation}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 2. Performance Stats Ribbon */}
      <section className="w-full py-8 bg-[#001D40] text-white border-y border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FB923C]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FB923C] block">
                Top 2% Producer · MLSOK Verified
              </span>
              <p className="font-serif text-sm sm:text-base font-bold text-white">
                Consistently Outperforming Average Days-On-Market Across Central Oklahoma
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenValuation}
            className="px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
          >
            What Is Your Home Worth?
          </button>
        </div>
      </section>

      {/* 3. Main Live IDX Sold / Pending Showcase */}
      <section className="w-full py-16 sm:py-24">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Widget 176754: Sold/Pending Showcase */}
          <IdxUniversalWidget
            widgetId="176754"
            type="showcase"
            title="Sold & Pending MLS Transactions · Brian Jamison"
            subtitle="Verified historical and pending representation across Oklahoma City, Edmond, Norman, and surrounding enclaves."
            badge="Verified Sales Feed"
            minHeight="520px"
          />

          {/* Seller Strategy Callout */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
                The 6-Phase Selling Machine
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#002D61]">
                Want to Set a New Record for Your Neighborhood?
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                Brian's bespoke pricing strategy, cinema film, and targeted buyer syndication produce superior contract terms and maximum net proceeds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenValuation}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer text-center"
              >
                Request Market Appraisal
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/services/home-selling')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#002D61]/25 hover:border-[#002D61] text-[#002D61] text-xs font-bold tracking-wider uppercase transition-all cursor-pointer text-center"
              >
                View Seller Blueprint
              </button>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

