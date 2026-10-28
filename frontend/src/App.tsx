import React, { useState, useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { ChapterAccordion } from './components/ChapterAccordion';
import { CompanyServicesProcessSection } from './components/CompanyServicesProcessSection';
import { ValuationBanner } from './components/ValuationBanner';
import { TestimonialsSection } from './components/TestimonialsSection';
import { MicroMarketsSection } from './components/MicroMarketsSection';
import { ClosingCta } from './components/ClosingCta';
import { VideoMarqueeFooter } from './components/VideoMarqueeFooter';
import { Footer } from './components/Footer';
import { getPageByPath } from './pages/pageData';
import { AdminToolbar } from './components/AdminToolbar';
import { GlobalInlineEditor } from './components/admin/GlobalInlineEditor';
import { HomepageQuickSearch } from './components/HomepageQuickSearch';
import { HomepageFeaturedListings } from './components/HomepageFeaturedListings';
import { Property } from './data/realEstateData';

// Ultra-Fast Async Code Splitting for Non-Critical Components & Pages
const InteriorPageView = React.lazy(() => import('./pages/InteriorPageView').then(m => ({ default: m.InteriorPageView })));
const AdminLoginView = React.lazy(() => import('./components/admin/AdminLoginView').then(m => ({ default: m.AdminLoginView })));
const IdxTestPage = React.lazy(() => import('./pages/IdxTestPage').then(m => ({ default: m.IdxTestPage })));
const MapSearchPage = React.lazy(() => import('./pages/MapSearchPage').then(m => ({ default: m.MapSearchPage })));
const SitemapPage = React.lazy(() => import('./pages/SitemapPage').then(m => ({ default: m.SitemapPage })));
const PropertyVideosPage = React.lazy(() => import('./pages/PropertyVideosPage').then(m => ({ default: m.PropertyVideosPage })));

// Lazy-Loaded Modals (Zero impact on initial page paint)
const ValuationModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.ValuationModal })));
const ConsultationModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.ConsultationModal })));
const PropertyModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.PropertyModal })));
const MarketModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.MarketModal })));
const PlaybookModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.PlaybookModal })));
const MethodModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.MethodModal })));
const CalculatorModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.CalculatorModal })));
const ChecklistModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.ChecklistModal })));
const LegalModal = React.lazy(() => import('./components/Modals').then(m => ({ default: m.LegalModal })));

// Lazy-Loaded Floating Widgets
const AccessibilityWidget = React.lazy(() => import('./components/AccessibilityWidget').then(m => ({ default: m.AccessibilityWidget })));
const StickyCallButton = React.lazy(() => import('./components/StickyCallButton').then(m => ({ default: m.StickyCallButton })));

const AppFallback = () => (
  <div className="w-full min-h-[50vh] bg-[#FAF9F6] flex flex-col items-center justify-center p-8">
    <div className="w-8 h-8 border-2 border-[#002D61] border-t-[#EA580C] rounded-full animate-spin mb-3" />
    <span className="text-xs uppercase tracking-widest text-[#002D61] font-semibold">Loading...</span>
  </div>
);

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

  // Sync with browser back/forward history without artificial delays
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Instant Zero-Delay Navigation Handler
  const navigate = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
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

  const handleOpenProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleOpenMarket = (marketId: string) => {
    setSelectedMarketId(marketId);
  };

  const handleOpenChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
  };

  const handleOpenMethod = (phaseIndex?: number) => {
    setInitialMethodPhase(phaseIndex !== undefined ? phaseIndex : 0);
    setMethodModalOpen(true);
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
      <Suspense fallback={<AppFallback />}>
        <AdminLoginView onNavigate={navigate} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#002D61] flex flex-col font-sans selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* Primary Sticky Header Navigation */}
      <Navbar
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

      <main className="flex-1">
        {isIdxRoute ? (
          <Suspense fallback={<AppFallback />}>
            <IdxTestPage
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </Suspense>
        ) : isIdxWidgetRoute ? (
          <Suspense fallback={<AppFallback />}>
            <MapSearchPage
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </Suspense>
        ) : isSitemapRoute ? (
          <Suspense fallback={<AppFallback />}>
            <SitemapPage onNavigate={navigate} />
          </Suspense>
        ) : currentPath === '/property-videos' || currentPath === '/videos' ? (
          <Suspense fallback={<AppFallback />}>
            <PropertyVideosPage
              onNavigate={navigate}
              onOpenConsultation={handleOpenConsultation}
              onOpenValuation={() => handleOpenValuation()}
            />
          </Suspense>
        ) : activeInteriorPage ? (
          <Suspense fallback={<AppFallback />}>
            <InteriorPageView
              page={activeInteriorPage}
              onNavigate={navigate}
              onOpenValuation={() => handleOpenValuation()}
              onOpenConsultation={handleOpenConsultation}
              onOpenMethod={handleOpenMethod}
              onOpenMarket={handleOpenMarket}
              onOpenCalculator={() => setCalculatorOpen(true)}
              onOpenChecklist={() => setChecklistOpen(true)}
              onOpenProperty={handleOpenProperty}
            />
          </Suspense>
        ) : (
          <>
            {/* 1. Cinematic Hero Section with Fast LCP Poster */}
            <HeroVideo
              onOpenValuation={() => handleOpenValuation()}
              onExploreMethod={handleExploreMethod}
            />

            {/* 2. Direct MLSOK Verified Live Quick Search Console */}
            <HomepageQuickSearch onNavigate={navigate} />

            {/* 3. Live MLS Listings Showcase */}
            <HomepageFeaturedListings
              onOpenValuation={() => handleOpenValuation()}
              onOpenConsultation={handleOpenConsultation}
              onNavigate={navigate}
            />

            {/* 4. 6-Phase Tactical Selling Blueprint */}
            <div id="the-method">
              <CompanyServicesProcessSection
                onOpenValuation={() => handleOpenValuation()}
                onOpenConsultation={handleOpenConsultation}
                onOpenMethod={handleOpenMethod}
                onNavigate={navigate}
              />
            </div>

            {/* 5. Chapter Accordion - Strategy Playbook */}
            <ChapterAccordion
              onOpenChapter={handleOpenChapter}
              onOpenConsultation={handleOpenConsultation}
            />

            {/* 6. Confidential Market Appraisal Banner */}
            <ValuationBanner onOpenValuation={handleOpenValuation} />

            {/* 7. Client Reviews Luxury Responsive Slider */}
            <TestimonialsSection />

            {/* 8. Micro-Markets Geographic Showcase */}
            <MicroMarketsSection
              onOpenMarket={handleOpenMarket}
              onOpenConsultation={handleOpenConsultation}
              onNavigate={navigate}
            />

            {/* 9. Final High-Conversion Closing Call to Action */}
            <ClosingCta
              onOpenValuation={() => handleOpenValuation()}
              onOpenConsultation={handleOpenConsultation}
              onOpenMethod={handleOpenMethod}
            />
          </>
        )}
      </main>

      {/* Video Marquee Brand Banner */}
      {!isAdminRoute &&
        !isIdxRoute &&
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

      {/* Suspended Modals (Loaded only when user triggers them) */}
      <Suspense fallback={null}>
        {valuationOpen && (
          <ValuationModal
            isOpen={valuationOpen}
            initialAddress={initialValuationAddress}
            onClose={() => setValuationOpen(false)}
          />
        )}

        {consultationOpen && (
          <ConsultationModal
            isOpen={consultationOpen}
            onClose={() => setConsultationOpen(false)}
          />
        )}

        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {selectedMarketId && (
          <MarketModal
            marketId={selectedMarketId}
            onClose={() => setSelectedMarketId(null)}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {selectedChapterId && (
          <PlaybookModal
            chapterId={selectedChapterId}
            onClose={() => setSelectedChapterId(null)}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {methodModalOpen && (
          <MethodModal
            isOpen={methodModalOpen}
            initialPhaseIndex={initialMethodPhase}
            onClose={() => setMethodModalOpen(false)}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {calculatorOpen && (
          <CalculatorModal
            isOpen={calculatorOpen}
            onClose={() => setCalculatorOpen(false)}
          />
        )}

        {checklistOpen && (
          <ChecklistModal
            isOpen={checklistOpen}
            onClose={() => setChecklistOpen(false)}
          />
        )}

        {legalType && (
          <LegalModal
            type={legalType}
            onClose={() => setLegalType(null)}
          />
        )}

        {/* Global Floating Widgets (Loaded asynchronously after main paint) */}
        <AccessibilityWidget />
        <StickyCallButton />
      </Suspense>

      {/* Universal Global In-Line CMS Editor (activates on every word, button, and image across whole site) */}
      <GlobalInlineEditor currentPath={currentPath} />

      {/* Admin Floating Inline Toolbar (Only visible when admin is logged in) */}
      <AdminToolbar onNavigate={navigate} currentPath={currentPath} />
    </div>
  );
}
