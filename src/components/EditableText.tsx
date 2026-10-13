'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Loader2, Check } from 'lucide-react';

export interface EditableTextProps {
  contentKey: string;
  initialContent: string;
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  contentKey,
  initialContent,
  as = 'span',
  className = '',
}) => {
  const { isAdmin, isEditMode, contentMap, updateContent } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Active content: prioritize database/cache value, fallback to initialContent
  const activeContent = contentMap[contentKey] ?? initialContent;

  // Sync DOM if activeContent changes externally
  useEffect(() => {
    if (elementRef.current && !isSaving) {
      if (elementRef.current.innerText !== activeContent) {
        elementRef.current.innerText = activeContent;
      }
    }
  }, [activeContent, isSaving]);

  // Standard semantic render if user is not admin or edit mode is OFF
  if (!isAdmin || !isEditMode) {
    const Tag = as;
    return <Tag className={className}>{activeContent}</Tag>;
  }

  // Admin In-line Edit Mode
  const handleBlur = async () => {
    if (!elementRef.current) return;
    const newContent = elementRef.current.innerText.trim();

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
        elementRef.current.innerText = activeContent;
        elementRef.current.blur();
      }
    }
  };

  const Tag = as as React.ElementType;

  return (
    <span className="relative inline-block group/editable">
      <Tag
        ref={elementRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} outline-2 outline-dashed outline-blue-500/80 hover:outline-blue-600 focus:outline-blue-600 focus:bg-blue-500/10 bg-blue-500/5 transition-all rounded-sm px-1 -mx-1 cursor-text select-text`}
        title={`Click to edit · Key: ${contentKey}`}
      >
        {activeContent}
      </Tag>

      {/* Subtle saving spinner / indicator */}
      {(isSaving || justSaved) && (
        <span
          className={`absolute -top-3.5 right-0 z-30 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1 ${
            isSaving
              ? 'bg-blue-600 text-white animate-pulse'
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
