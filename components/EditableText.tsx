'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAdmin } from '../src/context/AdminContext';
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

  // Sync DOM if activeContent changes externally and not currently editing
  useEffect(() => {
    if (elementRef.current && !isSaving) {
      if (elementRef.current.innerText !== activeContent) {
        elementRef.current.innerText = activeContent;
      }
    }
  }, [activeContent, isSaving]);

  // If NOT admin OR Edit Mode is OFF: renders standard semantic HTML tag with initialContent
  if (!isAdmin || !isEditMode) {
    const Tag = as;
    return <Tag className={className}>{activeContent}</Tag>;
  }

  // If admin AND Edit Mode is ON:
  // Adds contentEditable and suppressContentEditableWarning.
  // Shows a dashed blue border on hover.
  // On onBlur, if text changed, sends POST request to /api/content/update.
  // Shows a subtle saving spinner/indicator.
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
        console.error('Failed to update content inline:', err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && elementRef.current) {
      elementRef.current.innerText = activeContent;
      elementRef.current.blur();
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

      {/* Hover Key Badge */}
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity absolute -top-5 left-0 z-20 pointer-events-none bg-[#001D40] text-amber-300 text-[9px] font-mono px-1.5 py-0.5 rounded shadow whitespace-nowrap">
        ✎ {contentKey}
      </span>
    </span>
  );
};

export default EditableText;
