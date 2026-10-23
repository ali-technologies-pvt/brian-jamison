import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface HomepageQuickSearchProps {
  onNavigate?: (path: string) => void;
}

export const HomepageQuickSearch: React.FC<HomepageQuickSearchProps> = ({ onNavigate }) => {
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded' | 'fallback'>('loading');
  const [reloadKey, setReloadKey] = useState(0);

  // Controlled form states for fallback mode if external IDX script is blocked/offline
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('1'); // 1 = Single Family
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');

  const mountRef = useRef<HTMLDivElement>(null);

  // Popular OKC & Edmond Luxury Enclaves
  const POPULAR_ENCLAVES = [
    { name: 'Edmond', slug: '/areas/edmond', cityVal: 'Edmond' },
    { name: 'Nichols Hills', slug: '/areas/nichols-hills', cityVal: 'Nichols Hills' },
    { name: 'Oak Tree', slug: '/areas/oak-tree', cityVal: 'Edmond' },
    { name: 'Gaillardia', slug: '/areas/gaillardia', cityVal: 'Oklahoma City' },
    { name: 'Deer Creek', slug: '/areas/deer-creek', cityVal: 'Edmond' },
    { name: 'Heritage Hills', slug: '/areas/heritage-hills', cityVal: 'Oklahoma City' },
    { name: 'Norman', slug: '/areas/norman', cityVal: 'Norman' },
    { name: 'Guthrie Acreage', slug: '/areas/guthrie', cityVal: 'Guthrie' }
  ];

  // Exact script requested by user:
  // <script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-20754" src="//jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754"></script>
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    setWidgetStatus('loading');
    container.innerHTML = '';

    // Remove any previous instances of script and injected widget
    const existingScript = document.getElementById('idxwidgetsrc-20754');
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    const existingWidget = document.getElementById('IDX-quicksearch-20754');
    if (existingWidget && existingWidget.parentNode) {
      existingWidget.parentNode.removeChild(existingWidget);
    }

    // Create wrapper host element
    const mountHost = document.createElement('div');
    mountHost.id = `idx-mount-20754-${reloadKey}`;
    mountHost.className = 'idx-mount-host w-full';
    container.appendChild(mountHost);

    // Create and attach exact requested IDX Broker script
    const script = document.createElement('script');
    script.charset = 'UTF-8';
    script.type = 'text/javascript';
    script.id = 'idxwidgetsrc-20754';
    // Use https to ensure proper protocol handling across both dev and production
    script.src = 'https://jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754';

    mountHost.appendChild(script);

    // Detection loop for injected IDX Broker DOM elements
    let attempts = 0;
    const maxAttempts = 35; // ~7 seconds
    const interval = setInterval(() => {
      attempts++;
      const hasIdxContent =
        document.getElementById('IDX-quicksearch-20754') ||
        container.querySelector('.IDX-quicksearchForm') ||
        container.querySelector('#IDX-quicksearch-20754') ||
        mountHost.querySelector('form') ||
        mountHost.children.length > 1;

      if (hasIdxContent) {
        clearInterval(interval);
        setWidgetStatus('loaded');
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        // If external script is blocked (e.g. adblocker, CORS, or offline), gracefully activate verified fallback
        setWidgetStatus('fallback');
      }
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [reloadKey]);

  return (
    <section
      id="mls-search-bar"
      aria-label="Direct MLS Realtime Property Search"
      className="relative z-20 w-full bg-[#FAF9F6] py-10 sm:py-14 border-b border-[#E5E0D8]"
    >
      {/* 
        Comprehensive Scoped CSS Overrides:
        Elevates the raw IDX Broker #IDX-quicksearch-20754 widget to match the Brian Jamison Luxury Theme
      */}
      <style>{`
        /* Reset and host container sizing */
        #IDX-quicksearch-20754,
        .IDX-quicksearchForm {
          width: 100% !important;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
          font-family: inherit !important;
        }

        /* Form layout - Flex grid across the container */
        #IDX-quicksearch-20754 form,
        .IDX-quicksearchForm form {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 1rem !important;
          align-items: flex-end !important;
          width: 100% !important;
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
        }

        /* Individual Field Wrappers */
        #IDX-quicksearch-20754 .IDX-qsFieldWrap,
        #IDX-quicksearch-20754 > div,
        #IDX-quicksearch-20754 form > div {
          flex: 1 1 180px !important;
          min-width: 140px !important;
          display: flex !important;
          flex-direction: column !important;
        }

        /* Labels */
        #IDX-quicksearch-20754 label,
        .IDX-quicksearchForm label {
          font-family: inherit !important;
          font-size: 0.72rem !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          color: #002D61 !important;
          margin-bottom: 0.4rem !important;
          display: block !important;
        }

        /* Inputs & Select dropdowns */
        #IDX-quicksearch-20754 select,
        #IDX-quicksearch-20754 input[type="text"],
        #IDX-quicksearch-20754 input[type="number"],
        .IDX-quicksearchForm select,
        .IDX-quicksearchForm input[type="text"],
        .IDX-quicksearchForm input[type="number"] {
          width: 100% !important;
          height: 48px !important;
          background-color: #FAF9F6 !important;
          border: 1.5px solid #E5E0D8 !important;
          border-radius: 0.75rem !important;
          padding: 0 1rem !important;
          font-size: 0.875rem !important;
          font-family: inherit !important;
          font-weight: 500 !important;
          color: #002D61 !important;
          outline: none !important;
          box-sizing: border-box !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
          transition: all 0.2s ease !important;
        }

        /* Hover & Focus states */
        #IDX-quicksearch-20754 select:hover,
        #IDX-quicksearch-20754 input:hover,
        .IDX-quicksearchForm select:hover,
        .IDX-quicksearchForm input:hover {
          border-color: #EA580C !important;
        }

        #IDX-quicksearch-20754 select:focus,
        #IDX-quicksearch-20754 input:focus,
        .IDX-quicksearchForm select:focus,
        .IDX-quicksearchForm input:focus {
          border-color: #EA580C !important;
          background-color: #FFFFFF !important;
          box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.15) !important;
        }

        /* Submit Button */
        #IDX-quicksearch-20754 input[type="submit"],
        #IDX-quicksearch-20754 button[type="submit"],
        .IDX-quicksearchForm input[type="submit"],
        .IDX-quicksearchForm button[type="submit"],
        #IDX-qsSubmitBtn-20754 {
          width: 100% !important;
          min-width: 150px !important;
          height: 48px !important;
          background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%) !important;
          color: #FFFFFF !important;
          font-family: inherit !important;
          font-weight: 700 !important;
          font-size: 0.82rem !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          border: none !important;
          border-radius: 0.75rem !important;
          padding: 0 1.5rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 6px 18px rgba(234, 88, 12, 0.35) !important;
        }

        #IDX-quicksearch-20754 input[type="submit"]:hover,
        #IDX-quicksearch-20754 button[type="submit"]:hover,
        .IDX-quicksearchForm input[type="submit"]:hover,
        .IDX-quicksearchForm button[type="submit"]:hover,
        #IDX-qsSubmitBtn-20754:hover {
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
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    widgetStatus === 'loaded' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}></span>
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    widgetStatus === 'loaded' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.22em] text-[#EA580C]">
                  {widgetStatus === 'loaded'
                    ? 'Direct MLSOK Verified Feed Active'
                    : 'Real-Time MLSOK Property Search'}
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

            {/* Quick Actions & Feed Refresh */}
            <div className="shrink-0 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setReloadKey((prev) => prev + 1)}
                title="Reload Realtime IDX Script"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF9F6] hover:bg-[#F5EFE6] text-[#002D61] text-xs font-semibold border border-[#E5E0D8] transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#EA580C] ${widgetStatus === 'loading' ? 'animate-spin' : ''}`} />
                <span>Refresh Feed</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('/map-search') : window.location.assign('/map-search')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-md cursor-pointer hover:-translate-y-0.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Geospatial Map Search</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>
          </div>

          {/* 
            MAIN MOUNT STAGE:
            This is where the user's requested IDX script renders the EXACT realtime IDX filters (#IDX-quicksearch-20754)
          */}
          <div className="w-full relative min-h-[56px]">
            {/* Live Loading Placeholder */}
            {widgetStatus === 'loading' && (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-full border-2 border-[#EA580C] border-t-transparent animate-spin mb-3" />
                <p className="font-sans text-xs sm:text-sm font-semibold text-[#002D61]">
                  Loading Live IDX Broker Realtime Filters (#20754)...
                </p>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  Connecting to MLSOK syndication stream at jamisonrealestateokc.idxbroker.com
                </p>
              </div>
            )}

            {/* Dynamic Host Container where IDX Broker injects the Realtime Widget */}
            <div
              ref={mountRef}
              id="idx-widget-container-20754"
              className={`w-full transition-opacity duration-300 ${
                widgetStatus === 'loaded' ? 'opacity-100 block' : widgetStatus === 'loading' ? 'opacity-0 h-0 overflow-hidden' : 'hidden'
              }`}
            />

            {/* 
              Verified Fallback Console:
              Renders if third-party script is blocked by client adblocker/browser security, 
              guaranteeing the search NEVER disappears or stays blank
            */}
            {widgetStatus === 'fallback' && (
              <form
                id="jamison-quicksearch-fallback-form"
                action="//jamisonrealestateokc.idxbroker.com/idx/results/listings"
                method="get"
                target="_blank"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end animate-fadeIn"
              >
                <input type="hidden" name="idxID" value="d077" />
                <input type="hidden" name="ccz" value="city" />
                <input type="hidden" name="widgetReferer" value="true" />
                <input type="hidden" name="widgetid" value="20754" />

                {/* Field 1: City */}
                <div className="flex flex-col">
                  <label htmlFor="qs-city" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#EA580C]" />
                    <span>Location / City</span>
                  </label>
                  <div className="relative">
                    <select
                      id="qs-city"
                      name="city[]"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">All Greater OKC Cities</option>
                      <option value="Edmond">Edmond, OK</option>
                      <option value="Oklahoma City">Oklahoma City, OK</option>
                      <option value="Nichols Hills">Nichols Hills, OK</option>
                      <option value="Norman">Norman, OK</option>
                      <option value="Deer Creek">Deer Creek, OK</option>
                      <option value="Guthrie">Guthrie, OK</option>
                      <option value="Yukon">Yukon, OK</option>
                      <option value="Mustang">Mustang, OK</option>
                      <option value="Piedmont">Piedmont, OK</option>
                      <option value="Arcadia">Arcadia, OK</option>
                      <option value="Moore">Moore, OK</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#EA580C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 2: Property Type */}
                <div className="flex flex-col">
                  <label htmlFor="qs-pt" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#EA580C]" />
                    <span>Property Type</span>
                  </label>
                  <div className="relative">
                    <select
                      id="qs-pt"
                      name="pt"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="1">Single Family Home</option>
                      <option value="2">Condo / Townhome</option>
                      <option value="3">Vacant Land / Acreage</option>
                      <option value="4">Multi-Family</option>
                      <option value="all">All Property Classes</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#EA580C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 3: Min Price */}
                <div className="flex flex-col">
                  <label htmlFor="qs-min-price" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Min Price
                  </label>
                  <div className="relative">
                    <select
                      id="qs-min-price"
                      name="lp"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">No Minimum</option>
                      <option value="300000">$300,000</option>
                      <option value="400000">$400,000</option>
                      <option value="500000">$500,000</option>
                      <option value="600000">$600,000</option>
                      <option value="750000">$750,000</option>
                      <option value="1000000">$1,000,000</option>
                      <option value="1500000">$1,500,000</option>
                      <option value="2000000">$2,000,000</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#EA580C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 4: Max Price */}
                <div className="flex flex-col">
                  <label htmlFor="qs-max-price" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Max Price
                  </label>
                  <div className="relative">
                    <select
                      id="qs-max-price"
                      name="hp"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">No Maximum</option>
                      <option value="500000">$500,000</option>
                      <option value="650000">$650,000</option>
                      <option value="800000">$800,000</option>
                      <option value="1000000">$1,000,000</option>
                      <option value="1500000">$1,500,000</option>
                      <option value="2000000">$2,000,000</option>
                      <option value="3000000">$3,000,000</option>
                      <option value="5000000">$5,000,000+</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#EA580C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 5: Beds & Baths */}
                <div className="flex flex-col">
                  <label htmlFor="qs-beds" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Beds / Baths
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select
                        id="qs-beds"
                        name="bd"
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        className="w-full h-12 px-2.5 pr-6 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Beds</option>
                        <option value="2">2+ Beds</option>
                        <option value="3">3+ Beds</option>
                        <option value="4">4+ Beds</option>
                        <option value="5">5+ Beds</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#EA580C] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select
                        id="qs-baths"
                        name="tb"
                        value={baths}
                        onChange={(e) => setBaths(e.target.value)}
                        className="w-full h-12 px-2.5 pr-6 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs outline-none focus:border-[#EA580C] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Baths</option>
                        <option value="2">2+ Baths</option>
                        <option value="3">3+ Baths</option>
                        <option value="4">4+ Baths</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#EA580C] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Field 6: Sunset Orange Search Action Button */}
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(234,88,12,0.35)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search MLS</span>
                  </button>
                </div>
              </form>
            )}
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
                    setSelectedCity(enclave.cityVal);
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
