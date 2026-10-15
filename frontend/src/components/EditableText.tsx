'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Loader2, Check } from 'lucide-react';
import { TextSelectionToolbar } from './admin/TextSelectionToolbar';

export interface EditableTextProps {
  contentKey: string;
  initialContent: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'button' | 'div' | 'a';
  className?: string;
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  initialContent,
  as = 'span',
  className = '',
  href,
  onClick,
  children,
}) => {
  const { isAdmin, isEditMode, contentMap, updateContent } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Floating text selection toolbar state
  const [selectionPosition, setSelectionPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [hasLink, setHasLink] = useState(false);
  const savedRangeRef = useRef<Range | null>(null);

  // Active content: prioritize database/cache value, fallback to initialContent
  const activeContent = contentMap[contentKey] ?? initialContent;

  // Sync DOM if activeContent changes externally
  useEffect(() => {
    if (elementRef.current && !isSaving) {
      if (elementRef.current.innerHTML !== activeContent) {
        elementRef.current.innerHTML = activeContent;
      }
    }
  }, [activeContent, isSaving]);

  // Standard semantic render if user is not admin or edit mode is OFF
  if (!isAdmin || !isEditMode) {
    const Tag = as;
    if (as === 'a') {
      return (
        <a
          href={href || '#'}
          onClick={onClick}
          className={className}
          dangerouslySetInnerHTML={{ __html: activeContent }}
        />
      );
    }
    if (as === 'button') {
      return (
        <button
          type="button"
          onClick={onClick}
          className={className}
          dangerouslySetInnerHTML={{ __html: activeContent }}
        />
      );
    }
    return <Tag className={className} onClick={onClick} dangerouslySetInnerHTML={{ __html: activeContent }} />;
  }

  // Admin In-line Edit Mode
  const handleBlur = async () => {
    if (!elementRef.current) return;
    const newContent = elementRef.current.innerHTML.trim();

    if (newContent !== activeContent) {
      setIsSaving(true);
      try {
        await updateContent(contentKey, newContent);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
      } catch (err) {
        console.error('Failed to save inline edit:', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (elementRef.current) {
        elementRef.current.innerHTML = activeContent;
        elementRef.current.blur();
        setSelectionPosition(null);
      }
    }
  };

  // Detect selection of words/letters to show floating linking/color toolbar
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.rangeCount > 0) {
      const text = selection.toString().trim();
      if (text.length > 0) {
        const range = selection.getRangeAt(0);
        savedRangeRef.current = range.cloneRange();
        const rect = range.getBoundingClientRect();
        setSelectedText(text);

        // Check if selected range is inside a link
        let node: Node | null = range.commonAncestorContainer;
        let isLinked = false;
        while (node && node !== elementRef.current) {
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

  // Restore saved selection
  const restoreSelection = () => {
    if (savedRangeRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
    }
  };

  // Apply internal/external link
  const handleApplyLink = async (url: string, isInternal: boolean) => {
    restoreSelection();
    if (savedRangeRef.current) {
      const link = document.createElement('a');
      link.href = url;
      link.className = 'underline decoration-[#EA580C] decoration-2 underline-offset-4 text-[#EA580C] hover:opacity-80 transition-opacity font-semibold';
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
      await handleBlur();
    }
  };

  // Apply color
  const handleApplyColor = async (color: string) => {
    restoreSelection();
    document.execCommand('styleWithCSS', false, 'true');
    document.execCommand('foreColor', false, color);
    setSelectionPosition(null);
    await handleBlur();
  };

  // Apply format (bold / italic)
  const handleApplyFormat = async (format: 'bold' | 'italic') => {
    restoreSelection();
    document.execCommand(format, false, undefined);
    setSelectionPosition(null);
    await handleBlur();
  };

  // Remove link
  const handleRemoveLink = async () => {
    restoreSelection();
    document.execCommand('unlink', false, undefined);
    setSelectionPosition(null);
    await handleBlur();
  };

  const Tag = (as === 'button' || as === 'a' ? 'span' : as) as React.ElementType;

  return (
    <span className="relative inline-block group/editable">
      <Tag
        ref={elementRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onMouseUp={handleMouseUp}
        dangerouslySetInnerHTML={{ __html: activeContent }}
        className={`${className} outline-2 outline-dashed outline-[#EA580C]/70 hover:outline-[#EA580C] focus:outline-[#EA580C] focus:bg-[#EA580C]/10 bg-[#EA580C]/5 transition-all rounded-sm px-0.5 cursor-text select-text`}
        title={`Click to edit text, letters, or select words for links · Key: ${contentKey}`}
      />

      {/* Floating Rich Formatting & Internal Linking Toolbar */}
      {selectionPosition && (
        <TextSelectionToolbar
          onApplyLink={handleApplyLink}
          onApplyColor={handleApplyColor}
          onApplyFormat={handleApplyFormat}
          onRemoveLink={handleRemoveLink}
          selectedText={selectedText}
          hasLink={hasLink}
          position={selectionPosition}
          onClose={() => setSelectionPosition(null)}
        />
      )}

      {/* Subtle saving spinner / indicator */}
      {(isSaving || justSaved) && (
        <span
          className={`absolute -top-3.5 right-0 z-30 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1 ${
            isSaving
              ? 'bg-[#002D61] text-white animate-pulse'
              : 'bg-emerald-600 text-white'
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-2.5 h-2.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="w-2.5 h-2.5" />
              <span>Saved ✓</span>
            </>
          )}
        </span>
      )}

      {/* Hover Key Tooltip */}
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity absolute -top-5 left-0 z-20 pointer-events-none bg-[#001D40] text-amber-300 text-[9px] font-mono px-1.5 py-0.5 rounded shadow whitespace-nowrap">
        ✎ {contentKey}
      </span>
    </span>
  );
};

export default EditableText;
