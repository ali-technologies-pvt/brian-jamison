'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAdmin, ElementStyleData } from '../../context/AdminContext';
import { TextSelectionToolbar } from './TextSelectionToolbar';
import { ImageSeoModal } from './ImageSeoModal';
import { StyleInspectorModal } from './StyleInspectorModal';
import { Loader2, Check, Sparkles, Palette } from 'lucide-react';

interface GlobalInlineEditorProps {
  currentPath: string;
}

// Generate stable deterministic key for any element based on position and initial content
function generateElementKey(el: HTMLElement, pathname: string): string {
  const explicitKey = el.getAttribute('data-cms-key');
  if (explicitKey) return explicitKey;

  const pathParts: string[] = [];
  let curr: HTMLElement | null = el;
  let depth = 0;
  while (curr && curr !== document.body && depth < 6) {
    const tag = curr.tagName.toLowerCase();
    const id = curr.id ? `#${curr.id}` : '';
    let siblingIndex = 0;
    let prev = curr.previousElementSibling;
    while (prev) {
      if (prev.tagName === curr.tagName) siblingIndex++;
      prev = prev.previousElementSibling;
    }
    pathParts.unshift(`${tag}${id}[${siblingIndex}]`);
    curr = curr.parentElement;
    depth++;
  }

  const initialText = (el.getAttribute('data-cms-initial') || el.innerText || '').trim().slice(0, 32);
  const rawIdentifier = `${pathname}::${pathParts.join('/')}::${initialText}`;

  let hash = 0;
  for (let i = 0; i < rawIdentifier.length; i++) {
    hash = (hash << 5) - hash + rawIdentifier.charCodeAt(i);
    hash |= 0;
  }
  return `cms_auto_${Math.abs(hash).toString(36)}`;
}

// Generate container key for cards and sections
function generateContainerKey(el: HTMLElement, pathname: string): string {
  if (el.id) return `container_${el.id}`;
  const tag = el.tagName.toLowerCase();
  const className = (el.className || '').toString().slice(0, 24).replace(/[^a-zA-Z0-9]/g, '_');
  const initialText = (el.innerText || '').trim().slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_');
  const raw = `${pathname}__${tag}__${className}__${initialText}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return `container_${Math.abs(hash).toString(36)}`;
}

// Check if element contains editable text
function isLeafTextElement(el: HTMLElement): boolean {
  if (
    el.closest('[data-admin-ui]') ||
    el.closest('[data-admin-toolbar]') ||
    el.closest('aside') ||
    el.closest('nav[data-admin]') ||
    el.closest('#admin-portal')
  ) {
    return false;
  }

  const tag = el.tagName.toLowerCase();
  if (['script', 'style', 'input', 'textarea', 'select', 'svg', 'path', 'video', 'source'].includes(tag)) {
    return false;
  }

  // Already wrapped in manual EditableText
  if (el.getAttribute('contenteditable') === 'true' && el.getAttribute('data-manual-editable')) {
    return false;
  }

  // Target any text-bearing tag
  const validTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'button', 'a', 'li', 'label',
    'strong', 'em', 'b', 'i', 'blockquote', 'small', 'dt', 'dd', 'td', 'th'
  ];

  if (!validTags.includes(tag)) {
    return false;
  }

  // Don't make layout wrappers directly editable if they contain structural containers
  const hasStructuralChildren = Array.from(el.children).some((child) => {
    const childTag = child.tagName.toLowerCase();
    return ['section', 'article', 'main', 'header', 'footer', 'nav', 'ul', 'ol', 'table'].includes(childTag);
  });

  if (hasStructuralChildren) {
    return false;
  }

  // Must contain some text
  return (el.innerText || '').trim().length > 0;
}

export const GlobalInlineEditor: React.FC<GlobalInlineEditorProps> = ({ currentPath }) => {
  const {
    isAdmin,
    isEditMode,
    contentMap,
    updateContent,
    getImageSeo,
    updateImageSeo,
    getElementStyle,
    updateElementStyle,
  } = useAdmin();

  // Floating text selection toolbar state
  const [selectionPosition, setSelectionPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [hasLink, setHasLink] = useState(false);
  const savedRangeRef = useRef<Range | null>(null);
  const activeEditingElementRef = useRef<HTMLElement | null>(null);

  // Image SEO & Styling modal state
  const [activeImageSrc, setActiveImageSrc] = useState<string | null>(null);
  const [activeImageAlt, setActiveImageAlt] = useState<string>('');

  // Container Style Inspector modal state
  const [activeContainerKey, setActiveContainerKey] = useState<string | null>(null);
  const [activeContainerLabel, setActiveContainerLabel] = useState<string>('');
  const [activeContainerInitialStyle, setActiveContainerInitialStyle] = useState<ElementStyleData>({});

  // Hovered container floating style button position
  const [hoveredContainerPill, setHoveredContainerPill] = useState<{
    key: string;
    label: string;
    top: number;
    left: number;
    initialStyle: ElementStyleData;
  } | null>(null);

  // Saving indicator badge state
  const [savingBadge, setSavingBadge] = useState<{
    key: string;
    status: 'saving' | 'saved';
    top: number;
    left: number;
  } | null>(null);

  // 1. Restore saved content, styles, and image attributes across DOM on mount or route change
  useEffect(() => {
    // 1.1 Restore Text Content
    const allCandidateElements = document.querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, h5, h6, p, span, button, a, li, label, strong, em, b, i, blockquote, small, dt, dd, td, th'
    );

    allCandidateElements.forEach((el) => {
      if (isLeafTextElement(el)) {
        if (!el.getAttribute('data-cms-initial')) {
          el.setAttribute('data-cms-initial', el.innerHTML);
        }
        const key = generateElementKey(el, currentPath);
        el.setAttribute('data-cms-key', key);

        if (contentMap[key]) {
          if (el.innerHTML !== contentMap[key]) {
            el.innerHTML = contentMap[key];
          }
        }
      }
    });

    // 1.2 Restore Image Elements & SEO Attributes
    const allImages = document.querySelectorAll<HTMLImageElement>('img');
    allImages.forEach((img) => {
      const src = img.getAttribute('data-original-src') || img.getAttribute('src');
      if (src) {
        if (!img.getAttribute('data-original-src')) {
          img.setAttribute('data-original-src', src);
        }

        const seo = getImageSeo(src);
        const replacementFromMap = contentMap[`img_replace_${encodeURIComponent(src).slice(0, 40)}`];
        const targetSrc = seo.newSrc || replacementFromMap;

        // Replacement source
        if (targetSrc && img.src !== targetSrc) {
          img.src = targetSrc;
          img.setAttribute('src', targetSrc);
        }

        // SEO tags
        if (seo.alt) img.setAttribute('alt', seo.alt);
        if (seo.title) img.setAttribute('title', seo.title);

        // Styling elements
        if (seo.opacity !== undefined) {
          img.style.opacity = String(seo.opacity / 100);
        }
        if (seo.borderRadius !== undefined) {
          img.style.borderRadius = `${seo.borderRadius}px`;
        }
        if (seo.borderWidth !== undefined && seo.borderWidth > 0) {
          img.style.borderWidth = `${seo.borderWidth}px`;
          img.style.borderColor = seo.borderColor || '#FFFFFF';
          img.style.borderStyle = 'solid';
        }
        if (seo.boxShadow && seo.boxShadow !== 'none') {
          img.style.boxShadow = seo.boxShadow;
        }
        if (seo.objectFit) {
          img.style.objectFit = seo.objectFit;
        }

        // Filters
        const filters: string[] = [];
        if (seo.brightness !== undefined && seo.brightness !== 100) filters.push(`brightness(${seo.brightness}%)`);
        if (seo.contrast !== undefined && seo.contrast !== 100) filters.push(`contrast(${seo.contrast}%)`);
        if (seo.saturation !== undefined && seo.saturation !== 100) filters.push(`saturate(${seo.saturation}%)`);
        if (seo.grayscale !== undefined && seo.grayscale > 0) filters.push(`grayscale(${seo.grayscale}%)`);
        if (seo.blur !== undefined && seo.blur > 0) filters.push(`blur(${seo.blur}px)`);

        if (filters.length > 0) {
          img.style.filter = filters.join(' ');
        }
      }
    });

    // 1.3 Restore Container & Section Styles from contentMap
    Object.keys(contentMap).forEach((key) => {
      if (key.startsWith('style_')) {
        const targetKey = key.replace('style_', '');
        try {
          const styleData: ElementStyleData = JSON.parse(contentMap[key]);
          const targetEl = document.querySelector<HTMLElement>(`[data-container-key="${targetKey}"]`);
          if (targetEl) {
            if (styleData.backgroundColor) targetEl.style.backgroundColor = styleData.backgroundColor;
            if (styleData.textColor) targetEl.style.color = styleData.textColor;
            if (styleData.borderRadius !== undefined) targetEl.style.borderRadius = `${styleData.borderRadius}px`;
            if (styleData.borderWidth !== undefined && styleData.borderWidth > 0) {
              targetEl.style.borderWidth = `${styleData.borderWidth}px`;
              targetEl.style.borderColor = styleData.borderColor || '#EA580C';
              targetEl.style.borderStyle = 'solid';
            }
            if (styleData.boxShadow && styleData.boxShadow !== 'none') {
              targetEl.style.boxShadow = styleData.boxShadow;
            }
            if (styleData.backgroundImage) {
              targetEl.style.backgroundImage = `url("${styleData.backgroundImage}")`;
              targetEl.style.backgroundSize = styleData.backgroundSize || 'cover';
              targetEl.style.backgroundPosition = styleData.backgroundPosition || 'center';
            }
          }
        } catch {}
      }
    });
  }, [currentPath, contentMap, getImageSeo]);

  // 2. Attach Interactive Inline Editing Listeners
  useEffect(() => {
    if (!isAdmin) return;

    const cleanupFns: (() => void)[] = [];

    // 2.1 Attach Text Element Editing
    const allCandidateElements = document.querySelectorAll<HTMLElement>(
      'h1, h2, h3, h4, h5, h6, p, span, button, a, li, label, strong, em, b, i, blockquote, small, dt, dd, td, th'
    );

    allCandidateElements.forEach((el) => {
      if (!isLeafTextElement(el)) return;

      if (isEditMode) {
        el.contentEditable = 'true';
        el.spellcheck = false;
        el.classList.add('cms-global-editable');

        const handleClick = (e: MouseEvent) => {
          if (el.tagName.toLowerCase() === 'a' || el.tagName.toLowerCase() === 'button') {
            e.preventDefault();
            e.stopPropagation();
            el.focus();
          }
        };

        const handleFocus = () => {
          activeEditingElementRef.current = el;
        };

        const handleBlur = async () => {
          activeEditingElementRef.current = null;
          const key = el.getAttribute('data-cms-key') || generateElementKey(el, currentPath);
          const currentHTML = el.innerHTML;
          const initialHTML = el.getAttribute('data-cms-initial') || '';

          if (currentHTML !== initialHTML && currentHTML !== contentMap[key]) {
            const rect = el.getBoundingClientRect();
            setSavingBadge({
              key,
              status: 'saving',
              top: Math.max(10, rect.top - 28),
              left: rect.left,
            });

            await updateContent(key, currentHTML);

            setSavingBadge({
              key,
              status: 'saved',
              top: Math.max(10, rect.top - 28),
              left: rect.left,
            });

            setTimeout(() => {
              setSavingBadge(null);
            }, 1800);
          }
        };

        const handleMouseUp = () => {
          const selection = window.getSelection();
          if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
            const text = selection.toString().trim();
            if (text.length > 0) {
              const range = selection.getRangeAt(0);
              savedRangeRef.current = range.cloneRange();
              const rect = range.getBoundingClientRect();
              setSelectedText(text);

              let node: Node | null = range.commonAncestorContainer;
              let isLinked = false;
              while (node && node !== el) {
                if (node.nodeName === 'A') {
                  isLinked = true;
                  break;
                }
                node = node.parentNode;
              }
              setHasLink(isLinked);

              setSelectionPosition({
                top: rect.top,
                left: rect.left + rect.width / 2,
              });
              return;
            }
          }
          setSelectionPosition(null);
        };

        el.addEventListener('click', handleClick);
        el.addEventListener('focus', handleFocus);
        el.addEventListener('blur', handleBlur);
        el.addEventListener('mouseup', handleMouseUp);

        cleanupFns.push(() => {
          el.removeEventListener('click', handleClick);
          el.removeEventListener('focus', handleFocus);
          el.removeEventListener('blur', handleBlur);
          el.removeEventListener('mouseup', handleMouseUp);
          el.contentEditable = 'false';
          el.classList.remove('cms-global-editable');
        });
      } else {
        el.contentEditable = 'false';
        el.classList.remove('cms-global-editable');
      }
    });

    // 2.2 Attach Image Click Customizer
    const allImages = document.querySelectorAll<HTMLImageElement>('img');
    allImages.forEach((img) => {
      if (img.closest('[data-admin-ui]') || img.closest('[data-admin-toolbar]')) return;

      if (isEditMode) {
        img.classList.add('cms-global-editable-img');

        const handleImageClick = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const originalSrc = img.getAttribute('data-original-src') || img.getAttribute('src') || '';
          const alt = img.getAttribute('alt') || '';
          setActiveImageSrc(originalSrc);
          setActiveImageAlt(alt);
        };

        img.addEventListener('click', handleImageClick);
        cleanupFns.push(() => {
          img.removeEventListener('click', handleImageClick);
          img.classList.remove('cms-global-editable-img');
        });
      } else {
        img.classList.remove('cms-global-editable-img');
      }
    });

    // 2.3 Attach Container & Card Hover Controls (for Sections, Cards, and Banners)
    if (isEditMode) {
      const containerElements = document.querySelectorAll<HTMLElement>(
        'section, div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="bg-[#"], div[class*="bg-white"], div[class*="bg-stone"]'
      );

      containerElements.forEach((container) => {
        if (
          container.closest('[data-admin-ui]') ||
          container.closest('[data-admin-toolbar]') ||
          container.tagName.toLowerCase() === 'nav' ||
          container.offsetHeight < 60 ||
          container.offsetWidth < 120
        ) {
          return;
        }

        const key = container.getAttribute('data-container-key') || generateContainerKey(container, currentPath);
        container.setAttribute('data-container-key', key);

        const handleMouseEnter = () => {
          const rect = container.getBoundingClientRect();
          const label = container.tagName.toLowerCase() === 'section'
            ? `Section (${container.id || 'Full Width'})`
            : 'Content Card / Container';

          const currentStyle = getElementStyle(key);
          setHoveredContainerPill({
            key,
            label,
            top: Math.max(10, rect.top + 10),
            left: Math.max(10, rect.right - 140),
            initialStyle: {
              backgroundColor: currentStyle.backgroundColor || window.getComputedStyle(container).backgroundColor,
              textColor: currentStyle.textColor || window.getComputedStyle(container).color,
              borderRadius: currentStyle.borderRadius,
              borderWidth: currentStyle.borderWidth,
              borderColor: currentStyle.borderColor,
              boxShadow: currentStyle.boxShadow,
              backgroundImage: currentStyle.backgroundImage,
              backgroundVideo: currentStyle.backgroundVideo,
              overlayColor: currentStyle.overlayColor,
              overlayOpacity: currentStyle.overlayOpacity,
            },
          });
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        cleanupFns.push(() => {
          container.removeEventListener('mouseenter', handleMouseEnter);
        });
      });
    } else {
      setHoveredContainerPill(null);
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [isAdmin, isEditMode, currentPath, contentMap, updateContent, getElementStyle]);

  // Restore selection helper
  const restoreSelection = () => {
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }
  };

  // Text selection actions
  const handleApplyLink = async (url: string, isInternal: boolean) => {
    restoreSelection();
    if (savedRangeRef.current) {
      const link = document.createElement('a');
      link.href = url;
      link.className =
        'underline decoration-[#EA580C] decoration-2 underline-offset-4 text-[#EA580C] hover:opacity-80 transition-opacity font-semibold';
      if (!isInternal) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      try {
        savedRangeRef.current.surroundContents(link);
      } catch {
        document.execCommand('createLink', false, url);
      }
      setSelectionPosition(null);

      if (activeEditingElementRef.current) {
        activeEditingElementRef.current.blur();
      }
    }
  };

  const handleApplyColor = async (color: string) => {
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('foreColor', false, color);
    setSelectionPosition(null);

    if (activeEditingElementRef.current) {
      activeEditingElementRef.current.blur();
    }
  };

  const handleApplyHighlight = async (color: string) => {
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('hiliteColor', false, color);
    setSelectionPosition(null);

    if (activeEditingElementRef.current) {
      activeEditingElementRef.current.blur();
    }
  };

  const handleApplyFormat = async (format: 'bold' | 'italic' | 'underline') => {
    restoreSelection();
    document.execCommand(format, false, undefined);
    setSelectionPosition(null);

    if (activeEditingElementRef.current) {
      activeEditingElementRef.current.blur();
    }
  };

  const handleRemoveLink = async () => {
    restoreSelection();
    document.execCommand('unlink', false, undefined);
    setSelectionPosition(null);

    if (activeEditingElementRef.current) {
      activeEditingElementRef.current.blur();
    }
  };

  return (
    <>
      {/* Styles for Visual Highlights */}
      <style>{`
        .cms-global-editable {
          outline: 1.5px dashed rgba(234, 88, 12, 0.5) !important;
          outline-offset: 3px !important;
          border-radius: 4px !important;
          transition: all 0.15s ease !important;
          cursor: text !important;
        }
        .cms-global-editable:hover {
          outline: 2px dashed #EA580C !important;
          background-color: rgba(234, 88, 12, 0.08) !important;
        }
        .cms-global-editable:focus {
          outline: 2.5px solid #EA580C !important;
          background-color: rgba(234, 88, 12, 0.12) !important;
        }
        .cms-global-editable-img {
          outline: 2px dashed #EA580C !important;
          outline-offset: 2px !important;
          cursor: pointer !important;
          transition: transform 0.2s ease, filter 0.2s ease !important;
        }
        .cms-global-editable-img:hover {
          outline: 3px solid #EA580C !important;
          filter: brightness(0.92) contrast(1.05) !important;
        }
      `}</style>

      {/* Floating Rich Formatting & Linking Toolbar */}
      {selectionPosition && isEditMode && (
        <TextSelectionToolbar
          onApplyLink={handleApplyLink}
          onApplyColor={handleApplyColor}
          onApplyHighlight={handleApplyHighlight}
          onApplyFormat={handleApplyFormat}
          onRemoveLink={handleRemoveLink}
          selectedText={selectedText}
          hasLink={hasLink}
          position={selectionPosition}
          onClose={() => setSelectionPosition(null)}
        />
      )}

      {/* Hovered Container / Card Style Quick Action Pill */}
      {hoveredContainerPill && isEditMode && (
        <div
          data-admin-ui="true"
          style={{
            position: 'fixed',
            top: `${hoveredContainerPill.top}px`,
            left: `${hoveredContainerPill.left}px`,
            zIndex: 9998,
          }}
          className="animate-in fade-in duration-150"
        >
          <button
            type="button"
            onClick={() => {
              setActiveContainerKey(hoveredContainerPill.key);
              setActiveContainerLabel(hoveredContainerPill.label);
              setActiveContainerInitialStyle(hoveredContainerPill.initialStyle);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#001D40] hover:bg-[#EA580C] text-white text-[11px] font-bold tracking-wide shadow-xl border border-white/40 cursor-pointer backdrop-blur-md transition-all hover:scale-105"
            title="Customize card background, text color, overlay, or background image"
          >
            <Palette className="w-3.5 h-3.5 text-[#FB923C]" />
            <span>🎨 Style & Colors</span>
          </button>
        </div>
      )}

      {/* Saving / Saved Floating Pill Indicator */}
      {savingBadge && (
        <div
          style={{
            position: 'fixed',
            top: `${savingBadge.top}px`,
            left: `${Math.max(10, savingBadge.left)}px`,
            zIndex: 99999,
          }}
          className={`animate-in fade-in slide-in-from-bottom-2 duration-150 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-tight shadow-xl flex items-center gap-1.5 ${
            savingBadge.status === 'saving'
              ? 'bg-[#002D61] text-white animate-pulse'
              : 'bg-emerald-600 text-white'
          }`}
        >
          {savingBadge.status === 'saving' ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Saving Change...</span>
            </>
          ) : (
            <>
              <Check className="w-3 h-3" />
              <span>Saved to Database ✓</span>
            </>
          )}
        </div>
      )}

      {/* Universal Image Customizer & SEO Modal */}
      {activeImageSrc && (
        <ImageSeoModal
          isOpen={Boolean(activeImageSrc)}
          imageSrc={activeImageSrc}
          initialAlt={activeImageAlt}
          onClose={() => setActiveImageSrc(null)}
          onApplyChanges={(newSrc, styles) => {
            const allImgs = document.querySelectorAll<HTMLImageElement>('img');
            allImgs.forEach((img) => {
              const orig = img.getAttribute('data-original-src') || img.getAttribute('src');
              if (
                orig === activeImageSrc ||
                img.src === activeImageSrc ||
                img.getAttribute('src') === activeImageSrc ||
                (activeImageSrc && img.src.includes(activeImageSrc))
              ) {
                img.src = newSrc;
                img.setAttribute('src', newSrc);
                img.setAttribute('data-original-src', activeImageSrc);
                if (styles.opacity !== undefined) img.style.opacity = String(styles.opacity);
                if (styles.borderRadius !== undefined) img.style.borderRadius = `${styles.borderRadius}px`;
                if (styles.filter) img.style.filter = styles.filter;
              }
            });
          }}
        />
      )}

      {/* Universal Card & Section Style Inspector Modal */}
      {activeContainerKey && (
        <StyleInspectorModal
          isOpen={Boolean(activeContainerKey)}
          elementKey={activeContainerKey}
          elementLabel={activeContainerLabel}
          initialStyle={activeContainerInitialStyle}
          onClose={() => setActiveContainerKey(null)}
          onApplyStyle={(style) => {
            const el = document.querySelector<HTMLElement>(`[data-container-key="${activeContainerKey}"]`);
            if (el) {
              if (style.backgroundColor) el.style.backgroundColor = style.backgroundColor;
              if (style.textColor) el.style.color = style.textColor;
              if (style.borderRadius !== undefined) el.style.borderRadius = `${style.borderRadius}px`;
              if (style.borderWidth !== undefined && style.borderWidth > 0) {
                el.style.borderWidth = `${style.borderWidth}px`;
                el.style.borderColor = style.borderColor || '#EA580C';
                el.style.borderStyle = 'solid';
              }
              if (style.boxShadow && style.boxShadow !== 'none') {
                el.style.boxShadow = style.boxShadow;
              }
              if (style.backgroundImage) {
                el.style.backgroundImage = `url("${style.backgroundImage}")`;
                el.style.backgroundSize = style.backgroundSize || 'cover';
                el.style.backgroundPosition = style.backgroundPosition || 'center';
              }
            }
          }}
        />
      )}
    </>
  );
};

export default GlobalInlineEditor;
