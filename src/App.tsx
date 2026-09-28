import React, { useState, useEffect } from 'react';
import { Shield, Phone, Sparkles } from 'lucide-react';
import { BROKER_INFO } from './data/realEstateData';
import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { ChapterAccordion } from './components/ChapterAccordion';
import { TheMethodSection } from './components/TheMethodSection';
import { PhilosophySection } from './components/PhilosophySection';
import { FeaturedClosings } from './components/FeaturedClosings';
import { ValuationBanner } from './components/ValuationBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MicroMarketsSection } from './components/MicroMarketsSection';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';
import { InteriorPageView } from './pages/InteriorPageView';
import { getPageByPath } from './pages/pageData';
import {
  ValuationModal,
  ConsultationModal,
  PropertyModal,
  MarketModal,
  PlaybookModal,
  MethodModal,
  CalculatorModal,
  ChecklistModal,
  LegalModal
} from './components/Modals';
import { Property } from './data/realEstateData';

export default function App() {
  // Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      if (pathname && pathname !== '/') {
        return pathname;
      }
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        return hash;
      }
    }
    return '/';
  });

  // Modal & Interactive Flow States
  const [valuationOpen, setValuationOpen] = useState(false);
  const [initialValuationAddress, setInitialValuationAddress] = useState('');

  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedMarketId, setSelectedMarketId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  const [methodModalOpen, setMethodModalOpen] = useState(false);
  const [initialMethodPhase, setInitialMethodPhase] = useState(0);

  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [legalType, setLegalType] = useState<'privacy' | 'terms' | 'fairhousing' | null>(null);

  // Sync with browser back/forward history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Handler
  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handlers
  const handleOpenValuation = (address?: string) => {
    setInitialValuationAddress(address || '');
    setValuationOpen(true);
  };

  const handleOpenConsultation = () => {
    setConsultationOpen(true);
  };

  const handleOpenMarket = (marketId: string) => {
    // If dedicated page exists for this community, navigate directly!
    const page = getPageByPath('/areas/' + marketId);
    if (page) {
      navigate('/areas/' + marketId);
    } else {
      setSelectedMarketId(marketId);
    }
  };

  const handleOpenChapter = (chapterId: string) => {
    const page = getPageByPath('/' + chapterId);
    if (page) {
      navigate('/' + chapterId);
    } else {
      setSelectedChapterId(chapterId);
    }
  };

  const handleOpenMethod = (phaseIndex: number = 0) => {
    const phaseSlugs = [
      '/services/elite-marketing',
      '/services/transparent-communication',
      '/services/accessibility-guarantee',
      '/services/support-team',
      '/services/precision-pricing',
      '/services/cancel-anytime-guarantee'
    ];
    if (phaseSlugs[phaseIndex]) {
      navigate(phaseSlugs[phaseIndex]);
    } else {
      setInitialMethodPhase(phaseIndex);
      setMethodModalOpen(true);
    }
  };

  const handleExploreMethod = () => {
    if (currentPath === '/') {
      const el = document.getElementById('the-method');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/seller-blueprint');
  };

  // Resolve current active page
  const activeInteriorPage = currentPath !== '/' ? getPageByPath(currentPath) : null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#002D61] flex flex-col font-sans selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* Top Prestigious Royal Navy Announcement Bar (#002D61) */}
      <header className="relative z-40 w-full bg-[#002D61] text-white py-2 px-4 border-b border-[#001D40] text-[11px] font-sans tracking-wide">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2.5 flex-wrap justify-center text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold text-[10px] tracking-wider uppercase border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-ping" />
              OKC Top 2% Producer
            </span>
            <span className="text-white/40 hidden md:inline">·</span>
            <span className="font-semibold text-white">
              $62M+ Volume Sold
            </span>
            <span className="text-white/40 hidden md:inline">·</span>
            <span className="font-semibold text-white">
              370+ Career Closings
            </span>
            <span className="text-white/40 hidden lg:inline">·</span>
            <span className="text-stone-300 hidden lg:inline">
              Salt Real Estate Corporate Office
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#FB923C] font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" />
              100% Cancel-Anytime Listing Guarantee
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="text-white hover:text-[#FB923C] font-semibold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#EA580C]" />
              <span>{BROKER_INFO.phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Top Bar Navigation */}
      <Navbar
        onOpenValuation={handleOpenValuation}
        onOpenConsultation={handleOpenConsultation}
        onOpenMarket={handleOpenMarket}
        onOpenChapter={handleOpenChapter}
        onOpenMethod={handleOpenMethod}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenChecklist={() => setChecklistOpen(true)}
        onOpenLegal={(type) => setLegalType(type)}
        onNavigate={navigate}
      />

      <main className="flex-1">
        {activeInteriorPage ? (
          /* Dedicated Interior Page Architecture */
          <InteriorPageView
            page={activeInteriorPage}
            onNavigate={navigate}
            onOpenConsultation={handleOpenConsultation}
            onOpenValuation={() => handleOpenValuation()}
          />
        ) : (
          /* Flagship Animated Luxury Homepage */
          <>
            {/* Hero Section with Edge-to-Edge Drone Video & Live Stat Counters */}
            <HeroVideo
              onOpenValuation={() => handleOpenValuation()}
              onExploreMethod={handleExploreMethod}
            />

            {/* Section 2: "Which Chapter Are You Navigating?" (Interactive Hover Accordion) */}
            <ChapterAccordion onSelectChapter={handleOpenChapter} />

            {/* Section 3: "The Method" (Interactive 6-Step Seller Blueprint Stage with 3D Tour Viewer) */}
            <TheMethodSection onOpenMethodModal={handleOpenMethod} />

            {/* Section 4: Philosophy & Leadership (Brian Jamison Portrait & Ethos) */}
            <PhilosophySection onOpenConsultation={handleOpenConsultation} />

            {/* Section 5: Featured & Notable Closings (Asymmetrical Magazine Gallery) */}
            <FeaturedClosings onSelectProperty={(prop) => setSelectedProperty(prop)} />

            {/* Section 6: Request A Confidential Market Appraisal (Valuation Funnel) */}
            <ValuationBanner onOpenValuation={handleOpenValuation} />

            {/* Section 7: Client Experiences (Verified Reviews) */}
            <TestimonialsSection onOpenConsultation={handleOpenConsultation} />

            {/* Section 8: 21 Oklahoma City Micro-Markets */}
            <MicroMarketsSection onSelectMarket={handleOpenMarket} />

            {/* Section 9: Bespoke Representation CTA Banner */}
            <ClosingCta onOpenConsultation={handleOpenConsultation} />
          </>
        )}
      </main>

      {/* Editorial Footer with Full 50+ Page Sitemap Links & Compliance */}
      <Footer
        onOpenValuation={() => handleOpenValuation()}
        onOpenConsultation={handleOpenConsultation}
        onOpenMarket={handleOpenMarket}
        onOpenChapter={handleOpenChapter}
        onOpenMethod={handleOpenMethod}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenChecklist={() => setChecklistOpen(true)}
        onOpenLegal={(type) => setLegalType(type)}
        onNavigate={navigate}
      />

      {/* Interactive Modals */}
      <ValuationModal
        isOpen={valuationOpen}
        initialAddress={initialValuationAddress}
        onClose={() => setValuationOpen(false)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenConsultation={handleOpenConsultation}
      />

      <MarketModal
        marketId={selectedMarketId}
        onClose={() => setSelectedMarketId(null)}
        onOpenConsultation={handleOpenConsultation}
      />

      <PlaybookModal
        chapterId={selectedChapterId}
        onClose={() => setSelectedChapterId(null)}
        onOpenConsultation={handleOpenConsultation}
      />

      <MethodModal
        isOpen={methodModalOpen}
        initialPhaseIndex={initialMethodPhase}
        onClose={() => setMethodModalOpen(false)}
        onOpenConsultation={handleOpenConsultation}
      />

      <CalculatorModal
        isOpen={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />

      <ChecklistModal
        isOpen={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </div>
  );
}
