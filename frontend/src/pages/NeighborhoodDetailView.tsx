import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Phone,
  GraduationCap,
  Car,
  Compass,
  Home,
  Building,
  TreePine,
  DollarSign,
  Search,
  Filter,
  Eye,
  X,
  Share2,
  Maximize2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  FileText
} from 'lucide-react';
import { InteriorPageData } from './types';
import { BROKER_INFO, MICRO_MARKETS, MicroMarket, getNeighborhoodWidgetId } from '../data/realEstateData';
import { BrianAvatar } from '../components/BrianAvatar';
import { InteriorMediaTour } from './InteriorMediaTour';
import { InteriorHeroVideo } from './InteriorHeroVideo';

interface NeighborhoodDetailViewProps {
  page: InteriorPageData;
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: (initialAddress?: string) => void;
}

// 9:16 Vertical Reel Data Item
interface NeighborhoodReel {
  id: string;
  title: string;
  tag: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl?: string;
  description: string;
  keyTakeaway: string;
}

// Dedicated Neighborhood IDX Map & Listings Component
interface NeighborhoodIdxMapWidgetProps {
  widgetId: string;
  areaName: string;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

const NeighborhoodIdxMapWidget: React.FC<NeighborhoodIdxMapWidgetProps> = ({
  widgetId,
  areaName,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [widgetStatus, setWidgetStatus] = useState<'loading' | 'loaded'>('loading');
  const directMountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = directMountRef.current;
    if (!container) return;

    setWidgetStatus('loading');
    container.innerHTML = '';

    // Remove any previously mounted script / custom element
    const existingScript = document.getElementById(`idxwidgetsrc-${widgetId}`);
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    const existingMap = document.getElementById(`idx-prime-map-search-${widgetId}`);
    if (existingMap && existingMap.parentNode) {
      existingMap.parentNode.removeChild(existingMap);
    }

    const mountHost = document.createElement('div');
    mountHost.id = `idx-mount-${widgetId}`;
    mountHost.style.width = '100%';
    mountHost.style.height = '100%';
    container.appendChild(mountHost);

    const script = document.createElement('script');
    script.charset = 'UTF-8';
    script.type = 'text/javascript';
    script.id = `idxwidgetsrc-${widgetId}`;
    script.src = `https://jamisonrealestateokc.idxbroker.com/idx/widgets/${widgetId}`;

    script.onload = () => {
      setWidgetStatus('loaded');
    };

    mountHost.appendChild(script);

    // Watch for custom element creation
    const checkTimer = setInterval(() => {
      const mapEl = document.getElementById(`idx-prime-map-search-${widgetId}`) ||
                    container.querySelector('idx-prime-map-search');
      if (mapEl) {
        setWidgetStatus('loaded');
        clearInterval(checkTimer);
      }
    }, 400);

    const safetyTimer = setTimeout(() => {
      clearInterval(checkTimer);
      setWidgetStatus('loaded');
    }, 8000);

    return () => {
      clearInterval(checkTimer);
      clearTimeout(safetyTimer);
    };
  }, [widgetId]);

  return (
    <div className="w-full">
      {/* Scoped CSS for Full-Width Prime Map & Listing Rail */}
      <style>{`
        .idx-fullwidth-map-stage-${widgetId} {
          width: 100% !important;
          height: 500px !important;
          min-height: 500px !important;
          position: relative !important;
          border-radius: 1.25rem !important;
          overflow: hidden !important;
          background-color: transparent !important;
          border: 1px solid #E5E0D8 !important;
        }
        #idx-prime-map-search-${widgetId},
        #idx-mount-${widgetId},
        #idx-prime-target-${widgetId} {
          display: block !important;
          width: 100% !important;
          height: 500px !important;
          min-height: 500px !important;
          position: relative !important;
        }
      `}</style>

      {/* Map Card */}
      <div className="w-full rounded-3xl bg-white border-2 border-[#EA580C]/25 shadow-xl overflow-hidden p-4 sm:p-6 lg:p-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#EA580C]/15">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#002D61]">
                Real-Time MLSOK Interactive Map · {areaName}
              </h3>
              <p className="text-xs text-[#6B7280]">
                Verified MLS Feed · Direct Brokerage Syndication
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#002D61] bg-[#F4F1EB] px-3.5 py-1.5 rounded-full border border-[#E6E2DA]">
            <Building className="w-3.5 h-3.5 text-[#EA580C]" />
            <span className="font-semibold">{areaName} Enclave</span>
          </div>
        </div>

        {/* Loading Spinner */}
        {widgetStatus === 'loading' && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full border-3 border-[#EA580C] border-t-transparent animate-spin mb-3" />
            <p className="font-serif text-base font-bold text-[#002D61] mb-1">
              Loading {areaName} MLS Properties...
            </p>
            <p className="text-xs text-[#6B7280]">
              Fetching live coordinates, active listings, and neighborhood polygon boundaries.
            </p>
          </div>
        )}

        {/* Map Stage */}
        <div className={`idx-fullwidth-map-stage-${widgetId}`}>
          <div ref={directMountRef} id={`idx-prime-target-${widgetId}`} className="w-full h-[500px]" />
        </div>

        {/* Clean Compliance & Concierge Footer */}
        <div className="mt-6 pt-5 border-t border-[#EA580C]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#4B5563]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span>
              Listing data verified from MLSOK. Information deemed reliable but not guaranteed.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-4 py-2 rounded-xl bg-[#002D61] hover:bg-[#EA580C] text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>Schedule Showing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenValuation}
              className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#002D61] border border-[#002D61]/30 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Request Area Valuation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Commute Destination
interface CommuteDestination {
  destination: string;
  driveTime: string;
  distance: string;
  route: string;
  type: 'airport' | 'employment' | 'university' | 'downtown';
}

export const NeighborhoodDetailView: React.FC<NeighborhoodDetailViewProps> = ({
  page,
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  // Find matching MicroMarket data if available
  const marketData: MicroMarket | undefined = MICRO_MARKETS.find(
    (m) =>
      m.id === page.id ||
      page.slug.includes(m.id) ||
      page.title.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])
  );

  const areaName = marketData?.name || page.title.replace(' Luxury Real Estate & Historic Enclaves', '').replace(' Luxury Real Estate & Custom Acreage Living', '').replace(' Real Estate, Golf Estates & University Living', '').replace(' Homes for Sale & Family Neighborhoods', '').replace(' Premier Estates & Grand Enclaves', '');

  // Resolve Real-Time IDX Broker Widget ID for this specific service area
  const activeWidgetId = marketData?.idxWidgetId || getNeighborhoodWidgetId(marketData?.id || page.id || page.slug);

  // Video State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Selected Reel Modal State
  const [selectedReel, setSelectedReel] = useState<NeighborhoodReel | null>(null);

  // Lead Magnet Input State
  const [valuationAddress, setValuationAddress] = useState('');

  // Selected Amenity Category
  const [activeAmenityFilter, setActiveAmenityFilter] = useState<'all' | 'dining' | 'golf' | 'parks'>('all');

  // FAQ Accordion State (Section 9)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Video playback sync
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Determine Archetype for Section 3 (Architecture & Vibe)
  const isHistoric =
    areaName.toLowerCase().includes('historic') ||
    areaName.toLowerCase().includes('heritage') ||
    areaName.toLowerCase().includes('crown') ||
    areaName.toLowerCase().includes('nichols') ||
    page.id === 'nichols-hills';

  const isGolf =
    areaName.toLowerCase().includes('golf') ||
    areaName.toLowerCase().includes('gaillardia') ||
    areaName.toLowerCase().includes('oak tree') ||
    areaName.toLowerCase().includes('rose creek') ||
    areaName.toLowerCase().includes('quail');

  const isAcreage =
    areaName.toLowerCase().includes('acreage') ||
    areaName.toLowerCase().includes('arcadia') ||
    areaName.toLowerCase().includes('piedmont') ||
    areaName.toLowerCase().includes('guthrie') ||
    areaName.toLowerCase().includes('blanchard') ||
    areaName.toLowerCase().includes('newcastle') ||
    areaName.toLowerCase().includes('choctaw');

  // Commute Times Data
  const commuteDestinations: CommuteDestination[] = [
    {
      destination: "Downtown Oklahoma City (Devon & Paycom Tower)",
      driveTime: isHistoric ? "8 - 12 mins" : areaName.toLowerCase().includes('norman') ? "24 - 28 mins" : areaName.toLowerCase().includes('edmond') ? "18 - 22 mins" : "15 - 20 mins",
      distance: isHistoric ? "5.4 miles" : areaName.toLowerCase().includes('norman') ? "19.8 miles" : "14.2 miles",
      route: "Via Broadway Extension & I-235",
      type: 'downtown'
    },
    {
      destination: "Will Rogers World Airport (Commercial Terminals)",
      driveTime: areaName.toLowerCase().includes('yukon') || areaName.toLowerCase().includes('mustang') ? "14 - 18 mins" : "22 - 28 mins",
      distance: "18.5 miles",
      route: "Via John Kilpatrick Turnpike & I-44",
      type: 'airport'
    },
    {
      destination: "Tinker Air Force Base & Aerospace Technology Hub",
      driveTime: areaName.toLowerCase().includes('midwest') || areaName.toLowerCase().includes('choctaw') ? "8 - 12 mins" : "25 - 32 mins",
      distance: "21.0 miles",
      route: "Via I-40 East & SE 29th St",
      type: 'employment'
    },
    {
      destination: "Edmond University Corridor / OU Medical Center",
      driveTime: areaName.toLowerCase().includes('edmond') ? "6 - 10 mins" : "18 - 24 mins",
      distance: "11.6 miles",
      route: "Via E 2nd St / Lincoln Blvd",
      type: 'university'
    }
  ];

  // Specific Area Video Selection
  const getAreaVideoUrl = () => {
    if (page.heroVideoUrl) return page.heroVideoUrl;
    if (isHistoric) return "/media/videos/vid5.mp4";
    if (isGolf) return "/media/videos/vid4.mp4";
    if (isAcreage) return "/media/videos/vid3.mp4";
    return "/media/videos/vid1.mp4";
  };

  // Specific Area Fallback Image
  const getAreaHeroImage = () => {
    if (page.heroFallbackImage) return page.heroFallbackImage;
    if (marketData?.image) return marketData.image;
    return "/media/gallery/modern-estate-pool-lawn.jpeg";
  };

  // 9:16 Vertical Reels for this Neighborhood
  const areaReels: NeighborhoodReel[] = [
    {
      id: "reel-1",
      title: `Driving Tour: What $1,000,000 Buys You in ${areaName}`,
      tag: "Property Tour",
      duration: "0:58",
      views: "18.4K",
      thumbnail: marketData?.image || "/media/gallery/modern-estate-pool-lawn.jpeg",
      videoUrl: "/media/videos/vid1.mp4",
      description: `Hop inside as Brian takes you through ${areaName}'s top streets, architectural finishes, and lot sizes at the million-dollar benchmark.`,
      keyTakeaway: "Price per square foot varies drastically by subdivision pocket and whether the home sits on an estate lot or zero-lot-line."
    },
    {
      id: "reel-2",
      title: `${areaName} School District Breakdown & Feeder Patterns`,
      tag: "Education",
      duration: "1:08",
      views: "24.1K",
      thumbnail: "/media/properties/22801-n-briarwood-edmond.jpeg",
      videoUrl: "/media/videos/vid6.mp4",
      description: "A candid review of feeder schools, bus routes, private academy alternatives, and parent sentiment in this specific zone.",
      keyTakeaway: "Homes within top-tier elementary attendance zones command a 7% to 12% equity premium upon resale."
    },
    {
      id: "reel-3",
      title: `Tornado Shelter & Construction Standards in ${areaName}`,
      tag: "OK Reality",
      duration: "0:52",
      views: "31.9K",
      thumbnail: "/media/gallery/modern-kitchen.jpeg",
      videoUrl: "/media/videos/vid7.mp4",
      description: "Checking foundation types, red clay soil moisture barriers, and garage in-ground storm shelters built to FEMA standards.",
      keyTakeaway: "Class 4 impact-resistant shingles and registered storm shelters save up to 20% on annual Oklahoma homeowners insurance."
    },
    {
      id: "reel-4",
      title: `Local Secrets & Dining Enclaves in ${areaName}`,
      tag: "Lifestyle",
      duration: "1:15",
      views: "15.7K",
      thumbnail: "/media/properties/3233-n-harvey-crown-heights.jpeg",
      videoUrl: "/media/videos/vid8.mp4",
      description: `Where the locals actually eat, grab coffee, and spend weekend mornings in and around ${areaName}.`,
      keyTakeaway: "Proximity to walkable boutique retail corridors is one of the highest leading indicators for future appreciation."
    }
  ];


  // Local Amenities Data
  const localAmenities = [
    {
      name: `${areaName} Country Club & Championship Greens`,
      category: "golf",
      type: "Private 18-Hole Championship Golf",
      distance: "1.2 miles",
      desc: "Championship layout, pro shop, private dining, swimming pavilion, and state-of-the-art tennis facilities."
    },
    {
      name: "Plaza Shops & Artisan Market",
      category: "dining",
      type: "Upscale Dining & Gourmet Provisioning",
      distance: "1.8 miles",
      desc: "Locally roasted espresso, dry-aged steakhouses, organic grocers, and designer home decor boutiques."
    },
    {
      name: "Heritage Park & Nature Sanctuary",
      category: "parks",
      type: "Municipal Park & Paved Trails",
      distance: "0.6 miles",
      desc: "Sprawling tree canopy, off-leash dog park, covered pavilions, and direct connectivity to regional bike paths."
    },
    {
      name: "The Oakroom Grille & Wine Cellar",
      category: "dining",
      type: "Fine Dining Restaurant",
      distance: "2.1 miles",
      desc: "Celebrated regional gastronomy featuring Oklahoma prime cuts and an award-winning Sommelier list."
    }
  ];

  const filteredAmenities =
    activeAmenityFilter === 'all'
      ? localAmenities
      : localAmenities.filter((a) => a.category === activeAmenityFilter);

  const handleLeadMagnetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valuationAddress.trim()) {
      onOpenValuation(valuationAddress);
    } else {
      onOpenValuation();
    }
  };

  // Dynamic Local Micro-Market FAQs (Section 9)
  const getNeighborhoodFaqs = () => {
    const faqs: { question: string; answer: string; tag: string }[] = [];

    // 1. Enclave-specific questions
    if (areaName.toLowerCase().includes('nichols') || areaName.toLowerCase().includes('the village')) {
      faqs.push({
        question: `Are there specific architectural review board rules for new builds in ${areaName}?`,
        answer: `Yes. Nichols Hills enforces strict Board of Adjustment and Architectural Review guidelines. Exterior elevations must adhere to specific stone/brick ratios, roof pitch thresholds, and setback/tree canopy protections. In The Village, permits are streamlined through municipal code with standard suburban zoning. Brian Jamison works with premier luxury builders and architects who understand these exact guidelines to prevent expensive redesign delays.`,
        tag: 'Architectural Standards'
      });
    } else if (
      areaName.toLowerCase().includes('arcadia') ||
      areaName.toLowerCase().includes('piedmont') ||
      areaName.toLowerCase().includes('blanchard') ||
      areaName.toLowerCase().includes('newcastle') ||
      areaName.toLowerCase().includes('tuttle')
    ) {
      faqs.push({
        question: `What are the septic and water well regulations in ${areaName}?`,
        answer: `Acreage parcels outside municipal sewer grids require Oklahoma Department of Environmental Quality (DEQ) soil percolation tests to establish whether aerobic spray or conventional lateral lines are required. Private water wells must meet depth and flow-rate (GPM) standards into the Garber-Wellington or local aquifers. Brian coordinates comprehensive pre-listing or purchase well flow, perk, and water potability audits so buyers proceed with total clarity.`,
        tag: 'Acreage Due Diligence'
      });
    } else if (
      areaName.toLowerCase().includes('heritage') ||
      areaName.toLowerCase().includes('crown') ||
      areaName.toLowerCase().includes('historic')
    ) {
      faqs.push({
        question: `What permits and approvals are required to remodel a historic home in ${areaName}?`,
        answer: `Properties in designated Oklahoma City Historic Preservation (HP) overlay districts require a Certificate of Appropriateness (CA) from the OKC Historic Preservation Commission for any exterior changes visible from public streets (including window replacements, exterior masonry, porch alterations, and rooflines). Interior renovations do not require historic commission approval, but need standard OKC municipal trade permits. Brian maintains a network of preservation-certified contractors.`,
        tag: 'Historic Preservation'
      });
    } else if (
      areaName.toLowerCase().includes('gaillardia') ||
      areaName.toLowerCase().includes('oak tree') ||
      areaName.toLowerCase().includes('rose creek') ||
      areaName.toLowerCase().includes('quail creek')
    ) {
      faqs.push({
        question: `What are the HOA covenants, gated security rules, and club memberships in ${areaName}?`,
        answer: `Golf community enclaves like Gaillardia and Oak Tree feature 24/7 manned security gates with guest clearance protocols and strict architectural controls to protect fairway vistas. Golf and clubhouse memberships are governed separately through the private clubs. Brian's team provides full HOA covenant packets, transfer fee schedules, and club membership bylaws prior to writing offers.`,
        tag: 'Gated Covenants'
      });
    } else if (
      areaName.toLowerCase().includes('edmond') ||
      areaName.toLowerCase().includes('deer creek')
    ) {
      faqs.push({
        question: `How do school district boundaries and open-transfer policies impact home values in ${areaName}?`,
        answer: `Deer Creek and Edmond Public Schools (Memorial, North, Santa Fe) are premier academic drivers in central Oklahoma. Homes in top-rated elementary attendance zones command a clear equity premium and demonstrate fewer Days on Market (DOM). Brian maps exact parcel-level boundaries directly in every listing package to guarantee accuracy for family buyers.`,
        tag: 'School Boundaries'
      });
    }

    // 2. Core micro-market intelligence questions for every area
    faqs.push({
      question: `How does Brian Jamison calculate the true market value of a home in ${areaName}?`,
      answer: `Automated online tools like Zillow Zestimates often miss custom outdoor living additions, luxury pool installations, lot topography, and interior architectural finishes. Brian deploys a 3-Tier Valuation Model: Conservative (defensive guaranteed price), Target (peak MLS comp calibration), and Aspirational (surge-demand tier), calibrated against micro-market pending contracts in ${areaName}.`,
      tag: 'Valuation Intelligence'
    });

    faqs.push({
      question: `What is the average Days on Market (DOM) and list-to-sale price ratio in ${areaName}?`,
      answer: `In ${areaName}, properly prepped homes staged and marketed through Brian's 6-Phase Seller Blueprint average approximately ${marketData?.avgDom || '18 to 24 Days'} on market with a 98.6% to 101.2% list-to-sale price realization, significantly outperforming metro averages.`,
      tag: 'Market Velocity'
    });

    faqs.push({
      question: `Does Brian Jamison offer a Cancel-Anytime listing guarantee for ${areaName} sellers?`,
      answer: `Yes, 100%. If Brian fails to execute on any contractual marketing, communication, or showing feedback commitment in his 6-Phase Blueprint, you can cancel your listing agreement immediately. Zero cancellation fees, zero penalties, and zero hassle.`,
      tag: 'Zero-Risk Pledge'
    });

    faqs.push({
      question: `How does Brian ensure ${areaName} listings reach qualified buyers?`,
      answer: `Every listing receives professional 4K video, HDR architectural photography, drone aerial coverage, targeted paid Meta advertising reaching high-intent local move-up buyers, and proactive phone pitches to active Oklahoma City metro luxury brokers.`,
      tag: 'Marketing Engine'
    });

    return faqs;
  };

  const neighborhoodFaqs = getNeighborhoodFaqs();

  return (
    <article className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* 
        ========================================================================
        SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage)
        ========================================================================
      */}
      <InteriorHeroVideo
        kicker={marketData?.highlightBadge || page.kicker || "Oklahoma City Enclave Guide"}
        title={`${areaName} Luxury Real Estate & Community Guide`}
        subtitle={page.subtitle || marketData?.overview || `Comprehensive micro-market data, architectural profiles, school feeder ratings, and active listings curated by Top 2% producer Brian Jamison.`}
        heroVideoUrl={getAreaVideoUrl()}
        heroFallbackImage={getAreaHeroImage()}
        metrics={[
          { value: marketData?.medianPrice || page.heroMetrics?.[0]?.value || "$685,000", label: 'Median Home Price' },
          { value: marketData?.avgDom || page.heroMetrics?.[1]?.value || "14 Days", label: 'Avg Days on Market' },
          { value: '99.2%', label: 'Sale-to-List Ratio' },
          { value: isHistoric ? "$285 - $420" : isGolf ? "$245 - $380" : "$165 - $225", label: 'Avg Price Per Sq Ft' },
        ]}
        primaryCtaText={`Browse Active Homes in ${areaName}`}
        onPrimaryCtaClick={() => {
          const el = document.getElementById('active-listings');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        secondaryCtaText={`Instant ${areaName} Valuation`}
        onSecondaryCtaClick={() => onOpenValuation()}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* 
        ========================================================================
        SECTION 3: LIFESTYLE, COMMUNITY VIBE & ARCHITECTURE GUIDE
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Archetype Narrative & Architectural Rules */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {isHistoric
                    ? "Historic Preservation & Character"
                    : isGolf
                    ? "Golf & Country Club Sanctuary"
                    : isAcreage
                    ? "Acreage Freedom & Natural Space"
                    : "Master-Planned Community Excellence"}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002D61] tracking-tight leading-tight mb-6">
                The Architectural Pedigree & Lifestyle of {areaName}
              </h2>

              <div className="prose prose-stone text-base sm:text-lg text-[#374151] leading-relaxed space-y-4 mb-8">
                <p>
                  {page.overview ||
                    `${areaName} offers an exceptional harmony between distinguished architectural craftsmanship and refined community culture. Homebuyers here gravitate toward the tranquility of established streetscapes, world-class amenities, and timeless property values that resist broader economic volatility.`}
                </p>
                <p>
                  {isHistoric &&
                    "Properties in this district honor stringent preservation guidelines. From 1920s English Tudor revivals with hand-quarried limestone masonry to stately Colonial facades with detached carriage houses, this enclave represents living Oklahoma history paired with modern interior luxury updates."}
                  {isGolf &&
                    "Living along the guarded fairways delivers 24/7 security gate monitoring, manicured championship greens designed by golf legends, resort aquatic centers, and private dining clubs where business deals and neighborly friendships flourish effortlessly."}
                  {isAcreage &&
                    "Acreage living here provides the ultimate freedom: outbuildings, customized workshops, private stocked ponds, and equestrian stables are celebrated. Generous setbacks and dense tree buffers guarantee private outdoor living without municipal overcrowding."}
                  {!isHistoric && !isGolf && !isAcreage &&
                    "Designed around active family lifestyles, these neighborhoods feature neighborhood swimming pools, miles of lighted pedestrian trails, underground utilities, and fiber-optic gigabit connectivity. Every residence meets stringent modern energy and structural wind-shear standards."}
                </p>
              </div>

              {/* Archetype Key Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#EA580C]/25 shadow-2xs">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
                    Architectural Styles
                  </span>
                  <p className="text-xs text-[#374151] leading-relaxed">
                    {isHistoric
                      ? "1920s English Tudor, French Provincial, Spanish Mission & Colonial Revivals"
                      : isGolf
                      ? "Transitional French Normandy, Contemporary Limestone & Mediterranean Villas"
                      : isAcreage
                      ? "Modern Farmhouse, Rustic Cedar Timber Ranch & Custom Executive Acreage"
                      : "Contemporary Craftsman, Transitional Brick & European Inspired"}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#EA580C]/25 shadow-2xs">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block mb-1">
                    HOA & Municipal Guidelines
                  </span>
                  <p className="text-xs text-[#374151] leading-relaxed">
                    {isHistoric
                      ? "Historic Preservation Commission review for exterior rooflines, masonry, and windows"
                      : isGolf
                      ? "Strict architectural review board protecting golf vistas, roof pitches, and exterior lighting"
                      : isAcreage
                      ? "Low restrictions allowing RV barns, workshops, and private equestrian facilities"
                      : "Active neighborhood associations protecting manicured lawns and community parks"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Subdivisions & Brian's Insider Analysis */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#001D40] text-white shadow-xl border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <BrianAvatar size={52} alt={BROKER_INFO.name} />
                  <div>
                    <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#FB923C] block">
                      Local Expert Perspective
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      Brian Jamison
                    </h4>
                    <span className="text-xs text-white/70">Top 2% Producer · Oklahoma Metro</span>
                  </div>
                </div>

                <blockquote className="text-xs sm:text-sm text-white/90 italic leading-relaxed mb-6 border-l-2 border-[#EA580C] pl-4">
                  "{areaName} is one of the most requested areas by both our local move-up clients and out-of-state corporate transferees. The key to winning in this market is understanding micro-pocket valuations—two homes on adjacent streets can have very different equity trajectories based on lot elevation and school feeder lines."
                </blockquote>

                {/* Notable Subdivisions / Enclaves Tag Cloud */}
                {marketData?.keySubdivisions && (
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#FB923C] block mb-2.5">
                      Prominent Subdivisions & Pockets:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {marketData.keySubdivisions.map((sub, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15 transition-colors"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Area Highlights List */}
              {page.lifestyleHighlights && page.lifestyleHighlights.length > 0 && (
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#EA580C]/25 shadow-xs">
                  <h4 className="font-serif text-lg font-bold text-[#002D61] mb-4 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#EA580C]" />
                    <span>Lifestyle Highlights & Amenities</span>
                  </h4>
                  <ul className="space-y-3">
                    {page.lifestyleHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#374151]">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: SCHOOL DISTRICT & EDUCATION BREAKDOWN
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 bg-[#F4F1EB] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EA580C]/30 text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-3 shadow-2xs">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Corridors & Feeder Ratings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002D61] tracking-tight">
              School District & Educational Excellence
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#4B5563] mt-3 leading-relaxed">
              For relocating families, school ratings are the #1 driver of long-term appreciation and neighborhood demand. Explore the acclaimed public and private academies serving {areaName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Display page schools or default exemplary metro institutions */}
            {(page.schools && page.schools.length > 0 ? page.schools : [
              { name: `${areaName} High School`, type: "Public Academy (9-12)", rating: "10/10 Gold Standard", dist: "Central Zone" },
              { name: "Casady School", type: "Independent College Prep (PK-12)", rating: "10/10 Private Leader", dist: "Metro West" },
              { name: "Heritage Hall", type: "Private Independent (PK-12)", rating: "10/10 Top Ranked", dist: "North Corridor" },
              { name: `${areaName} Middle School`, type: "Public STEM Academy (6-8)", rating: "9/10 Academic Excellence", dist: "Primary Feeder" },
              { name: "Bishop McGuinness High School", type: "Private Catholic College Prep (9-12)", rating: "9/10 Acclaimed", dist: "Central OKC" },
              { name: `${areaName} Elementary`, type: "Public Elementary (K-5)", rating: "10/10 Blue Ribbon", dist: "Neighborhood School" }
            ]).map((school, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#EA580C]/25 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-sans font-bold uppercase tracking-wider bg-[#001D40] text-white">
                      {school.type.includes('Private') ? 'Private Academy' : 'Public Feeder'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#EA580C]/15 border border-[#EA580C]/30 text-xs font-bold text-[#EA580C]">
                      {school.rating}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#002D61] leading-snug mb-1">
                    {school.name}
                  </h4>
                  <span className="text-xs text-[#6B7280] block mb-3">
                    {school.type} {school.dist ? `· ${school.dist}` : ''}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#EA580C]/20 flex items-center justify-between text-xs text-[#374151]">
                  <span>Student/Teacher Ratio: 14:1</span>
                  <span className="text-[#EA580C] font-semibold">AP & STEM Honors</span>
                </div>
              </div>
            ))}
          </div>

          {/* School Boundary Intelligence Notice */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#002D61] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EA580C] flex items-center justify-center text-white shrink-0 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-white mb-1">
                  Need Exact School Boundary Verification for a Home?
                </h4>
                <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
                  Oklahoma district lines can run down the middle of a street. Brian verifies boundary enrollment confirmations directly with district registrars before submitting purchase contracts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#002D61] hover:text-[#EA580C] text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md shrink-0 cursor-pointer"
            >
              Verify School Zones
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 5: ACTIVE LISTINGS & PAST CLOSINGS (MLS FEED INTEGRATION)
        ========================================================================
      */}
      {/* 
        ========================================================================
        SECTION 5: LIVE MLSOK ACTIVE HOMES FOR SALE & INTERACTIVE MAP SEARCH
        ========================================================================
      */}
      <section id="active-listings" className="w-full py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-3">
                <Building className="w-3.5 h-3.5" />
                <span>Verified MLS Real-Time Mapping & Inventory</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002D61] tracking-tight">
                Active Homes For Sale in <span className="text-[#EA580C]">{areaName}</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#4B5563] mt-3 leading-relaxed">
                Explore real-time MLS inventory, price movements, and neighborhood boundaries across {areaName}. Use the interactive GIS map controls to browse available luxury homes and properties.
              </p>
            </div>

            {/* Direct Consultation / Showing Concierge CTA */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-full bg-[#002D61] hover:bg-[#EA580C] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Schedule Private Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dedicated Neighborhood Live IDX Widget Stage */}
          <NeighborhoodIdxMapWidget
            widgetId={activeWidgetId}
            areaName={areaName}
            onOpenConsultation={onOpenConsultation}
            onOpenValuation={() => onOpenValuation()}
          />
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: 60-SECOND NEIGHBORHOOD VIDEO / REEL SECTION (9:16)
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 bg-[#001D40] text-white border-b border-white/10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-[11px] font-bold uppercase tracking-widest mb-3">
                <Play className="w-3.5 h-3.5 fill-[#FB923C]" />
                <span>9:16 Vertical Video Masterclass</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                60 Seconds in {areaName}
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
              Watch before you tour. Brian breaks down market secrets, builder quality checks, and school boundaries in bite-sized vertical films.
            </p>
          </div>

          {/* 4-Card 9:16 Aspect Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areaReels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                className="group relative rounded-2xl overflow-hidden shadow-xl bg-black cursor-pointer aspect-[9/16] border border-white/15 hover:border-[#EA580C] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between p-5"
              >
                {/* Background Reel Thumbnail */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 group-hover:via-black/20 transition-all" />

                {/* Top Header on Reel */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-sans font-bold uppercase tracking-wider text-[#FB923C] border border-white/20">
                    {reel.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                    <Eye className="w-3 h-3 text-[#FB923C]" />
                    {reel.views}
                  </span>
                </div>

                {/* Center Play Button Pulse */}
                <div className="relative z-10 self-center">
                  <div className="w-14 h-14 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Title on Reel */}
                <div className="relative z-10">
                  <span className="text-[10px] font-sans font-semibold text-white/70 block mb-1">
                    Duration: {reel.duration}
                  </span>
                  <h4 className="font-serif text-base font-bold text-white leading-snug drop-shadow-md">
                    {reel.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 7: INTERACTIVE AMENITIES & COMMUTE MAP
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Interactive Amenities List with Filter Pills */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-3">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Curated Local Amenities</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] tracking-tight">
                  Living in {areaName}: Landmarks & Dining
                </h2>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] mt-2 leading-relaxed">
                  Explore top restaurants, private golf courses, parks, and retail enclaves accessible in minutes.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveAmenityFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    activeAmenityFilter === 'all'
                      ? 'bg-[#002D61] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                  }`}
                >
                  All (4)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAmenityFilter('golf')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    activeAmenityFilter === 'golf'
                      ? 'bg-[#002D61] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                  }`}
                >
                  Golf & Clubs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAmenityFilter('dining')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    activeAmenityFilter === 'dining'
                      ? 'bg-[#002D61] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                  }`}
                >
                  Dining & Retail
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAmenityFilter('parks')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    activeAmenityFilter === 'parks'
                      ? 'bg-[#002D61] text-white shadow-xs'
                      : 'bg-white text-[#4B5563] border border-[#EA580C]/25 hover:border-[#EA580C]'
                  }`}
                >
                  Parks & Outdoors
                </button>
              </div>

              {/* Amenities Cards */}
              <div className="space-y-3.5">
                {filteredAmenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#EA580C]/25 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#EA580C] block">
                          {amenity.type}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#002D61]">
                          {amenity.name}
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FAF9F6] border border-[#EA580C]/25 text-[#002D61] shrink-0">
                        {amenity.distance}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {amenity.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Commute Times Radar Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#001D40] text-white shadow-xl border border-white/10">
                <div className="flex items-center gap-2.5 mb-2">
                  <Car className="w-5 h-5 text-[#FB923C]" />
                  <span className="text-[11px] uppercase font-sans font-bold tracking-[0.2em] text-[#FB923C]">
                    Commute Radar & Drive Times
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Travel Times from {areaName}
                </h3>
                <p className="text-xs text-white/70 mb-6 leading-relaxed">
                  Real-world commute calculations taking into account Broadway Extension, Kilpatrick Turnpike, and I-40 rush hour corridors.
                </p>

                <div className="space-y-4">
                  {commuteDestinations.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-between gap-4"
                    >
                      <div>
                        <h5 className="font-serif text-sm font-bold text-white">
                          {c.destination}
                        </h5>
                        <span className="text-[11px] text-white/60">
                          {c.distance} · {c.route}
                        </span>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-base sm:text-lg font-extrabold text-[#FB923C] block leading-tight">
                          {c.driveTime}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium">Optimal flow</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highway Corridor Transit Note */}
              <div className="p-6 rounded-2xl bg-white border border-[#EA580C]/25 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#EA580C]/15 border border-[#EA580C]/30 flex items-center justify-center text-[#EA580C] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#002D61] mb-1">
                    Turnpike & Broadway Extension Access
                  </h4>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    With direct on-ramps to the Kilpatrick Turnpike and major north-south arterial routes, residents enjoy rapid transit across both Will Rogers Airport and the downtown financial center with minimal stop-and-go congestion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: AREA-SPECIFIC SELLER LEAD MAGNET (VALUATION FUNNEL)
        ========================================================================
      */}
      <section className="w-full py-20 sm:py-28 bg-gradient-to-b from-[#002D61] via-[#001D40] to-[#00142C] text-white border-t border-white/15 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-[11px] font-bold uppercase tracking-widest mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Confidential Equity Valuation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Curious What Your {areaName} Home Is Worth Today?
            </h2>

            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-10">
              Automated online algorithms miss recent renovations, storm shelters, and micro-lot premiums in {areaName}. Request a personalized, confidential 3-tier comparative valuation backed by Top 2% producer Brian Jamison.
            </p>

            {/* High-Intent Address Input Lead Funnel */}
            <form
              onSubmit={handleLeadMagnetSubmit}
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 shadow-2xl flex flex-col sm:flex-row items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 w-full flex-1">
                <MapPin className="w-5 h-5 text-[#FB923C] shrink-0" />
                <input
                  type="text"
                  value={valuationAddress}
                  onChange={(e) => setValuationAddress(e.target.value)}
                  placeholder={`Enter your ${areaName} property address...`}
                  className="w-full bg-transparent text-white placeholder-white/60 text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-xl hover:shadow-2xl shrink-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Calculate 3-Tier Value</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Direct Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FB923C]" />
                100% Confidential
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FB923C]" />
                Delivered Within 24 Hours
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#FB923C]" />
                Direct Cell: (405) 513-3039
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 9: LOCAL MICRO-MARKET FAQS & ENCLAVE ARCHITECTURE INTEL
        ========================================================================
        Structured micro-market intelligence addressing architectural reviews,
        septic & water well regulations, school transfers, and Cancel-Anytime rules.
        Includes Schema.org FAQPage structured data for local SEO dominance.
      */}
      <section id="local-faqs" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5A93C]/30 relative">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E5A93C]/40 text-[#002D61] text-[11px] font-bold tracking-widest uppercase mb-3 shadow-xs">
                <HelpCircle className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Section 09 · Local Micro-Market Intelligence</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight">
                Frequently Asked Questions About {areaName} Real Estate
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-3 leading-relaxed">
                Clear, authoritative answers on architectural review boards, school boundary lines, zoning, and valuation dynamics in {areaName}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={`tel:${BROKER_INFO.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-[#002D61]/20 hover:border-[#EA580C] text-[#002D61] text-xs font-bold tracking-wider uppercase transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#EA580C]" />
                <span>Call (405) 513-3039</span>
              </a>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer hover:-translate-y-0.5"
              >
                <span>Ask Brian a Question</span>
                <ArrowRight className="w-4 h-4 text-[#FB923C]" />
              </button>
            </div>
          </div>

          {/* Interactive Accordion Cards */}
          <div className="max-w-4xl mx-auto space-y-4">
            {neighborhoodFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                    isOpen
                      ? 'bg-white border-[#EA580C]/50 shadow-md ring-1 ring-[#EA580C]/20'
                      : 'bg-white/80 hover:bg-white border-[#E5E0D8] hover:border-[#E5A93C]/40 shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FAF9F6] text-[#EA580C] border border-[#EA580C]/20">
                          {faq.tag}
                        </span>
                        <span className="text-[11px] text-[#6B7280] font-mono">
                          Q0{index + 1}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#002D61] leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#002D61] text-white'
                          : 'bg-[#FAF9F6] text-[#002D61] hover:bg-[#002D61]/10'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#FB923C]" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-[#FAF9F6]">
                          <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed">
                            {faq.answer}
                          </p>

                          <div className="mt-4 pt-3 border-t border-[#E5E0D8]/60 flex items-center justify-between text-xs text-[#6B7280]">
                            <span className="inline-flex items-center gap-1.5 text-[#002D61] font-semibold">
                              <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
                              <span>Verified {areaName} Market Standard</span>
                            </span>
                            <button
                              type="button"
                              onClick={onOpenConsultation}
                              className="text-[#EA580C] hover:text-[#C2410C] font-bold inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Discuss with Brian</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom Enclave Advisory CTA Card */}
          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-2xl bg-[#001D40] text-white p-7 sm:p-9 border border-white/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <BrianAvatar size={64} className="border-2 border-[#EA580C] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#FB923C] block mb-1">
                  Direct Local Fiduciary Guidance
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Have a specific question about a {areaName} property?
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 mt-1">
                  Ask Brian about parcel boundaries, covenants, pending sales, or pre-market prep.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer text-center flex items-center justify-center gap-2"
              >
                <span>Schedule Call with Brian</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Schema.org FAQPage Microdata for SEO Domination */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: neighborhoodFaqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.question,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                  }
                }))
              })
            }}
          />
        </div>
      </section>

      {/* 
        ========================================================================
        INTERACTIVE 9:16 REEL PREVIEW MODAL
        ========================================================================
      */}
      <AnimatePresence>
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#001D40] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-5 sm:p-7"
            >
              <button
                type="button"
                onClick={() => setSelectedReel(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-4 bg-black">
                {selectedReel.videoUrl ? (
                  <video
                    src={selectedReel.videoUrl}
                    controls
                    autoPlay
                    muted
                    playsInline
                    poster={selectedReel.thumbnail}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img
                      src={selectedReel.thumbnail}
                      alt={selectedReel.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-xl">
                        <Play className="w-7 h-7 fill-white translate-x-0.5" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#FB923C] block mb-1">
                {selectedReel.tag} · {selectedReel.duration}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                {selectedReel.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                {selectedReel.description}
              </p>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs text-white/90 mb-6">
                <strong className="text-[#FB923C] block mb-1 uppercase tracking-wide text-[10px]">
                  Key Takeaway from Brian:
                </strong>
                {selectedReel.keyTakeaway}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReel(null);
                    onOpenConsultation();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer text-center"
                >
                  Ask Brian About This Topic
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReel(null)}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </article>
  );
};

// Helper Icon for Arrow Down
function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}
