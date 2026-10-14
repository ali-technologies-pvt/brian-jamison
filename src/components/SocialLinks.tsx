import React from 'react';

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  shortLabel: string;
  category: 'reviews' | 'social' | 'realestate';
  description: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: 'zillow',
    name: 'Zillow Premier Agent',
    shortLabel: 'Zillow',
    url: 'https://www.zillow.com/profile/Brianjamison4#reviews',
    category: 'reviews',
    description: 'Verified Client Reviews, Past Sales & Ratings on Zillow'
  },
  {
    id: 'realtor',
    name: 'Realtor.com Official Profile',
    shortLabel: 'Realtor.com',
    url: 'https://www.realtor.com/realestateagents/603f285097175500126300c8',
    category: 'realestate',
    description: 'Verified REALTOR® Credentials, Active MLS Listings & Endorsements'
  },
  {
    id: 'landsearch',
    name: 'LandSearch Verified Agent',
    shortLabel: 'LandSearch',
    url: 'https://www.landsearch.com/agents/brian-jamison/496173',
    category: 'realestate',
    description: 'Oklahoma Acreage, Custom Building Lots & Land Sales Advisory'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Professional Profile',
    shortLabel: 'LinkedIn',
    url: 'https://www.linkedin.com/in/brian-jamison-okc',
    category: 'social',
    description: 'Executive Real Estate Network, Career Pedigree & Market Intel'
  },
  {
    id: 'instagram',
    name: 'Instagram (@brianjamisonokc)',
    shortLabel: 'Instagram',
    url: 'https://www.instagram.com/brianjamisonokc/',
    category: 'social',
    description: 'Daily Oklahoma Luxury Estate Reels, Drone Tours & Sneak Peeks'
  },
  {
    id: 'facebook',
    name: 'Facebook Official Business Page',
    shortLabel: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100085437993627',
    category: 'social',
    description: 'Client Announcements, Open House Events & Metro Market Reports'
  }
];

// Clean, high-fidelity SVGs for each platform
export const ZillowIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5L2 10.8h3.2v9.7h13.6v-9.7H22L12 2.5zm4.8 15.8h-9.6v-7.8l4.8-4 4.8 4v7.8zm-6.8-5.8h4.2l-3.8 3.8h4.2v1.3H8.8l3.8-3.8H8.8l1.2-1.3z" />
  </svg>
);

export const RealtorIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.6 15.2h-2.3l-2.4-4.1h-1v4.1H6.3V6.8h4.4c2.2 0 3.7 1.3 3.7 3.3 0 1.5-.9 2.6-2.2 3.1l2.4 4zm-3.2-6.2c1.1 0 1.8-.6 1.8-1.5s-.7-1.5-1.8-1.5H8.7v3h1.7z" />
  </svg>
);

export const LandSearchIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zM3 19.5l3.5-1.5 5 2 5-2 4.5 1.5v2.5H3v-2.5z" />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

export const getSocialIcon = (id: string, className?: string) => {
  switch (id) {
    case 'zillow':
      return <ZillowIcon className={className} />;
    case 'realtor':
      return <RealtorIcon className={className} />;
    case 'landsearch':
      return <LandSearchIcon className={className} />;
    case 'linkedin':
      return <LinkedInIcon className={className} />;
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    default:
      return null;
  }
};

interface SocialLinksProps {
  variant?: 'footer' | 'hero' | 'pills' | 'compact' | 'cards';
  className?: string;
  itemClassName?: string;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'footer',
  className = '',
  itemClassName = ''
}) => {
  if (variant === 'cards') {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.description}
            className={`p-3.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F4F1EB] border border-[#E6E2DA] hover:border-[#B38F68] transition-all duration-300 flex items-center gap-3 group shadow-2xs hover:shadow-md cursor-pointer ${itemClassName}`}
          >
            <div className="w-9 h-9 rounded-lg bg-[#FAF9F6] border border-[#E6E2DA] flex items-center justify-center text-[#B38F68] group-hover:bg-[#B38F68] group-hover:text-white transition-all shrink-0">
              {getSocialIcon(link.id, 'w-4 h-4')}
            </div>
            <div className="min-w-0">
              <span className="font-sans text-xs font-bold text-[#1B1D21] group-hover:text-[#B38F68] transition-colors block truncate">
                {link.shortLabel}
              </span>
              <span className="text-[10px] text-[#6B7280] block truncate">
                Verified Profile →
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'pills') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.description}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#B38F68] text-xs font-sans font-medium transition-all duration-200 cursor-pointer shadow-2xs ${itemClassName}`}
          >
            <span className="text-[#B38F68]">{getSocialIcon(link.id, 'w-3.5 h-3.5')}</span>
            <span>{link.shortLabel}</span>
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${link.name} — ${link.description}`}
            className={`w-9 h-9 rounded-full bg-black/40 hover:bg-[#B38F68] text-white/90 hover:text-white border border-white/25 hover:border-white/50 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-md cursor-pointer ${itemClassName}`}
          >
            {getSocialIcon(link.id, 'w-4 h-4')}
          </a>
        ))}
      </div>
    );
  }

  // Default 'footer' variant: elegant, warm, highly legible icons with tooltips
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${link.name} — ${link.description}`}
          className={`w-9 h-9 rounded-lg bg-white/10 hover:bg-[#B38F68] text-stone-200 hover:text-white border border-white/15 hover:border-[#B38F68] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-xs cursor-pointer ${itemClassName}`}
        >
          {getSocialIcon(link.id, 'w-4 h-4')}
        </a>
      ))}
    </div>
  );
};
