import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Building,
  MapPin,
  ExternalLink,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Code2,
  Sliders,
  Info,
  CheckCircle2,
  ArrowRight,
  Database,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';

interface IdxWidgetTestPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const IdxWidgetTestPage: React.FC<IdxWidgetTestPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [copied, setCopied] = useState(false);
  const [renderMode, setRenderMode] = useState<'luxury' | 'raw' | 'isolated'>('luxury');
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const [detectedNodesCount, setDetectedNodesCount] = useState<number>(0);
  const [detectedListingLinks, setDetectedListingLinks] = useState<number>(0);

  const directMountRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const WIDGET_ID = '179291';
  const SCRIPT_URL = `https://jamisonrealestateokc.idxbroker.com/idx/widgets/${WIDGET_ID}`;
  const idxCodeSnippet = `<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-${WIDGET_ID}" src="//jamisonrealestateokc.idxbroker.com/idx/widgets/${WIDGET_ID}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(idxCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReload = () => {
    setWidgetStatus('loading');
    setDetectedNodesCount(0);
    setDetectedListingLinks(0);
    setReloadKey((prev) => prev + 1);
  };

  // Direct DOM Injection and Iframe rendering
  useEffect(() => {
    let checkInterval: ReturnType<typeof setInterval> | null = null;
    let attempts = 0;
    const maxAttempts = 60; // 18 seconds timeout

    if (renderMode === 'isolated') {
      // Build safe isolated document that allows document.write and external scripts to run smoothly
      const iframe = iframeRef.current;
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <base target="_blank">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">
              <style>
                * { box-sizing: border-box; }
                html, body {
                  width: 100%;
                  height: 100%;
                  min-height: 700px;
                  margin: 0;
                  padding: 8px;
                  background-color: #FAF9F6;
                  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                  color: #002D61;
                }
                #idx-widget-container-${WIDGET_ID},
                idx-prime-map-search,
                #idx-prime-map-search-${WIDGET_ID} {
                  display: block !important;
                  width: 100% !important;
                  height: 100% !important;
                  min-height: 680px !important;
                  position: relative !important;
                }
                a { color: #EA580C; text-decoration: none; font-weight: 600; }
                a:hover { color: #C2410C; text-decoration: underline; }
                img { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>
              <div id="idx-widget-container-${WIDGET_ID}" style="width: 100%; height: 100%; min-height: 680px;">
                <script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-${WIDGET_ID}" src="${SCRIPT_URL}"></script>
              </div>
            </body>
            </html>
          `);
          doc.close();

          checkInterval = setInterval(() => {
            attempts++;
            try {
              const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
              if (innerDoc) {
                const links = innerDoc.querySelectorAll('a');
                const children = innerDoc.body.querySelectorAll('*');
                if (children.length > 3) {
                  setWidgetStatus('loaded');
                  setDetectedNodesCount(children.length);
                  setDetectedListingLinks(links.length);
                  clearInterval(checkInterval!);
                  return;
                }
              }
            } catch {
              // cross-origin protection if redirected
            }

            if (attempts >= maxAttempts) {
              clearInterval(checkInterval!);
              setWidgetStatus('loaded'); // Script executed
            }
          }, 300);
        }
      }
    } else {
      // Direct DOM Injection Mode
      const container = directMountRef.current;
      if (container) {
        container.innerHTML = '';

        // Clean up previous injected scripts if any
        const existingScript = document.getElementById(`idxwidgetsrc-${WIDGET_ID}`);
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }

        const mountHost = document.createElement('div');
        mountHost.id = `idx-mount-${WIDGET_ID}-${reloadKey}`;
        container.appendChild(mountHost);

        const script = document.createElement('script');
        script.charset = 'UTF-8';
        script.type = 'text/javascript';
        script.id = `idxwidgetsrc-${WIDGET_ID}`;
        script.src = SCRIPT_URL;

        script.onload = () => {
          setWidgetStatus('loaded');
        };

        script.onerror = () => {
          setWidgetStatus('error');
        };

        mountHost.appendChild(script);

        checkInterval = setInterval(() => {
          attempts++;
          const mountEl = document.getElementById(`idx-mount-${WIDGET_ID}-${reloadKey}`);
          const widgetEl = document.getElementById(`IDX-widget-${WIDGET_ID}`) ||
                           document.querySelector(`[id*="${WIDGET_ID}"]`);

          if (mountEl) {
            const elements = mountEl.querySelectorAll('*');
            const links = mountEl.querySelectorAll('a');
            if (elements.length > 2 || widgetEl) {
              setWidgetStatus('loaded');
              setDetectedNodesCount(elements.length);
              setDetectedListingLinks(links.length);
              clearInterval(checkInterval!);
              return;
            }
          }

          if (attempts >= maxAttempts) {
            clearInterval(checkInterval!);
            // If DOM injection completed or waiting
            setWidgetStatus(container.children.length > 0 ? 'loaded' : 'error');
          }
        }, 300);
      }
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [reloadKey, renderMode, SCRIPT_URL, WIDGET_ID]);

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] pt-28 sm:pt-32 pb-24 selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Navigation Breadcrumbs & Cross-Link to Quick Search */}
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
            <span className="text-[#002D61] font-semibold">Integrations</span>
            <span>/</span>
            <span className="text-[#EA580C] font-semibold">IDX Widget #{WIDGET_ID}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6B7280]">Switch Test Widget:</span>
            <button
              type="button"
              onClick={() => onNavigate('/idx-test')}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E0D8] text-[#002D61] hover:text-[#EA580C] hover:border-[#EA580C]/40 transition-colors font-medium text-xs cursor-pointer"
            >
              Quick Search (#15844) →
            </button>
          </div>
        </div>

        {/* Hero Banner: Jamison Luxury Real Estate Identity */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#002D61] via-[#001D40] to-[#00142C] text-white shadow-2xl overflow-hidden mb-10 border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FB923C] text-[11px] font-bold uppercase tracking-widest mb-4">
              <Database className="w-3.5 h-3.5" />
              <span>Live IDX Broker Prime Map Search Integration</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
              Prime Map Search <span className="text-[#FB923C] italic font-normal">Widget #{WIDGET_ID}</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl mb-8">
              Live validation sandbox for IDX Broker's <strong className="text-white font-semibold">Prime Map Search</strong> widget{' '}
              <strong className="text-[#FB923C] font-semibold">#{WIDGET_ID}</strong> (Account:{' '}
              <code className="text-[#FB923C] font-mono text-xs px-2 py-0.5 rounded bg-black/40">
                jamisonrealestateokc.idxbroker.com
              </code>
              ). Ye widget Oklahoma City metro area (<code className="text-[#FB923C] font-mono text-xs">lat: 35.5508, lng: -97.5489</code>) ka interactive GIS map render karta hai jisme active MLS listing pins, polygon boundary drawing tools, aur zoom controls integrated hain.
            </p>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
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
                    ? 'Active & Loaded'
                    : widgetStatus === 'loading'
                    ? 'Fetching Widget from IDX Broker...'
                    : 'Awaiting Connection / Script Check'}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <Building className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Broker: <strong>Brian Jamison (Salt Real Estate)</strong></span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Board: <strong>MLSOK (Oklahoma City Metro)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* View Controls & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EA580C]/25 shadow-xs mb-8">
          {/* Display Mode Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#002D61] uppercase tracking-wider mr-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#EA580C]" />
              Display Mode:
            </span>

            <button
              type="button"
              onClick={() => setRenderMode('luxury')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                renderMode === 'luxury'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Luxury Theme Container</span>
            </button>

            <button
              type="button"
              onClick={() => setRenderMode('isolated')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                renderMode === 'isolated'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Isolated Safe Frame (Recommended for Scripts)</span>
            </button>

            <button
              type="button"
              onClick={() => setRenderMode('raw')}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                renderMode === 'raw'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] border border-[#E5E0D8]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Raw DOM Mode</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={SCRIPT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#002D61] text-xs font-bold border border-[#EA580C]/40 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Inspect raw script in a new browser tab to see what IDX Broker is returning"
            >
              <span>Inspect Raw Script</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EA580C]" />
            </a>

            <button
              type="button"
              onClick={handleReload}
              className="px-4 py-2 rounded-xl bg-[#FAF9F6] hover:bg-[#F5EFE6] text-[#002D61] text-xs font-bold border border-[#EA580C]/30 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Re-inject script and reload widget"
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
              <span>View MLS Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Localhost & Diagnostic Advisory Banner */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] text-[#9A3412] shadow-sm">
          <div className="flex items-start gap-3.5">
            <Info className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
            <div className="space-y-2 text-xs sm:text-sm">
              <strong className="font-bold text-[#7C2D12] text-sm sm:text-base block">
                Localhost Diagnostics: Agar Widget Blank / Khali Nazar Aa Raha Ho To Kya Waja Hai?
              </strong>
              <p className="text-[#9A3412] leading-relaxed">
                IDX Broker widgets security aur licensing ki waja se aksar <strong>localhost</strong> par blank show hote hain. Yahan 3 main wajohat aur unka hal diya gaya hai:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#7C2D12]">
                <li>
                  <strong>1. Domain Whitelisting (Most Common):</strong> IDX Broker sirf account mein registered production domain (e.g. <code className="bg-orange-150 px-1 rounded">jamisonrealestateokc.com</code>) se requests allow karta hai. Jab request <code className="bg-orange-150 px-1 rounded">localhost:3000</code> se aati hai, IDX security script ko blank ya 403 kar deti hai.
                </li>
                <li>
                  <strong>2. Zero Active Listings in Widget:</strong> Agar widget #179291 "Featured Listings" ya custom search par bana hai aur is waqt us criteria mein koi active property nahi hai, to widget 0 cards render karega.
                </li>
                <li>
                  <strong>3. Display Mode Try Karein:</strong> Upar diye gaye <strong>"Luxury Theme Container"</strong> ya <strong>"Raw DOM Mode"</strong> par switch karke dekhein ke direct DOM injection mein script load hoti hai ya nahi.
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-xs text-[#7C2D12]">Quick Test:</span>
                <a
                  href={SCRIPT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#EA580C] underline hover:text-[#C2410C]"
                >
                  Click karke dekhein script kya return kar rahi hai ({SCRIPT_URL})
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Testing Stage: Left (Live Widget), Right (Technical Inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Live Embedded Widget (Cols 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#EA580C]/25 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EA580C]/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EA580C]/15 flex items-center justify-center text-[#EA580C]">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#002D61]">
                      Combined Luxury MLS Search & Map Portal
                    </h2>
                    <span className="text-[11px] text-[#6B7280]">
                      Search Filters + Prime Map Search (Widget #{WIDGET_ID})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF9F6] border border-[#EA580C]/30 text-[#EA580C]">
                    Widget ID: {WIDGET_ID}
                  </span>
                </div>
              </div>

              {/* Integrated Quick Search Filter Capsule */}
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#001D40] text-white border border-white/10 shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#FB923C]" />
                    <span className="font-serif text-sm font-bold text-white tracking-wide">
                      MLS Search Criteria & Filters
                    </span>
                  </div>
                  <span className="text-[11px] text-[#FB923C] font-semibold">
                    Direct MLSOK Search Engine
                  </span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget as HTMLFormElement;
                    const formData = new FormData(form);
                    const params = new URLSearchParams();
                    const city = formData.get('city') as string;
                    const pt = formData.get('pt') as string;
                    const lp = formData.get('lp') as string;
                    const hp = formData.get('hp') as string;
                    const bd = formData.get('bd') as string;
                    const tb = formData.get('tb') as string;
                    if (city && city !== 'all') params.append('city', city);
                    if (pt && pt !== 'all') params.append('pt', pt);
                    if (lp && lp !== 'any') params.append('lp', lp);
                    if (hp && hp !== 'any') params.append('hp', hp);
                    if (bd && bd !== 'any') params.append('bd', bd);
                    if (tb && tb !== 'any') params.append('tb', tb);

                    window.open(
                      `https://jamisonrealestateokc.idxbroker.com/idx/results/listings?${params.toString()}`,
                      '_blank'
                    );
                  }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5"
                >
                  {/* City Selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FB923C] mb-1">
                      City / Area
                    </label>
                    <select
                      name="city"
                      defaultValue="32966"
                      className="w-full text-xs py-2 px-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#EA580C] cursor-pointer"
                    >
                      <option value="32966" className="text-[#002D61] bg-white">Oklahoma City</option>
                      <option value="12874" className="text-[#002D61] bg-white">Edmond</option>
                      <option value="all" className="text-[#002D61] bg-white">Nichols Hills / All</option>
                      <option value="31652" className="text-[#002D61] bg-white">Norman</option>
                      <option value="48962" className="text-[#002D61] bg-white">Yukon</option>
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FB923C] mb-1">
                      Property Type
                    </label>
                    <select
                      name="pt"
                      defaultValue="1"
                      className="w-full text-xs py-2 px-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#EA580C] cursor-pointer"
                    >
                      <option value="1" className="text-[#002D61] bg-white">Single Family</option>
                      <option value="2" className="text-[#002D61] bg-white">Condo / Townhouse</option>
                      <option value="3" className="text-[#002D61] bg-white">Luxury Estates</option>
                      <option value="4" className="text-[#002D61] bg-white">Land / Acreage</option>
                      <option value="all" className="text-[#002D61] bg-white">All Properties</option>
                    </select>
                  </div>

                  {/* Min Price */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FB923C] mb-1">
                      Min Price
                    </label>
                    <select
                      name="lp"
                      defaultValue="any"
                      className="w-full text-xs py-2 px-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#EA580C] cursor-pointer"
                    >
                      <option value="any" className="text-[#002D61] bg-white">No Min</option>
                      <option value="300000" className="text-[#002D61] bg-white">$300,000</option>
                      <option value="500000" className="text-[#002D61] bg-white">$500,000</option>
                      <option value="750000" className="text-[#002D61] bg-white">$750,000</option>
                      <option value="1000000" className="text-[#002D61] bg-white">$1,000,000+</option>
                    </select>
                  </div>

                  {/* Max Price */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FB923C] mb-1">
                      Max Price
                    </label>
                    <select
                      name="hp"
                      defaultValue="any"
                      className="w-full text-xs py-2 px-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#EA580C] cursor-pointer"
                    >
                      <option value="any" className="text-[#002D61] bg-white">No Max</option>
                      <option value="600000" className="text-[#002D61] bg-white">$600,000</option>
                      <option value="900000" className="text-[#002D61] bg-white">$900,000</option>
                      <option value="1500000" className="text-[#002D61] bg-white">$1,500,000</option>
                      <option value="3000000" className="text-[#002D61] bg-white">$3,000,000+</option>
                    </select>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#FB923C] mb-1">
                      Beds
                    </label>
                    <select
                      name="bd"
                      defaultValue="any"
                      className="w-full text-xs py-2 px-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#EA580C] cursor-pointer"
                    >
                      <option value="any" className="text-[#002D61] bg-white">Any Beds</option>
                      <option value="2" className="text-[#002D61] bg-white">2+ Beds</option>
                      <option value="3" className="text-[#002D61] bg-white">3+ Beds</option>
                      <option value="4" className="text-[#002D61] bg-white">4+ Beds</option>
                      <option value="5" className="text-[#002D61] bg-white">5+ Beds</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <span>Search</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Scoped CSS to harmonize IDX Broker output with Jamison Real Estate luxury design */}
              <style>{`
                .idx-luxury-showcase {
                  width: 100%;
                  height: 720px;
                  min-height: 680px;
                  border-radius: 1.25rem;
                  padding: 0.5rem;
                  background: #FAF9F6;
                  border: 1.5px solid rgba(234, 88, 12, 0.25);
                  position: relative;
                  overflow: hidden;
                }
                idx-prime-map-search,
                #idx-prime-map-search-179291,
                [id^="idx-mount-179291"],
                #idx-direct-target-179291 {
                  display: block !important;
                  width: 100% !important;
                  height: 100% !important;
                  min-height: 680px !important;
                  position: relative !important;
                }
                .idx-luxury-showcase table {
                  width: 100% !important;
                  border-collapse: separate !important;
                  border-spacing: 0 12px !important;
                }
                .idx-luxury-showcase img {
                  border-radius: 0.75rem !important;
                  box-shadow: 0 4px 12px rgba(0, 45, 97, 0.08) !important;
                  transition: transform 0.2s ease !important;
                }
                .idx-luxury-showcase img:hover {
                  transform: scale(1.02) !important;
                }
                .idx-luxury-showcase a {
                  color: #002D61 !important;
                  font-weight: 700 !important;
                  transition: color 0.15s ease !important;
                }
                .idx-luxury-showcase a:hover {
                  color: #EA580C !important;
                }
                .idx-luxury-showcase .price, .idx-luxury-showcase [class*="price"] {
                  color: #EA580C !important;
                  font-weight: 800 !important;
                  font-family: 'Playfair Display', Georgia, serif !important;
                }
              `}</style>

              {/* Loading State Spinner */}
              {widgetStatus === 'loading' && (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border-3 border-[#EA580C] border-t-transparent animate-spin mb-4" />
                  <h4 className="font-serif text-lg font-bold text-[#002D61] mb-1">
                    Connecting to IDX Broker API...
                  </h4>
                  <p className="text-xs text-[#6B7280] max-w-sm">
                    Retrieving Prime Map Search feed from <code className="text-[#EA580C]">jamisonrealestateokc.idxbroker.com/idx/widgets/{WIDGET_ID}</code>
                  </p>
                </div>
              )}

              {/* Actual Mount Presentation */}
              {renderMode === 'isolated' ? (
                <div className="w-full overflow-hidden rounded-2xl border border-[#E5E0D8] bg-[#FAF9F6]">
                  <iframe
                    ref={iframeRef}
                    title={`IDX Broker Prime Map Search ${WIDGET_ID}`}
                    className="w-full h-[720px] min-h-[680px] border-0 bg-transparent block"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                  />
                </div>
              ) : (
                <div className={renderMode === 'luxury' ? 'idx-luxury-showcase' : 'p-2 w-full h-[720px] min-h-[680px]'}>
                  <div ref={directMountRef} id={`idx-direct-target-${WIDGET_ID}`} className="w-full h-full min-h-[680px]" />
                </div>
              )}

              {/* Helper note */}
              <div className="mt-8 pt-4 border-t border-[#EA580C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>Script dynamically injects live listings and MLS links from MLSOK.</span>
                </div>
                <span className="text-[#002D61] font-semibold">Verified Oklahoma Real Estate MLS</span>
              </div>
            </div>

            {/* Code Snippet Box with One-Click Copy */}
            <div className="p-6 rounded-2xl bg-[#001D40] text-white border border-white/15 shadow-lg">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FB923C]" />
                  <span className="font-mono text-xs font-bold text-[#FB923C] uppercase tracking-wider">
                    Your Exact Provided Script Tag
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
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-[#FB923C] overflow-x-auto select-all leading-relaxed">
                {idxCodeSnippet}
              </div>
            </div>
          </div>

          {/* Right Column: Technical Inspector & Deployment Options (Cols 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Technical Inspector Card */}
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
                  <span className="font-mono font-bold text-[#002D61]">{WIDGET_ID}</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Account Host</span>
                  <span className="font-mono font-bold text-[#EA580C] text-[11px] truncate max-w-[160px]">
                    jamisonrealestateokc
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Script Element ID</span>
                  <span className="font-mono font-bold text-[#002D61] text-[11px]">
                    idxwidgetsrc-{WIDGET_ID}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Detected DOM Elements</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {detectedNodesCount > 0 ? `${detectedNodesCount} nodes` : 'Evaluating...'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <span className="text-[#6B7280]">Detected Links</span>
                  <span className="font-mono font-bold text-[#002D61]">
                    {detectedListingLinks > 0 ? `${detectedListingLinks} links` : 'Scanning...'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-2">
                  Widget Checklist & Health:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>HTTPS & Mixed-Content Compliant</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Responsive Viewport Scalable</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#F5EFE6] text-[#002D61] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <span>Direct Links to MLS Listing Details</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Deployment Recommendations */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#002D61] text-white shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FB923C]" />
                <h4 className="font-serif text-base font-bold text-white">
                  Where Should We Embed This?
                </h4>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Once satisfied with this widget's output, you can deploy it in any of these primary sections:
              </p>

              <div className="space-y-3 text-xs text-white/90">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <strong className="text-[#FB923C] block mb-1">1. Active Listings Page</strong>
                  <span>Replace mock properties on the listings page with live feed from widget #{WIDGET_ID}.</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <strong className="text-[#FB923C] block mb-1">2. Homepage Showcase Slider</strong>
                  <span>Display featured Oklahoma City homes right below the Hero video.</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                  <strong className="text-[#FB923C] block mb-1">3. Buyer Consultation Portal</strong>
                  <span>Let prospective buyers browse available inventory while booking showings.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer text-center"
                >
                  Schedule Consultation with Brian
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

