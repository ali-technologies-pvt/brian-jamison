'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAdmin, ElementStyleData } from '../../context/AdminContext';
import { TextSelectionToolbar } from './TextSelectionToolbar';
import { ImageSeoModal } from './ImageSeoModal';
import { StyleInspectorModal } from './StyleInspectorModal';
import { UniversalElementEditModal, UniversalEditTarget } from './UniversalElementEditModal';
import { Loader2, Check, Pencil, Sparkles, Palette } from 'lucide-react';

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

// Check if element is a valid candidate for inline text editing
function isLeafTextElement(el: HTMLElement): boolean {
  if (
    el.closest('[data-admin-ui]') ||
    el.closest('[data-admin-toolbar]') ||
    el.closest('aside') ||
    el.closest('nav[data-admin]') ||
    el.closest('#admin-portal') ||
    el.closest('.cms-popup-modal')
  ) {
    return false;
  }

  const tag = el.tagName.toLowerCase();
  if (['script', 'style', 'input', 'textarea', 'select', 'svg', 'path', 'video', 'source'].includes(tag)) {
    return false;
  }

  const validTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'button', 'a', 'li', 'label',
    'strong', 'em', 'b', 'i', 'blockquote', 'small', 'dt', 'dd', 'td', 'th'
  ];

  if (!validTags.includes(tag)) {
    return false;
  }

  const hasStructuralChildren = Array.from(el.children).some((child) => {
    const childTag = child.tagName.toLowerCase();
    return ['section', 'article', 'main', 'header', 'footer', 'nav', 'ul', 'ol', 'table'].includes(childTag);
  });

  if (hasStructuralChildren) {
    return false;
  }

  return (el.innerText || '').trim().length > 0;
}

// Helper to construct UniversalEditTarget for any candidate element or card
function buildEditTarget(el: HTMLElement, pathname: string, contentMap: Record<string, string>): UniversalEditTarget {
  const tag = el.tagName.toLowerCase();

  // Check if it is a card container or section
  const isSection = tag === 'section';
  const isCard =
    isSection ||
    el.matches('div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="bg-white"], div[class*="bg-[#"], div[class*="card"]');

  if (isCard && !['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'a'].includes(tag)) {
    const key = el.getAttribute('data-container-key') || generateContainerKey(el, pathname);
    el.setAttribute('data-container-key', key);

    const titleEl = el.querySelector<HTMLElement>('h1, h2, h3, h4, h5, [class*="font-serif"], [class*="title"]');
    const descEl = el.querySelector<HTMLElement>('p');
    const btnEl = el.querySelector<HTMLElement>('a, button');

    const label = isSection ? `Section (${el.id || 'Full Width'})` : 'Card Container';

    return {
      key,
      type: isSection ? 'section' : 'card',
      tagName: tag,
      label,
      initialContent: el.getAttribute('data-cms-initial') || el.innerHTML,
      currentContent: contentMap[key] || el.innerHTML,
      styleKey: key,
      elementRef: el,
      cardTitle: titleEl ? titleEl.innerText.trim() : undefined,
      cardDescription: descEl ? descEl.innerText.trim() : undefined,
      cardButtonText: btnEl ? btnEl.innerText.trim() : undefined,
      cardButtonHref: btnEl && btnEl.tagName.toLowerCase() === 'a' ? (btnEl as HTMLAnchorElement).getAttribute('href') || undefined : undefined,
    };
  }

  // It is a specific text/heading/button/link element
  const key = el.getAttribute('data-cms-key') || generateElementKey(el, pathname);
  el.setAttribute('data-cms-key', key);

  let type: UniversalEditTarget['type'] = 'text';
  let label = 'Text Element';

  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
    type = 'heading';
    label = `Heading (${tag.toUpperCase()})`;
  } else if (tag === 'button') {
    type = 'button';
    label = 'Button';
  } else if (tag === 'a') {
    type = 'link';
    label = 'Link / Button';
  } else if (tag === 'p') {
    type = 'text';
    label = 'Paragraph';
  }

  return {
    key,
    type,
    tagName: tag,
    label,
    initialContent: el.getAttribute('data-cms-initial') || el.innerHTML,
    currentContent: contentMap[key] || el.innerHTML,
    currentHref: tag === 'a' ? (el as HTMLAnchorElement).getAttribute('href') || '' : undefined,
    elementRef: el,
  };
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

  // Universal Element & Card Edit Modal State
  const [editModalTarget, setEditModalTarget] = useState<UniversalEditTarget | null>(null);

  // Floating Pen Icon Badge Position & Target
  const [hoveredPenBadge, setHoveredPenBadge] = useState<{
    top: number;
    left: number;
    target: UniversalEditTarget;
  } | null>(null);

  // Image SEO & Styling modal state
  const [activeImageSrc, setActiveImageSrc] = useState<string | null>(null);
  const [activeImageAlt, setActiveImageAlt] = useState<string>('');

  // Container Style Inspector modal state
  const [activeContainerKey, setActiveContainerKey] = useState<string | null>(null);
  const [activeContainerLabel, setActiveContainerLabel] = useState<string>('');
  const [activeContainerInitialStyle, setActiveContainerInitialStyle] = useState<ElementStyleData>({});

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

        if (targetSrc && img.src !== targetSrc) {
          img.src = targetSrc;
          img.setAttribute('src', targetSrc);
        }

        if (seo.alt) img.setAttribute('alt', seo.alt);
        if (seo.title) img.setAttribute('title', seo.title);

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

  // 2. GLOBAL CLICK INTERCEPTOR IN EDIT MODE:
  // Prevents navigation on cards and links when Edit Mode is ON!
  // Instead, opens the Edit Tool Popup for that element or card!
  useEffect(() => {
    if (!isAdmin || !isEditMode) return;

    const handleGlobalCaptureClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Allow admin toolbar, modals, floating buttons, and form inputs to work normally
      if (
        target.closest('[data-admin-ui]') ||
        target.closest('[data-admin-toolbar]') ||
        target.closest('.cms-popup-modal') ||
        target.closest('.cms-pen-badge') ||
        target.closest('#admin-portal') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        return;
      }

      // Check if click was on or inside any interactive element, card, or section
      const interactiveCandidate = target.closest(
        'a, button, [onclick], [role="button"], h1, h2, h3, h4, h5, h6, p, span, li, div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="card"], div[class*="cursor-pointer"], section'
      ) as HTMLElement | null;

      if (interactiveCandidate) {
        // PREVENT REDIRECTION & NAVIGATION
        e.preventDefault();
        e.stopPropagation();

        // If clicked on an image, open image SEO modal
        if (target.tagName.toLowerCase() === 'img') {
          const originalSrc = target.getAttribute('data-original-src') || target.getAttribute('src') || '';
          const alt = target.getAttribute('alt') || '';
          setActiveImageSrc(originalSrc);
          setActiveImageAlt(alt);
          return;
        }

        // Open the Universal Element / Card Edit Modal
        const editTarget = buildEditTarget(interactiveCandidate, currentPath, contentMap);
        setEditModalTarget(editTarget);
      }
    };

    // Capture phase listener catches the click BEFORE React onClick or native link navigation!
    window.addEventListener('click', handleGlobalCaptureClick, true);

    return () => {
      window.removeEventListener('click', handleGlobalCaptureClick, true);
    };
  }, [isAdmin, isEditMode, currentPath, contentMap]);

  // 3. FLOATING PEN (PENCIL) BADGE ON HOVER:
  // Shows a clear, sleek "✏️ Edit [Element]" badge on every heading, button, card, section
  useEffect(() => {
    if (!isAdmin || !isEditMode) {
      setHoveredPenBadge(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore mouse moves over Admin UI and modals
      if (
        target.closest('[data-admin-ui]') ||
        target.closest('[data-admin-toolbar]') ||
        target.closest('.cms-popup-modal') ||
        target.closest('.cms-pen-badge') ||
        target.closest('#admin-portal')
      ) {
        return;
      }

      // Find nearest editable candidate
      const candidate = target.closest(
        'h1, h2, h3, h4, h5, h6, p, button, a, div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="card"], section'
      ) as HTMLElement | null;

      if (!candidate || candidate.offsetHeight < 24) {
        setHoveredPenBadge(null);
        return;
      }

      const rect = candidate.getBoundingClientRect();
      const editTarget = buildEditTarget(candidate, currentPath, contentMap);

      // Position pen badge at top-right of candidate element
      const badgeTop = rect.top < 40 ? rect.bottom + 6 : rect.top - 28;
      const badgeLeft = Math.min(window.innerWidth - 180, Math.max(10, rect.right - 130));

      setHoveredPenBadge({
        top: badgeTop,
        left: badgeLeft,
        target: editTarget,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isAdmin, isEditMode, currentPath, contentMap]);

  return (
    <>
      {/* Styles for Visual Highlights in Edit Mode */}
      <style>{`
        .cms-global-editable {
          outline: 1.5px dashed rgba(234, 88, 12, 0.5) !important;
          outline-offset: 3px !important;
          border-radius: 4px !important;
          transition: all 0.15s ease !important;
          cursor: pointer !important;
        }
        .cms-global-editable:hover {
          outline: 2px dashed #EA580C !important;
          background-color: rgba(234, 88, 12, 0.08) !important;
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

      {/* FLOATING PEN (PENCIL) BADGE ON HOVER FOR EVERY ELEMENT / CARD */}
      {hoveredPenBadge && isEditMode && (
        <div
          data-admin-ui="true"
          className="cms-pen-badge fixed z-[9998] animate-in fade-in duration-100 pointer-events-auto"
          style={{
            top: `${hoveredPenBadge.top}px`,
            left: `${hoveredPenBadge.left}px`,
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setEditModalTarget(hoveredPenBadge.target);
              setHoveredPenBadge(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide shadow-xl border border-white/60 cursor-pointer backdrop-blur-md transition-all hover:scale-105"
            title={`Click to edit ${hoveredPenBadge.target.label}`}
          >
            <Pencil className="w-3.5 h-3.5 text-white" />
            <span>Edit {hoveredPenBadge.target.label}</span>
          </button>
        </div>
      )}

      {/* Universal Element & Card Edit Popup Modal */}
      {editModalTarget && (
        <UniversalElementEditModal
          isOpen={Boolean(editModalTarget)}
          target={editModalTarget}
          onClose={() => setEditModalTarget(null)}
          onSave={() => {
            setSavingBadge({
              key: editModalTarget.key,
              status: 'saved',
              top: 80,
              left: window.innerWidth / 2 - 80,
            });
            setTimeout(() => setSavingBadge(null), 2000);
          }}
        />
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

      {/* Saving / Saved Floating Pill Indicator */}
      {savingBadge && (
        <div
          data-admin-ui="true"
          style={{
            position: 'fixed',
            top: `${savingBadge.top}px`,
            left: `${Math.max(10, savingBadge.left)}px`,
            zIndex: 99999,
          }}
          className={`animate-in fade-in slide-in-from-bottom-2 duration-150 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-tight shadow-2xl flex items-center gap-2 ${
            savingBadge.status === 'saving'
              ? 'bg-[#002D61] text-white animate-pulse'
              : 'bg-emerald-600 text-white'
          }`}
        >
          {savingBadge.status === 'saving' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Change...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Saved to Database ✓</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GlobalInlineEditor;
