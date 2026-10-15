import React, { useState, useEffect, useRef } from 'react';
import {
  Link2,
  Unlink,
  ExternalLink,
  Bold,
  Italic,
  Underline,
  Palette,
  Check,
  X,
  Sparkles,
  Highlighter
} from 'lucide-react';

interface TextSelectionToolbarProps {
  onApplyLink: (url: string, isInternal: boolean) => void;
  onApplyColor: (color: string) => void;
  onApplyFormat: (format: 'bold' | 'italic' | 'underline') => void;
  onApplyHighlight?: (color: string) => void;
  onRemoveLink: () => void;
  selectedText: string;
  hasLink: boolean;
  position: { top: number; left: number } | null;
  onClose: () => void;
}

const COLOR_PALETTE = [
  { name: 'Royal Navy', hex: '#002D61' },
  { name: 'Warm Orange', hex: '#EA580C' },
  { name: 'Amber Gold', hex: '#D97706' },
  { name: 'Deep Charcoal', hex: '#1B1D21' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Muted Slate', hex: '#6B7280' },
];

const HIGHLIGHT_PALETTE = [
  { name: 'Gold Tint', hex: 'rgba(217, 119, 6, 0.25)' },
  { name: 'Warm Linen', hex: '#F5EFE6' },
  { name: 'Navy Soft', hex: 'rgba(0, 45, 97, 0.18)' },
  { name: 'Coral Soft', hex: 'rgba(234, 88, 12, 0.18)' },
  { name: 'None / Clear', hex: 'transparent' },
];

const INTERNAL_PAGES = [
  { title: 'Home Page', path: '/' },
  { title: 'Home Selling Page', path: '/selling' },
  { title: 'Home Buying Page', path: '/buying' },
  { title: '6-Phase Seller Blueprint', path: '/seller-blueprint' },
  { title: 'About Brian Jamison', path: '/about' },
  { title: 'Services Hub', path: '/services' },
  { title: 'Community Hub', path: '/areas' },
  { title: 'Nichols Hills Enclave', path: '/areas/nichols-hills' },
  { title: 'Gaillardia Private Gated', path: '/areas/gaillardia' },
  { title: 'Oak Tree National Golf', path: '/areas/oak-tree' },
  { title: 'Crown Heights Historic', path: '/areas/crown-heights' },
  { title: 'Edmond Luxury Estates', path: '/areas/edmond' },
  { title: 'Sitemap & Architecture', path: '/sitemap' },
  { title: 'IDX Property Search', path: '/idx' },
];

export const TextSelectionToolbar: React.FC<TextSelectionToolbarProps> = ({
  onApplyLink,
  onApplyColor,
  onApplyFormat,
  onApplyHighlight,
  onRemoveLink,
  selectedText,
  hasLink,
  position,
  onClose,
}) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#002D61');
  const [urlInput, setUrlInput] = useState('');
  const [isInternal, setIsInternal] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!position) return null;

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      onApplyLink(urlInput.trim(), isInternal);
      setShowLinkInput(false);
      setUrlInput('');
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: `${Math.max(10, position.top - 58)}px`,
        left: `${Math.max(10, Math.min(window.innerWidth - 340, position.left))}px`,
        zIndex: 99999,
      }}
      className="animate-in fade-in zoom-in-95 duration-150 select-none shadow-2xl rounded-2xl bg-[#001D40] text-white border border-white/20 p-2 flex flex-col gap-2 backdrop-blur-xl"
    >
      <div className="flex items-center gap-1.5">
        {/* Bold */}
        <button
          type="button"
          onClick={() => onApplyFormat('bold')}
          className="p-1.5 rounded-lg hover:bg-white/15 text-stone-200 hover:text-white transition-colors cursor-pointer"
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => onApplyFormat('italic')}
          className="p-1.5 rounded-lg hover:bg-white/15 text-stone-200 hover:text-white transition-colors cursor-pointer"
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => onApplyFormat('underline')}
          className="p-1.5 rounded-lg hover:bg-white/15 text-stone-200 hover:text-white transition-colors cursor-pointer"
          title="Underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-4 bg-white/20" />

        {/* Text Color */}
        <button
          type="button"
          onClick={() => {
            setShowColorPicker(!showColorPicker);
            setShowHighlightPicker(false);
            setShowLinkInput(false);
          }}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
            showColorPicker ? 'bg-[#EA580C] text-white' : 'hover:bg-white/15 text-stone-200'
          }`}
          title="Text Color"
        >
          <Palette className="w-3.5 h-3.5" />
          <span className="text-[10px] font-semibold hidden sm:inline">Color</span>
        </button>

        {/* Highlight Background */}
        <button
          type="button"
          onClick={() => {
            setShowHighlightPicker(!showHighlightPicker);
            setShowColorPicker(false);
            setShowLinkInput(false);
          }}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
            showHighlightPicker ? 'bg-[#EA580C] text-white' : 'hover:bg-white/15 text-stone-200'
          }`}
          title="Text Highlight Background"
        >
          <Highlighter className="w-3.5 h-3.5" />
        </button>

        {/* Internal / External Link */}
        <button
          type="button"
          onClick={() => {
            setShowLinkInput(!showLinkInput);
            setShowColorPicker(false);
            setShowHighlightPicker(false);
          }}
          className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold px-2 cursor-pointer ${
            showLinkInput || hasLink ? 'bg-[#EA580C] text-white' : 'hover:bg-white/15 text-stone-200'
          }`}
          title="Add Internal or External Link"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span className="text-[10px]">Link</span>
        </button>

        {/* Remove link */}
        {hasLink && (
          <button
            type="button"
            onClick={onRemoveLink}
            className="p-1.5 rounded-lg hover:bg-red-500/30 text-red-300 hover:text-red-100 transition-colors cursor-pointer"
            title="Remove Link"
          >
            <Unlink className="w-3.5 h-3.5" />
          </button>
        )}

        <div className="w-px h-4 bg-white/20" />

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-stone-400 hover:text-white cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Text Color Picker Popover */}
      {showColorPicker && (
        <div className="p-2 bg-black/60 rounded-xl border border-white/15 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300">
            Select Text Color:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {COLOR_PALETTE.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => {
                  onApplyColor(c.hex);
                  setShowColorPicker(false);
                }}
                className="w-5 h-5 rounded-full border border-white/40 hover:scale-125 transition-transform cursor-pointer shadow"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <input
              type="color"
              value={customColor}
              onChange={(e) => {
                setCustomColor(e.target.value);
                onApplyColor(e.target.value);
              }}
              className="w-5 h-5 p-0 rounded-full border border-white/40 cursor-pointer"
              title="Custom Hex Color"
            />
          </div>
        </div>
      )}

      {/* Text Highlight Background Popover */}
      {showHighlightPicker && (
        <div className="p-2 bg-black/60 rounded-xl border border-white/15 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300">
            Text Highlight Background:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {HIGHLIGHT_PALETTE.map((h) => (
              <button
                key={h.name}
                type="button"
                onClick={() => {
                  if (onApplyHighlight) {
                    onApplyHighlight(h.hex);
                  }
                  setShowHighlightPicker(false);
                }}
                className="px-2 py-1 rounded text-[10px] font-semibold border border-white/20 text-white cursor-pointer hover:scale-105 transition-all"
                style={{ backgroundColor: h.hex === 'transparent' ? 'rgba(255,255,255,0.1)' : h.hex }}
              >
                {h.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Internal / External Linking Popover */}
      {showLinkInput && (
        <form onSubmit={handleLinkSubmit} className="p-2.5 bg-black/70 rounded-xl border border-white/15 flex flex-col gap-2 w-72">
          <div className="flex items-center justify-between text-[11px] font-semibold text-stone-300">
            <span>Link Selection</span>
            <div className="flex items-center gap-2 text-[10px]">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="linkType"
                  checked={isInternal}
                  onChange={() => setIsInternal(true)}
                  className="accent-[#EA580C]"
                />
                <span>Internal</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="linkType"
                  checked={!isInternal}
                  onChange={() => setIsInternal(false)}
                  className="accent-[#EA580C]"
                />
                <span>External</span>
              </label>
            </div>
          </div>

          {isInternal ? (
            <select
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-[#EA580C]"
            >
              <option value="" className="bg-[#001D40] text-stone-300">-- Choose Internal Page --</option>
              {INTERNAL_PAGES.map((p) => (
                <option key={p.path} value={p.path} className="bg-[#001D40] text-white">
                  {p.title} ({p.path})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="url"
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white focus:outline-none focus:border-[#EA580C]"
              autoFocus
            />
          )}

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[10px] text-stone-400 truncate max-w-[150px]">
              &quot;{selectedText}&quot;
            </span>
            <button
              type="submit"
              disabled={!urlInput}
              className="px-3 py-1 bg-[#EA580C] hover:bg-[#C2410C] disabled:opacity-40 text-white rounded-lg text-[11px] font-bold tracking-wide flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3 h-3" />
              <span>Apply Link</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TextSelectionToolbar;
