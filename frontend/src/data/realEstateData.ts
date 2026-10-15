export interface Property {
  id: string;
  title: string;
  subdivision: string;
  city: string;
  price: number;
  formattedPrice: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: 'Closed' | 'Under Contract' | 'Active';
  badgeText: string;
  daysOnMarket: number;
  description: string;
  features: string[];
  exteriorImage: string;
  interiorImages: string[];
  matterportAvailable: boolean;
}

export interface Chapter {
  id: string;
  index: string;
  tag: string;
  title: string;
  summary: string;
  bulletPoints: string[];
  metrics: { label: string; value: string };
  ctaText: string;
  bgGradient: string;
}

export interface PhaseDeliverable {
  id: string;
  number: string;
  title: string;
  summary: string;
  keyDeliverables: string[];
  tacticalImpact: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  authorBadge?: string;
  rating: number;
  review: string;
  date: string;
  initials: string;
  bgColor: string;
  isLocalGuide: boolean;
  reviewCountText: string;
  verifiedCategory: 'Seller' | 'Buyer' | 'Investor' | 'Repeat Client';
  highlight: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
  location: string;
  detail: string;
  badge?: string;
  isGoogleReview?: boolean;
}

export interface MicroMarket {
  id: string;
  name: string;
  category: 'luxury' | 'north' | 'west-south';
  medianPrice: string;
  avgDom: string;
  schoolRating: string;
  lifestyle: string;
  keySubdivisions: string[];
  overview: string;
  image: string;
  highlightBadge?: string;
}

export const BRIAN_HEADSHOT_IMG = "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlcPhzgBsJAUqNniVDY3J_2aBktpM3n1qCn01xoXaqdAtfSXekbaT3K4-Ppg_hImsbuLLP3hgN0pDKze8jksH4z0qd_Mix4edrzihEGAwQqgChB2q2Iic9S3gm28B1zeP8D85ZPBBFD8E6o=s1360-w1360-h1020-rw";

export const BROKER_INFO = {
  name: "Brian Jamison",
  title: "Top 2% Real Estate Producer",
  license: "License #184931",
  headshot: BRIAN_HEADSHOT_IMG,
  brokerage: "Jamison Real Estate · Brokered by Salt Real Estate",
  firmName: "Jamison Real Estate",
  address: "1508 W. Edmond Rd., Edmond, Oklahoma 73003",
  phone: "(405) 513-3039",
  phoneRaw: "+14055133039",
  email: "BJamison@Salt.RealEstate",
  stats: {
    volumeSold: "$70M+",
    volumeNumber: 70,
    closings: "370+",
    closingsNumber: 370,
    producerRank: "Top 2%",
    guarantee: "100%",
    yearsExperience: "6+ Years",
  },
  socialLinks: {
    zillow: "https://www.zillow.com/profile/Brianjamison4#reviews",
    linkedin: "https://www.linkedin.com/in/brian-jamison-okc",
    realtor: "https://www.realtor.com/realestateagents/603f285097175500126300c8",
    landsearch: "https://www.landsearch.com/agents/brian-jamison/496173",
    instagram: "https://www.instagram.com/brianjamisonokc/",
    facebook: "https://www.facebook.com/profile.php?id=100085437993627"
  }
};

export const CHAPTERS: Chapter[] = [
  {
    id: "home-buying",
    index: "01",
    tag: "01 / BUYER CONCIERGE & EQUITY ADVISORY",
    title: "Home Buying",
    summary: "Curated off-market inventory access, structural & inspection defense, and veteran negotiation protecting your equity across Edmond and Greater OKC.",
    bulletPoints: [
      "Exclusive access to coming-soon and unlisted pocket luxury inventory",
      "Rigorous architectural, foundation, and mechanical due diligence",
      "Winning offer structuring calibrated to prevail without overpaying"
    ],
    metrics: { label: "Client Price Advantage", value: "$24,500 Avg" },
    ctaText: "EXPLORE BUYING BLUEPRINT →",
    bgGradient: "from-stone-900/90 via-stone-900/70 to-stone-950/95"
  },
  {
    id: "home-selling",
    index: "02",
    tag: "02 / 6-STEP SELLING BLUEPRINT",
    title: "Home Selling",
    summary: "Our proprietary 6-step selling machine: cinema-grade 4K media, 350+ portal syndication, and disciplined negotiation engineered for record-setting bidding wars.",
    bulletPoints: [
      "Cinema-grade 4K video, FAA drone mapping, and Matterport 3D tours",
      "High-ROI pre-listing refresh and architectural staging guidance",
      "100% Risk-Free Cancel-Anytime Listing Guarantee backed by corporate office"
    ],
    metrics: { label: "List-to-Sale Ratio", value: "98.6%" },
    ctaText: "EXPLORE SELLING BLUEPRINT →",
    bgGradient: "from-neutral-900/90 via-neutral-900/75 to-stone-950/95"
  },
  {
    id: "land-buying-and-selling",
    index: "03",
    tag: "03 / ACREAGE & DEVELOPMENT ENCLAVES",
    title: "Land Buying and selling",
    summary: "Comprehensive parcel boundary mapping, utility & soil feasibility audits, and strategic marketing for custom home lots, residential developments, and Oklahoma acreage.",
    bulletPoints: [
      "Topographical drone surveys, aerial boundary overlays, and soil tests",
      "Zoning, utility easement, and municipal permitting feasibility audits",
      "Targeted marketing reaching custom home builders, developers, and estate buyers"
    ],
    metrics: { label: "Acreage Transacted", value: "1,450+ Acres" },
    ctaText: "EXPLORE LAND ADVISORY →",
    bgGradient: "from-slate-900/90 via-stone-900/75 to-neutral-950/95"
  }
];

export const MAJOR_SERVICES = CHAPTERS;

export const METHOD_PHASES: PhaseDeliverable[] = [
  {
    id: "phase-1",
    number: "01",
    title: "High-End Media & Targeted Exposure Engine",
    summary: "Every listing gets a comprehensive marketing campaign built to put your home in front of every qualified buyer through cinematic 4K video, professional HDR photography, and 350+ portal syndication.",
    tacticalImpact: "Surpasses standard MLS listings to command premium buyer emotional investment and multiple offers.",
    keyDeliverables: [
      "Professional Architectural HDR Photography (Natural Light & Golden Hour)",
      "Bespoke 4K Video Walkthrough (With Audio Score)",
      "HD Drone Flyovers & Lot Boundary Mapping",
      "350+ Global Portal Syndication (Zillow, Realtor, Redfin, Luxury MLS)",
      "Dedicated Single-Property Website URL",
      "Hyper-Targeted Digital Retargeting Ads to Active Local & Relocating Buyers",
      "Tailored Marketing Collateral & Targeted Buyer Outreach"
    ]
  },
  {
    id: "phase-2",
    number: "02",
    title: "Proactive & Transparent Communication",
    summary: "Zero guesswork. You receive mandatory telephone showing feedback within 2 hours and plain-English contract debriefs.",
    tacticalImpact: "Eliminates seller anxiety with real-time insight into buyer objections and pricing elasticity.",
    keyDeliverables: [
      "100% Showing Feedback Policy (Call to showing agent within 2 hrs)",
      "Downtown & Metro Market Intelligence Sharing",
      "Plain-English Contract, Inspection & Title Translation",
      "Weekly Milestone Performance Dashboard",
      "Strategic & Firm Negotiation Protecting Maximum Net Proceeds"
    ]
  },
  {
    id: "phase-3",
    number: "03",
    title: "24/7 Accessibility & Zero-Lead Lag",
    summary: "High-value buyers and out-of-state transferees don't keep 9-to-5 banking hours. Brian and his team are reachable 7 days a week.",
    tacticalImpact: "Prevents lost buyers due to delayed agent responses or missed weekend showing windows.",
    keyDeliverables: [
      "7-Day-a-Week Direct Reachability (Mornings, Evenings & Weekends)",
      "Instant Inbound Lead Response Guarantee (<15 minute turnaround)",
      "Redundant Backup Coverage with Dedicated Jamison Real Estate Associates",
      "Direct Private Cell Access for Every Client"
    ]
  },
  {
    id: "phase-4",
    number: "04",
    title: "The 7-Person Specialized Support Network",
    summary: "Solo agents get overwhelmed by logistics. Brian deploys a dedicated specialized division for every phase of your transaction.",
    tacticalImpact: "Guarantees zero dropped deadlines, contract perfection, and five-star client concierge support.",
    keyDeliverables: [
      "Dedicated Personal Executive Assistant",
      "Certified Transaction Coordinator (Escrow, Title, Disclosures)",
      "Professional Staging & Space Optimization Consultant",
      "Listing Operations & MLS Data Feed Specialist",
      "Creative Media Graphic Designers & Copywriters",
      "FAA-Part 107 Drone Pilots & HDR Photographers",
      "Post-Close Escrow Reconciliation & Concierge"
    ]
  },
  {
    id: "phase-5",
    number: "05",
    title: "Data-Driven & Buyer-Minded Pricing Architecture",
    summary: "We don't guess. We analyze hyper-local absorption velocity, pending sales, and psychological search brackets.",
    tacticalImpact: "Prevents underpricing while avoiding the deadly trap of overpricing that causes listings to go stale.",
    keyDeliverables: [
      "Real-Time Local Absorption & Days-on-Market Analytics",
      "Comparative Market Analysis (CMA) Including Adjacent Land Comps",
      "3-Tier Pricing Model: Conservative, Target, and Aspirational",
      "Search-Bracket Calibration Engineered to Trigger Bidding Wars"
    ]
  },
  {
    id: "phase-6",
    number: "06",
    title: "Zero-Risk Partnership & Cancel-Anytime Pledge",
    summary: "Complete financial alignment. If Brian Jamison fails to deliver on every written promise, fire him at any time with zero penalty.",
    tacticalImpact: "Full risk reversal. You retain total control of your listing from day one to the closing table.",
    keyDeliverables: [
      "100% Risk-Free Cancel-Anytime Listing Agreement",
      "Zero Termination Fees, Zero Cancellation Penalties",
      "No Long-Term Trapping Clauses",
      "Total Performance Accountability Guaranteed in Writing"
    ]
  }
];

export const PROPERTIES: Property[] = [
  {
    id: "norman-two-time-sale",
    title: "Norman Residential Home (2-Time Sale)",
    subdivision: "University Enclave / West Norman",
    city: "Norman",
    price: 425000,
    formattedPrice: "$425,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2840,
    status: "Closed",
    badgeText: "SOLD TWICE (2022 & 2024) · OUT-OF-STATE SELLER",
    daysOnMarket: 8,
    description: "Successfully prepared, marketed, and closed not just once, but TWICE for an out-of-state homeowner. Full remote listing preparation, coordinate trades, and seamless closing without the sellers having to travel back to Oklahoma.",
    features: ["Remote Seller Concierge", "Trade Fix-Up Prep", "Norman West Corridor", "Multi-Offer Realization", "Rapid Escrow Closing"],
    exteriorImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: true
  },
  {
    id: "okc-mirk-residential",
    title: "Oklahoma City Metro Residential Home",
    subdivision: "Southwest OKC Enclave",
    city: "Oklahoma City",
    price: 160000,
    formattedPrice: "$160,000",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1420,
    status: "Closed",
    badgeText: "NOTABLE CLOSING · UNMATCHED AGENT DEDICATION",
    daysOnMarket: 12,
    description: "Proof that Brian Jamison works as hard for a $160K listing as agents do for $500K estates. Rapid response, relentless contract management, and constant client communication from listing day to final signature.",
    features: ["Full Marketing Campaign", "Relentless Communication", "Zero Lead Lag", "Quick Buyer Sourcing", "Smooth Title Closing"],
    exteriorImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: false
  },
  {
    id: "edmond-simpson-estate",
    title: "Edmond Residential Residence & Trade Prep",
    subdivision: "Covell Corridor / East Edmond",
    city: "Edmond",
    price: 475000,
    formattedPrice: "$475,000",
    bedrooms: 4,
    bathrooms: 3.5,
    sqft: 3150,
    status: "Closed",
    badgeText: "PRE-MARKET TRADE FIX-UPS · SEAMLESS SALE",
    daysOnMarket: 5,
    description: "Pre-listing preparation executed to perfection with Brian's vetted contact list of trades. From minor repairs and refresh to pricing strategy and multi-channel buyer reach, achieving a solid, top-dollar sale.",
    features: ["Pre-Listing Trade Coordination", "Edmond School District", "HDR Architectural Photography", "Competitive Price Bracket", "100% Showing Feedback"],
    exteriorImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: true
  },
  {
    id: "edmond-investment-renovation",
    title: "Edmond Residential Investment & Renovation",
    subdivision: "Central Edmond Enclave",
    city: "Edmond",
    price: 340000,
    formattedPrice: "$340,000",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2180,
    status: "Closed",
    badgeText: "FULL RENOVATION MANAGED · MAX PROFIT",
    daysOnMarket: 7,
    description: "Turnaround investment property where Brian handled the entire renovation from start to finish — coordinating contractors, managing detail work, and executing smart updates that maximized investor net profit.",
    features: ["Turnkey Remodel Management", "Contractor Coordination", "High-ROI Material Selection", "Fast Escrow Turnaround", "Maximum Net Return"],
    exteriorImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: false
  },
  {
    id: "okc-contingency-rescue",
    title: "Oklahoma City Contingency Rescue Sale",
    subdivision: "Northwest Oklahoma City",
    city: "Oklahoma City",
    price: 515000,
    formattedPrice: "$515,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3220,
    status: "Closed",
    badgeText: "CONTINGENCY RESCUE · SAVED IN 2023",
    daysOnMarket: 9,
    description: "Swooped in to save the day when a prior contingency deal fell apart with another agent. Brian immediately restructured the marketing campaign, sourced qualified back-up buyers, and closed without a hitch.",
    features: ["Contingency Recovery Strategy", "Aggressive Buyer Retargeting", "Firm Negotiation", "Zero Delay Escrow", "Protected Equity"],
    exteriorImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: true
  },
  {
    id: "edmond-first-time-buyer",
    title: "Edmond First-Time Buyer Family Residence",
    subdivision: "West Edmond / Deer Creek Area",
    city: "Edmond",
    price: 285000,
    formattedPrice: "$285,000",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1890,
    status: "Closed",
    badgeText: "UNDER CONTRACT IN 2 WEEKS · FIRST-TIME BUYER",
    daysOnMarket: 14,
    description: "Helped a first-time homebuyer family navigate anxiety, find their dream property in under 2 weeks, and negotiated favorable purchase terms that protected their family budget.",
    features: ["First-Time Buyer Advocacy", "Under Contract in 14 Days", "Inspection Repair Credits", "Low Stress Navigation", "Edmond Schools"],
    exteriorImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: false
  },
  {
    id: "grandview-estate",
    title: "The Grandview Estate",
    subdivision: "Nichols Hills",
    city: "Oklahoma City",
    price: 2745000,
    formattedPrice: "$2,745,000",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6840,
    status: "Closed",
    badgeText: "PRESTIGE CLOSING · 11 DAYS TO ESCROW",
    daysOnMarket: 11,
    description: "An architectural tour-de-force nestled in the heart of Nichols Hills. French limestone facades, 24-foot cathedral ceilings, chef's scullery kitchen, wine cellar, and resort-caliber pool pavilion.",
    features: ["Limestone Masonry", "Resort Pool & Spa", "4-Car Motor Court", "Sub-Zero & Wolf Suite", "Private Gated Grounds"],
    exteriorImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: true
  },
  {
    id: "oak-crest-horizon",
    title: "The Oak Crest Horizon",
    subdivision: "Gaillardia Golf Community",
    city: "Oklahoma City",
    price: 1850000,
    formattedPrice: "$1,850,000",
    bedrooms: 5,
    bathrooms: 5,
    sqft: 5200,
    status: "Closed",
    badgeText: "GAILLARDIA FAIRWAY RETREAT · SOLD",
    daysOnMarket: 14,
    description: "Fairway living inside OKC's preeminent 24/7 guard-gated golf country club. Panoramic 16th green views, iron-railed balconies, primary retreat with dual luxury dressing suites, and smart home automation.",
    features: ["Golf Course Frontage", "24/7 Guard Gated", "Smart Home Automation", "Commercial Scullery", "Covered Loggia"],
    exteriorImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    interiorImages: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80"
    ],
    matterportAvailable: true
  }
];

export const GOOGLE_REVIEWS_GMB_URL = "https://share.google/v0HUn7vLvE3vuU6gk";

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: "g-1",
    author: "Jazen Morgan",
    authorBadge: "Local Guide · 12 reviews",
    rating: 5,
    review: "Brian has been exceptional since the day we met at an open house. He kept in touch with us even though we didn’t end up purchasing that house. He was always responsive and made himself available to take us to see any house we asked about. Brian is knowledgeable, thorough, and exceeds the standard of being personable. Would recommend him to anyone looking to buy or sell. He will have your back and go above and beyond!",
    date: "Verified Google Review",
    initials: "JM",
    bgColor: "bg-blue-600",
    isLocalGuide: true,
    reviewCountText: "12 reviews",
    verifiedCategory: "Buyer",
    highlight: "Went above and beyond on every single home showing"
  },
  {
    id: "g-2",
    author: "Huiwen Lin",
    authorBadge: "9 reviews",
    rating: 5,
    review: "Brian did a fantastic job on selling our 2nd home in Norman, not just once, but TWICE. One in 2022, one in this year. Brian is very responsive, reliable, honest and acknowledgeable. Especially we live out of state. He helped us preparing the house for listing in every way possible. Thank you Brian, you are a super rock star!",
    date: "Verified Google Review",
    initials: "HL",
    bgColor: "bg-emerald-600",
    isLocalGuide: false,
    reviewCountText: "9 reviews",
    verifiedCategory: "Repeat Client",
    highlight: "Sold our Norman home TWICE while we lived out of state"
  },
  {
    id: "g-3",
    author: "Cindy Simpson",
    authorBadge: "2 reviews",
    rating: 5,
    review: "We are forever grateful to Brian for his work as our realtor. During a seamless process Brian demonstrated great professional knowledge and acumen to ensure a successful and solid sale. We highly recommend and commend his work to others.",
    date: "Verified Google Review",
    initials: "CS",
    bgColor: "bg-purple-600",
    isLocalGuide: false,
    reviewCountText: "2 reviews",
    verifiedCategory: "Seller",
    highlight: "Seamless process and acumen ensuring a solid sale"
  },
  {
    id: "g-4",
    author: "Shaun Mirk",
    authorBadge: "Local Guide · 163 reviews",
    rating: 5,
    review: "I've bought/sold a few houses, and had half a dozen agents, none hold a candle to Brian! He worked harder to sell my little $160k mobile home than most agents would work for on a $500k home. Very responsive, keeps the process moving, will always have your back. Highly recommend him for any real estate transaction.",
    date: "Verified Google Review",
    initials: "SM",
    bgColor: "bg-amber-600",
    isLocalGuide: true,
    reviewCountText: "163 reviews",
    verifiedCategory: "Seller",
    highlight: "Worked harder for my $160k home than most do on a $500k home"
  },
  {
    id: "g-5",
    author: "Wanderlusters",
    authorBadge: "Local Guide · 65 reviews",
    rating: 5,
    review: "Brian Jamison is, without question, the ONLY realtor I will ever use in the state of Oklahoma. We first had the privilege of meeting Brian when he swooped in to save the day on a home sale in 2023 after a contingency fell through. Brian stepped in, handled everything, and got it closed without a hitch.",
    date: "Verified Google Review",
    initials: "WL",
    bgColor: "bg-indigo-600",
    isLocalGuide: true,
    reviewCountText: "65 reviews",
    verifiedCategory: "Seller",
    highlight: "The ONLY realtor I will ever use in the state of Oklahoma"
  },
  {
    id: "g-6",
    author: "Kimberley Smith",
    authorBadge: "15 reviews",
    rating: 5,
    review: "Brian Jamison is the most and best realtor around. He is there for all your needs and will be with every step of the way. If you need anything call on Brian. He’s the only realtor I will ever use💜💜",
    date: "Verified Google Review",
    initials: "KS",
    bgColor: "bg-pink-600",
    isLocalGuide: false,
    reviewCountText: "15 reviews",
    verifiedCategory: "Buyer",
    highlight: "There for all your needs and with you every step of the way"
  },
  {
    id: "g-7",
    author: "Ronald Simpson",
    authorBadge: "14 reviews",
    rating: 5,
    review: "The entire process of preparing our house for sale, listing it, showing it, and closing on it was thoroughly professional with Brian. He had an amazing contact list of trades to help with fix-ups in preparation for listing (many of whom he coordinated directly). Very satisfied!",
    date: "Verified Google Review",
    initials: "RS",
    bgColor: "bg-teal-600",
    isLocalGuide: false,
    reviewCountText: "14 reviews",
    verifiedCategory: "Seller",
    highlight: "Amazing contact list of trades to help with listing fix-ups"
  },
  {
    id: "g-8",
    author: "Aaron Anderson",
    authorBadge: "3 reviews",
    rating: 5,
    review: "Brian helped my wife and I find a home within 2 weeks! It was a process as a first time buyer I was nervous and overwhelmed with but he made it easy and worked out a great deal for my family. S/O to Brian 🙌🏽",
    date: "Verified Google Review",
    initials: "AA",
    bgColor: "bg-cyan-600",
    isLocalGuide: false,
    reviewCountText: "3 reviews",
    verifiedCategory: "Buyer",
    highlight: "Helped find our home within 2 weeks as nervous first-time buyers"
  },
  {
    id: "g-9",
    author: "wendy ranlett",
    authorBadge: "Local Guide · 13 reviews",
    rating: 5,
    review: "If you a selling a home, you need Brian Jamison! Right from the start I could tell this would be a different experience from a previous realtor. He showed up on time, walked me through home improvements, did them himself or had people who could help. Fantastic results!",
    date: "Verified Google Review",
    initials: "WR",
    bgColor: "bg-rose-600",
    isLocalGuide: true,
    reviewCountText: "13 reviews",
    verifiedCategory: "Seller",
    highlight: "Showed up on time, walked me through improvements, fantastic results"
  },
  {
    id: "g-10",
    author: "Bryce Page",
    authorBadge: "Local Guide · 5 reviews",
    rating: 5,
    review: "I partnered with Brian Jamison on a residential investment property, and he exceeded every expectation. Brian handled the entire renovation from start to finish — coordinating contractors, managing the details, and making smart updates that maximized our profit.",
    date: "Verified Google Review",
    initials: "BP",
    bgColor: "bg-orange-600",
    isLocalGuide: true,
    reviewCountText: "5 reviews",
    verifiedCategory: "Investor",
    highlight: "Handled entire residential investment renovation from start to finish"
  },
  {
    id: "g-11",
    author: "Ken Billinger",
    authorBadge: "Verified Client",
    rating: 5,
    review: "He goes above and beyond and our outcome and experience was great.",
    date: "Verified Google Review",
    initials: "KB",
    bgColor: "bg-slate-700",
    isLocalGuide: false,
    reviewCountText: "Verified Review",
    verifiedCategory: "Seller",
    highlight: "Goes above and beyond — great outcome and experience"
  }
];

// Top 3 featured testimonials on homepage, drawn from real Google reviews
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-shaun",
    stars: 5,
    quote: "I've bought/sold a few houses, and had half a dozen agents, none hold a candle to Brian! He worked harder to sell my little $160k mobile home than most agents would work for on a $500k home. Very responsive, keeps the process moving, will always have your back.",
    author: "Shaun Mirk",
    location: "Verified Google Review · Local Guide (163 reviews)",
    detail: "Sold OKC residential home with same 100% dedication as luxury estates.",
    badge: "Local Guide · 163 Reviews",
    isGoogleReview: true
  },
  {
    id: "rev-huiwen",
    stars: 5,
    quote: "Brian did a fantastic job on selling our 2nd home in Norman, not just once, but TWICE. One in 2022, one in this year. Brian is very responsive, reliable, honest and acknowledgeable. Especially we live out of state. He helped us preparing the house for listing in every way possible. You are a super rock star!",
    author: "Huiwen Lin",
    location: "Verified Google Review · 2-Time Home Seller",
    detail: "Closed two separate Norman, OK home sales while living out of state.",
    badge: "Repeat Client · 9 Reviews",
    isGoogleReview: true
  },
  {
    id: "rev-wanderlusters",
    stars: 5,
    quote: "Brian Jamison is, without question, the ONLY realtor I will ever use in the state of Oklahoma. We first had the privilege of meeting Brian when he swooped in to save the day on a home sale in 2023 after a contingency fell through. Handled everything and got it closed without a hitch.",
    author: "Wanderlusters",
    location: "Verified Google Review · Local Guide (65 reviews)",
    detail: "Saved home sale after a contingency fell through in 2023.",
    badge: "Local Guide · 65 Reviews",
    isGoogleReview: true
  }
];

export const MICRO_MARKETS: MicroMarket[] = [
  // Luxury & Historic (7)
  {
    id: "nichols-hills",
    name: "Nichols Hills",
    category: "luxury",
    medianPrice: "$1,380,000",
    avgDom: "18 Days",
    schoolRating: "9/10 Private/Public",
    lifestyle: "The crown jewel of central Oklahoma luxury estates, mature tree canopy, and prestigious country club traditions.",
    keySubdivisions: ["Grandview", "Doran", "Nichols Hills Suburban", "Avondale"],
    overview: "Nichols Hills represents Oklahoma City's premier historic wealth enclave. Characterized by wide winding boulevards, 24/7 dedicated municipal police, and distinctive architectural pedigrees spanning classic English Tudor to modern limestone masterpieces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Crown Jewel Enclave"
  },
  {
    id: "heritage-hills",
    name: "Heritage Hills Historic",
    category: "luxury",
    medianPrice: "$895,000",
    avgDom: "24 Days",
    schoolRating: "8/10 Central Hub",
    lifestyle: "Grand early 20th-century mansions, historic preservation standards, and immediate proximity to Midtown.",
    keySubdivisions: ["Heritage Hills East", "Overholser District", "Harndale"],
    overview: "Oklahoma City's premier historic preservation district, showcasing magnificent turn-of-the-century architecture, sprawling carriage houses, and walking access to Midtown dining.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Historic Preservation"
  },
  {
    id: "gaillardia",
    name: "Gaillardia Golf Community",
    category: "luxury",
    medianPrice: "$1,650,000",
    avgDom: "29 Days",
    schoolRating: "9/10 Edmond/OKC",
    lifestyle: "24-hour guarded gate, Arthur Hills championship 18-hole golf, 55,000 sq ft French Normandy clubhouse.",
    keySubdivisions: ["The Reserve at Gaillardia", "Fairway Villas", "Enclave at Gaillardia"],
    overview: "Uncompromising security and resort living in northwest OKC. Featuring premier luxury estates along pristine fairways, lakes, and high-end privacy amenities.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "24/7 Guard-Gated Golf"
  },
  {
    id: "crown-heights",
    name: "Crown Heights",
    category: "luxury",
    medianPrice: "$575,000",
    avgDom: "12 Days",
    schoolRating: "8/10",
    lifestyle: "Charming stone cottages, Mediterranean revivals, and vibrant park culture along Western Avenue.",
    keySubdivisions: ["Crown Heights Historic", "Edgemere Park Adjacent"],
    overview: "Beloved urban enclave known for architectural diversity, deep front porches, annual neighborhood gatherings, and steps from gourmet dining on Western Ave.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Tudor & Mission Revivals"
  },
  {
    id: "the-village",
    name: "The Village",
    category: "luxury",
    medianPrice: "$345,000",
    avgDom: "9 Days",
    schoolRating: "8/10",
    lifestyle: "High-velocity mid-century homes, rapid luxury renovations, and immediate Lake Hefner access.",
    keySubdivisions: ["Village Central", "Lakeside Enclave", "Penn Square North"],
    overview: "Surrounded by Nichols Hills and Lake Hefner, The Village is one of OKC's fastest appreciating residential hubs with active buyer competition.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "High-Velocity Escrow"
  },
  {
    id: "downtown-midtown",
    name: "Downtown & Midtown OKC",
    category: "luxury",
    medianPrice: "$620,000",
    avgDom: "31 Days",
    schoolRating: "Urban Metropolitan",
    lifestyle: "High-rise luxury penthouses, historic brick townhomes, modern loft spaces, and Michelin-rated dining.",
    keySubdivisions: ["Automobile Alley Lofts", "Deep Deuce Condos", "Midtown Row"],
    overview: "The epicenter of Oklahoma City's cultural renaissance, streetcars, rooftop lounges, and prime executive live-work lifestyle.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Skyline Lofts & Penthouse"
  },
  {
    id: "quail-creek",
    name: "Quail Creek Golf Club",
    category: "luxury",
    medianPrice: "$540,000",
    avgDom: "16 Days",
    schoolRating: "8/10",
    lifestyle: "Sprawling golf course lots, classic mid-century modern lines, and active tennis & swim club.",
    keySubdivisions: ["Quail Creek Estates", "The Fairways at Quail Creek"],
    overview: "Established prestigious northwest OKC golf community offering generous lot sizes, mature oaks, and family country club amenities.",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Classic Golf Living"
  },

  // North Metro & Edmond (7)
  {
    id: "edmond-oakdale",
    name: "Edmond / Oakdale",
    category: "north",
    medianPrice: "$685,000",
    avgDom: "15 Days",
    schoolRating: "10/10 Gold Standard",
    lifestyle: "Nationally acclaimed public schools, rolling wooded topography, luxury acreage estates, and vibrant downtown rail district.",
    keySubdivisions: ["Coffee Creek", "Fairfax Golf", "Thornhill", "Woodlands"],
    overview: "Consistently ranked among the top suburbs in the nation. Edmond delivers exceptional safety, top tier schools, and thriving downtown retail culture.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "10/10 Schools Corridor"
  },
  {
    id: "deer-creek",
    name: "Deer Creek School District",
    category: "north",
    medianPrice: "$520,000",
    avgDom: "11 Days",
    schoolRating: "10/10 Academic Leader",
    lifestyle: "Premier destination for luxury new construction, young families, and high academic athletics.",
    keySubdivisions: ["Valencia", "Lone Oak", "Ironstone", "Belmont"],
    overview: "Northwest Edmond's premier high-growth school district, drawing high-income transferees seeking master-planned luxury communities.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Modern Custom Builds"
  },
  {
    id: "oak-tree",
    name: "Oak Tree Golf & Country Club",
    category: "north",
    medianPrice: "$1,150,000",
    avgDom: "22 Days",
    schoolRating: "10/10 Edmond",
    lifestyle: "Two Pete Dye championship 36-hole golf courses, PGA tour pedigree, 24-hr gated luxury living.",
    keySubdivisions: ["Oak Tree National", "Oak Tree Country Club Estates"],
    overview: "A legendary golf sanctuary hosting major championships, with sprawling custom stone estates, private tennis complex, and world-class dining.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "PGA Championship Greens"
  },
  {
    id: "arcadia-hiwassee",
    name: "Arcadia & Lake Hiwassee",
    category: "north",
    medianPrice: "$790,000",
    avgDom: "25 Days",
    schoolRating: "9/10 Oakdale / Edmond",
    lifestyle: "Equestrian acreage estates, Route 66 charm, water sports, and tranquil forested retreats.",
    keySubdivisions: ["Hiwassee Lake Estates", "Round Barn Acreages", "Arcadia Woods"],
    overview: "Where scenic country expanse meets luxury modern architecture. Expansive multi-acre estates just 15 minutes east of I-35.",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Lake & Equestrian Acreages"
  },
  {
    id: "guthrie-historic",
    name: "Guthrie Historic Enclave",
    category: "north",
    medianPrice: "$380,000",
    avgDom: "28 Days",
    schoolRating: "7/10 Historic District",
    lifestyle: "Territorial capital architecture, antique stores, sprawling country ranches, and equestrian tracts.",
    keySubdivisions: ["Guthrie Historic Townsite", "Cimarron River Ranches"],
    overview: "Historic charm, red-brick Victorian streets, film-production backdrops, and expansive private acreage properties.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Victorian & Wooded Tracts"
  },
  {
    id: "twin-bridges",
    name: "Twin Bridges & Covell Corridor",
    category: "north",
    medianPrice: "$625,000",
    avgDom: "14 Days",
    schoolRating: "10/10 Edmond",
    lifestyle: "Master-planned amenity pools, walking trails, clubhouse, and minutes from Covell retail centers.",
    keySubdivisions: ["Twin Bridges", "Covell Valley", "Montmartre"],
    overview: "A sought-after Edmond community combining neighborhood walkability, modern transitional architecture, and top school feeder routes.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Resort Pool & Trails"
  },
  {
    id: "rose-creek",
    name: "Rose Creek Golf Community",
    category: "north",
    medianPrice: "$920,000",
    avgDom: "19 Days",
    schoolRating: "9/10 Edmond / Deer Creek",
    lifestyle: "Guard-gated Arthur Hills 18-hole golf, aquatic park, clubhouse dining, and contemporary luxury design.",
    keySubdivisions: ["The Greens at Rose Creek", "The Island at Rose Creek"],
    overview: "Elite guard-gated golf haven with dynamic custom architecture, resort fitness facilities, and vibrant family amenities.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Guard-Gated Clubhouse"
  },

  // West & South Metro (7)
  {
    id: "yukon",
    name: "Yukon",
    category: "west-south",
    medianPrice: "$335,000",
    avgDom: "10 Days",
    schoolRating: "9/10",
    lifestyle: "Czech heritage, Czech Hall corridor growth, family sports complexes, and fast commute along I-40 and Kilpatrick Turnpike.",
    keySubdivisions: ["Surrey Hills", "Stone Mill", "River Mesa"],
    overview: "A thriving family-oriented city on OKC's west side, renowned for community pride, top athletics, and accessible luxury neighborhoods.",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Turnpike Transit & Schools"
  },
  {
    id: "mustang",
    name: "Mustang",
    category: "west-south",
    medianPrice: "$320,000",
    avgDom: "12 Days",
    schoolRating: "9/10",
    lifestyle: "Close-knit small town feel, rapid retail corridor expansion, and spacious half-acre lots.",
    keySubdivisions: ["Spitler Lake", "Hyde Park", "Wildwood"],
    overview: "Southwest metro favorite featuring exceptional school sports facilities, low taxes, and rapid new home development.",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Half-Acre Homesites"
  },
  {
    id: "norman-university",
    name: "Norman & University Enclave",
    category: "west-south",
    medianPrice: "$395,000",
    avgDom: "17 Days",
    schoolRating: "9/10 OU Research City",
    lifestyle: "Home to the University of Oklahoma, historic Chautauqua avenues, Lake Thunderbird, and SEC college game days.",
    keySubdivisions: ["Chautauqua Historic", "Brookhaven", "Hallbrooke"],
    overview: "A vibrant cultural and university center offering diverse housing from historic estates near campus to tranquil golf communities like Brookhaven.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "OU Campus & Brookhaven"
  },
  {
    id: "moore",
    name: "Moore",
    category: "west-south",
    medianPrice: "$285,000",
    avgDom: "13 Days",
    schoolRating: "8/10",
    lifestyle: "Family-first parks, central I-35 corridor access to Tinker AFB and Downtown, affordable quality builds.",
    keySubdivisions: ["Apple Valley", "Sendera Ranch", "Highland Village"],
    overview: "Conveniently located between OKC and Norman with premier municipal parks, state-of-the-art community recreation, and strong home equity growth.",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "High-Equity Parks Hub"
  },
  {
    id: "midwest-city-choctaw",
    name: "Midwest City & Choctaw",
    category: "west-south",
    medianPrice: "$310,000",
    avgDom: "15 Days",
    schoolRating: "8/10",
    lifestyle: "Proximity to Tinker Air Force Base aerospace hubs, rolling oak acreage, and quiet eastern country living.",
    keySubdivisions: ["Timber Ridge", "Woodland Hills Choctaw", "Forest Glen"],
    overview: "A mix of aerospace career convenience and scenic wooded acreages with lower density and spacious property envelopes.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Aerospace & Wooded Acreages"
  },
  {
    id: "blanchard-newcastle",
    name: "Blanchard & Newcastle",
    category: "west-south",
    medianPrice: "$360,000",
    avgDom: "18 Days",
    schoolRating: "8/10 Tri-City Hub",
    lifestyle: "Acreage properties with workshops, horses, scenic hill country vistas, and rapid bridge access to OKC.",
    keySubdivisions: ["Winter Creek Golf Ranches", "Newcastle Ridge", "Fox Lane Estates"],
    overview: "Fastest-growing rural-suburban corridors south of the Canadian River, celebrated for custom acreage homes and golf communities like Winter Creek.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "Hill Country Ranches"
  },
  {
    id: "piedmont",
    name: "Piedmont Rural Acreages",
    category: "west-south",
    medianPrice: "$415,000",
    avgDom: "14 Days",
    schoolRating: "9/10 Academic Focus",
    lifestyle: "Panoramic prairie sunsets, custom 1-to-5 acre homesites, top-rated school district, and serene quiet.",
    keySubdivisions: ["Buffalo Creek", "Manning Estates", "Olde Towne"],
    overview: "The preferred destination for families seeking spacious acreage living with modern custom estates while staying within easy reach of the Kilpatrick Turnpike.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    highlightBadge: "1-5 Acre Prairie Estates"
  }
];

export const SITEMAP_PAGES = [
  // Core Brand Pages
  { path: "/", title: "Home", category: "Core" },
  { path: "/about", title: "About Brian Jamison & Salt", category: "Core" },
  { path: "/seller-blueprint", title: "6-Step Seller Blueprint", category: "Core" },
  { path: "/listings", title: "Active & Featured Listings", category: "Core" },
  { path: "/past-sales", title: "$70M+ Past Sales Track Record", category: "Core" },
  { path: "/reviews", title: "Client Experiences & Reviews", category: "Core" },
  { path: "/home-valuation", title: "Confidential Market Appraisal", category: "Core" },
  { path: "/contact", title: "Contact Jamison Real Estate", category: "Core" },
  { path: "/sitemap", title: "Complete Platform Sitemap & Directory (58+ Pages)", category: "Core" },
  { path: "/idx-test", title: "IDX Broker MLS Quick Search Test", category: "Core" },

  // 3 Major Services
  { path: "/services/home-buying", title: "Major Service 1: Home Buying Advisory", category: "Service" },
  { path: "/services/home-selling", title: "Major Service 2: Home Selling Machine", category: "Service" },
  { path: "/services/land-buying-and-selling", title: "Major Service 3: Land Buying & Selling", category: "Service" },

  // Service Blueprint Phase Pages
  { path: "/services/elite-marketing", title: "Phase 1: Elite Marketing Engine", category: "Service" },
  { path: "/services/transparent-communication", title: "Phase 2: Transparent Communication", category: "Service" },
  { path: "/services/accessibility-guarantee", title: "Phase 3: 24/7 Accessibility", category: "Service" },
  { path: "/services/support-team", title: "Phase 4: 7-Person Specialized Team", category: "Service" },
  { path: "/services/precision-pricing", title: "Phase 5: Data-Driven Pricing", category: "Service" },
  { path: "/services/cancel-anytime-guarantee", title: "Phase 6: Cancel-Anytime Pledge", category: "Service" },

  // 10 Core Marketing & Seller Blueprint Standards
  { path: "/services/home-prep-guidance", title: "Standard 1: Home-Prep Guidance & Staging", category: "Standard" },
  { path: "/services/professional-photography", title: "Standard 2: Professional Architectural HDR Photography", category: "Standard" },
  { path: "/services/cinematic-video", title: "Standard 3: Cinema-Grade 4K Motion Walkthrough Film", category: "Standard" },
  { path: "/services/aerial-drone", title: "Standard 4: FAA Part-107 HD Aerial Drone Mapping", category: "Standard" },
  { path: "/services/matterport-3d", title: "Standard 5: Interactive Matterport Pro3 3D Virtual Tour", category: "Standard" },
  { path: "/services/global-portals", title: "Standard 6: Syndication to 350+ Global Luxury Feeds", category: "Standard" },
  { path: "/services/single-property-website", title: "Standard 7: Dedicated Single-Property Website", category: "Standard" },
  { path: "/services/social-advertising", title: "Standard 8: Hyper-Targeted Meta Paid Retargeting", category: "Standard" },
  { path: "/services/mls-refreshes", title: "Standard 9: Active MLS Algorithmic Tuning", category: "Standard" },
  { path: "/services/reverse-prospecting", title: "Standard 10: Reverse Prospecting & Matchmaking", category: "Standard" },

  // 21 Local SEO Metro Communities & Enclaves
  { path: "/areas", title: "Metropolitan Service Areas & 21 Community Hubs", category: "Community" },
  { path: "/areas/oklahoma-city", title: "Oklahoma City Luxury Real Estate & Historic Enclaves", category: "Community" },
  { path: "/areas/edmond", title: "Edmond Premier Estates & Family Enclaves", category: "Community" },
  { path: "/areas/nichols-hills", title: "Nichols Hills Crown Jewel Luxury Estates", category: "Community" },
  { path: "/areas/heritage-hills", title: "Heritage Hills Historic Preservation Enclaves", category: "Community" },
  { path: "/areas/gaillardia", title: "Gaillardia Guard-Gated Golf Community", category: "Community" },
  { path: "/areas/crown-heights", title: "Crown Heights Tudor & Mediterranean Revivals", category: "Community" },
  { path: "/areas/the-village", title: "The Village Mid-Century Enclaves", category: "Community" },
  { path: "/areas/downtown-midtown", title: "Downtown & Midtown OKC Condos & Urban Living", category: "Community" },
  { path: "/areas/quail-creek", title: "Quail Creek Golf & Country Club Estates", category: "Community" },
  { path: "/areas/edmond-oakdale", title: "Edmond Oakdale Luxury & Acreage Living", category: "Community" },
  { path: "/areas/deer-creek", title: "Deer Creek Top-Rated Academic Enclaves", category: "Community" },
  { path: "/areas/oak-tree", title: "Oak Tree Championship Golf Fairway Estates", category: "Community" },
  { path: "/areas/arcadia", title: "Arcadia & Lake Hiwassee Waterfront & Acreage", category: "Community" },
  { path: "/areas/guthrie", title: "Guthrie Historic Victorian & Prairie Estates", category: "Community" },
  { path: "/areas/twin-bridges", title: "Twin Bridges Gated Waterfront Community", category: "Community" },
  { path: "/areas/rose-creek", title: "Rose Creek Guard-Gated Golf & Country Club", category: "Community" },
  { path: "/areas/yukon", title: "Yukon Family Communities & New Builds", category: "Community" },
  { path: "/areas/mustang", title: "Mustang Fast-Growing Suburban Living", category: "Community" },
  { path: "/areas/norman", title: "Norman University & Cultural Enclaves", category: "Community" },
  { path: "/areas/moore", title: "Moore High-Demand Family Neighborhoods", category: "Community" },
  { path: "/areas/midwest-city", title: "Midwest City Aerospace Corridor Homes", category: "Community" },
  { path: "/areas/choctaw", title: "Choctaw Wooded Acreage & Custom Estates", category: "Community" },
  { path: "/areas/blanchard", title: "Blanchard Scenic Acreage & Equestrian Homes", category: "Community" },
  { path: "/areas/newcastle", title: "Newcastle Rapid Equity & Acreage Living", category: "Community" },
  { path: "/areas/piedmont", title: "Piedmont Prairie Estates & Rural Freedom", category: "Community" },

  // Audience & Intent Silos
  { path: "/sellers", title: "Sell for Top Dollar Roadmap", category: "Audience" },
  { path: "/expired-listings", title: "Expired Listing Turnaround Protocol", category: "Audience" },
  { path: "/first-time-buyers", title: "First-Time Homebuyer Blueprint", category: "Audience" },
  { path: "/luxury-buyers", title: "Luxury Buyer Concierge", category: "Audience" },
  { path: "/custom-builds", title: "Custom Builds & Spec Advisory", category: "Audience" },
  { path: "/fsbo", title: "For Sale By Owner Partnership", category: "Audience" },

  // Resources, Guides & Legal Compliance
  { path: "/resources/okc-relocation-guide", title: "OKC Relocation Guide", category: "Resource" },
  { path: "/resources/home-sellers-checklist", title: "Home Seller's Checklist (PDF)", category: "Resource" },
  { path: "/resources/mortgage-calculator", title: "Mortgage & Affordability Calculator", category: "Resource" },
  { path: "/resources/what-to-watch-out-for", title: "What to Watch Out For in OKC Real Estate", category: "Resource" },
  { path: "/faq", title: "Frequently Asked Questions", category: "Resource" },
  { path: "/privacy-policy", title: "Privacy Policy", category: "Legal" },
  { path: "/terms-of-service", title: "Terms of Service", category: "Legal" },
  { path: "/fair-housing-disclosure", title: "Fair Housing & Equal Opportunity", category: "Legal" }
];
