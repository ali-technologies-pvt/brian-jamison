import React, { useState } from 'react';
import { PROPERTIES, Property } from '../data/realEstateData';
import { ArrowUpRight, Bed, Bath, Move, Calendar } from 'lucide-react';

interface FeaturedClosingsProps {
  onSelectProperty: (property: Property) => void;
}

export const FeaturedClosings: React.FC<FeaturedClosingsProps> = ({ onSelectProperty }) => {
  const [filter, setFilter] = useState<'all' | 'nichols' | 'edmond' | 'gaillardia'>('all');

  const filteredProperties = PROPERTIES.filter((prop) => {
    if (filter === 'all') return true;
    if (filter === 'nichols') return prop.subdivision.toLowerCase().includes('nichols');
    if (filter === 'edmond') return prop.city.toLowerCase().includes('edmond');
    if (filter === 'gaillardia') return prop.subdivision.toLowerCase().includes('gaillardia');
    return true;
  });

  const heroProperty = filteredProperties[0] || PROPERTIES[0];
  const sideProperties = filteredProperties.slice(1);

  return (
    <section id="featured-closings" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight">
              Featured & Notable Closings
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#FAF9F6] rounded-xl border-2 border-[#002D61]/20 shadow-xs">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'text-[#002D61] hover:bg-[#002D61]/10'
              }`}
            >
              Exclusive Representation
            </button>
            <button
              type="button"
              onClick={() => setFilter('nichols')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'nichols'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'text-[#002D61] hover:bg-[#002D61]/10'
              }`}
            >
              Nichols Hills
            </button>
            <button
              type="button"
              onClick={() => setFilter('edmond')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'edmond'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'text-[#002D61] hover:bg-[#002D61]/10'
              }`}
            >
              Edmond / Deer Creek
            </button>
            <button
              type="button"
              onClick={() => setFilter('gaillardia')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                filter === 'gaillardia'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'text-[#002D61] hover:bg-[#002D61]/10'
              }`}
            >
              Gaillardia
            </button>
          </div>
        </div>

        {/* 
          Asymmetric Editorial Magazine Grid:
          1 panoramic featured property paired with 2 staggered architectural detail cards.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Panoramic Card (Left Col 7) */}
          <div
            onClick={() => onSelectProperty(heroProperty)}
            className="lg:col-span-7 group relative rounded-2xl overflow-hidden border-2 border-[#002D61]/30 shadow-xl bg-[#002D61] min-h-[460px] lg:min-h-[580px] cursor-pointer flex flex-col justify-end"
          >
            <img
              src={heroProperty.exteriorImage}
              alt={heroProperty.title}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
            />

            {/* Gradient Scrim for WCAG AA readability with #002D61 Royal Navy richness */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#002D61]/95 via-[#002D61]/50 to-transparent" />

            {/* Top Status Badge */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                {heroProperty.badgeText}
              </span>
              <span className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#002D61] flex items-center justify-center backdrop-blur-md transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <div>
                  <h3
                    style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl !text-white font-bold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]"
                  >
                    {heroProperty.title}
                  </h3>
                  <span className="text-xs sm:text-sm !text-stone-100 font-sans font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {heroProperty.subdivision}, {heroProperty.city}
                  </span>
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#FB923C] tabular-nums drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {heroProperty.formattedPrice}
                </div>
              </div>

              {/* Specs Bar: Pure White Font with High Contrast */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/20 text-xs !text-white font-medium">
                <span className="flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-[#EA580C]" />
                  {heroProperty.bedrooms} Bedrooms
                </span>
                <span aria-hidden="true" className="text-white/60">·</span>
                <span className="flex items-center gap-1.5">
                  <Bath className="w-3.5 h-3.5 text-[#EA580C]" />
                  {heroProperty.bathrooms} Bathrooms
                </span>
                <span aria-hidden="true" className="text-white/60">·</span>
                <span className="flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-[#EA580C]" />
                  {heroProperty.sqft.toLocaleString()} Sq Ft
                </span>
                <span aria-hidden="true" className="text-white/60">·</span>
                <span className="flex items-center gap-1.5 !text-stone-100 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                  {heroProperty.daysOnMarket} Days to Escrow
                </span>
              </div>
            </div>
          </div>

          {/* Staggered Right Cards (Right Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
            {sideProperties.slice(0, 2).map((property) => (
              <div
                key={property.id}
                onClick={() => onSelectProperty(property)}
                className="group relative rounded-2xl overflow-hidden border-2 border-[#002D61]/30 shadow-md bg-[#002D61] h-[260px] sm:h-[275px] cursor-pointer flex flex-col justify-end"
              >
                <img
                  src={property.exteriorImage}
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D61]/95 via-[#002D61]/50 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[9px] tracking-[0.2em] uppercase font-sans font-bold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    {property.badgeText}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#002D61] flex items-center justify-center backdrop-blur-md transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <div>
                      <h4
                        style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                        className="font-serif text-xl sm:text-2xl !text-white font-bold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                      >
                        {property.title}
                      </h4>
                      <span className="text-xs !text-stone-100 font-sans font-medium drop-shadow-xs">
                        {property.subdivision} · {property.city}
                      </span>
                    </div>
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#FB923C] tabular-nums drop-shadow-xs">
                      {property.formattedPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2 text-[11px] !text-white font-medium border-t border-white/20">
                    <span>{property.bedrooms} Beds</span>
                    <span className="text-white/60">·</span>
                    <span>{property.bathrooms} Baths</span>
                    <span className="text-white/60">·</span>
                    <span>{property.sqft.toLocaleString()} Sq Ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
