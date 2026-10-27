import React, { useState } from 'react';
import { Search, Shield, CheckCircle } from 'lucide-react';
import { BrianAvatar } from './BrianAvatar';
import { GoogleAddressSearchInput } from './GoogleAddressSearchInput';

interface ValuationBannerProps {
  onOpenValuation: (address?: string) => void;
}

export const ValuationBanner: React.FC<ValuationBannerProps> = ({ onOpenValuation }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenValuation(address);
  };

  const sampleAddresses = [
    "Nichols Hills, OK",
    "Gaillardia, OKC",
    "Deer Creek, Edmond",
    "Heritage Hills, OKC"
  ];

  return (
    <section className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
            Private Client Advisory
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight mb-4 text-balance">
            Request A Confidential Market Appraisal
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            No automated generic calculators. Brian prepares a bespoke comparative audit incorporating closed comparables, pending contracts, and architectural improvements.
          </p>

          {/* Concierge Assurance Header with 44px Brian Avatar */}
          <div className="max-w-xl mx-auto mb-8 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EA580C]/30 shadow-xs flex items-center gap-3.5 text-left">
            <BrianAvatar size={44} showStatusDot={true} alt="Brian Jamison - Confidential Appraisal" />
            <div className="flex-1">
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#EA580C] block">
                Personal Review Guarantee
              </span>
              <p className="font-serif text-xs sm:text-sm font-semibold text-[#002D61] leading-snug">
                “Your custom report will be personally reviewed by Brian Jamison, OKC Top 2% Producer.”
              </p>
            </div>
          </div>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-5">
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-white p-2 rounded-2xl border border-[#EA580C]/30 shadow-sm focus-within:border-[#EA580C] transition-colors">
            <div className="flex-1 flex items-center px-3 gap-2.5">
              <Search className="w-4 h-4 text-[#6B7280] shrink-0" />
              <GoogleAddressSearchInput value={address} onChange={setAddress} onSelectAddress={(selected) => { setAddress(selected); onOpenValuation(selected); }} placeholder="Enter your Oklahoma City or Edmond address..." className="flex-1" inputClassName="w-full py-2.5 text-xs sm:text-sm text-[#002D61] placeholder-[#6B7280] focus:outline-none bg-transparent" />






            </div>

            <button
              type="submit"
              className="px-7 py-3.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Generate Private Valuation
            </button>
          </div>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs text-[#6B7280]">
          <span className="text-[11px] uppercase tracking-wider text-[#6B7280]">Recent Areas:</span>
          {sampleAddresses.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => {
                setAddress(sample);
                onOpenValuation(sample);
              }}
              className="text-[#002D61] hover:text-[#EA580C] underline decoration-stone-300 underline-offset-4 cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-[#EA580C]" />
            No Obligation
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#EA580C]" />
            100% Confidential
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-[#EA580C]" />
            Backed by Real 2026 Comps
          </span>
        </div>
      </div>
      </div>
    </section>
  );
};
