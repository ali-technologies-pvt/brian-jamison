import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { ChapterAccordion } from './components/ChapterAccordion';
import { CompanyServicesProcessSection } from './components/CompanyServicesProcessSection';
import { FeaturedClosings } from './components/FeaturedClosings';
import { ValuationBanner } from './components/ValuationBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MicroMarketsSection } from './components/MicroMarketsSection';
import { ClosingCta } from './components/ClosingCta';
import { VideoMarqueeFooter } from './components/VideoMarqueeFooter';
import { Footer } from './components/Footer';
import { getPageByPath } from './pages/pageData';
import { AdminProvider } from './context/AdminContext';
import { AdminToolbar } from './components/AdminToolbar';
import { GlobalInlineEditor } from './components/admin/GlobalInlineEditor';
import { PremiumPreloader } from './components/PremiumPreloader';
import { HomepageQuickSearch } from './components/HomepageQuickSearch';
import { HomepageFeaturedListings } from './components/HomepageFeaturedListings';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { StickyCallButton } from './components/StickyCallButton';

// Ultra-Fast Async Code Splitting
const InteriorPageView = React.lazy(() => import('./pages/InteriorPageView').then(m => ({ default: m.InteriorPageView })));
const AdminLoginView = React.lazy(() => import('./components/admin/AdminLoginView').then(m => ({ default: m.AdminLoginView })));
const IdxTestPage = React.lazy(() => import('./pages/IdxTestPage').then(m => ({ default: m.IdxTestPage })));
const MapSearchPage = React.lazy(() => import('./pages/MapSearchPage').then(m => ({ default: m.MapSearchPage })));
const SitemapPage = React.lazy(() => import('./pages/SitemapPage').then(m => ({ default: m.SitemapPage })));

const AppFallback = () => (
  <div className="w-full min-h-[70vh] bg-[#FAF9F6] flex flex-col items-center justify-center p-8">
    <div className="w-10 h-10 border-3 border-[#002D61] border-t-[#EA580C] rounded-full animate-spin mb-4" />
    <span className="text-xs uppercase tracking-widest text-[#002D61] font-bold">Loading Page...</span>
  </div>
);
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

  // 1-Second Bespoke Luxury Preloader
  const [showPreloader, setShowPreloader] = useState(true);

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

  // Sync with browser back/forward history & trigger preloader
  useEffect(() => {
    const handlePopState = () => {
      setShowPreloader(true);
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation Handler with 1-Second Luxury Preloader Transition
  const navigate = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setShowPreloader(true);
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      window.scrollTo({ top: 0, behavior: 'auto' });
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
    const servicePage = getPageByPath('/services/' + chapterId);
    if (servicePage) {
      navigate('/services/' + chapterId);
      return;
    }
    const page = getPageByPath('/' + chapterId);
    if (page) {
      navigate('/' + chapterId);
    } else {
      setSelectedChapterId(chapterId);
    }
  };

  const handleOpenMethod = (phaseIndex: number = 0) => {
    const phaseSlugs = [
      '/services/marketing-plan-and-process',
      '/services/communication',
      '/services/accessibility',
      '/services/team-support',
      '/services/pricing-strategy',
      '/services/fair-pricing-and-contract-flexibility'
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
      const servicesEl = document.getElementById('major-services');
      if (servicesEl) {
        servicesEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const el = document.getElementById('the-method');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/seller-blueprint');
  };

  // Resolve current active page
  const isAdminRoute = currentPath.startsWith('/admin');
  const isIdxRoute = currentPath === '/idx-test' || currentPath === '/idx-search-test' || currentPath === '/idx';
  const isIdxWidgetRoute = currentPath === '/map-search' || currentPath === '/properties/map' || currentPath === '/idx-widget' || currentPath === '/idx-widget-test' || currentPath === '/idx-179291' || currentPath === '/idx-showcase';
  const isSitemapRoute = currentPath === '/sitemap' || currentPath === '/site-map' || currentPath === '/sitemap.html';
  const activeInteriorPage = currentPath !== '/' && !isAdminRoute && !isIdxRoute && !isIdxWidgetRoute && !isSitemapRoute ? getPageByPath(currentPath) : null;

  if (isAdminRoute) {
    return (
      <React.Suspense fallback={<AppFallback />}>
        <AdminLoginView onNavigate={navigate} />
      </React.Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#002D61] flex flex-col font-sans selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 1-Second Bespoke Luxury Preloader on Initial Load & Page Transitions */}
      {showPreloader && (
        <PremiumPreloader
          key={currentPath}
          durationMs={1000}
          onFinish={() => setShowPreloader(false)}
        />
      )}

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
        {isIdxWidgetRoute ? (
          /* Interactive Oklahoma City MLS Map Search */
          <React.Suspense fallback={<AppFallback />}>
            <MapSearchPage
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </React.Suspense>
        ) : isIdxRoute ? (
          /* Dedicated IDX Broker Quick Search Test Page */
          <React.Suspense fallback={<AppFallback />}>
            <IdxTestPage
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </React.Suspense>
        ) : isSitemapRoute ? (
          /* Dedicated Platform Sitemap & Architecture Directory */
          <React.Suspense fallback={<AppFallback />}>
            <SitemapPage
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </React.Suspense>
        ) : activeInteriorPage ? (
          /* Dedicated Interior Page Architecture */
          <React.Suspense fallback={<AppFallback />}>
            <InteriorPageView
              page={activeInteriorPage}
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </React.Suspense>
        ) : (
          /* Flagship Animated Luxury Homepage */
          <>
            {/* Hero Section with Edge-to-Edge Drone Video & Live Stat Counters */}
            <HeroVideo
              onOpenValuation={() => handleOpenValuation()}
              onExploreMethod={handleExploreMethod}
            />

            {/* Live MLSOK Direct Property Quick Search Filter (Widget ID #20754) */}
            <HomepageQuickSearch onNavigate={navigate} />

            {/* Section 2: "Which Chapter Are You Navigating?" (Interactive Hover Accordion) */}
            <ChapterAccordion onSelectChapter={handleOpenChapter} />

            {/* Section 3: Services We Provide · The 6 Core Corporate Selling Processes */}
            <CompanyServicesProcessSection
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
              onNavigate={navigate}
            />

            {/* Section 4: Live MLSOK Featured Client Properties & Listings (Widget #176753) */}
            <HomepageFeaturedListings
              onNavigate={navigate}
              onSelectProperty={(prop) => setSelectedProperty(prop)}
            />


            {/* Section 6: Request A Confidential Market Appraisal (Valuation Funnel) */}
            <ValuationBanner onOpenValuation={handleOpenValuation} />

            {/* Section 7: Client Experiences (Verified Reviews) */}
            <TestimonialsSection onOpenConsultation={handleOpenConsultation} />

            {/* Section 8: 21 Oklahoma City Micro-Markets */}
            <MicroMarketsSection onSelectMarket={handleOpenMarket} onNavigate={navigate} />

            {/* Section 9: Bespoke Representation CTA Banner */}
            <ClosingCta onOpenConsultation={handleOpenConsultation} />
          </>
        )}
      </main>

      {/* Video Marquee: Rendered across pages right above Footer */}
      {!isIdxRoute &&
        !isIdxWidgetRoute &&
        currentPath !== '/privacy-policy' &&
        currentPath !== '/terms-of-service' &&
        currentPath !== '/fair-housing-disclosure' && (
          <VideoMarqueeFooter
            onOpenConsultation={handleOpenConsultation}
            onOpenValuation={() => handleOpenValuation()}
          />
        )}

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

      {/* Universal Global In-Line CMS Editor (activates on every word, button, and image across whole site) */}
      <GlobalInlineEditor currentPath={currentPath} />

      {/* Admin Floating Inline Toolbar (Only visible when admin is logged in) */}
      <AdminToolbar onNavigate={navigate} currentPath={currentPath} />

      {/* Real-Time WordPress/OneTap Style Accessibility Widget (Bottom-Left) */}
      <AccessibilityWidget />

      {/* Sticky Real-Time Direct Call Concierge Button (Bottom-Right) */}
      <StickyCallButton />
    </div>
  );
}
