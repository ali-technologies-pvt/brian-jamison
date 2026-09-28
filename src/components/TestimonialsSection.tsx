import React from 'react';
import { TESTIMONIALS, BROKER_INFO } from '../data/realEstateData';
import { BrianAvatar } from './BrianAvatar';
import { Star, Quote, ShieldCheck } from 'lucide-react';

interface TestimonialsSectionProps {
  onOpenConsultation: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="testimonials" className="w-full py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#E5A93C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-bold text-[#EA580C] block mb-3">
            Track Record of Results
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#002D61] font-bold tracking-tight">
            Client Experiences
          </h2>
        </div>

        {/* 3 Editorial Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#F5EFE6] border border-[#E5A93C]/30 rounded-2xl p-8 flex flex-col justify-between shadow-xs hover:border-[#E5A93C]/40 transition-colors"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-5 text-[#E5A93C]">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5A93C]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-base sm:text-lg text-[#002D61] italic leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-[#E5A93C]/30">
                <span className="font-serif font-semibold text-sm text-[#002D61] block">
                  {item.author}
                </span>
                <span className="font-sans text-xs text-[#6B7280] block mt-0.5">
                  {item.location}
                </span>
                <span className="inline-block mt-2 text-[11px] text-[#E5A93C] font-medium font-sans">
                  {item.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Brian's Personal Trust Guarantee & Author Badging */}
        <div className="max-w-3xl mx-auto p-5 sm:p-6 rounded-2xl bg-white border border-[#E5A93C]/30 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
          <BrianAvatar size={48} showStatusDot={true} alt="Brian Jamison - Client Satisfaction Commitment" />
          <div className="flex-1">
            <div className="flex items-center justify-center sm:justify-between flex-wrap gap-2 mb-1">
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#E5A93C]">
                Broker Commitment
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#002D61]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
                100% Cancel-Anytime Listing Guarantee
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#002D61] leading-relaxed">
              “Every review above represents a client who trusted my process. I treat your home sale as if my own equity is on the line—with daily communication, hard data, and personal presence from listing day to the closing table.”
            </p>
            <div className="mt-2 text-xs text-[#6B7280]">
              <strong className="text-[#002D61] font-serif">Brian Jamison</strong> · Top 2% Producer · {BROKER_INFO.license} · Salt Real Estate Corporate Office
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
