import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Home,
  TrendingUp,
  Map,
  Compass,
  FileCheck,
  Award,
  ChevronRight,
  Layers
} from 'lucide-react';
import { CORE_PROCESSES_NAV, SERVICE_PAGES } from './serviceData';
import { InteriorHeroVideo } from './InteriorHeroVideo';

interface ServicesHubPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const ServicesHubPage: React.FC<ServicesHubPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const majorServices = [
    {
      number: "01",
      title: "Home Buying Advisory",
      kicker: "PRIVATE CLIENT CONCIERGE",
      slug: "/services/home-buying",
      desc: "Comprehensive buyer representation under new fiduciary regulations. From off-market pocket listings in Nichols Hills and Gaillardia to meticulous architectural inspection audits and fierce purchase contract negotiation.",
      image: "/media/properties/136-nw-18th-heritage-hills.jpeg",
      highlights: ["Off-Market Pocket Listings", "Structural & Foundation Audits", "Fiduciary Purchase Negotiation"]
    },
    {
      number: "02",
      title: "Home Selling Machine",
      kicker: "PROPRIETARY 6-STEP BLUEPRINT",
      slug: "/services/home-selling",
      desc: "Transforming standard listings into high-demand bidding wars. Powered by 4K cinematic video, FAA drone mapping, Matterport 3D, reverse prospecting, and our 100% Risk-Free Cancel-Anytime guarantee.",
      image: "/media/gallery/modern-estate-pool-lawn.jpeg",
      highlights: ["4K Cinema & Drone Flyovers", "Mandatory 2-Hr Showing Feedback", "Cancel-Anytime Listing Pledge"]
    },
    {
      number: "03",
      title: "Land Buying & Selling",
      kicker: "ACREAGE & DEVELOPMENT ADVISORY",
      slug: "/services/land-buying-and-selling",
      desc: "Specialized acreage and parcel representation across Edmond, Arcadia, Guthrie, Piedmont, and Logan County. Topography analysis, mineral rights verification, percolation tests, and utility infrastructure feasibility.",
      image: "/media/properties/11616-estrella-arcadia.jpeg",
      highlights: ["Soil & Percolation Feasibility", "Mineral & Water Rights Audits", "Adjacent Lot Valuation Adders"]
    }
  ];

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 
        ========================================================================
        SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage)
        ========================================================================
      */}
      <InteriorHeroVideo
        kicker="Full-Spectrum Advisory & Execution"
        title="Our Core Real Estate Services & Selling Machine."
        subtitle="Whether you are acquiring a private trophy estate, liquidating land acreage, or deploying our 6-Phase Selling Machine to maximize net proceeds, Brian Jamison delivers fiduciary excellence without compromise."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '3 Pillars', label: 'Buying, Selling & Land' },
          { value: '$70M+', label: 'Career Volume Sold' },
          { value: '99.4%', label: 'Sale-to-List Realization' },
          { value: '100%', label: 'Cancel-Anytime Pledge' },
        ]}
        primaryCtaText="Schedule Consultation"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Instant Market Appraisal"
        onSecondaryCtaClick={onOpenValuation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* 2. THREE MAJOR ADVISORY SILOS */}
      <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
              Primary Practices
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] leading-tight">
              3 Pillars of Real Estate Representation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {majorServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group rounded-3xl bg-[#F4F1EB] border border-[#E6E2DA] overflow-hidden hover:border-[#EA580C]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/80 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider border border-white/20">
                      {service.kicker}
                    </span>
                    <span className="absolute bottom-4 left-4 font-serif text-3xl font-bold text-white">
                      {service.number}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-bold text-[#002D61] mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-[#002D61]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onNavigate(service.slug)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#E6E2DA] hover:border-[#002D61] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-between cursor-pointer shadow-2xs"
                  >
                    <span>Explore Full Blueprint</span>
                    <ArrowRight className="w-4 h-4 text-[#EA580C]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE 6-PHASE SELLER BLUEPRINT OVERVIEW */}
      <section className="w-full py-20 sm:py-28 bg-[#F4F1EB] border-b border-[#E6E2DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
              The Proprietary System
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] leading-tight mb-4">
              The 6-Phase Selling Machine
            </h2>
            <p className="font-sans text-base text-[#4B5563]">
              Every phase is backed by specific deliverables and our 100% Risk-Free Cancel-Anytime Listing Guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PROCESSES_NAV.map((proc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-white border border-[#E6E2DA] hover:border-[#EA580C]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E6E2DA] font-serif text-xs font-bold text-[#002D61]">
                      Phase {proc.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#EA580C] tracking-wider">
                      Fiduciary Standard
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                    {proc.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
                    {SERVICE_PAGES[proc.id]?.subtitle || 'Proprietary listing standard engineered for peak net proceeds.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(proc.slug)}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E6E2DA] text-xs font-bold text-[#002D61] hover:text-[#EA580C] transition-colors cursor-pointer"
                >
                  <span>Review Phase {proc.number} Dossier</span>
                  <ChevronRight className="w-4 h-4 text-[#EA580C]" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => onNavigate('/seller-blueprint')}
              className="px-8 py-3.5 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md inline-flex items-center gap-2"
            >
              <span>View The Complete 6-Step Seller Machine</span>
              <ArrowRight className="w-4 h-4 text-[#FB923C]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM ADVISORY BANNER */}
      <section className="w-full py-16 bg-[#002D61] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Unsure Which Strategy Fits Your Needs?
          </h2>
          <p className="text-sm text-stone-200 mb-8 max-w-xl mx-auto">
            Book an obligation-free confidential strategy session with Brian Jamison at Salt Real Estate Corporate Office.
          </p>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02]"
          >
            Schedule Private Consultation
          </button>
        </div>
      </section>
    </article>
  );
};
