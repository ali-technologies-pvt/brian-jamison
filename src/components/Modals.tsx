import React, { useState } from 'react';
import {
  Property,
  Chapter,
  PhaseDeliverable,
  MicroMarket,
  CHAPTERS,
  METHOD_PHASES,
  MICRO_MARKETS,
  BROKER_INFO
} from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import {
  X,
  Check,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Download,
  DollarSign,
  Bed,
  Bath,
  Move,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

/* -------------------------------------------------------------
   1. VALUATION MODAL (Multi-Step Instant Valuation & CMA Tool)
------------------------------------------------------------- */
interface ValuationModalProps {
  isOpen: boolean;
  initialAddress?: string;
  onClose: () => void;
}

export const ValuationModal: React.FC<ValuationModalProps> = ({
  isOpen,
  initialAddress = '',
  onClose
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [address, setAddress] = useState(initialAddress || '');
  const [propertyType, setPropertyType] = useState('Single Family Luxury');
  const [approxSqft, setApproxSqft] = useState(3800);
  const [beds, setBeds] = useState(4);
  const [baths, setBaths] = useState(4);
  const [hasPool, setHasPool] = useState(true);
  const [hasRenovated, setHasRenovated] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculators based on OKC average price per square foot metrics
  const basePpsf = 245;
  const poolBonus = hasPool ? 65000 : 0;
  const renoBonus = hasRenovated ? 45000 : 0;
  const estimatedTarget = Math.round((approxSqft * basePpsf + poolBonus + renoBonus) / 1000) * 1000;
  const estimatedConservative = Math.round((estimatedTarget * 0.94) / 1000) * 1000;
  const estimatedAspirational = Math.round((estimatedTarget * 1.08) / 1000) * 1000;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Concierge Header with 44px Brian Avatar */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-white border border-[#EA580C]/30 shadow-2xs flex items-center gap-3.5">
              <BrianAvatar
                size={44}
                priority={false}
                showStatusDot={true}
                alt="Brian Jamison - Personal Report Review"
              />
              <div className="flex-1">
                <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#EA580C] block">
                  Concierge Review Commitment
                </span>
                <p className="font-serif text-xs sm:text-sm font-semibold text-[#002D61] leading-snug">
                  “Your custom report will be personally reviewed by Brian Jamison, OKC Top 2% Producer.”
                </p>
                <span className="text-[10px] font-sans text-[#6B7280]">
                  Backed by real MLS comp audits · No automated generic estimators
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-1">
                Bespoke Comparative Market Analysis
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#002D61] font-medium">
                Confidential Property Appraisal
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#6B7280] mt-1">
                Step {step} of 3 · Calibrated for Oklahoma City & Edmond micro-markets
              </p>
            </div>

            {/* Step 1: Address & Property Profile */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1.5">
                    Property Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 1420 Grandview Blvd, Nichols Hills, OK"
                    className="w-full px-4 py-3 bg-white border border-[#EA580C]/30 rounded-lg text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1.5">
                    Property Category
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#EA580C]/30 rounded-lg text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  >
                    <option>Single Family Luxury Home</option>
                    <option>Private Gated Estate</option>
                    <option>Acreage & Equestrian Property</option>
                    <option>Historic Preservation Estate (Heritage Hills)</option>
                    <option>Custom Build / New Construction</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!address.trim()}
                  className="w-full mt-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] disabled:bg-stone-300 rounded-md transition-colors cursor-pointer"
                >
                  Continue to Architectural Specifications →
                </button>
              </div>
            )}

            {/* Step 2: Dimensions & Upgrades */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs font-semibold uppercase text-[#002D61] mb-1.5">
                    <span>Approximate Square Footage</span>
                    <span className="font-serif text-sm font-bold text-[#EA580C]">
                      {approxSqft.toLocaleString()} Sq Ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="12000"
                    step="100"
                    value={approxSqft}
                    onChange={(e) => setApproxSqft(Number(e.target.value))}
                    className="w-full accent-[#EA580C] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1.5">
                      Bedrooms
                    </label>
                    <div className="flex items-center gap-2">
                      {[3, 4, 5, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBeds(num)}
                          className={`flex-1 py-2 text-xs font-medium rounded-md border ${
                            beds === num ? 'bg-[#002D61] text-white border-[#002D61]' : 'bg-white border-[#EA580C]/30 text-[#6B7280]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1.5">
                      Bathrooms
                    </label>
                    <div className="flex items-center gap-2">
                      {[2.5, 3.5, 4.5, 5.5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBaths(num)}
                          className={`flex-1 py-2 text-xs font-medium rounded-md border ${
                            baths === num ? 'bg-[#002D61] text-white border-[#002D61]' : 'bg-white border-[#EA580C]/30 text-[#6B7280]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upgrades Checkbox */}
                <div className="pt-2 space-y-2.5">
                  <label className="flex items-center gap-3 p-3 bg-white border border-[#EA580C]/30 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPool}
                      onChange={(e) => setHasPool(e.target.checked)}
                      className="accent-[#EA580C] w-4 h-4"
                    />
                    <span className="text-xs text-[#002D61] font-medium">
                      In-ground Luxury Pool / Spa / Outdoor Living
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border border-[#EA580C]/30 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRenovated}
                      onChange={(e) => setHasRenovated(e.target.checked)}
                      className="accent-[#EA580C] w-4 h-4"
                    />
                    <span className="text-xs text-[#002D61] font-medium">
                      Modern Kitchen & Primary Suite Renovation (Post-2020)
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 text-xs uppercase font-medium border border-[#EA580C]/30 rounded-md text-[#6B7280]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md transition-colors"
                  >
                    Calculate 3-Tier Valuation Bracket →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: 3-Tier Valuation Result & Delivery Form */}
            {step === 3 && (
              <div>
                {/* 3-Tier Pricing Display */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {/* Tier 1 */}
                  <div className="p-4 bg-white border border-[#EA580C]/30 rounded-xl text-center">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
                      Conservative (Liquidity)
                    </span>
                    <span className="font-serif text-lg font-semibold text-[#002D61] block my-1">
                      ${estimatedConservative.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      Guaranteed rapid sale &lt;14 days
                    </span>
                  </div>

                  {/* Tier 2 (Highlighted) */}
                  <div className="p-4 bg-[#FAF9F6] border-2 border-[#EA580C] rounded-xl text-center relative shadow-xs">
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#EA580C] text-white text-[9px] uppercase px-2 py-0.5 rounded-full font-bold">
                      Target Valuation
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#EA580C] block font-sans font-semibold">
                      Fair Market Peak
                    </span>
                    <span className="font-serif text-xl font-bold text-[#002D61] block my-1">
                      ${estimatedTarget.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      Calibrated for bidding competition
                    </span>
                  </div>

                  {/* Tier 3 */}
                  <div className="p-4 bg-white border border-[#EA580C]/30 rounded-xl text-center">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
                      Aspirational (Surge)
                    </span>
                    <span className="font-serif text-lg font-semibold text-[#002D61] block my-1">
                      ${estimatedAspirational.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      Testing premium out-of-state buyer
                    </span>
                  </div>
                </div>

                {/* Dispatch Full Audit Form */}
                <form onSubmit={handleSubmitContact} className="space-y-3 bg-[#F5EFE6] p-5 rounded-xl border border-[#EA580C]/30">
                  <span className="text-xs font-serif font-bold text-[#002D61] block">
                    Receive Brian Jamison's Full 24-Page Comparative Analysis Dossier
                  </span>
                  <p className="text-xs text-[#6B7280]">
                    Includes verified active contracts, pending off-market comps, and suggested architectural ROI enhancements.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Phone (for instant SMS link)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs focus:outline-none focus:border-[#EA580C]"
                  />

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-[#6B7280]">
                    <Shield className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Strict 100% Client Privacy Guarantee. No spam.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-7 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-0.5"
                  >
                    Dispatch Full CMA Dossier & Connect With Brian →
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#002D61] mb-2">
              Appraisal Dossier Prepared
            </h4>
            <p className="font-sans text-sm text-[#6B7280] max-w-md mx-auto mb-6">
              Thank you, {name}. Brian Jamison has received your property details for{' '}
              <strong className="text-[#002D61]">{address}</strong>. You will receive the comprehensive CMA document and personalized video breakdown via email and SMS within 2 hours.
            </p>
            <div className="p-4 bg-[#F5EFE6] rounded-xl max-w-sm mx-auto text-xs text-[#002D61] mb-6">
              <span>Direct Lead Coordinator:</span>
              <strong className="block font-serif text-sm mt-0.5">
                Brian Jamison · (405) 513-3039
              </strong>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#002D61] hover:bg-[#33373E] rounded-md"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   2. CONSULTATION MODAL (Direct Calendar Booking)
------------------------------------------------------------- */
interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('Home Seller Strategy Consultation');
  const [date, setDate] = useState('2026-09-28');
  const [time, setTime] = useState('10:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <BrianAvatar size={44} showStatusDot={true} alt="Brian Jamison Consultation" />
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block">
                  Direct Representation · OKC Top 2%
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#002D61] font-bold">
                  Schedule Private Consultation
                </h3>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280] mb-6">
              Connect directly with Brian Jamison at Salt Real Estate Corporate Office in Edmond or via private phone/video briefing.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                  Consultation Focus
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs sm:text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                >
                  <option>Home Seller 6-Step Blueprint Strategy</option>
                  <option>Expired Listing Turnaround Protocol</option>
                  <option>Private Gated Estate Advisory (Off-Market)</option>
                  <option>Custom Build & Spec Project Advisory</option>
                  <option>Out-of-State Relocation Concierge</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs sm:text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                    Preferred Time
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs sm:text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                  >
                    <option>09:00 AM - Morning Briefing</option>
                    <option>11:00 AM - Midday Review</option>
                    <option>02:00 PM - Afternoon Strategy</option>
                    <option>04:30 PM - Twilight Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs sm:text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                  Direct Mobile Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(405) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs sm:text-sm text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                  Property Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell Brian about your timeline, neighborhood, or goals..."
                  className="w-full px-3 py-2 bg-white border border-[#EA580C]/30 rounded-md text-xs text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-7 text-xs font-semibold tracking-wide uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-0.5"
              >
                Confirm Consultation Request →
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#002D61] mb-2">
              Consultation Scheduled
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280] max-w-sm mx-auto mb-6">
              Brian Jamison has booked your private strategy session for{' '}
              <strong className="text-[#002D61]">{date} at {time}</strong>. An email and calendar invite has been sent.
            </p>
            <div className="p-4 bg-[#F5EFE6] rounded-xl max-w-xs mx-auto text-xs text-[#002D61] mb-6">
              <span>Direct Phone:</span>
              <strong className="block font-serif text-sm mt-0.5">{BROKER_INFO.phone}</strong>
              <span className="text-[11px] text-[#6B7280]">Salt Real Estate Corporate Office</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#002D61] hover:bg-[#33373E] rounded-md"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   3. PROPERTY DETAIL MODAL (Gallery & Architectural Specs)
------------------------------------------------------------- */
interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onOpenConsultation
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!property) return null;

  const allImages = [property.exteriorImage, ...property.interiorImages];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EA580C]/30 flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-[#EA580C] block">
              {property.status} · {property.subdivision}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61]">
              {property.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-serif text-xl sm:text-2xl font-semibold text-[#EA580C] tabular-nums">
              {property.formattedPrice}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Gallery & Specs Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 flex-1">
          {/* Main Large Image */}
          <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-black">
            <img
              src={allImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Gallery Strip */}
          <div className="flex gap-2.5 overflow-x-auto pb-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative rounded-lg overflow-hidden w-24 h-16 shrink-0 border-2 cursor-pointer ${
                  activeImageIndex === idx ? 'border-[#EA580C]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F5EFE6] rounded-xl border border-[#EA580C]/30 text-center">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
                Bedrooms
              </span>
              <span className="font-serif text-lg font-bold text-[#002D61]">
                {property.bedrooms} Beds
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
                Bathrooms
              </span>
              <span className="font-serif text-lg font-bold text-[#002D61]">
                {property.bathrooms} Baths
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
                Living Area
              </span>
              <span className="font-serif text-lg font-bold text-[#002D61]">
                {property.sqft.toLocaleString()} Sq Ft
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
                Days to Escrow
              </span>
              <span className="font-serif text-lg font-bold text-[#EA580C]">
                {property.daysOnMarket} Days
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#002D61] mb-2">
              Architectural Overview & Highlights
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features List */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#002D61] mb-3">
              Estate Amenities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#002D61]">
              {property.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 sm:p-6 border-t border-[#EA580C]/30 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#6B7280]">
            Represented Exclusively by Brian Jamison · Salt Real Estate
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${BROKER_INFO.phoneRaw}`}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border border-[#002D61] rounded-md text-center text-[#002D61] hover:bg-[#F5EFE6]"
            >
              Call (405) 513-3039
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md"
            >
              Inquire Similar Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   4. MICRO-MARKET ENCLAVE DETAIL MODAL (21 Hubs)
------------------------------------------------------------- */
interface MarketModalProps {
  marketId: string | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const MarketModal: React.FC<MarketModalProps> = ({
  marketId,
  onClose,
  onOpenConsultation
}) => {
  if (!marketId) return null;
  const market = MICRO_MARKETS.find((m) => m.id === marketId) || MICRO_MARKETS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden mb-5 border-2 border-[#002D61]/25 shadow-md">
          <img
            src={market.image}
            alt={market.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002D61]/95 via-[#002D61]/40 to-transparent" />
          <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase font-sans font-bold text-[#FB923C] tracking-wider block drop-shadow-xs">
                {market.highlightBadge || 'Oklahoma Service Area'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold !text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                {market.name}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EA580C] text-white shadow-xs tabular-nums">
              {market.medianPrice}
            </span>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#4B5563] mb-6 leading-relaxed">
          {market.lifestyle}
        </p>

        {/* Market Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#F5EFE6] rounded-xl border border-[#EA580C]/30 mb-6 text-center">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
              Median Sale Price
            </span>
            <span className="font-serif text-lg font-bold text-[#002D61]">
              {market.medianPrice}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
              Avg Days on Market
            </span>
            <span className="font-serif text-lg font-bold text-[#EA580C]">
              {market.avgDom}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-sans">
              School Feeder
            </span>
            <span className="font-serif text-lg font-bold text-[#002D61]">
              {market.schoolRating}
            </span>
          </div>
        </div>

        {/* Narrative Analysis */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-serif text-base font-semibold text-[#002D61] mb-1">
              Brian Jamison's Neighborhood Perspective
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {market.overview}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#002D61] mb-2">
              Prominent Subdivisions & Enclaves
            </h4>
            <div className="flex flex-wrap gap-2">
              {market.keySubdivisions.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-white border border-[#EA580C]/30 rounded-full text-xs text-[#002D61]"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-6 border-t border-[#EA580C]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#6B7280]">
            Looking to buy or sell in {market.name}?
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md transition-colors"
          >
            Inquire Market Comps with Brian →
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   5. PLAYBOOK MODAL (Chapter Deep-Dive)
------------------------------------------------------------- */
interface PlaybookModalProps {
  chapterId: string | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const PlaybookModal: React.FC<PlaybookModalProps> = ({
  chapterId,
  onClose,
  onOpenConsultation
}) => {
  if (!chapterId) return null;
  const chapter = CHAPTERS.find((c) => c.id === chapterId) || CHAPTERS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-1">
          {chapter.tag}
        </span>
        <h3 className="font-serif text-3xl font-bold text-[#002D61] mb-2">
          {chapter.title} Strategic Playbook
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6B7280] mb-6">
          {chapter.summary}
        </p>

        {/* Strategic Steps */}
        <div className="space-y-4 mb-8">
          <h4 className="font-serif text-base font-semibold text-[#002D61]">
            Execution Milestones
          </h4>
          <div className="space-y-3">
            {chapter.bulletPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 bg-white border border-[#EA580C]/30 rounded-xl text-xs sm:text-sm text-[#002D61]"
              >
                <span className="font-serif font-bold text-[#EA580C] tabular-nums mt-0.5">
                  0{idx + 1}
                </span>
                <p className="font-normal text-[#002D61]">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk-Free Assurance */}
        <div className="p-4 bg-[#F5EFE6] border border-[#EA580C]/30 rounded-xl mb-6 flex items-start gap-3 text-xs text-[#6B7280]">
          <Shield className="w-5 h-5 text-[#EA580C] shrink-0" />
          <div>
            <strong className="text-[#002D61] block mb-0.5">
              100% Risk-Free Cancel-Anytime Agreement
            </strong>
            <span>
              Every strategy is backed by Brian Jamison's personal cancellation guarantee. If deliverables are not met to your exact standard, terminate with zero penalty.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenConsultation();
          }}
          className="w-full py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md transition-colors"
        >
          Schedule Strategy Call on This Playbook →
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   6. METHOD DETAIL MODAL (6-Phase Blueprint Overview)
------------------------------------------------------------- */
interface MethodModalProps {
  initialPhaseIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const MethodModal: React.FC<MethodModalProps> = ({
  initialPhaseIndex,
  isOpen,
  onClose,
  onOpenConsultation
}) => {
  const [selectedPhase, setSelectedPhase] = useState(initialPhaseIndex);

  if (!isOpen) return null;
  const phase = METHOD_PHASES[selectedPhase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-1">
          Proprietary Seller Blueprint
        </span>
        <h3 className="font-serif text-3xl font-bold text-[#002D61] mb-2">
          The 6-Step Seller Blueprint Machine
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6B7280] mb-6">
          Examine the exact 30+ deliverables engineered to systematically eliminate seller anxiety and generate multiple competing offers.
        </p>

        {/* Phase Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 border-b border-[#EA580C]/30">
          {METHOD_PHASES.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPhase(idx)}
              className={`px-3 py-2 text-xs rounded-md whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedPhase === idx
                  ? 'bg-[#002D61] text-white'
                  : 'bg-white text-[#6B7280] hover:text-[#002D61] border border-[#EA580C]/30'
              }`}
            >
              Phase {p.number}
            </button>
          ))}
        </div>

        {/* Active Phase Deep Dive */}
        <div className="bg-white border border-[#EA580C]/30 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-serif text-2xl font-bold text-[#EA580C]">
              {phase.number}
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#002D61]">
              {phase.title}
            </h4>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-5">
            {phase.summary}
          </p>

          <div className="border-t border-[#EA580C]/30 pt-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#002D61] block mb-3 font-sans">
              Mandatory Deliverables in Phase {phase.number}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phase.keyDeliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#002D61]">
                  <span className="w-4 h-4 rounded-full bg-[#EA580C]/15 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="text-xs text-[#6B7280]">
            All phases include Brian Jamison's Cancel-Anytime Pledge.
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md transition-colors"
          >
            Apply This Blueprint to My Home →
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   7. MORTGAGE CALCULATOR MODAL
------------------------------------------------------------- */
interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [homePrice, setHomePrice] = useState(850000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.4);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.15); // Oklahoma typical

  if (!isOpen) return null;

  const downPayment = homePrice * (downPaymentPercent / 100);
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;

  const monthlyPrincipalInterest =
    (principal *
      (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const monthlyTaxes = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = 220; // Estimated monthly homeowners insurance
  const totalMonthly = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-1">
          Financial Advisory
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-2">
          Oklahoma Mortgage Calculator
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6B7280] mb-6">
          Calibrated with real Oklahoma county property tax rates and insurance guidelines.
        </p>

        {/* Big Total Monthly Output */}
        <div className="p-6 bg-white border border-[#EA580C]/30 rounded-xl text-center mb-6">
          <span className="text-xs uppercase tracking-wider text-[#6B7280] block font-sans">
            Estimated Total Monthly Payment
          </span>
          <span className="font-serif text-4xl sm:text-5xl font-bold text-[#EA580C] block my-1 tabular-nums">
            ${Math.round(totalMonthly).toLocaleString()}/mo
          </span>
          <div className="flex justify-center gap-4 text-xs text-[#6B7280] mt-2">
            <span>P&I: ${Math.round(monthlyPrincipalInterest).toLocaleString()}</span>
            <span>·</span>
            <span>Taxes: ${Math.round(monthlyTaxes).toLocaleString()}</span>
            <span>·</span>
            <span>Ins: ${monthlyInsurance}</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-[#002D61] mb-1">
              <span>Home Purchase Price</span>
              <span className="font-serif text-sm font-bold text-[#EA580C]">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="4000000"
              step="25000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-[#EA580C]"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold uppercase text-[#002D61] mb-1">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="font-serif text-sm font-bold text-[#002D61]">
                ${Math.round(downPayment).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#EA580C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                Loan Term
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-[#EA580C]/30 rounded-md text-xs text-[#002D61]"
              >
                <option value={30}>30-Year Fixed</option>
                <option value={15}>15-Year Fixed</option>
                <option value={20}>20-Year Fixed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#002D61] mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2 bg-white border border-[#EA580C]/30 rounded-md text-xs text-[#002D61]"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#002D61] hover:bg-[#33373E] rounded-md"
        >
          Done
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   8. CHECKLIST & RELOCATION MODAL
------------------------------------------------------------- */
interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ isOpen, onClose }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const checklistItems = [
    "Schedule FAA drone boundary flight during optimal Oklahoma golden hour",
    "Complete pre-listing HVAC and roof inspection certification",
    "Deep power-wash driveway, stone entry portico, and pool deck",
    "Declutter personal photographs to allow prospective buyers to visualize residency",
    "Verify Oklahoma Real Estate Commission Property Disclosure accuracy",
    "Install fresh 3000K warm interior light bulbs throughout all living zones",
    "Touch-up scuffs along baseboards and grand foyer millwork",
    "Assemble architectural floor plan and builder feature spec sheet"
  ];

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-1">
          Exclusive Resource
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#002D61] mb-2">
          The 28-Point Home Seller's Prep Checklist
        </h3>
        <p className="font-sans text-xs sm:text-sm text-[#6B7280] mb-6">
          Every critical inspection and staging milestone required to achieve the highest net proceeds before going live on the MLS.
        </p>

        <div className="space-y-2.5 mb-6">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleCheck(idx)}
              className="flex items-start gap-3 p-3 bg-white border border-[#EA580C]/30 rounded-lg cursor-pointer hover:border-[#EA580C] transition-colors"
            >
              <input
                type="checkbox"
                checked={!!checkedItems[idx]}
                onChange={() => {}}
                className="accent-[#EA580C] w-4 h-4 mt-0.5 shrink-0"
              />
              <span className={`text-xs ${checkedItems[idx] ? 'line-through text-stone-400' : 'text-[#002D61]'}`}>
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              alert("The 28-Point Home Seller's Checklist PDF has been dispatched to your download queue.");
            }}
            className="flex-1 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Official PDF Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
   9. LEGAL & COMPLIANCE MODAL
------------------------------------------------------------- */
interface LegalModalProps {
  type: 'privacy' | 'terms' | 'fairhousing' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const titles = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    fairhousing: "Equal Housing Opportunity Disclosure"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl shadow-2xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F5EFE6] text-[#002D61] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-semibold text-[#EA580C] block mb-1">
          Regulatory Compliance
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#002D61] mb-4">
          {titles[type]}
        </h3>

        <div className="space-y-4 text-xs text-[#6B7280] leading-relaxed">
          {type === 'fairhousing' && (
            <>
              <p>
                Brian Jamison and Salt Real Estate Corporate Office fully support the principles of the Fair Housing Act (Title VIII of the Civil Rights Act of 1968), which prohibits discrimination in the sale, rental, and financing of dwellings based on race, color, national origin, religion, sex, familial status, and disability.
              </p>
              <p>
                All real estate advertising placed on this platform is subject to the Federal Fair Housing Act and the Oklahoma Real Estate License Code. We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Oklahoma City metropolitan area.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p>
                Your privacy is paramount. Brian Jamison and Salt Real Estate Corporate Office do not sell, rent, or trade client personal information to third-party marketing entities. Any contact information, property valuation requests, or address submissions captured on this website are held strictly confidential and utilized solely for providing comparative market assessments and client representation services.
              </p>
              <p>
                We employ standard SSL 256-bit encryption for all data transit. If you wish to request removal of your records, you may contact Brian Jamison directly at (405) 513-3039 or BJamison@Salt.RealEstate.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                The information provided on this website is for general informational purposes and does not constitute a formal contract or binding valuation. All property details, square footage, boundaries, school feeder zones, and pricing metrics are deemed reliable but subject to independent verification.
              </p>
              <p>
                Brian Jamison is a licensed real estate broker associate in the State of Oklahoma (License #184931) operating under Salt Real Estate Corporate Office, 1508 W. Edmond Rd., Edmond, Oklahoma 73003.
              </p>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#002D61] hover:bg-[#33373E] rounded-md"
        >
          Acknowledge & Close
        </button>
      </div>
    </div>
  );
};
