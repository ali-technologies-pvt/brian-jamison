import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  RotateCcw,
  Sun,
  Eye,
  Slash,
  Maximize2,
  Pause,
  Link,
  ChevronDown,
  ImageOff,
  MoveHorizontal,
  AlignLeft,
  MousePointer,
  Type
} from 'lucide-react';

interface AccessibilitySettings {
  // Content Modules
  fontSizePercent: number; // 90, 100 (Default), 110, 120, 130
  readableFont: boolean;
  lineHeightIndex: number; // 0 = Default, 1 = 1.75x, 2 = 2.0x
  bigCursor: boolean;
  letterSpacing: boolean;
  alignLeft: boolean;
  fontWeight: boolean;

  // Color Modules
  contrastMode: 'default' | 'light' | 'high' | 'monochrome';

  // Orientation Modules
  readingLine: boolean;
  readingMask: boolean;
  hideImages: boolean;
  highlightContent: boolean;
  stopAnimations: boolean;
  highlightLinks: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSizePercent: 100,
  readableFont: false,
  lineHeightIndex: 0,
  bigCursor: false,
  letterSpacing: false,
  alignLeft: false,
  fontWeight: false,
  contrastMode: 'default',
  readingLine: false,
  readingMask: false,
  hideImages: false,
  highlightContent: false,
  stopAnimations: false,
  highlightLinks: false
};

const SKIP_TARGETS = [
  { label: 'Header & Navigation', selector: 'header, nav, #navbar' },
  { label: 'Hero Video & Overview', selector: 'section:first-of-type, #hero-section' },
  { label: 'Direct MLSOK Search Feed', selector: '#quicksearch-section, form' },
  { label: '6-Phase Seller Blueprint', selector: '#process-section, #blueprint-section' },
  { label: 'Confidential Market Appraisal (CTA)', selector: '#valuation-section, form' },
  { label: 'Client Reviews & Google Ratings', selector: '#testimonials-section' },
  { label: 'Footer & Corporate Credentials', selector: 'footer' }
];

export const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('a11y_settings_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [mouseY, setMouseY] = useState(300);

  // Mouse tracker for Reading Line and Reading Mask
  useEffect(() => {
    if (!settings.readingLine && !settings.readingMask) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.readingLine, settings.readingMask]);

  // Apply Settings to DOM in Real-Time
  useEffect(() => {
    try {
      localStorage.setItem('a11y_settings_v2', JSON.stringify(settings));
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

    // 8. Contrast Modes
    document.body.classList.toggle('a11y-light-contrast', settings.contrastMode === 'light');
    document.body.classList.toggle('a11y-high-contrast', settings.contrastMode === 'high');
    document.body.classList.toggle('a11y-monochrome', settings.contrastMode === 'monochrome');

    // 9. Hide Images
    document.body.classList.toggle('a11y-hide-images', settings.hideImages);

    // 10. Highlight Content
    document.body.classList.toggle('a11y-highlight-content', settings.highlightContent);

    // 11. Stop Animations
    document.body.classList.toggle('a11y-pause-animations', settings.stopAnimations);

    // 12. Highlight Links
    document.body.classList.toggle('a11y-highlight-links', settings.highlightLinks);
  }, [settings]);

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    document.documentElement.style.fontSize = '';
    document.body.className = document.body.className
      .replace(/\ba11y-[a-z-]+\b/g, '')
      .trim();
  };

  const handleSkipTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      (el as HTMLElement).focus?.();
    }
    setIsOpen(false);
  };

  const hasAnyActiveAdjustment =
    settings.fontSizePercent !== 100 ||
    settings.readableFont ||
    settings.lineHeightIndex > 0 ||
    settings.bigCursor ||
    settings.letterSpacing ||
    settings.alignLeft ||
    settings.fontWeight ||
    settings.contrastMode !== 'default' ||
    settings.readingLine ||
    settings.readingMask ||
    settings.hideImages ||
    settings.highlightContent ||
    settings.stopAnimations ||
    settings.highlightLinks;

  return (
    <>
      {/* 1. Interactive Reading Line Guide */}
      {settings.readingLine && (
        <div
          style={{ top: `${mouseY}px` }}
          className="fixed left-0 right-0 h-1 bg-[#0066FF] shadow-lg shadow-blue-500/50 z-[9999] pointer-events-none transition-all duration-75"
        />
      )}

      {/* 2. Interactive Reading Mask Guide (Darkens above and below cursor focus slit) */}
      {settings.readingMask && (
        <>
          <div
            style={{ height: `${Math.max(0, mouseY - 65)}px` }}
            className="fixed top-0 left-0 right-0 bg-black/70 z-[9998] pointer-events-none transition-all duration-75"
          />
          <div
            style={{ top: `${mouseY + 65}px` }}
            className="fixed bottom-0 left-0 right-0 bg-black/70 z-[9998] pointer-events-none transition-all duration-75"
          />
        </>
      )}

      {/* 3. Floating Universal Accessibility Trigger Button (WordPress OneTap) */}
      <aside aria-label="Accessibility Assistance" className="fixed bottom-20 lg:bottom-6 left-4 lg:left-6 z-[89]">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title="Accessibility Adjustments (OneTap)"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shadow-xl shadow-blue-600/35 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400/50"
        >
          {/* Universal Accessibility Icon */}
          <svg className="w-8 h-8 text-white a11y-keep" viewBox="0 0 24 24" fill="currentColor">
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

      {/* 4. Complete OneTap Accessibility Drawer (Matching uploaded screenshot 1:1) */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-36 lg:bottom-22 sm:left-4 lg:left-6 z-[95] flex items-end sm:items-start justify-center sm:justify-start">
          {/* Mobile backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs sm:hidden z-0"
          />

          {/* Panel Card */}
          <div className="relative z-10 w-full sm:w-[410px] max-h-[90vh] sm:max-h-[750px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-200">
            
            {/* Blue Banner Header */}
            <div className="bg-[#0066FF] text-white p-5 pb-6 text-center relative shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20">
                  🇺🇸 English
                </span>
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
                <svg className="w-8 h-8 a11y-keep" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="4" r="2" />
                  <path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.48-.23-1.07-.23-1.55.02L9.19 8.35C8.21 9.43 6.66 10.2 5.12 10.18v2c1.94.02 3.88-.95 5.09-2.28L11 9.11V14l-2.6 6.39 1.85.75L12.5 15.6l2.25 5.54 1.85-.75L14 14V9.11l.79.79c1.21 1.33 3.15 2.3 5.09 2.28z" />
                </svg>
              </div>

              <h3 className="font-sans text-xl font-bold tracking-tight text-white">
                Accessibility Adjustments
              </h3>
              <p className="text-xs text-white/80 mt-0.5">
                Powered by OneTap • Hide Toolbar
              </p>
            </div>

            {/* Scrollable Modules Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
              
              {/* SECTION 1: Content Modules */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
                <h4 className="font-sans font-bold text-sm text-stone-900 mb-3 text-left">
                  Content Modules
                </h4>

                <div className="space-y-3">
                  {/* Row 1: Font Size (double) & Readable Font */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Font Size Card */}
                    <div className="col-span-2 p-3 rounded-xl bg-[#F8FAFC] border border-stone-200 flex flex-col justify-between text-center">
                      <span className="text-xs font-semibold text-stone-800 mb-2">Font Size</span>
                      <div className="flex items-center justify-between bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
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

                    {/* Readable Font */}
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, readableFont: !prev.readableFont }))
                      }
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        settings.readableFont
                          ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                          : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full border-2 border-current flex items-center justify-center font-bold text-xs">
                        A
                      </div>
                      <span className="text-[11px] font-semibold leading-tight">Readable Font</span>
                    </button>
                  </div>

                  {/* Row 2: Line Height (double) & Big Cursor */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Line Height Card */}
                    <div className="col-span-2 p-3 rounded-xl bg-[#F8FAFC] border border-stone-200 flex flex-col justify-between text-center">
                      <span className="text-xs font-semibold text-stone-800 mb-2">Line Height</span>
                      <div className="flex items-center justify-between bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
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

                    {/* Big Cursor */}
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, bigCursor: !prev.bigCursor }))
                      }
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        settings.bigCursor
                          ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                          : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <MousePointer className="w-6 h-6" />
                      <span className="text-[11px] font-semibold leading-tight">Big Cursor</span>
                    </button>
                  </div>

                  {/* Row 3: Letter Spacing, Align Text, Font Weight */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {/* Letter Spacing */}
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, letterSpacing: !prev.letterSpacing }))
                      }
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        settings.letterSpacing
                          ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                          : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <MoveHorizontal className="w-6 h-6" />
                      <span className="text-[11px] font-semibold leading-tight">Letter Spacing</span>
                    </button>

                    {/* Align Text */}
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, alignLeft: !prev.alignLeft }))
                      }
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        settings.alignLeft
                          ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                          : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <AlignLeft className="w-6 h-6" />
                      <span className="text-[11px] font-semibold leading-tight">Align Text</span>
                    </button>

                    {/* Font Weight */}
                    <button
                      type="button"
                      onClick={() =>
                        setSettings((prev) => ({ ...prev, fontWeight: !prev.fontWeight }))
                      }
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        settings.fontWeight
                          ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                          : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="w-6 h-6 rounded border-2 border-current font-black text-xs flex items-center justify-center">
                        B
                      </div>
                      <span className="text-[11px] font-semibold leading-tight">Font Weight</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Color Modules */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
                <h4 className="font-sans font-bold text-sm text-stone-900 mb-3 text-left">
                  Color Modules
                </h4>

                <div className="grid grid-cols-3 gap-2.5">
                  {/* Light Contrast */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        contrastMode: prev.contrastMode === 'light' ? 'default' : 'light'
                      }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.contrastMode === 'light'
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <Sun className="w-6 h-6" />
                    <span className="text-[11px] font-semibold leading-tight">Light Contrast</span>
                  </button>

                  {/* High Contrast */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        contrastMode: prev.contrastMode === 'high' ? 'default' : 'high'
                      }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.contrastMode === 'high'
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                      ◐
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">High Contrast</span>
                  </button>

                  {/* Monochrome */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        contrastMode: prev.contrastMode === 'monochrome' ? 'default' : 'monochrome'
                      }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.contrastMode === 'monochrome'
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-current overflow-hidden flex">
                      <span className="w-1/2 h-full bg-current"></span>
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">Monochrome</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: Orientation Modules */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
                <h4 className="font-sans font-bold text-sm text-stone-900 mb-3 text-left">
                  Orientation Modules
                </h4>

                <div className="grid grid-cols-3 gap-2.5">
                  {/* 1. Reading Line */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, readingLine: !prev.readingLine }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.readingLine
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 border-2 border-current border-dashed rounded flex items-center justify-center">
                      <span className="w-4 h-0.5 bg-current"></span>
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">Reading Line</span>
                  </button>

                  {/* 2. Reading Mask */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, readingMask: !prev.readingMask }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.readingMask
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <div className="w-6 h-6 border-2 border-current rounded flex flex-col justify-between p-0.5">
                      <span className="w-full h-1 bg-current rounded-xs"></span>
                      <span className="w-full h-1 bg-current rounded-xs"></span>
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">Reading Mask</span>
                  </button>

                  {/* 3. Hide Images */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({ ...prev, hideImages: !prev.hideImages }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.hideImages
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <ImageOff className="w-6 h-6" />
                    <span className="text-[11px] font-semibold leading-tight">Hide Images</span>
                  </button>

                  {/* 4. Highlight Content */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        highlightContent: !prev.highlightContent
                      }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.highlightContent
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <Maximize2 className="w-6 h-6" />
                    <span className="text-[11px] font-semibold leading-tight">Highlight Content</span>
                  </button>

                  {/* 5. Stop Animations */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        stopAnimations: !prev.stopAnimations
                      }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.stopAnimations
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <Slash className="w-6 h-6" />
                    <span className="text-[11px] font-semibold leading-tight">Stop Animations</span>
                  </button>

                  {/* 6. Highlight Links */}
                  <button
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        highlightLinks: !prev.highlightLinks
                      }))
                    }
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      settings.highlightLinks
                        ? 'bg-blue-50 border-[#0066FF] text-[#0066FF]'
                        : 'bg-[#F8FAFC] border-stone-200 text-stone-800 hover:border-stone-300'
                    }`}
                  >
                    <Link className="w-6 h-6" />
                    <span className="text-[11px] font-semibold leading-tight">Highlight Links</span>
                  </button>
                </div>
              </div>

              {/* SECTION 4: Skip To Content */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs text-left">
                <h4 className="font-sans font-bold text-sm text-stone-900 mb-2.5 text-left">
                  Skip To Content
                </h4>

                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value) handleSkipTo(e.target.value);
                      e.target.value = '';
                    }}
                    defaultValue=""
                    className="w-full px-3.5 py-2.5 bg-white border border-[#0066FF] rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer appearance-none pr-8"
                  >
                    <option value="" disabled>
                      Choose...
                    </option>
                    {SKIP_TARGETS.map((target, idx) => (
                      <option key={idx} value={target.selector}>
                        {target.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#0066FF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* SECTION 5: Reset Settings Full-Width Button (Blue) */}
            <div className="p-4 bg-white border-t border-stone-200 shrink-0">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Settings</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
