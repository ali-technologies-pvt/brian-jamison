'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Pencil,
  X,
  RotateCcw,
  Check,
  Type,
  Palette,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Link2,
  ExternalLink
} from 'lucide-react';
import { useAdmin, ElementStyleData } from '../../context/AdminContext';

export function getCleanImageKey(src: string): string {
  if (!src) return '';
  try {
    const pathOnly = src.split('?')[0].split('#')[0];
    const normalized = pathOnly.replace(/^https?:\/\/[^\/]+/, '');
    return normalized.toLowerCase().replace(/[^a-z0-9_-]/g, '_').slice(-60);
  } catch {
    return src.slice(-40).replace(/[^a-zA-Z0-9_-]/g, '_');
  }
}

export interface UniversalEditTarget {
  key: string;
  type: 'heading' | 'text' | 'button' | 'card' | 'section' | 'link' | 'image';
  tagName: string;
  label: string;
  initialContent: string;
  currentContent: string;
  currentHref?: string;
  currentImageSrc?: string;
  imageAlt?: string;
  styleKey?: string;
  elementRef?: HTMLElement | null;
  // Card detected fields:
  cardTitle?: string;
  cardDescription?: string;
  cardButtonText?: string;
  cardButtonHref?: string;
  cardImageSrc?: string;
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

const STOCK_REAL_ESTATE_IMAGES = [
  { label: 'Gaillardia Fairway Estate', url: '/media/properties/11500-gateshead.jpg' },
  { label: 'Heritage Hills Historic', url: '/media/properties/136-nw-18th-heritage-hills.jpeg' },
  { label: 'Modern Estate Pool & Lawn', url: '/media/gallery/modern-estate-pool-lawn.jpeg' },
  { label: 'Modern Staircase & Dining', url: '/media/gallery/modern-staircase-dining.jpeg' },
  { label: 'Sunset Window Terrace', url: '/media/gallery/sunset-window-terrace.jpeg' },
  { label: 'Infinity Pool Hills', url: '/media/gallery/infinity-pool-hills.jpeg' },
  { label: 'Aerial Grounds', url: '/media/gallery/aerial-estate-grounds.jpeg' },
  { label: 'Luxury Kitchen Marble', url: '/media/gallery/luxury-kitchen-marble.jpeg' },
];

export const UniversalElementEditModal: React.FC<UniversalElementEditModalProps> = ({
  isOpen,
  target,
  onClose,
  onSave,
}) => {
  const { updateContent, revertElement, updateElementStyle, getElementStyle, contentMap } = useAdmin();

  // Determine initial active tab based on target type
  const [activeTab, setActiveTab] = useState<'content' | 'image' | 'design'>('content');

  // Content state
  const [content, setContent] = useState('');
  const [href, setHref] = useState('');
  const [isExternal, setIsExternal] = useState(false);

  // Card sub-fields (if editing a structured card)
  const [cardTitle, setCardTitle] = useState('');
  const [cardDesc, setCardDesc] = useState('');
  const [cardBtnText, setCardBtnText] = useState('');
  const [cardBtnHref, setCardBtnHref] = useState('');

  // Image state
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Initialize modal state on target change
  useEffect(() => {
    if (target) {
      setContent(target.currentContent || target.initialContent || '');
      setHref(target.currentHref || '');
      setIsExternal(Boolean(target.currentHref?.startsWith('http')));

      setCardTitle(target.cardTitle || '');
      setCardDesc(target.cardDescription || '');
      setCardBtnText(target.cardButtonText || '');
      setCardBtnHref(target.cardButtonHref || '');

      // Resolve current image
      const resolvedImg =
        target.currentImageSrc ||
        target.cardImageSrc ||
        contentMap[`img_replace_${target.key}`] ||
        '';
      setImageSrc(resolvedImg);
      setImageAlt(target.imageAlt || target.label || '');

      // Default to Image tab if element is an image
      if (target.type === 'image') {
        setActiveTab('image');
      } else {
        setActiveTab('content');
      }

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
  }, [target, getElementStyle, contentMap]);

  if (!isOpen || !target) return null;

  // Optimized File upload reader: Resizes & compresses high-res files to high-quality lightweight web format
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const rawDataUrl = uploadEvent.target?.result as string;
      if (!rawDataUrl) return;

      const img = new Image();
      img.onload = () => {
        const maxWidth = 1600;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setImageSrc(compressedDataUrl);
        } else {
          setImageSrc(rawDataUrl);
        }
      };
      img.onerror = () => {
        setImageSrc(rawDataUrl);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalContent = content;

    // 1. If Image was modified or provided
    if (imageSrc) {
      let targetImg: HTMLImageElement | null = null;
      if (target.type === 'image' && target.elementRef) {
        targetImg = target.elementRef as HTMLImageElement;
      } else if (target.elementRef) {
        targetImg = target.elementRef.querySelector('img');
      }

      const originalSrc =
        targetImg?.getAttribute('data-original-src') ||
        targetImg?.getAttribute('src') ||
        targetImg?.src ||
        target.currentImageSrc ||
        target.cardImageSrc ||
        '';

      if (targetImg) {
        targetImg.src = imageSrc;
        targetImg.setAttribute('src', imageSrc);
        if (originalSrc && !targetImg.getAttribute('data-original-src')) {
          targetImg.setAttribute('data-original-src', originalSrc);
        }
        if (imageAlt) targetImg.setAttribute('alt', imageAlt);
      }

      // 1. Save directly to target key
      if (target.key) {
        const keyToSave = target.key.startsWith('img_') ? target.key : `img_replace_${target.key}`;
        await updateContent(keyToSave, imageSrc, `Image: ${target.label}`);
      }

      // 2. Save against clean image path key so it matches on any reload
      if (originalSrc) {
        const cleanKey = getCleanImageKey(originalSrc);
        await updateContent(`img_src_${cleanKey}`, imageSrc, `Photo: ${originalSrc.slice(-30)}`);
        await updateImageSeo(originalSrc, { newSrc: imageSrc, alt: imageAlt });
      }

      // 3. Save against parent container key if target element resides inside a card
      const parentContainer = targetImg?.closest<HTMLElement>('[data-container-key]');
      if (parentContainer) {
        const cKey = parentContainer.getAttribute('data-container-key');
        if (cKey && cKey !== target.key) {
          await updateContent(`img_replace_${cKey}`, imageSrc, `Card photo: ${cKey}`);
        }
      }
    }

    // 2. If Card structured edits were made
    if (target.type === 'card' && target.elementRef) {
      if (cardTitle) {
        const titleEl = target.elementRef.querySelector<HTMLElement>('h1, h2, h3, h4, h5, [class*="font-serif"], [class*="title"]');
        if (titleEl) {
          titleEl.innerHTML = cardTitle;
          const childKey = titleEl.getAttribute('data-cms-key');
          if (childKey) await updateContent(childKey, cardTitle);
        }
      }
      if (cardDesc) {
        const descEl = target.elementRef.querySelector<HTMLElement>('p');
        if (descEl) {
          descEl.innerHTML = cardDesc;
          const childKey = descEl.getAttribute('data-cms-key');
          if (childKey) await updateContent(childKey, cardDesc);
        }
      }
      if (cardBtnText || cardBtnHref) {
        const btnEl = target.elementRef.querySelector<HTMLElement>('a, button');
        if (btnEl) {
          if (cardBtnText) btnEl.innerHTML = cardBtnText;
          if (cardBtnHref && btnEl.tagName.toLowerCase() === 'a') {
            (btnEl as HTMLAnchorElement).href = cardBtnHref;
          }
        }
      }
      finalContent = target.elementRef.innerHTML;
    } else if (target.elementRef && target.type !== 'image') {
      target.elementRef.innerHTML = finalContent;
    }

    // 3. Apply link update if target is a link/button
    if ((target.type === 'link' || target.type === 'button') && target.elementRef) {
      if (href && target.elementRef.tagName.toLowerCase() === 'a') {
        (target.elementRef as HTMLAnchorElement).href = href;
        if (isExternal) {
          (target.elementRef as HTMLAnchorElement).target = '_blank';
          (target.elementRef as HTMLAnchorElement).rel = 'noopener noreferrer';
        } else {
          (target.elementRef as HTMLAnchorElement).removeAttribute('target');
        }
      }
    }

    // 4. Update Content in AdminContext
    await updateContent(target.key, finalContent, target.label);

    // 5. Apply style changes
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

    // 6. Direct DOM styling update
    if (target.elementRef) {
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
    }, 700);
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
    }, 900);
  };

  const hasImage = Boolean(imageSrc || target.type === 'image' || target.cardImageSrc || target.elementRef?.querySelector('img'));

  return (
    <div
      data-admin-ui="true"
      data-admin-toolbar="true"
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

          {/* Always Available Image Tab */}
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'image'
                ? 'bg-[#002D61] text-white shadow-md'
                : 'text-[#4B5563] hover:text-[#002D61] hover:bg-stone-200/60'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#FB923C]" />
            <span>Image / Photo {hasImage ? '✓' : ''}</span>
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
          {/* TAB 1: CONTENT & TEXT */}
          {activeTab === 'content' && (
            <div className="space-y-5">
              {/* Card Structured Fields */}
              {target.type === 'card' && (
                <div className="p-4 rounded-2xl bg-[#F5EFE6]/70 border border-[#E5A93C]/30 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#002D61] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Card Smart Fields</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1F2937] mb-1">
                      Card Title / Heading:
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

          {/* TAB 2: IMAGE & PHOTO CHANGER */}
          {activeTab === 'image' && (
            <div className="space-y-6">
              {/* Image Preview Box */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-2">
                  Image Preview:
                </label>
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={imageAlt || 'Selected image'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 text-stone-400">
                      <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">No image currently selected</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Image URL input */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-1.5">
                  Image URL / Path:
                </label>
                <input
                  type="text"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                  placeholder="e.g. /media/properties/11500-gateshead.jpg or https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white"
                />
              </div>

              {/* Upload Local Image from Computer */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-1.5">
                  Upload from Device:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-[#002D61] text-xs font-bold tracking-wide transition-all cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4 text-[#EA580C]" />
                  <span>Choose Image File...</span>
                </button>
              </div>

              {/* Real Estate Photography Library Presets */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-2">
                  Choose from Project Photography Library:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {STOCK_REAL_ESTATE_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setImageSrc(img.url)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all p-1 text-left cursor-pointer group ${
                        imageSrc === img.url
                          ? 'border-[#EA580C] ring-2 ring-[#EA580C]/40 bg-orange-50'
                          : 'border-stone-200 hover:border-stone-400 bg-white'
                      }`}
                    >
                      <div className="h-16 w-full rounded-lg overflow-hidden bg-stone-100 mb-1">
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="block text-[10px] font-bold text-stone-700 truncate">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alt Text input */}
              <div>
                <label className="block text-xs font-bold text-[#002D61] uppercase tracking-wider mb-1.5">
                  Image Alt Description (SEO):
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g. Gaillardia Golf Community Luxury Estate"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white"
                />
              </div>
            </div>
          )}

          {/* TAB 3: COLORS & STYLING */}
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
