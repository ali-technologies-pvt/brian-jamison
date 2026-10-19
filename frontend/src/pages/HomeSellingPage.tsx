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
  RefreshCw,
  Users,
  Camera,
  Globe,
  Radio,
  FileCheck,
  Percent,
  TrendingUp,
  Compass
} from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';
import { SocialLinks } from '../components/SocialLinks';
import { BROKER_INFO } from '../data/realEstateData';
import { InteriorHeroVideo } from './InteriorHeroVideo';
import { IdxUniversalWidget } from '../components/IdxUniversalWidget';

interface HomeSellingPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const HomeSellingPage: React.FC<HomeSellingPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  // Hero Video State
  const [heroMuted, setHeroMuted] = useState(true);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Active sub-nav anchor highlight
  const [activeSection, setActiveSection] = useState<string>('processes');

  // Video Reels State & Modal
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);
  const [reelPlaying, setReelPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Interactive Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'curb-1': true,
    'curb-2': true,
    'kitchen-1': true,
    'bath-1': true,
  });

  // Interactive Net Calculator State
  const [calcPrice, setCalcPrice] = useState<number>(650000);
  const [calcMortgage, setCalcMortgage] = useState<number>(280000);
  const [calcCommissionPct, setCalcCommissionPct] = useState<number>(5.0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Download Playbook State
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // 6 Processes Expanded Tabs / States
  const [activeProcessTab, setActiveProcessTab] = useState<number>(0);

  // Listen to scroll to update sticky nav active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'section-processes', key: 'processes' },
        { id: 'section-reels', key: 'reels' },
        { id: 'section-checklist', key: 'checklist' },
        { id: 'section-calculator', key: 'calculator' },
        { id: 'section-realities', key: 'realities' },
        { id: 'section-cases', key: 'cases' },
        { id: 'section-comparison', key: 'comparison' },
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

  // Calculator computations
  const totalCommission = Math.round(calcPrice * (calcCommissionPct / 100));
  const docStamps = Math.round(calcPrice * 0.0015); // OK doc stamp tax: $0.75 per $500 = 0.15%
  const titleAndEscrow = Math.round(1850 + calcPrice * 0.0022); // Oklahoma standard title & closing fees
  const estimatedRepairsConcessions = Math.round(calcPrice * 0.005); // standard 0.5% repair reserve
  const estimatedClosingCosts = totalCommission + docStamps + titleAndEscrow + estimatedRepairsConcessions;
  const netCashToSeller = Math.max(0, calcPrice - calcMortgage - estimatedClosingCosts);
  const netProceedsPercentage = Math.round((netCashToSeller / calcPrice) * 100);

  // Toggle checklist item
  const toggleChecklist = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistScore = Math.round(
    (Object.values(checkedItems).filter(Boolean).length / 16) * 100
  );

  // Reels Data
  const REELS_DATA = [
    {
      id: 1,
      title: "3 Small Cosmetic Mistakes That Kill Home Value in OKC",
      duration: "0:58",
      views: "18.4K",
      thumbnail: "/media/gallery/modern-kitchen.jpeg",
      videoUrl: "/media/videos/vid2.mp4",
      description: "Why mismatched paint sheens, 2700K yellow bulbs, and crowded kitchen islands cost Oklahoma sellers an average of $15,000+ during first showings.",
      takeaway: "Swap bulbs to 3000K daylight white and clear 80% of counter surfaces."
    },
    {
      id: 2,
      title: "Before & After: How Professional Staging Added $24,000 to an Edmond Home",
      duration: "1:02",
      views: "24.1K",
      thumbnail: "/media/gallery/modern-staircase-dining.jpeg",
      videoUrl: "/media/videos/vid1.mp4",
      description: "Step inside this vacant custom build in Edmond where our specialized staging crew transformed cold empty rooms into an emotional sanctuary.",
      takeaway: "Received 4 competitive offers in 72 hours, closing at $24k above list."
    },
    {
      id: 3,
      title: "Why Your Listing Expired With Your Previous Agent (And How We Fix It in 48 Hours)",
      duration: "1:15",
      views: "31.9K",
      thumbnail: "/media/properties/22801-n-briarwood-edmond.jpeg",
      videoUrl: "/media/videos/vid6.mp4",
      description: "The brutal reality of passive MLS listings: cell phone photos, zero video marketing, and no showing feedback loop. Here's our 48-hour resuscitation.",
      takeaway: "We reshot 4K media and launched reverse prospecting in 48 hours."
    },
    {
      id: 4,
      title: "Behind the Lens: 4K Drone & 3D Matterport Shoot in Nichols Hills",
      duration: "0:49",
      views: "15.7K",
      thumbnail: "/media/properties/11500-gateshead.jpg",
      videoUrl: "/media/videos/vid4.mp4",
      description: "Follow our FAA-certified aerial team and 3D Matterport pro as we capture an architectural masterpiece with golden hour and natural interior light.",
      takeaway: "Out-of-state buyers from California & Texas submitted sight-unseen bids."
    },
    {
      id: 5,
      title: "How Our Cancel-Anytime Listing Guarantee Actually Protects You",
      duration: "0:52",
      views: "22.3K",
      thumbnail: "/media/gallery/brian-closing-clients.jpeg",
      videoUrl: "/media/videos/vid5.mp4",
      description: "Most traditional real estate agents trap you in a binding 6-month contract with zero accountability. Brian Jamison puts his neck on the line.",
      takeaway: "If we don't deliver on our commitments, you can fire us anytime. $0 penalty."
    }
  ];

  // 6 Core Processes Data
  const PROCESSES_DATA = [
    {
      number: "01",
      id: "media-exposure",
      title: "Elite Media & Exposure Engine",
      subtitle: "The Marketing Machine That Generates Peak-Market Bidding Wars",
      desc: "We do not passively place a sign in the lawn and pray. We deploy an institutional, 14-point marketing blitz designed to generate thousands of views and emotional attachment before the public open house.",
      subDeliverables: [
        {
          num: "1.1",
          name: "Home-Prep Guidance",
          detail: "Room-by-room architectural review, decluttering roadmap, and high-ROI renovation advice that yields $3–$5 in equity per $1 invested."
        },
        {
          num: "1.2",
          name: "Professional Photography",
          detail: "Golden-hour & architectural HDR interior/exterior shoots with specialized wide-angle tilt-shift lenses."
        },
        {
          num: "1.3",
          name: "Cinematic Walkthrough Video",
          detail: "4K high-bitrate cinema film on stabilized gimbals with bespoke sound design and emotional lifestyle pacing."
        },
        {
          num: "1.4",
          name: "HD Aerial & Drone Footage",
          detail: "FAA Part-107 certified drone sweeps showcasing lot boundaries, privacy tree lines, and neighborhood amenities."
        },
        {
          num: "1.5",
          name: "Matterport 3D Tour",
          detail: "Interactive spatial dollhouse scan providing 24/7 global virtual open-house access for out-of-state buyers."
        },
        {
          num: "1.6",
          name: "Syndication to 350+ Global Portals",
          detail: "Instant algorithmic distribution to Zillow Showcase, Realtor.com Featured, Redfin, Trulia, and global luxury MLS feeds."
        },
        {
          num: "1.7",
          name: "Dedicated Single-Property Website",
          detail: "Custom vanity address URL (e.g., www.123EdmondLuxury.com) showcasing full-resolution media and instant showing booking."
        },
        {
          num: "1.8",
          name: "Hyper-Targeted Social Advertising",
          detail: "Paid Meta campaigns (Facebook & Instagram) geo-targeted at pre-approved active buyers and regional corporate executives."
        },
        {
          num: "1.9",
          name: "Active Listing Refreshes",
          detail: "Algorithmic photo rotation and MLS feed updates to keep your property ranking at the top of buyer alert emails."
        },
        {
          num: "1.10",
          name: "Reverse Prospecting",
          detail: "Direct query of the MLS backend to pitch agents whose active pre-approved buyers match your property's exact criteria."
        },
        {
          num: "1.11",
          name: "Downtown & Metro Agent Networking",
          detail: "Direct telephone pitches to top-producing Oklahoma City luxury brokers prior to the first weekend open house."
        },
        {
          num: "1.12",
          name: "Full-Time Dedicated Engagement",
          detail: "Daily active campaign management and ad spend optimization, ensuring no buyer inquiry sits unanswered."
        },
        {
          num: "1.13",
          name: "Direct-Mail Print Collateral",
          detail: "Heavyweight 16pt soft-touch glossy postcards and oversized neighborhood announcements sent to affluent zip codes."
        },
        {
          num: "1.14",
          name: "Regional Print Ads",
          detail: "Premium editorial placements in select Oklahoma lifestyle publications and corporate relocation magazines."
        }
      ]
    },
    {
      number: "02",
      id: "communication",
      title: "Transparent & Proactive Communication",
      subtitle: "Zero Guesswork · Real-Time Market Intelligence",
      desc: "The number one complaint sellers have with real estate agents is radio silence after signing the listing agreement. We eradicate seller anxiety through institutional transparency and mandatory feedback cycles.",
      subDeliverables: [
        {
          num: "2.1",
          name: "100% Showing Feedback Policy",
          detail: "Mandatory telephone call to every showing agent within 2 hours of home access to capture unfiltered buyer reactions."
        },
        {
          num: "2.2",
          name: "Real-Time Weekly Dashboards",
          detail: "Transparent weekly reports detailing online impressions, saved searches, in-person private tours, and pricing sentiment."
        },
        {
          num: "2.3",
          name: "Plain-English Guidance",
          detail: "Every purchase agreement, counter-offer, inspection TRRA report, and title disclosure translated into plain English."
        },
        {
          num: "2.4",
          name: "High-Stakes Negotiation",
          detail: "Aggressive, fiduciary-first negotiation defending your bottom line on earnest money, appraisal contingencies, and closing timelines."
        }
      ]
    },
    {
      number: "03",
      id: "accessibility",
      title: "24/7 Direct Accessibility & Zero-Lead Lag",
      subtitle: "Direct Line to Brian Jamison · No Call Centers",
      desc: "Buyer demand moves at the speed of light. If a qualified buyer or agent has to wait 12 hours for a callback, they move on to the next house. We maintain constant operational readiness.",
      subDeliverables: [
        {
          num: "3.1",
          name: "7-Day Direct Availability",
          detail: "Direct access to Brian's private mobile line (405) 513-3039 mornings, days, evenings, and weekends via phone, SMS, and email."
        },
        {
          num: "3.2",
          name: "Redundant Backup Coverage",
          detail: "Licensed listing backup coordinators ensure sudden weekend showing requests and urgent offers are routed within minutes."
        }
      ]
    },
    {
      number: "04",
      id: "support-team",
      title: "The 7-Person Specialized Support Machine",
      subtitle: "A Cohesive Fiduciary Unit Managing Every Detail",
      desc: "Solo real estate agents cannot simultaneously shoot media, manage escrow paperwork, field buyer inquiries, and negotiate contracts. Brian is backed by 7 dedicated specialists.",
      subDeliverables: [
        {
          num: "4.1",
          name: "Dedicated Personal Assistant",
          detail: "Client liaison managing showing schedules, lockbox access, and seamless seller day-to-day communications."
        },
        {
          num: "4.2",
          name: "Certified Transaction Coordinator",
          detail: "Contract and title compliance manager tracking earnest deposits, title commitments, and Oklahoma closing timelines."
        },
        {
          num: "4.3",
          name: "Professional Staging Crew",
          detail: "Interior aesthetic consultants optimizing room layout, lighting warmth, and spatial flow for photography."
        },
        {
          num: "4.4",
          name: "Listing Operations Specialist",
          detail: "MLS data architect ensuring flawless syndication across 350+ portals and single-property custom domains."
        },
        {
          num: "4.5",
          name: "Creative Media & Design Team",
          detail: "Graphic designers producing digital ad graphics, luxury brochures, and magazine-quality print collateral."
        },
        {
          num: "4.6",
          name: "Architectural Photographers & Drone Pilots",
          detail: "FAA Part-107 certified aerial specialists capturing true golden-hour HDR footage."
        },
        {
          num: "4.7",
          name: "Post-Close Support Specialist",
          detail: "Assists with final utility transfers, mover coordination, escrow reconciliation, and post-closing document archives."
        }
      ]
    },
    {
      number: "05",
      id: "pricing-strategy",
      title: "Data-Driven Pricing Strategy",
      subtitle: "Psychological Bracketing & Peak-Demand Calibration",
      desc: "Overpricing your home by even 3% causes it to sit on the market, stigmatize the listing, and eventually sell below true market value. We calibrate prices using institutional financial modeling.",
      subDeliverables: [
        {
          num: "5.1",
          name: "Downtown OKC & Metro Market Intel",
          detail: "Continuous analysis of Days on Market (DOM), absorption velocity, and competitor price cuts in your micro-neighborhood."
        },
        {
          num: "5.2",
          name: "Adjacent Lot & Acreage Premium Addition",
          detail: "Detailed valuation of non-reproducible land equity, custom pools, workshops, and school district premiums."
        },
        {
          num: "5.3",
          name: "3-Tier Strategic Pricing Architecture",
          detail: "We model Conservative (rapid liquidation), Target (peak comp value), and Aspirational (surge-demand test) pricing tiers."
        },
        {
          num: "5.4",
          name: "Bidding-War Optimization",
          detail: "Calibrating price just beneath major online search thresholds (e.g. $499k vs $505k) to maximize opening-weekend buyer traffic."
        }
      ]
    },
    {
      number: "06",
      id: "fair-partnership",
      title: "Fair Partnership & Cancel-Anytime Guarantee",
      subtitle: "100% Risk-Free Fiduciary Commitment",
      desc: "We believe real estate agents should only earn their commission when they fulfill every single promise. If we ever fail to live up to our standards, you can fire us immediately with zero penalty.",
      subDeliverables: [
        {
          num: "6.1",
          name: "Performance-Aligned Representation",
          detail: "Our fee structure is directly tied to maximizing your net cash proceeds, not merely securing a quick transaction."
        },
        {
          num: "6.2",
          name: "100% Cancel-Anytime Listing Pledge",
          detail: "If at any point you are dissatisfied with our marketing, communication, or counsel, cancel your agreement with zero hassle."
        }
      ]
    }
  ];

  // Checklist Data
  const CHECKLIST_SECTIONS = [
    {
      category: "Curb Appeal & Exterior Architecture",
      items: [
        { id: "curb-1", title: "Power-wash driveway, walkway, and front porch", impact: "+$3,500 perceived value" },
        { id: "curb-2", title: "Fresh dark organic mulch and manicured garden borders", impact: "Curb appeal hook" },
        { id: "curb-3", title: "Modern high-contrast architectural house numbers", impact: "First-impression lift" },
        { id: "curb-4", title: "Touch up front entry door paint and polish hardware", impact: "Zero-defect threshold" }
      ]
    },
    {
      category: "Kitchen & Entertaining Great Rooms",
      items: [
        { id: "kitchen-1", title: "Clear 80% of kitchen countertop appliances & personal items", impact: "Spatial enlargement" },
        { id: "kitchen-2", title: "Replace all ambient light bulbs with 3000K warm white LEDs", impact: "Photographic perfection" },
        { id: "kitchen-3", title: "Deep clean range hood, oven interiors, and stainless surfaces", impact: "Eliminates inspection red flags" },
        { id: "kitchen-4", title: "Modernize cabinet pulls and designer barstool seating", impact: "+$5,000 modern feel" }
      ]
    },
    {
      category: "Bathrooms & Primary Spa Suites",
      items: [
        { id: "bath-1", title: "Stage crisp neutral white bath sheets and rolled washcloths", impact: "Luxury resort ambiance" },
        { id: "bath-2", title: "Squeegee and descale glass shower doors completely", impact: "Sparkle in HDR photos" },
        { id: "bath-3", title: "Deep clean and bleach grout lines in shower and vanity", impact: "Turnkey assurance" },
        { id: "bath-4", title: "Remove all personal medications, toiletries, and robes", impact: "Depersonalized appeal" }
      ]
    },
    {
      category: "Mechanicals, Roof & Systems Integrity",
      items: [
        { id: "mech-1", title: "Pre-listing HVAC tune-up and replace fresh air filters", impact: "Bypasses TRRA objections" },
        { id: "mech-2", title: "Pre-inspect roof for seasonal hail and wind damage", impact: "Prevents escrow collapse" },
        { id: "mech-3", title: "Test all smoke detectors, GFCIs, and exterior garage remotes", impact: "Smooth appraisal pass" },
        { id: "mech-4", title: "Gather receipts and warranties for roof, HVAC, and hot water", impact: "Solidifies buyer confidence" }
      ]
    }
  ];

  // FAQs Data
  const FAQS_DATA = [
    {
      q: "How does your Cancel-Anytime Listing Guarantee actually work?",
      a: "Most agents lock you into a rigid 6-month contract where you are trapped even if they take poor cell phone photos or stop answering calls. With Brian Jamison, you have a 100% written right to terminate our listing agreement at any time with zero cancellation fee, zero penalty, and no awkward confrontations. We earn your partnership every single day."
    },
    {
      q: "What is the Oklahoma TRRA period and how do you protect our proceeds?",
      a: "TRRA stands for Treatments, Repairs, and Replacements under the Oklahoma Real Estate Commission (OREC) contract. Once an offer is accepted, buyers have a standard 10-day investigation period to inspect the home and demand repairs. We aggressively defend you by performing pre-listing mechanical audits, obtaining competing licensed contractor bids, and negotiating repair caps so buyers cannot nickel-and-dime your equity."
    },
    {
      q: "What if our Oklahoma roof has recent hail storm damage?",
      a: "Oklahoma is known for severe spring hail storms. If your roof has sustained storm damage, listing without an expert strategy can kill a deal during insurance underwriting. We work directly with licensed roofing inspectors and your insurance adjuster before listing, ensuring claims are properly filed, deductibles are managed, and buyers receive a transferable new roof warranty at closing."
    },
    {
      q: "Do I have to pay anything upfront for the 4K video, drone mapping, and Matterport tour?",
      a: "No. Zero out-of-pocket marketing expenses. We front 100% of the cost for high-definition aerial drone photography, cinema walkthrough videos, Matterport 3D scans, single-property websites, and paid Meta social ad campaigns. If your home does not sell, you owe us nothing."
    },
    {
      q: "How do you handle showings if we have kids, pets, or work from home?",
      a: "We implement our Concierge Showing Protocol. You specify blackout hours, require 2-hour minimum notice, and receive instant SMS notifications to approve or decline every appointment. We can also schedule focused 3-hour open house weekend blitzes to consolidate buyer traffic into one convenient afternoon."
    },
    {
      q: "What is reverse prospecting and how does it find buyers before public listing?",
      a: "In the Oklahoma MLS backend, top agents have pre-approved buyers whose search algorithms match your home's square footage, school district, and price. Through reverse prospecting, we can see the exact agent IDs representing those active buyers. Brian directly calls those agents before public launch to schedule private off-market previews."
    },
    {
      q: "How is Brian Jamison different from a traditional solo real estate agent?",
      a: "A solo agent wears 10 hats: they take their own photos, answer their own phones, type up escrow papers, and rush between showings. Brian operates like a championship sports franchise: he focuses 100% on strategic marketing, pricing architecture, and high-stakes negotiation, supported by 7 licensed team specialists managing operations."
    },
    {
      q: "How do you establish the 3-Tier Strategic Pricing model?",
      a: "We analyze hyper-local comps within a 1-mile radius from the last 90 days, factoring in micro-market absorption rates, school attendance zones, and land value. We then present three strategic pricing options: Conservative (rapid cash liquidation), Target (comp-backed peak market), and Aspirational (surge-demand test) so you are in complete control of your financial destiny."
    }
  ];

  return (
    <div className="w-full bg-[#FAF9F6] text-[#002D61] selection:bg-[#EA580C]/20 selection:text-[#002D61] overflow-x-hidden">
      {/* 
        ========================================================================
        SECTION 1: CINEMATIC SUNSET VIDEO HERO
        ========================================================================
      */}
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker="The 6-Step Seller Blueprint"
        title="How We Sell Oklahoma City Homes for Maximum Net Proceeds."
        subtitle="From pre-listing architectural media and 350+ portal syndication to data-backed pricing and 24/7 negotiation—here is the exact 6-phase playbook we execute for your property."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '$70M+', label: 'Volume Sold' },
          { value: '370+', label: 'Career Closings' },
          { value: '99.4%', label: 'Sale-to-List Ratio' },
          { value: '100%', label: 'Cancel-Anytime Pledge' },
        ]}
        primaryCtaText="Request Home Valuation"
        secondaryCtaText="Explore 6-Phase Selling Machine"
        onSecondaryCtaClick={() => scrollToSection('section-reels')}
        onNavigate={onNavigate}
        onOpenValuation={onOpenValuation}
        onOpenConsultation={onOpenConsultation}
      />

      {/* 
        ========================================================================
        SECTION 2: STICKY SECTION SUB-NAVIGATION RIBBON
        ========================================================================
      */}
      <div className="sticky top-0 z-40 w-full bg-[#002D61] text-white border-b border-white/15 shadow-md backdrop-blur-md">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-3.5 gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
            {[
              { id: 'section-processes', key: 'processes', label: '01 The 6 Processes' },
              { id: 'section-reels', key: 'reels', label: '02 Media & Reels' },
              { id: 'section-checklist', key: 'checklist', label: '03 Prep Checklist' },
              { id: 'section-calculator', key: 'calculator', label: '04 Net Calculator' },
              { id: 'section-realities', key: 'realities', label: '05 OK Realities' },
              { id: 'section-cases', key: 'cases', label: '06 Case Studies' },
              { id: 'section-comparison', key: 'comparison', label: '07 Comparison' },
              { id: 'section-faqs', key: 'faqs', label: '08 FAQs' }
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

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={onOpenValuation}
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm ml-auto"
            >
              <span>Instant Appraisal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        SECTION 3: THE 6 CORE SELLING PROCESSES (THE MASTER FRAMEWORK)
        ========================================================================
      */}
      <section id="section-processes" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              The Master Selling Playbook
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              The 6 Core Selling Processes
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Every home we represent is funneled through this strict, proprietary hierarchy. We combine cinematic architectural branding with forensic data analytics so your home commands record-setting offers.
            </p>
          </div>

          {/* Interactive Process Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-10">
            {PROCESSES_DATA.map((proc, idx) => (
              <button
                key={proc.id}
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
                    {proc.number}
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
                    Process {PROCESSES_DATA[activeProcessTab].number}
                  </span>
                  <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#EA580C]">
                    {PROCESSES_DATA[activeProcessTab].subtitle}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-3">
                  {PROCESSES_DATA[activeProcessTab].title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed">
                  {PROCESSES_DATA[activeProcessTab].desc}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Discuss This Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sub-processes Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {PROCESSES_DATA[activeProcessTab].subDeliverables.map((item) => (
                <div
                  key={item.num}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E0D8] hover:border-[#EA580C] transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#EA580C]/30 text-xs font-mono font-bold text-[#EA580C]">
                        {item.num}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    </div>
                    <h5 className="font-serif text-base font-bold text-[#002D61] mb-2 leading-snug">
                      {item.name}
                    </h5>
                    <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                      {item.detail}
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
        SECTION 4: VIDEO SHOWCASE & 9:16 VERTICAL REELS HUB
        ========================================================================
      */}
      <section id="section-reels" className="w-full py-20 sm:py-28 bg-[#001D40] text-white border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>60-Second Seller Masterclass</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Watch Brian In Action
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Real-world demonstrations from the trenches of the Oklahoma City luxury market. Click any 9:16 reel to watch Brian dissect staging, drone shoots, and negotiation defense.
            </p>
          </div>

          {/* 9:16 Vertical Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {REELS_DATA.map((reel, index) => (
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
                    Reel 0{reel.id}
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
              key={REELS_DATA[selectedReelIndex].videoUrl}
              src={REELS_DATA[selectedReelIndex].videoUrl}
              poster={REELS_DATA[selectedReelIndex].thumbnail}
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
                  <span className="text-[10px] text-[#FB923C] font-medium leading-none">Top 2% Producer</span>
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
                Masterclass Takeaway
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white mb-1.5 leading-snug line-clamp-2">
                {REELS_DATA[selectedReelIndex].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mb-3 line-clamp-3">
                {REELS_DATA[selectedReelIndex].takeaway}
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
        SECTION 5: PRE-LISTING ROOM-BY-ROOM HIGH-ROI CHECKLIST
        ========================================================================
      */}
      <section id="section-checklist" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
                Pre-Flight Preparation Roadmap
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-4">
                Room-by-Room High-ROI Checklist
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed">
                Do not spend $30,000 on major kitchen overhauls that return 50 cents on the dollar. Focus strictly on these proven cosmetic, lighting, and exterior adjustments that trigger multiple opening-weekend offers.
              </p>
            </div>

            {/* Interactive Readiness Score Meter */}
            <div className="bg-[#F5EFE6] border border-[#EA580C]/30 rounded-2xl p-5 sm:p-6 min-w-[280px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                  Listing Readiness Score
                </span>
                <span className="font-mono text-lg font-bold text-[#EA580C]">
                  {checklistScore}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#E5E0D8] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-[#EA580C] to-[#16A34A] transition-all duration-500"
                  style={{ width: `${checklistScore}%` }}
                />
              </div>
              <span className="text-[11px] text-[#6B7280] block">
                {Object.values(checkedItems).filter(Boolean).length} of 16 strategic items checked
              </span>
            </div>
          </div>

          {/* Checklist Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {CHECKLIST_SECTIONS.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs"
              >
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#FAF9F6]">
                  <div className="w-8 h-8 rounded-full bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center font-serif font-bold text-sm">
                    0{sIdx + 1}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#002D61]">
                    {sec.category}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {sec.items.map((item) => {
                    const isDone = !!checkedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleChecklist(item.id)}
                        className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 select-none ${
                          isDone
                            ? 'bg-[#F0FDF4] border-[#86EFAC]/60 text-[#14532D]'
                            : 'bg-[#FAF9F6] border-[#E5E0D8] text-[#374151] hover:border-[#EA580C]/40'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isDone ? 'bg-[#16A34A] text-white' : 'border border-[#9CA3AF] bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs sm:text-sm font-medium ${isDone ? 'line-through text-[#4B5563]' : 'text-[#002D61]'}`}>
                            {item.title}
                          </p>
                          <span className="text-[11px] font-mono text-[#EA580C] font-semibold block mt-0.5">
                            {item.impact}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: OKLAHOMA LOCAL REALITIES (LOCAL AUTHORITY)
        ========================================================================
      */}
      <section id="section-realities" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Forensic Local Real Estate Defense
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Oklahoma Local Realities
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Real estate in Oklahoma City has unique contractual and environmental hurdles. If your agent is inexperienced with TRRA deadlines, hail claims, or red clay foundation shifting, your deal will fall apart in escrow. Here is how we safeguard your transaction.
            </p>
          </div>

          {/* 3 Major Local Realities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Reality 1: TRRA Period */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-2">
                  OREC Contract Standard
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  The 10-Day TRRA Period
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Under standard Oklahoma Real Estate Commission contracts, buyers have 10 calendar days to conduct home inspections and issue a Treatment, Repair, and Replacement (TRRA) request.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-6">
                  <div className="font-bold text-[#002D61]">Our Defense Protocol:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Pre-listing HVAC & electrical checkup to identify flags first.</li>
                    <li>Vetted contractor quotes ready within 24 hours of TRRA delivery.</li>
                    <li>Strategic financial credit counter-proposals to prevent cash outflow.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Result: Zero surprise cancellations during escrow.
              </span>
            </div>

            {/* Reality 2: Hail Storm Damage & Roof Claims */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-2">
                  Severe Weather Reality
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Hail Damage & Roof Claims
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Spring hail storms frequently impact Oklahoma roofs. If a buyer's insurance inspector flags unaddressed hail bruises, lender financing can be held hostage right before closing.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-6">
                  <div className="font-bold text-[#002D61]">Our Defense Protocol:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Pre-listing drone roof scan by FAA Part-107 pilots.</li>
                    <li>Direct liaison with your insurance adjuster to settle claims early.</li>
                    <li>Passing transferable lifetime shingle warranties to incoming buyers.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Result: Clean insurance underwriting & on-time closing.
              </span>
            </div>

            {/* Reality 3: Red Clay Soil & Foundation Shifts */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-2">
                  Oklahoma Geological Factor
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Red Clay Soil & Foundations
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Oklahoma's expansive red Permian clay expands in wet seasons and shrinks severely in summer heat, creating cosmetic dry-wall hairline cracks that terrify uneducated buyers.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-6">
                  <div className="font-bold text-[#002D61]">Our Defense Protocol:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Differentiate harmless seasonal settlement from structural defects.</li>
                    <li>Provide existing foundation piering warranties directly in MLS files.</li>
                    <li>Professional structural engineer letters ready to present on day one.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Result: Buyers pay top dollar without fear of foundation issues.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 7: INTERACTIVE SELLER NET PROCEEDS CALCULATOR
        ========================================================================
      */}
      <section id="section-calculator" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Transparency & Financial Modeling
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Interactive Seller Net Proceeds Calculator
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Calculate your estimated net cash walk-away proceeds at the closing table. Factor in Oklahoma documentary stamps, title fees, escrow reserves, and existing mortgage payoffs in real time.
            </p>
          </div>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Panel */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#002D61] pb-3 border-b border-[#FAF9F6]">
                Enter Property Figures
              </h3>

              {/* Estimated Sale Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Estimated Selling Price
                  </label>
                  <span className="font-mono text-lg font-bold text-[#EA580C]">
                    ${calcPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="2500000"
                  step="10000"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-mono">
                  <span>$200,000</span>
                  <span>$1,000,000</span>
                  <span>$2,500,000</span>
                </div>
              </div>

              {/* Existing Mortgage Balance */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Existing Mortgage Payoff
                  </label>
                  <span className="font-mono text-lg font-bold text-[#002D61]">
                    ${calcMortgage.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={calcPrice}
                  step="5000"
                  value={calcMortgage}
                  onChange={(e) => setCalcMortgage(Number(e.target.value))}
                  className="w-full accent-[#002D61] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-mono">
                  <span>$0 (Owned Free & Clear)</span>
                  <span>${calcPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Commission Percentage */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Total Brokerage Commission
                  </label>
                  <span className="font-mono text-lg font-bold text-[#002D61]">
                    {calcCommissionPct.toFixed(1)}%
                  </span>
                </div>
                <div className="flex gap-2">
                  {[4.5, 5.0, 5.5, 6.0].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setCalcCommissionPct(rate)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
                        calcCommissionPct === rate
                          ? 'bg-[#002D61] text-white border-[#002D61]'
                          : 'bg-[#FAF9F6] text-[#002D61] border-[#E5E0D8] hover:bg-[#F5EFE6]'
                      }`}
                    >
                      {rate.toFixed(1)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-[#6B7280] leading-relaxed pt-2">
                *Estimates include standard Oklahoma Documentary Stamps ($0.75 per $500), average title insurance fees, closing escrow reserves, and prorated property taxes. Final numbers determined by closing title company.
              </p>
            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-6 bg-[#001D40] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#FB923C] block mb-2">
                  Estimated Walk-Away Equity
                </span>
                <div className="mb-6">
                  <span className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                    ${netCashToSeller.toLocaleString()}
                  </span>
                  <span className="block text-xs font-mono text-white/70 mt-1">
                    ~{netProceedsPercentage}% of gross selling price in your pocket
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-gradient-to-r from-[#EA580C] to-[#16A34A] transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(10, netProceedsPercentage))}%` }}
                  />
                </div>

                {/* Itemized Breakdown List */}
                <div className="space-y-3 pb-6 border-b border-white/15 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-white/80">
                    <span>Gross Sales Price</span>
                    <span className="font-mono text-white font-semibold">${calcPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Less Mortgage Payoff</span>
                    <span className="font-mono text-[#F87171] font-semibold">-${calcMortgage.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Brokerage Commission ({calcCommissionPct}%)</span>
                    <span className="font-mono text-[#F87171]">-${totalCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Oklahoma Documentary Stamps (0.15%)</span>
                    <span className="font-mono text-white/70">-${docStamps.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Title Insurance & Escrow Closing</span>
                    <span className="font-mono text-white/70">-${titleAndEscrow.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Estimated Repair & Inspection Concessions</span>
                    <span className="font-mono text-white/70">-${estimatedRepairsConcessions.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="w-full py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <span>Request Full Formal CMA & Title Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: REAL DEAL CASE STUDIES (BEFORE & AFTER)
        ========================================================================
      */}
      <section id="section-cases" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Documented Field Results
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Real Deal Case Studies
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              When other agents fail to deliver, sellers turn to Brian Jamison to salvage their timeline and equity. Examine how our media, staging, and pricing strategies transformed stale listings into competitive bidding wars.
            </p>
          </div>

          {/* Case Studies 2-Column Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Case Study 1: The Expired Listing Turnaround in Edmond */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative h-64 w-full bg-[#002D61] overflow-hidden">
                  <img
                    src="/media/properties/22801-n-briarwood-edmond.jpeg"
                    alt="Edmond Expired Listing Turnaround"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-[#EF4444] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      Expired Listing Salvaged
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                      The Expired Listing Turnaround in Edmond
                    </h3>
                    <span className="text-xs text-white/80 font-sans">
                      Autumn Ridge · Edmond, Oklahoma
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  {/* Problem */}
                  <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40 text-xs sm:text-sm">
                    <strong className="text-[#991B1B] block mb-1 uppercase text-[11px] tracking-wider">
                      The Problem (Previous Agent):
                    </strong>
                    <p className="text-[#7F1D1D] leading-relaxed">
                      Sat on the market for 120 agonizing days with a solo agent. Cell-phone wide-angle photos, zero motion video, and exactly zero written offers received.
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/30 text-xs sm:text-sm">
                    <strong className="text-[#EA580C] block mb-1 uppercase text-[11px] tracking-wider">
                      The Brian Jamison Solution:
                    </strong>
                    <p className="text-[#374151] leading-relaxed">
                      Executed our 6-Phase Selling Blueprint: professional architectural HDR photography, physical and virtual staging to define dead space, and a strategic $10k pricing realignment just beneath the search threshold.
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC]/50 text-xs sm:text-sm">
                    <strong className="text-[#166534] block mb-1 uppercase text-[11px] tracking-wider">
                      The Documented Result:
                    </strong>
                    <p className="text-[#14532D] font-semibold leading-relaxed">
                      Generated 18 private showings in 72 hours. Received a full-price cash contract on Day 4, closing in 14 days with zero repair concessions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-3 bg-[#002D61] hover:bg-[#001D40] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer text-center"
                >
                  Turn Around Your Stale Listing
                </button>
              </div>
            </div>

            {/* Case Study 2: Nichols Hills Luxury Estate */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="relative h-64 w-full bg-[#002D61] overflow-hidden">
                  <img
                    src="/media/gallery/modern-estate-pool-lawn.jpeg"
                    alt="Nichols Hills Luxury Estate"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-[#16A34A] text-white text-[10px] font-bold uppercase tracking-wider shadow">
                      Multiple Offer Bidding War
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                      Nichols Hills Luxury Estate
                    </h3>
                    <span className="text-xs text-white/80 font-sans">
                      Grand Boulevard · Nichols Hills, Oklahoma
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  {/* Problem */}
                  <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5]/40 text-xs sm:text-sm">
                    <strong className="text-[#991B1B] block mb-1 uppercase text-[11px] tracking-wider">
                      The Challenge:
                    </strong>
                    <p className="text-[#7F1D1D] leading-relaxed">
                      A distinctive $1.4M custom estate requiring an ultra-specific buyer profile. Local comps were stagnant, and conventional MLS marketing was yielding only passive curiosity.
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/30 text-xs sm:text-sm">
                    <strong className="text-[#EA580C] block mb-1 uppercase text-[11px] tracking-wider">
                      The Brian Jamison Solution:
                    </strong>
                    <p className="text-[#374151] leading-relaxed">
                      Produced a cinema-grade 4K lifestyle walkthrough video with professional actors, launched geo-targeted Meta ad campaigns directly to corporate executives relocating from Dallas and California, and paired it with a 3D Matterport scan.
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC]/50 text-xs sm:text-sm">
                    <strong className="text-[#166534] block mb-1 uppercase text-[11px] tracking-wider">
                      The Documented Result:
                    </strong>
                    <p className="text-[#14532D] font-semibold leading-relaxed">
                      Generated 3 competing offers during opening weekend. Closed at $35,000 above asking price with an all-cash out-of-state buyer.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0">
                <button
                  type="button"
                  onClick={onOpenValuation}
                  className="w-full py-3 bg-[#002D61] hover:bg-[#001D40] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer text-center"
                >
                  Price Your Luxury Estate
                </button>
              </div>
            </div>
          </div>

          {/* Live Verified MLS Sold / Pending Representations (Widget 176754) */}
          <div className="mt-14 sm:mt-16">
            <IdxUniversalWidget
              widgetId="176754"
              type="showcase"
              title="Verified Sold & Pending MLS Representations"
              subtitle="Live MLSOK broker syndication documenting Brian Jamison's recent closed escrows and active pending contracts."
              badge="Verified Sales Feed"
              minHeight="480px"
            />
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 9: COMPARISON MATRIX: BRIAN JAMISON VS. SOLO AGENT VS. IBUYER
        ========================================================================
      */}
      <section id="section-comparison" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Fiduciary Transparency
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Representation Matrix
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Not all listing representations are created equal. Compare how Brian Jamison's institutional 6-Phase machine stacks up against traditional solo agents and predatory iBuyer cash offers that shave 10–14% off your equity.
            </p>
          </div>

          {/* Structured Table */}
          <div className="overflow-x-auto rounded-3xl border border-[#E5E0D8] bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E5E0D8] bg-[#F5EFE6]">
                  <th className="p-5 sm:p-6 text-xs font-bold uppercase tracking-wider text-[#002D61] w-1/4">
                    Listing Criteria
                  </th>
                  <th className="p-5 sm:p-6 text-xs font-bold uppercase tracking-wider text-white bg-[#002D61] w-1/3 border-x border-[#002D61]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FB923C]" />
                      <span>Brian Jamison (Salt Real Estate)</span>
                    </div>
                  </th>
                  <th className="p-5 sm:p-6 text-xs font-bold uppercase tracking-wider text-[#4B5563] w-1/5">
                    Traditional Solo Agent
                  </th>
                  <th className="p-5 sm:p-6 text-xs font-bold uppercase tracking-wider text-[#EF4444] w-1/5">
                    iBuyer / Instant Cash Offer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D8] text-xs sm:text-sm">
                <tr>
                  <td className="p-5 font-semibold text-[#002D61]">
                    Upfront Marketing Budget
                  </td>
                  <td className="p-5 bg-[#002D61]/5 border-x border-[#002D61]/15 font-bold text-[#002D61]">
                    $3,500+ out of pocket (4K video, drone, paid Meta ads, 350+ portals)
                  </td>
                  <td className="p-5 text-[#4B5563]">
                    $200–$400 (Basic cell phone photos & passive MLS entry)
                  </td>
                  <td className="p-5 text-[#EF4444] font-medium">
                    $0 (No marketing; they buy directly to flip)
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#002D61]">
                    3D Matterport & 4K Drone
                  </td>
                  <td className="p-5 bg-[#002D61]/5 border-x border-[#002D61]/15 font-bold text-[#16A34A] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Included Standard on Every Listing</span>
                  </td>
                  <td className="p-5 text-[#4B5563]">
                    Rarely included or charged extra to seller
                  </td>
                  <td className="p-5 text-[#EF4444] font-medium">
                    None (internal assessment only)
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#002D61]">
                    Average Sale-to-List Ratio
                  </td>
                  <td className="p-5 bg-[#002D61]/5 border-x border-[#002D61]/15 font-bold text-[#EA580C] text-base font-mono">
                    99.4% List-to-Sale
                  </td>
                  <td className="p-5 text-[#4B5563] font-mono">
                    94.0% – 96.5%
                  </td>
                  <td className="p-5 text-[#EF4444] font-mono font-bold">
                    84.0% – 88.0% of fair value
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#002D61]">
                    Hidden Fees & Deductions
                  </td>
                  <td className="p-5 bg-[#002D61]/5 border-x border-[#002D61]/15 font-bold text-[#002D61]">
                    Zero hidden fees. Standard negotiated commission only.
                  </td>
                  <td className="p-5 text-[#4B5563]">
                    Administrative desk fees ($350–$650) often added
                  </td>
                  <td className="p-5 text-[#EF4444] font-semibold">
                    10%–14% deductions (Service fees, repair credits & discount haircuts)
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#002D61]">
                    Contract Flexibility & Risk
                  </td>
                  <td className="p-5 bg-[#002D61]/5 border-x border-[#002D61]/15 font-bold text-[#16A34A] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>100% Risk-Free Cancel-Anytime Pledge</span>
                  </td>
                  <td className="p-5 text-[#4B5563]">
                    Locked in rigid 6-month agreement with cancellation penalties
                  </td>
                  <td className="p-5 text-[#EF4444] font-medium">
                    Rigid contract; can cancel during inspection at their whim
                  </td>
                </tr>

                <tr>
                  <td className="p-5 font-semibold text-[#002D61]">
                    Support Network
                  </td>
                  <td className="p-5 bg-[#002D61]/5 border-x border-[#002D61]/15 font-bold text-[#002D61]">
                    7-Person Specialized Machine (Coordination, Staging, Media, Legal)
                  </td>
                  <td className="p-5 text-[#4B5563]">
                    Solo agent wearing 10 hats alone
                  </td>
                  <td className="p-5 text-[#4B5563]">
                    Anonymous corporate call center representative
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 10: FORENSIC SELLER FAQS & HIGH-CONVERTING LEAD MAGNET
        ========================================================================
      */}
      <section id="section-faqs" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Forensic Seller Clarifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Straightforward answers to the questions serious Oklahoma homeowners ask before entrusting their greatest asset to a real estate advisor.
            </p>
          </div>

          {/* FAQs Accordion */}
          <div className="max-w-4xl space-y-4 mb-16">
            {FAQS_DATA.map((faq, idx) => {
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
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#EA580C]/20 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
                <FileText className="w-3.5 h-3.5" />
                <span>Instant Digital PDF Resource</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Download The Complete 2026 Oklahoma Home Seller Playbook
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                A 36-page forensic guide covering room-by-room preparation, the 10-day TRRA defense strategy, roof hail insurance negotiation, and our proprietary 6-step marketing calendar.
              </p>

              {downloadSuccess ? (
                <div className="p-4 rounded-xl bg-[#16A34A]/20 border border-[#86EFAC]/40 text-xs sm:text-sm text-[#86EFAC] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your 2026 Seller Playbook download has commenced! Check your downloads folder.</span>
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
                  <span>Download The Free 2026 Seller Playbook (PDF)</span>
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
              Ready To Maximize Your Proceeds?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002D61] mb-3">
              Schedule Your Private Seller Strategy Consultation
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
                <span>Request 3-Tier Valuation</span>
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
