import React from 'react';
import { motion } from 'motion/react';
import {
  Home,
  TrendingUp,
  MapPin,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';

interface MegaMenuServicesProps {
  onClose: () => void;
  onNavigate?: (path: string) => void;
  onOpenConsultation?: () => void;
  onOpenMethod?: (phaseIndex?: number) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const MegaMenuServices: React.FC<MegaMenuServicesProps> = ({
  onClose,
  onNavigate,
  onOpenConsultation,
  onOpenMethod,
  onMouseEnter,
  onMouseLeave
}) => {
  const handleNav = (slug: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(slug);
    } else {
      window.location.href = slug;
    }
  };

  const SERVICES = [
    {
      id: 'home-buying',
      number: '01',
      title: 'Home Buying',
      slug: '/services/home-buying',
      tag: 'Buyer Concierge & Equity Advisory',
      desc: 'Curated off-market inventory access, structural & inspection defense, and veteran negotiation protecting your equity across Edmond & Greater OKC.',
      stats: '$24.5K Avg Below Asking',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      highlights: ['Off-Market Pocket Listings', 'Physical Inspection Defense', 'Winning Offer Escalation']
    },
    {
      id: 'home-selling',
      number: '02',
      title: 'Home Selling',
      slug: '/services/home-selling',
      tag: 'Proprietary 6-Step Selling Machine',
      desc: 'Institutional listing campaign: cinema-grade 4K films, 350+ portal syndication, and disciplined negotiation engineered for record-setting bidding wars.',
      stats: '98.6% List-to-Sale Ratio',
      icon: TrendingUp,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      highlights: ['Cinema 4K Video & Drone', '350+ Global Luxury Feeds', '100% Cancel-Anytime Pledge']
    },
    {
      id: 'land-buying-and-selling',
      number: '03',
      title: 'Land Buying and selling',
      slug: '/services/land-buying-and-selling',
      tag: 'Acreage & Development Enclaves',
      desc: 'Topographical drone boundary mapping, soil perk & septic audits, utility easements, and strategic marketing for custom home lots and Oklahoma acreage.',
      stats: '1,450+ Oklahoma Acres Closed',
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      highlights: ['Drone Boundary Overlays', 'Soil & Well Due Diligence', '24+ Custom Builder Network']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="mega-menu-card absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[980px] max-w-[95vw] z-50 pointer-events-auto"
    >
      <div className="relative rounded-2xl p-6 sm:p-7 bg-gradient-to-b from-[#002D61]/98 via-[#001D40]/98 to-[#00142C]/98 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-[#00142C]/70 text-white overflow-hidden">
        {/* Specular Top Edge Gloss Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 flex items-center justify-center text-[#FB923C]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-[#FB923C] block leading-none mb-1">
                Core Real Estate Representation
              </span>
              <h3 className="font-serif text-lg font-bold text-white leading-none">
                Our 3 Major Services
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => handleNav('/seller-blueprint')}
              className="text-stone-300 hover:text-[#FB923C] transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Layers className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Explore 6-Phase Seller Blueprint</span>
            </button>
          </div>
        </div>

        {/* 3 Major Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                onClick={() => handleNav(srv.slug)}
                className="group relative rounded-xl overflow-hidden bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-[#EA580C]/60 transition-all duration-300 cursor-pointer flex flex-col justify-between p-4 sm:p-5 shadow-inner"
              >
                <div>
                  {/* Photo Thumbnail with Badge */}
                  <div className="relative h-32 w-full rounded-lg overflow-hidden mb-3.5 bg-[#001D40]">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider text-white border border-white/20">
                        {srv.number}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white drop-shadow-sm flex items-center gap-1">
                        <Icon className="w-3 h-3 text-[#FB923C]" />
                        <span>{srv.stats}</span>
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#FB923C] block mb-1">
                    {srv.tag}
                  </span>

                  <h4 className="font-serif text-base font-bold text-white group-hover:text-[#FB923C] transition-colors leading-snug mb-2">
                    {srv.title}
                  </h4>

                  <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-3 mb-3">
                    {srv.desc}
                  </p>

                  {/* Bullet Tags */}
                  <ul className="space-y-1 mb-2">
                    {srv.highlights.map((h, i) => (
                      <li key={i} className="text-[11px] text-stone-200 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-[#FB923C] shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#FB923C] group-hover:text-white transition-colors">
                  <span>Open Dedicated Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Direct Connection to 6 Selling Processes & Consultation */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-black/30 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-stone-200">
            <ShieldCheck className="w-4 h-4 text-[#FB923C] shrink-0" />
            <span>
              All services backed by our <strong className="text-white">100% Risk-Free Cancel-Anytime Listing Guarantee</strong>.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('/services')}
              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold tracking-wide transition-all cursor-pointer"
            >
              All Services Hub
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-bold tracking-wide uppercase transition-all shadow-md cursor-pointer"
            >
              Consult Brian Jamison
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
