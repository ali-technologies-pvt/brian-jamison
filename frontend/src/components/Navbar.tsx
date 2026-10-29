import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { BROKER_INFO } from '../data/realEstateData';
import { JamisonLogo } from './JamisonLogo';
import { MegaMenuServices } from './navigation/MegaMenuServices';
import { MegaMenuBlueprint } from './navigation/MegaMenuBlueprint';
import { MegaMenuCommunities } from './navigation/MegaMenuCommunities';
import { MegaMenuHub } from './navigation/MegaMenuHub';
import { MobileDock } from './navigation/MobileDock';
import { ChevronDown, Phone } from 'lucide-react';

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
  const [activeMenu, setActiveMenu] = useState<'services' | 'blueprint' | 'communities' | 'hub' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection with requestAnimationFrame throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 25);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Keyboard navigation & click outside handling (Escape & Tab closure)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setActiveMenu(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inNav = navRef.current && navRef.current.contains(target);
      const inMenu = menuContainerRef.current && menuContainerRef.current.contains(target);
      if (!inNav && !inMenu) {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
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

  // Lightning-Fast Instant Hover Opening (Zero Delay)
  const handleOpenMenu = (menu: 'services' | 'blueprint' | 'communities' | 'hub') => {
    handleCancelClose();
    setActiveMenu(menu);
  };

  const handleScheduleClose = (delay = 120) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, delay);
  };

  const handleCancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const toggleMenu = (menu: 'services' | 'blueprint' | 'communities' | 'hub') => {
    handleCancelClose();
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  const scrollToSection = (id: string) => {
    handleCancelClose();
    setActiveMenu(null);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 
        HEADER BAR:
        Transparent floating over the primary-blue-tinted hero video.
        - Left: Larger Jamison Real Estate circular emblem logo (standalone, without headshot).
        - Center: Floating glassy capsule pill container with menus and mega menu triggers.
        - Right: Orange circular phone badge + Phone number + "Get in touch" navy capsule button.
      */}
      <header
        className={`fixed top-0 inset-x-0 z-50 w-full transition-all duration-300 pointer-events-none ${
          isScrolled
            ? 'bg-[#002D61]/98 backdrop-blur-sm border-b border-white/15 shadow-xl py-2.5 sm:py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center justify-between pointer-events-auto relative">
          {/* ZONE 1 (Left - Prominent Circular Jamison Logo) */}
          <div className="flex items-center">
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
              onMouseEnter={() => {
                handleCancelClose();
                setActiveMenu(null);
              }}
              className="group flex items-center focus:outline-none cursor-pointer"
            >
              <JamisonLogo
                size={76}
                className="w-16 h-16 sm:w-[76px] sm:h-[76px] transition-transform duration-300 group-hover:scale-105"
                title="Jamison Real Estate · Oklahoma City"
              />
            </a>
          </div>

          {/* ZONE 2 (Center - Frosted Glass Capsule Pill Navigation with Primary Navy Gloss) */}
          <nav
            ref={navRef}
            role="navigation"
            aria-label="Main Navigation"
            onMouseEnter={handleCancelClose}
            onMouseLeave={() => handleScheduleClose(80)}
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-6 py-2 rounded-full bg-[#002D61]/70 hover:bg-[#002D61]/80 backdrop-blur-2xl border border-white/20 shadow-xl shadow-[#001D40]/35 text-white relative overflow-hidden transition-all duration-300"
          >
            {/* Specular Top Edge Gloss Highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Link 0: Services (Triggers MegaMenuServices with 3 Major Services) */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === 'services'}
                aria-haspopup="true"
                onClick={() => toggleMenu('services')}
                onMouseEnter={() => handleOpenMenu('services')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeMenu === 'services'
                    ? 'bg-white/25 text-[#FB923C] shadow-xs'
                    : 'text-white hover:text-[#FB923C] hover:bg-white/10'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'services' ? 'rotate-180 text-[#FB923C]' : 'text-white/80'
                  }`}
                />
              </button>
            </div>

            {/* Link 1: The Blueprint (Triggers MegaMenuBlueprint) */}
            <div className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === 'blueprint'}
                aria-haspopup="true"
                onClick={() => toggleMenu('blueprint')}
                onMouseEnter={() => handleOpenMenu('blueprint')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeMenu === 'blueprint'
                    ? 'bg-white/25 text-[#FB923C] shadow-xs'
                    : 'text-white hover:text-[#FB923C] hover:bg-white/10'
                }`}
              >
                <span>The Blueprint</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'blueprint' ? 'rotate-180 text-[#FB923C]' : 'text-white/80'
                  }`}
                />
              </button>
            </div>

            {/* Link 2: Featured Closings */}
            <a
              href="/listings"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('/listings');
                } else {
                  window.location.href = '/listings';
                }
              }}
              onMouseEnter={() => {
                handleCancelClose();
                setActiveMenu(null);
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white hover:text-[#FB923C] hover:bg-white/10 transition-all cursor-pointer"
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
                onMouseEnter={() => handleOpenMenu('communities')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeMenu === 'communities'
                    ? 'bg-white/25 text-[#FB923C] shadow-xs'
                    : 'text-white hover:text-[#FB923C] hover:bg-white/10'
                }`}
              >
                <span>Communities</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'communities' ? 'rotate-180 text-[#FB923C]' : 'text-white/80'
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
                onMouseEnter={() => handleOpenMenu('hub')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeMenu === 'hub'
                    ? 'bg-white/25 text-[#FB923C] shadow-xs'
                    : 'text-white hover:text-[#FB923C] hover:bg-white/10'
                }`}
              >
                <span>Client Hub</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'hub' ? 'rotate-180 text-[#FB923C]' : 'text-white/80'
                  }`}
                />
              </button>
            </div>

            {/* Link 5: About (Direct link to About Brian Jamison) */}
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('/about');
                } else {
                  window.location.href = '/about';
                }
              }}
              onMouseEnter={() => {
                handleCancelClose();
                setActiveMenu(null);
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white hover:text-[#FB923C] hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
            >
              About Brian Jamison
            </a>

            {/* Link 6: Property Videos (Direct link to Property Videos) */}
            <a
              href="/property-videos"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('/property-videos');
                } else {
                  window.location.href = '/property-videos';
                }
              }}
              onMouseEnter={() => {
                handleCancelClose();
                setActiveMenu(null);
              }}
              className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white hover:text-[#FB923C] hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
            >
              Property Videos
            </a>
          </nav>

          {/* ZONE 3 (Right - Call & "Get in touch" CTA pill) */}
          <div
            onMouseEnter={() => {
              handleCancelClose();
              setActiveMenu(null);
            }}
            className="flex items-center gap-3 sm:gap-4"
          >
            {/* Direct Call: Orange Circular Badge + White Phone Number */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${BROKER_INFO.phoneRaw}`}
                className="w-10 h-10 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                title={`Call ${BROKER_INFO.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BROKER_INFO.phoneRaw}`}
                className="hidden sm:inline font-bold text-sm tracking-wide text-white hover:text-[#FB923C] transition-colors tabular-nums"
              >
                {BROKER_INFO.phone}
              </a>
            </div>

            {/* High-Intent Pill Button: "Get in touch" with Pulse Dot */}
            <button
              type="button"
              onClick={() => onOpenValuation()}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#001D40] hover:bg-[#002D61] text-white text-xs font-bold tracking-wide border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Get in touch</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] animate-pulse shrink-0" />
            </button>
          </div>
        </div>

        {/* Mega Menus Dropdown Container */}
        <div
          ref={menuContainerRef}
          className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 mt-1 pointer-events-none relative"
        >
          {/* Invisible interactive hover bridge between nav pill and dropdown */}
          {activeMenu && (
            <div
              className="nav-menu-bridge absolute -top-3 inset-x-0 h-4 pointer-events-auto"
              onMouseEnter={handleCancelClose}
              onMouseLeave={() => handleScheduleClose(140)}
            />
          )}
          <AnimatePresence>
            {activeMenu === 'services' && (
              <MegaMenuServices
                onClose={() => setActiveMenu(null)}
                onMouseEnter={handleCancelClose}
                onMouseLeave={() => handleScheduleClose(140)}
                onNavigate={onNavigate}
                onOpenConsultation={onOpenConsultation}
                onOpenMethod={onOpenMethod}
              />
            )}
            {activeMenu === 'blueprint' && (
              <MegaMenuBlueprint
                onOpenMethod={onOpenMethod}
                onOpenConsultation={onOpenConsultation}
                onClose={() => setActiveMenu(null)}
                onMouseEnter={handleCancelClose}
                onMouseLeave={() => handleScheduleClose(140)}
                onNavigate={onNavigate}
              />
            )}
            {activeMenu === 'communities' && (
              <MegaMenuCommunities
                onOpenMarket={onOpenMarket}
                onClose={() => setActiveMenu(null)}
                onMouseEnter={handleCancelClose}
                onMouseLeave={() => handleScheduleClose(140)}
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
                onMouseEnter={handleCancelClose}
                onMouseLeave={() => handleScheduleClose(140)}
                onNavigate={onNavigate}
              />
            )}
          </AnimatePresence>
        </div>
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
        onNavigate={onNavigate}
      />
    </>
  );
};
