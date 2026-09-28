import React from 'react';

interface JamisonLogoProps {
  size?: number | string;
  className?: string;
  title?: string;
  showShadow?: boolean;
}

export const JamisonLogo: React.FC<JamisonLogoProps> = ({
  size = 40,
  className = '',
  title = 'Jamison Real Estate · Oklahoma City',
  showShadow = true
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      title={title}
      style={{ width: dimension, height: dimension }}
      className={`relative inline-block aspect-square shrink-0 select-none group/logo ${className}`}
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full rounded-full transition-transform duration-300 ease-out group-hover/logo:scale-105 ${
          showShadow ? 'drop-shadow-[0_4px_12px_rgba(0,45,97,0.35)]' : ''
        }`}
        aria-label={title}
      >
        <defs>
          {/* Circular Clip Mask for the Emblem Content */}
          <clipPath id="jamison-emblem-clip">
            <circle cx="250" cy="250" r="236" />
          </clipPath>

          {/* OKC Sunset Sky Gradient */}
          <linearGradient id="okc-sunset-sky" x1="250" y1="20" x2="250" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A154B" />
            <stop offset="18%" stopColor="#7E1D4A" />
            <stop offset="38%" stopColor="#B8283E" />
            <stop offset="60%" stopColor="#DF4E27" />
            <stop offset="82%" stopColor="#F58720" />
            <stop offset="100%" stopColor="#FCBA35" />
          </linearGradient>

          {/* Golden Hour Window Glow */}
          <linearGradient id="gold-window-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
          </linearGradient>

          {/* Devon Tower Glass Facade Gradient */}
          <linearGradient id="devon-glass-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#253549" />
            <stop offset="50%" stopColor="#3E546F" />
            <stop offset="100%" stopColor="#6C85A3" />
          </linearGradient>

          <linearGradient id="devon-glass-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4B6382" />
            <stop offset="70%" stopColor="#93AEC9" />
            <stop offset="100%" stopColor="#D89255" />
          </linearGradient>

          {/* Sunset Horizon Mist to Navy Scrim */}
          <linearGradient id="skyline-base-mist" x1="250" y1="230" x2="250" y2="330" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#002D61" stopOpacity="0" />
            <stop offset="35%" stopColor="#002D61" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#002D61" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#002D61" stopOpacity="1" />
          </linearGradient>

          {/* Metallic Gold Ring Gradient */}
          <linearGradient id="jamison-gold-rim" x1="50" y1="50" x2="450" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F6DA9C" />
            <stop offset="25%" stopColor="#D8A952" />
            <stop offset="50%" stopColor="#F9E2B2" />
            <stop offset="75%" stopColor="#C49339" />
            <stop offset="100%" stopColor="#ECC67B" />
          </linearGradient>

          {/* Thin Inner Gold Ring Gradient */}
          <linearGradient id="jamison-gold-inner" x1="450" y1="50" x2="50" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DFB76C" />
            <stop offset="50%" stopColor="#F9E5BA" />
            <stop offset="100%" stopColor="#B3842C" />
          </linearGradient>
        </defs>

        {/* Outer Heavy Navy Base Circle */}
        <circle cx="250" cy="250" r="248" fill="#002D61" />

        {/* Inner Clipped Graphics */}
        <g clipPath="url(#jamison-emblem-clip)">
          {/* Upper Sunset Sky */}
          <rect x="0" y="0" width="500" height="320" fill="url(#okc-sunset-sky)" />

          {/* Sunset Cloud Streaks */}
          <ellipse cx="210" cy="75" rx="140" ry="12" fill="#E14D43" fillOpacity="0.35" />
          <ellipse cx="340" cy="115" rx="110" ry="9" fill="#B32C4A" fillOpacity="0.3" />
          <ellipse cx="140" cy="130" rx="90" ry="7" fill="#F48833" fillOpacity="0.4" />
          <ellipse cx="280" cy="160" rx="160" ry="10" fill="#FBBF24" fillOpacity="0.3" />

          {/* ---------------- SKYLINE SILHOUETTE ---------------- */}

          {/* 1. DEVON ENERGY CENTER (Iconic OKC Skyscraper - Left) */}
          {/* Devon Shadow Left Facet */}
          <path
            d="M 80 125 L 105 152 L 105 310 L 78 310 Z"
            fill="url(#devon-glass-left)"
          />
          {/* Devon Highlight Right Facet with Triangular Notch Apex */}
          <path
            d="M 80 125 L 126 120 L 128 310 L 105 310 Z"
            fill="url(#devon-glass-right)"
          />
          {/* Devon Triangular Crown Notch */}
          <polygon
            points="80,125 105,152 118,122"
            fill="#1E293B"
            fillOpacity="0.8"
          />
          {/* Vertical Architectural Lines on Devon */}
          <line x1="88" y1="135" x2="87" y2="310" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="97" y1="145" x2="96" y2="310" stroke="#94A3B8" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="112" y1="123" x2="112" y2="310" stroke="#CBD5E1" strokeWidth="1" strokeOpacity="0.7" />
          <line x1="120" y1="121" x2="120" y2="310" stroke="#FDE68A" strokeWidth="1.2" strokeOpacity="0.7" />

          {/* 2. DOWNTOWN TOWERS (Mid-Left & Center) */}
          {/* Mid-rise 1 beside Devon */}
          <rect x="138" y="200" width="48" height="110" fill="#2E2833" />
          {/* Grid Windows on Mid-rise 1 */}
          <g fill="url(#gold-window-glow)">
            <rect x="142" y="210" width="8" height="5" />
            <rect x="154" y="210" width="8" height="5" />
            <rect x="166" y="210" width="8" height="5" />
            <rect x="176" y="210" width="6" height="5" />

            <rect x="142" y="222" width="8" height="5" />
            <rect x="154" y="222" width="8" height="5" />
            <rect x="166" y="222" width="8" height="5" />
            <rect x="176" y="222" width="6" height="5" />

            <rect x="142" y="235" width="8" height="5" />
            <rect x="154" y="235" width="8" height="5" />
            <rect x="166" y="235" width="8" height="5" />
            <rect x="176" y="235" width="6" height="5" />

            <rect x="142" y="248" width="8" height="5" />
            <rect x="154" y="248" width="8" height="5" />
            <rect x="166" y="248" width="8" height="5" />
            <rect x="176" y="248" width="6" height="5" />
          </g>

          {/* First National Center (Stepped Art Deco Tower) */}
          <polygon points="190,175 224,175 224,310 190,310" fill="#3D323E" />
          {/* Spire & Antenna */}
          <line x1="207" y1="175" x2="207" y2="152" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="207" cy="151" r="2.5" fill="#EA580C" />
          {/* Upper Stepped tier */}
          <rect x="195" y="185" width="24" height="15" fill="#4B3B48" />
          {/* First National Windows */}
          <g fill="#FDE68A" fillOpacity="0.75">
            <rect x="195" y="205" width="6" height="6" />
            <rect x="204" y="205" width="6" height="6" />
            <rect x="213" y="205" width="6" height="6" />
            <rect x="195" y="217" width="6" height="6" />
            <rect x="204" y="217" width="6" height="6" />
            <rect x="213" y="217" width="6" height="6" />
            <rect x="195" y="230" width="6" height="6" />
            <rect x="204" y="230" width="6" height="6" />
            <rect x="213" y="230" width="6" height="6" />
          </g>

          {/* City Place Tower (Center Tall Pyramid Cap) */}
          <polygon points="225,178 245,160 265,178 265,310 225,310" fill="#242332" />
          <polygon points="230,178 245,164 260,178" fill="#F59E0B" fillOpacity="0.8" />
          {/* Telecom Mast */}
          <line x1="245" y1="160" x2="245" y2="140" stroke="#334155" strokeWidth="1.5" />

          {/* BancFirst Tower / Corporate High-Rise (Center-Right) */}
          <rect x="266" y="168" width="46" height="142" fill="#2B2633" />
          {/* Golden Hour Window Glare */}
          <g fill="#FBBF24" fillOpacity="0.8">
            <rect x="270" y="176" width="7" height="6" />
            <rect x="280" y="176" width="7" height="6" />
            <rect x="290" y="176" width="7" height="6" />
            <rect x="300" y="176" width="7" height="6" />

            <rect x="270" y="188" width="7" height="6" />
            <rect x="280" y="188" width="7" height="6" />
            <rect x="290" y="188" width="7" height="6" />
            <rect x="300" y="188" width="7" height="6" />

            <rect x="270" y="200" width="7" height="6" />
            <rect x="280" y="200" width="7" height="6" />
            <rect x="290" y="200" width="7" height="6" />
            <rect x="300" y="200" width="7" height="6" />

            <rect x="270" y="214" width="7" height="6" />
            <rect x="280" y="214" width="7" height="6" />
            <rect x="290" y="214" width="7" height="6" />
            <rect x="300" y="214" width="7" height="6" />
          </g>

          {/* Commercial Tower (Right-Mid) */}
          <rect x="314" y="210" width="46" height="100" fill="#F59E0B" fillOpacity="0.85" />
          {/* Window Slits on lit building */}
          <g stroke="#78350F" strokeWidth="1.2">
            <line x1="322" y1="215" x2="322" y2="305" />
            <line x1="330" y1="215" x2="330" y2="305" />
            <line x1="338" y1="215" x2="338" y2="305" />
            <line x1="346" y1="215" x2="346" y2="305" />
            <line x1="354" y1="215" x2="354" y2="305" />
          </g>

          {/* Adjacent Tower (Right) */}
          <rect x="362" y="172" width="48" height="138" fill="#1C212E" />
          <g fill="#FDE68A" fillOpacity="0.45">
            <rect x="368" y="180" width="8" height="5" />
            <rect x="379" y="180" width="8" height="5" />
            <rect x="390" y="180" width="8" height="5" />
            <rect x="368" y="192" width="8" height="5" />
            <rect x="379" y="192" width="8" height="5" />
            <rect x="390" y="192" width="8" height="5" />
            <rect x="368" y="205" width="8" height="5" />
            <rect x="379" y="205" width="8" height="5" />
            <rect x="390" y="205" width="8" height="5" />
          </g>

          {/* 3. OKLAHOMA STATE CAPITOL DOME (Right Edge) */}
          {/* Capitol Spire Lantern */}
          <line x1="430" y1="184" x2="430" y2="198" stroke="#FDE68A" strokeWidth="2" />
          <circle cx="430" cy="183" r="2" fill="#FBBF24" />
          {/* Classical Dome */}
          <path
            d="M 416 230 C 416 202, 444 202, 444 230 Z"
            fill="#D97706"
          />
          {/* Colonnade Drum below dome */}
          <rect x="414" y="230" width="32" height="14" fill="#B45309" />
          <g stroke="#78350F" strokeWidth="1">
            <line x1="418" y1="230" x2="418" y2="244" />
            <line x1="424" y1="230" x2="424" y2="244" />
            <line x1="430" y1="230" x2="430" y2="244" />
            <line x1="436" y1="230" x2="436" y2="244" />
            <line x1="442" y1="230" x2="442" y2="244" />
          </g>
          {/* Capitol Pediment Base Building */}
          <polygon points="405,248 430,242 455,248" fill="#FDE68A" />
          <rect x="408" y="248" width="44" height="62" fill="#92400E" />

          {/* ---------------- BASE NAVY SCRIM & LOWER SECTION ---------------- */}
          {/* Skyline Base Transition to Solid Navy */}
          <rect x="0" y="235" width="500" height="95" fill="url(#skyline-base-mist)" />

          {/* Lower Solid Royal Navy (#002D61) Region */}
          <rect x="0" y="295" width="500" height="205" fill="#002D61" />

          {/* ---------------- TYPOGRAPHY ---------------- */}
          {/* "JAMISON" - Crisp White Modern Manrope */}
          <text
            x="250"
            y="358"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Manrope', sans-serif"
            fontSize="46"
            fontWeight="800"
            letterSpacing="8"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)' }}
          >
            JAMISON
          </text>

          {/* "REAL ESTATE" - Refined Warm Gold Manrope */}
          <text
            x="250"
            y="398"
            textAnchor="middle"
            fill="url(#jamison-gold-rim)"
            fontFamily="'Manrope', sans-serif"
            fontSize="21"
            fontWeight="700"
            letterSpacing="11"
            style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)' }}
          >
            REAL ESTATE
          </text>
        </g>

        {/* ---------------- CONCENTRIC LUXURY GOLD BORDERS ---------------- */}
        {/* Inner Thin Accent Gold Ring */}
        <circle
          cx="250"
          cy="250"
          r="234"
          fill="none"
          stroke="url(#jamison-gold-inner)"
          strokeWidth="3.5"
        />

        {/* Outer Heavy Gold Ring Rim */}
        <circle
          cx="250"
          cy="250"
          r="244"
          fill="none"
          stroke="url(#jamison-gold-rim)"
          strokeWidth="6.5"
        />

        {/* Outer Fine Deep Navy Trim */}
        <circle
          cx="250"
          cy="250"
          r="248"
          fill="none"
          stroke="#001D40"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
