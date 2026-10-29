'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useAdmin, ElementStyleData, ImageSeoData } from '../../context/AdminContext';
import { ImageSeoModal } from './ImageSeoModal';
import { StyleInspectorModal } from './StyleInspectorModal';
import { UniversalElementEditModal, UniversalEditTarget, getCleanImageKeys, getCleanImageKey } from './UniversalElementEditModal';
import { Loader2, Check, Pencil } from 'lucide-react';

interface GlobalInlineEditorProps {
  currentPath: string;
}

// Strict check to ensure Admin UI, Toolbar, and floating widgets NEVER trigger edit mode or pen badges
function isAdminOrExcludedUI(target: HTMLElement | null): boolean {
  if (!target) return true;
  return Boolean(
    target.closest('[data-admin-ui]') ||
    target.closest('[data-admin-toolbar]') ||
    target.closest('aside') ||
    target.closest('#sticky-call-btn') ||
    target.closest('.cms-pen-badge') ||
    target.closest('.cms-popup-modal') ||
    target.closest('#admin-portal') ||
    target.closest('nav[data-admin]') ||
    target.closest('.fixed.bottom-5') ||
    target.closest('.fixed.bottom-6')
  );
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

// Generate container key for cards and sections (stable across reloads)
function generateContainerKey(el: HTMLElement, pathname: string): string {
  if (el.getAttribute('data-container-key')) return el.getAttribute('data-container-key')!;
  if (el.id) return `container_${el.id}`;
  const tag = el.tagName.toLowerCase();
  const imgEl = el.querySelector('img');
  const imgSrc = imgEl ? (imgEl.getAttribute('data-original-src') || imgEl.getAttribute('src') || '') : '';
  const initialText = (el.getAttribute('data-cms-initial') || el.innerText || '').trim().slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
  const raw = `${pathname}__${tag}__${imgSrc}__${initialText}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = (hash << 5) - hash + raw.charCodeAt(i);
    hash |= 0;
  }
  return `container_${Math.abs(hash).toString(36)}`;
}

// Check if element contains leaf text
function isLeafTextElement(el: HTMLElement): boolean {
  if (isAdminOrExcludedUI(el)) return false;

  const tag = el.tagName.toLowerCase();
  if (['script', 'style', 'input', 'textarea', 'select', 'svg', 'path', 'video', 'source'].includes(tag)) {
    return false;
  }

  const validTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'button', 'a', 'li', 'label',
    'strong', 'em', 'b', 'i', 'blockquote', 'small', 'dt', 'dd', 'td', 'th'
  ];

  if (!validTags.includes(tag)) return false;

  const hasStructuralChildren = Array.from(el.children).some((child) => {
    const childTag = child.tagName.toLowerCase();
    return ['section', 'article', 'main', 'header', 'footer', 'nav', 'ul', 'ol', 'table'].includes(childTag);
  });

  if (hasStructuralChildren) return false;

  return (el.innerText || '').trim().length > 0;
}

// Helper to accurately resolve active image source with all contentMap keys
function resolveActiveImageSrc(
  imgEl: HTMLImageElement | null,
  containerKey: string | undefined,
  contentMap: Record<string, string>,
  getImageSeo: (src: string) => ImageSeoData
): string {
  if (!imgEl) return '';
  const rawSrc = imgEl.getAttribute('data-original-src') || imgEl.getAttribute('src') || imgEl.src || '';

  // 1. Container key replacement
  if (containerKey && contentMap[`img_replace_${containerKey}`]) {
    return contentMap[`img_replace_${containerKey}`];
  }

  // 2. Clean path/filename keys
  const keys = getCleanImageKeys(rawSrc);
  for (const k of keys) {
    if (contentMap[`img_src_${k}`]) return contentMap[`img_src_${k}`];
    if (contentMap[`img_replace_${k}`]) return contentMap[`img_replace_${k}`];
  }

  // 3. Direct encoded key
  const directKey = `img_replace_${encodeURIComponent(rawSrc).slice(0, 40)}`;
  if (contentMap[directKey]) return contentMap[directKey];

  // 4. SEO replacement
  const seo = getImageSeo(rawSrc);
  if (seo.newSrc) return seo.newSrc;

  // 5. Fallback to active DOM src or rawSrc
  return imgEl.src || rawSrc;
}

// Global Image Replacer: updates DOM and prevents React re-render wiping
export function applyImageReplacements(
  contentMap: Record<string, string>,
  getImageSeo: (src: string) => ImageSeoData
) {
  if (typeof document === 'undefined') return;

  const allImages = document.querySelectorAll<HTMLImageElement>('img');
  allImages.forEach((img) => {
    if (isAdminOrExcludedUI(img)) return;

    let originalSrc = img.getAttribute('data-original-src');
    if (!originalSrc) {
      originalSrc = img.getAttribute('src') || img.src;
      if (originalSrc) {
        img.setAttribute('data-original-src', originalSrc);
      }
    }
    if (!originalSrc) return;

    const parentContainer = img.closest<HTMLElement>('[data-container-key]');
    const parentKey = parentContainer?.getAttribute('data-container-key');

    let replacement: string | null = null;
    if (parentKey && contentMap[`img_replace_${parentKey}`]) {
      replacement = contentMap[`img_replace_${parentKey}`];
    }

    if (!replacement) {
      const keys = getCleanImageKeys(originalSrc);
      for (const k of keys) {
        if (contentMap[`img_src_${k}`]) {
          replacement = contentMap[`img_src_${k}`];
          break;
        }
        if (contentMap[`img_replace_${k}`]) {
          replacement = contentMap[`img_replace_${k}`];
          break;
        }
      }
    }

    if (!replacement) {
      const directKey = `img_replace_${encodeURIComponent(originalSrc).slice(0, 40)}`;
      if (contentMap[directKey]) {
        replacement = contentMap[directKey];
      }
    }

    const seo = getImageSeo(originalSrc);
    const targetSrc = seo.newSrc || replacement;

    if (targetSrc) {
      if (img.src !== targetSrc || img.getAttribute('src') !== targetSrc) {
        img.src = targetSrc;
        img.setAttribute('src', targetSrc);
      }
    }

    if (seo.alt && img.getAttribute('alt') !== seo.alt) {
      img.setAttribute('alt', seo.alt);
    }
    if (seo.title && img.getAttribute('title') !== seo.title) {
      img.setAttribute('title', seo.title);
    }

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
  });
}

// Build UniversalEditTarget for any clicked/hovered element
function buildEditTarget(
  el: HTMLElement,
  pathname: string,
  contentMap: Record<string, string>,
  getImageSeo: (src: string) => ImageSeoData
): UniversalEditTarget {
  const tag = el.tagName.toLowerCase();

  // 1. Image Element
  if (tag === 'img') {
    const img = el as HTMLImageElement;
    const rawSrc = img.getAttribute('data-original-src') || img.getAttribute('src') || img.src || '';
    const parentContainer = img.closest<HTMLElement>('[data-container-key]');
    const parentKey = parentContainer?.getAttribute('data-container-key');
    const key = `img_replace_${encodeURIComponent(rawSrc).slice(0, 40)}`;
    const currentSrc = resolveActiveImageSrc(img, parentKey, contentMap, getImageSeo);
    return {
      key,
      type: 'image',
      tagName: 'img',
      label: 'Photo / Image',
      initialContent: rawSrc,
      currentContent: currentSrc,
      currentImageSrc: currentSrc,
      cardImageSrc: currentSrc,
      imageAlt: img.getAttribute('alt') || '',
      elementRef: el,
    };
  }

  // 2. Card Container or Section
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
    const imgEl = el.querySelector<HTMLImageElement>('img');

    const label = isSection ? `Section (${el.id || 'Full Width'})` : 'Card Container';
    const activeCardImg = imgEl ? resolveActiveImageSrc(imgEl, key, contentMap, getImageSeo) : undefined;

    return {
      key,
      type: isSection ? 'section' : 'card',
      tagName: tag,
      label,
      initialContent: el.getAttribute('data-cms-initial') || el.innerHTML,
      currentContent: contentMap[key] || el.innerHTML,
      currentImageSrc: activeCardImg,
      cardImageSrc: activeCardImg,
      styleKey: key,
      elementRef: el,
      cardTitle: titleEl ? titleEl.innerText.trim() : undefined,
      cardDescription: descEl ? descEl.innerText.trim() : undefined,
      cardButtonText: btnEl ? btnEl.innerText.trim() : undefined,
      cardButtonHref: btnEl && btnEl.tagName.toLowerCase() === 'a' ? (btnEl as HTMLAnchorElement).getAttribute('href') || undefined : undefined,
    };
  }

  // 3. Text / Heading / Button / Link Element
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
    getImageSeo,
  } = useAdmin();

  const contentMapRef = useRef(contentMap);
  contentMapRef.current = contentMap;
  const getImageSeoRef = useRef(getImageSeo);
  getImageSeoRef.current = getImageSeo;

  // Continuous MutationObserver: protects all image replacements against React virtual DOM reconciliations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isApplying = false;

    const observer = new MutationObserver((mutations) => {
      if (isApplying) return;

      let shouldSync = false;
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'src') {
          const target = m.target as HTMLElement;
          if (target && target.tagName?.toLowerCase() === 'img' && !isAdminOrExcludedUI(target)) {
            shouldSync = true;
            break;
          }
        } else if (m.type === 'childList') {
          for (let i = 0; i < m.addedNodes.length; i++) {
            const node = m.addedNodes[i];
            if (node.nodeType === 1) {
              const el = node as HTMLElement;
              if (el.tagName?.toLowerCase() === 'img' || el.querySelector?.('img')) {
                shouldSync = true;
                break;
              }
            }
          }
          if (shouldSync) break;
        }
      }

      if (shouldSync) {
        isApplying = true;
        try {
          applyImageReplacements(contentMapRef.current, getImageSeoRef.current);
        } finally {
          isApplying = false;
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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

    // 1.2 Restore Container & Card Content across all cards and sections in DOM
    const allContainers = document.querySelectorAll<HTMLElement>(
      'div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="bg-white"], div[class*="card"], section'
    );
    allContainers.forEach((container) => {
      if (isAdminOrExcludedUI(container)) return;
      const key = container.getAttribute('data-container-key') || generateContainerKey(container, currentPath);
      container.setAttribute('data-container-key', key);

      const imgReplacement = contentMap[`img_replace_${key}`];
      if (imgReplacement) {
        const img = container.querySelector('img');
        if (img) {
          if (!img.getAttribute('data-original-src')) {
            img.setAttribute('data-original-src', img.getAttribute('src') || img.src);
          }
          if (img.src !== imgReplacement) {
            img.src = imgReplacement;
            img.setAttribute('src', imgReplacement);
          }
        }
      }
    });

    // 1.3 Restore Image Elements & SEO Attributes
    applyImageReplacements(contentMap, getImageSeo);

    // 1.4 Restore Container & Section Styles from contentMap
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
      if (isAdminOrExcludedUI(target)) {
        return;
      }

      // Check if click was on or inside any interactive element, image, card, or section
      const interactiveCandidate = target.closest(
        'img, a, button, [onclick], [role="button"], h1, h2, h3, h4, h5, h6, p, span, li, div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="card"], div[class*="cursor-pointer"], section'
      ) as HTMLElement | null;

      if (interactiveCandidate) {
        // PREVENT REDIRECTION & NAVIGATION
        e.preventDefault();
        e.stopPropagation();

        // Open the Universal Element / Card Edit Modal
        const editTarget = buildEditTarget(interactiveCandidate, currentPath, contentMap, getImageSeo);
        setEditModalTarget(editTarget);
      }
    };

    // Capture phase listener catches the click BEFORE React onClick or native link navigation!
    window.addEventListener('click', handleGlobalCaptureClick, true);

    return () => {
      window.removeEventListener('click', handleGlobalCaptureClick, true);
    };
  }, [isAdmin, isEditMode, currentPath, contentMap]);

  // 3. FLOATING PEN (PENCIL) BADGE ON HOVER (Optimized for 60-120fps Smooth Scrolling):
  // Shows a clear, sleek "✏️ Edit [Element]" badge on every heading, button, card, section
  const lastCandidateRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isAdmin || !isEditMode) {
      setHoveredPenBadge(null);
      lastCandidateRef.current = null;
      return;
    }

    let rafId: number | null = null;
    let isScrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      isScrolling = true;
      if (hoveredPenBadge) {
        setHoveredPenBadge(null);
      }
      lastCandidateRef.current = null;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isScrolling) return;

      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const target = e.target as HTMLElement | null;
        if (!target) return;

        // STRICTLY IGNORE Admin Toolbar, Call Button, and all Admin UI
        if (isAdminOrExcludedUI(target)) {
          if (lastCandidateRef.current) {
            setHoveredPenBadge(null);
            lastCandidateRef.current = null;
          }
          return;
        }

        // Find nearest editable candidate
        const candidate = target.closest(
          'img, h1, h2, h3, h4, h5, h6, p, button, a, div[class*="rounded-2xl"], div[class*="rounded-3xl"], div[class*="rounded-xl"], div[class*="card"], section'
        ) as HTMLElement | null;

        if (!candidate || candidate.offsetHeight < 20 || isAdminOrExcludedUI(candidate)) {
          if (lastCandidateRef.current) {
            setHoveredPenBadge(null);
            lastCandidateRef.current = null;
          }
          return;
        }

        // Avoid re-computing if candidate hasn't changed
        if (candidate === lastCandidateRef.current) {
          return;
        }

        lastCandidateRef.current = candidate;
        const rect = candidate.getBoundingClientRect();
        const editTarget = buildEditTarget(candidate, currentPath, contentMap, getImageSeo);

        // Position pen badge at top-right of candidate element
        const badgeTop = rect.top < 40 ? rect.bottom + 6 : rect.top - 28;
        const badgeLeft = Math.min(window.innerWidth - 180, Math.max(10, rect.right - 130));

        setHoveredPenBadge({
          top: badgeTop,
          left: badgeLeft,
          target: editTarget,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [isAdmin, isEditMode, currentPath, contentMap]);

  return (
    <>
      {/* FLOATING PEN (PENCIL) BADGE ON HOVER FOR EVERY ELEMENT / CARD */}
      {hoveredPenBadge && isEditMode && (
        <div
          data-admin-ui="true"
          data-admin-toolbar="true"
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
        />
      )}

      {/* Saving / Saved Floating Pill Indicator */}
      {savingBadge && (
        <div
          data-admin-ui="true"
          data-admin-toolbar="true"
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
