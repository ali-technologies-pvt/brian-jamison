import React from 'react';
import { BROKER_INFO, MICRO_MARKETS } from '../data/realEstateData';
import { JamisonLogo } from './JamisonLogo';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { SocialLinks } from './SocialLinks';

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
            {/* Contact Card: Jamison Emblem & Information */}
            <div className="flex items-start gap-4 mb-5">
              <JamisonLogo
                size={58}
                className="w-14 h-14 shrink-0"
                title="Jamison Real Estate · Official Emblem"
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

            <div className="space-y-2.5 text-xs text-stone-100 font-sans font-medium leading-relaxed mb-6 pl-0.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0 mt-0.5" />
                <span>1508 W. Edmond Rd., Edmond, Oklahoma 73003</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                <a href={`mailto:${BROKER_INFO.email}`} className="text-stone-100 hover:text-white transition-colors">
                  {BROKER_INFO.email}
                </a>
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 border border-white/20 text-[11px] text-white font-medium mb-6">
              <Shield className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{BROKER_INFO.license} · REALTOR® · Top 2% Producer</span>
            </div>

            {/* Official Social & Portal Verification Links */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-[#FB923C] block mb-2.5">
                Verified Portals & Networks
              </span>
              <SocialLinks variant="footer" />
            </div>
          </div>

          {/* Column 2: Navigation Links (Cols 3) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-white block mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              Major Services
            </span>
            <ul className="space-y-2.5 text-xs text-stone-100 font-sans font-medium">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/services/home-buying');
                    } else {
                      onOpenChapter('home-buying');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  1. Home Buying Advisory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/services/home-selling');
                    } else {
                      onOpenChapter('home-selling');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  2. Home Selling Machine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/services/land-buying-and-selling');
                    } else {
                      onOpenChapter('land-buying-and-selling');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  3. Land Buying & Selling
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
                  className="hover:text-[#FB923C] hover:underline transition-colors text-left cursor-pointer font-bold text-[#FB923C]"
                >
                  6-Step Seller Blueprint →
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
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
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
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
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
                  className="hover:text-white hover:underline transition-colors text-left font-bold text-[#FB923C] cursor-pointer"
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
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
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
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Mortgage & Affordability Calc
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hot Enclaves (Cols 3) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-white block mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              Key Service Enclaves
            </span>
            <ul className="space-y-2.5 text-xs text-stone-100 font-sans font-medium">
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
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Nichols Hills
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/gaillardia');
                    } else {
                      onOpenMarket('gaillardia');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Gaillardia Golf Community
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/heritage-hills');
                    } else {
                      onOpenMarket('heritage-hills');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Heritage Hills Historic
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/oak-tree');
                    } else {
                      onOpenMarket('oak-tree');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Oak Tree & Deer Creek
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/edmond-oakdale');
                    } else {
                      onOpenMarket('edmond-oakdale');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Edmond & Covell Corridor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('/areas/arcadia-hiwassee');
                    } else {
                      onOpenMarket('arcadia-hiwassee');
                    }
                  }}
                  className="hover:text-white hover:underline transition-colors text-left cursor-pointer"
                >
                  Arcadia & Lake Hiwassee
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Credentials & Regulatory (Cols 2) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-white block mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
              Credentials
            </span>
            <ul className="space-y-2.5 text-xs text-stone-100 font-sans font-medium">
              <li>Oklahoma Real Estate Commission</li>
              <li className="font-bold text-white">{BROKER_INFO.license}</li>
              <li>REALTOR® Designation</li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('/faq');
                  }}
                  className="hover:text-white hover:underline transition-colors block text-left cursor-pointer text-[#FB923C] font-semibold"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('/privacy-policy');
                    else onOpenLegal('privacy');
                  }}
                  className="hover:text-white hover:underline transition-colors block text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('/terms-of-service');
                    else onOpenLegal('terms');
                  }}
                  className="hover:text-white hover:underline transition-colors block text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('/fair-housing-disclosure');
                    else onOpenLegal('fairhousing');
                  }}
                  className="hover:text-white hover:underline transition-colors block text-left cursor-pointer"
                >
                  Equal Housing Opportunity
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright, Social Links & Equal Housing */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-200 font-medium gap-4">
          <p>© {new Date().getFullYear()} Brian Jamison | Salt Real Estate Corporate Office. All Rights Reserved.</p>
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-stone-300 hidden sm:inline">Official Profiles:</span>
            <SocialLinks variant="footer" itemClassName="w-7 h-7 text-xs" />
          </div>
          <p className="text-center md:text-right">
            Equal Housing Opportunity. Information deemed reliable but not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
};
