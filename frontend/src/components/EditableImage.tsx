import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ImageSeoModal } from './admin/ImageSeoModal';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  title?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  title,
}) => {
  const { isAdmin, isEditMode, getImageSeo } = useAdmin();
  const [modalOpen, setModalOpen] = useState(false);

  const customSeo = getImageSeo(src);
  const activeSrc = customSeo.newSrc || src;
  const activeAlt = customSeo.alt ?? alt;
  const activeTitle = customSeo.title ?? title ?? activeAlt;

  // Visual style rules
  const imageStyles: React.CSSProperties = {
    opacity: customSeo.opacity !== undefined ? customSeo.opacity / 100 : undefined,
    borderRadius: customSeo.borderRadius !== undefined ? `${customSeo.borderRadius}px` : undefined,
    borderWidth: customSeo.borderWidth ? `${customSeo.borderWidth}px` : undefined,
    borderColor: customSeo.borderColor,
    borderStyle: customSeo.borderWidth ? 'solid' : undefined,
    boxShadow: customSeo.boxShadow && customSeo.boxShadow !== 'none' ? customSeo.boxShadow : undefined,
    objectFit: customSeo.objectFit || undefined,
  };

  if (!isAdmin || !isEditMode) {
    return (
      <img
        src={activeSrc}
        alt={activeAlt}
        title={activeTitle}
        width={width}
        height={height}
        loading={loading}
        style={imageStyles}
        className={className}
      />
    );
  }

  return (
    <div className="relative inline-block group/editable-img select-none">
      <img
        src={activeSrc}
        alt={activeAlt}
        title={activeTitle}
        width={width}
        height={height}
        loading={loading}
        style={imageStyles}
        className={`${className} outline-2 outline-dashed outline-[#EA580C]/80 hover:outline-[#EA580C] transition-all cursor-pointer`}
        onClick={() => setModalOpen(true)}
      />

      {/* Floating SEO Badge indicator in Edit Mode */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="absolute top-2 right-2 z-20 px-2 py-1 rounded-full bg-[#001D40]/90 hover:bg-[#EA580C] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
        title="Edit Image SEO Alt Text & Title Tag"
      >
        <ImageIcon className="w-3 h-3 text-amber-300" />
        <span>SEO / Alt</span>
      </button>

      {/* Hover Information Pill */}
      <div className="opacity-0 group-hover/editable-img:opacity-100 transition-opacity absolute bottom-2 left-2 z-20 pointer-events-none bg-black/85 text-stone-200 text-[10px] px-2 py-1 rounded-md shadow-md max-w-xs truncate border border-white/10 font-sans">
        Alt: &quot;{activeAlt}&quot;
      </div>

      <ImageSeoModal
        isOpen={modalOpen}
        imageSrc={src}
        initialAlt={activeAlt}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default EditableImage;
