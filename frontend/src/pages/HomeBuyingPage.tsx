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
  const [isMuted, setIsMuted] = useState<boolean>(true);

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
      title: "Mortgage Pre-Approval and Purchasing Power Review",
      desc: "Before viewing properties, we help you prepare for conversations with mortgage lenders and review your target budget. Your lender can assess your income, debts, credit profile, loan options, and pre-approval status. This helps you focus on homes that fit your finances before making an offer.",
      deliverable: "A current lender pre-approval letter to support your purchase offers."
    },
    {
      step: "02",
      title: "Defining Your Non-Negotiable Criteria",
      desc: "We identify the features that matter most to you, from home size and layout to school attendance areas, commute routes, HOA rules, and future resale considerations. Whether you are comparing established Edmond neighborhoods or homes near major roads, we build a search around your priorities.",
      deliverable: "A customized home search with clear criteria for property type, location, features, and budget."
    },
    {
      step: "03",
      title: "Private Showings and Property Search Coordination",
      desc: "Explore available homes that match your needs, with showings arranged around your schedule and access permitted by the listing terms. We help you compare property condition, layout, location, and asking price rather than relying on photos alone. When suitable properties become available, we help you review them promptly.",
      deliverable: "A focused showing plan and property shortlist based on your buying criteria."
    },
    {
      step: "04",
      title: "Preparing an Oklahoma Purchase Contract",
      desc: "When you find a home that fits, we help you understand the offer terms and prepare the appropriate Oklahoma purchase contract. We review price, deadlines, earnest money, inspection provisions, financing terms, and requested seller concessions. Each offer should reflect the property, your finances, and the current competition.",
      deliverable: "A purchase offer structured around your priorities and the terms you are prepared to accept."
    },
    {
      step: "05",
      title: "Earnest Money Deposit and Escrow Coordination",
      desc: "After the contract is accepted, we help you track the earnest money deadline and coordinate with the parties named in the contract. The amount, deposit instructions, and due date depend on the agreed terms. Always verify payment instructions directly with the appropriate title or escrow provider before sending funds.",
      deliverable: "A clear earnest money deadline, verified payment instructions, and confirmation of receipt from the appropriate party."
    },
    {
      step: "06",
      title: "The Inspection and Due Diligence Period",
      desc: "We help coordinate inspections and review the findings with you during the contractual due diligence period. Depending on the home, areas of concern may include the foundation, roof, HVAC system, plumbing, electrical components, drainage, and signs of weather damage. We help you identify questions to raise with qualified inspectors and contractors.",
      deliverable: "Inspection findings and a prioritized list of property concerns for further review."
    },
    {
      step: "07",
      title: "Repair Requests and Seller Credit Negotiations",
      desc: "Once inspection findings are available, we help you assess which issues may warrant further discussion. Depending on the contract and negotiations, options may include repairs, seller credits, a price adjustment, or proceeding under the agreed terms. We help you communicate your requests clearly and track any written agreement.",
      deliverable: "A written repair request or negotiated amendment, when agreed to by the parties."
    },
    {
      step: "08",
      title: "Appraisal Review and Financing Coordination",
      desc: "If the lender's appraisal comes in below the contract price, we help you review the valuation and compare it with relevant property sales. Depending on your contract and loan terms, possible next steps may include requesting an appraisal review, negotiating with the seller, or considering other permitted options.",
      deliverable: "A review of the appraisal and a clear discussion of available options under your contract."
    },
    {
      step: "09",
      title: "Final Pre-Closing Walkthrough",
      desc: "Before closing, we accompany you on the final walkthrough to check the property's condition and review agreed repairs or other contractual requirements. We help identify visible concerns that need to be raised before closing. The walkthrough is an important final check, although it does not replace a professional inspection.",
      deliverable: "A final walkthrough checklist documenting items that may require follow-up before closing."
    },
    {
      step: "10",
      title: "Closing at the Title Company and Key Handover",
      desc: "As closing approaches, we help you track outstanding requirements and communicate with your lender and title company. Review your closing documents, settlement figures, and payment instructions with the appropriate professionals. Once the transaction is completed and possession is authorized under the contract, you can collect your keys.",
      deliverable: "A completed closing process, confirmation of the applicable transaction documents, and key handover when authorized."
    }
  ];

  // The 6 Processes Adapted as The Buyer's Shield
  const BUYER_SHIELD_PROCESSES = [
    {
      number: "01",
      title: "Market Research and Property Search",
      subtitle: "Local Market Insight and Home Search Guidance",
      desc: "As your home buying agent in Edmond, OK, Brian helps you review available listings, compare property features, and assess asking prices against relevant market information. We discuss location, condition, and your preferred features to help narrow the search. Any access to coming-soon or off-market homes depends on actual availability and applicable listing rules.",
      benefit: "A more focused search that helps you compare suitable homes without losing sight of your budget and priorities."
    },
    {
      number: "02",
      title: "Buyer Advocacy Through Offer and Repair Negotiations",
      subtitle: "Contract Terms and Inspection Negotiation",
      desc: "We help you assess the terms of a proposed purchase and identify areas where negotiation may be appropriate. After inspections, we discuss documented concerns and help you prepare repair or credit requests that fit the contract. The seller decides whether to accept, reject, or counter those requests.",
      benefit: "Clearer negotiations based on property condition, comparable sales, and the terms both parties are willing to accept."
    },
    {
      number: "03",
      title: "Responsive Communication and Showing Coordination",
      subtitle: "Timely Access to Available Homes",
      desc: "Desirable homes can attract attention quickly, so prompt communication matters. We coordinate showings around your availability, help you understand listing details, and discuss next steps when a suitable property appears. Access depends on seller approval, showing rules, and the listing's current status.",
      benefit: "Organized showing coordination and timely guidance when you are ready to evaluate a property."
    },
    {
      number: "04",
      title: "Earnest Money, Title, and Timeline Coordination",
      subtitle: "Transaction Deadline Management",
      desc: "A home purchase includes several deadlines and documents. We help track contract dates, inspection periods, financing milestones, title requirements, and other items that need attention. We also communicate with the lender, title company, and other parties involved so you know what remains outstanding.",
      benefit: "A clearer view of upcoming deadlines and fewer avoidable misunderstandings during the transaction."
    },
    {
      number: "05",
      title: "Make Offers Based on Market Evidence",
      subtitle: "Comparable Sales and Pricing Analysis",
      desc: "Before you submit an offer, we review relevant comparable sales, current competition, property condition, and asking price. A comparative market analysis can help you judge whether a home's price appears reasonable and decide how much you are comfortable offering. Market data informs the decision but cannot guarantee a particular value or outcome.",
      benefit: "A more informed offer strategy that balances market conditions with your budget and the home's value to you."
    },
    {
      number: "06",
      title: "Understand Your Buyer Representation Agreement",
      subtitle: "Clear Terms and Expectations",
      desc: "Before representation begins, we explain the proposed buyer agreement, including its duration, services, compensation, and termination provisions. You should understand what you are agreeing to before signing. We encourage clear questions about the terms so you can make an informed choice about working together.",
      benefit: "A clearer understanding of your buyer representation, responsibilities, and available options before you commit."
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
      q: "What does a buyer agent do?",
      a: "A buyer agent helps you search for homes, arrange showings, compare property values, prepare offers, negotiate terms, review inspection concerns, and track deadlines. Services depend on your buyer representation agreement."
    },
    {
      q: "When should I hire a home buying agent?",
      a: "It helps to speak with an agent before touring homes. Early guidance can help you define your search, understand representation terms, prepare for offers, and coordinate with a mortgage lender."
    },
    {
      q: "What does buyer representation include?",
      a: "Buyer representation can include property searches, showing coordination, offer preparation, negotiation, due diligence guidance, and closing coordination. Review your written agreement to understand the services, compensation, duration, and termination terms."
    },
    {
      q: "How do I choose the right Realtor for buying a home?",
      a: "Look for an agent who understands your priorities, communicates clearly, explains contract terms, and guides you through inspections and negotiations. Ask about their experience, availability, service process, and buyer representation agreement."
    },
    {
      q: "Can a buyer agent help me negotiate the purchase price?",
      a: "Yes. A buyer agent can review comparable sales, property condition, and market competition to help you develop an offer strategy. The seller may accept, reject, or counter your offer, so no specific price reduction is guaranteed."
    },
    {
      q: "Do I need mortgage pre-approval before viewing homes?",
      a: "Pre-approval helps clarify your budget and may strengthen an offer. Speak with a lender early to understand your financing options, required documents, and potential loan terms before making a purchase offer."
    },
    {
      q: "Who pays the buyer agent's compensation?",
      a: "Compensation is negotiable and should be explained in your buyer representation agreement. A seller may agree to contribute toward the buyer agent's compensation, but payment depends on the agreements involved. Review the terms before signing."
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
        kicker="Home Buying"
        title="Buy Smarter With a Home Buying Agent in Edmond, OK"
        subtitle="Get clear guidance on home searches, property values, offer strategy, and contract negotiations across Edmond and the Greater Oklahoma City area."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/properties/136-nw-18th-heritage-hills.jpeg"
        metrics={[
          { value: '$62M+', label: 'Career Volume Closed' },
          { value: '370+', label: 'Families & Buyers Advised' },
          { value: '100%', label: 'Due Diligence Protected' },
          { value: 'Top 2%', label: 'Greater OKC Production' },
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
              { id: 'section-shield', key: 'shield', label: "02 Buyer Protection" },
              { id: 'section-reels', key: 'reels', label: '03 Video Playbook' },
              { id: 'section-due-diligence', key: 'diligence', label: '04 Due Diligence' },
              { id: 'section-calculator', key: 'calculator', label: '05 Mortgage Calculator' },
              { id: 'section-financing', key: 'financing', label: '06 Financing Options' },
              { id: 'section-dual-agency', key: 'dual-agency', label: '07 Buyer Guidance' },
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
        SECTION 2: THE 10-STEP EDMOND HOME BUYER ROADMAP
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
              The 10-Step Edmond Home Buyer Roadmap
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Navigating an Edmond home purchase with clear, structured steps helps you stay organized from mortgage pre-approval through closing day. Here is the process we follow to protect your interests.
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
        SECTION 3: SIX PROCESSES THAT SUPPORT THE BUYER'S INTERESTS
        ========================================================================
      */}
      <section id="section-shield" className="w-full py-20 sm:py-28 bg-[#001D40] text-white border-b border-white/10">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Buyer-Focused Representation</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Six Processes That Support the Buyer's Interests
            </h2>
            <p className="font-sans text-base sm:text-lg text-white/80 leading-relaxed">
              Brian Jamison's representation processes are designed to protect your interests through every phase of the purchase—from market research and private showings to contract negotiations and closing.
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
                <span>Edmond Home Buying Video Guides</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#002D61] tracking-tight">
                The Edmond Buyer's Playbook: Watch Before You Tour
              </h2>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#4B5563] max-w-md leading-relaxed">
              Prepare for home tours with practical guidance on property condition, inspection questions, contract terms, and comparable sales. Short videos can help you understand what to look for and which questions to ask as you compare homes in Edmond. Use the available video resources to prepare for your next showing.
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
              key={BUYER_REELS[selectedReelIndex].videoUrl}
              src={BUYER_REELS[selectedReelIndex].videoUrl}
              poster={BUYER_REELS[selectedReelIndex].thumbnail}
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
                  <span className="text-[10px] text-[#FB923C] font-medium leading-none">Buyer Fiduciary</span>
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
                Buyer Playbook Key Lesson
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white mb-1.5 leading-snug line-clamp-2">
                {BUYER_REELS[selectedReelIndex].title}
              </h4>
              <p className="text-[11px] sm:text-xs text-white/80 leading-relaxed mb-3 line-clamp-3">
                {BUYER_REELS[selectedReelIndex].takeaway}
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
                  Discuss With Brian
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
        SECTION 5: EDMOND HOME AND PROPERTY DUE DILIGENCE
        ========================================================================
      */}
      <section id="section-due-diligence" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Local Property Considerations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Edmond Home and Property Due Diligence
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Buying a home in Edmond means looking beyond the listing photos and asking how the property fits your needs. Roof condition, drainage, storm protection, insurance costs, school attendance areas, commute routes, and HOA rules can all affect your decision. We help you identify the right questions and coordinate with qualified professionals when further review is needed.
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
                  Severe Weather Preparedness
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Storm Shelters and Safe Rooms
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Severe weather is an important consideration for Oklahoma home buyers. During your property review, we help you identify whether a home has a storm shelter or safe room and what documentation may be available. A qualified professional should assess the shelter's condition, installation, and suitability for your household.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Our Verification Checklist:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Ask for available shelter installation records, labels, and product documentation.</li>
                    <li>Check for visible water intrusion, drainage concerns, and access issues.</li>
                    <li>Confirm any applicable shelter registration or emergency-location procedures with the relevant local authority.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Understand the home's storm-protection features before deciding whether they meet your needs.
              </span>
            </div>

            {/* 2. Roof & Hail Impact Nuances */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  Insurance and Roof Condition
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Roof Materials and Hail Damage
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  Roof age, material, prior storm damage, and repair history can affect maintenance planning and insurance discussions. We help you identify available roof records and questions to raise with a licensed roofer or insurance provider. Do not assume that a particular roof type guarantees a discount or makes a property eligible for coverage.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Financial Considerations:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Ask your insurer whether the roof material or impact-resistance rating affects your premium.</li>
                    <li>Review available records of past roof repairs and insurance claims.</li>
                    <li>Ask about transferable manufacturer or contractor warranties and confirm their terms.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Understanding the roof's condition can help you plan for future costs and make a more informed purchase.
              </span>
            </div>

            {/* 3. Top School District Profiles */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  School Attendance Areas and Resale Considerations
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Edmond School District Research
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  If school access matters to your household, verify the property's current attendance assignment directly with the school district. Boundaries, program availability, and enrollment requirements may change. We can help you identify the right questions and consider how location, property features, and nearby amenities fit your future plans.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Attendance Verification:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Confirm the property's current school assignment with the district.</li>
                    <li>Review available information about programs, enrollment rules, and transportation.</li>
                    <li>Consider how location and property features align with your potential resale plans.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                Make location decisions using current information rather than assumptions about future appreciation or resale demand.
              </span>
            </div>

            {/* 4. Military Relocation (Tinker AFB) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#002D61] text-[#FB923C] flex items-center justify-center mb-6">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#EA580C] block mb-1">
                  Military Relocation Support
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-3">
                  Home Buying Near Tinker Air Force Base
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-4">
                  If you are relocating for military service or a new assignment, we help organize your home search around your reporting date, budget, and preferred commute. Buyers using VA financing should confirm their eligibility, loan terms, and closing requirements with an approved lender. Virtual tours may help when an in-person visit is not practical.
                </p>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EA580C]/20 text-xs text-[#374151] space-y-2 mb-4">
                  <div className="font-bold text-[#002D61]">Military Buying Considerations:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-[#4B5563]">
                    <li>Discuss VA loan eligibility and financing terms with a qualified lender.</li>
                    <li>Compare commute options from Edmond and other areas that fit your needs.</li>
                    <li>Arrange remote property tours and document reviews when available.</li>
                  </ul>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#16A34A] block">
                We help military buyers coordinate the property search with their relocation timeline and household priorities.
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
              Transparent Home Buying Costs
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Mortgage and Affordability Calculator
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Estimate potential monthly housing costs before choosing a home. Depending on the calculator, you may be able to enter the purchase price, down payment, interest rate, loan term, property taxes, homeowners insurance, and mortgage insurance. Actual costs depend on the property, lender, loan terms, and insurance provider. Use the calculator as an initial planning tool, then ask your lender to review the numbers and explain the costs that apply to your situation.
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
        SECTION 7: FINANCING OPTIONS AND DOWN PAYMENT ASSISTANCE
        ========================================================================
      */}
      <section id="section-financing" className="w-full py-20 sm:py-28 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Financing Options and Down Payment Assistance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Explore Home Financing in Oklahoma
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              You may not need a 20% down payment to purchase a home. Loan options and assistance programs vary by buyer, property, lender, and current program rules. We can help you identify questions to discuss with lenders and explore whether available financing options fit your plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. OHFA Grants */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  State Assistance Programs
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  OHFA Down Payment Assistance
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  The Oklahoma Housing Finance Agency offers homebuyer programs subject to current eligibility and program requirements. Depending on the program, qualified buyers may be able to receive help with down payments or closing costs. Ask a participating lender to confirm current benefits, limits, and repayment conditions.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ What to Check: Current income and purchase-price limits, eligibility rules, participating lenders, and available assistance.
              </span>
            </div>

            {/* 2. VA Loans */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#002D61]/10 text-[#002D61] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  Military and Veterans
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  VA Home Loans
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  Eligible service members, veterans, and certain surviving spouses may qualify for VA-backed home financing. Some eligible borrowers can purchase with no down payment, and VA loans generally do not require monthly private mortgage insurance. Approval and loan terms depend on eligibility, lender requirements, and the transaction.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ What to Check: VA eligibility, lender approval, funding fee rules, and the full amount needed at closing.
              </span>
            </div>

            {/* 3. FHA Loans */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#EA580C]/10 text-[#EA580C] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  Flexible Down Payment Options
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  FHA Financing
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  FHA-insured loans may offer down payments as low as 3.5% for borrowers who meet the applicable requirements. Credit, debt, property standards, mortgage insurance, and lender rules affect eligibility and total costs.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ What to Check: Current credit and down payment requirements, mortgage insurance, and estimated monthly payments with your lender.
              </span>
            </div>

            {/* 4. Conventional Loans */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E0D8] shadow-xs flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#002D61]/10 text-[#002D61] text-[10px] font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                  Conventional Financing
                </span>
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">
                  Conventional Loans With Different Down Payment Options
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed mb-4">
                  Some conventional mortgage programs allow eligible buyers to put down as little as 3%. A 20% down payment generally avoids monthly private mortgage insurance on a standard conventional loan, although terms and exceptions vary by loan type.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#16A34A] font-bold">
                ✓ What to Check: Down payment options, credit requirements, mortgage insurance, and the total cost over the life of the loan.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        SECTION 8: IMPORTANT BUYER REPRESENTATION GUIDANCE
        ========================================================================
      */}
      <section id="section-dual-agency" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-[#002D61] text-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/20 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-xs font-bold uppercase tracking-widest mb-4">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Important Buyer Representation Guidance</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Why Work With Your Own Buyer's Agent?
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-6">
                When you contact the agent listed on a property, that person may represent the seller. Their agency relationship and duties depend on the agreements and applicable rules. Before sharing sensitive financial details or negotiating terms: clarify whom the agent represents and how agency relationships work in the transaction.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm mb-6">
                <div className="p-5 rounded-xl bg-white/10 border border-white/15">
                  <strong className="text-white font-serif text-base block mb-2">Working With the Listing Agent</strong>
                  <p className="text-white/75 leading-relaxed">
                    A listing agent's role is generally to represent the seller according to the applicable agency agreement. That agent may not provide the same representation or negotiation priorities as an agent working for you. Ask about agency disclosure and representation options before proceeding.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#EA580C]/20 border border-[#EA580C]/40">
                  <strong className="text-[#FB923C] font-serif text-base block mb-2">Hiring a Buyer Agent in Edmond, OK</strong>
                  <p className="text-white/90 leading-relaxed">
                    A buyer agent can help you assess comparable sales, prepare and negotiate offers, review inspection findings, track deadlines, and coordinate with the professionals involved in closing. The representation agreement should clearly explain the services, compensation, and termination terms. Whether the seller offers to pay some or all of the buyer agent's compensation depends on the agreement and transaction.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs text-[#86EFAC] font-mono font-semibold mb-8">
                Your Advantage: Clear representation, informed decisions, and practical guidance through the purchase process.
              </div>
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer"
              >
                Schedule a Buyer Consultation With Brian Jamison
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
      <section id="section-faqs" className="w-full py-20 sm:py-28 pb-28 sm:pb-36 bg-[#F5EFE6] border-b border-[#EA580C]/25">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-3">
              Frequently Asked Buyer Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002D61] leading-tight mb-5">
              Common Questions About Buying a Home in Edmond
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#4B5563] leading-relaxed">
              Buying a home involves financial decisions, contractual deadlines, and property details that deserve careful review. Here are answers to common questions buyers ask before choosing an agent or making an offer.
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
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-[#1E293B] font-normal leading-relaxed border-t border-[#F1ECE4] pt-4">
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
                <span>Instant Digital Home Buying Resource</span>
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-snug">
                Download the Edmond Home Buyer's Guide
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Prepare for your purchase with a practical guide to planning your budget, comparing properties, understanding contract milestones, organizing inspections, and preparing for closing. Use it as a reference as you review homes and discuss questions with your agent, lender, inspector, and title company.
              </p>

              {downloadSuccess ? (
                <div className="p-4 rounded-xl bg-[#16A34A]/20 border border-[#86EFAC]/40 text-xs sm:text-sm text-[#86EFAC] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your Edmond Home Buyer's Guide download has commenced! Check your downloads folder.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDownloadSuccess(true);
                    setTimeout(() => setDownloadSuccess(false), 5000);
                  }}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[52px] bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer leading-normal select-none"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span className="leading-normal inline-block">Download The Free Edmond Home Buyer's Guide (PDF)</span>
                </button>
              )}
            </div>
          </div>

          {/* Final Call to Action Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EA580C]/30 shadow-lg text-center max-w-4xl mx-auto mb-12">
            <div className="flex justify-center mb-5">
              <BrianAvatar size="lg" />
            </div>
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-2">
              Ready to Start Your Edmond Home Search?
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#002D61] mb-3">
              Work with Brian Jamison
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#6B7280] max-w-xl mx-auto mb-8">
              Work with Brian Jamison to discuss your priorities, review the buying process, and plan your next steps.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-8 py-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Schedule a Buyer Consultation</span>
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
