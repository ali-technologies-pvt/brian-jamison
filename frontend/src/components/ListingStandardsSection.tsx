import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Sparkles,
  Camera,
  Video,
  Layers,
  Globe,
  Monitor,
  Share2,
  TrendingUp,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  FileCheck
} from 'lucide-react';

export interface ListingStandardItem {
  id: string;
  slug: string;
  stepNumber: string;
  badge: string;
  category: 'media' | 'distribution' | 'outreach';
  categoryLabel: string;
  title: string;
  desc: string;
  executionDetail: string;
  sellerImpact: string;
  image: string;
  metric: string;
  metricLabel: string;
}

export const LISTING_STANDARDS_DATA: ListingStandardItem[] = [
  {
    id: "home-prep-guidance",
    slug: "/services/home-prep-guidance",
    stepNumber: "01",
    badge: "Step 01 · Curb Appeal",
    category: "media",
    categoryLabel: "Architectural Prep",
    title: "Home-Prep Guidance & Architectural Staging",
    desc: "Room-by-room architectural audit and high-ROI refresh recommendations before taking photos.",
    executionDetail: "Brian conducts an in-depth room walkthrough, recommending paint touch-ups, lighting changes, decluttering, and furniture arrangements so buyers emotionally connect the moment they step in.",
    sellerImpact: "Generates 3x more opening-weekend private showings and prevents lowball buyer discount demands.",
    image: "/media/gallery/modern-kitchen.jpeg",
    metric: "+300%",
    metricLabel: "Private Showings"
  },
  {
    id: "professional-photography",
    slug: "/services/professional-photography",
    stepNumber: "02",
    badge: "Step 02 · 4K HDR",
    category: "media",
    categoryLabel: "High-Res Photography",
    title: "Professional Architectural HDR Photography",
    desc: "Natural-light and golden-hour architectural captures using wide-angle tilt-shift professional glass.",
    executionDetail: "Captured with natural ambient light and golden-hour multi-bracket HDR lighting, preserving structural depth, true window exposure, and natural interior warmth.",
    sellerImpact: "Stops online buyers in their tracks. Over 95% of buyers first decide whether to visit based on photo quality.",
    image: "/media/properties/136-nw-18th-heritage-hills.jpeg",
    metric: "61MP HDR",
    metricLabel: "Architectural Quality"
  },
  {
    id: "cinematic-video",
    slug: "/services/cinematic-video",
    stepNumber: "03",
    badge: "Step 03 · 60fps Cinema",
    category: "media",
    categoryLabel: "Motion Film",
    title: "Cinema-Grade 4K Motion Walkthrough Film",
    desc: "Stabilized 4K cinematic film capturing light, spatial scale, and living flow with custom audio scoring.",
    executionDetail: "Filmed on cinema-grade gimbal stabilizers with custom color grading and lifestyle pacing that guides buyers seamlessly from the great room to the resort pool pavilion.",
    sellerImpact: "Videos average 14.2k+ views across platforms and build emotional attachment before buyers ever tour in person.",
    image: "/media/gallery/modern-estate-pool-lawn.jpeg",
    metric: "14.2k+",
    metricLabel: "Average Video Views"
  },
  {
    id: "aerial-drone",
    slug: "/services/aerial-drone",
    stepNumber: "04",
    badge: "Step 04 · FAA Drone",
    category: "media",
    categoryLabel: "Aerial Drone",
    title: "FAA Part-107 HD Aerial Drone Mapping",
    desc: "High-altitude 4K drone sweeps capturing property boundaries, roof condition, and neighborhood context.",
    executionDetail: "FAA-certified drone pilots fly sweeps plotting dynamic parcel boundary lines, mature oak canopies, pool loggias, and proximity to golf courses and top-tier schools.",
    sellerImpact: "Shows buyers the exact land scale and privacy buffers that ground-level photos cannot reveal.",
    image: "/media/properties/11500-gateshead.jpg",
    metric: "Part 107",
    metricLabel: "FAA Certified Pilots"
  },
  {
    id: "matterport-3d",
    slug: "/services/matterport-3d",
    stepNumber: "05",
    badge: "Step 05 · 3D Dollhouse",
    category: "media",
    categoryLabel: "3D LiDAR Spatial",
    title: "Strategic 3D Virtual Walkthroughs",
    desc: "Interactive 3D walkthroughs and digital floor plans deployed where strategically optimal for the property.",
    executionDetail: "Detailed spatial camera scans compile an interactive 3D dollhouse model and digital floor plan with measurement tools, tailored to capture out-of-area buyers.",
    sellerImpact: "Enables out-of-state transferees and busy families to explore the property and submit confident offers.",
    image: "/media/gallery/modern-staircase-dining.jpeg",
    metric: "24/7 Global",
    metricLabel: "Tailored 3D Tours"
  },
  {
    id: "global-portals",
    slug: "/services/global-portals",
    stepNumber: "06",
    badge: "Step 06 · 350+ Portals",
    category: "distribution",
    categoryLabel: "Global Distribution",
    title: "Syndication to 350+ Global Luxury Feeds",
    desc: "Instant syndication to Zillow Showcase, Realtor.com Featured, Redfin, MLSOK, and international feeds.",
    executionDetail: "Direct API feeds syndicate your listing to every major national and global portal with enhanced featured status, ensuring your home is never buried by competing listings.",
    sellerImpact: "Guarantees 100% market exposure to all active local, national, and international pre-approved buyers.",
    image: "/media/gallery/brian-jamison-skyline.jpeg",
    metric: "350+ Portals",
    metricLabel: "48 Global Feeds"
  },
  {
    id: "single-property-website",
    slug: "/services/single-property-website",
    stepNumber: "07",
    badge: "Step 07 · Custom URL",
    category: "distribution",
    categoryLabel: "Vanity Domain",
    title: "Dedicated Single-Property Vanity Domain Website",
    desc: "Custom address domain created solely to highlight your listing with zero competitor ads or popups.",
    executionDetail: "We purchase and launch a custom domain (e.g. 1234GrandviewBlvd.com) featuring full-screen 4K video, complete photo albums, floor plans, and seller disclosures.",
    sellerImpact: "Eliminates distracting competitor ads; prospective buyers and their agents are locked into your property's exclusive narrative.",
    image: "/media/properties/3233-n-harvey-crown-heights.jpeg",
    metric: "100% Dedicated",
    metricLabel: "Zero Ad Distraction"
  },
  {
    id: "social-advertising",
    slug: "/services/social-advertising",
    stepNumber: "08",
    badge: "Step 08 · Meta Ads",
    category: "outreach",
    categoryLabel: "Targeted Retargeting",
    title: "Hyper-Targeted Meta Paid Retargeting Campaigns",
    desc: "Targeted paid campaigns reaching active pre-approved buyers, relocating families, and high-intent shoppers across the OKC metro.",
    executionDetail: "Paid targeted advertising campaigns deployed across Instagram & Facebook, targeting active buyers, relocating families, and local professionals searching OKC metro real estate.",
    sellerImpact: "Proactively places your home in front of qualified buyers who aren't browsing MLS feeds daily.",
    image: "/media/gallery/brian-jamison-sunset.jpeg",
    metric: "Targeted Ads",
    metricLabel: "Active Buyer Reach"
  },
  {
    id: "mls-refreshes",
    slug: "/services/mls-refreshes",
    stepNumber: "09",
    badge: "Step 09 · MLS Algorithm",
    category: "outreach",
    categoryLabel: "Search Optimization",
    title: "Active MLS Algorithmic Tuning & Refreshes",
    desc: "Daily algorithmic adjustments to prevent listing stagnation in broker saved-searches and buyer portals.",
    executionDetail: "Unlike passive agents who enter a listing and wait, Brian monitors daily search impressions, rotating the primary hero photo and updating search tags to keep the listing at the top of buyer auto-searches.",
    sellerImpact: "Maintains high urgency and prevents the dreaded 'Days on Market' fatigue that leads to price reductions.",
    image: "/media/properties/22801-n-briarwood-edmond.jpeg",
    metric: "Daily Audit",
    metricLabel: "Zero MLS Stagnation"
  },
  {
    id: "reverse-prospecting",
    slug: "/services/reverse-prospecting",
    stepNumber: "10",
    badge: "Step 10 · Matchmaking",
    category: "outreach",
    categoryLabel: "Broker Matchmaking",
    title: "Reverse Prospecting & Direct Broker Matchmaking",
    desc: "Proactive outreach to buyer agents with clients actively searching within your property's exact price and criteria.",
    executionDetail: "Brian pulls MLS database backend analytics to pinpoint every broker who has an active buyer searching in your exact square footage and price bracket, placing direct telephone calls to pitch your property.",
    sellerImpact: "Creates private showings with pre-qualified buyers before other listings even get noticed.",
    image: "/media/gallery/brian-closing-clients.jpeg",
    metric: "Direct Calls",
    metricLabel: "Pre-Listing Competition"
  }
];

interface ListingStandardsSectionProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const ListingStandardsSection: React.FC<ListingStandardsSectionProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'media' | 'distribution' | 'outreach'>('all');

  const filteredStandards = useMemo(() => {
    if (activeFilter === 'all') return LISTING_STANDARDS_DATA;
    return LISTING_STANDARDS_DATA.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="listing-standards" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Flagship Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#EA580C]/30 text-xs font-bold text-[#EA580C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="tracking-[0.2em] uppercase font-sans">
                When You List With Us · 10-Step Transformation Machine
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight leading-tight">
              What We Do To Your Property
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed mt-4">
              Most agents just put a sign in the yard, upload a few dark iPhone photos, and hope for an offer. Here is the exact 10-step architectural, media, and marketing protocol deployed to transform your property into an emotional, high-demand bidding war.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] border border-[#EA580C]/30 hover:border-[#EA580C]'
              }`}
            >
              All 10 Standards
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('media')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'media'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] border border-[#EA580C]/30 hover:border-[#EA580C]'
              }`}
            >
              Architectural & Media (1–5)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('distribution')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'distribution'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] border border-[#EA580C]/30 hover:border-[#EA580C]'
              }`}
            >
              Distribution (6–7)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('outreach')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'outreach'
                  ? 'bg-[#002D61] text-white shadow-md'
                  : 'bg-white text-[#4B5563] border border-[#EA580C]/30 hover:border-[#EA580C]'
              }`}
            >
              Outreach & Tuning (8–10)
            </button>
          </div>
        </div>

        {/* 10 Standards Grid with Asymmetrical Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredStandards.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-white border-2 border-[#EA580C]/25 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#EA580C] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Graphic Header with Photo & Scrim */}
                <div className="relative h-52 w-full overflow-hidden bg-[#002D61]">
                  {item.id === 'aerial-drone' || item.title?.toLowerCase().includes('drone') || item.categoryLabel?.toLowerCase().includes('drone') ? (
                    <video
                      src="/media/videos/vid2.mp4"
                      poster={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  )}
                  {/* Primary Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001D40]/90 via-[#002D61]/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider bg-[#002D61]/90 backdrop-blur-md text-white border border-white/20">
                      Standard {item.stepNumber}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold bg-[#EA580C] text-white shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title and Key Metric on Graphic */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[10px] uppercase font-sans font-semibold tracking-wider text-[#FB923C] mb-0.5">
                      {item.categoryLabel}
                    </div>
                    <h3 className="font-serif text-lg font-bold !text-white leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Concrete Action Callout: What We Do To Your Property */}
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/25 text-xs text-[#002D61]">
                    <span className="text-[10px] uppercase font-sans font-bold tracking-wider text-[#EA580C] block mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C]" />
                      What We Do To Your Property
                    </span>
                    <p className="text-xs text-[#374151] leading-relaxed font-normal">
                      {item.executionDetail}
                    </p>
                  </div>

                  {/* Seller Value Impact */}
                  <div className="flex items-start gap-2 pt-1 text-xs text-[#4B5563]">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      <strong className="text-[#002D61]">Seller Benefit: </strong>
                      {item.sellerImpact}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions: Link to Dedicated Subpage */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onNavigate(item.slug)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F6] hover:bg-[#002D61] text-[#002D61] hover:text-white border border-[#002D61]/20 hover:border-[#002D61] text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-between cursor-pointer group/btn"
                >
                  <span>Explore Standard Subpage</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EA580C] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Conversion Action Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#EA580C]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-1">
              Guaranteed Execution Standard
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61]">
              Want this exact 10-step protocol applied to your home?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Every step is backed by our 100% Risk-Free Cancel-Anytime Listing Guarantee.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Strategy Call</span>
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-6 py-3.5 bg-white hover:bg-[#FAF9F6] text-[#002D61] border border-[#002D61]/30 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              Get Instant Home Valuation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
