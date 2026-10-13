import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  ExternalLink,
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building,
  ArrowRight,
  Copy,
  Check,
  FileCode,
  DollarSign,
  TrendingUp,
  Clock,
  Home,
  Users,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';
import { BROKER_INFO, MICRO_MARKETS } from '../data/realEstateData';
import { JamisonLogo } from '../components/JamisonLogo';

interface SitemapItem {
  path: string;
  title: string;
  category: 'Core' | 'Service' | 'Community' | 'Standard' | 'Audience' | 'Resource' | 'Legal';
  description: string;
  badge?: string;
  stat?: string;
}

interface SitemapPageProps {
  onNavigate: (path: string) => void;
  onOpenConsultation: () => void;
  onOpenValuation: (initialAddress?: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenValuation
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedAll, setCopiedAll] = useState(false);

  // Complete master list of all 60+ indexed pages
  const ALL_SITEMAP_ENTRIES: SitemapItem[] = useMemo(() => [
    // 1. Core Brand Portals (8)
    {
      path: '/',
      title: 'Home · The Agent Who Works Like Every Deal Is Personal',
      category: 'Core',
      description: 'Cinematic 4K drone video hero, 3 major services, live data counters ($70M+ volume, 370+ closings), and verified Google reviews.',
      badge: 'Flagship Entry',
      stat: '$70M+ Sold'
    },
    {
      path: '/about',
      title: 'About Brian Jamison & Broker Mentality',
      category: 'Core',
      description: 'Collegiate athletic discipline, fiduciary work ethic, transaction records, and corporate headquarters.',
      badge: 'Leadership',
      stat: 'Top 2% Producer'
    },
    {
      path: '/seller-blueprint',
      title: '6-Phase Proprietary Seller Blueprint',
      category: 'Core',
      description: 'The proven selling machine: Elite media, transparent showing feedback, 24/7 reachability, 7-person team, 3-tier pricing, and Cancel-Anytime pledge.',
      badge: 'Core Engine',
      stat: '30+ Deliverables'
    },
    {
      path: '/listings',
      title: 'Active & Featured Real Estate Portfolio',
      category: 'Core',
      description: 'Explore premier luxury listings, acreage tracts, and residential properties across Greater Oklahoma City and Edmond.',
      badge: 'MLS Feed',
      stat: 'Live Portfolio'
    },
    {
      path: '/past-sales',
      title: '$70M+ Past Sales & Verified Closings Record',
      category: 'Core',
      description: 'Documented transaction track record including Norman, Edmond, Nichols Hills, Deer Creek, and OKC residential closings.',
      badge: 'Track Record',
      stat: '370+ Closings'
    },
    {
      path: '/reviews',
      title: 'Verified Client Google Reviews & Testimonials',
      category: 'Core',
      description: 'All 11 verified 5.0-star Google reviews from homeowners, first-time buyers, investors, and repeat clients.',
      badge: 'Google 5.0 ★',
      stat: '11 Reviews'
    },
    {
      path: '/home-valuation',
      title: 'Confidential 3-Tier Home Valuation & CMA Dossier',
      category: 'Core',
      description: 'Bespoke market appraisal calculating Conservative, Target, and Aspirational tiers backed by micro-market pending sales.',
      badge: 'Valuation Tool',
      stat: '24-Hr Turnaround'
    },
    {
      path: '/contact',
      title: 'Contact Brian Jamison · Corporate Office',
      category: 'Core',
      description: 'Direct phone line (405) 513-3039, private consultation calendar, and office location at 1508 W. Edmond Rd.',
      badge: 'Direct Connect',
      stat: '7-Day Reach'
    },
    {
      path: '/idx-test',
      title: 'IDX Broker Quick Search Integration & MLS Live Test',
      category: 'Core',
      description: 'Integrated IDX Broker MLS quick search widget with real-time DOM polling and property search parameters.',
      badge: 'MLS Search Test',
      stat: 'Widget #15844'
    },

    // 2. The 3 Major Services & 6 Blueprint Phases
    {
      path: '/services/home-buying',
      title: 'Home Buying Concierge & Equity Advisory',
      category: 'Service',
      description: 'Buyer representation, curated off-market access, structural inspection defense, and veteran negotiation.',
      badge: 'Major Service 01',
      stat: '$24.5K Avg Savings'
    },
    {
      path: '/services/home-selling',
      title: 'Home Selling Machine · Top Dollar Strategic Marketing',
      category: 'Service',
      description: 'Full-scale marketing campaign built to put your home in front of every qualified buyer with 100% Cancel-Anytime protection.',
      badge: 'Major Service 02',
      stat: '101.4% List Realization'
    },
    {
      path: '/services/land-buying-and-selling',
      title: 'Land Buying and Selling · Acreage & Custom Lots',
      category: 'Service',
      description: 'Drone boundary mapping, DEQ soil percolation audits, water well depth due diligence, and custom builder connections.',
      badge: 'Major Service 03',
      stat: '1,450+ Acres Closed'
    },
    {
      path: '/services/elite-marketing',
      title: 'Blueprint Phase 1: High-End Media & Exposure Engine',
      category: 'Service',
      description: 'Professional 4K cinema video, golden hour photography, drone aerials, Matterport tours, and 350+ portal syndication.',
      badge: 'Phase 01',
      stat: '350+ Global Portals'
    },
    {
      path: '/services/transparent-communication',
      title: 'Blueprint Phase 2: Proactive & Transparent Communication',
      category: 'Service',
      description: 'Mandatory showing feedback calls within 2 hours, weekly milestone traffic dashboards, and plain-English contract guidance.',
      badge: 'Phase 02',
      stat: '2-Hour Feedback'
    },
    {
      path: '/services/accessibility-guarantee',
      title: 'Blueprint Phase 3: 24/7 Accessibility & Zero Lead Lag',
      category: 'Service',
      description: 'Seven-day-a-week reachability with dedicated desk coverage ensuring no buyer inquiry or showing request is delayed.',
      badge: 'Phase 03',
      stat: '7-Day Coverage'
    },
    {
      path: '/services/support-team',
      title: 'Blueprint Phase 4: 7-Person Specialized Support Network',
      category: 'Service',
      description: 'Licensed transaction coordinator, personal assistant, staging crew, listing operations, media specialists, and drone pilots.',
      badge: 'Phase 04',
      stat: '7 Specialists'
    },
    {
      path: '/services/precision-pricing',
      title: 'Blueprint Phase 5: 3-Tier Data-Driven Pricing Architecture',
      category: 'Service',
      description: 'Conservative, Target, and Aspirational pricing tiers calibrated beneath search brackets to ignite multiple bidding wars.',
      badge: 'Phase 05',
      stat: '3-Tier Calibration'
    },
    {
      path: '/services/cancel-anytime-guarantee',
      title: 'Blueprint Phase 6: Zero-Risk Partnership & Cancel-Anytime Pledge',
      category: 'Service',
      description: 'If contractual commitments are not fulfilled, terminate the agreement immediately. Zero penalty, zero hassle.',
      badge: 'Phase 06',
      stat: '100% Risk-Free'
    },

    // 3. 10 Marketing & Listing Standards
    {
      path: '/services/home-prep-guidance',
      title: 'Standard 01: First-Impression Architectural Review & Staging',
      category: 'Standard',
      description: 'High-ROI pre-listing refresh plan, decluttering roadmap, and spatial flow optimization.',
      badge: 'Standard 01'
    },
    {
      path: '/services/professional-photography',
      title: 'Standard 02: Architectural HDR Interior & Exterior Photography',
      category: 'Standard',
      description: 'High-dynamic-range photography highlighting natural sunlight, exterior elevation, and designer finishes.',
      badge: 'Standard 02'
    },
    {
      path: '/services/cinematic-video',
      title: 'Standard 03: Cinema-Grade 4K Motion Walkthrough Film',
      category: 'Standard',
      description: 'Narrated 4K architectural video tour highlighting estate craftsmanship and neighborhood ambiance.',
      badge: 'Standard 03'
    },
    {
      path: '/services/aerial-drone',
      title: 'Standard 04: FAA Part-107 HD Aerial Drone Mapping',
      category: 'Standard',
      description: 'High-definition aerial flyovers detailing lot topography, boundary lines, mature trees, and surrounding estates.',
      badge: 'Standard 04'
    },
    {
      path: '/services/matterport-3d',
      title: 'Standard 05: Interactive Matterport 3D Virtual Dollhouse Tour',
      category: 'Standard',
      description: 'Interactive 3D digital twin open house allowing buyers worldwide to walk the property room by room 24/7.',
      badge: 'Standard 05'
    },
    {
      path: '/services/global-portals',
      title: 'Standard 06: Syndication Across 350+ Global Real Estate Feeds',
      category: 'Standard',
      description: 'Automatic syndication to Zillow Premier, Realtor.com, Trulia, Redfin, MLS, and international luxury feeds.',
      badge: 'Standard 06'
    },
    {
      path: '/services/single-property-website',
      title: 'Standard 07: Dedicated Single-Property Domain Website',
      category: 'Standard',
      description: 'Custom address domain exclusively showcasing the listing with unbranded floorplans and high-res media.',
      badge: 'Standard 07'
    },
    {
      path: '/services/social-advertising',
      title: 'Standard 08: Hyper-Targeted Meta Paid Retargeting Campaigns',
      category: 'Standard',
      description: 'Algorithmic Facebook & Instagram advertising targeted directly to qualified, high-intent local move-up buyers.',
      badge: 'Standard 08'
    },
    {
      path: '/services/mls-refreshes',
      title: 'Standard 09: Active MLS Algorithmic Tuning & Listing Refreshes',
      category: 'Standard',
      description: 'Proactive data revisions and photo sequencing adjustments to prevent MLS listing stagnation.',
      badge: 'Standard 09'
    },
    {
      path: '/services/reverse-prospecting',
      title: 'Standard 10: Proactive Reverse Prospecting & Broker Outreach',
      category: 'Standard',
      description: 'Direct phone pitches to active Oklahoma City and Edmond buyer agents holding matching pre-approved clients.',
      badge: 'Standard 10'
    },

    // 4. 21 Oklahoma City Metro Communities & Enclaves (from MICRO_MARKETS)
    ...MICRO_MARKETS.map((m) => ({
      path: `/areas/${m.id}`,
      title: `${m.name} · Luxury Real Estate & Community Guide`,
      category: 'Community' as const,
      description: `${m.overview} Median price: ${m.medianPrice}. Average days on market: ${m.avgDom}. Key subdivisions: ${m.keySubdivisions.join(', ')}.`,
      badge: m.highlightBadge,
      stat: m.medianPrice
    })),
    {
      path: '/areas',
      title: 'Metropolitan Service Areas & 21 Community Hubs',
      category: 'Community',
      description: 'Directory of all 21 micro-markets across Greater Oklahoma City, Edmond, Nichols Hills, Norman, and surrounding acreage enclaves.',
      badge: 'Regional Hub',
      stat: '21 Areas'
    },

    // 5. Client Audience & Intent Silos
    {
      path: '/sellers',
      title: 'Sell for Top Dollar Roadmap · Strategic Equity Maximization',
      category: 'Audience',
      description: 'Proven blueprint for homeowners seeking to sell for peak market value with zero stress and a cancel-anytime guarantee.',
      badge: 'Sellers',
      stat: 'Top Dollar'
    },
    {
      path: '/expired-listings',
      title: 'Expired Listing Turnaround Protocol · Why Homes Fail to Sell',
      category: 'Audience',
      description: 'Auditing why your listing sat on the market with a previous agent and executing a decisive relaunch campaign.',
      badge: 'Turnaround',
      stat: '100% Diagnostic'
    },
    {
      path: '/first-time-buyers',
      title: 'First-Time Homebuyer Blueprint · Wealth & Equity Strategy',
      category: 'Audience',
      description: 'Step-by-step guidance from pre-approval and contract negotiation to inspection repairs and seamless closing.',
      badge: 'First-Time Buyers',
      stat: 'Zero Overwhelm'
    },
    {
      path: '/luxury-buyers',
      title: 'Luxury & Experienced Buyer Concierge · Discreet Representation',
      category: 'Audience',
      description: 'Private off-market property acquisition, architectural audits, and fiduciary negotiation for high-net-worth clients.',
      badge: 'Luxury Buyers',
      stat: 'Confidential'
    },
    {
      path: '/custom-builds',
      title: 'Custom Builds & New Construction Advisory',
      category: 'Audience',
      description: 'Lot selection, architectural floor plan review, builder contract defense, and construction phase milestone audits.',
      badge: 'Custom Builds',
      stat: '24+ Builders'
    },
    {
      path: '/fsbo',
      title: 'For Sale By Owner (FSBO) Advisory & Partnership',
      category: 'Audience',
      description: 'Professional contract drafting, title compliance, buyer vetting, and MLS exposure support for independent sellers.',
      badge: 'FSBO Support',
      stat: 'Flexible'
    },

    // 6. Resources, Calculators & Guides
    {
      path: '/resources/okc-relocation-guide',
      title: 'Oklahoma City & Edmond Relocation Guide',
      category: 'Resource',
      description: 'Neighborhood comparisons, top-rated school districts, cost-of-living metrics, and commute times to Downtown OKC.',
      badge: 'Relocation Guide'
    },
    {
      path: '/resources/home-sellers-checklist',
      title: "Home Seller's Checklist (Downloadable PDF Guide)",
      category: 'Resource',
      description: 'Room-by-room preparation checklist designed to maximize your appraisal and showings before going live on MLS.',
      badge: 'Free PDF Guide'
    },
    {
      path: '/resources/mortgage-calculator',
      title: 'Mortgage, Property Tax & Affordability Calculator',
      category: 'Resource',
      description: 'Interactive calculator computing monthly principal, interest, Oklahoma property tax assessments, and insurance.',
      badge: 'Financial Tool'
    },
    {
      path: '/resources/what-to-watch-out-for',
      title: 'What to Watch Out For in Oklahoma Real Estate',
      category: 'Resource',
      description: 'Soil conditions, foundation settlement, hail roof damage, and septic/well inspection red flags every buyer must know.',
      badge: 'Inspection Intel'
    },
    {
      path: '/faq',
      title: 'Frequently Asked Questions · Advisory & Process Answers',
      category: 'Resource',
      description: 'Direct answers to questions about listing commissions, contract cancellation, open houses, and staging timelines.',
      badge: 'General FAQ'
    },

    // 7. Legal Compliance & Ethics
    {
      path: '/privacy-policy',
      title: 'Privacy Policy & Consumer Data Protection',
      category: 'Legal',
      description: 'Strict consumer confidentiality standards, CRM data security practices, and privacy commitments.',
      badge: 'Compliance'
    },
    {
      path: '/terms-of-service',
      title: 'Terms of Service & Platform Usage',
      category: 'Legal',
      description: 'Website usage guidelines, intellectual property notices, and disclaimer of automated estimates.',
      badge: 'Compliance'
    },
    {
      path: '/fair-housing-disclosure',
      title: 'Fair Housing & Equal Opportunity Disclosure',
      category: 'Legal',
      description: 'Full adherence to the Federal Fair Housing Act, NAR Code of Ethics, and Oklahoma Real Estate Commission standards.',
      badge: 'Equal Opportunity'
    }
  ], []);

  // Filtered entries
  const filteredEntries = useMemo(() => {
    return ALL_SITEMAP_ENTRIES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Core' && item.category === 'Core') ||
        (selectedCategory === 'Services' && item.category === 'Service') ||
        (selectedCategory === 'Communities' && item.category === 'Community') ||
        (selectedCategory === 'Standards' && item.category === 'Standard') ||
        (selectedCategory === 'Audience' && item.category === 'Audience') ||
        (selectedCategory === 'Resources & Legal' && (item.category === 'Resource' || item.category === 'Legal'));

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.path.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query)) ||
        (item.stat && item.stat.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [ALL_SITEMAP_ENTRIES, selectedCategory, searchQuery]);

  // Grouped entries for directory view
  const categoriesList = ['All', 'Core', 'Services', 'Communities', 'Standards', 'Audience', 'Resources & Legal'];

  const handleCopyAllUrls = () => {
    const urlsText = ALL_SITEMAP_ENTRIES.map(
      (item) => `https://jamisonrealestateokc.com${item.path}`
    ).join('\n');
    navigator.clipboard.writeText(urlsText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <article className="w-full min-h-screen bg-[#FAF9F6] text-[#002D61] pt-24 sm:pt-28 pb-20 selection:bg-[#EA580C]/20 selection:text-[#002D61]">
      {/* Top Breadcrumb & Header Banner */}
      <div className="w-full bg-[#001D40] text-white py-14 sm:py-20 border-b-4 border-[#EA580C] relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#EA580C]/20 blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#FB923C] text-[11px] font-bold tracking-widest uppercase mb-4">
                <Compass className="w-3.5 h-3.5" />
                <span>Complete Platform Directory & Search Index</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                Sitemap & Platform Architecture
              </h1>
              <p className="font-sans text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
                Explore all {ALL_SITEMAP_ENTRIES.length} dedicated pages covering our 6-Phase Seller Blueprint, 21 Oklahoma City metropolitan community guides, proprietary marketing standards, and real estate resources.
              </p>
            </div>

            {/* Quick Stats Badges & XML Link */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold tracking-wide transition-all cursor-pointer"
                title="View canonical XML format for search engines"
              >
                <FileCode className="w-4 h-4 text-[#FB923C]" />
                <span>View XML Sitemap (sitemap.xml)</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-300" />
              </a>

              <button
                type="button"
                onClick={handleCopyAllUrls}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer"
              >
                {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAll ? 'Copied 60+ URLs!' : 'Copy All URLs'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/15">
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">
                {ALL_SITEMAP_ENTRIES.length}+
              </span>
              <span className="text-[11px] tracking-widest uppercase text-stone-300 font-sans font-bold">
                Indexed Pages
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FB923C] block">
                21
              </span>
              <span className="text-[11px] tracking-widest uppercase text-stone-300 font-sans font-bold">
                OKC Metro Enclaves
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">
                6 Phases
              </span>
              <span className="text-[11px] tracking-widest uppercase text-stone-300 font-sans font-bold">
                Seller Blueprint
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 block">
                100%
              </span>
              <span className="text-[11px] tracking-widest uppercase text-stone-300 font-sans font-bold">
                Cancel-Anytime Pledge
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Directory Section */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        {/* Search & Category Filter Controls */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 sm:p-7 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#9CA3AF] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all pages by title, keyword, enclave, phase, or standard..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E5E0D8] bg-[#FAF9F6] text-[#002D61] text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-[#EA580C]/20 transition-all font-sans font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6B7280] hover:text-[#002D61] px-2 py-1 rounded bg-[#E5E0D8]/60 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Results Counter */}
            <div className="flex items-center gap-2 text-xs text-[#6B7280] font-sans font-medium shrink-0">
              <span className="font-bold text-[#002D61]">{filteredEntries.length}</span>
              <span>of {ALL_SITEMAP_ENTRIES.length} pages matched</span>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mr-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#EA580C]" />
              Filter:
            </span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#002D61] text-white shadow-xs'
                    : 'bg-[#FAF9F6] text-[#4B5563] hover:text-[#002D61] hover:bg-[#EFECE6] border border-[#E5E0D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid of Pages */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E0D8] p-8">
            <Compass className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-[#002D61] mb-1">
              No matching pages found
            </h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Try adjusting your search terms or selecting &quot;All&quot; from the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 rounded-full bg-[#002D61] text-white text-xs font-bold uppercase tracking-wide cursor-pointer hover:bg-[#001D40]"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntries.map((item) => (
              <div
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className="group p-6 rounded-2xl bg-white border border-[#E5E0D8] hover:border-[#EA580C]/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        item.category === 'Core'
                          ? 'bg-[#002D61]/10 text-[#002D61]'
                          : item.category === 'Service'
                          ? 'bg-[#EA580C]/10 text-[#EA580C]'
                          : item.category === 'Community'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.category === 'Standard'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-stone-100 text-[#4B5563]'
                      }`}
                    >
                      {item.badge || item.category}
                    </span>

                    {item.stat && (
                      <span className="font-mono text-xs font-bold text-[#002D61] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E5E0D8]">
                        {item.stat}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#002D61] group-hover:text-[#EA580C] transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#6B7280] leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5E0D8]/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#9CA3AF] group-hover:text-[#002D61] transition-colors truncate max-w-[200px]">
                    {item.path}
                  </span>

                  <span className="text-xs font-bold text-[#EA580C] group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                    <span>Visit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Fast-Action Callout */}
        <div className="mt-16 rounded-2xl bg-[#001D40] text-white p-8 sm:p-10 border border-white/15 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <JamisonLogo size={64} className="shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-sans font-bold tracking-widest text-[#FB923C] block mb-1">
                Fiduciary Real Estate Advisory
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Looking for a Specific Oklahoma Property or Custom Strategy?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                Brian Jamison provides confidential consultations and custom 3-tier comparative market appraisals across all 21 metro communities.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onOpenValuation()}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#001D40] hover:bg-stone-100 text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer text-center"
            >
              Get Free Valuation
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <span>Schedule Call with Brian</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Structured Data: SiteNavigationElement Schema for SEO Domination */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Jamison Real Estate Platform Sitemap & Enclave Architecture',
              description: 'Index of all 58+ dedicated luxury real estate, community guides, and seller blueprint pages for Oklahoma City, Edmond, and Nichols Hills.',
              numberOfItems: ALL_SITEMAP_ENTRIES.length,
              itemListElement: ALL_SITEMAP_ENTRIES.map((entry, idx) => ({
                '@type': 'SiteNavigationElement',
                position: idx + 1,
                name: entry.title,
                url: `https://jamisonrealestateokc.com${entry.path}`,
                description: entry.description
              }))
            })
          }}
        />
      </div>
    </article>
  );
};
