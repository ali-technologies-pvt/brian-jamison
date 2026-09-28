import React from 'react';
import { BROKER_INFO, MICRO_MARKETS } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenValuation: () => void;
  onOpenConsultation: () => void;
  onOpenMarket: (marketId: string) => void;
  onOpenChapter: (chapterId: string) => void;
  onOpenMethod: (phaseIndex?: number) => void;
  onOpenCalculator: () => void;
  onOpenChecklist: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'fairhousing') => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenValuation,
  onOpenConsultation,
  onOpenMarket,
  onOpenChapter,
  onOpenMethod,
  onOpenCalculator,
  onOpenChecklist,
  onOpenLegal,
  onNavigate
}) => {
  return (
    <footer className="w-full bg-[#002D61] text-white pt-16 sm:pt-20 pb-12 border-t-4 border-[#EA580C] shadow-2xl">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/15">
          {/* Column 1: Brand & Brokerage Identity (Cols 4) */}
          <div className="lg:col-span-4">
            {/* Contact Card: 48px Circular Avatar directly beside Brian Jamison, phone, and credentials */}
            <div className="flex items-start gap-4 mb-5">
              <BrianAvatar
                size={48}
                priority={false}
                showStatusDot={true}
                alt="Brian Jamison - Salt Real Estate Corporate Office"
                className="mt-0.5"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block text-white leading-tight">
                  Brian Jamison
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-[#FB923C] block mt-0.5 mb-2">
                  Salt Real Estate Corporate Office
                </span>
                <a
                  href={`tel:${BROKER_INFO.phoneRaw}`}
                  className="font-serif font-bold text-sm text-white hover:text-[#FB923C] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{BROKER_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-stone-300 font-sans leading-relaxed mb-6 pl-0.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                <span>1508 W. Edmond Rd., Edmond, Oklahoma 73003</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                <a href={`mailto:${BROKER_INFO.email}`} className="hover:text-white transition-colors">
                  {BROKER_INFO.email}
                </a>
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-[11px] text-white">
              <Shield className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{BROKER_INFO.license} · REALTOR® · Top 2% Producer</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (Cols 3) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#FB923C] block mb-4">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/sellers');
                    } else {
                      onOpenChapter('home-sellers');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Strategic Chapters
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/seller-blueprint');
                    } else {
                      onOpenMethod(0);
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  The Method Blueprint
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/about');
                    } else {
                      const el = document.getElementById('leadership');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Broker Mentality & Ethos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/listings');
                    } else {
                      const el = document.getElementById('featured-closings');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Curated Closings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/home-valuation');
                    } else {
                      onOpenValuation();
                    }
                  }}
                  className="hover:text-white transition-colors text-left font-medium text-[#FB923C] cursor-pointer"
                >
                  Private Valuation Tool
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/resources/home-sellers-checklist');
                    } else {
                      onOpenChecklist();
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Home Seller's Checklist (PDF)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/resources/mortgage-calculator');
                    } else {
                      onOpenCalculator();
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Mortgage & Affordability Calc
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hot Enclaves (Cols 3) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#FB923C] block mb-4">
              Key Enclaves
            </span>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/nichols-hills');
                    } else {
                      onOpenMarket('nichols-hills');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Nichols Hills
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/oklahoma-city');
                    } else {
                      onOpenMarket('gaillardia');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Gaillardia Golf Community
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/edmond');
                    } else {
                      onOpenMarket('heritage-hills');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Heritage Hills Historic
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/edmond');
                    } else {
                      onOpenMarket('oak-tree');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Oak Tree & Deer Creek
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/edmond');
                    } else {
                      onOpenMarket('edmond-oakdale');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Edmond & Covell Corridor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/arcadia');
                    } else {
                      onOpenMarket('arcadia-hiwassee');
                    }
                  }}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Arcadia & Lake Hiwassee
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Credentials & Regulatory (Cols 2) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#FB923C] block mb-4">
              Credentials
            </span>
            <ul className="space-y-2 text-xs text-stone-300 font-sans">
              <li>Oklahoma Real Estate Commission</li>
              <li>{BROKER_INFO.license}</li>
              <li>REALTOR® Designation</li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors block text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors block text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('fairhousing')}
                  className="hover:text-white transition-colors block text-left"
                >
                  Equal Housing Opportunity
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Equal Housing */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-300 gap-4">
          <p>© {new Date().getFullYear()} Brian Jamison | Salt Real Estate Corporate Office. All Rights Reserved.</p>
          <p className="text-center sm:text-right">
            Equal Housing Opportunity. Information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
};
