import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Check,
  X,
  Palette,
  Sliders,
  Sparkles,
  Link as LinkIcon,
  Layers,
  Crop,
  Sun,
  Eye,
  Maximize2
} from 'lucide-react';
import { useAdmin, ImageSeoData } from '../../context/AdminContext';

interface ImageSeoModalProps {
  isOpen: boolean;
  imageSrc: string;
  initialAlt?: string;
  onClose: () => void;
  onApplyChanges?: (newSrc: string, styles: { opacity?: number; borderRadius?: number; filter?: string }) => void;
}

const PRESET_STOCK_IMAGES = [
  { name: 'Heritage Hills Historic Estate', url: '/media/properties/136-nw-18th-heritage-hills.jpeg' },
  { name: 'Gaillardia Modern Architecture', url: '/media/properties/11500-gateshead.jpg' },
  { name: 'Grand Interior Great Room', url: '/media/gallery/modern-staircase-dining.jpeg' },
  { name: 'Architectural Kitchen & Dining', url: '/media/gallery/modern-kitchen.jpeg' },
  { name: 'Twilight Pool & Outdoor Living', url: '/media/gallery/modern-estate-pool-lawn.jpeg' },
  { name: 'Oklahoma Acreage & Grounds', url: '/media/properties/11616-estrella-arcadia.jpeg' },
];

const PRESET_BORDER_COLORS = [
  { label: 'Transparent', value: 'transparent' },
  { label: 'White', value: '#FFFFFF' },
  { label: 'Navy', value: '#002D61' },
  { label: 'Gold', value: '#D97706' },
  { label: 'Coral', value: '#EA580C' },
  { label: 'Black', value: '#1B1D21' },
];

const PRESET_SHADOWS = [
  { label: 'None', value: 'none' },
  { label: 'Subtle', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' },
  { label: 'Medium', value: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.2)' },
  { label: 'Luxury Deep', value: '0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.35)' },
  { label: 'Gold Glow', value: '0 0 25px rgba(217, 119, 6, 0.45)' },
];

export const ImageSeoModal: React.FC<ImageSeoModalProps> = ({
  isOpen,
  imageSrc,
  initialAlt = '',
  onClose,
  onApplyChanges,
}) => {
  const { getImageSeo, updateImageSeo, updateContent } = useAdmin();
  const existing = getImageSeo(imageSrc);

  const [activeTab, setActiveTab] = useState<'replace' | 'styles' | 'seo'>('replace');
  const [currentSrc, setCurrentSrc] = useState(existing.newSrc || imageSrc);
  const [alt, setAlt] = useState(existing.alt ?? initialAlt);
  const [title, setTitle] = useState(existing.title ?? '');
  const [caption, setCaption] = useState(existing.caption ?? '');

  // Image Element Styling States
  const [opacity, setOpacity] = useState<number>(existing.opacity ?? 100);
  const [borderRadius, setBorderRadius] = useState<number>(existing.borderRadius ?? 16);
  const [borderWidth, setBorderWidth] = useState<number>(existing.borderWidth ?? 0);
  const [borderColor, setBorderColor] = useState<string>(existing.borderColor ?? '#FFFFFF');
  const [boxShadow, setBoxShadow] = useState<string>(existing.boxShadow ?? 'none');

  // Filter States
  const [brightness, setBrightness] = useState<number>(existing.brightness ?? 100);
  const [contrast, setContrast] = useState<number>(existing.contrast ?? 100);
  const [saturation, setSaturation] = useState<number>(existing.saturation ?? 100);
  const [grayscale, setGrayscale] = useState<number>(existing.grayscale ?? 0);
  const [blur, setBlur] = useState<number>(existing.blur ?? 0);

  // Layout & Link
  const [objectFit, setObjectFit] = useState<'cover' | 'contain' | 'fill' | 'scale-down'>(existing.objectFit ?? 'cover');
  const [linkUrl, setLinkUrl] = useState<string>(existing.linkUrl ?? '');

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  // Build filter string
  const filterString = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) blur(${blur}px)`;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSeoData: ImageSeoData = {
      alt,
      title,
      caption,
      newSrc: currentSrc,
      opacity,
      borderRadius,
      borderWidth,
      borderColor,
      boxShadow,
      brightness,
      contrast,
      saturation,
      grayscale,
      blur,
      objectFit,
      linkUrl: linkUrl.trim() ? linkUrl.trim() : undefined,
    };

    await updateImageSeo(imageSrc, updatedSeoData);

    // Save image replacement in contentMap
    if (currentSrc) {
      await updateContent(`img_replace_${encodeURIComponent(imageSrc).slice(0, 40)}`, currentSrc);
    }

    // Save image style object in contentMap
    const styleKey = `img_style_${encodeURIComponent(imageSrc).slice(0, 40)}`;
    await updateContent(styleKey, JSON.stringify(updatedSeoData));

    if (onApplyChanges) {
      onApplyChanges(currentSrc, {
        opacity: opacity / 100,
        borderRadius,
        filter: filterString,
      });
    }

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E5E0D8] p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col justify-between">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#002D61] via-[#EA580C] to-[#002D61]" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#002D61] text-white flex items-center justify-center shadow-md">
              <ImageIcon className="w-5 h-5 text-[#EA580C]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#002D61] leading-none">
                Image Customizer & Element Styler
              </h3>
              <span className="text-[11px] text-stone-500 font-sans">
                Replace picture, adjust border/shadow/filters, and configure SEO
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 my-4 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab('replace')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'replace'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-stone-500 hover:text-[#002D61]'
            }`}
          >
            1. Replace Image
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('styles')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'styles'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-stone-500 hover:text-[#002D61]'
            }`}
          >
            2. Visual Elements & Filters
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`pb-2.5 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'seo'
                ? 'border-[#EA580C] text-[#EA580C]'
                : 'border-transparent text-stone-500 hover:text-[#002D61]'
            }`}
          >
            3. Google SEO & Link
          </button>
        </div>

        {/* Live Interactive Preview */}
        <div className="mb-4 p-3 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-900 flex items-center justify-center p-1">
            <img
              src={currentSrc}
              alt={alt}
              style={{
                opacity: opacity / 100,
                borderRadius: `${borderRadius / 3}px`,
                borderWidth: `${Math.min(borderWidth, 3)}px`,
                borderColor,
                borderStyle: borderWidth > 0 ? 'solid' : 'none',
                filter: filterString,
                objectFit,
                boxShadow: boxShadow !== 'none' ? boxShadow : undefined,
              }}
              className="w-full h-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#EA580C] block mb-0.5">
              Live Preview
            </span>
            <p className="text-xs text-stone-600 font-mono truncate">
              {currentSrc}
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-stone-500 mt-1 font-mono">
              <span>Op: {opacity}%</span>
              <span>· Radius: {borderRadius}px</span>
              <span>· Border: {borderWidth}px</span>
              <span>· Fit: {objectFit}</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-4 flex-1 overflow-y-auto pr-1">
          {/* TAB 1: REPLACE IMAGE */}
          {activeTab === 'replace' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Direct Image Source / URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="Paste image link from Unsplash, Pexels, CDN, or web..."
                  value={currentSrc}
                  onChange={(e) => setCurrentSrc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs font-mono text-[#002D61] focus:outline-none focus:border-[#EA580C] focus:bg-white transition-all"
                />
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-2">
                  Or Pick Curated Luxury Real Estate Asset:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PRESET_STOCK_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setCurrentSrc(preset.url)}
                      className={`group relative rounded-xl overflow-hidden border-2 text-left transition-all cursor-pointer ${
                        currentSrc === preset.url
                          ? 'border-[#EA580C] ring-2 ring-orange-500/30'
                          : 'border-stone-200 hover:border-[#EA580C]'
                      }`}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-16 object-cover" />
                      <span className="block p-1.5 text-[10px] font-semibold text-stone-700 bg-white truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL ELEMENTS & FILTERS */}
          {activeTab === 'styles' && (
            <div className="space-y-4 p-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opacity */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Opacity</span>
                    <span className="font-mono text-[#EA580C]">{opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                {/* Corner Radius */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Corner Rounding</span>
                    <span className="font-mono text-[#EA580C]">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                {/* Border Width */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Border Width</span>
                    <span className="font-mono text-[#EA580C]">{borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                {/* Border Color */}
                <div>
                  <span className="block text-xs font-bold text-[#002D61] mb-1">
                    Border Color
                  </span>
                  <div className="flex items-center gap-1.5">
                    {PRESET_BORDER_COLORS.map((bc) => (
                      <button
                        key={bc.value}
                        type="button"
                        onClick={() => setBorderColor(bc.value)}
                        style={{ backgroundColor: bc.value === 'transparent' ? '#F5F5F5' : bc.value }}
                        className={`w-6 h-6 rounded-full border border-stone-300 transition-transform ${
                          borderColor === bc.value ? 'scale-125 ring-2 ring-[#EA580C]' : 'hover:scale-110'
                        }`}
                        title={bc.label}
                      />
                    ))}
                    <input
                      type="color"
                      value={borderColor === 'transparent' ? '#FFFFFF' : borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      className="w-6 h-6 p-0 border border-stone-300 rounded-full cursor-pointer"
                      title="Custom Border Color"
                    />
                  </div>
                </div>

                {/* Brightness */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Brightness</span>
                    <span className="font-mono text-[#EA580C]">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                {/* Contrast */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Contrast</span>
                    <span className="font-mono text-[#EA580C]">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                {/* Saturation */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Color Saturation</span>
                    <span className="font-mono text-[#EA580C]">{saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                {/* Grayscale */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#002D61] mb-1">
                    <span>Black & White (Grayscale)</span>
                    <span className="font-mono text-[#EA580C]">{grayscale}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={grayscale}
                    onChange={(e) => setGrayscale(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>
              </div>

              {/* Shadow preset selection */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Drop Shadow & Glow Effect
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PRESET_SHADOWS.map((ps) => (
                    <button
                      key={ps.label}
                      type="button"
                      onClick={() => setBoxShadow(ps.value)}
                      className={`p-2 text-xs font-semibold rounded-xl border text-center cursor-pointer transition-colors ${
                        boxShadow === ps.value
                          ? 'bg-[#002D61] text-white border-[#002D61]'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {ps.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Object Fit */}
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Object Fit Scale
                </span>
                <div className="flex items-center gap-2">
                  {(['cover', 'contain', 'fill', 'scale-down'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setObjectFit(fit)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border capitalize cursor-pointer transition-colors ${
                        objectFit === fit
                          ? 'bg-[#002D61] text-white border-[#002D61]'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SEO, ALT & LINK */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Google Image Search Alt Text (Alternative Text)
                </label>
                <textarea
                  rows={2}
                  required
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="e.g. Nichols Hills luxury estate with modern pool and architectural lighting"
                  className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Image Title Attribute
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Nichols Hills Luxury Real Estate by Brian Jamison"
                  className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Photo Caption
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Optional caption displayed below image..."
                  className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                  Optional Click-Through Link URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="p-3 bg-stone-100 rounded-xl text-stone-500">
                    <LinkIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="e.g. /services/selling or https://..."
                    className="flex-1 p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs font-mono text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between">
            <span className="text-[11px] text-stone-400">
              Changes apply instantly and persist globally.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-orange-600/30 flex items-center gap-2 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Applied & Saved!</span>
                  </>
                ) : (
                  <span>Apply & Save</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageSeoModal;
