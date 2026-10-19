import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCheck,
  Calculator,
  Compass,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Download,
  DollarSign,
  Percent,
  Calendar,
  Home,
  ChevronDown,
  Building2,
  Phone,
  Mail,
  Printer
} from 'lucide-react';
import { BROKER_INFO } from '../data/realEstateData';
import { InteriorHeroVideo } from './InteriorHeroVideo';

interface ResourcePageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: () => void;
}

// -------------------------------------------------------------
// 1. HOME SELLER'S CHECKLIST PAGE (/resources/home-sellers-checklist)
// -------------------------------------------------------------
export const HomeSellersChecklistPage: React.FC<ResourcePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      title: "Exterior & Curb Appeal (First Impressions)",
      items: [
        { id: "ext-1", label: "Power-wash driveway, front walkway, and front porch stone" },
        { id: "ext-2", label: "Apply fresh dark hardwood mulch to all front planting beds" },
        { id: "ext-3", label: "Inspect outdoor lighting fixtures and install matching warm-white LED bulbs" },
        { id: "ext-4", label: "Repaint or polish front entry door and oil door hinges" },
        { id: "ext-5", label: "Trim all native tree branches touching the roofline or siding" }
      ]
    },
    {
      title: "Interior Decluttering & Architectural Flow",
      items: [
        { id: "int-1", label: "Reduce bedroom closet contents by 40% to showcase storage capacity" },
        { id: "int-2", label: "Clear 95% of items from kitchen waterfall islands and countertops" },
        { id: "int-3", label: "Store personalized family portraits and university certificates" },
        { id: "int-4", label: "Professionally clean hardwood flooring and steam-clean carpets" },
        { id: "int-5", label: "Neutralize ambient scents—avoid strong plug-ins; use fresh linen air" }
      ]
    },
    {
      title: "Pre-Listing Mechanical & Oklahoma Inspection Prep",
      items: [
        { id: "mech-1", label: "Replace all HVAC return filters and service AC condenser units" },
        { id: "mech-2", label: "Test GFCI outlets in bathrooms, kitchen, and exterior circuits" },
        { id: "mech-3", label: "Inspect roof shingles and flashings following Oklahoma storm seasons" },
        { id: "mech-4", label: "Check hot water tanks for active TPR valve relief and sediment flush" },
        { id: "mech-5", label: "Schedule Brian Jamison's pre-listing walk-through to prioritize high-ROI fixes" }
      ]
    }
  ];

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker="Interactive Seller Preparation Dossier"
        title="The 2026 Home Seller's Readiness Checklist."
        subtitle="A comprehensive room-by-room preparation guide designed to eliminate buyer inspection renegotiations and spark multi-offer bidding wars."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '15 Points', label: 'Curb & Interior Audit' },
          { value: '+$18K', label: 'Avg Equity Recouped' },
          { value: '100%', label: 'Inspection Defense' },
          { value: 'Free', label: 'Downloadable Dossier' },
        ]}
        primaryCtaText="Print / Save Checklist"
        onPrimaryCtaClick={() => window.print()}
        secondaryCtaText="Request Staging Audit"
        onSecondaryCtaClick={onOpenConsultation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      {/* Checklist Interactive Area */}
      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Progress Card */}
          <div className="mb-12 p-6 rounded-2xl bg-[#F4F1EB] border border-[#E6E2DA] flex items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#EA580C] tracking-wider block mb-1">
                Your Listing Preparation Progress
              </span>
              <h3 className="font-serif text-xl font-bold text-[#002D61]">
                {completedCount} of {totalItems} Tasks Completed ({progressPercent}%)
              </h3>
            </div>
            <div className="w-32 bg-stone-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#EA580C] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-10">
            {sections.map((section, sIdx) => (
              <div key={sIdx} className="p-8 rounded-3xl bg-white border border-[#E6E2DA] shadow-xs">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EA580C]" />
                  <span>{section.title}</span>
                </h2>
                <div className="space-y-4">
                  {section.items.map((item) => {
                    const isChecked = !!checkedItems[item.id];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleCheck(item.id)}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50/60 border-emerald-300 text-[#002D61]'
                            : 'bg-[#F4F1EB]/50 border-[#E6E2DA] hover:border-[#EA580C]/40 text-[#374151]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-400 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className={`text-sm leading-relaxed ${isChecked ? 'line-through text-stone-500' : 'font-medium'}`}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-3xl bg-[#002D61] text-white">
            <h3 className="font-serif text-2xl font-bold mb-3">Want Brian to Walk Your Property Personally?</h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto mb-6">
              Brian Jamison conducts zero-obligation pre-listing walkthroughs to pinpoint which updates yield 3x returns and which updates waste your hard-earned money.
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
            >
              Book In-Home Consultation
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

// -------------------------------------------------------------
// 2. MORTGAGE CALCULATOR PAGE (/resources/mortgage-calculator)
// -------------------------------------------------------------
export const MortgageCalculatorPage: React.FC<ResourcePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [homePrice, setHomePrice] = useState(585000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.65);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [annualTaxRate, setAnnualTaxRate] = useState(1.15); // OK avg
  const [annualInsurance, setAnnualInsurance] = useState(2400); // OK hazard
  const [monthlyHoa, setMonthlyHoa] = useState(85);

  const downPaymentAmount = Math.round((homePrice * downPaymentPct) / 100);
  const loanAmount = homePrice - downPaymentAmount;

  // Monthly Principal & Interest Calculation
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  const monthlyPI =
    monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanAmount / totalMonths;

  const monthlyPropertyTax = Math.round((homePrice * (annualTaxRate / 100)) / 12);
  const monthlyInsurance = Math.round(annualInsurance / 12);
  const totalMonthlyPayment = Math.round(monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHoa);

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker="Accurate Oklahoma Financing Engine"
        title="Oklahoma City Mortgage & Payment Calculator."
        subtitle="Calculate exact monthly obligations including principal, interest, Oklahoma county ad valorem property taxes, and hazard homeowners insurance."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: 'PITI', label: 'Full Monthly Breakdown' },
          { value: '1.15%', label: 'OK Ad Valorem Rate' },
          { value: '$0 Fee', label: 'Instant Calculation' },
          { value: 'Top Lenders', label: 'Vetted Oklahoma Partners' },
        ]}
        primaryCtaText="Explore Loan Rates"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Request Home Valuation"
        onSecondaryCtaClick={onOpenValuation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-8 rounded-3xl bg-white border border-[#E6E2DA] shadow-xs space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#002D61]">Home Purchase Price</label>
                    <span className="font-serif text-lg font-bold text-[#002D61]">${homePrice.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="150000"
                    max="3000000"
                    step="5000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="w-full accent-[#EA580C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#002D61] block mb-1">Down Payment (%)</label>
                    <input
                      type="number"
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-[#E6E2DA] bg-[#F4F1EB] text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#002D61] block mb-1">Down Payment ($)</label>
                    <div className="p-3 rounded-xl border border-[#E6E2DA] bg-stone-100 text-sm font-semibold text-stone-600">
                      ${downPaymentAmount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#002D61] block mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-[#E6E2DA] bg-[#F4F1EB] text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#002D61] block mb-1">Loan Term</label>
                    <select
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-[#E6E2DA] bg-[#F4F1EB] text-sm font-semibold"
                    >
                      <option value={30}>30-Year Fixed</option>
                      <option value={20}>20-Year Fixed</option>
                      <option value={15}>15-Year Fixed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#002D61] block mb-1">Property Tax (%)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={annualTaxRate}
                      onChange={(e) => setAnnualTaxRate(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#E6E2DA] bg-[#F4F1EB] text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#002D61] block mb-1">Annual Ins ($)</label>
                    <input
                      type="number"
                      step="50"
                      value={annualInsurance}
                      onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#E6E2DA] bg-[#F4F1EB] text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#002D61] block mb-1">Monthly HOA ($)</label>
                    <input
                      type="number"
                      step="10"
                      value={monthlyHoa}
                      onChange={(e) => setMonthlyHoa(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#E6E2DA] bg-[#F4F1EB] text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-[#002D61] text-white shadow-xl sticky top-28">
                <span className="text-xs uppercase tracking-widest text-[#FB923C] font-bold block mb-2">
                  Estimated Monthly Outlay
                </span>
                <div className="font-serif text-4xl sm:text-5xl font-bold mb-6">
                  ${totalMonthlyPayment.toLocaleString()}
                  <span className="text-xs font-sans text-stone-300 font-normal"> / month</span>
                </div>

                <div className="space-y-3.5 pb-6 border-b border-white/15 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FB923C]" />
                      Principal & Interest:
                    </span>
                    <span className="font-bold">${Math.round(monthlyPI).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                      Property Taxes:
                    </span>
                    <span className="font-bold">${monthlyPropertyTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      Homeowner's Insurance:
                    </span>
                    <span className="font-bold">${monthlyInsurance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      Monthly HOA / Amenities:
                    </span>
                    <span className="font-bold">${monthlyHoa.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full py-4 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-center block"
                  >
                    Connect With Brian's Preferred Lenders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

// -------------------------------------------------------------
// 3. OKC RELOCATION GUIDE (/resources/okc-relocation-guide)
// -------------------------------------------------------------
export const RelocationGuidePage: React.FC<ResourcePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker="Executive Concierge Relocation"
        title="Relocating to the Oklahoma City Metropolitan Area."
        subtitle="Everything you need to know when moving from California, Texas, New York, or Colorado to Oklahoma's thriving luxury corridors."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '3x Value', label: 'Purchasing Power Lift' },
          { value: 'Top 10%', label: 'Academic Feeder Zones' },
          { value: '21 Areas', label: 'Metro Enclaves Mapped' },
          { value: '1-on-1', label: 'Executive Concierge' },
        ]}
        primaryCtaText="Book Relocation Advisory"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Explore Neighborhoods"
        onSecondaryCtaClick={() => onNavigate('/communities')}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="p-8 rounded-3xl bg-white border border-[#E6E2DA] shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-[#002D61] mb-4">Why High-Net-Worth Families Choose OKC</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-5 rounded-2xl bg-[#F4F1EB] border border-[#E6E2DA]">
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">Unmatched Purchasing Power</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  A $1.5M budget secures a 5,000+ sq ft custom architectural estate on 1-5 acres in Edmond or Nichols Hills—a fraction of Dallas, Austin, or Denver prices.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F4F1EB] border border-[#E6E2DA]">
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">Top Academic Feeder Corridors</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Acclaimed public districts (Edmond Public Schools, Deer Creek, Oakdale) alongside elite college preps like Casady School and Heritage Hall.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#F4F1EB] border border-[#E6E2DA]">
                <h3 className="font-serif text-lg font-bold text-[#002D61] mb-2">Private Aviation & Transit</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Wiley Post Airport (NW OKC) accommodates private jet charters, while Will Rogers World Airport offers non-stop routes to major US business centers.
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#002D61] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-2">Need a Tailored Neighborhood Dossier?</h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
                Brian Jamison prepares custom commute time maps, private school entrance advisories, and off-market pocket listings for relocating executives.
              </p>
            </div>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold uppercase tracking-wider shrink-0"
            >
              Book Relocation Consultation
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

// -------------------------------------------------------------
// 4. WHAT TO WATCH OUT FOR PAGE (/resources/what-to-watch-out-for)
// -------------------------------------------------------------
export const WhatToWatchOutForPage: React.FC<ResourcePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const traps = [
    {
      title: "Expansive Red Clay Soil & Foundation Movement",
      desc: "Oklahoma’s subsoil contains heavy clay that expands when saturated and shrinks dramatically during summer droughts. Always verify foundation elevation readings, gutter drainage extensions, and French drain discharge paths."
    },
    {
      title: "Roof Hail Claims & ACV Insurance Deductibles",
      desc: "Following spring hailstorms, some homeowners file insurance claims without replacing the roof. Never purchase a property without verifying if the existing policy carries an Actual Cash Value (ACV) roof schedule rather than Replacement Cost (RCV)."
    },
    {
      title: "Unpermitted Room Additions & Garage Enclosures",
      desc: "Square footage added without municipal permits can void insurance coverage and fail appraisal standards. Brian cross-references county assessor records with actual permitted heated/cooled space."
    },
    {
      title: "Mineral Rights Severances & Pipeline Easements",
      desc: "In rural acreage corridors like Arcadia, Guthrie, and Choctaw, surface rights and mineral rights are frequently severed. We review title abstracts to ensure no unexpected drill pads or pipeline corridors affect your enjoyment."
    },
    {
      title: "Locking Into Rigid 6-Month Listing Agreements",
      desc: "Many brokerages lock homeowners into punitive multi-month agreements with cancellation penalties. Brian Jamison offers a 100% Risk-Free Cancel-Anytime Listing Guarantee: if promises are not met, you can terminate with zero penalty."
    }
  ];

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker="Fiduciary Protection Dossier"
        title="What to Watch Out For: Costly Real Estate Traps in Oklahoma."
        subtitle="Don’t let hidden foundation movement, roof deductible shocks, or inflexible listing contracts derail your financial future."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '5 Traps', label: 'Critical OKC Pitfalls' },
          { value: '$25K+', label: 'Avg Avoided Cost' },
          { value: '100%', label: 'Cancel-Anytime Pledge' },
          { value: 'Zero Risk', label: 'Direct Representation' },
        ]}
        primaryCtaText="Consult With Brian"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Request Property Audit"
        onSecondaryCtaClick={onOpenValuation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
          {traps.map((trap, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border border-[#E6E2DA] shadow-xs hover:border-[#EA580C]/40 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-full bg-orange-100 text-[#EA580C] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h2 className="font-serif text-xl font-bold text-[#002D61]">{trap.title}</h2>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed pl-10">
                {trap.desc}
              </p>
            </div>
          ))}

          <div className="mt-12 p-8 rounded-3xl bg-[#F4F1EB] border border-[#E6E2DA] text-center">
            <h3 className="font-serif text-xl font-bold text-[#002D61] mb-2">Protect Your Real Estate Equity</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mb-6 max-w-md mx-auto">
              Schedule a private representation audit with Brian Jamison at Salt Real Estate Corporate Office.
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-[#002D61] hover:bg-[#001D40] text-white text-xs font-bold uppercase tracking-wider"
            >
              Consult With Brian
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

// -------------------------------------------------------------
// 5. FAQ PAGE (/faq)
// -------------------------------------------------------------
export const FaqPage: React.FC<ResourcePageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Brian Jamison's 100% Cancel-Anytime Listing Guarantee work?",
      a: "Unlike traditional real estate agreements that lock sellers into 6-month ironclad contracts, Brian provides a 100% risk-free pledge. If Brian fails to execute on any aspect of his marketing blueprint, showing feedback policy, or communication standards, you can terminate the listing agreement at any time with zero penalty and no cancellation fees."
    },
    {
      q: "What is included in the 6-Phase Seller Blueprint?",
      a: "The blueprint encompasses 30+ specific deliverables including: 4K cinema walkthrough video, FAA-certified aerial drone mapping, Matterport 3D virtual tour, syndication to 350+ global portals, targeted social advertising, reverse prospecting to active buyer agents, mandatory 2-hour showing feedback calls, and a dedicated 7-person specialized transaction support team."
    },
    {
      q: "Where is your physical office located?",
      a: "Brian Jamison is affiliated with the Salt Real Estate Corporate Office located at 1508 W. Edmond Rd., Edmond, Oklahoma 73003. Brian serves clients across the entire Greater Oklahoma City metropolitan area."
    },
    {
      q: "How does Brian price homes to trigger bidding wars?",
      a: "Rather than arbitrary guessing, Brian utilizes a 3-Tier Strategic Pricing Architecture (Conservative, Target, and Aspirational). By positioning the list price right below key buyer search brackets, we spark psychological urgency and competitive multiple-offer scenarios."
    },
    {
      q: "How does the recent NAR settlement change buyer representation?",
      a: "Under the new rules, buyers must execute a written representation agreement with their agent before touring homes. Brian provides completely transparent fiduciary buyer advisory, ensuring you know exactly what services are provided with zero hidden fees."
    },
    {
      q: "How fast can I get a confidential home valuation?",
      a: "You can submit your property address through our website's Confidential Valuation tool for an immediate automated appraisal, followed by Brian's personalized CMA dossier within 24 hours."
    }
  ];

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker="Complete Transparency"
        title="Frequently Asked Questions & Advisory Standards."
        subtitle="Clear answers regarding our 6-Phase Selling Machine, cancel-anytime guarantee, pricing philosophy, and fiduciary duties."
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '6 Phases', label: 'Proprietary Machine' },
          { value: '100%', label: 'Cancel-Anytime Pledge' },
          { value: 'Top 2%', label: 'Statewide Producer' },
          { value: '24/7', label: 'Client Support' },
        ]}
        primaryCtaText="Ask Brian Directly"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Request CMA Valuation"
        onSecondaryCtaClick={onOpenValuation}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E6E2DA] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-lg font-bold text-[#002D61]">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#EA580C] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-sm text-[#4B5563] leading-relaxed border-t border-stone-100 pt-4"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="mt-12 text-center p-8 rounded-3xl bg-[#F4F1EB] border border-[#E6E2DA]">
            <h3 className="font-serif text-xl font-bold text-[#002D61] mb-2">Have a Question Not Listed Here?</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
              Brian is directly reachable 7 days a week at (405) 513-3039.
            </p>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-[#002D61] text-white text-xs font-bold uppercase tracking-wider"
            >
              Ask Brian Directly
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

// -------------------------------------------------------------
// 6. LEGAL COMPLIANCE PAGE (/privacy-policy, /terms-of-service, /fair-housing-disclosure)
// -------------------------------------------------------------
interface LegalPageProps extends ResourcePageProps {
  type: 'privacy' | 'terms' | 'fairhousing';
}

export const LegalCompliancePage: React.FC<LegalPageProps> = ({
  type,
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const getDetails = () => {
    switch (type) {
      case 'privacy':
        return {
          title: "Privacy Policy",
          badge: "Client Data Protection",
          intro: "Your privacy is paramount. Brian Jamison and Salt Real Estate collect only the necessary property and contact data required to deliver market appraisals and transactional services.",
          body: [
            "We do not sell, rent, or lease your personal information to third-party data brokers.",
            "Information entered into our valuation tool is utilized solely to calculate Comparative Market Analyses (CMAs) and communicate listing data.",
            "All CRM communications respect federal TCPA guidelines. You may opt out of SMS or email notifications at any time.",
            "Physical address: Salt Real Estate Corporate Office, 1508 W. Edmond Rd., Edmond, OK 73003."
          ]
        };
      case 'terms':
        return {
          title: "Terms of Service",
          badge: "Platform Terms & Legal Use",
          intro: "Welcome to the official real estate platform of Brian Jamison (Salt Real Estate Corporate Office). By browsing this website, you agree to these Terms of Service.",
          body: [
            "All MLS listing data, photography, 4K video walkthroughs, and architectural drone footage are proprietary assets protected by copyright.",
            "Comparative market appraisals generated through this website represent professional estimates and do not constitute formal lending appraisals.",
            "Brian Jamison is a licensed real estate professional in the State of Oklahoma (License #184931) operating under Salt Real Estate Corporate Office.",
            "Governing jurisdiction: Oklahoma County, State of Oklahoma."
          ]
        };
      case 'fairhousing':
        return {
          title: "Fair Housing & Equal Opportunity",
          badge: "Federal & State Compliance",
          intro: "Brian Jamison and Salt Real Estate are fully committed to the letter and spirit of the United States Fair Housing Act and Title VIII of the Civil Rights Act.",
          body: [
            "We conduct all business in strict accordance with federal, state, and local fair housing laws.",
            "We do not discriminate on the basis of race, color, religion, sex, handicap, familial status, national origin, sexual orientation, or gender identity.",
            "All advertised properties are available on an equal opportunity basis.",
            "If you suspect discriminatory practices, you may file a complaint directly with the U.S. Department of Housing and Urban Development (HUD) at 1-800-669-9777."
          ]
        };
    }
  };

  const details = getDetails();

  return (
    <article className="w-full bg-[#FAF9F6] text-[#1B1D21] selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* SECTION 1: FLAGSHIP LUXURY VIDEO HERO (Identical to Homepage) */}
      <InteriorHeroVideo
        kicker={details.badge}
        title={details.title}
        subtitle={details.intro}
        heroVideoUrl="/media/videos/vid1.mp4"
        heroFallbackImage="/media/gallery/modern-estate-pool-lawn.jpeg"
        metrics={[
          { value: '100%', label: 'Legal Compliance' },
          { value: 'Fiduciary', label: 'Client Protection' },
          { value: '#184931', label: 'OREC Broker License' },
          { value: 'OK County', label: 'Legal Jurisdiction' },
        ]}
        primaryCtaText="Contact Brian Jamison"
        onPrimaryCtaClick={onOpenConsultation}
        secondaryCtaText="Return Home"
        onSecondaryCtaClick={() => onNavigate('/')}
        onNavigate={onNavigate}
        onOpenConsultation={onOpenConsultation}
        onOpenValuation={onOpenValuation}
      />

      <section className="w-full py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E6E2DA] shadow-xs space-y-6">
            {details.body.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-6 border-b border-stone-100 last:border-none last:pb-0">
                <CheckCircle2 className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#374151] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-[#6B7280] text-center">
            Brian Jamison · REALTOR® #184931 · Salt Real Estate Corporate Office · 1508 W. Edmond Rd., Edmond, OK 73003 · (405) 513-3039
          </div>
        </div>
      </section>
    </article>
  );
};
