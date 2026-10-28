import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Eye,
  Clock,
  Video as VideoIcon,
  Search,
  Shield,
  Phone,
  ArrowRight,
  Compass,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from '../components/BrianAvatar';

export interface PropertyVideoItem {
  id: string;
  title: string;
  neighborhood: string;
  city: string;
  category: 'luxury' | 'drone' | 'tours' | 'stories';
  categoryLabel: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views: string;
  specs: string;
  description: string;
  featured?: boolean;
}

export const PROPERTY_VIDEOS: PropertyVideoItem[] = [
  {
    id: "vid-1",
    title: "The Grandview Estate - French Limestone Manor",
    neighborhood: "Nichols Hills",
    city: "Oklahoma City, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid1.mp4",
    thumbnail: "/media/gallery/modern-estate-pool-lawn.jpeg",
    duration: "2:15",
    views: "24.6K",
    specs: "5 Beds · 6 Baths · 6,840 Sq Ft",
    description: "An architectural tour-de-force with French limestone facade, 24-ft cathedral ceilings, chef's scullery, wine cellar, and resort-caliber pool pavilion.",
    featured: true
  },
  {
    id: "vid-2",
    title: "The Oak Crest Horizon - Fairway Living",
    neighborhood: "Gaillardia Golf Community",
    city: "Oklahoma City, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid2.mp4",
    thumbnail: "/media/properties/11500-gateshead.jpg",
    duration: "1:58",
    views: "31.2K",
    specs: "5 Beds · 5.5 Baths · 5,200 Sq Ft",
    description: "24/7 guard-gated country club frontage overlooking the 16th green. Iron-railed terraces, double primary dressing suites, and custom smart automation.",
    featured: true
  },
  {
    id: "vid-3",
    title: "Bear Creek 20-Acre Executive Acreage & Pond",
    neighborhood: "Guthrie Foothills",
    city: "Guthrie, OK",
    category: "drone",
    categoryLabel: "FAA Drone Mapping",
    videoUrl: "/media/videos/vid3.mp4",
    thumbnail: "/media/properties/9687-bear-creek-guthrie.jpeg",
    duration: "1:42",
    views: "19.8K",
    specs: "20.4 Rolling Acres · Private Spring-Fed Pond",
    description: "Topographical drone survey capturing rolling elevation contours, native hardwood canopies, and optimal luxury building envelopes.",
    featured: true
  },
  {
    id: "vid-4",
    title: "Behind the Lens: Nichols Hills 4K Production",
    neighborhood: "Nichols Hills",
    city: "Oklahoma City, OK",
    category: "stories",
    categoryLabel: "Production Story",
    videoUrl: "/media/videos/vid4.mp4",
    thumbnail: "/media/gallery/modern-staircase-dining.jpeg",
    duration: "1:18",
    views: "15.7K",
    specs: "Part 107 Drone & Matterport 3D Showcase",
    description: "Follow Brian Jamison's production crew as they map natural lighting angles and high-bitrate gimbal passes for high-net-worth buyers."
  },
  {
    id: "vid-5",
    title: "Cancel-Anytime Listing Guarantee Explained",
    neighborhood: "Edmond & OKC Metro",
    city: "Edmond, OK",
    category: "stories",
    categoryLabel: "Advisory & Blueprint",
    videoUrl: "/media/videos/vid5.mp4",
    thumbnail: "/media/gallery/brian-closing-clients.jpeg",
    duration: "1:05",
    views: "22.3K",
    specs: "Zero-Risk Fiduciary Accountability",
    description: "Why Brian backs every listing with a written cancel-anytime guarantee. Full alignment, zero hostage contracts, and corporate office backing."
  },
  {
    id: "vid-6",
    title: "Covell Corridor East Edmond Custom Walkthrough",
    neighborhood: "East Edmond",
    city: "Edmond, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid6.mp4",
    thumbnail: "/media/properties/22801-n-briarwood-edmond.jpeg",
    duration: "2:04",
    views: "28.4K",
    specs: "4 Beds · 3.5 Baths · 3,150 Sq Ft",
    description: "Pre-market trade fix-ups executed to perfection. Modern Scandinavian kitchen remodel, bespoke light fixture curation, and seamless indoor-outdoor flow."
  },
  {
    id: "vid-7",
    title: "Newcastle Horizon 10-Acre Country Estate",
    neighborhood: "Newcastle Enclave",
    city: "Newcastle, OK",
    category: "drone",
    categoryLabel: "FAA Drone Mapping",
    videoUrl: "/media/videos/vid7.mp4",
    thumbnail: "/media/properties/2950-nw-37th-newcastle.jpeg",
    duration: "1:35",
    views: "17.1K",
    specs: "10.0 Wooded Acres · Shop Ready",
    description: "Panoramic aerial mapping showing boundary fence lines, soil percolation audit zones, and three-phase electric access corridors."
  },
  {
    id: "vid-8",
    title: "Heritage Hills Historic Restoration Walkthrough",
    neighborhood: "Heritage Hills",
    city: "Oklahoma City, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid8.mp4",
    thumbnail: "/media/properties/136-nw-18th-heritage-hills.jpeg",
    duration: "2:20",
    views: "34.5K",
    specs: "4 Beds · 3.5 Baths · 3,820 Sq Ft",
    description: "Timeless 1920s architecture meticulously updated with museum-grade HVAC, custom millwork restoration, and an expansive covered veranda."
  },
  {
    id: "vid-9",
    title: "Crown Heights Architectural Tudor Showcase",
    neighborhood: "Crown Heights",
    city: "Oklahoma City, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid9.mp4",
    thumbnail: "/media/properties/3233-n-harvey-crown-heights.jpeg",
    duration: "1:52",
    views: "21.9K",
    specs: "4 Beds · 3 Baths · 3,220 Sq Ft",
    description: "Steep-pitched gables, hand-laid brick masonry, and leaded glass windows paired with a 2026 designer chef's kitchen and primary retreat."
  },
  {
    id: "vid-10",
    title: "Professional Cinematic Video Standards",
    neighborhood: "Edmond Corporate Office",
    city: "Edmond, OK",
    category: "stories",
    categoryLabel: "Advisory & Blueprint",
    videoUrl: "/media/videos/vid10.mp4",
    thumbnail: "/media/gallery/midcentury-entry.jpeg",
    duration: "1:15",
    views: "14.2K",
    specs: "10-Bit 4K Cinema Gear & Color Grading",
    description: "An inside breakdown of why cell phone photos fail to capture luxury buyer attention and how our multi-camera shoots create instant buyer competition."
  },
  {
    id: "vid-11",
    title: "FAA Drone Mapping Standards & Boundary Overlays",
    neighborhood: "Arcadia & Guthrie",
    city: "Arcadia, OK",
    category: "drone",
    categoryLabel: "FAA Drone Mapping",
    videoUrl: "/media/videos/vid11.mp4",
    thumbnail: "/media/properties/11616-estrella-arcadia.jpeg",
    duration: "1:40",
    views: "18.3K",
    specs: "Licensed Part 107 Commercial Flight",
    description: "See how we map property lot lines, elevation grades, easements, and neighboring estates with legal FAA airspace compliance."
  },
  {
    id: "vid-12",
    title: "Oak Tree Country Club Fairway Retreat",
    neighborhood: "Oak Tree National",
    city: "Edmond, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid12.mp4",
    thumbnail: "/media/gallery/infinity-pool-hills.jpeg",
    duration: "2:08",
    views: "27.8K",
    specs: "4 Beds · 4.5 Baths · 4,800 Sq Ft",
    description: "Championship golf course vistas, private putting green, heated salt-water pool, and temperature-controlled 800-bottle wine tasting cellar."
  },
  {
    id: "vid-13",
    title: "Estrella Court Arcadia Acreage Enclave",
    neighborhood: "Arcadia Luxury Corridor",
    city: "Arcadia, OK",
    category: "drone",
    categoryLabel: "FAA Drone Mapping",
    videoUrl: "/media/videos/vid13.mp4",
    thumbnail: "/media/properties/11616-estrella-arcadia.jpeg",
    duration: "1:50",
    views: "23.1K",
    specs: "5.2 Wooded Acres · Gated Community",
    description: "Pristine wooded acreage in one of Arcadia's most exclusive gated enclaves. Drone footage highlights custom build sites and private nature trails."
  },
  {
    id: "vid-14",
    title: "Single-Property Dedicated Domain Showcase",
    neighborhood: "Edmond & Nichols Hills",
    city: "Edmond, OK",
    category: "stories",
    categoryLabel: "Advisory & Blueprint",
    videoUrl: "/media/videos/vid14.mp4",
    thumbnail: "/media/gallery/modern-kitchen.jpeg",
    duration: "1:10",
    views: "16.4K",
    specs: "Bespoke Web Domains for Flagship Listings",
    description: "How a custom web address (e.g. 1234GrandviewBlvd.com) eliminates competitor ads and delivers edge-to-edge 4K video directly to serious buyers."
  },
  {
    id: "vid-15",
    title: "Deer Creek Modern Farmhouse Walkthrough",
    neighborhood: "Deer Creek Corridor",
    city: "Edmond, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid15.mp4",
    thumbnail: "/media/properties/715-s-friendly-okc.jpeg",
    duration: "2:12",
    views: "30.1K",
    specs: "4 Beds · 3 Baths · 2,980 Sq Ft",
    description: "Board-and-batten exterior, expansive quartz waterfall island, vaulted shiplap ceilings, and custom-built mudroom lockers for family living."
  },
  {
    id: "vid-16",
    title: "Norman Two-Time Listing Success Story",
    neighborhood: "University Enclave",
    city: "Norman, OK",
    category: "stories",
    categoryLabel: "Production Story",
    videoUrl: "/media/videos/vid16.mp4",
    thumbnail: "/media/properties/1817-sun-valley-edmond.jpeg",
    duration: "1:25",
    views: "26.7K",
    specs: "Sold Twice (2022 & 2024) · Remote Out-of-State Sellers",
    description: "Client Huiwen Lin shares how Brian managed trades, staging, and showings completely hands-off while the owners lived out-of-state."
  },
  {
    id: "vid-17",
    title: "Watonga Ranch & Agricultural Parcel Flyover",
    neighborhood: "Northwest Oklahoma",
    city: "Watonga, OK",
    category: "drone",
    categoryLabel: "FAA Drone Mapping",
    videoUrl: "/media/videos/vid17.mp4",
    thumbnail: "/media/properties/85006-n-2520-watonga.jpeg",
    duration: "1:48",
    views: "13.9K",
    specs: "160 Acres Pasture & Native Grass",
    description: "Expansive multi-quarter section agricultural parcel with perimeter fencing, live water creek, and commercial cattle handling pens."
  },
  {
    id: "vid-18",
    title: "Central Edmond Turnkey Renovation Walkthrough",
    neighborhood: "Central Edmond",
    city: "Edmond, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid18.mp4",
    thumbnail: "/media/properties/22402-emily-way-edmond.jpeg",
    duration: "1:55",
    views: "19.4K",
    specs: "3 Beds · 2 Baths · 2,180 Sq Ft",
    description: "Full investor turnaround managed start-to-finish by Brian Jamison. Engineered hardwood, designer tile baths, and low-maintenance landscaping."
  },
  {
    id: "vid-19",
    title: "Heritage Hills Architectural Detail Study",
    neighborhood: "Heritage Hills",
    city: "Oklahoma City, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid19.mp4",
    thumbnail: "/media/properties/435-nw-21st-heritage-hills.jpeg",
    duration: "2:24",
    views: "36.2K",
    specs: "5 Beds · 4 Baths · 4,200 Sq Ft",
    description: "Close-up macro cinematography capturing handcrafted brass hardware, original quartersawn oak floors, and leaded stained glass sidelights."
  },
  {
    id: "vid-20",
    title: "Tuttle River Valley 40-Acre Equestrian Tour",
    neighborhood: "Tuttle Enclave",
    city: "Tuttle, OK",
    category: "drone",
    categoryLabel: "FAA Drone Mapping",
    videoUrl: "/media/videos/vid20.mp4",
    thumbnail: "/media/properties/1111-colonial-tuttle.jpeg",
    duration: "2:02",
    views: "21.5K",
    specs: "40.0 Acres · 6-Stall Horse Barn & Arena",
    description: "Top-tier equestrian facility with pipe-fenced paddocks, insulated tack room, covered training round-pen, and luxury executive residence."
  },
  {
    id: "vid-21",
    title: "Downtown OKC Urban Loft & Skyline Views",
    neighborhood: "Downtown OKC",
    city: "Oklahoma City, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid21.mp4",
    thumbnail: "/media/properties/616-nw-6th-downtown.jpeg",
    duration: "1:38",
    views: "25.1K",
    specs: "2 Beds · 2.5 Baths · 2,400 Sq Ft",
    description: "Exposed brick, concrete ceilings, floor-to-ceiling curtain walls, and a private rooftop sunset deck with panoramic downtown skyline vistas."
  },
  {
    id: "vid-22",
    title: "Southwest OKC Contingency Rescue Case Study",
    neighborhood: "Southwest OKC",
    city: "Oklahoma City, OK",
    category: "stories",
    categoryLabel: "Production Story",
    videoUrl: "/media/videos/vid22.mp4",
    thumbnail: "/media/properties/13701-s-independence-okc.jpeg",
    duration: "1:14",
    views: "18.9K",
    specs: "Under Contract in 9 Days After Prior Agent Stalled",
    description: "How Brian restructured listing media, replaced dim smartphone photos with high-definition video, and closed above asking price."
  },
  {
    id: "vid-23",
    title: "Sienna Ridge Newcastle Architectural Walkthrough",
    neighborhood: "Sienna Ridge",
    city: "Newcastle, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid23.mp4",
    thumbnail: "/media/properties/3910-sienna-ridge-newcastle.jpeg",
    duration: "2:06",
    views: "22.8K",
    specs: "4 Beds · 3.5 Baths · 3,450 Sq Ft",
    description: "Sprawling custom ranch with vaulted cedar-beam living room, oversized 3-car garage, and sweeping sunrise views over greenbelt pasture."
  },
  {
    id: "vid-24",
    title: "Creek Bank Edmond Wooded Lot Tour",
    neighborhood: "Creek Bank",
    city: "Edmond, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid24.mp4",
    thumbnail: "/media/properties/3911-creek-bank-edmond.jpeg",
    duration: "1:59",
    views: "24.3K",
    specs: "4 Beds · 3 Baths · 3,100 Sq Ft",
    description: "Tucked into mature trees in North Edmond. Walk through the private outdoor entertaining kitchen, fire pit lounge, and primary suite sanctuary."
  },
  {
    id: "vid-25",
    title: "Golden Hour Exterior Lighting Showcase",
    neighborhood: "Edmond & Nichols Hills",
    city: "Edmond, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid25.mp4",
    thumbnail: "/media/gallery/sunset-window-terrace.jpeg",
    duration: "1:44",
    views: "33.7K",
    specs: "Dusk Architectural Photography & Video",
    description: "Lighting makes or breaks luxury perceived value. Watch how our dusk cinematic sessions evoke high emotional connection with prime buyers."
  },
  {
    id: "vid-26",
    title: "Chef's Scullery & Modern Kitchen Tour",
    neighborhood: "Nichols Hills",
    city: "Oklahoma City, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid26.mp4",
    thumbnail: "/media/gallery/modern-kitchen.jpeg",
    duration: "1:32",
    views: "29.4K",
    specs: "Sub-Zero & Wolf Commercial Appliances",
    description: "Double slab quartzite islands, hidden butler's scullery pantry, integrated Miele espresso bar, and custom soft-close rift white oak cabinetry."
  },
  {
    id: "vid-27",
    title: "Resort Pool Pavilion & Outdoor Loggia Tour",
    neighborhood: "Gaillardia",
    city: "Oklahoma City, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid27.mp4",
    thumbnail: "/media/gallery/sunset-deck-pool.jpeg",
    duration: "2:01",
    views: "31.8K",
    specs: "Zero-Edge Infinity Pool & Cabana",
    description: "Step outside into complete private luxury: heated salt-water pool with sunken firepit, outdoor kitchen with gas rotisserie, and motorized screens."
  },
  {
    id: "vid-28",
    title: "Master Suite & Spa Retreat Experience",
    neighborhood: "East Edmond",
    city: "Edmond, OK",
    category: "tours",
    categoryLabel: "Walkthrough Tour",
    videoUrl: "/media/videos/vid28.mp4",
    thumbnail: "/media/gallery/midcentury-entry.jpeg",
    duration: "1:47",
    views: "20.6K",
    specs: "Dual Dressing Rooms & Freestanding Soaking Tub",
    description: "Calacatta marble walk-in shower with dual rain heads, backlit vanity mirrors, heated tile flooring, and custom boutique walk-in closets."
  },
  {
    id: "vid-29",
    title: "Hill Country Driveway Approach & Motor Court",
    neighborhood: "Arcadia Hills",
    city: "Arcadia, OK",
    category: "luxury",
    categoryLabel: "Luxury Estate",
    videoUrl: "/media/videos/vid29.mp4",
    thumbnail: "/media/gallery/hill-country-driveway.jpeg",
    duration: "1:56",
    views: "27.2K",
    specs: "Gated Quarter-Mile Winding Private Drive",
    description: "Experience the arrival sequence: private iron security gates, manicured tree canopy, circular motor court, and four-car carriage garage."
  },
  {
    id: "vid-30",
    title: "First-Time Buyer Guided Tour in West Edmond",
    neighborhood: "West Edmond",
    city: "Edmond, OK",
    category: "stories",
    categoryLabel: "Advisory & Blueprint",
    videoUrl: "/media/videos/vid30.mp4",
    thumbnail: "/media/properties/715-s-friendly-okc.jpeg",
    duration: "1:28",
    views: "17.9K",
    specs: "Inspection Due Diligence & Repair Credits",
    description: "Brian walks through a home inspection with first-time buyers, explaining mechanical systems, roof age, and how to negotiate seller repairs."
  },
  {
    id: "vid-31",
    title: "The 6-Phase Selling Blueprint: Video Recap",
    neighborhood: "Jamison Headquarters",
    city: "Edmond, OK",
    category: "stories",
    categoryLabel: "Advisory & Blueprint",
    videoUrl: "/media/videos/vid31.mp4",
    thumbnail: "/media/gallery/brian-jamison-sunset.jpeg",
    duration: "2:30",
    views: "38.9K",
    specs: "Full Strategic Overview for Oklahoma Sellers",
    description: "The complete playbook: pre-listing trade refresh, high-bitrate video, strategic search bracket pricing, reverse prospecting, and seamless closing."
  }
];

interface PropertyVideosPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const PropertyVideosPage: React.FC<PropertyVideosPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'luxury' | 'drone' | 'tours' | 'stories'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<PropertyVideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  // Filtered video list
  const filteredVideos = useMemo(() => {
    return PROPERTY_VIDEOS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.neighborhood.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Modal Next/Prev navigation
  const currentIndex = selectedVideo
    ? PROPERTY_VIDEOS.findIndex((v) => v.id === selectedVideo.id)
    : -1;

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setSelectedVideo(PROPERTY_VIDEOS[currentIndex - 1]);
      setIsPlaying(true);
    } else {
      setSelectedVideo(PROPERTY_VIDEOS[PROPERTY_VIDEOS.length - 1]);
      setIsPlaying(true);
    }
  };

  const handleNextVideo = () => {
    if (currentIndex < PROPERTY_VIDEOS.length - 1) {
      setSelectedVideo(PROPERTY_VIDEOS[currentIndex + 1]);
      setIsPlaying(true);
    } else {
      setSelectedVideo(PROPERTY_VIDEOS[0]);
      setIsPlaying(true);
    }
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="w-full bg-[#FAF9F6] text-[#002D61] min-h-screen">
      {/* 1. CINEMATIC LUXURY HERO HEADER */}
      <section className="relative w-full bg-[#002D61] text-white pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-[#EA580C]/30">
        {/* Subtle Background Pattern & Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001D40]/90 via-[#002D61]/95 to-[#002D61]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-300 mb-6">
            <button
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#FB923C]">Property Videos</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FB923C] text-xs font-bold tracking-wide uppercase mb-4">
              <VideoIcon className="w-3.5 h-3.5 text-[#FB923C]" />
              <span>Full-Spectrum Real Estate Cinematography</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-md">
              Oklahoma Luxury & Estate Property Videos
            </h1>

            <p className="font-sans text-base sm:text-lg text-stone-200 leading-relaxed mb-8 max-w-2xl font-normal">
              Step inside Oklahoma's most prestigious estates, custom architecture, and premier acreage. Every video is produced in 4K with FAA Part 107 drone flyovers, stabilized interior walkthroughs, and bespoke musical grading.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">31+</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-300 font-sans font-medium">Cinema Productions</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FB923C] block">14.2K+</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-300 font-sans font-medium">Avg Video Views</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">FAA 107</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-300 font-sans font-medium">Drone Certified</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#FB923C] block">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-stone-300 font-sans font-medium">Included Standard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="sticky top-20 z-30 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EA580C]/25 shadow-xs py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { key: 'all', label: `All Videos (${PROPERTY_VIDEOS.length})` },
              { key: 'luxury', label: 'Luxury Estates' },
              { key: 'drone', label: 'Acreage & Drone' },
              { key: 'tours', label: 'Walkthrough Tours' },
              { key: 'stories', label: 'Client Stories & Advisory' }
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveCategory(tab.key as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.key
                    ? 'bg-[#002D61] text-white shadow-md'
                    : 'bg-white border border-stone-200 text-[#002D61] hover:border-[#EA580C] hover:text-[#EA580C]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by neighborhood or estate..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white border border-stone-200 text-[#002D61] placeholder-stone-400 focus:outline-hidden focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP FEATURED VIDEO PREMIERE */}
      {activeCategory === 'all' && !searchQuery && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14">
          <div className="relative rounded-3xl overflow-hidden bg-[#002D61] text-white shadow-2xl border border-[#002D61]/40 grid grid-cols-1 lg:grid-cols-12 group">
            {/* Left: Thumbnail & Instant Play Trigger */}
            <div
              className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden cursor-pointer"
              onClick={() => setSelectedVideo(PROPERTY_VIDEOS[0])}
            >
              <img
                src={PROPERTY_VIDEOS[0].thumbnail}
                alt={PROPERTY_VIDEOS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Pulsing Big Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#EA580C] text-white text-[10px] font-bold tracking-widest uppercase shadow-md">
                  ★ Flagship Tour
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                  4K Ultra HD
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FB923C]" />
                  <span>{PROPERTY_VIDEOS[0].neighborhood} · {PROPERTY_VIDEOS[0].city}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {PROPERTY_VIDEOS[0].duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> {PROPERTY_VIDEOS[0].views}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Property Details & Launch CTA */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FB923C] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Premiere Tour</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {PROPERTY_VIDEOS[0].title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
                  {PROPERTY_VIDEOS[0].description}
                </p>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-xs text-stone-200 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">Architectural Specs</span>
                  <span className="font-semibold text-white text-sm">{PROPERTY_VIDEOS[0].specs}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => setSelectedVideo(PROPERTY_VIDEOS[0])}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Watch 4K Production</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Inquire on Similar Estates
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. MAIN VIDEO GRID (ALL 31 VIDEOS) */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61]">
              {activeCategory === 'all'
                ? 'All Property Video Productions'
                : activeCategory === 'luxury'
                ? 'Luxury Estates & Enclave Showcases'
                : activeCategory === 'drone'
                ? 'Acreage & FAA Drone Flyovers'
                : activeCategory === 'tours'
                ? 'Architectural Walkthrough Tours'
                : 'Client Stories & Advisory Guides'}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280] mt-1">
              Showing {filteredVideos.length} cinematic production{filteredVideos.length === 1 ? '' : 's'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleShareLink}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-[#002D61] hover:border-[#EA580C] shadow-2xs transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>{copySuccess ? 'Link Copied!' : 'Share Portfolio'}</span>
          </button>
        </div>

        {filteredVideos.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8">
            <VideoIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h4 className="font-serif text-xl font-bold text-[#002D61] mb-2">No Videos Found</h4>
            <p className="text-xs text-stone-500 mb-6">
              No productions matched your search for "{searchQuery}". Try searching by another neighborhood or resetting filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#002D61] text-white text-xs font-bold tracking-wide hover:bg-[#001D40] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#EA580C]/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-900">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#EA580C] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-115">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Category Pill Top Left */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                    <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#002D61]/90 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-bold tracking-wide uppercase shadow-2xs">
                      {video.categoryLabel}
                    </span>
                  </div>

                  {/* Duration & Views Bottom Bar */}
                  <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3 flex items-center justify-between text-[9px] sm:text-[11px] text-white font-medium drop-shadow-xs">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FB923C]" /> {video.duration}
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md">
                      <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FB923C]" /> {video.views}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location Badge */}
                    <div className="flex items-center gap-1 text-[9px] sm:text-[11px] font-semibold text-[#EA580C] mb-1 sm:mb-2 uppercase tracking-wider truncate">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                      <span className="truncate">{video.neighborhood} · {video.city}</span>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-xs sm:text-lg font-bold text-[#002D61] group-hover:text-[#EA580C] transition-colors mb-1 sm:mb-2 leading-snug line-clamp-2">
                      {video.title}
                    </h4>

                    {/* Description - Hidden on small mobile to ensure clean 2-column alignment */}
                    <p className="hidden sm:block font-sans text-xs text-[#6B7280] line-clamp-2 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>

                  {/* Specs & Watch CTA */}
                  <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between gap-1">
                    <span className="text-[9px] sm:text-[11px] font-medium text-stone-500 truncate max-w-[60%]">
                      {video.specs}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-[#002D61] group-hover:text-[#EA580C] flex items-center gap-0.5 sm:gap-1 shrink-0">
                      <span>Watch</span> <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. PRODUCTION VALUE PROPOSITION SECTION */}
      <section className="w-full bg-[#F5EFE6] py-16 sm:py-24 border-t border-[#EA580C]/25">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-bold text-[#EA580C] block mb-2">
              The Jamison Production Advantage
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#002D61] mb-4">
              Why Cinema Video Sells Oklahoma Real Estate
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] leading-relaxed">
              In luxury and acreage transactions, buyer decisions begin online. High-bitrate 4K cinematography stops buyers from scrolling past and creates immediate emotional investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#EA580C]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold mb-4">
                01
              </div>
              <h4 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                Out-of-State Transferee Reach
              </h4>
              <p className="font-sans text-xs text-[#6B7280] leading-relaxed">
                Over 34% of luxury buyers in Edmond and Nichols Hills relocate from California, Texas, and Washington. 4K walkthroughs enable sight-unseen confidence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EA580C]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold mb-4">
                02
              </div>
              <h4 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                FAA Part 107 Drone Surveys
              </h4>
              <p className="font-sans text-xs text-[#6B7280] leading-relaxed">
                Lot boundaries, tree lines, sunset orientations, and neighborhood context cannot be shown from ground level. Our certified drone flights tell the whole story.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EA580C]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold mb-4">
                03
              </div>
              <h4 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                14,000+ Average Views
              </h4>
              <p className="font-sans text-xs text-[#6B7280] leading-relaxed">
                Passive MLS listings gather dust. We deploy targeted social ad campaigns targeting high-net-worth brackets across Instagram, YouTube, and Facebook.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#EA580C]/30 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold mb-4">
                04
              </div>
              <h4 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                Zero Repayment Fees
              </h4>
              <p className="font-sans text-xs text-[#6B7280] leading-relaxed">
                Brian Jamison absorbs all upfront production, videography crew, editing, and distribution expenses as part of our full-service fiduciary representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER */}
      <section className="w-full bg-[#002D61] text-white py-16 sm:py-20 border-t border-[#EA580C]/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-bold text-[#FB923C] block mb-2">
              Ready for Cinema-Grade Representation?
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
              Feature Your Oklahoma Home in 4K
            </h3>
            <p className="font-sans text-sm text-stone-200">
              Schedule a private walkthrough review with Brian Jamison. We evaluate your property through a buyer's eyes and prepare an exact marketing plan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/40 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call (405) 513-3039</span>
            </a>
            <button
              type="button"
              onClick={onOpenValuation}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wide uppercase transition-colors cursor-pointer"
            >
              Request Private Valuation
            </button>
          </div>
        </div>
      </section>

      {/* 7. CINEMA MODAL VIDEO PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-[#001D40] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-white/15 flex items-center justify-between bg-[#002D61]">
              <div className="flex items-center gap-2.5 truncate max-w-[75%]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EA580C] text-white text-[10px] font-bold uppercase tracking-wider shrink-0">
                  {selectedVideo.categoryLabel}
                </span>
                <span className="font-serif font-bold text-white text-sm sm:text-base truncate">
                  {selectedVideo.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevVideo}
                  title="Previous Video"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextVideo}
                  title="Next Video"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  title="Close Video"
                  className="p-1.5 rounded-full bg-white/10 hover:bg-[#EA580C] text-white transition-colors cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player Box */}
            <div className="relative w-full bg-black flex-1 flex items-center justify-center min-h-[260px] sm:min-h-[420px] max-h-[60vh] overflow-hidden">
              <video
                ref={modalVideoRef}
                key={selectedVideo.videoUrl}
                src={selectedVideo.videoUrl}
                poster={selectedVideo.thumbnail}
                controls
                autoPlay
                playsInline
                className="w-full h-full max-h-[60vh] object-contain"
              />
            </div>

            {/* Modal Footer & Details */}
            <div className="p-5 sm:p-6 bg-[#001D40] text-white overflow-y-auto">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FB923C] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedVideo.neighborhood} · {selectedVideo.city}</span>
                    <span>•</span>
                    <span className="text-stone-300">{selectedVideo.specs}</span>
                  </div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {selectedVideo.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={`tel:${BROKER_INFO.phoneRaw}`}
                    className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Brian</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVideo(null);
                      onOpenConsultation();
                    }}
                    className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold tracking-wide cursor-pointer"
                  >
                    Schedule Showing
                  </button>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

