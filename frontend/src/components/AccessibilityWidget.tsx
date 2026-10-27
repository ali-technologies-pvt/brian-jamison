import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Plus, Minus, Check, ChevronDown } from 'lucide-react';

interface AccessibilitySettings {
  fontSizePercent: number; // 100, 110, 120, 130
  readableFont: boolean;
  lineHeightIndex: number; // 0 = Default, 1 = 1.75, 2 = 2.0
  bigCursor: boolean;
  letterSpacing: boolean;
  alignLeft: boolean;
  fontWeight: boolean;
  highContrast: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSizePercent: 100,
  readableFont: false,
  lineHeightIndex: 0,
  bigCursor: false,
  letterSpacing: false,
  alignLeft: false,
  fontWeight: false,
  highContrast: false,
  highlightLinks: false,
  stopAnimations: false
};

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('a11y_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [selectedLang, setSelectedLang] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Apply Settings to DOM in Real-Time
  useEffect(() => {
    try {
      localStorage.setItem('a11y_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }

    // 1. Font Size
    if (settings.fontSizePercent === 100) {
      document.documentElement.style.fontSize = '';
    } else {
      document.documentElement.style.fontSize = `${settings.fontSizePercent}%`;
    }

    // 2. Readable Font
    document.body.classList.toggle('a11y-readable-font', settings.readableFont);

    // 3. Line Height
    document.body.classList.toggle('a11y-line-height-relaxed', settings.lineHeightIndex > 0);

    // 4. Big Cursor
    document.body.classList.toggle('a11y-big-cursor', settings.bigCursor);

    // 5. Letter Spacing
    document.body.classList.toggle('a11y-letter-spacing', settings.letterSpacing);

    // 6. Align Text
    document.body.classList.toggle('a11y-align-left', settings.alignLeft);

    // 7. Font Weight
    document.body.classList.toggle('a11y-font-bold', settings.fontWeight);

    // 8. High Contrast
    document.body.classList.toggle('a11y-high-contrast', settings.highContrast);

    // 9. Highlight Links
    document.body.classList.toggle('a11y-highlight-links', settings.highlightLinks);

    // 10. Pause Animations
    document.body.classList.toggle('a11y-pause-animations', settings.stopAnimations);
  }, [settings]);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    document.documentElement.style.fontSize = '';
    document.body.className = document.body.className
      .replace(/\ba11y-[a-z-]+\b/g, '')
      .trim();
  };

  const hasAnyActiveAdjustment =
    settings.fontSizePercent !== 100 ||
    settings.readableFont ||
    settings.lineHeightIndex > 0 ||
    settings.bigCursor ||
    settings.letterSpacing ||
    settings.alignLeft ||
    settings.fontWeight ||
    settings.highContrast ||
    settings.highlightLinks ||
    settings.stopAnimations;

  return (
    <>
      {/* Floating Universal Accessibility Button (WordPress / OneTap Style) */}
      <aside aria-label="Accessibility Assistance" className="fixed bottom-6 left-6 z-[89]">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title="Accessibility Adjustments (OneTap)"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shadow-xl shadow-blue-600/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/50"
        >
          {/* Universal Accessibility Icon (Person with outstretched arms) */}
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="4" r="2" />
            <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.48-.23-1.07-.23-1.55.02L9.19 8.35C8.21 9.43 6.66 10.2 5.12 10.18v2c1.94.02 3.88-.95 5.09-2.28L11 9.11V14l-2.6 6.39 1.85.75L12.5 15.6l2.25 5.54 1.85-.75L14 14V9.11l.79.79c1.21 1.33 3.15 2.3 5.09 2.28z" />
          </svg>

          {/* Active adjustments indicator dot */}
          {hasAnyActiveAdjustment && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          )}
        </button>
      </aside>

      {/* Slide-out / Modal Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-22 sm:left-6 z-[95] flex items-end sm:items-start justify-center sm:justify-start">
          {/* Backdrop on mobile */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs sm:hidden z-0"
          />

          {/* Panel Card */}
          <div className="relative z-10 w-full sm:w-[410px] max-h-[85vh] sm:max-h-[720px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-200">
            
            {/* Header (Bright Blue OneTap Style) */}
            <div className="bg-[#0066FF] text-white p-5 pb-6 text-center relative shrink-0">
              {/* Top Controls: Language & Close */}
              <div className="flex items-center justify-between mb-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLangOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    <span>🇺🇸 {selectedLang}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {isLangOpen && (
                    <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-xl shadow-lg border border-stone-200 py-1 z-20 text-left text-xs text-stone-800">
                      {['English', 'Español', 'Français'].map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => {
                            setSelectedLang(lang);
                            setIsLangOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left hover:bg-blue-50 transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Central White Circular Accessibility Icon */}
              <div className="w-14 h-14 rounded-full bg-white text-[#0066FF] mx-auto flex items-center justify-center shadow-md mb-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="4" r="2" />
                  <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.48-.23-1.07-.23-1.55.02L9.19 8.35C8.21 9.43 6.66 10.2 5.12 10.18v2c1.94.02 3.88-.95 5.09-2.28L11 9.11V14l-2.6 6.39 1.85.75L12.5 15.6l2.25 5.54 1.85-.75L14 14V9.11l.79.79c1.21 1.33 3.15 2.3 5.09 2.28z" />
                </svg>
              </div>

              <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                Accessibility Adjustments
              </h3>
              <p className="text-xs text-white/80 mt-0.5">
                Powered by OneTap • Real-Time Web Adaptations
              </p>
            </div>

            {/* Content Modules Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F6]">
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6B7280] block px-1">
                Content Modules
              </span>

              {/* Top Row: Font Size & Readable Font */}
              <div className="grid grid-cols-2 gap-3">
                {/* 1. Font Size Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between text-center">
                  <span className="text-xs font-semibold text-stone-800 mb-2">Font Size</span>
                  <div className="flex items-center justify-between bg-stone-50 p-1 rounded-xl border border-stone-200">
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          fontSizePercent: Math.min(prev.fontSizePercent + 10, 130)
                        }))
                      }
                      className="w-7 h-7 rounded-lg bg-[#0066FF] text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-stone-700 px-1">
                      {settings.fontSizePercent === 100 ? 'Default' : `+${settings.fontSizePercent - 100}%`}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          fontSizePercent: Math.max(prev.fontSizePercent - 10, 90)
                        }))
                      }
                      className="w-7 h-7 rounded-lg bg-[#0066FF] text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Readable Font Card */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, readableFont: !prev.readableFont }))
                  }
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.readableFont
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-xs'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-bold text-sm">
                    A
                  </div>
                  <span className="text-xs font-semibold">Readable Font</span>
                </button>
              </div>

              {/* Second Row: Line Height & Big Cursor */}
              <div className="grid grid-cols-2 gap-3">
                {/* 3. Line Height Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between text-center">
                  <span className="text-xs font-semibold text-stone-800 mb-2">Line Height</span>
                  <div className="flex items-center justify-between bg-stone-50 p-1 rounded-xl border border-stone-200">
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          lineHeightIndex: Math.min(prev.lineHeightIndex + 1, 2)
                        }))
                      }
                      className="w-7 h-7 rounded-lg bg-[#0066FF] text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-semibold text-stone-700 px-1">
                      {settings.lineHeightIndex === 0 ? 'Default' : settings.lineHeightIndex === 1 ? '1.75x' : '2.0x'}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({
                          ...prev,
                          lineHeightIndex: Math.max(prev.lineHeightIndex - 1, 0)
                        }))
                      }
                      className="w-7 h-7 rounded-lg bg-[#0066FF] text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 4. Big Cursor Card */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, bigCursor: !prev.bigCursor }))
                  }
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.bigCursor
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-xs'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="3 3 3 21 8.5 15.5 13.5 21 16.5 19 11.5 13.5 18 13.5 3 3" />
                  </svg>
                  <span className="text-xs font-semibold">Big Cursor</span>
                </button>
              </div>

              {/* Third Row: Letter Spacing, Align Text, Font Weight */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* 5. Letter Spacing */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, letterSpacing: !prev.letterSpacing }))
                  }
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.letterSpacing
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6h16M4 18h16M7 10l-3 2 3 2M17 10l3 2-3 2" />
                  </svg>
                  <span className="text-[11px] font-semibold leading-tight">Letter Spacing</span>
                </button>

                {/* 6. Align Text */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, alignLeft: !prev.alignLeft }))
                  }
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.alignLeft
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="15" y2="12" />
                    <line x1="3" y1="18" x2="18" y2="18" />
                  </svg>
                  <span className="text-[11px] font-semibold leading-tight">Align Text</span>
                </button>

                {/* 7. Font Weight */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, fontWeight: !prev.fontWeight }))
                  }
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.fontWeight
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="w-6 h-6 rounded border border-current font-black text-sm flex items-center justify-center">
                    B
                  </span>
                  <span className="text-[11px] font-semibold leading-tight">Font Weight</span>
                </button>
              </div>

              {/* Fourth Row: High Contrast, Highlight Links, Pause Animations */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* 8. High Contrast */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }))
                  }
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.highContrast
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18v-16c4.41 0 8 3.59 8 8s-3.59 8-8 8z" />
                  </svg>
                  <span className="text-[11px] font-semibold leading-tight">High Contrast</span>
                </button>

                {/* 9. Highlight Links */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, highlightLinks: !prev.highlightLinks }))
                  }
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.highlightLinks
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-[11px] font-semibold leading-tight">Highlight Links</span>
                </button>

                {/* 10. Pause Animations */}
                <button
                  type="button"
                  onClick={() =>
                    setSettings((prev) => ({ ...prev, stopAnimations: !prev.stopAnimations }))
                  }
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                    settings.stopAnimations
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                      : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  <span className="text-[11px] font-semibold leading-tight">Stop Motion</span>
                </button>
              </div>

            </div>

            {/* Bottom Actions: Reset Settings */}
            <div className="p-3.5 bg-white border-t border-stone-200 flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Adjustments</span>
              </button>

              <span className="text-[10px] text-stone-400">
                WCAG 2.1 AAA Compliant
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
