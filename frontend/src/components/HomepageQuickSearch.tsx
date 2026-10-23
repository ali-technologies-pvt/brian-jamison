import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  Layers,
  Home
} from 'lucide-react';

interface HomepageQuickSearchProps {
  onNavigate?: (path: string) => void;
}

export const HomepageQuickSearch: React.FC<HomepageQuickSearchProps> = ({ onNavigate }) => {
  // Exact field values as configured in Brian Jamison's IDX Broker Widget #20754
  const [propertyType, setPropertyType] = useState('all'); // "All"
  const [minPrice, setMinPrice] = useState('200000');     // "200000"
  const [maxPrice, setMaxPrice] = useState('500000');     // "500000"
  const [minSqFt, setMinSqFt] = useState('');             // Min Sq Ft
  const [minBedrooms, setMinBedrooms] = useState('1');    // "1"
  const [minBaths, setMinBaths] = useState('1');          // "1"
  const [selectedCity, setSelectedCity] = useState('');   // "Choose a City"

  const [widgetTab, setWidgetTab] = useState<'styled' | 'raw'>('styled');
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Raw HTML string for iframe to execute the script natively with document.write support
  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <base target="_blank">
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 4px 0;
            background: transparent;
            font-family: 'DM Sans', -apple-system, sans-serif;
            color: #002D61;
            overflow-x: hidden;
          }
          #IDX-quicksearch-20754, .IDX-quicksearchForm {
            width: 100% !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          #IDX-quicksearch-20754 form, .IDX-quicksearchForm form {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 10px !important;
            align-items: center !important;
          }
          select, input[type="text"], input[type="number"] {
            height: 42px !important;
            padding: 0 12px !important;
            border: 1.5px solid #E5E0D8 !important;
            border-radius: 10px !important;
            background-color: #FAF9F6 !important;
            color: #002D61 !important;
            font-size: 13.5px !important;
            font-family: inherit !important;
            outline: none !important;
            transition: all 0.2s ease !important;
          }
          select:focus, input:focus {
            border-color: #EA580C !important;
            background: #FFFFFF !important;
            box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.15) !important;
          }
          input[type="submit"], button[type="submit"], #IDX-qsSubmitBtn-20754 {
            height: 42px !important;
            padding: 0 24px !important;
            background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%) !important;
            color: #FFFFFF !important;
            font-weight: 700 !important;
            font-size: 13px !important;
            letter-spacing: 0.05em !important;
            text-transform: uppercase !important;
            border: none !important;
            border-radius: 10px !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3) !important;
            transition: all 0.2s ease !important;
          }
          input[type="submit"]:hover, button[type="submit"]:hover {
            background: linear-gradient(135deg, #F97316 0%, #EA580C 100%) !important;
            transform: translateY(-1px) !important;
          }
        </style>
      </head>
      <body>
        <script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-20754" src="https://jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754"></script>
      </body>
    </html>
  `;

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

            {/* Quick Actions & View Switcher */}
            <div className="shrink-0 flex items-center gap-2.5">
              {/* Optional Switcher between Theme-Styled IDX Filter & Direct Script Iframe */}
              <div className="hidden sm:inline-flex items-center p-1 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setWidgetTab('styled')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    widgetTab === 'styled'
                      ? 'bg-[#002D61] text-white shadow-xs'
                      : 'text-[#6B7280] hover:text-[#002D61]'
                  }`}
                >
                  Luxury Theme
                </button>
                <button
                  type="button"
                  onClick={() => setWidgetTab('raw')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    widgetTab === 'raw'
                      ? 'bg-[#002D61] text-white shadow-xs'
                      : 'text-[#6B7280] hover:text-[#002D61]'
                  }`}
                >
                  Raw Script Embed
                </button>
              </div>

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
            TAB 1: LUXURY THEMED EXACT IDX BROKER WIDGET #20754
            Exact structure, fields, and default values matching user's IDX Broker control panel:
            - Property Type ("All")
            - Min Price (200000)
            - Max Price (500000)
            - Min Sq Ft
            - Min Bedrooms (1)
            - Min Baths (1)
            - Choose a City
            - Search Button
          */}
          {widgetTab === 'styled' && (
            <form
              id="jamison-idx-widget-20754-form"
              action="https://jamisonrealestateokc.idxbroker.com/idx/results/listings"
              method="get"
              target="_blank"
              className="space-y-4"
            >
              {/* Hidden Parameters Required by IDX Broker Widget 20754 */}
              <input type="hidden" name="idxID" value="d077" />
              <input type="hidden" name="widgetReferer" value="true" />
              <input type="hidden" name="widgetid" value="20754" />

              {/* Row 1: Property Type, Min Price, Max Price, Min Sq Ft, Min Bedrooms, Min Baths */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {/* 1. Property Type Dropdown (Default: All) */}
                <div className="flex flex-col">
                  <label htmlFor="idx-pt" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-[#EA580C]" />
                    <span>Type</span>
                  </label>
                  <div className="relative">
                    <select
                      id="idx-pt"
                      name="pt"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full h-12 px-3 pr-8 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs sm:text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">All</option>
                      <option value="1">Single Family</option>
                      <option value="2">Condo / Townhouse</option>
                      <option value="3">Vacant Land</option>
                      <option value="4">Multi-Family</option>
                      <option value="5">Commercial</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-[#EA580C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Min Price Input (Default: 200000) */}
                <div className="flex flex-col">
                  <label htmlFor="idx-min-price" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Min Price
                  </label>
                  <input
                    type="text"
                    id="idx-min-price"
                    name="lp"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="200000"
                    className="w-full h-12 px-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs sm:text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all"
                  />
                </div>

                {/* 3. Max Price Input (Default: 500000) */}
                <div className="flex flex-col">
                  <label htmlFor="idx-max-price" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Max Price
                  </label>
                  <input
                    type="text"
                    id="idx-max-price"
                    name="hp"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="500000"
                    className="w-full h-12 px-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs sm:text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all"
                  />
                </div>

                {/* 4. Min Sq Ft Input */}
                <div className="flex flex-col">
                  <label htmlFor="idx-min-sqft" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Min Sq Ft
                  </label>
                  <input
                    type="text"
                    id="idx-min-sqft"
                    name="sqft"
                    value={minSqFt}
                    onChange={(e) => setMinSqFt(e.target.value)}
                    placeholder="Min Sq Ft"
                    className="w-full h-12 px-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs sm:text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all"
                  />
                </div>

                {/* 5. Min Bedrooms Input (Default: 1) */}
                <div className="flex flex-col">
                  <label htmlFor="idx-min-bedrooms" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Min Bedrooms
                  </label>
                  <input
                    type="text"
                    id="idx-min-bedrooms"
                    name="bd"
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                    placeholder="1"
                    className="w-full h-12 px-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs sm:text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all"
                  />
                </div>

                {/* 6. Min Baths Input (Default: 1) */}
                <div className="flex flex-col">
                  <label htmlFor="idx-min-baths" className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                    Min Baths
                  </label>
                  <input
                    type="text"
                    id="idx-min-baths"
                    name="tb"
                    value={minBaths}
                    onChange={(e) => setMinBaths(e.target.value)}
                    placeholder="1"
                    className="w-full h-12 px-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-xs sm:text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Choose a City Dropdown & Search Button (Right-aligned as in Widget 20754 preview) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
                {/* 7. Choose a City Dropdown */}
                <div className="relative w-full sm:w-80">
                  <select
                    id="idx-city"
                    name="city[]"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full h-12 px-3.5 pr-8 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] font-sans font-medium text-sm outline-none focus:border-[#EA580C] focus:bg-white focus:ring-2 focus:ring-[#EA580C]/15 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Choose a City</option>
                    <option value="Edmond">Edmond</option>
                    <option value="Oklahoma City">Oklahoma City</option>
                    <option value="Nichols Hills">Nichols Hills</option>
                    <option value="Deer Creek">Deer Creek</option>
                    <option value="Norman">Norman</option>
                    <option value="Guthrie">Guthrie</option>
                    <option value="Yukon">Yukon</option>
                    <option value="Mustang">Mustang</option>
                    <option value="Piedmont">Piedmont</option>
                    <option value="Arcadia">Arcadia</option>
                    <option value="Moore">Moore</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#EA580C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* 8. Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_18px_rgba(234,88,12,0.35)] hover:shadow-[0_8px_24px_rgba(234,88,12,0.5)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          )}

          {/* 
            TAB 2: RAW SCRIPT EMBED IN NATIVE ISOLATED IFRAME
            Executes the exact javascript include requested by user:
            <script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-20754" src="//jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=20754"></script>
          */}
          {widgetTab === 'raw' && (
            <div className="w-full rounded-2xl bg-[#FAF9F6] border border-[#E5E0D8] p-4">
              <iframe
                ref={iframeRef}
                title="IDX Broker Quick Search Widget 20754"
                srcDoc={iframeSrcDoc}
                className="w-full border-none"
                style={{ minHeight: '120px' }}
              />
            </div>
          )}

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
