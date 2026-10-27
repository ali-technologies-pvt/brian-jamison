import React, { useState } from 'react';
import { BRIAN_HEADSHOT_IMG } from '../data/realEstateData';

export interface BrianAvatarProps {
  /**
   * Numeric pixel diameter or sizing preset.
   * e.g. 24, 32, 36, 44, 48, 56, 64, 140, 160, 180
   */
  size?: number | string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  showStatusDot?: boolean;
  statusDotPosition?: 'bottom-right' | 'top-right';
  src?: string;
  alt?: string;
  onClick?: () => void;
  title?: string;
}

const PRESET_SIZES: Record<string, number> = {
  xs: 24,
  sm: 36,
  md: 48,
  lg: 64,
  xl: 96,
};

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
  const [currentSrc, setCurrentSrc] = useState(src || '/media/gallery/brian-jamison-sunset.jpeg');
  const [hasError, setHasError] = useState(false);

  // Compute style dimensions if size is provided and className does not define explicit width
  const hasCustomDimensionInClass = /\b(w-\d+|w-\[.+\])\b/.test(className);
  const resolvedNumericSize: number =
    typeof size === 'number'
      ? size
    : typeof size === 'string' && PRESET_SIZES[size.toLowerCase()]
    ? PRESET_SIZES[size.toLowerCase()]
    : !isNaN(Number(size)) && Number(size) > 0
    ? Number(size)
    : 36;

  const dimensionStyle: React.CSSProperties = !hasCustomDimensionInClass
    ? {
        width: `${resolvedNumericSize}px`,
        height: `${resolvedNumericSize}px`,
        minWidth: `${resolvedNumericSize}px`,
        minHeight: `${resolvedNumericSize}px`
      }
    : {};

  // Status dot sizing based on avatar size
  const dotSizeClass = resolvedNumericSize <= 28 ? 'w-2 h-2' : resolvedNumericSize <= 48 ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5';

  const handleImgError = () => {
    if (currentSrc !== '/media/gallery/brian-jamison-sunset.jpeg') {
      setCurrentSrc('/media/gallery/brian-jamison-sunset.jpeg');
    } else if (currentSrc !== '/media/gallery/brian-jamison-skyline.jpeg') {
      setCurrentSrc('/media/gallery/brian-jamison-skyline.jpeg');
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      onClick={onClick}
      title={title || alt}
      style={dimensionStyle}
      className={`relative inline-block aspect-square shrink-0 rounded-full transition-all duration-300 ease-out select-none group/brian-avatar ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Official Headshot Image Container */}
      <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#EA580C] shadow-xs hover:border-[#C2410C] transition-all duration-300 group-hover/brian-avatar:scale-105 group-hover/brian-avatar:shadow-[0_4px_16px_rgba(234, 88, 12, 0.35)] bg-[#002D61] flex items-center justify-center">
        {!hasError ? (
          <img
            src={currentSrc}
            alt={alt}
            onError={handleImgError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full h-full object-cover object-center aspect-square pointer-events-none ${imgClassName}`}
          />
        ) : (
          <span className="font-serif font-bold text-white text-xs sm:text-sm">
            BJ
          </span>
        )}
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
