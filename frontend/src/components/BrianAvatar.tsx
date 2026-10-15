import React from 'react';
import { BRIAN_HEADSHOT_IMG } from '../data/realEstateData';

export interface BrianAvatarProps {
  /**
   * Numeric pixel diameter or sizing preset.
   * e.g. 24, 32, 36, 44, 48, 64, 140, 160, 180
   */
  size?: number | string;
  /**
   * Tailwind classes to override or append to container
   */
  className?: string;
  /**
   * Tailwind classes for image element
   */
  imgClassName?: string;
  /**
   * If true, uses loading="eager", otherwise "lazy"
   */
  priority?: boolean;
  /**
   * Emerald live-status verification dot
   */
  showStatusDot?: boolean;
  /**
   * Position for live status dot
   */
  statusDotPosition?: 'bottom-right' | 'top-right';
  /**
   * Optional custom image source
   */
  src?: string;
  /**
   * Image alt text
   */
  alt?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Tooltip or accessible label
   */
  title?: string;
}

export const BrianAvatar: React.FC<BrianAvatarProps> = ({
  size = 36,
  className = '',
  imgClassName = '',
  priority = false,
  showStatusDot = false,
  statusDotPosition = 'bottom-right',
  src = BRIAN_HEADSHOT_IMG,
  alt = 'Brian Jamison - Salt Real Estate OKC Top 2% Producer',
  onClick,
  title
}) => {
  // Compute style dimensions if size is provided and className does not define explicit width
  const hasCustomDimensionInClass = /\b(w-\d+|w-\[.+\])\b/.test(className);
  const dimensionStyle: React.CSSProperties =
    !hasCustomDimensionInClass && typeof size === 'number'
      ? { width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }
      : !hasCustomDimensionInClass && size && !isNaN(Number(size))
      ? { width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }
      : {};

  // Status dot sizing based on avatar size
  const numericSize = typeof size === 'number' ? size : Number(size) || 36;
  const dotSizeClass = numericSize <= 28 ? 'w-2 h-2' : numericSize <= 48 ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';

  return (
    <div
      onClick={onClick}
      title={title || alt}
      style={dimensionStyle}
      className={`relative inline-block aspect-square shrink-0 rounded-full transition-all duration-300 ease-out select-none group/brian-avatar ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* 
        Official Headshot Image Container:
        - Strict aspect-square
        - Rounded full
        - Subtle Sunset Honey Gold outline (border-2 border-[#EA580C]/80)
        - Hover gentle scale-up (scale-105) & soft warm shadow (shadow-[0_4px_16px_rgba(234, 88, 12, 0.3)])
      */}
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#EA580C] shadow-xs hover:border-[#C2410C] transition-all duration-300 group-hover/brian-avatar:scale-105 group-hover/brian-avatar:shadow-[0_4px_16px_rgba(234, 88, 12, 0.35)] bg-[#F5EFE6]">
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover object-center aspect-square pointer-events-none ${imgClassName}`}
        />
      </div>

      {/* Emerald Live-Status Verification Dot */}
      {showStatusDot && (
        <span
          className={`absolute z-10 flex ${dotSizeClass} ${
            statusDotPosition === 'bottom-right'
              ? 'bottom-0 right-0 translate-x-[15%] translate-y-[15%]'
              : 'top-0 right-0 translate-x-[15%] -translate-y-[15%]'
          }`}
          aria-label="Verified Active Status"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border border-white shadow-xs" />
        </span>
      )}
    </div>
  );
};
