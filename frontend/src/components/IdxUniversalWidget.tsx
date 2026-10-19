import React, { useState, useEffect, useRef } from 'react';
import { Building, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export type IdxWidgetType =
  | 'showcase' // 176753 (Featured), 176754 (Sold/Pending)
  | 'slideshow' // 176755 (Featured Slide Show)
  | 'map' // 176756, 20755, 15847
  | 'quicksearch' // 15844, 20754
  | 'leadform' // 20756
  | 'neighborhood'; // 179291 - 179836

interface IdxUniversalWidgetProps {
  widgetId: string;
  type?: IdxWidgetType;
  title?: string;
  subtitle?: string;
  badge?: string;
  minHeight?: string;
  className?: string;
  customScriptSrc?: string;
  variant?: 'card' | 'embedded' | 'minimal';
  showCompliance?: boolean;
}

export const IdxUniversalWidget: React.FC<IdxUniversalWidgetProps> = ({
  widgetId,
  type = 'showcase',
  title,
  subtitle,
  badge = 'Live MLSOK Syndication',
  minHeight,
  className = '',
  customScriptSrc,
  variant = 'card',
  showCompliance = true
}) => {
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded'>('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);

  // Compute script URL based on widget ID and type
  const getScriptUrl = (): string => {
    if (customScriptSrc) return customScriptSrc;

    // Specific endpoints provided by IDX Broker
    if (widgetId === '20756') {
      return `https://jamisonrealestateokc.idxbroker.com/idx/leadloginwidget.php?widgetid=${widgetId}`;
    }
    if (widgetId === '20755' || widgetId === '15847') {
      return `https://jamisonrealestateokc.idxbroker.com/idx/mapwidgetjs.php?widgetid=${widgetId}`;
    }
    if (widgetId === '15844' || widgetId === '20754') {
      return `https://jamisonrealestateokc.idxbroker.com/idx/quicksearchjs.php?widgetid=${widgetId}`;
    }

    // Default widgets endpoint (176753, 176754, 176755, 176756, 179291-179836)
    return `https://jamisonrealestateokc.idxbroker.com/idx/widgets/${widgetId}`;
  };

  const scriptUrl = getScriptUrl();

  // Mount the widget script into the container
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    setWidgetStatus('loading');
    container.innerHTML = '';

    // Remove any previous instance of this widget's script
    const existingScript = document.getElementById(`idxwidgetsrc-${widgetId}`);
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }

    // Remove any previously injected elements with matching IDs
    const existingElement =
      document.getElementById(`idx-prime-map-search-${widgetId}`) ||
      document.getElementById(`IDX-quicksearch-${widgetId}`) ||
      document.getElementById(`IDX-showcase-${widgetId}`) ||
      document.getElementById(`IDX-slideshow-${widgetId}`);
    if (existingElement && existingElement.parentNode) {
      existingElement.parentNode.removeChild(existingElement);
    }

    // Create wrapper host
    const mountHost = document.createElement('div');
    mountHost.id = `idx-mount-${widgetId}-${reloadKey}`;
    mountHost.className = `idx-mount-host idx-type-${type}`;
    mountHost.style.width = '100%';
    mountHost.style.minHeight = minHeight || (type === 'map' ? '520px' : type === 'quicksearch' ? '120px' : '380px');
    container.appendChild(mountHost);

    // Create script element
    const script = document.createElement('script');
    script.charset = 'UTF-8';
    script.type = 'text/javascript';
    script.id = `idxwidgetsrc-${widgetId}`;
    script.src = scriptUrl;

    script.onload = () => {
      setWidgetStatus('loaded');
    };

    mountHost.appendChild(script);

    // Polling observer to detect when IDX Broker injects HTML or custom elements
    let attempts = 0;
    const maxAttempts = 40; // ~12 seconds
    const checkInterval = setInterval(() => {
      attempts++;
      const hasContent =
        container.querySelector('idx-prime-map-search') ||
        container.querySelector('form') ||
        container.querySelector('table') ||
        container.querySelector('.IDX-showcaseTable') ||
        container.querySelector('.IDX-quicksearchForm') ||
        container.querySelector('.IDX-slide') ||
        container.querySelector('iframe') ||
        (mountHost.children.length > 1);

      if (hasContent) {
        setWidgetStatus('loaded');
        clearInterval(checkInterval);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        setWidgetStatus('loaded'); // fallback to loaded to prevent infinite spinner
      }
    }, 300);

    return () => {
      clearInterval(checkInterval);
    };
  }, [widgetId, scriptUrl, reloadKey, minHeight, type]);

  const defaultMinHeight =
    minHeight ||
    (type === 'map'
      ? '520px'
      : type === 'slideshow'
      ? '480px'
      : type === 'quicksearch'
      ? '140px'
      : '420px');

  return (
    <div className={`w-full ${className}`}>
      {/* Comprehensive Scoped CSS Overrides matching the Luxury Theme */}
      <style>{`
        /* Host container constraints */
        #idx-mount-${widgetId}-${reloadKey} {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        /* Prime Map and Custom Elements */
        #idx-prime-map-search-${widgetId},
        idx-prime-map-search {
          display: block !important;
          width: 100% !important;
          height: ${defaultMinHeight} !important;
          min-height: ${defaultMinHeight} !important;
          border-radius: 1rem !important;
          overflow: hidden !important;
        }

        /* IDX QuickSearch Styling */
        #IDX-quicksearch-${widgetId},
        .IDX-quicksearchForm {
          background-color: transparent !important;
          border: none !important;
          font-family: inherit !important;
          padding: 0 !important;
        }

        #IDX-quicksearch-${widgetId} form,
        .IDX-quicksearchForm form {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 1rem !important;
          align-items: flex-end !important;
        }

        #IDX-quicksearch-${widgetId} select,
        #IDX-quicksearch-${widgetId} input[type="text"],
        #IDX-quicksearch-${widgetId} input[type="number"],
        .IDX-quicksearchForm select,
        .IDX-quicksearchForm input {
          background-color: #FFFFFF !important;
          border: 1.5px solid #E5E0D8 !important;
          border-radius: 0.75rem !important;
          padding: 0.65rem 1rem !important;
          font-size: 0.875rem !important;
          color: #002D61 !important;
          outline: none !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
        }

        #IDX-quicksearch-${widgetId} select:focus,
        #IDX-quicksearch-${widgetId} input:focus,
        .IDX-quicksearchForm select:focus,
        .IDX-quicksearchForm input:focus {
          border-color: #EA580C !important;
          box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.15) !important;
        }

        #IDX-quicksearch-${widgetId} input[type="submit"],
        #IDX-quicksearch-${widgetId} button[type="submit"],
        .IDX-quicksearchForm input[type="submit"],
        .IDX-quicksearchForm button[type="submit"],
        #IDX-qsSubmitBtn-${widgetId} {
          background: #EA580C !important;
          color: #FFFFFF !important;
          font-family: inherit !important;
          font-weight: 700 !important;
          font-size: 0.875rem !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          border: none !important;
          border-radius: 9999px !important;
          padding: 0.75rem 2rem !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 4px 12px rgba(234, 88, 12, 0.25) !important;
        }

        #IDX-quicksearch-${widgetId} input[type="submit"]:hover,
        .IDX-quicksearchForm input[type="submit"]:hover {
          background: #C2410C !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 16px rgba(234, 88, 12, 0.35) !important;
        }

        /* Showcase & Slideshow Overrides */
        #IDX-showcase-${widgetId},
        #IDX-slideshow-${widgetId},
        .IDX-showcaseTable {
          width: 100% !important;
          border-collapse: separate !important;
          border-spacing: 1.5rem !important;
          font-family: inherit !important;
        }

        .IDX-showcaseCell,
        .IDX-slide {
          background: #FFFFFF !important;
          border: 1.5px solid #F0ECE4 !important;
          border-radius: 1.25rem !important;
          overflow: hidden !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 14px rgba(0, 45, 97, 0.06) !important;
        }

        .IDX-showcaseCell:hover {
          border-color: rgba(234, 88, 12, 0.4) !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 12px 24px rgba(0, 45, 97, 0.12) !important;
        }

        .IDX-showcasePrice {
          font-family: serif !important;
          font-size: 1.25rem !important;
          font-weight: 700 !important;
          color: #002D61 !important;
        }

        .IDX-showcaseAddress {
          font-size: 0.875rem !important;
          color: #4B5563 !important;
          font-weight: 500 !important;
        }

        /* Lead Login & Registration Form */
        #IDX-leadLogin-${widgetId},
        .IDX-leadLoginForm {
          background: #FFFFFF !important;
          border-radius: 1.25rem !important;
          padding: 2rem !important;
          border: 1.5px solid #E5E0D8 !important;
        }

        #IDX-leadLogin-${widgetId} input,
        .IDX-leadLoginForm input {
          width: 100% !important;
          background-color: #FAF9F6 !important;
          border: 1.5px solid #E5E0D8 !important;
          border-radius: 0.75rem !important;
          padding: 0.75rem 1rem !important;
          margin-bottom: 1rem !important;
          color: #002D61 !important;
        }

        #IDX-leadLogin-${widgetId} input[type="submit"],
        .IDX-leadLoginForm input[type="submit"] {
          background: #002D61 !important;
          color: #FFFFFF !important;
          border-radius: 9999px !important;
          padding: 0.85rem 2rem !important;
          font-weight: 700 !important;
          cursor: pointer !important;
        }
      `}</style>

      {/* Outer Container with Luxury Theme */}
      <div
        className={
          variant === 'card'
            ? 'w-full rounded-3xl bg-white border-2 border-[#EA580C]/25 shadow-xl overflow-hidden p-5 sm:p-7 lg:p-9 transition-all'
            : variant === 'embedded'
            ? 'w-full rounded-2xl bg-[#FAF9F6] border border-[#E5E0D8] p-5 sm:p-6'
            : 'w-full'
        }
      >
        {/* Header Ribbon (if title or badge provided) */}
        {(title || subtitle || badge) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-[#EA580C]/15">
            <div className="flex items-start sm:items-center gap-3">
              <span className="relative flex h-3 w-3 mt-1.5 sm:mt-0 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                {title && (
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#002D61] tracking-tight">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5 max-w-2xl">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              {badge && (
                <div className="flex items-center gap-1.5 text-xs text-[#002D61] bg-[#F4F1EB] px-3.5 py-1.5 rounded-full border border-[#E6E2DA] font-semibold">
                  <Building className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{badge}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setReloadKey((prev) => prev + 1)}
                title="Refresh MLS Feed"
                className="p-1.5 rounded-full text-[#6B7280] hover:text-[#EA580C] hover:bg-[#F4F1EB] transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {widgetStatus === 'loading' && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-full border-3 border-[#EA580C] border-t-transparent animate-spin mb-3" />
            <p className="font-serif text-base font-bold text-[#002D61] mb-1">
              Synchronizing Verified MLSOK Feed...
            </p>
            <p className="text-xs text-[#6B7280] max-w-md">
              Connecting directly to Jamison Real Estate's Oklahoma City MLS feed and verified property data.
            </p>
          </div>
        )}

        {/* Dynamic Script & Widget Mount Host */}
        <div
          ref={mountRef}
          className="w-full relative transition-opacity duration-300"
          style={{ minHeight: defaultMinHeight }}
        />

        {/* MLS Compliance Footer */}
        {showCompliance && (
          <div className="mt-6 pt-5 border-t border-[#EA580C]/15 flex flex-col md:flex-row md:items-center justify-between gap-3 text-[11px] text-[#6B7280]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
              <span>
                Verified live feed via MLSOK & IDX Broker. Information deemed reliable but not guaranteed.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium text-[#002D61]">Jamison Real Estate</span>
              <span>•</span>
              <span>Equal Housing Opportunity</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

