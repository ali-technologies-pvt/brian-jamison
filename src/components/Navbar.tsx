import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { MegaMenuBlueprint } from './navigation/MegaMenuBlueprint';
import { MegaMenuCommunities } from './navigation/MegaMenuCommunities';
import { MegaMenuHub } from './navigation/MegaMenuHub';
import { MobileDock } from './navigation/MobileDock';
import {
  ChevronDown,
  Phone,
  Menu,
  X,
  ArrowUpRight,
  Shield,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenValuation: (initialAddress?: string) => void;
  onOpenConsultation: () => void;
  onOpenMarket: (marketId: string) => void;
  onOpenChapter: (chapterId: string) => void;
  onOpenMethod: (phaseIndex?: number) => void;
  onOpenCalculator: () => void;
  onOpenChecklist: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'fairhousing') => void;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'blueprint' | 'communities' | 'hub' | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll detection for glass transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & click outside handling (Escape & Tab closure)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (menu: 'blueprint' | 'communities' | 'hub') => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const scrollToSection = (id: string) => {
    setActiveMenu(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 
        DESKTOP FLOATING NAVBAR:
        Fixed at top-4 inset-x-0 mx-auto max-w-7xl z-50 px-6 py-3.5 rounded-2xl transition-all duration-300
        Initial Hero State:
          Background: rgba(250, 249, 246, 0.75)
          Backdrop Filter: backdrop-blur-xl saturate-150
          Border: 1px solid rgba(230, 226, 218, 0.8)
          Shadow: 0 8px 32px 0 rgba(27, 29, 33, 0.06)
        Sticky Scrolled State:
          Background: rgba(250, 249, 246, 0.92)
          Backdrop Filter: backdrop-blur-2xl
          Border: 1px solid rgba(234, 88, 12, 0.3)
          Shadow: 0 12px 40px -10px rgba(0, 0, 0, 0.08)
      */}
      <header className="fixed top-3 sm:top-4 inset-x-0 mx-auto max-w-[1400px] z-50 px-3 sm:px-6 pointer-events-none">
        <nav
          ref={navRef}
          role="navigation"
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full transition-all duration-300 rounded-2xl px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between relative ${
            isScrolled
              ? 'bg-[#FAF9F6]/92 backdrop-blur-2xl border border-[#EA580C]/30 shadow-[0_12px_40px_-10px_rgba(10,25,47,0.12)]'
              : 'bg-[#FAF9F6]/85 backdrop-blur-xl saturate-150 border border-[#EA580C]/25 shadow-[0_8px_32px_0_rgba(10,25,47,0.06)]'
          }`}
        >
          {/* ZONE 1 (Left - Brand Anchor) */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none cursor-pointer"
            >
              {/* Jamison Real Estate Crest + Official Brian Jamison Circular Avatar (36px desktop, 32px mobile) */}
              <div className="flex items-center gap-2 shrink-0">
                <div
                  title="Jamison Real Estate Crest"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#0A192F] border-2 border-[#EA580C] flex items-center justify-center text-[#EA580C] font-serif font-bold text-xs shadow-xs"
                >
                  J
                </div>
                <BrianAvatar
                  size={36}
                  priority={true}
                  className="w-8 h-8 md:w-9 md:h-9"
                  alt="Brian Jamison · Salt Real Estate"
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#0A192F] group-hover:text-[#EA580C] transition-colors leading-tight">
                    BRIAN JAMISON
                  </span>
                  {/* Micro-badge: Green live-status dot with tooltip "Available 7 Days" */}
                  <div className="relative group/status flex items-center">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/status:flex items-center whitespace-nowrap px-2 py-0.5 rounded bg-[#0A192F] text-white text-[10px] shadow-md pointer-events-none">
                      Available 7 Days
                    </div>
                  </div>
                </div>
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-[#6B7280]">
                  SALT REAL ESTATE · OKC
                </span>
              </div>
            </a>
          </div>

          {/* ZONE 2 (Center - Editorial Navigation) */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-sans font-medium text-[#0A192F]">
            {/* Link 1: The Blueprint (Triggers MegaMenuBlueprint) */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === 'blueprint'}
                aria-haspopup="true"
                onClick={() => toggleMenu('blueprint')}
                onMouseEnter={() => setActiveMenu('blueprint')}
                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
                  activeMenu === 'blueprint' ? 'text-[#EA580C]' : 'hover:text-[#EA580C]'
                }`}
              >
                <span>The Blueprint</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'blueprint' ? 'rotate-180 text-[#EA580C]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Link 2: Featured Closings */}
            <a
              href="#featured-closings"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/' || !onNavigate) {
                  scrollToSection('featured-closings');
                } else {
                  onNavigate('/listings');
                }
              }}
              onMouseEnter={() => setActiveMenu(null)}
              className="py-1 hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              Featured Closings
            </a>

            {/* Link 3: Communities (Triggers MegaMenuCommunities) */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === 'communities'}
                aria-haspopup="true"
                onClick={() => toggleMenu('communities')}
                onMouseEnter={() => setActiveMenu('communities')}
                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
                  activeMenu === 'communities' ? 'text-[#EA580C]' : 'hover:text-[#EA580C]'
                }`}
              >
                <span>Communities</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'communities' ? 'rotate-180 text-[#EA580C]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Link 4: Client Hub (Triggers MegaMenuHub) */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === 'hub'}
                aria-haspopup="true"
                onClick={() => toggleMenu('hub')}
                onMouseEnter={() => setActiveMenu('hub')}
                className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer ${
                  activeMenu === 'hub' ? 'text-[#EA580C]' : 'hover:text-[#EA580C]'
                }`}
              >
                <span>Client Hub</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'hub' ? 'rotate-180 text-[#EA580C]' : ''
                  }`}
                />
              </button>
            </div>

            {/* Link 5: About (Direct link to Leadership / About) */}
            <a
              href="#leadership"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === '/' || !onNavigate) {
                  scrollToSection('leadership');
                } else {
                  onNavigate('/about');
                }
              }}
              onMouseEnter={() => setActiveMenu(null)}
              className="py-1 hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              About
            </a>
          </div>

          {/* ZONE 3 (Right - High-Intent CTAs) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Direct Call Button */}
            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="text-xs font-semibold text-[#0A192F] hover:text-[#EA580C] transition-colors flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-black/5"
            >
              <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
              <span className="tabular-nums tracking-wide">{BROKER_INFO.phone}</span>
            </a>

            {/* Primary CTA Pill: "What's My Home Worth?" */}
            <button
              type="button"
              onClick={() => onOpenValuation()}
              className="px-6 py-2.5 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all duration-300 shadow-md shadow-orange-600/25 hover:shadow-lg hover:shadow-orange-600/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
            >
              What's My Home Worth?
            </button>
          </div>

          {/* Mobile Top Bar Quick Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenValuation()}
              className="px-3.5 py-1.5 text-[11px] font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-lg shadow-sm shadow-orange-600/25"
            >
              Valuation
            </button>
          </div>

          {/* Mega Menus Render with Framer Motion AnimatePresence */}
          <AnimatePresence>
            {activeMenu === 'blueprint' && (
              <MegaMenuBlueprint
                onOpenMethod={onOpenMethod}
                onOpenConsultation={onOpenConsultation}
                onClose={() => setActiveMenu(null)}
                onNavigate={onNavigate}
              />
            )}
            {activeMenu === 'communities' && (
              <MegaMenuCommunities
                onOpenMarket={onOpenMarket}
                onClose={() => setActiveMenu(null)}
                onNavigate={onNavigate}
              />
            )}
            {activeMenu === 'hub' && (
              <MegaMenuHub
                onOpenCalculator={onOpenCalculator}
                onOpenChecklist={onOpenChecklist}
                onOpenValuation={onOpenValuation}
                onOpenConsultation={onOpenConsultation}
                onOpenChapter={onOpenChapter}
                onClose={() => setActiveMenu(null)}
                onNavigate={onNavigate}
              />
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* 
        MOBILE DUAL CONCIERGE PATTERN (<MobileDock />):
        Bottom Floating Concierge Dock + Fullscreen Slide-Out Drawer
      */}
      <MobileDock
        onOpenValuation={onOpenValuation}
        onOpenConsultation={onOpenConsultation}
        onOpenMarket={onOpenMarket}
        onOpenChapter={onOpenChapter}
        onOpenMethod={onOpenMethod}
        onOpenCalculator={onOpenCalculator}
        onOpenChecklist={onOpenChecklist}
        onOpenLegal={onOpenLegal}
      />
    </>
  );
};
