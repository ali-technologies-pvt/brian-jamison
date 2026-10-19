import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Building,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

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
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded'>('loading');
  const directMountRef = useRef<HTMLDivElement>(null);

  const WIDGET_ID = '179291';
  const SCRIPT_URL = `https://jamisonrealestateokc.idxbroker.com/idx/widgets/${WIDGET_ID}`;

  // Mount the real IDX Prime Map Search script directly into full-width container
  useEffect(() => {
    const container = directMountRef.current;
    if (!container) return;

    container.innerHTML = '';

    // Remove any previously mounted instance
    const existingScript = document.getElementById(`idxwidgetsrc-${WIDGET_ID}`);
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    const existingMap = document.getElementById(`idx-prime-map-search-${WIDGET_ID}`);
    if (existingMap && existingMap.parentNode) {
      existingMap.parentNode.removeChild(existingMap);
    }

    const mountHost = document.createElement('div');
    mountHost.id = `idx-mount-${WIDGET_ID}`;
    mountHost.style.width = '100%';
    mountHost.style.height = '100%';
    container.appendChild(mountHost);

    const script = document.createElement('script');
    script.charset = 'UTF-8';
    script.type = 'text/javascript';
    script.id = `idxwidgetsrc-${WIDGET_ID}`;
    script.src = SCRIPT_URL;

    script.onload = () => {
      setWidgetStatus('loaded');
    };

    mountHost.appendChild(script);

    // Watch for custom element creation
    const checkTimer = setInterval(() => {
      const mapEl = document.getElementById(`idx-prime-map-search-${WIDGET_ID}`) ||
                    document.querySelector('idx-prime-map-search');
      if (mapEl) {
        setWidgetStatus('loaded');
        clearInterval(checkTimer);
      }
    }, 400);

    const safetyTimer = setTimeout(() => {
      clearInterval(checkTimer);
      setWidgetStatus('loaded');
    }, 8000);

    return () => {
      clearInterval(checkTimer);
      clearTimeout(safetyTimer);
    };
  }, [SCRIPT_URL, WIDGET_ID]);

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] pt-28 sm:pt-32 pb-24 selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Editorial Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="hover:text-[#EA580C] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigate('/listings')}
            className="hover:text-[#EA580C] transition-colors cursor-pointer"
          >
            Properties
          </button>
          <span>/</span>
          <span className="text-[#002D61] font-semibold">Oklahoma City Interactive Map Search</span>
        </nav>

        {/* Luxury Enterprise Hero Header */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#002D61] via-[#001D40] to-[#00142C] text-white shadow-2xl overflow-hidden mb-10 border border-white/10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FB923C] text-[11px] font-bold uppercase tracking-widest mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Verified MLS Real-Time Mapping & Inventory</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
              Explore Oklahoma City <span className="text-[#FB923C] italic font-normal">Interactive Map Search</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-3xl mb-8">
              Explore active luxury real estate, private estates, and premier subdivisions across Nichols Hills, Edmond, Gaillardia, Oak Tree, and Greater Oklahoma City. Use the interactive GIS map controls and polygon boundaries below to filter listings in real time.
            </p>

            {/* Enterprise Credentials Strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <Building className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Brokerage: <strong>Salt Real Estate / Brian Jamison</strong></span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Data Source: <strong>MLSOK Multiple Listing Service (Direct Feed)</strong></span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FB923C]" />
                <span>Status: <strong>Live MLS Sync Active</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Live IDX Map Portal Card */}
        <div className="w-full rounded-3xl bg-white border-2 border-[#EA580C]/25 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8 mb-12">
          {/* Scoped CSS for Full-Width Prime Map & Listing Rail */}
          <style>{`
            .idx-fullwidth-map-stage {
              width: 100% !important;
              height: 500px !important;
              min-height: 500px !important;
              position: relative !important;
              border-radius: 1.25rem !important;
              overflow: hidden !important;
              background-color: transparent !important;
              border: 1px solid #E5E0D8 !important;
            }
            idx-prime-map-search,
            #idx-prime-map-search-${WIDGET_ID},
            #idx-mount-${WIDGET_ID},
            #idx-prime-target-${WIDGET_ID} {
              display: block !important;
              width: 100% !important;
              height: 500px !important;
              min-height: 500px !important;
              position: relative !important;
            }
          `}</style>

          {/* Map Loading State */}
          {widgetStatus === 'loading' && (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border-3 border-[#EA580C] border-t-transparent animate-spin mb-4" />
              <h3 className="font-serif text-lg font-bold text-[#002D61] mb-1">
                Loading Interactive Oklahoma MLS Map...
              </h3>
              <p className="text-xs text-[#6B7280] max-w-sm">
                Fetching active listings, coordinates, and neighborhood boundaries.
              </p>
            </div>
          )}

          {/* Full Width Live Map Stage */}
          <div className="idx-fullwidth-map-stage">
            <div ref={directMountRef} id={`idx-prime-target-${WIDGET_ID}`} className="w-full h-[500px]" />
          </div>

          {/* Clean Compliance & Concierge Footer */}
          <div className="mt-6 pt-4 border-t border-[#EA580C]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#4B5563]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
              <span>
                Listing data verified from MLSOK. Information deemed reliable but not guaranteed.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="font-bold text-[#002D61] hover:text-[#EA580C] transition-colors cursor-pointer"
              >
                Schedule Private Showing →
              </button>
              <span>·</span>
              <a
                href="https://jamisonrealestateokc.idxbroker.com/idx/results/listings"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#EA580C] hover:text-[#C2410C] flex items-center gap-1 transition-colors"
              >
                <span>Full MLS Grid</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bespoke Concierge Callout */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#002D61] to-[#001D40] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#FB923C] block mb-1">
              Private Representation & Custom MLS Feeds
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Looking for Off-Market or Specific Subdivision Listings?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Brian Jamison provides bespoke private showings, off-market pocket listings, and customized MLS auto-notifications tailored to your target architectural style, acreage, and neighborhood criteria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
            >
              Request Private Tour
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-white/20 cursor-pointer"
            >
              Property Valuation
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
