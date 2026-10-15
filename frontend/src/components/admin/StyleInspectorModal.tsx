import React, { useState } from 'react';
import {
  Palette,
  Check,
  X,
  Layers,
  Video,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { useAdmin, ElementStyleData } from '../../context/AdminContext';

interface StyleInspectorModalProps {
  isOpen: boolean;
  elementKey: string;
  elementLabel?: string;
  initialStyle?: ElementStyleData;
  onClose: () => void;
  onApplyStyle?: (style: ElementStyleData) => void;
}

const LUXURY_BG_PRESETS = [
  { label: 'Pure White', value: '#FFFFFF' },
  { label: 'Warm Linen', value: '#F5EFE6' },
  { label: 'Warm Cream', value: '#FAF9F6' },
  { label: 'Royal Navy', value: '#002D61' },
  { label: 'Midnight Navy', value: '#001D40' },
  { label: 'Charcoal', value: '#1B1D21' },
  { label: 'Amber Accent', value: '#D97706' },
  { label: 'Transparent', value: 'transparent' },
];

const STOCK_BG_IMAGES = [
  { name: 'Nichols Hills Estate', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80' },
  { name: 'Gaillardia Modern', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80' },
  { name: 'Interior Great Room', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80' },
  { name: 'Twilight Pool', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80' },
];

const STOCK_BG_VIDEOS = [
  { name: 'OKC Metro Luxury Estate (4K)', url: 'https://www.pexels.com/download/video/29383137/' },
  { name: 'Architectural Aerial Estate Tour', url: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-with-houses-and-gardens-41662-large.mp4' },
];

export const StyleInspectorModal: React.FC<StyleInspectorModalProps> = ({
  isOpen,
  elementKey,
  elementLabel = 'Card / Section Background',
  initialStyle = {},
  onClose,
  onApplyStyle,
}) => {
  const { getElementStyle, updateElementStyle } = useAdmin();
  const saved = getElementStyle(elementKey);

  const [activeTab, setActiveTab] = useState<'colors' | 'media' | 'border'>('colors');

  // Background Color & Overlays
  const [backgroundColor, setBackgroundColor] = useState<string>(saved.backgroundColor ?? initialStyle.backgroundColor ?? '#FAF9F6');
  const [overlayColor, setOverlayColor] = useState<string>(saved.overlayColor ?? initialStyle.overlayColor ?? '#001D40');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(saved.overlayOpacity ?? initialStyle.overlayOpacity ?? 50);

  // Background Media (Image or Video)
  const [backgroundImage, setBackgroundImage] = useState<string>(saved.backgroundImage ?? initialStyle.backgroundImage ?? '');
  const [backgroundVideo, setBackgroundVideo] = useState<string>(saved.backgroundVideo ?? initialStyle.backgroundVideo ?? '');
  const [videoPoster, setVideoPoster] = useState<string>(saved.videoPoster ?? initialStyle.videoPoster ?? '');

  // Card Corners & Borders
  const [borderRadius, setBorderRadius] = useState<number>(saved.borderRadius ?? initialStyle.borderRadius ?? 16);
  const [borderWidth, setBorderWidth] = useState<number>(saved.borderWidth ?? initialStyle.borderWidth ?? 0);
  const [borderColor, setBorderColor] = useState<string>(saved.borderColor ?? initialStyle.borderColor ?? '#EA580C');
  const [boxShadow, setBoxShadow] = useState<string>(saved.boxShadow ?? initialStyle.boxShadow ?? 'none');

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStyleData: ElementStyleData = {
      backgroundColor,
      overlayColor,
      overlayOpacity,
      backgroundImage: backgroundImage.trim() ? backgroundImage.trim() : undefined,
      backgroundVideo: backgroundVideo.trim() ? backgroundVideo.trim() : undefined,
      videoPoster: videoPoster.trim() ? videoPoster.trim() : undefined,
      borderRadius,
      borderWidth,
      borderColor,
      boxShadow,
    };

    await updateElementStyle(elementKey, newStyleData);

    if (onApplyStyle) {
      onApplyStyle(newStyleData);
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150 font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 p-5 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#002D61] via-[#EA580C] to-[#002D61]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#002D61] text-white flex items-center justify-center shadow-xs">
              <Palette className="w-4 h-4 text-[#EA580C]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#002D61] leading-tight">
                Background & Style Settings
              </h3>
              <span className="text-[11px] text-stone-500 font-sans block truncate max-w-[280px]">
                {elementLabel}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Simple 3 Clean Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-stone-200 my-3 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'colors'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-stone-500 hover:text-[#002D61]'
            }`}
          >
            1. Background Color & Overlay
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'media'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-stone-500 hover:text-[#002D61]'
            }`}
          >
            2. Background Image / Video
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('border')}
            className={`pb-2 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'border'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-stone-500 hover:text-[#002D61]'
            }`}
          >
            3. Card Corners & Border
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4 flex-1 overflow-y-auto pr-1">
          {/* TAB 1: BACKGROUND COLOR & OVERLAY */}
          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-2">
                  Card / Section Background Color
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2.5">
                  {LUXURY_BG_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setBackgroundColor(p.value)}
                      style={{ backgroundColor: p.value === 'transparent' ? '#F3F4F6' : p.value }}
                      className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                        backgroundColor === p.value
                          ? 'border-[#EA580C] ring-2 ring-orange-500/40 font-bold'
                          : 'border-stone-300 hover:scale-102'
                      } ${['#002D61', '#001D40', '#1B1D21'].includes(p.value) ? 'text-white' : 'text-stone-800'}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={backgroundColor === 'transparent' ? '#FFFFFF' : backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-8 h-8 p-0 border border-stone-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="e.g. #F5EFE6 or #002D61"
                    className="flex-1 p-2 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>

              {/* Overlay Tint & Opacity */}
              <div className="pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1.5">
                  <span>Overlay Color & Gradient Tint</span>
                  <span className="font-mono text-[#EA580C]">{overlayOpacity}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={overlayColor}
                    onChange={(e) => setOverlayColor(e.target.value)}
                    className="w-8 h-8 p-0 border border-stone-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={overlayOpacity}
                    onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                    className="flex-1 accent-[#EA580C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BACKGROUND IMAGE / VIDEO */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              {/* Background Image URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Background Photo URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={backgroundImage}
                    onChange={(e) => setBackgroundImage(e.target.value)}
                    placeholder="Paste image link from Unsplash, Pexels, or CDN..."
                    className="flex-1 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  />
                  {backgroundImage && (
                    <button
                      type="button"
                      onClick={() => setBackgroundImage('')}
                      className="px-2.5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {STOCK_BG_IMAGES.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setBackgroundImage(img.url)}
                      className={`p-1 rounded-lg border text-left flex items-center gap-2 cursor-pointer transition-all ${
                        backgroundImage === img.url
                          ? 'border-[#EA580C] bg-orange-50/50'
                          : 'border-stone-200 hover:border-[#EA580C]'
                      }`}
                    >
                      <img src={img.url} alt={img.name} className="w-10 h-7 object-cover rounded" />
                      <span className="text-[10px] font-semibold text-stone-700 truncate">{img.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Video URL */}
              <div className="pt-3 border-t border-stone-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Or Background Video URL (MP4 / WebM)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={backgroundVideo}
                    onChange={(e) => setBackgroundVideo(e.target.value)}
                    placeholder="https://.../video.mp4"
                    className="flex-1 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  />
                  {backgroundVideo && (
                    <button
                      type="button"
                      onClick={() => setBackgroundVideo('')}
                      className="px-2.5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-1.5 mt-2">
                  {STOCK_BG_VIDEOS.map((v) => (
                    <button
                      key={v.url}
                      type="button"
                      onClick={() => setBackgroundVideo(v.url)}
                      className={`w-full p-2 rounded-lg border text-left flex items-center justify-between cursor-pointer transition-all ${
                        backgroundVideo === v.url
                          ? 'border-[#EA580C] bg-orange-50/50 text-[#EA580C] font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xs">{v.name}</span>
                      <Video className="w-3.5 h-3.5 text-[#EA580C]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CARD CORNERS & BORDER */}
          {activeTab === 'border' && (
            <div className="space-y-4">
              {/* Corner Radius */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                  <span>Card Corner Rounding</span>
                  <span className="font-mono text-[#EA580C]">{borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full accent-[#EA580C]"
                />
              </div>

              {/* Border Width & Color */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                  <span>Border Outline</span>
                  <span className="font-mono text-[#EA580C]">{borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={borderWidth}
                  onChange={(e) => setBorderWidth(Number(e.target.value))}
                  className="w-full accent-[#EA580C] mb-2"
                />

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-600">Color:</span>
                  <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="w-7 h-7 p-0 border border-stone-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    className="flex-1 p-1.5 rounded bg-stone-50 border border-stone-200 text-xs font-mono text-[#002D61]"
                  />
                </div>
              </div>

              {/* Drop Shadow */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Elevation / Shadow
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'None', val: 'none' },
                    { label: 'Subtle', val: '0 4px 6px -1px rgba(0, 0, 0, 0.08)' },
                    { label: 'Medium', val: '0 10px 15px -3px rgba(0, 0, 0, 0.12)' },
                    { label: 'Deep', val: '0 20px 25px -5px rgba(0, 0, 0, 0.22)' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setBoxShadow(s.val)}
                      className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                        boxShadow === s.val
                          ? 'bg-[#002D61] text-white border-[#002D61]'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <span className="text-[11px] text-stone-400">
              Applies instantly to this card/section.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Apply Style</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StyleInspectorModal;
