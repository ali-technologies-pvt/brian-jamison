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

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
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
      subtitle: "Comprehensive Property Marketing Strategy",
      desc: "We do more than place a sign in the yard and wait for inquiries. Our marketing approach combines property preparation, professional media, online exposure, and direct outreach to present your home effectively and encourage qualified buyers to schedule a showing.",
      subDeliverables: [
        {
          num: "1.1",
          name: "Home-Prep Guidance",
          detail: "Room-by-room preparation advice, decluttering suggestions, and practical updates that may improve presentation. We help you prioritize work based on the property's condition, budget, and likely buyer expectations rather than assuming every renovation will pay for itself."
        },
        {
          num: "1.2",
          name: "Professional Photography",
          detail: "Professional interior and exterior photography designed to show your home's layout, natural light, finishes, and defining features clearly across listing platforms."
        },
        {
          num: "1.3",
          name: "Cinematic Walkthrough Video",
          detail: "Property walkthrough videos that highlight the home's flow, architectural details, and useful features. Video format and production depend on the property's needs and the agreed marketing plan."
        },
        {
          num: "1.4",
          name: "HD Aerial & Drone Footage",
          detail: "Aerial images and video, where suitable and permitted, can show lot layout, outdoor spaces, nearby features, and the property's setting. Drone work must follow applicable FAA rules and operating restrictions."
        },
        {
          num: "1.5",
          name: "Matterport 3D Tour",
          detail: "Where appropriate, an interactive 3D tour can help remote buyers explore the home's layout before scheduling an in-person showing."
        },
        {
          num: "1.6",
          name: "Syndication to 350+ Global Portals",
          detail: "We arrange online listing exposure through the MLS and supported property portals. Distribution, featured placement, and the number of participating sites depend on the listing setup and available services."
        },
        {
          num: "1.7",
          name: "Dedicated Single-Property Website",
          detail: "When included in the marketing plan, a single-property website can bring photos, video, property details, and showing information together in one convenient place."
        },
        {
          num: "1.8",
          name: "Hyper-Targeted Social Advertising",
          detail: "Facebook and Instagram campaigns can help introduce your listing to relevant audiences. Targeting options and campaign settings depend on platform policies, budget, and the property's marketing needs."
        },
        {
          num: "1.9",
          name: "Active Listing Refreshes",
          detail: "We review listing presentation and available performance data to identify opportunities for improvement. Photo order, property details, and marketing activity may be adjusted when supported by buyer response and market conditions."
        },
        {
          num: "1.10",
          name: "Reverse Prospecting",
          detail: "Where supported by MLS tools, reverse prospecting can help identify buyer agents whose saved search criteria may match your property. We can then explore appropriate outreach opportunities."
        },
        {
          num: "1.11",
          name: "Downtown & Metro Agent Networking",
          detail: "Direct outreach to other agents can help introduce your property to professionals working with buyers who may be interested in its features, price, or location."
        },
        {
          num: "1.12",
          name: "Full-Time Dedicated Engagement",
          detail: "We monitor listing activity, review inquiries, and coordinate follow-up during the agreed marketing period. Our goal is to keep communication organized and ensure buyer interest receives appropriate attention."
        },
        {
          num: "1.13",
          name: "Direct-Mail Print Collateral",
          detail: "When suitable for the property and budget, printed postcards or neighborhood announcements can introduce the listing to nearby homeowners and potential referral sources."
        },
        {
          num: "1.14",
          name: "Regional Print Ads",
          detail: "Selected print publications may provide an additional way to showcase suitable properties. Publication choice, placement, and timing depend on the home's audience and the agreed marketing plan."
        }
      ]
    },
    {
      number: "02",
      id: "communication",
      title: "Transparent & Proactive Communication",
      subtitle: "Consistent Showing and Marketing Updates",
      desc: "One concern sellers often raise is not knowing what happens after signing a listing agreement. Our communication process is designed to keep you informed about showings, buyer feedback, marketing activity, offers, and the decisions that may affect your sale.",
      subDeliverables: [
        {
          num: "2.1",
          name: "100% Showing Feedback Policy",
          detail: "We seek feedback from showing agents when available and share useful responses with you. Feedback can offer insight into buyer reactions to the price, condition, layout, and presentation."
        },
        {
          num: "2.2",
          name: "Real-Time Weekly Dashboards",
          detail: "We review available listing activity, online engagement, showing requests, and market changes with you. Reporting frequency and available metrics depend on the marketing tools and the agreed communication plan."
        },
        {
          num: "2.3",
          name: "Plain-English Guidance",
          detail: "We explain purchase offers, counteroffers, inspection requests, disclosures, and title documents in clear language. When legal, tax, or other specialized advice is needed, we help identify the appropriate professional to consult."
        },
        {
          num: "2.4",
          name: "High-Stakes Negotiation",
          detail: "We help you compare offer price, financing terms, earnest money, contingencies, repair requests, and proposed closing dates. Our goal is to help you evaluate the full terms of each offer rather than focusing on price alone."
        }
      ]
    },
    {
      number: "03",
      id: "accessibility",
      title: "24/7 Direct Accessibility & Zero-Lead Lag",
      subtitle: "Direct Accessibility and Timely Follow-Up",
      desc: "Buyer interest can develop quickly. Prompt communication helps you understand new inquiries, showing requests, and incoming offers while decisions are still timely. We establish clear communication expectations and coordinate coverage when scheduling demands require additional support.",
      subDeliverables: [
        {
          num: "3.1",
          name: "7-Day Direct Availability",
          detail: "You can discuss your listing, marketing activity, and offers with Brian through the contact methods and availability arrangements agreed upon at the start of representation."
        },
        {
          num: "3.2",
          name: "Coordinated Backup Coverage",
          detail: "When additional coverage is needed, designated team members can help coordinate showing requests, share messages, and route time-sensitive inquiries to the appropriate person."
        }
      ]
    },
    {
      number: "04",
      id: "support-team",
      title: "The 7-Person Specialized Support Machine",
      subtitle: "Dedicated Support for Every Listing Milestone",
      desc: "Selling a home involves more than marketing. Scheduling, listing information, buyer inquiries, documents, and closing requirements all need attention. When included in the service plan, dedicated support helps keep these tasks organized while we guide the overall selling strategy.",
      subDeliverables: [
        {
          num: "4.1",
          name: "Dedicated Personal Assistant",
          detail: "A designated assistant or coordinator may help manage showing schedules, routine questions, and day-to-day communication."
        },
        {
          num: "4.2",
          name: "Certified Transaction Coordinator",
          detail: "Transaction support helps track contract deadlines, earnest money requirements, title documents, and closing milestones. The responsible professionals and their duties depend on the transaction and brokerage arrangements."
        },
        {
          num: "4.3",
          name: "Professional Staging Crew",
          detail: "Staging recommendations focus on room layout, lighting, furniture placement, and presentation. Professional staging services may be considered when appropriate for the property and budget."
        },
        {
          num: "4.4",
          name: "Listing Operations Specialist",
          detail: "Listing support helps organize property details, photographs, marketing materials, and online listing information for accuracy and consistency."
        },
        {
          num: "4.5",
          name: "Creative Media and Design",
          detail: "Design support may include digital advertisements, property brochures, social graphics, and other marketing materials that present your home's features clearly."
        },
        {
          num: "4.6",
          name: "Photography and Aerial Media",
          detail: "Qualified media professionals can capture property images and aerial footage when appropriate. Drone operators must comply with applicable licensing, safety, and airspace rules."
        },
        {
          num: "4.7",
          name: "Post-Closing Support",
          detail: "After closing, we can help clarify next steps for document organization, utility transfer coordination, and other practical matters within the agreed scope of service."
        }
      ]
    },
    {
      number: "05",
      id: "pricing-strategy",
      title: "Data-Driven Pricing Strategy",
      subtitle: "Market-Evidence Pricing Strategy",
      desc: "Setting the right asking price requires more than choosing a number based on a neighbor's sale. As a home selling agent in Edmond, OK, Brian reviews relevant comparable sales, current competition, property condition, and buyer activity to help you choose a pricing strategy that fits your goals.",
      subDeliverables: [
        {
          num: "5.1",
          name: "Local Market Analysis",
          detail: "We review available information on days on market, comparable sales, competing listings, price changes, and buyer activity in the relevant market segment."
        },
        {
          num: "5.2",
          name: "Property Features and Land Value",
          detail: "Lot size, usable outdoor space, pools, workshops, updates, and other property features may affect market value. We consider these details alongside comparable sales rather than assuming each feature adds a fixed amount."
        },
        {
          num: "5.3",
          name: "Three-Tier Pricing Discussion",
          detail: "We can compare three potential pricing approaches: Conservative (to encourage early interest based on current competition), Target (supported by relevant comparable sales and the property's condition), and Aspirational (a higher test price when market evidence and buyer demand may support it). Each approach has trade-offs. The final asking price is your decision, informed by market data and your selling goals."
        },
        {
          num: "5.4",
          name: "Pricing and Buyer Search Thresholds",
          detail: "Online price filters can affect which buyers see a listing. We consider relevant search ranges, competing homes, and market evidence when recommending a price. A particular price point cannot guarantee more showings or competing offers."
        }
      ]
    },
    {
      number: "06",
      id: "fair-partnership",
      title: "Fair Partnership & Cancel-Anytime Guarantee",
      subtitle: "Clear Partnership and Expectations",
      desc: "A successful working relationship starts with clear expectations. We explain the proposed listing agreement, marketing scope, communication plan, compensation, and applicable cancellation terms before you commit.",
      subDeliverables: [
        {
          num: "6.1",
          name: "Representation Focused on Your Goals",
          detail: "Our listing strategy considers your priorities, property condition, timing, expected costs, and likely buyer response. We help you evaluate offers in terms of potential net proceeds and contractual risk, not just the initial sale price."
        },
        {
          num: "6.2",
          name: "Clear Listing Agreement and Cancellation Terms",
          detail: "Before signing, review the agreement's duration, termination provisions, compensation, and any applicable fees. If you have concerns about the service, we will discuss them and explain the options available under your agreement."
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
      q: "What does a home selling agent do?",
      a: "A home selling agent helps you price your property, prepare it for market, coordinate marketing, manage showings, evaluate offers, negotiate terms, and track the transaction through closing."
    },
    {
      q: "How do I choose the right listing agent?",
      a: "Compare an agent's local experience, marketing plan, pricing approach, communication style, compensation, and listing agreement terms. Ask how they will present your property and keep you informed throughout the sale."
    },
    {
      q: "What does seller representation include?",
      a: "Seller representation may include pricing advice, listing preparation, property marketing, showing coordination, offer negotiation, contract deadline tracking, and closing support. The exact services depend on the written listing agreement."
    },
    {
      q: "How should I price my home for sale?",
      a: "Review recent comparable sales, competing listings, property condition, and current buyer demand. A well-supported asking price can help attract interest, but the final sale price depends on market response and negotiations."
    },
    {
      q: "Do I need to make repairs before listing?",
      a: "Not every home needs major updates before sale. Review visible defects, safety concerns, cleanliness, and presentation first. Your agent can help prioritize improvements, while qualified contractors should assess technical issues."
    },
    {
      q: "How can I compare offers beyond the sale price?",
      a: "Review financing, contingencies, earnest money, requested concessions, closing dates, and other contractual terms. A higher offer may not provide the strongest overall outcome if it carries greater costs or uncertainty."
    },
    {
      q: "What should I ask before signing a listing agreement?",
      a: "Ask about marketing services, communication, pricing reviews, compensation, agreement duration, cancellation terms, and how offers will be presented. Read the full agreement and clarify any terms you do not understand."
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
        kicker="Home Selling"
        title="Home Selling Agent in Edmond, OK, That Protects Your Home's Value"
        subtitle="From professional property media and broad listing exposure to data-backed pricing and skilled negotiation, our selling process is designed to help you attract serious buyers and evaluate competitive offers. As the best realtor for selling a home in Edmond, Brian Jamison guides sellers through preparation, marketing, negotiations, and closing with a focus on clear communication and informed decisions."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '$62M+', label: 'Volume Closed' },
          { value: '370+', label: 'Families Advised' },
          { value: 'Top 2%', label: 'Greater OKC Production' },
          { value: '100%', label: 'Cancel-Anytime Pledge' },
        ]}
        primaryCtaText="Request Home Valuation"
        secondaryCtaText="Explore Selling Strategies"
        onSecondaryCtaClick={() => scrollToSection('section-processes')}
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
              { id: 'section-processes', key: 'processes', label: '01 6-Phase Framework' },
              { id: 'section-reels', key: 'reels', label: '02 Video Guides' },
              { id: 'section-checklist', key: 'checklist', label: '03 Prep Checklist' },
              { id: 'section-realities', key: 'realities', label: '04 Property Diligence' },
              { id: 'section-calculator', key: 'calculator', label: '05 Net Calculator' },
              { id: 'section-cases', key: 'cases', label: '06 Success Stories' },
              { id: 'section-comparison', key: 'comparison', label: '07 Representation' },
              { id: 'section-faqs', key: 'faqs', label: '08 FAQs & Playbook' }
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
              The Marketing Strategies That Attract Serious Buyers
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Every home we represent follows a structured selling process. As your listing agent in Edmond, OK, Brian combines professional marketing, market research, pricing analysis, and transaction coordination to position your property for the right buyers and help you make informed decisions throughout the sale.
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
                Watch Brian Explain the Home Selling Process.
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
              Explore practical video guidance on property preparation, listing photography, pricing decisions, buyer feedback, and offer negotiation. These short educational videos can help you understand the choices involved in preparing and marketing your home.
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
                {/* Background image or drone video preview */}
                {reel.title?.toLowerCase().includes('drone') || reel.title?.toLowerCase().includes('aerial') ? (
                  <video
                    src={reel.videoUrl}
                    poster={reel.thumbnail}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${reel.thumbnail})` }}
                  />
                )}
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
                Pre-Listing Preparation Roadmap
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-4">
                Room-by-Room Home Preparation Checklist
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed">
                You do not need to undertake a major kitchen renovation or spend heavily before listing. Start with visible repairs, decluttering, lighting, cleanliness, and curb appeal. We help you prioritize practical improvements based on your home's current condition, budget, and the expectations of likely buyers.
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
              Local Property Considerations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Preparing for Common Oklahoma Home Sale Challenges
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Selling a property involves more than attracting buyers. Inspection findings, roof condition, foundation concerns, insurance questions, and contract deadlines can affect negotiations and closing. We help you prepare available records, understand the issues raised, and coordinate with qualified professionals when further assessment is needed.
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
                  Oklahoma Contract and Inspection Considerations
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Understanding the TRR and Inspection Process
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Oklahoma purchase contracts may include provisions for inspections and requests concerning treatment, repairs, or replacements. The applicable deadlines and buyer rights depend on the signed contract. Reviewing these terms before accepting an offer can help you prepare for potential requests.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-6">
                  <div className="font-bold text-[#002D61]">Our Preparation Approach:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Consider a pre-listing review of major systems when appropriate.</li>
                    <li>Obtain estimates from qualified contractors when a known issue needs assessment.</li>
                    <li>Review potential repair requests and seller credit proposals before deciding how to respond.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Result: Better preparation for inspection discussions and more informed decisions during negotiations.
              </span>
            </div>

            {/* Reality 2: Hail Storm Damage & Roof Claims */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-2">
                  Severe Weather and Roof Condition
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Hail Damage and Roof Documentation
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Roof condition and prior storm damage may become important during inspections and insurance reviews. We help you organize available repair records and warranties and identify questions to discuss with roofing professionals or your insurer.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-6">
                  <div className="font-bold text-[#002D61]">Our Preparation Approach:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Consider a roof assessment before listing if the condition is uncertain.</li>
                    <li>Gather available repair invoices, inspection records, and insurance claim documents.</li>
                    <li>Confirm warranty coverage and transfer terms directly with the provider.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Result: Clearer roof documentation and fewer unanswered questions for prospective buyers.
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
                  Soil movement and drainage can affect some Oklahoma properties. Visible cracks do not always establish a structural defect, so concerns should be assessed based on the property's condition and, when needed, a qualified professional's findings.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-6">
                  <div className="font-bold text-[#002D61]">Our Preparation Approach:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Gather existing foundation repair records and transferable warranties.</li>
                    <li>Address drainage or maintenance concerns where appropriate.</li>
                    <li>Seek a qualified structural assessment when the condition warrants further review.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Result: Better documentation and a clearer basis for discussing foundation concerns with buyers.
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
              Seller Financial Planning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Interactive Seller Net Proceeds Calculator
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Estimate how much you may receive after a sale by entering your expected sale price, mortgage payoff, agent compensation, title and closing fees, concessions, and other applicable costs. Actual proceeds depend on the final contract, loan balance, negotiated terms, and closing statement. Use the estimate for planning, then confirm the final figures with your real estate professional, lender, and title company.
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
              Edmond Real Estate Success Stories
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Examples of completed sales can help you understand how preparation, marketing, pricing, and negotiation affect a listing. Where verified case studies are available, review the property's starting position, the actions taken, the timeline, and the documented outcome. Results vary by property and market conditions. Any published sale price, savings figure, or performance claim should be supported by accurate transaction records and appropriate context.
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
              How Your Listing Agent Makes Every Move Count
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Listing services can vary in marketing scope, communication, pricing guidance, and transaction support. Before choosing an agent, compare the services included, the proposed fee, the agreement terms, and how offers and inspection requests will be handled.
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
              Frequently Asked Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Common Questions About Hiring a Listing Agent
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Selling a home involves pricing decisions, marketing, negotiations, and contractual obligations. These answers explain what to consider when choosing a real estate professional to represent your property.
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
                <span>Instant Digital Seller Resource</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                Download the Complete Home Seller Playbook.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Use this practical resource to review home preparation, pricing, marketing, inspection requests, roof documentation, and transaction planning. It can help you organize questions and understand the steps involved before listing your property.
              </p>

              {downloadSuccess ? (
                <div className="p-4 rounded-xl bg-[#16A34A]/20 border border-[#86EFAC]/40 text-xs sm:text-sm text-[#86EFAC] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your Home Seller Playbook download has commenced! Check your downloads folder.</span>
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
                  <span>Download The Free Home Seller Playbook (PDF)</span>
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
              Ready to Discuss Selling Your Home?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002D61] mb-3">
              Speak with Brian Jamison
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto mb-8">
              Speak with Brian Jamison about your property, selling goals, marketing options, and the next steps toward listing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenValuation}
                className="w-full sm:w-auto px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Schedule a Seller Consultation</span>
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
