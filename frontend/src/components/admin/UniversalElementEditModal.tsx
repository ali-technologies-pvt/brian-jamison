'use client';

import React, { useState, useEffect } from 'react';
import {
  Pencil,
  X,
  RotateCcw,
  Check,
  Type,
  Palette,
  ExternalLink,
  Sparkles,
  Link2,
  Maximize2,
  Sliders
} from 'lucide-react';
import { useAdmin, ElementStyleData } from '../../context/AdminContext';

export interface UniversalEditTarget {
  key: string;
  type: 'heading' | 'text' | 'button' | 'card' | 'section' | 'link';
  tagName: string;
  label: string;
  initialContent: string;
  currentContent: string;
  currentHref?: string;
  styleKey?: string;
  elementRef?: HTMLElement | null;
  // Card detected fields:
  cardTitle?: string;
  cardDescription?: string;
  cardButtonText?: string;
  cardButtonHref?: string;
}

interface UniversalElementEditModalProps {
  isOpen: boolean;
  target: UniversalEditTarget | null;
  onClose: () => void;
  onSave?: (newContent: string, newStyle?: ElementStyleData) => void;
}

const COLOR_PRESETS = [
  { label: 'Royal Navy', value: '#002D61' },
  { label: 'Deep Midnight', value: '#001D40' },
  { label: 'Tuscan Sunset', value: '#EA580C' },
  { label: 'Warm Amber', value: '#D97706' },
  { label: 'Luxury Gold', value: '#E5A93C' },
  { label: 'Charcoal Text', value: '#1F2937' },
  { label: 'Muted Slate', value: '#4B5563' },
  { label: 'Pure White', value: '#FFFFFF' },
  { label: 'Linen Sand', value: '#F5EFE6' },
  { label: 'Alabaster Cream', value: '#FAF9F6' },
  { label: 'Transparent', value: 'transparent' },
];

export const UniversalElementEditModal: React.FC<UniversalElementEditModalProps> = ({
  isOpen,
  target,
  onClose,
  onSave,
}) => {
  const { updateContent, revertElement, updateElementStyle, getElementStyle } = useAdmin();

  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  // Content state
  const [content, setContent] = useState('');
  const [href, setHref] = useState('');
  const [isExternal, setIsExternal] = useState(false);

  // Card sub-fields (if editing a structured card)
  const [cardTitle, setCardTitle] = useState('');
  const [cardDesc, setCardDesc] = useState('');
  const [cardBtnText, setCardBtnText] = useState('');
  const [cardBtnHref, setCardBtnHref] = useState('');

  // Style state
  const [textColor, setTextColor] = useState('#1F2937');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [borderColor, setBorderColor] = useState('#E5E0D8');
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderRadius, setBorderRadius] = useState<number>(16);
  const [boxShadow, setBoxShadow] = useState<string>('none');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [fontWeight, setFontWeight] = useState<'normal' | 'semibold' | 'bold'>('normal');

  const [isSaved, setIsSaved] = useState(false);
  const [isReverted, setIsReverted] = useState(false);

  // Initialize modal whenever target changes
  useEffect(() => {
    if (target) {
      setContent(target.currentContent || target.initialContent || '');
      setHref(target.currentHref || '');
      setIsExternal(Boolean(target.currentHref?.startsWith('http')));

      setCardTitle(target.cardTitle || '');
      setCardDesc(target.cardDescription || '');
      setCardBtnText(target.cardButtonText || '');
      setCardBtnHref(target.cardButtonHref || '');

      // Load initial styles if styleKey exists or from element computed style
      if (target.styleKey) {
        const savedStyle = getElementStyle(target.styleKey);
        if (savedStyle.backgroundColor) setBackgroundColor(savedStyle.backgroundColor);
        if (savedStyle.textColor) setTextColor(savedStyle.textColor);
        if (savedStyle.borderColor) setBorderColor(savedStyle.borderColor);
        if (savedStyle.borderWidth !== undefined) setBorderWidth(savedStyle.borderWidth);
        if (savedStyle.borderRadius !== undefined) setBorderRadius(savedStyle.borderRadius);
        if (savedStyle.boxShadow) setBoxShadow(savedStyle.boxShadow);
      } else if (target.elementRef) {
        const computed = window.getComputedStyle(target.elementRef);
        setTextColor(computed.color || '#1F2937');
        setBackgroundColor(computed.backgroundColor || 'transparent');
        const radiusNum = parseInt(computed.borderRadius, 10);
        if (!isNaN(radiusNum)) setBorderRadius(radiusNum);
      }
    }
    setIsSaved(false);
    setIsReverted(false);
  }, [target, getElementStyle]);

  if (!isOpen || !target) return null;

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalContent = content;

    // If card structured edits were made
    if (target.type === 'card' && (cardTitle || cardDesc || cardBtnText)) {
      if (target.elementRef) {
        const titleEl = target.elementRef.querySelector('h2, h3, h4, h5, [class*="font-serif"], [class*="title"]');
        if (titleEl && cardTitle) {
          titleEl.innerHTML = cardTitle;
        }
        const descEl = target.elementRef.querySelector('p');
        if (descEl && cardDesc) {
          descEl.innerHTML = cardDesc;
        }
        const btnEl = target.elementRef.querySelector('a, button');
        if (btnEl) {
          if (cardBtnText) btnEl.innerHTML = cardBtnText;
          if (cardBtnHref && btnEl.tagName.toLowerCase() === 'a') {
            (btnEl as HTMLAnchorElement).href = cardBtnHref;
          }
        }
        finalContent = target.elementRef.innerHTML;
      }
    }

    // Apply link update if target is a link/button
    if ((target.type === 'link' || target.type === 'button') && target.elementRef) {
      if (href) {
        if (target.elementRef.tagName.toLowerCase() === 'a') {
          (target.elementRef as HTMLAnchorElement).href = href;
          if (isExternal) {
            (target.elementRef as HTMLAnchorElement).target = '_blank';
            (target.elementRef as HTMLAnchorElement).rel = 'noopener noreferrer';
          } else {
            (target.elementRef as HTMLAnchorElement).removeAttribute('target');
          }
        }
      }
    }

    // Update Content in AdminContext
    await updateContent(target.key, finalContent, target.label);

    // Apply styles
    const newStyle: ElementStyleData = {
      backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : undefined,
      textColor: textColor,
      borderColor: borderWidth > 0 ? borderColor : undefined,
      borderWidth: borderWidth,
      borderRadius: borderRadius,
      boxShadow: boxShadow !== 'none' ? boxShadow : undefined,
    };

    if (target.styleKey) {
      await updateElementStyle(target.styleKey, newStyle, `Style: ${target.label}`);
    }

    // Update DOM Element directly
    if (target.elementRef) {
      if (target.type !== 'card') {
        target.elementRef.innerHTML = finalContent;
      }
      if (textColor) target.elementRef.style.color = textColor;
      if (backgroundColor && backgroundColor !== 'transparent') {
        target.elementRef.style.backgroundColor = backgroundColor;
      }
      if (borderRadius !== undefined) {
        target.elementRef.style.borderRadius = `${borderRadius}px`;
      }
      if (borderWidth > 0) {
        target.elementRef.style.borderWidth = `${borderWidth}px`;
        target.elementRef.style.borderColor = borderColor;
        target.elementRef.style.borderStyle = 'solid';
      }
      if (boxShadow && boxShadow !== 'none') {
        target.elementRef.style.boxShadow = boxShadow;
      }
    }

    if (onSave) {
      onSave(finalContent, newStyle);
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  // Revert / Undo to original handler
  const handleRevertToOriginal = async () => {
    if (!target) return;
    const original = target.initialContent;

    setContent(original);
    await revertElement(target.key, original);

    if (target.elementRef) {
      target.elementRef.innerHTML = original;
      target.elementRef.style.backgroundColor = '';
      target.elementRef.style.color = '';
      target.elementRef.style.borderRadius = '';
      target.elementRef.style.border = '';
      target.elementRef.style.boxShadow = '';
    }

    setIsReverted(true);
    setTimeout(() => {
      setIsReverted(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      data-admin-ui="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cms-popup-modal relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-[#001D40] via-[#002D61] to-[#001D40] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EA580C] flex items-center justify-center text-white shadow-lg shadow-[#EA580C]/40">
              <Pencil className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white">
                  {target.label}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EA580C]/30 text-[#FB923C] border border-[#EA580C]/40 uppercase">
                  {target.type}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 font-sans mt-0.5">
                Key: <span className="font-mono text-amber-300">{target.key}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-[#FAF9F6] px-6 py-2 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#4B5563] hover:text-[#002D61] hover:bg-stone-200/60'
            }`}
          >
            <Type className="w-4 h-4 text-[#FB923C]" />
            <span>Content & Text</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('design')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'design'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#4B5563] hover:text-[#002D61] hover:bg-stone-200/60'
            }`}
          >
            <Palette className="w-4 h-4 text-[#FB923C]" />
            <span>Colors & Styling</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'content' && (
            <div className="space-y-5">
              {/* If it is a card container with sub-elements */}
              {target.type === 'card' && (
                <div className="p-4 rounded-2xl bg-[#F5EFE6]/70 border border-[#E5A93C]/30 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002D61] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Card Smart Fields</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1">
                      Card Heading / Title:
                    </label>
                    <input
                      type="text"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      placeholder="e.g. Turn Your Home Search Into a Winning Move"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white font-serif"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1">
                      Card Body / Description:
                    </label>
                    <textarea
                      rows={3}
                      value={cardDesc}
                      onChange={(e) => setCardDesc(e.target.value)}
                      placeholder="Card description text..."
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Button / Link Text:
                      </label>
                      <input
                        type="text"
                        value={cardBtnText}
                        onChange={(e) => setCardBtnText(e.target.value)}
                        placeholder="e.g. Explore Advisory →"
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1F2937] mb-1">
                        Button Link Destination:
                      </label>
                      <input
                        type="text"
                        value={cardBtnHref}
                        onChange={(e) => setCardBtnHref(e.target.value)}
                        placeholder="e.g. /services/home-buying"
                        className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* General HTML/Text editor for element */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Element Text / HTML:</span>
                  <span className="text-[11px] font-normal text-stone-500">Supports text & inline tags</span>
                </label>
                <textarea
                  rows={target.type === 'heading' ? 3 : 5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-stone-50/50 font-sans leading-relaxed text-[#1F2937]"
                />
              </div>

              {/* Link / URL Destination (if link or button) */}
              {(target.type === 'link' || target.type === 'button') && (
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002D61]">
                    <Link2 className="w-4 h-4 text-[#EA580C]" />
                    <span>Link & Navigation Target</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={href}
                      onChange={(e) => setHref(e.target.value)}
                      placeholder="e.g. /listings, tel:405-513-3039, or https://zillow.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isExternal}
                      onChange={(e) => setIsExternal(e.target.checked)}
                      className="rounded border-stone-300 text-[#EA580C] focus:ring-[#EA580C]"
                    />
                    <span>Open in new window / tab (target=&quot;_blank&quot;)</span>
                  </label>
                </div>
              )}

              {/* Real-time Preview */}
              <div>
                <span className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-2">
                  Live Preview:
                </span>
                <div
                  style={{
                    backgroundColor: backgroundColor !== 'transparent' ? backgroundColor : '#FAF9F6',
                    color: textColor,
                    borderRadius: `${borderRadius}px`,
                    borderColor: borderWidth > 0 ? borderColor : '#E5E0D8',
                    borderWidth: `${borderWidth}px`,
                    borderStyle: borderWidth > 0 ? 'solid' : 'none',
                    boxShadow: boxShadow,
                    textAlign: textAlign,
                    fontWeight: fontWeight === 'bold' ? 700 : fontWeight === 'semibold' ? 600 : 400,
                  }}
                  className="p-4 transition-all overflow-hidden"
                >
                  <div dangerouslySetInnerHTML={{ __html: content || '<em>Empty preview</em>' }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="space-y-6">
              {/* Text Color Section */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-2">
                  Text Color:
                </label>
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  {COLOR_PRESETS.slice(0, 8).map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setTextColor(preset.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        textColor === preset.value
                          ? 'border-[#EA580C] ring-2 ring-[#EA580C]/40 shadow-sm'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: preset.value }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor.startsWith('#') ? textColor : '#000000'}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-9 h-9 rounded-xl border border-stone-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#1F2937"
                    className="w-32 px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Background Color Section */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-2">
                  Background Color:
                </label>
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => setBackgroundColor(preset.value)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        backgroundColor === preset.value
                          ? 'border-[#EA580C] ring-2 ring-[#EA580C]/40 shadow-sm'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: preset.value === 'transparent' ? '#E5E7EB' : preset.value }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={backgroundColor.startsWith('#') ? backgroundColor : '#FFFFFF'}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-9 h-9 rounded-xl border border-stone-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="#FFFFFF or transparent"
                    className="w-40 px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Corner Radius & Border Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#002D61]">Corner Radius:</label>
                    <span className="text-xs font-mono text-stone-600">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={48}
                    step={2}
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full accent-[#EA580C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#002D61]">Border Width:</label>
                    <span className="text-xs font-mono text-stone-600">{borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={6}
                    step={1}
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="w-full accent-[#EA580C] cursor-pointer"
                  />
                </div>
              </div>

              {/* Shadow Elevation */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-2">
                  Shadow Elevation:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'None', val: 'none' },
                    { label: 'Subtle', val: '0 1px 3px 0 rgba(0,0,0,0.1)' },
                    { label: 'Elevated', val: '0 10px 25px -5px rgba(0,0,0,0.1)' },
                    { label: 'Luxury Glow', val: '0 20px 35px -10px rgba(234,88,12,0.25)' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setBoxShadow(s.val)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        boxShadow === s.val
                          ? 'bg-[#002D61] text-white border-[#002D61]'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Status Notifications */}
          {isSaved && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Changes Saved & Applied Live to Website!</span>
            </div>
          )}

          {isReverted && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <RotateCcw className="w-4 h-4 text-amber-600" />
              <span>Element Reverted to Original State!</span>
            </div>
          )}

          {/* Modal Bottom Actions */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Revert / Reverse Button */}
            <button
              type="button"
              onClick={handleRevertToOriginal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold tracking-wide transition-all cursor-pointer hover:text-amber-700"
              title="Reverse / Revert element back to its original unmodified version"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>Revert to Original</span>
            </button>

            <div className="w-full sm:w-auto flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide shadow-lg shadow-[#EA580C]/30 transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Check className="w-4 h-4" />
                <span>Save & Apply Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversalElementEditModal;
