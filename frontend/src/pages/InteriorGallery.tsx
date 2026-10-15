import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Sliders, Image as ImageIcon } from 'lucide-react';

interface GalleryImage {
  url: string;
  caption: string;
  tag: string;
}

interface InteriorGalleryProps {
  title?: string;
  subtitle?: string;
  images: GalleryImage[];
}

export const InteriorGallery: React.FC<InteriorGalleryProps> = ({
  title = "Curated Visual Portfolio",
  subtitle = "High-definition architectural captures, twilight exteriors, and bespoke finishes.",
  images
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Extract unique tags
  const tags = ['all', ...Array.from(new Set(images.map((img) => img.tag)))];

  const filteredImages = activeFilter === 'all'
    ? images
    : images.filter((img) => img.tag === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-2">
              Visual Documentation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A192F]">
              {title}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-xl mt-2">
              {subtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === tag
                    ? 'bg-[#0A192F] text-white shadow-xs'
                    : 'bg-[#F5EFE6] text-[#6B7280] hover:text-[#0A192F] hover:bg-[#F5EFE6]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Before & After Staging Slider (Featured Asset) */}
        {images.length >= 2 && (
          <div className="mb-14 bg-[#F5EFE6] border border-[#EA580C]/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#EA580C]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0A192F]">
                  Visual Transformation & Architectural Refresh
                </span>
              </div>
              <span className="text-xs text-[#6B7280]">
                Slide to compare staging & twilight impact
              </span>
            </div>

            <div className="relative w-full h-[320px] sm:h-[460px] rounded-xl overflow-hidden shadow-lg select-none">
              {/* After Image (Right/Full) */}
              <img
                src={images[0].url}
                alt={images[0].caption}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Professional Staged & Lit
              </span>

              {/* Before Image (Left/Clipped) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={images[1].url}
                  alt={images[1].caption}
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
                <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Raw Architectural Capture
                </span>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-md"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#0A192F] flex items-center justify-center shadow-lg">
                  <Sliders className="w-4 h-4 text-[#0A192F]" />
                </div>
              </div>

              {/* Slider Input overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
                aria-label="Before and after staging comparison slider"
              />
            </div>
          </div>
        )}

        {/* 10-12 Image Editorial Grid / Mosaic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((img, idx) => {
            // First item spans 2 cols on lg
            const isFeatured = idx === 0 || idx === 5;
            return (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden rounded-xl bg-[#F5EFE6] border border-[#EA580C]/30 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isFeatured ? 'sm:col-span-2 sm:row-span-2 h-[420px] sm:h-[480px]' : 'h-[230px]'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-sans uppercase font-bold tracking-widest text-[#EA580C] bg-black/40 px-2 py-0.5 rounded w-max mb-1">
                    {img.tag}
                  </span>
                  <p className="font-serif text-sm sm:text-base font-semibold text-white leading-snug">
                    {img.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-stone-300">
                    <Maximize2 className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Click to expand high-res</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close high-res lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].caption}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-[#EA580C] font-bold">
                {filteredImages[lightboxIndex].tag}
              </span>
              <p className="font-serif text-lg text-white mt-1">
                {filteredImages[lightboxIndex].caption}
              </p>
              <span className="text-xs text-stone-400 mt-1 block">
                {lightboxIndex + 1} of {filteredImages.length}
              </span>
            </div>
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
