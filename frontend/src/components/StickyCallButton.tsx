import React from 'react';
import { Phone } from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';
import { useAdmin } from '../context/AdminContext';

export const StickyCallButton: React.FC = () => {
  const { isAdmin } = useAdmin();
  const phoneFormatted = BROKER_INFO.phone || "(405) 513-3039";
  const phoneRaw = BROKER_INFO.phoneRaw || "+14055133039";

  return (
    <aside
      data-admin-ui="true"
      data-admin-toolbar="true"
      id="sticky-call-btn"
      aria-label="Direct Call Concierge"
      className={`hidden lg:block fixed ${isAdmin ? 'bottom-24' : 'bottom-6'} right-6 z-[45] print:hidden pointer-events-auto select-none transition-all duration-300`}
    >
      <a
        href={`tel:${phoneRaw}`}
        title={`Call Brian Jamison directly at ${phoneFormatted}`}
        aria-label={`Call Brian Jamison at ${phoneFormatted}`}
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-xl shadow-orange-600/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-400/50"
      >
        {/* Ringing / Pulsing Green Dot (Available) */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>

        {/* Just Phone Icon */}
        <Phone className="w-6 h-6 text-white" />
      </a>
    </aside>
  );
};
