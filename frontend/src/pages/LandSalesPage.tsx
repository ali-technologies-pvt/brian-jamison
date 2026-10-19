import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Download,
  HelpCircle,
  Check,
  X,
  FileText,
  ChevronDown,
  ChevronUp,
  Calculator,
  Video,
  Home,
  DollarSign,
  Clock,
  MapPin,
  Award,
  Layers,
  Flame,
  Star,
  AlertCircle,
  Compass,
  FileCheck,
  Percent,
  TrendingUp,
  CheckSquare,
  Trees,
  Truck,
  Droplet,
  Zap,
  Building,
  Maximize2
} from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';
import { SocialLinks } from '../components/SocialLinks';
import { BROKER_INFO } from '../data/realEstateData';
import { InteriorHeroVideo } from './InteriorHeroVideo';

interface LandSalesPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const LandSalesPage: React.FC<LandSalesPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  // Hero Video State
  const [heroMuted, setHeroMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Active sub-nav anchor highlight
  const [activeSection, setActiveSection] = useState<string>('processes');

  // Video Reels State & Modal
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);
  const [reelPlaying, setReelPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Interactive Checklist State
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({
    'point-1': true,
    'point-2': true,
    'point-3': true,
  });

  // Dynamic Land Valuation Estimator
  const [acresInput, setAcresInput] = useState<number>(10);
  const [selectedLandTier, setSelectedLandTier] = useState<'raw' | 'semi' | 'shovel'>('shovel');
  const [hasRoadFrontage, setHasRoadFrontage] = useState<boolean>(true);

  // Active Land Process Tab
  const [activeProcessTab, setActiveProcessTab] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Download Checklist State
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Scroll listener for sticky ribbon
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'section-processes', key: 'processes' },
        { id: 'section-reels', key: 'reels' },
        { id: 'section-checklist', key: 'checklist' },
        { id: 'section-valuation', key: 'valuation' },
        { id: 'section-financing', key: 'financing' },
        { id: 'section-development', key: 'development' },
        { id: 'section-faqs', key: 'faqs' }
      ];

      const scrollPos = window.scrollY + 180;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec.key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  // Land valuation calculations
  const basePerAcreRate = {
    raw: 14500, // Unimproved agricultural pasture
    semi: 24000, // Partial utilities / cleared
    shovel: 42000 // Shovel-ready with electric, well/meter, perc approved pad
  }[selectedLandTier];

  const roadMultiplier = hasRoadFrontage ? 1.0 : 0.65; // landlocked discount ~35%
  const totalPerAcreValue = Math.round(basePerAcreRate * roadMultiplier);
  const totalEstimatedLandValue = Math.round(acresInput * totalPerAcreValue);

  // 6 Core Processes Adapted for Land
  const LAND_PROCESSES = [
    {
      number: "01",
      title: "4K Drone Boundary Mapping & Land Syndication",
      subtitle: "Aerial Elevation Overlays & Specialized Feeds",
      desc: "Raw land cannot be captured with standard ground photography. We deploy FAA Part-107 licensed drone pilots to capture 4K high-altitude sweeps, digital property line overlays, elevation contours, and timber-to-pasture ratios. We syndicate across LandWatch, Land and Farm, LoopNet, Zillow, and regional developer networks.",
      deliverables: ["Interactive GPS boundary lines", "Elevation & runoff drainage contours", "Syndication to 350+ portals + specialized land feeds"]
    },
    {
      number: "02",
      title: "Transparent Technical Land Communication",
      subtitle: "Soil, Zoning & Environmental Due Diligence",
      desc: "Land buyers are sophisticated investors and custom builders with rigorous technical requirements. We prepare comprehensive property binders answering soil perk test results, FEMA 100-year flood zone boundaries, and county zoning permissions before buyers ever ask.",
      deliverables: ["ODEQ soil absorption verification", "FEMA flood map overlay audit", "County zoning certification letters"]
    },
    {
      number: "03",
      title: "On-Site Acreage Accessibility & 4x4 UTV Tours",
      subtitle: "Physically Walking Every Acre · No Drive-Bys",
      desc: "Rural acreage cannot be appreciated from behind a steering wheel on a county road. Brian Jamison personally accompanies prospective buyers on-site with 4x4 UTV/ATVs to tour dense timber perimeters, creek lines, elevation vistas, and potential homesite pads.",
      deliverables: ["Dedicated 4x4 UTV property access", "Marked corner stakes and flagging", "Guided tours of prime custom homesite pads"]
    },
    {
      number: "04",
      title: "Specialized Land Advisory Crew",
      subtitle: "Civil Engineers, Surveyors & Soil Scientists",
      desc: "Selling land requires coordination with licensed Oklahoma professionals. We work directly with certified boundary surveyors, environmental civil engineers, ODEQ-licensed septic designers, and county commissioners to streamline transaction compliance.",
      deliverables: ["Boundary boundary survey coordination", "Percolation soil test oversight", "Utility line extension estimates"]
    },
    {
      number: "05",
      title: "Data-Driven Acreage & Adjacent Lot Pricing",
      subtitle: "Highest and Best Use (HBU) Modeling",
      desc: "Selling an entire 40-acre parcel as a single tract often leaves massive profits on the table. We evaluate whether subdividing an adjacent lot or splitting road frontage into 5-acre luxury custom home estates doubles your gross proceeds.",
      deliverables: ["Per-acre forensic comp analysis", "Parcel subdivision financial pro forma", "Road frontage premium optimization"]
    },
    {
      number: "06",
      title: "Zero-Risk Land Listing Agreement",
      subtitle: "Cancel-Anytime Commitment · No Lock-In",
      desc: "If our marketing, drone cinematography, or buyer negotiation fails to meet your highest expectations, you can terminate your listing agreement at any time with zero penalty and zero out-of-pocket costs.",
      deliverables: ["100% Risk-Free Cancel-Anytime Pledge", "$0 out-of-pocket drone media fees", "Direct access to Brian's private mobile line"]
    }
  ];

  // 9:16 Land Reels Data
  const LAND_REELS = [
    {
      id: 1,
      title: "Aerial Drone Tour: 20-Acre Luxury Estate Parcel in Guthrie, OK",
      duration: "1:10",
      views: "22.4K",
      thumbnail: "/media/properties/9687-bear-creek-guthrie.jpeg",
      videoUrl: "/media/videos/vid3.mp4",
      takeaway: "Notice how rolling elevation contours, mature native hardwoods, and a private spring-fed pond create a $100k+ building envelope premium."
    },
    {
      id: 2,
      title: "What is a Perc Test & Why Can It Kill Your Land Deal?",
      duration: "0:58",
      views: "36.8K",
      thumbnail: "/media/properties/11616-estrella-arcadia.jpeg",
      videoUrl: "/media/videos/vid2.mp4",
      takeaway: "Oklahoma Department of Environmental Quality (ODEQ) soil absorption tests dictate whether you need a $6k lateral line or a $16k aerobic system."
    },
    {
      id: 3,
      title: "Mineral Rights vs. Surface Rights in Oklahoma: What You Must Know",
      duration: "1:15",
      views: "44.9K",
      thumbnail: "/media/properties/85006-n-2520-watonga.jpeg",
      videoUrl: "/media/videos/vid1.mp4",
      takeaway: "In Oklahoma, surface rights do not automatically include oil and gas mineral rights. We audit title chains so there are zero subsurface surprises."
    },
    {
      id: 4,
      title: "Can You Build a Barndominium on This Lot? County Zoning 101",
      duration: "1:02",
      views: "29.7K",
      thumbnail: "/media/gallery/hill-country-driveway.jpeg",
      videoUrl: "/media/videos/vid6.mp4",
      takeaway: "How to read county restrictive covenants, minimum square footage mandates, and outbuilding allowances before purchasing acreage."
    },
    {
      id: 5,
      title: "How to Split an Adjacent Parcel to Double Your Land's Value",
      duration: "1:12",
      views: "31.2K",
      thumbnail: "/media/properties/2950-nw-37th-newcastle.jpeg",
      videoUrl: "/media/videos/vid7.mp4",
      takeaway: "Subdividing a 20-acre tract into four 5-acre executive estate lots unlocked $280,000 in additional net profit for an Edmond landowner."
    }
  ];

  // 7-Point Land Due Diligence Checklist Data
  const LAND_CHECKLIST = [
    {
      id: "point-1",
      number: "01",
      title: "Zoning & Permitted Land Use",
      desc: "Verification of municipal or county zoning: Agricultural (A-1), Rural Residential (R-1), Commercial, or Planned Unit Development (PUD). Confirms whether horses, livestock, commercial workshops, or dual residential dwellings are permitted.",
      authority: "County Planning Commission & Board of Adjustment"
    },
    {
      id: "point-2",
      number: "02",
      title: "Utilities & Infrastructure Feasibility",
      desc: "Audit of rural water meters (e.g., Logan County RWD, Deer Creek RWD) vs. private water well drilling depth (Garber-Wellington Aquifer in OKC). Electric service proximity (OG&E or electric cooperatives) and transformer tap fees.",
      authority: "Rural Water Districts & Electric Cooperatives"
    },
    {
      id: "point-3",
      number: "03",
      title: "Perc Test (Percolation) & Septic Feasibility",
      desc: "Soil percolation rate testing certified by the Oklahoma Department of Environmental Quality (ODEQ). Confirms whether the land supports an economical conventional lateral line septic or requires an aerobic spray system.",
      authority: "ODEQ Certified Soil Profile Evaluators"
    },
    {
      id: "point-4",
      number: "04",
      title: "Legal Ingress/Egress & Access Easements",
      desc: "Verifying dedicated public paved/gravel road frontage vs. private shared driveway access easements. We review county section line roads and recorded ingress/egress rights to ensure title insurance insurability.",
      authority: "County Recorded Surveys & Title Commitments"
    },
    {
      id: "point-5",
      number: "05",
      title: "Mineral Rights vs. Surface Rights",
      desc: "Oklahoma title chains frequently separate surface ownership from subsurface oil, gas, and mineral rights. We audit title commitments to clarify whether minerals are conveyed, reserved, or under active oil leases.",
      authority: "Oklahoma Title Attorneys & County Deed Records"
    },
    {
      id: "point-6",
      number: "06",
      title: "Topography, Elevation & FEMA Flood Zones",
      desc: "GIS elevation contour mapping, runoff water drainage channels, and FEMA 100-year flood zone boundary checks. Ensures prospective custom home building pads sit safely outside base flood elevation (BFE).",
      authority: "FEMA Flood Insurance Rate Maps (FIRM)"
    },
    {
      id: "point-7",
      number: "07",
      title: "Deed Restrictions & HOA Covenants",
      desc: "Review of recorded subdivision restrictions: minimum living square footage (e.g. 2,500+ sq ft), architectural roof pitch requirements, detached shop/barn construction allowances, and recreational vehicle parking rules.",
      authority: "Recorded County Restrictive Covenants"
    }
  ];

  // Land FAQs Data
  const LAND_FAQS = [
    {
      q: "How much does it cost to drill a water well in Edmond, Arcadia, or Guthrie?",
      a: "In the Greater Oklahoma City area tapping the Garber-Wellington Aquifer, water wells typically range from 250 to 500 feet deep. Total turnkey installation—including drilling, casing, submersible pump, pressure tank, and wellhouse—generally costs between $9,500 and $16,000 depending on depth and geological strata."
    },
    {
      q: "What is an ODEQ perc test and who pays for it?",
      a: "An ODEQ (Oklahoma Department of Environmental Quality) percolation and soil profile test determines how well the soil absorbs wastewater for a private septic system. In a standard land sale, this is typically ordered during the buyer's 10-day investigation period and costs approximately $400 to $650."
    },
    {
      q: "Can I clear trees or excavate a building pad before closing?",
      a: "No. Buyers should never clear trees, dig ponds, or break ground on a property prior to final deed transfer and funding at the title company. Altering the land before closing creates severe legal liability and can jeopardize title insurance and lender financing."
    },
    {
      q: "What down payment is required for raw land loans in Oklahoma?",
      a: "Unlike residential home loans that allow 3% to 5% down, unimproved raw land loans typically require a 15% to 25% down payment with shorter amortization terms (10 to 15 years). However, if purchasing a lot to immediately build with a construction-to-permanent loan, down payments can be as low as 5% to 10%."
    },
    {
      q: "How do you determine the per-acre value of rural land vs. residential lots?",
      a: "Land valuation is not a simple per-acre multiplier. We evaluate road frontage length, utility proximity (presence of electric transformer and water meter saves $15k–$25k), timber-to-pasture ratios, elevation topography, and subdivision potential into smaller parcels."
    },
    {
      q: "What happens if a property has oil/gas wells or pipelines on site?",
      a: "Many Oklahoma parcels feature active or plugged oil and gas wells, pump jacks, or pipeline easements. We obtain pipeline easement surveys and well status reports from the Oklahoma Corporation Commission (OCC) to verify required setback buffers from residential homesites."
    },
    {
      q: "Can you help subdivide my 20 to 80-acre tract into smaller parcels?",
      a: "Yes! Subdividing large acreage tracts into 2-acre, 5-acre, or 10-acre custom home parcels is one of our core specialties. We coordinate surveying, county plat approvals, and road frontage access to unlock maximum per-acre profitability."
    },
    {
      q: "How does Brian Jamison market rural acreage differently than a traditional house?",
      a: "We do not merely post a photo of a metal gate on the MLS. We produce 4K drone boundary mapping, publish on specialized land portals (LandWatch, Land and Farm), provide on-site 4x4 UTV tours for prospective buyers, and pitch parcels directly to our network of 24+ Oklahoma custom luxury home builders."
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61] overflow-x-hidden">
      {/* 
        ========================================================================
        SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage)
        ========================================================================
      */}
      <InteriorHeroVideo
        kicker="Oklahoma Land & Development Division"
        title="Land, Acreage & Development Advisory Across Oklahoma."
        subtitle="From 1-acre luxury custom home lots to 100+ acre rural tracts—leveraging 4K aerial mapping, zoning forensics, and targeted investor syndication."
        heroVideoUrl="/media/videos/vid3.mp4"
        heroFallbackImage="/media/properties/11616-estrella-arcadia.jpeg"
        metrics={[
          { value: '1,450+', label: 'Oklahoma Acres Closed' },
          { value: '85+', label: 'Land Parcels Transacted' },
          { value: '24+', label: 'Custom Builder Network' },
          { value: '4K Drone', label: 'FAA Boundary Mapping' },
        ]}
        primaryCtaText="Request Land Valuation"
        secondaryCtaText="7-Point Due Diligence Checklist"
        onSecondaryCtaClick={() => scrollToSection('section-checklist')}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* 
        ========================================================================
        STICKY SECTION SUB-NAVIGATION RIBBON
        ========================================================================
      */}
      <div className="sticky top-0 z-40 w-full bg-[#002D61] text-white border-b border-white/15 shadow-md backdrop-blur-md">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-3.5 gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            {[
              { id: 'section-processes', key: 'processes', label: '01 Land Processes' },
              { id: 'section-reels', key: 'reels', label: '02 Soil & Acreage Reels' },
              { id: 'section-checklist', key: 'checklist', label: '03 7-Point Feasibility' },
              { id: 'section-valuation', key: 'valuation', label: '04 Per-Acre Estimator' },
              { id: 'section-financing', key: 'financing', label: '05 Land Financing' },
              { id: 'section-development', key: 'development', label: '06 Parcel Splits' },
              { id: 'section-faqs', key: 'faqs', label: '07 Land FAQs & Guide' }
            ].map(item => (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeSection === item.key
                    ? 'bg-[#EA580C] text-white font-bold shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={onOpenValuation}
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm ml-auto"
            >
              <span>Land Appraisal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        SECTION 2: THE 6 CORE PROCESSES ADAPTED FOR LAND
        ========================================================================
      */}
      <section id="section-processes" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Specialized Acreage Framework
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              The 6 Core Processes Adapted for Land
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Standard residential marketing tactics do not work for acreage and parcels. We combine high-resolution aerial cinematography with environmental due diligence, on-site 4x4 UTV tours, and custom builder distribution.
            </p>
          </div>

          {/* Interactive Land Process Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
            {LAND_PROCESSES.map((proc, idx) => (
              <button
                key={proc.number}
                type="button"
                onClick={() => setActiveProcessTab(idx)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  activeProcessTab === idx
                    ? 'bg-[#002D61] text-white border-[#002D61] shadow-lg scale-[1.02]'
                    : 'bg-white text-[#002D61] border-[#E5E0D8] hover:border-[#EA580C]/50 hover:bg-[#F5EFE6]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    activeProcessTab === idx ? 'bg-[#EA580C] text-white' : 'bg-[#FAF9F6] text-[#EA580C] border border-[#EA580C]/30'
                  }`}>
                    Process {proc.number}
                  </span>
                  {activeProcessTab === idx && <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />}
                </div>
                <h4 className="font-serif text-xs sm:text-sm font-bold line-clamp-2">
                  {proc.title}
                </h4>
              </button>
            ))}
          </div>

          {/* Active Process Deep-Dive Container */}
          <div className="bg-[#F5EFE6] border border-[#EA580C]/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#002D61]/15 mb-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded bg-[#002D61] text-white text-xs font-bold tracking-widest uppercase">
                    Process {LAND_PROCESSES[activeProcessTab].number}
                  </span>
                  <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#EA580C]">
                    {LAND_PROCESSES[activeProcessTab].subtitle}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-3">
                  {LAND_PROCESSES[activeProcessTab].title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {LAND_PROCESSES[activeProcessTab].desc}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Request Land Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {LAND_PROCESSES[activeProcessTab].deliverables.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E0D8] shadow-2xs flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-serif text-sm font-bold text-[#002D61] mb-1">
                      Deliverable 0{i + 1}
                    </h5>
                    <p className="font-sans text-xs sm:text-sm text-[#4B5563]">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: VIDEO SHOWCASE & 9:16 VERTICAL REELS HUB
        ========================================================================
      */}
      <section id="section-reels" className="w-full py-20 sm:py-28 bg-[#001D40] text-white border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>60-Second Land Guides</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Acreage & Soil Intel: Watch 60-Second Land Guides
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Explore Oklahoma land technicalities in quick, high-impact video briefs. Click any 9:16 reel to watch Brian break down perc tests, mineral rights, and parcel splits.
            </p>
          </div>

          {/* 9:16 Vertical Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {LAND_REELS.map((reel, index) => (
              <div
                key={reel.id}
                onClick={() => {
                  setSelectedReelIndex(index);
                  setReelPlaying(true);
                }}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-[#0A192F] border border-white/20 hover:border-[#EA580C] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between p-4"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${reel.thumbnail})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 group-hover:from-black/90 transition-opacity" />

                {/* Top Badge Strip */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20">
                    Land Reel 0{reel.id}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#EA580C] text-[10px] font-bold text-white tracking-wider">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="relative z-10 my-auto self-center">
                  <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover:bg-[#EA580C] group-hover:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Narrative */}
                <div className="relative z-10">
                  <h4 className="font-serif text-sm font-bold text-white leading-snug line-clamp-3 mb-2 group-hover:text-[#FDBA74] transition-colors">
                    {reel.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-white/70">
                    <span>{reel.views} views</span>
                    <span className="text-[#FB923C] font-semibold underline underline-offset-2">Watch Now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reel Modal Player */}
      {selectedReelIndex !== null && (
        <div
          onClick={() => setSelectedReelIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col justify-between w-full max-w-[360px] sm:max-w-[400px] h-[86vh] max-h-[720px] aspect-[9/16] bg-[#001D40] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            {/* Real Video Element */}
            <video
              key={LAND_REELS[selectedReelIndex].videoUrl}
              src={LAND_REELS[selectedReelIndex].videoUrl}
              poster={LAND_REELS[selectedReelIndex].thumbnail}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/60 pointer-events-none" />

            {/* Reel Header */}
            <div className="relative z-20 flex items-center justify-between p-3 sm:p-4">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20">
                <BrianAvatar size={28} showStatusDot={true} />
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">Brian Jamison</span>
                  <span className="text-[10px] text-[#FB923C] font-medium leading-none">Acreage Specialist</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/25 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FB923C]" />}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReelIndex(null)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/25 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Scrubber, Info & Actions */}
            <div className="relative z-20 p-4 sm:p-5">
              <div className="w-full h-1 bg-white/25 rounded-full mb-2.5 overflow-hidden">
                <div className="h-full bg-[#EA580C] w-2/3 animate-pulse" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#FB923C] block mb-1">
                Land Due Diligence Takeaway
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white mb-1.5 leading-snug line-clamp-2">
                {LAND_REELS[selectedReelIndex].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mb-3 line-clamp-3">
                {LAND_REELS[selectedReelIndex].takeaway}
              </p>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReelIndex(null);
                    onOpenConsultation();
                  }}
                  className="flex-1 py-2 sm:py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md text-center cursor-pointer"
                >
                  Consult With Brian
                </button>
                <a
                  href="tel:4055133039"
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        SECTION 4: THE 7-POINT LAND DUE DILIGENCE & FEASIBILITY CHECKLIST
        ========================================================================
      */}
      <section id="section-checklist" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Uncompromising Due Diligence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              The 7-Point Land Due Diligence & Feasibility Checklist
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Never buy or sell land on assumptions. We execute this exhaustive 7-point audit to eliminate deal-killing surprises, ensure ODEQ septic compliance, and protect your capital.
            </p>
          </div>

          {/* Checklist Cards Grid */}
          <div className="space-y-4">
            {LAND_CHECKLIST.map((point) => {
              const isChecked = !!checkedChecklist[point.id];
              return (
                <div
                  key={point.id}
                  onClick={() => setCheckedChecklist(prev => ({ ...prev, [point.id]: !prev[point.id] }))}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none ${
                    isChecked
                      ? 'bg-white border-[#EA580C]/50 shadow-sm'
                      : 'bg-[#FAF9F6] border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? 'bg-[#EA580C] text-white' : 'border border-[#9CA3AF] bg-white'
                    }`}>
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-[#EA580C]">
                          Point {point.number}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#002D61]">
                          {point.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-3xl">
                        {point.desc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 md:text-right pl-11 md:pl-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7280] block">
                      Governing Authority
                    </span>
                    <span className="text-xs font-bold text-[#002D61]">
                      {point.authority}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 5: LAND VALUATION ARCHITECTURE (PER-ACRE PRICING MATRIX)
        ========================================================================
      */}
      <section id="section-valuation" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Per-Acre Pricing Matrix
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Land Valuation Architecture
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Explore how infrastructure improvements, soil approvals, and road frontage dramatically alter the per-acre value of Oklahoma land. Use the dynamic estimator below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Inputs */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#002D61] pb-3 border-b border-[#FAF9F6]">
                Configure Land Characteristics
              </h3>

              {/* Number of Acres Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Parcel Size (Acres)
                  </label>
                  <span className="font-mono text-lg font-bold text-[#EA580C]">
                    {acresInput} Acres
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="160"
                  step="1"
                  value={acresInput}
                  onChange={(e) => setAcresInput(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-mono">
                  <span>1 Acre</span>
                  <span>40 Acres</span>
                  <span>160 Acres (Quarter Section)</span>
                </div>
              </div>

              {/* Land Improvement Tier */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-2">
                  Infrastructure & Improvement Status
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'raw', title: 'Raw Unimproved Pasture / Timber', detail: 'No utilities, unpaved access, raw agricultural valuation' },
                    { key: 'semi', title: 'Semi-Improved Parcel', detail: 'Electric at road boundary, partial clearing, perimeter fenced' },
                    { key: 'shovel', title: 'Shovel-Ready Building Enclave', detail: 'Water meter/well in place, transformer set, ODEQ perc approved pad' }
                  ].map(tier => (
                    <button
                      key={tier.key}
                      type="button"
                      onClick={() => setSelectedLandTier(tier.key as any)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        selectedLandTier === tier.key
                          ? 'bg-[#002D61] text-white border-[#002D61] shadow-md'
                          : 'bg-[#FAF9F6] text-[#002D61] border-[#E5E0D8] hover:bg-[#F5EFE6]'
                      }`}
                    >
                      <div>
                        <span className="block font-serif text-sm font-bold">{tier.title}</span>
                        <span className={`text-[11px] ${selectedLandTier === tier.key ? 'text-white/70' : 'text-[#6B7280]'}`}>
                          {tier.detail}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-xs shrink-0 ml-3">
                        {tier.key === 'raw' ? '~$14.5k/ac' : tier.key === 'semi' ? '~$24k/ac' : '~$42k/ac'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Road Frontage Toggle */}
              <div className="pt-2">
                <div
                  onClick={() => setHasRoadFrontage(!hasRoadFrontage)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    hasRoadFrontage ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D]' : 'bg-[#FEF2F2] border-[#FCA5A5] text-[#7F1D1D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="block font-bold text-xs">
                        {hasRoadFrontage ? 'Dedicated Public Road Frontage (Full Value)' : 'Landlocked / Shared Private Easement (35% Discount)'}
                      </span>
                      <span className="text-[11px] opacity-80">
                        {hasRoadFrontage ? 'Direct county gravel or paved asphalt road access' : 'Requires deeded ingress/egress easement through neighbor'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold">
                    {hasRoadFrontage ? '100% Value' : '-35% Cut'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-6 bg-[#001D40] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#FB923C] block mb-2">
                  Estimated Total Parcel Valuation
                </span>
                <div className="mb-6">
                  <span className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                    ${totalEstimatedLandValue.toLocaleString()}
                  </span>
                  <span className="block text-xs font-mono text-white/70 mt-1">
                    Based on ~${totalPerAcreValue.toLocaleString()} per acre across {acresInput} acres
                  </span>
                </div>

                <div className="space-y-3 pb-6 border-b border-white/15 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-white/80">
                    <span>Base Tier Rate</span>
                    <span className="font-mono text-white font-semibold">${basePerAcreRate.toLocaleString()} / acre</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Road Access Multiplier</span>
                    <span className="font-mono text-white font-semibold">{hasRoadFrontage ? '1.0x (Paved / Frontage)' : '0.65x (Landlocked Penalty)'}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Net Calibrated Per-Acre Value</span>
                    <span className="font-mono text-[#FB923C] font-semibold">${totalPerAcreValue.toLocaleString()} / acre</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Estimated Total Parcel Value</span>
                    <span className="font-mono text-white font-bold text-base">${totalEstimatedLandValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="w-full py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <span>Request Full On-Site Drone & Comps Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: RURAL LAND FINANCING & LENDER NETWORK
        ========================================================================
      */}
      <section id="section-financing" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Agricultural & Rural Financing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Rural Land Financing & Lender Network
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Big national retail banks rarely write loans for unimproved rural acreage. We connect land buyers and investors directly with Oklahoma agricultural credit associations and local community banks specializing in land paper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs">
              <span className="px-3 py-1 rounded bg-[#002D61] text-white text-[10px] font-mono font-bold uppercase mb-4 block w-fit">
                Ag Credit Specialist
              </span>
              <h3 className="font-serif text-xl font-bold text-[#002D61] mb-2">
                Farm Credit of Western Oklahoma
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                Specializes in rural residential tracts, pastureland, and recreational acreage. Offers 15% to 20% down payment structures with patronage dividend distributions back to borrowers.
              </p>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ Long-term fixed interest options available
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs">
              <span className="px-3 py-1 rounded bg-[#EA580C] text-white text-[10px] font-mono font-bold uppercase mb-4 block w-fit">
                Community Banking
              </span>
              <h3 className="font-serif text-xl font-bold text-[#002D61] mb-2">
                Local Oklahoma Community Banks
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                Local lenders in Edmond, Guthrie, and Piedmont know county dirt. They offer lot loans for buyers intending to hold land for 1 to 3 years before starting custom home construction.
              </p>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ Converts seamlessly into construction loans
              </span>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs">
              <span className="px-3 py-1 rounded bg-[#001D40] text-white text-[10px] font-mono font-bold uppercase mb-4 block w-fit">
                Private Deal Structuring
              </span>
              <h3 className="font-serif text-xl font-bold text-[#002D61] mb-2">
                Seller-Financed Note Structures
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                For landowners seeking monthly passive interest income without instant capital gains tax hits, we draft seller-financed deed of trust notes backed by title attorney escrow collection.
              </p>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ Maximizes seller net returns & expands buyer pool
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 7: LAND DEVELOPMENT & PARCEL SPLIT ADVISORY
        ========================================================================
      */}
      <section id="section-development" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-[#002D61] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/20 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-4">
                <Building className="w-3.5 h-3.5" />
                <span>Equity Multiplication Advisory</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Land Development & Parcel Split Advisory: How to Subdivide For Maximum Return
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                Selling a 40-acre tract as a single bulk parcel often nets $12,000 to $15,000 per acre. Subdividing that same tract into four 10-acre or eight 5-acre custom estate home parcels can command <strong>$35,000 to $45,000 per acre</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm mb-8">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <strong className="text-[#FB923C] block mb-1">01. County Plat & Lot Split</strong>
                  <p className="text-white/70">
                    We navigate county planning commissioners and deed split exemptions without expensive municipal PUD rezoning.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <strong className="text-[#FB923C] block mb-1">02. Road Frontage Geometry</strong>
                  <p className="text-white/70">
                    We calculate minimum frontage widths (e.g. 150–300 ft) to ensure every newly created parcel has dedicated legal access.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <strong className="text-[#FB923C] block mb-1">03. Custom Builder Syndication</strong>
                  <p className="text-white/70">
                    We pitch newly split parcels directly to our network of 24+ Oklahoma custom builders seeking executive spec homesites.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
              >
                Schedule A Parcel Split Feasibility Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: LAND FAQS & FEASIBILITY LEAD MAGNET
        ========================================================================
      */}
      <section id="section-faqs" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Forensic Land Clarifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Frequently Asked Land Questions
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Clear, definitive answers to the questions landowners and acreage buyers ask before writing an earnest deposit on Oklahoma dirt.
            </p>
          </div>

          {/* FAQs Accordion */}
          <div className="max-w-4xl space-y-4 mb-16">
            {LAND_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden transition-all duration-200 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-[#FAF9F6]"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#002D61]">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'bg-[#EA580C] text-white rotate-180' : 'bg-[#F5EFE6] text-[#002D61]'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#4B5563] font-normal leading-relaxed border-t border-[#FAF9F6] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Downloadable PDF Lead Magnet Box */}
          <div className="bg-[#002D61] text-white rounded-3xl p-8 sm:p-12 border border-white/20 shadow-xl relative overflow-hidden mb-16">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>Instant Digital PDF Resource</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Download The 2026 Oklahoma Land Due Diligence & Feasibility Checklist
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                A 28-page technical guide covering ODEQ perc test parameters, Garber-Wellington water well depth tables, mineral rights title chains, and county road frontage split formulas.
              </p>

              {downloadSuccess ? (
                <div className="p-4 rounded-xl bg-[#16A34A]/20 border border-[#86EFAC]/40 text-xs sm:text-sm text-[#86EFAC] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your 2026 Land Due Diligence Checklist download has commenced! Check your downloads folder.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDownloadSuccess(true);
                    setTimeout(() => setDownloadSuccess(false), 5000);
                  }}
                  className="px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer flex items-center gap-2.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download The Free Land Due Diligence Checklist (PDF)</span>
                </button>
              )}
            </div>
          </div>

          {/* Final Call to Action Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EA580C]/30 shadow-lg text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-5">
              <BrianAvatar size="lg" />
            </div>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-2">
              Ready To Transact Land In Oklahoma?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002D61] mb-3">
              Request a Land Feasibility Review
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto mb-8">
              Reach Brian Jamison directly on his private cell or visit us at the Salt Real Estate Corporate Office in Edmond, Oklahoma.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenValuation}
                className="w-full sm:w-auto px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Request Land Feasibility Report</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:4055133039"
                className="w-full sm:w-auto px-8 py-4 bg-[#002D61] hover:bg-[#001D40] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Brian (405) 513-3039</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#FAF9F6] text-xs text-[#6B7280]">
              <span>Salt Real Estate Corporate Office · 1508 W. Edmond Rd., Edmond, OK 73003 · OREC License #184931</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
