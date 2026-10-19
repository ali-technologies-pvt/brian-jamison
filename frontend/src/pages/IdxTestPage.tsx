import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Building,
  Info,
  MapPin,
  Sparkles,
  ArrowRight,
  Code2,
  Eye,
  Layers,
  Database
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';

interface IdxTestPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const IdxTestPage: React.FC<IdxTestPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [copied, setCopied] = useState(false);
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [displayMode, setDisplayMode] = useState<'raw' | 'luxury' | 'banner'>('luxury');
  const [reloadKey, setReloadKey] = useState(0);
  const [widgetDetails, setWidgetDetails] = useState<{
    formAction?: string;
    fieldsCount?: number;
    hasPropertyType?: boolean;
    hasCitySelect?: boolean;
  }>({});

  const widgetMountRef = useRef<HTMLDivElement>(null);

  const idxCodeSnippet = `<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-15844" src="//jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=15844"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(idxCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReloadWidget = () => {
    setWidgetStatus('loading');
    setReloadKey((prev) => prev + 1);
  };

  // Mount the real IDX Broker script
  useEffect(() => {
    const mountContainer = widgetMountRef.current;
    if (!mountContainer) return;

    // Clean up previous injected elements
    mountContainer.innerHTML = '';
    const oldScript = document.getElementById('idxwidgetsrc-15844');
    if (oldScript && oldScript.parentNode) {
      oldScript.parentNode.removeChild(oldScript);
    }
    const oldWidget = document.getElementById('IDX-quicksearch-15844');
    if (oldWidget && oldWidget.parentNode) {
      oldWidget.parentNode.removeChild(oldWidget);
    }

    // Create mount point marker
    const mountMarker = document.createElement('div');
    mountMarker.id = 'idx-mount-marker-' + reloadKey;
    mountContainer.appendChild(mountMarker);

    // Create the exact script requested by the user
    const script = document.createElement('script');
    script.charset = 'UTF-8';
    script.type = 'text/javascript';
    script.id = 'idxwidgetsrc-15844';
    script.src = 'https://jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=15844';

    mountMarker.appendChild(script);

    // Polling interval to detect when IDX renders the widget into the DOM
    let attempts = 0;
    const maxAttempts = 50; // 15 seconds
    const interval = setInterval(() => {
      attempts++;
      const widgetEl = document.getElementById('IDX-quicksearch-15844');
      if (widgetEl) {
        clearInterval(interval);
        setWidgetStatus('loaded');

        // Extract metadata for the inspector
        const formEl = widgetEl.querySelector('form');
        const selects = widgetEl.querySelectorAll('select');
        const inputs = widgetEl.querySelectorAll('input');

        setWidgetDetails({
          formAction: formEl?.getAttribute('action') || 'https://jamisonrealestateokc.idxbroker.com/idx/results/listings',
          fieldsCount: (selects.length || 0) + (inputs.length || 0),
          hasPropertyType: !!widgetEl.querySelector('#IDX-qsPtWrap-15844'),
          hasCitySelect: !!widgetEl.querySelector('#IDX-qsCityListWrap-15844')
        });
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        // If not found in 15 seconds, mark error or check if it injected elsewhere
        setWidgetStatus('error');
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [reloadKey]);

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] pt-28 sm:pt-32 pb-24 selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb Navigation & Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B7280] mb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-[#EA580C] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#002D61] font-semibold">Properties</span>
            <span>/</span>
            <span className="text-[#EA580C] font-semibold">MLS Quick Search</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/map-search')}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D8] text-[#002D61] hover:text-[#EA580C] hover:border-[#EA580C]/40 transition-colors font-medium text-xs cursor-pointer shadow-2xs"
            >
              Interactive Map Search →
            </button>
          </div>
        </div>

        {/* Header Hero Banner */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#002D61] via-[#001D40] to-[#00142C] text-white shadow-2xl overflow-hidden mb-12 border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FB923C] text-[11px] font-bold uppercase tracking-widest mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>Live Third-Party MLS Integration Test</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
              IDX Broker Quick Search <span className="text-[#FB923C] italic font-normal">Widget #15844</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mb-8">
              Dedicated testing sandbox for the live Oklahoma MLS quick-search widget script provided for{' '}
              <strong className="text-white font-semibold">Brian Jamison Real Estate</strong> (Account:{' '}
              <code className="text-[#FB923C] font-mono text-xs px-1.5 py-0.5 rounded bg-black/30">
                jamisonrealestateokc.idxbroker.com
              </code>
              ). You can test form submissions, view live data fields, and preview both the raw code and custom luxury layouts below.
            </p>

            {/* Status Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    widgetStatus === 'loaded'
                      ? 'bg-emerald-400 animate-pulse'
                      : widgetStatus === 'loading'
                      ? 'bg-amber-400 animate-ping'
                      : 'bg-rose-400'
                  }`}
                />
                <span className="font-semibold">
                  Status:{' '}
                  {widgetStatus === 'loaded'
                    ? 'Live & Active in DOM'
                    : widgetStatus === 'loading'
                    ? 'Loading Script from IDX Broker...'
                    : 'Check Script Connection'}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <Building className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Broker: <strong>Salt Real Estate / Brian Jamison</strong></span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>MLS Area: <strong>Greater Oklahoma City (MLSOK)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* View Controls & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EA580C]/25 shadow-xs mb-8">
          {/* Display Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#002D61] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#EA580C]" />
              Display Mode:
            </span>

            <button
              type="button"
              onClick={() => setDisplayMode('luxury')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'luxury'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Modern Luxury Theme (Recommended)</span>
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('raw')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'raw'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Raw Default IDX (Original 250px)</span>
            </button>

            <button
              type="button"
              onClick={() => setDisplayMode('banner')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                displayMode === 'banner'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Hero Banner Strip</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleReloadWidget}
              className="px-4 py-2 rounded-xl bg-[#FAF9F6] hover:bg-[#F5EFE6] text-[#002D61] text-xs font-bold border border-[#EA580C]/30 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Reload widget script"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Reload Widget</span>
            </button>

            <a
              href="https://jamisonrealestateokc.idxbroker.com/idx/results/listings"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <span>Open MLS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Main Stage Grid: Interactive Widget + Technical Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Live Integrated Widget (Cols 7 or 8) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#EA580C]/25 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EA580C]/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EA580C]/15 flex items-center justify-center text-[#EA580C]">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#002D61]">
                      Live IDX Quick Search Interface
                    </h3>
                    <span className="text-[11px] text-[#6B7280]">
                      Active Mode: {displayMode === 'luxury' ? 'Modern Luxury Container' : displayMode === 'raw' ? 'Default 250px Raw Container' : 'Full-Width Hero Banner Strip'}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C]">
                  Widget ID #15844
                </span>
              </div>

              {/* Scoped Styling for Enhanced Luxury Mode & Banner Mode */}
              <style>{`
                /* Modern Luxury Container Scoped Overrides */
                .idx-luxury-skin #IDX-quicksearch-15844 {
                  width: 100% !important;
                  max-width: 540px !important;
                  margin: 0 auto !important;
                  border-radius: 1.25rem !important;
                  border: 1.5px solid rgba(234, 88, 12, 0.25) !important;
                  box-shadow: 0 12px 30px -8px rgba(0, 29, 64, 0.12) !important;
                  background: #FFFFFF !important;
                  padding: 1.5rem !important;
                }
                .idx-luxury-skin #IDX-quicksearch-15844 select,
                .idx-luxury-skin #IDX-quicksearch-15844 input[type="text"] {
                  background-color: #FAF9F6 !important;
                  border: 1px solid #E5E0D8 !important;
                  border-radius: 0.75rem !important;
                  padding: 0.65rem 0.85rem !important;
                  color: #002D61 !important;
                  font-size: 0.875rem !important;
                  box-sizing: border-box !important;
                }
                .idx-luxury-skin #IDX-quicksearch-15844 select:focus,
                .idx-luxury-skin #IDX-quicksearch-15844 input[type="text"]:focus {
                  border-color: #EA580C !important;
                  outline: 2px solid rgba(234, 88, 12, 0.2) !important;
                }
                .idx-luxury-skin #IDX-quicksearch-15844 label {
                  color: #002D61 !important;
                  font-size: 0.75rem !important;
                  font-weight: 700 !important;
                  text-transform: uppercase !important;
                  letter-spacing: 0.05em !important;
                  margin-bottom: 0.35rem !important;
                }
                .idx-luxury-skin #IDX-quicksearch-15844 input[type="submit"],
                .idx-luxury-skin #IDX-quicksearch-15844 button[type="submit"] {
                  background: #EA580C !important;
                  color: #FFFFFF !important;
                  font-weight: 800 !important;
                  font-size: 0.875rem !important;
                  letter-spacing: 0.08em !important;
                  text-transform: uppercase !important;
                  border: none !important;
                  border-radius: 9999px !important;
                  padding: 0.85rem 1.75rem !important;
                  cursor: pointer !important;
                  width: 100% !important;
                  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.35) !important;
                  transition: all 0.2s ease !important;
                }
                .idx-luxury-skin #IDX-quicksearch-15844 input[type="submit"]:hover,
                .idx-luxury-skin #IDX-quicksearch-15844 button[type="submit"]:hover {
                  background: #C2410C !important;
                  transform: scale(1.01) !important;
                }

                /* Full Banner Strip Mode Overrides */
                .idx-banner-skin #IDX-quicksearch-15844 {
                  width: 100% !important;
                  max-width: 100% !important;
                  border-radius: 1.5rem !important;
                  border: 2px solid rgba(234, 88, 12, 0.3) !important;
                  box-shadow: 0 20px 40px -10px rgba(0, 29, 64, 0.15) !important;
                  background: #001D40 !important;
                  color: #FFFFFF !important;
                  padding: 2rem !important;
                }
                .idx-banner-skin #IDX-quicksearch-15844 label {
                  color: #FB923C !important;
                  font-size: 0.75rem !important;
                  font-weight: 700 !important;
                  text-transform: uppercase !important;
                  letter-spacing: 0.05em !important;
                }
                .idx-banner-skin #IDX-quicksearch-15844 select,
                .idx-banner-skin #IDX-quicksearch-15844 input[type="text"] {
                  background-color: rgba(255, 255, 255, 0.1) !important;
                  border: 1px solid rgba(255, 255, 255, 0.25) !important;
                  color: #FFFFFF !important;
                  border-radius: 0.75rem !important;
                  padding: 0.7rem 0.9rem !important;
                }
                .idx-banner-skin #IDX-quicksearch-15844 select option {
                  color: #002D61 !important;
                  background: #FFFFFF !important;
                }
                .idx-banner-skin #IDX-quicksearch-15844 input[type="submit"],
                .idx-banner-skin #IDX-quicksearch-15844 button[type="submit"] {
                  background: #EA580C !important;
                  color: #FFFFFF !important;
                  border-radius: 9999px !important;
                  padding: 0.9rem 2rem !important;
                  font-weight: 800 !important;
                  cursor: pointer !important;
                  text-transform: uppercase !important;
                  width: 100% !important;
                  box-shadow: 0 4px 16px rgba(234, 88, 12, 0.45) !important;
                }
              `}</style>

              {/* Live Loading Placeholder */}
              {widgetStatus === 'loading' && (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border-3 border-[#EA580C] border-t-transparent animate-spin mb-4" />
                  <h4 className="font-serif text-lg font-bold text-[#002D61] mb-1">
                    Fetching Widget from IDX Broker...
                  </h4>
                  <p className="text-xs text-[#6B7280] max-w-sm">
                    Connecting to <code className="text-[#EA580C]">jamisonrealestateokc.idxbroker.com</code> to build form fields and MLSOK dataset.
                  </p>
                </div>
              )}

              {/* The Actual Real Widget Container */}
              <div
                className={`transition-all duration-300 ${
                  displayMode === 'luxury'
                    ? 'idx-luxury-skin'
                    : displayMode === 'banner'
                    ? 'idx-banner-skin'
                    : 'raw-idx-container flex justify-center'
                }`}
              >
                {/* Mount Target where the script injects the form */}
                <div ref={widgetMountRef} id="idx-real-mount-area" />
              </div>

              {/* Functional Tip */}
              <div className="mt-8 pt-4 border-t border-[#EA580C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>This widget submits live queries directly to your MLS search portal.</span>
                </div>
                <span className="text-[#002D61] font-semibold">100% Real Oklahoma MLS Data</span>
              </div>
            </div>

            {/* Code Snippet Box with Copy Button */}
            <div className="p-6 rounded-2xl bg-[#001D40] text-white border border-white/15 shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FB923C]" />
                  <span className="font-mono text-xs font-bold text-[#FB923C] uppercase tracking-wider">
                    Integration Code Snippet
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#FB923C]" />
                      <span>Copy Script Tag</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-[#FB923C] overflow-x-auto select-all leading-relaxed">
                {idxCodeSnippet}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Inspector & Integration Recommendations (Cols 5 or 4) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Inspector Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EA580C]/25 shadow-md space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#EA580C]/20">
                <ShieldCheck className="w-5 h-5 text-[#EA580C]" />
                <h3 className="font-serif text-lg font-bold text-[#002D61]">
                  Technical Inspector
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Widget ID</span>
                  <span className="font-mono font-bold text-[#002D61]">15844</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Target Subdomain</span>
                  <span className="font-mono font-bold text-[#EA580C] text-[11px]">
                    jamisonrealestateokc.idxbroker.com
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">DOM Element ID</span>
                  <span className="font-mono font-bold text-[#002D61]">
                    #IDX-quicksearch-15844
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Form Method</span>
                  <span className="font-mono font-bold text-emerald-700">GET (Direct Redirect)</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Detected Form Action</span>
                  <span className="font-mono font-bold text-[#002D61] text-[10px] truncate max-w-[160px]" title={widgetDetails.formAction}>
                    /idx/results/listings
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-2">
                  Form Fields Detected:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Property Type</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>City Dropdown</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Min/Max Price</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Beds & Baths</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Deploy This Widget Recommendation Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#002D61] text-white shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FB923C]" />
                <h4 className="font-serif text-base font-bold text-white">
                  Where Can We Place This?
                </h4>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Now that this widget is verified and working, we can deploy it across any section of the website:
              </p>

              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-1.5 shrink-0" />
                  <span>
                    <strong>Option 1: Homepage Hero Search Bar</strong> — Positioned directly underneath the drone video hero as a floating luxury search capsule.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-1.5 shrink-0" />
                  <span>
                    <strong>Option 2: Dedicated /listings Page</strong> — Embedded at the top of the Featured Closings & Active Listings portfolio.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-1.5 shrink-0" />
                  <span>
                    <strong>Option 3: Neighborhood Guides</strong> — Pre-filtered for Nichols Hills, Edmond, Gaillardia, etc.
                  </span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer text-center"
                >
                  Contact Brian Jamison Direct
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
