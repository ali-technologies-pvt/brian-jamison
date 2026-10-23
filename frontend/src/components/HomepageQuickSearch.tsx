import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface HomepageQuickSearchProps {
  onNavigate?: (path: string) => void;
}

export const HomepageQuickSearch: React.FC<HomepageQuickSearchProps> = ({ onNavigate }) => {
  const [iframeHeight, setIframeHeight] = useState(130);
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Popular OKC & Edmond Luxury Enclaves
  const POPULAR_ENCLAVES = [
    { name: 'Edmond', slug: '/areas/edmond' },
    { name: 'Nichols Hills', slug: '/areas/nichols-hills' },
    { name: 'Oak Tree', slug: '/areas/oak-tree' },
    { name: 'Gaillardia', slug: '/areas/gaillardia' },
    { name: 'Deer Creek', slug: '/areas/deer-creek' },
    { name: 'Heritage Hills', slug: '/areas/heritage-hills' },
    { name: 'Norman', slug: '/areas/norman' },
    { name: 'Guthrie Acreage', slug: '/areas/guthrie' }
  ];

  // Auto-resize iframe when the real-time IDX widget finishes loading its DOM
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'IDX_WIDGET_RESIZE' && typeof event.data.height === 'number') {
        setIframeHeight(Math.max(event.data.height + 16, 120));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
    if (iframeRef.current) {
      iframeRef.current.src = `/idx-search-widget.html?v=${Date.now()}`;
    }
  };

  return (
    <section
      id="mls-search-bar"
      aria-label="Direct MLS Realtime Property Search"
      className="relative z-20 w-full bg-[#FAF9F6] py-10 sm:py-14 border-b border-[#E5E0D8]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Luxury Search Console Card */}
        <div className="relative rounded-3xl bg-white border border-[#E5E0D8] shadow-xl hover:shadow-2xl hover:border-[#EA580C]/40 transition-all duration-300 p-6 sm:p-8 lg:p-10">
          
          {/* Header Strip with Live Status & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-[#E5E0D8]/80">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#EA580C]">
                  Direct MLSOK Verified Feed
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61]">
                  IDX Widget #20754
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#002D61] tracking-tight">
                Find Your Next Home in Edmond & Greater OKC
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#6B7280] mt-1 max-w-2xl leading-relaxed">
                Live search filters syndicating active real-time listings, off-market opportunities, and luxury estates directly from MLSOK.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="shrink-0 flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleReload}
                title="Reload Live IDX Widget Script"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F5EFE6] text-[#002D61] text-xs font-semibold border border-[#E5E0D8] transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Refresh Feed</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('/map-search') : window.location.assign('/map-search')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Geospatial Map Search</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>
          </div>

          {/* 
            LIVE REALTIME IDX BROKER WIDGET #20754:
            Executes the exact javascript include requested by the user:
            <script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-20754" src="//jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754"></script>
            Embedded cleanly via an isolated HTML container so document.write executes natively without being blocked by SPA/React.
          */}
          <div className="w-full relative min-h-[110px] overflow-hidden">
            <iframe
              ref={iframeRef}
              key={reloadKey}
              src={`/idx-search-widget.html?v=${reloadKey}`}
              title="Realtime MLSOK Quick Search Widget #20754"
              className="w-full border-none transition-all duration-300"
              style={{
                height: `${iframeHeight}px`,
                minHeight: '110px',
                display: 'block'
              }}
              loading="eager"
            />
          </div>

          {/* Curated Enclaves Shortcut Strip & MLS Compliance Footer */}
          <div className="mt-8 pt-6 border-t border-[#E5E0D8]/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] shrink-0 mr-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Quick Enclaves:</span>
              </span>
              {POPULAR_ENCLAVES.map((enclave) => (
                <button
                  key={enclave.name}
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(enclave.slug);
                    } else {
                      window.location.assign(enclave.slug);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF9F6] hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#E5E0D8] hover:border-[#002D61] transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5"
                >
                  {enclave.name}
                </button>
              ))}
            </div>

            {/* Compliance Badge */}
            <div className="flex items-center gap-2 text-[11px] text-[#6B7280] shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
              <span>Verified MLSOK IDX Stream & Equal Housing Opportunity</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
