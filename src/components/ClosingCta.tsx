import React from 'react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { Phone, Calendar } from 'lucide-react';

interface ClosingCtaProps {
  onOpenConsultation: () => void;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ onOpenConsultation }) => {
  return (
    <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5A93C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Personal Advisor Badge with BrianAvatar (48px) */}
          <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white border border-[#E5A93C]/30 shadow-2xs mb-5">
            <BrianAvatar size={40} showStatusDot={true} alt="Brian Jamison - Salt Real Estate" />
            <div className="text-left">
              <span className="font-serif font-bold text-xs text-[#0A192F] block leading-tight">
                Brian Jamison
              </span>
              <span className="text-[10px] uppercase font-sans font-semibold text-[#E5A93C] tracking-wider block">
                Top 2% Producer · Salt Corporate Office
              </span>
            </div>
          </div>

          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold text-[#E5A93C] block mb-3">
            Bespoke Representation
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0A192F] font-medium tracking-tight mb-4 text-balance">
            Ready to Sell With Uncompromised Confidence?
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-xl mx-auto mb-10 font-normal">
            Schedule an initial conversation about your property's trajectory in the market and explore our bespoke marketing plans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#E5A93C] hover:bg-[#C5902B] rounded-md transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Private Consultation</span>
            </button>

            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-4 text-xs font-semibold tracking-wider uppercase text-[#0A192F] bg-white hover:bg-[#F5EFE6] border border-[#E5A93C]/30 rounded-md transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>{BROKER_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

