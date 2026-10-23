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
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let isMounted = true;
    setIsWidgetLoaded(false);

    const loadLiveIdxWidget = async () => {
      // 1. Ensure IDX jQuery dependency is loaded explicitly via HTTPS
      // (prevents HTTP 404 on local dev or unencrypted protocol-relative middleware URLs)
      if (!(window as any).idx || !(window as any).idx.fn) {
        await new Promise<void>((resolve) => {
          const existingJq = document.getElementById('idx_jquery_include_tag');
          if (existingJq) {
            existingJq.remove();
          }
          const jqScript = document.createElement('script');
          jqScript.id = 'idx_jquery_include_tag';
          jqScript.type = 'text/javascript';
          jqScript.src = 'https://middleware.idxbroker.com/graphical/javascript/jqwidx.js?commitCacheBreaker=75ff0d200bc0a6c120a98d0f8452c736a8e1447b';
          jqScript.onload = () => resolve();
          jqScript.onerror = () => resolve();
          document.head.appendChild(jqScript);
        });
      }

      if (!isMounted) return;

      const mountContainer = mountRef.current;
      if (!mountContainer) return;

      // 2. Clean up any previous widget instance
      const existingWidget = document.getElementById('IDX-quicksearch-20754');
      if (existingWidget) {
        existingWidget.remove();
      }
      const existingScript = document.getElementById('idxwidgetsrc-20754');
      if (existingScript) {
        existingScript.remove();
      }

      // 3. Inject the exact script requested by the user:
      // <script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-20754" src="//jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754"></script>
      const script = document.createElement('script');
      script.charset = 'UTF-8';
      script.type = 'text/javascript';
      script.id = 'idxwidgetsrc-20754';
      script.src = 'https://jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754';

      mountContainer.appendChild(script);

      // 4. Poll for widget injection into DOM
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        const widget = document.getElementById('IDX-quicksearch-20754');
        if (widget) {
          clearInterval(interval);
          if (isMounted) setIsWidgetLoaded(true);
        } else if (attempts > 50) {
          clearInterval(interval);
        }
      }, 150);
    };

    loadLiveIdxWidget();

    return () => {
      isMounted = false;
    };
  }, [reloadKey]);

  return (
    <section
      id="mls-search-bar"
      aria-label="Direct MLS Realtime Property Search"
      className="relative z-20 w-full bg-[#FAF9F6] py-10 sm:py-14 border-b border-[#E5E0D8]"
    >
      {/* 
        Comprehensive Scoped Luxury Styling for Realtime IDX Broker Widget #20754:
        Overwrites raw IDX Broker inline styles with the Brian Jamison Luxury Palette
      */}
      <style>{`
        /* Reset default raw borders and box-shadows injected by IDX script */
        #IDX-quicksearch-20754 {
          width: 100% !important;
          max-width: 100% !important;
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          text-align: left !important;
          padding: 0 !important;
          margin: 0 !important;
          font-family: inherit !important;
        }

        #IDX-quicksearchForm-20754 {
          width: 100% !important;
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 12px 14px !important;
          align-items: flex-end !important;
          justify-content: flex-start !important;
          background: transparent !important;
        }

        /* Field wrappers */
        #IDX-quicksearchForm-20754 > .IDX-qsFieldWrap {
          flex: 1 1 140px !important;
          min-width: 120px !important;
          display: flex !important;
          flex-direction: column !important;
          padding: 0 !important;
          margin: 0 !important;
          text-align: left !important;
        }

        /* Property Type wrap */
        #IDX-qsPtWrap-20754 {
          flex: 1.2 1 150px !important;
        }

        /* City List wrap */
        #IDX-qsCityListWrap-20754 {
          flex: 1.8 1 200px !important;
        }

        /* Submit Button wrap */
        #IDX-qsSubmitWrap-20754 {
          flex: 0 0 auto !important;
          min-width: 140px !important;
        }

        /* Labels */
        #IDX-quicksearchForm-20754 label,
        #IDX-quicksearchForm-20754 .IDX-qsLabel {
          font-family: inherit !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          color: #002D61 !important;
          margin-bottom: 6px !important;
          display: block !important;
          float: none !important;
        }

        /* Inputs & Selects */
        #IDX-quicksearchForm-20754 select,
        #IDX-quicksearchForm-20754 input[type="text"],
        #IDX-quicksearchForm-20754 .IDX-qsSelectInput,
        #IDX-quicksearchForm-20754 .IDX-qsTextInput,
        #IDX-quicksearchForm-20754 .IDX-qsInput {
          width: 100% !important;
          height: 48px !important;
          background-color: #FAF9F6 !important;
          border: 1.5px solid #E5E0D8 !important;
          border-radius: 12px !important;
          padding: 0 14px !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #002D61 !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
        }

        #IDX-quicksearchForm-20754 select:hover,
        #IDX-quicksearchForm-20754 input[type="text"]:hover {
          border-color: #EA580C !important;
        }

        #IDX-quicksearchForm-20754 select:focus,
        #IDX-quicksearchForm-20754 input[type="text"]:focus {
          border-color: #EA580C !important;
          background-color: #FFFFFF !important;
          box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.15) !important;
        }

        /* Search Button */
        #IDX-quicksearchForm-20754 input[type="submit"],
        #IDX-quicksearchForm-20754 #IDX-qsSubmitBtn-20754 {
          width: 100% !important;
          height: 48px !important;
          background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%) !important;
          color: #FFFFFF !important;
          font-family: inherit !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 0 24px !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 6px 18px rgba(234, 88, 12, 0.35) !important;
        }

        #IDX-quicksearchForm-20754 input[type="submit"]:hover,
        #IDX-quicksearchForm-20754 #IDX-qsSubmitBtn-20754:hover {
          background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 24px rgba(234, 88, 12, 0.5) !important;
        }
      `}</style>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Luxury Search Console Card */}
        <div className="relative rounded-3xl bg-white border border-[#E5E0D8] shadow-xl hover:shadow-2xl hover:border-[#EA580C]/40 transition-all duration-300 p-6 sm:p-8 lg:p-10">
          
          {/* Header Strip with Live Status & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-7 border-b border-[#E5E0D8]/80">
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
                onClick={() => setReloadKey((prev) => prev + 1)}
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
            The exact script requested by the user mounts here and injects #IDX-quicksearch-20754 
            with real MLSOK numeric city IDs and live listing filters!
          */}
          <div className="w-full relative min-h-[70px]">
            {/* Loading state indicator */}
            {!isWidgetLoaded && (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="w-7 h-7 rounded-full border-2 border-[#EA580C] border-t-transparent animate-spin mb-2.5" />
                <p className="font-sans text-xs font-semibold text-[#002D61]">
                  Loading Live MLSOK Search Engine (#20754)...
                </p>
              </div>
            )}

            {/* The exact mount point where script tag and widget live */}
            <div
              ref={mountRef}
              id="idx-direct-widget-mount"
              className={`w-full transition-opacity duration-300 ${
                isWidgetLoaded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              }`}
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
