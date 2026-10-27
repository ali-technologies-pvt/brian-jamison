import React from 'react';
import { Phone, ShieldCheck } from 'lucide-react';
import { BrianAvatar } from './BrianAvatar';
import { BROKER_INFO } from '../data/realEstateData';

export const StickyCallButton: React.FC = () => {
  const phoneFormatted = BROKER_INFO.phone || "(405) 513-3039";
  const phoneRaw = BROKER_INFO.phoneRaw || "+14055133039";

  return (
    <aside aria-label="Direct Phone Contact" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[88] print:hidden">
      {/* Desktop & Tablet View: Luxury Floating Concierge Card */}
      <a
        href={`tel:${phoneRaw}`}
        title={`Call Brian Jamison directly at ${phoneFormatted}`}
        className="group relative flex items-center gap-3.5 pl-2.5 pr-4 py-2.5 bg-white/95 backdrop-blur-md border border-[#EA580C]/35 rounded-full shadow-2xl shadow-orange-950/15 hover:shadow-orange-600/30 hover:border-[#EA580C] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
      >
        {/* Brian Avatar with Live Online Dot */}
        <div className="relative shrink-0">
          <BrianAvatar size={42} showStatusDot={true} alt="Brian Jamison - Direct Call" />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
          </span>
        </div>

        {/* Call Info Block */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#EA580C]">
              Direct Line
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-[10px] font-sans font-medium text-emerald-600 flex items-center gap-1">
              Available Now
            </span>
          </div>

          <span className="font-serif text-sm sm:text-base font-bold text-[#002D61] group-hover:text-[#EA580C] transition-colors tracking-tight leading-none mt-0.5">
            {phoneFormatted}
          </span>
          <span className="text-[10px] font-sans text-[#6B7280] hidden sm:block">
            Brian Jamison · OKC Top 2% Producer
          </span>
        </div>

        {/* Ringing Phone Button Icon */}
        <div className="w-9 h-9 rounded-full bg-[#EA580C] group-hover:bg-[#C2410C] text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-600/30 transition-transform duration-300 group-hover:scale-110">
          <Phone className="w-4 h-4 animate-bounce" />
        </div>
      </a>
    </aside>
  );
};

