'use client';

import React from 'react';
import {
  Building2,
  Home,
  MapPin,
  ListOrdered,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  FileText,
  Plus
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0A2540]">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5E0D8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#E07A28]" />
            </div>
            <div>
              <div className="font-serif text-lg font-bold text-[#0A2540] leading-none">
                JAMISON REAL ESTATE
              </div>
              <span className="text-[11px] font-sans text-[#6B7280]">
                Custom Real Estate CMS · Super Admin Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E5E0D8]/40 border border-[#E5E0D8] text-xs font-semibold text-[#0A2540] transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E07A28]" />
            </a>

            <a
              href="/admin/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200/80 text-xs font-semibold text-red-700 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[10px] font-bold tracking-widest uppercase text-[#0A2540] mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E07A28]" />
              <span>Phase 1 Initialized · Active Session</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2540]">
              Welcome back, Brian Jamison
            </h1>
            <p className="text-sm text-[#6B7280] mt-1.5 max-w-2xl leading-relaxed">
              Your domain-agnostic Next.js CMS backend is configured with PostgreSQL, Prisma ORM, and NextAuth credentials authentication.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-5 py-2.5 rounded-full bg-[#E07A28] hover:bg-[#C86518] text-white text-xs font-semibold tracking-wide transition-all shadow-md shadow-[#E07A28]/25 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Listing</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold mb-2">
              <span>Career Volume</span>
              <TrendingUp className="w-4 h-4 text-[#E07A28]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0A2540]">$70M+</div>
            <div className="text-[11px] text-[#6B7280] mt-1">Verified MLS Track Record</div>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold mb-2">
              <span>Career Closings</span>
              <Home className="w-4 h-4 text-[#E07A28]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0A2540]">370+</div>
            <div className="text-[11px] text-[#6B7280] mt-1">Oklahoma Metro Closings</div>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold mb-2">
              <span>Market Rank</span>
              <ShieldCheck className="w-4 h-4 text-[#E07A28]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0A2540]">Top 2%</div>
            <div className="text-[11px] text-[#6B7280] mt-1">OKC Metropolitan Board</div>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between text-[#6B7280] text-xs font-semibold mb-2">
              <span>Service Hubs</span>
              <MapPin className="w-4 h-4 text-[#E07A28]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#0A2540]">21 Enclaves</div>
            <div className="text-[11px] text-[#6B7280] mt-1">SEO Optimized Hubs</div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-[#0A2540] flex items-center justify-center mb-4">
              <Home className="w-5 h-5 text-[#E07A28]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0A2540] mb-2">
              Property Listings
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
              Manage MLS properties, HDR galleries, Matterport virtual tours, and SEO metadata.
            </p>
            <span className="text-xs font-semibold text-[#E07A28]">Manage Listings →</span>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-[#0A2540] flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-[#E07A28]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0A2540] mb-2">
              Service Areas
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
              Update 21 Oklahoma City metro neighborhood landing pages, market data, and descriptions.
            </p>
            <span className="text-xs font-semibold text-[#E07A28]">Edit Metro Hubs →</span>
          </div>

          <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-[#0A2540] flex items-center justify-center mb-4">
              <ListOrdered className="w-5 h-5 text-[#E07A28]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#0A2540] mb-2">
              6-Phase Seller Blueprint
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
              Edit deliverables, media assets, client benefits, and guarantee pledge details.
            </p>
            <span className="text-xs font-semibold text-[#E07A28]">Configure Blueprint →</span>
          </div>
        </div>
      </main>
    </div>
  );
}
