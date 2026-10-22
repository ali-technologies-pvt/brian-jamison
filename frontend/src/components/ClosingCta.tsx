import React from 'react';
import { BROKER_INFO } from '../data/realEstateData';
import { JamisonLogo } from './JamisonLogo';
import { Phone, Calendar, ShieldCheck } from 'lucide-react';

interface ClosingCtaProps {
  onOpenConsultation: () => void;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ onOpenConsultation }) => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Official Emblem Badge (No Client Headshot Image) */}
          <div className="inline-flex items-center gap-3 p-2 pr-5 rounded-full bg-white border border-[#EA580C]/30 shadow-2xs mb-5">
            <JamisonLogo size={38} className="w-9 h-9 shrink-0" />
            <div className="text-left">
              <span className="font-serif font-bold text-xs text-[#002D61] block leading-tight">
                Jamison Real Estate · Edmond, Oklahoma
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold text-[#EA580C] tracking-wider block">
                Top 2% Producer · 1508 W. Edmond Rd., Edmond OK
              </span>
            </div>
          </div>

          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
            Bespoke Representation
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight mb-4 text-balance">
            Ready to Sell With Uncompromised Confidence?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl mx-auto mb-10 font-normal">
            Schedule an initial conversation about your property's trajectory in the Edmond market and explore our bespoke marketing plans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Private Consultation</span>
            </button>

            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-wide uppercase text-[#002D61] bg-white hover:bg-[#002D61] hover:text-white border-2 border-[#002D61] rounded-xl transition-all shadow-sm hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Phone className="w-3.5 h-3.5 text-[#EA580C] group-hover:text-white transition-colors" />
              <span>{BROKER_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

