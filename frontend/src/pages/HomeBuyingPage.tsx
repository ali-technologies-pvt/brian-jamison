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
  Compass,
  FileCheck,
  GraduationCap,
  ShieldAlert,
  Percent,
  TrendingUp,
  Sliders,
  CheckSquare
} from 'lucide-react';
import { BrianAvatar } from '../components/BrianAvatar';
import { SocialLinks } from '../components/SocialLinks';
import { BROKER_INFO } from '../data/realEstateData';
import { InteriorHeroVideo } from './InteriorHeroVideo';

interface HomeBuyingPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

export const HomeBuyingPage: React.FC<HomeBuyingPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  // Hero Video State
  const [heroMuted, setHeroMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Active sub-nav anchor highlight
  const [activeSection, setActiveSection] = useState<string>('roadmap');

  // Video Reels State & Modal
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);
  const [reelPlaying, setReelPlaying] = useState<boolean>(true);

  // Active Roadmap Step Tab
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);

  // Active Buyer's Shield Process Tab
  const [activeShieldTab, setActiveShieldTab] = useState<number>(0);

  // Mortgage Calculator State
  const [homePrice, setHomePrice] = useState<number>(450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [annualPropertyTaxRate, setAnnualPropertyTaxRate] = useState<number>(1.15); // OK avg ~1.15%
  const [annualInsurance, setAnnualInsurance] = useState<number>(2400); // OK homeowner insurance avg

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Download Guide State
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Scroll listener for sticky ribbon
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'section-roadmap', key: 'roadmap' },
        { id: 'section-shield', key: 'shield' },
        { id: 'section-reels', key: 'reels' },
        { id: 'section-due-diligence', key: 'diligence' },
        { id: 'section-calculator', key: 'calculator' },
        { id: 'section-financing', key: 'financing' },
        { id: 'section-dual-agency', key: 'dual-agency' },
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

  // Calculations for Mortgage PITI
  const downPaymentAmount = Math.round(homePrice * (downPaymentPercent / 100));
  const loanPrincipal = Math.max(0, homePrice - downPaymentAmount);
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    monthlyInterestRate === 0
      ? loanPrincipal / numberOfPayments
      : (loanPrincipal *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const monthlyTaxes = Math.round((homePrice * (annualPropertyTaxRate / 100)) / 12);
  const monthlyInsurance = Math.round(annualInsurance / 12);
  const monthlyPMI = downPaymentPercent < 20 ? Math.round((loanPrincipal * 0.007) / 12) : 0;
  const totalMonthlyPITI = Math.round(
    monthlyPrincipalAndInterest + monthlyTaxes + monthlyInsurance + monthlyPMI
  );

  // 10-Step Roadmap Data
  const ROADMAP_STEPS = [
    {
      step: "01",
      title: "Mortgage Pre-Approval & Purchasing Power Optimization",
      desc: "Before looking at properties, we connect you with premier Oklahoma local lenders to audit debt-to-income (DTI), lock favorable rate caps, and verify verified pre-approval status. Sellers discard generic pre-qualification letters.",
      deliverable: "Fully underwritten pre-approval letter ready to attach to purchase offers."
    },
    {
      step: "02",
      title: "Defining Non-Negotiable Criteria",
      desc: "We pinpoint your exact criteria: top-ranked school boundaries (Edmond, Deer Creek, Norman), commute corridors (Kilpatrick Turnpike, Broadway Extension), HOA restrictions, and long-term resale liquidity.",
      deliverable: "Custom MLS search matrix filtered against unlisted HOA covenants."
    },
    {
      step: "03",
      title: "Private VIP Showings & Off-Market Pocket Previews",
      desc: "Gain priority access to private seller pocket listings, coming-soon network exclusives, and private showings scheduled seamlessly around your schedule—including evenings and weekends.",
      deliverable: "First-look access before listings hit public Zillow and Redfin feeds."
    },
    {
      step: "04",
      title: "Crafting a Winning OREC Purchase Contract",
      desc: "We draft an ironclad Oklahoma Real Estate Commission (OREC) contract tailored with calibrated escalation clauses, earnest deposit buffers, and seller concession terms that win competitive bids without overpaying.",
      deliverable: "Strategic offer designed to beat competing cash or conventional bids."
    },
    {
      step: "05",
      title: "Earnest Money Deposit & Escrow Account Security",
      desc: "Within 3 calendar days of mutual acceptance, we coordinate wire transfer of your earnest deposit to a bonded Oklahoma title escrow account, legally securing your right to purchase.",
      deliverable: "Escrow verification receipt and binding contractual protection."
    },
    {
      step: "06",
      title: "The 10-Day Due Diligence & Physical Inspection Period",
      desc: "Brian Jamison personally attends on-site inspections alongside certified structural engineers. We test foundation slab movement, HVAC efficiency, plumbing drain lines, and Oklahoma hail impact on roofs.",
      deliverable: "Comprehensive 40+ page photographic inspection diagnostic report."
    },
    {
      step: "07",
      title: "Aggressive TRRA Repair & Monetary Credit Negotiations",
      desc: "We issue formal Treatment, Repair, and Replacement (TRRA) demands, fighting for licensed contractor repairs or direct seller closing credits to protect your out-of-pocket cash.",
      deliverable: "Signed TRRA amendment requiring seller repair receipts prior to closing."
    },
    {
      step: "08",
      title: "Appraisal Contingency Protection",
      desc: "If an independent bank appraiser values the property below the contract price, we provide comparable sales data to petition for a reconsideration or renegotiate the purchase price downward.",
      deliverable: "Guarantees you never bring unexpected gap cash to closing."
    },
    {
      step: "09",
      title: "Final Pre-Closing Walkthrough Verification",
      desc: "24 hours before closing, Brian walks the property with you to verify all negotiated TRRA repairs were completed properly by licensed contractors and the home remains in pristine condition.",
      deliverable: "Final walkthrough approval confirming property readiness."
    },
    {
      step: "10",
      title: "Closing at Title Company & Keys Handover",
      desc: "We review the closing disclosure settlement statement side-by-side, coordinate funds transfer at a reputable Oklahoma title company, and personally place the keys into your hands.",
      deliverable: "Clear title deed, title insurance policy, and official keys delivery."
    }
  ];

  // The 6 Processes Adapted as The Buyer's Shield
  const BUYER_SHIELD_PROCESSES = [
    {
      number: "01",
      title: "Market Intelligence & Off-Market Access",
      subtitle: "Reverse-Prospecting & Pocket Inventory",
      desc: "As an active Top 2% listing agent, Brian has direct real-time communication with the top listing brokers in Oklahoma City. We tap private broker networks, reverse-prospecting feeds, and pre-market corporate transfers so you view homes days before the general public.",
      benefit: "Bypasses public open-house bidding frenzies and emotional bidding wars."
    },
    {
      number: "02",
      title: "Ruthless Contract & Repair Negotiation",
      subtitle: "Fiduciary Advocacy That Saves You Thousands",
      desc: "We do not accept superficial seller excuses. During the 10-day TRRA period, Brian negotiates forcefully for major mechanical replacements, roof insurance claim transfers, or cash credits at the closing table.",
      benefit: "Average client savings of $24,500 below initial asking price + repair credits."
    },
    {
      number: "03",
      title: "24/7 Immediate Showing Access",
      subtitle: "Zero Missed Opportunities · 7-Day Line",
      desc: "In high-demand Oklahoma neighborhoods like Nichols Hills, Oak Tree, and Deer Creek, pristine properties go under contract in under 48 hours. Brian's 7-day availability and backup listing team guarantee you never miss a sudden viewing window.",
      benefit: "Immediate same-day private walkthroughs on newly released listings."
    },
    {
      number: "04",
      title: "Dedicated Transaction Coordinator",
      subtitle: "Flawless Escrow, Title & Timeline Compliance",
      desc: "Behind Brian stands our dedicated corporate transaction team at Salt Real Estate. We track every earnest deadline, title commitment requirement, HOA document review, and survey compliance with zero room for error.",
      benefit: "100% on-time closings without surprise escrow delays or legal pitfalls."
    },
    {
      number: "05",
      title: "Forensic Pricing & Comps Analysis",
      subtitle: "Never Overpay Due to Market Hype",
      desc: "Before submitting any offer, we run an exhaustive Comparative Market Analysis (CMA) cross-referencing recent sales, days on market, and cost-per-square-foot adjustments to ensure your bid reflects true fair market value.",
      benefit: "Prevents emotional overpaying and protects your appraisal contingency."
    },
    {
      number: "06",
      title: "Zero-Risk Buyer Agreement",
      subtitle: "Cancel-Anytime Commitment · No Lock-In",
      desc: "Most agents demand you sign a rigid 6-month exclusive buyer agreement that traps you even if they stop answering your calls. Brian Jamison offers an unconditional cancel-anytime buyer pledge: if you are ever dissatisfied, you can cancel immediately with zero penalty.",
      benefit: "100% performance-driven fiduciary loyalty with zero handcuffs."
    }
  ];

  // 9:16 Buyer Reels Data
  const BUYER_REELS = [
    {
      id: 1,
      title: "Tornado Shelter Inspection: What to Check Before You Buy in OKC",
      duration: "1:04",
      views: "28.9K",
      thumbnail: "/media/gallery/modern-kitchen.jpeg",
      videoUrl: "/media/videos/vid1.mp4",
      takeaway: "In-ground garage vs. above-ground safe room: verify FEMA 320 compliance, hydraulic seal integrity, and city registration."
    },
    {
      id: 2,
      title: "What is the TRRA Period & How Do We Get Sellers to Pay for Repairs?",
      duration: "0:56",
      views: "34.2K",
      thumbnail: "/media/properties/136-nw-18th-heritage-hills.jpeg",
      videoUrl: "/media/videos/vid2.mp4",
      takeaway: "How our 10-day investigation strategy uses licensed contractor bids to force seller credits instead of sloppy patch jobs."
    },
    {
      id: 3,
      title: "Nichols Hills vs. Edmond vs. Deer Creek: Neighborhood Breakdown",
      duration: "1:18",
      views: "42.1K",
      thumbnail: "/media/properties/11500-gateshead.jpg",
      videoUrl: "/media/videos/vid3.mp4",
      takeaway: "Taxes, lot sizes, HOA guidelines, and commute corridors compared across OKC's top 3 executive enclaves."
    },
    {
      id: 4,
      title: "How to Win a Bidding War Without Blowing Your Budget",
      duration: "0:51",
      views: "21.7K",
      thumbnail: "/media/properties/22801-n-briarwood-edmond.jpeg",
      videoUrl: "/media/videos/vid4.mp4",
      takeaway: "Strategic escalation clauses, short inspection turnarounds, and lender direct-call endorsements that beat higher cash bids."
    },
    {
      id: 5,
      title: "Hidden Closing Costs in Oklahoma That Every First-Time Buyer Misses",
      duration: "1:08",
      views: "19.5K",
      thumbnail: "/media/properties/3233-n-harvey-crown-heights.jpeg",
      videoUrl: "/media/videos/vid5.mp4",
      takeaway: "Title insurance binders, mortgage tax stamps, pre-paid property tax escrows, and HOA transfer fees exposed."
    }
  ];

  // Buyer FAQs Data
  const BUYER_FAQS = [
    {
      q: "Do I pay any fees to hire Brian Jamison as my buyer agent?",
      a: "In standard Oklahoma real estate transactions, the seller pays the brokerage commission at the closing table from their gross sales proceeds. That means you get Brian's championship-level negotiation, 7-day showing availability, and full support team with zero out-of-pocket agent retainer fees."
    },
    {
      q: "What is earnest money and how does it protect my purchase?",
      a: "Earnest money is a good-faith deposit (typically 1% to 2% of the purchase price in Oklahoma) deposited into a bonded title company escrow account once an offer is accepted. If the seller breaches the contract or if you terminate during the 10-day TRRA inspection period, your earnest money is fully refunded to you under Oklahoma law."
    },
    {
      q: "How does the Oklahoma 10-day TRRA inspection period work?",
      a: "Under the Oklahoma Real Estate Commission (OREC) contract, you have 10 calendar days from mutual acceptance to inspect the property. You can hire certified inspectors to examine the foundation, roof, plumbing, HVAC, electrical, and sewer lines. You then submit a TRRA notice demanding repairs or closing credits. If the seller refuses to address material defects, you can walk away with 100% of your earnest deposit."
    },
    {
      q: "Can you help buyers relocating from out of state (California, Texas, etc.)?",
      a: "Yes! A significant portion of our clientele consists of cross-country corporate and healthcare relocations to Oklahoma City. We provide 4K live FaceTime video walkthroughs, drone neighborhood tours, school district analysis, and coordination with out-of-state movers to ensure seamless relocations."
    },
    {
      q: "What should I know about VA loans and military relocation near Tinker AFB?",
      a: "Oklahoma City is home to Tinker Air Force Base. We frequently represent active-duty military personnel, veterans, and defense contractors utilizing 0% down VA loans. We guide you through VA appraisal requirements, Basic Allowance for Housing (BAH) budgeting, and closing fee caps to ensure you maximize your military benefits."
    },
    {
      q: "What is an appraisal gap guarantee and should I ever agree to one?",
      a: "An appraisal gap occurs when a home appraises for less than your agreed contract price. We structure offers with protective appraisal contingency clauses so you are never forced to bring unbudgeted cash to closing unless you explicitly chose to do so with predetermined caps."
    },
    {
      q: "Why should I not just call the listing agent on the yard sign?",
      a: "The listing agent has a legal and fiduciary duty to the seller to obtain the highest possible price and most favorable terms for their client. Calling the listing agent creates a direct conflict of interest ('dual agency' or unrepresented buyer status). Having your own independent fiduciary advocate ensures your financial interests, price discounts, and repair concessions are fiercely defended."
    },
    {
      q: "How quickly can we view homes when a new listing hits the market?",
      a: "Immediately. Through our 7-day mobile availability and dedicated listing team at Jamison Real Estate, we can book private showings within 1 to 2 hours of a listing becoming active. For urgent properties, we can often arrange same-day early morning or evening access."
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
        kicker="Buyer Concierge & Equity Advisory"
        title="Gain an Unfair Advantage in the Oklahoma City Housing Market."
        subtitle="Why hiring an active Top 2% listing agent gives buyers early access to off-market properties, ruthless contract negotiation, and zero-stress closings."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/properties/136-nw-18th-heritage-hills.jpeg"
        metrics={[
          { value: '$24,500', label: 'Avg Client Price Advantage' },
          { value: 'Priority', label: 'Off-Market Pocket Access' },
          { value: '100%', label: '10-Day TRRA Protected' },
          { value: '$0 Fee', label: 'Seller-Paid Commission' },
        ]}
        primaryCtaText="Book Buyer Consultation"
        secondaryCtaText="Explore 10-Step Buyer Roadmap"
        onSecondaryCtaClick={() => scrollToSection('section-roadmap')}
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
              { id: 'section-roadmap', key: 'roadmap', label: '01 10-Step Roadmap' },
              { id: 'section-shield', key: 'shield', label: "02 The Buyer's Shield" },
              { id: 'section-reels', key: 'reels', label: '03 Video Playbook' },
              { id: 'section-due-diligence', key: 'diligence', label: '04 OKC Due Diligence' },
              { id: 'section-calculator', key: 'calculator', label: '05 Mortgage PITI' },
              { id: 'section-financing', key: 'financing', label: '06 Loan Options & Grants' },
              { id: 'section-dual-agency', key: 'dual-agency', label: '07 Dual-Agency Warning' },
              { id: 'section-faqs', key: 'faqs', label: '08 FAQs & Guide' }
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
              onClick={onOpenConsultation}
              className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm ml-auto"
            >
              <span>Consult With Brian</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        SECTION 2: THE 10-STEP OKLAHOMA HOME BUYER ROADMAP
        ========================================================================
      */}
      <section id="section-roadmap" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Strategic Step-by-Step Acquisition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              The 10-Step Oklahoma Home Buyer Roadmap
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Navigating an Oklahoma home purchase without a structured roadmap leaves tens of thousands of dollars on the table and risks costly inspection oversights. Here is the exact sequential timeline we execute on your behalf.
            </p>
          </div>

          {/* Interactive Step-by-Step Graphical Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {ROADMAP_STEPS.map((step, idx) => (
              <div
                key={step.step}
                onClick={() => setActiveRoadmapStep(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeRoadmapStep === idx
                    ? 'bg-[#002D61] text-white border-[#002D61] shadow-xl scale-[1.02]'
                    : 'bg-white text-[#002D61] border-[#E5E0D8] hover:border-[#EA580C] hover:bg-[#F5EFE6]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      activeRoadmapStep === idx
                        ? 'bg-[#EA580C] text-white'
                        : 'bg-[#FAF9F6] text-[#EA580C] border border-[#EA580C]/30'
                    }`}>
                      Step {step.step}
                    </span>
                    {activeRoadmapStep === idx && <Sparkles className="w-3.5 h-3.5 text-[#FB923C]" />}
                  </div>
                  <h4 className="font-serif text-sm font-bold leading-snug mb-2">
                    {step.title}
                  </h4>
                </div>
                <span className={`text-[11px] font-semibold mt-3 ${
                  activeRoadmapStep === idx ? 'text-[#FDBA74]' : 'text-[#6B7280]'
                }`}>
                  Click to inspect →
                </span>
              </div>
            ))}
          </div>

          {/* Step Detail Spotlight Card */}
          <div className="bg-[#F5EFE6] border border-[#EA580C]/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#002D61]/15 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded bg-[#002D61] text-white text-xs font-bold font-mono">
                    Step {ROADMAP_STEPS[activeRoadmapStep].step} of 10
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    Core Milestone
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61]">
                  {ROADMAP_STEPS[activeRoadmapStep].title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md cursor-pointer flex items-center gap-2"
                >
                  <span>Book Buyer Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="font-sans text-sm sm:text-base text-[#4B5563] leading-relaxed mb-6">
                  {ROADMAP_STEPS[activeRoadmapStep].desc}
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#EA580C]/30 text-xs sm:text-sm text-[#002D61] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#002D61] mb-0.5">Tangible Milestone Deliverable:</strong>
                    <span className="text-[#4B5563]">{ROADMAP_STEPS[activeRoadmapStep].deliverable}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#E5E0D8] text-center">
                <BrianAvatar size="md" />
                <span className="block font-bold text-xs text-[#002D61] mt-3">Brian Jamison, Realtor</span>
                <span className="text-[11px] text-[#6B7280]">Direct Buyer Fiduciary · Salt Real Estate</span>
                <a
                  href="tel:4055133039"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#002D61] text-white text-xs font-bold hover:bg-[#001D40] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FB923C]" />
                  <span>(405) 513-3039</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 3: THE 6 PROCESSES ADAPTED AS "THE BUYER'S SHIELD"
        ========================================================================
      */}
      <section id="section-shield" className="w-full py-20 sm:py-28 bg-[#001D40] text-white border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Institutional Fiduciary Representation</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              The 6 Processes Adapted as "The Buyer's Shield"
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed">
              Our 6 corporate listing processes are not just for sellers. Here is how that same institutional firepower converts into an impenetrable defensive shield protecting your earnest deposit, inspection rights, and purchase equity.
            </p>
          </div>

          {/* 6 Buyer Shield Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {BUYER_SHIELD_PROCESSES.map((proc, idx) => (
              <div
                key={proc.number}
                className="bg-[#0A192F] rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-[#EA580C] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-md bg-[#EA580C] text-white text-xs font-mono font-bold">
                      Process {proc.number}
                    </span>
                    <ShieldCheck className="w-5 h-5 text-[#FB923C]" />
                  </div>
                  <span className="text-xs uppercase font-sans font-bold tracking-wider text-[#FDBA74] block mb-1">
                    {proc.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3">
                    {proc.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                    {proc.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono text-[#4ADE80] font-semibold block">
                    ✓ Buyer Shield: {proc.benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 4: VIDEO SHOWCASE & 9:16 VERTICAL REELS HUB
        ========================================================================
      */}
      <section id="section-reels" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C] text-xs font-bold uppercase tracking-widest mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>60-Second Buyer Masterclass</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002D61] tracking-tight">
                The Oklahoma City Buyer's Playbook: Watch Before You Tour
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#4B5563] max-w-md leading-relaxed">
              Avoid costly missteps before setting foot inside an Oklahoma home. Click any 9:16 reel to watch Brian dissect tornado shelters, TRRA repairs, and neighborhood comps.
            </p>
          </div>

          {/* 9:16 Vertical Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {BUYER_REELS.map((reel, index) => (
              <div
                key={reel.id}
                onClick={() => {
                  setSelectedReelIndex(index);
                  setReelPlaying(true);
                }}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-[#0A192F] border border-[#E5E0D8] hover:border-[#EA580C] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between p-4"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md bg-[#001D40] rounded-3xl overflow-hidden border border-white/30 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedReelIndex(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simulated 9:16 Video Player View */}
            <div className="relative aspect-[9/16] w-full bg-black">
              <img
                src={BUYER_REELS[selectedReelIndex].thumbnail}
                alt={BUYER_REELS[selectedReelIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

              {/* Reel Header */}
              <div className="absolute top-4 left-4 right-14 z-10 flex items-center gap-2.5">
                <BrianAvatar size="sm" />
                <div>
                  <span className="block text-xs font-bold text-white leading-tight">Brian Jamison, Realtor</span>
                  <span className="text-[10px] text-white/70">Buyer Fiduciary · Salt Real Estate</span>
                </div>
              </div>

              {/* Play / Pause Toggle Center */}
              <button
                type="button"
                onClick={() => setReelPlaying(!reelPlaying)}
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
              >
                {!reelPlaying && (
                  <div className="w-16 h-16 rounded-full bg-black/70 border border-white/40 flex items-center justify-center text-white">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                )}
              </button>

              {/* Bottom Scrubber & Masterclass Takeaway */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="w-full h-1 bg-white/30 rounded-full mb-3 overflow-hidden">
                  <div className="h-full bg-[#EA580C] w-2/3 animate-pulse" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FB923C] block mb-1">
                  Buyer Playbook Key Lesson
                </span>
                <h4 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                  {BUYER_REELS[selectedReelIndex].title}
                </h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  {BUYER_REELS[selectedReelIndex].takeaway}
                </p>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedReelIndex(null);
                      onOpenConsultation();
                    }}
                    className="flex-1 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md text-center"
                  >
                    Discuss With Brian
                  </button>
                  <a
                    href="tel:4055133039"
                    className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 
        ========================================================================
        SECTION 5: OKLAHOMA STRUCTURAL & WEATHER DUE DILIGENCE
        ========================================================================
      */}
      <section id="section-due-diligence" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Regional Environmental Nuances
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Oklahoma Structural & Weather Due Diligence
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Buying property in Oklahoma requires specialized regional knowledge. From tornado shelter ratings and Class 4 impact-resistant roofs to school boundary lines and Tinker AFB military allowances, we inspect every detail.
            </p>
          </div>

          {/* 4 Architectural Due Diligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* 1. Tornado Shelters & Safe Rooms */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  Severe Weather Defense
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Tornado Shelters & Safe Rooms
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Oklahoma is in Tornado Alley. We inspect whether the home features an in-ground garage flush shelter, an exterior underground storm cellar, or an above-ground reinforced concrete safe room meeting FEMA 320 / 361 standards.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Our Verification Checklist:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>FEMA impact rating tag & emergency hatch seal verification.</li>
                    <li>Sump pump & groundwater water-seepage inspection for garage units.</li>
                    <li>City GPS registration to ensure first-responder rescue access after storms.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Peace of mind for your family from day one.
              </span>
            </div>

            {/* 2. Roof & Hail Impact Nuances */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  Insurance Premium Optimization
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Roof & Class 4 Hail Shingles
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Hail storm damage can affect home insurance insurability. We check the shingle manufacture certificate to verify if the roof is a Class 4 Impact-Resistant (IR) system (UL 2218 certified).
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Financial Advantage:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Class 4 roofs qualify for a 15% to 25% annual homeowners insurance discount.</li>
                    <li>We ensure any pre-existing hail claims are fully replaced before closing.</li>
                    <li>Verification of transferable manufacturer and contractor warranties.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Saves up to $800/year on homeowner insurance premiums.
              </span>
            </div>

            {/* 3. Top School District Profiles */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  Educational Equity & Resale Value
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Top School District Profiles
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Edmond Public Schools, Deer Creek, Norman, and Oak Tree golf enclaves command the highest long-term appreciation in Oklahoma. We verify exact attendance boundaries—neighborhood boundary lines can change across a single street.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Attendance Verification:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Direct verification with district registrars before submitting purchase offers.</li>
                    <li>STEM academies, AP course ratings, and high school athletic facilities.</li>
                    <li>Guaranteed preservation of future resale liquidity and rental demand.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Protects the long-term appreciation of your home equity.
              </span>
            </div>

            {/* 4. Military Relocation (Tinker AFB) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  Military Concierge
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Military Relocation & Tinker AFB
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Tinker Air Force Base is the largest single-site employer in Oklahoma. We specialize in PCS (Permanent Change of Station) transitions, VA home loans, and BAH budgeting.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Military Advantage:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>0% down payment VA home loan structuring with VA certified lenders.</li>
                    <li>BAH housing allowance optimization for Midwest City, Moore, and Choctaw.</li>
                    <li>Virtual showings for service members stationed abroad or out-of-state.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Proudly serving active military and veterans across Oklahoma.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 6: INTERACTIVE MORTGAGE & AFFORDABILITY CALCULATOR
        ========================================================================
      */}
      <section id="section-calculator" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Transparent Financial Engineering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Interactive Mortgage & Affordability Calculator
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Calculate your estimated monthly payment including Oklahoma property taxes, homeowner's insurance, and private mortgage insurance (PITI). Adjust the sliders in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Panel */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#002D61] pb-3 border-b border-[#FAF9F6]">
                Adjust Financing Variables
              </h3>

              {/* Home Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Purchase Price
                  </label>
                  <span className="font-mono text-lg font-bold text-[#EA580C]">
                    ${homePrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="150000"
                  max="2000000"
                  step="5000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-mono">
                  <span>$150,000</span>
                  <span>$1,000,000</span>
                  <span>$2,000,000</span>
                </div>
              </div>

              {/* Down Payment % Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Down Payment ({downPaymentPercent}%)
                  </label>
                  <span className="font-mono text-base font-bold text-[#002D61]">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#002D61] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-mono">
                  <span>0% (VA / OHFA)</span>
                  <span>20% (No PMI)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                    Interest Rate
                  </label>
                  <span className="font-mono text-base font-bold text-[#002D61]">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="4.5"
                  max="9.0"
                  step="0.125"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
              </div>

              {/* Loan Term Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-2">
                  Loan Term
                </label>
                <div className="flex gap-3">
                  {[15, 30].map(term => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setLoanTermYears(term)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono transition-all border ${
                        loanTermYears === term
                          ? 'bg-[#002D61] text-white border-[#002D61]'
                          : 'bg-[#FAF9F6] text-[#002D61] border-[#E5E0D8]'
                      }`}
                    >
                      {term}-Year Fixed
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-6 bg-[#001D40] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/20 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#FB923C] block mb-2">
                  Estimated Total Monthly Payment (PITI)
                </span>
                <div className="mb-6">
                  <span className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                    ${totalMonthlyPITI.toLocaleString()}
                  </span>
                  <span className="block text-xs font-mono text-white/70 mt-1">
                    per month · includes principal, interest, taxes & insurance
                  </span>
                </div>

                {/* Itemized Breakdown List */}
                <div className="space-y-3 pb-6 border-b border-white/15 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-white/80">
                    <span>Principal & Interest (Loan: ${loanPrincipal.toLocaleString()})</span>
                    <span className="font-mono text-white font-semibold">
                      ${Math.round(monthlyPrincipalAndInterest).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Estimated OK Property Taxes (~1.15%)</span>
                    <span className="font-mono text-white font-semibold">
                      ${monthlyTaxes.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-white/80">
                    <span>Estimated Homeowners Insurance</span>
                    <span className="font-mono text-white font-semibold">
                      ${monthlyInsurance.toLocaleString()}
                    </span>
                  </div>
                  {monthlyPMI > 0 && (
                    <div className="flex justify-between items-center text-[#FDBA74]">
                      <span>Private Mortgage Insurance (PMI under 20% down)</span>
                      <span className="font-mono font-semibold">
                        +${monthlyPMI.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className="w-full py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <span>Connect With Our Preferred Local Lenders</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 7: DOWN PAYMENT ASSISTANCE & FINANCING OPTIONS IN OKLAHOMA
        ========================================================================
      */}
      <section id="section-financing" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Government Grants & Lending Programs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Down Payment Assistance & Financing in Oklahoma
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              You do not need a 20% cash down payment to buy a home in Oklahoma. We partner with Oklahoma's premier lenders to connect qualified buyers with competitive grants and flexible financing programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. OHFA Grants */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  State Grant Program
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  OHFA Down Payment Assistance
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  The Oklahoma Housing Finance Agency (OHFA) offers grants up to <strong>3.5% of the total loan amount</strong> to assist qualified buyers with down payment and closing costs.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ Non-repayable grant options available
              </span>
            </div>

            {/* 2. VA Loans */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#002D61]/10 text-[#002D61] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  Military & Veterans
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  0% Down VA Home Loans
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  Available to active-duty service members, veterans, and military surviving spouses. Features <strong>0% down payment</strong>, no monthly PMI, and competitive interest rates.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ $0 down payment required
              </span>
            </div>

            {/* 3. FHA Loans */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  Flexible Credit
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  3.5% Down FHA Financing
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  Ideal for first-time buyers building credit. Requires just <strong>3.5% down payment</strong> with more forgiving debt-to-income and credit score thresholds.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ 580+ minimum credit score
              </span>
            </div>

            {/* 4. Conventional Loans */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#002D61]/10 text-[#002D61] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  Market Standard
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  3% to 20% Conventional
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  First-time buyers can qualify for conventional financing with as little as <strong>3% down</strong>. At 20% down, monthly private mortgage insurance (PMI) is eliminated completely.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ Lower monthly PMI options
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: THE DUAL-AGENCY WARNING (DIRECT AGENT VS. INDEPENDENT)
        ========================================================================
      */}
      <section id="section-dual-agency" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-[#002D61] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/20 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#FCA5A5] text-xs font-bold uppercase tracking-widest mb-4">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Critical Consumer Advisory</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                The Dual-Agency Trap: Why Calling the Listing Agent Costs Buyers Thousands
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                When you see a for-sale yard sign and call the number on the sign, you are speaking directly with the <strong>seller's agent</strong>. That agent signed a fiduciary contract promising to get the seller the highest possible price and most favorable terms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm mb-8">
                <div className="p-4 rounded-xl bg-white/10 border border-white/15">
                  <strong className="text-[#FCA5A5] block mb-1">Calling the Listing Agent:</strong>
                  <p className="text-white/70">
                    The agent cannot tell you true neighborhood comps, cannot aggressively demand TRRA repairs, and must disclose your financial motivation to the seller.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#EA580C]/20 border border-[#EA580C]/40">
                  <strong className="text-[#FB923C] block mb-1">Hiring Brian Jamison As Your Buyer Advocate:</strong>
                  <p className="text-white/90">
                    100% undivided fiduciary loyalty to you. We fight for price reductions, repair credits, and escrow protection—and our fee is paid by the seller.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
              >
                Hire Brian As Your Exclusive Buyer Advocate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 9: BUYER FAQS & RELOCATION LEAD MAGNET
        ========================================================================
      */}
      <section id="section-faqs" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Forensic Buyer Clarifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Frequently Asked Buyer Questions
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Clear, transparent answers to the questions serious Oklahoma home buyers ask before writing an earnest deposit.
            </p>
          </div>

          {/* FAQs Accordion */}
          <div className="max-w-4xl space-y-4 mb-16">
            {BUYER_FAQS.map((faq, idx) => {
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
                Download The 2026 Oklahoma City Relocation & Buyer Guide
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                A 42-page relocation playbook covering neighborhood price indices, top school attendance maps, tornado shelter verification standards, and Oklahoma TRRA repair checklists.
              </p>

              {downloadSuccess ? (
                <div className="p-4 rounded-xl bg-[#16A34A]/20 border border-[#86EFAC]/40 text-xs sm:text-sm text-[#86EFAC] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your 2026 Buyer & Relocation Guide download has commenced! Check your downloads folder.</span>
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
                  <span>Download The Free 2026 Relocation Guide (PDF)</span>
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
              Ready To Tour Homes In Edmond & OKC?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002D61] mb-3">
              Schedule Your Private Buyer Consultation
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto mb-8">
              Reach Brian Jamison directly on his private cell or visit us at the Salt Real Estate Corporate Office in Edmond, Oklahoma.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book VIP Buyer Session</span>
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
