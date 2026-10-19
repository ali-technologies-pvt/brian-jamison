import { InteriorPageData } from './types';

// Curated architectural gallery
const DEFAULT_ARCHITECTURAL_GALLERY = [
  {
    url: "/media/gallery/modern-estate-pool-lawn.jpeg",
    caption: "Grand limestone façade with custom grounds and golden hour illumination.",
    tag: "Architecture"
  },
  {
    url: "/media/gallery/modern-kitchen.jpeg",
    caption: "Chef's gourmet kitchen with dual waterfall quartzite islands and Sub-Zero refrigeration.",
    tag: "Interiors"
  },
  {
    url: "/media/gallery/modern-staircase-dining.jpeg",
    caption: "Cathedral great room with floating staircase and limestone finishes.",
    tag: "Interiors"
  },
  {
    url: "/media/gallery/sunset-deck-pool.jpeg",
    caption: "Zero-edge heated swimming pool, travertine sundeck, and outdoor pavilion.",
    tag: "Grounds"
  },
  {
    url: "/media/gallery/sunset-window-terrace.jpeg",
    caption: "Primary retreat featuring panoramic window walls and private sunset terrace.",
    tag: "Details"
  },
  {
    url: "/media/gallery/midcentury-entry.jpeg",
    caption: "Bespoke architectural entry with natural wood cladding and ambient illumination.",
    tag: "Details"
  }
];

export interface CoreProcessNavItem {
  number: string;
  id: string;
  slug: string;
  title: string;
}

export const CORE_PROCESSES_NAV: CoreProcessNavItem[] = [
  {
    number: "1",
    id: "marketing-plan-and-process",
    slug: "/services/marketing-plan-and-process",
    title: "Marketing plan and process"
  },
  {
    number: "2",
    id: "communication",
    slug: "/services/communication",
    title: "Communication"
  },
  {
    number: "3",
    id: "accessibility",
    slug: "/services/accessibility",
    title: "Accessibility"
  },
  {
    number: "4",
    id: "team-support",
    slug: "/services/team-support",
    title: "Team support"
  },
  {
    number: "5",
    id: "pricing-strategy",
    slug: "/services/pricing-strategy",
    title: "Pricing strategy"
  },
  {
    number: "6",
    id: "fair-pricing-and-contract-flexibility",
    slug: "/services/fair-pricing-and-contract-flexibility",
    title: "Fair pricing and contract flexibility"
  }
];

/* =========================================================================
   PROCESS 01: MARKETING PLAN AND PROCESS (13 Sub-Processes)
   ========================================================================= */

export const PROCESS_ONE_DELIVERABLES = [
  {
    id: "home-prep-guidance",
    slug: "/services/home-prep-guidance",
    badge: "Step 1.1",
    title: "Home-prep guidance: first-impression review, refresh recommendations, and ROI-based update suggestions",
    desc: "Our architectural staging and advisory team conducts a comprehensive first-impression audit, identifying high-ROI refresh recommendations to maximize curb appeal before listing.",
    executionDetail: "Our team conducts a room-by-room review, pinpointing strategic cosmetic paint, designer lighting, and depersonalization updates so buyers fall in love on arrival.",
    sellerImpact: "Eliminates buyer hesitation and prevents lowball repair concessions, generating 3x more opening-weekend private showings.",
    image: "/media/gallery/modern-estate-pool-lawn.jpeg"
  },
  {
    id: "professional-photography",
    slug: "/services/professional-photography",
    badge: "Step 1.2",
    title: "Professional photography",
    desc: "Captured with natural ambient light and golden-hour lighting using specialized architectural wide-angle glass and multi-exposure HDR.",
    executionDetail: "Our architectural photographers balance interior ambient lighting with natural exterior light, preserving crystal-clear window views and natural architectural depth.",
    sellerImpact: "Over 95% of prospective buyers discover homes online; magazine-grade photography stops buyer scrolling instantly.",
    image: "/media/gallery/modern-kitchen.jpeg"
  },
  {
    id: "cinematic-video",
    slug: "/services/cinematic-video",
    badge: "Step 1.3",
    title: "Professional video with professional editing",
    desc: "Cinema-quality 4K walkthrough film featuring custom color grading, lifestyle pacing, and high-fidelity sound design highlighting room flow.",
    executionDetail: "Filmed on cinema-grade stabilizers by our dedicated videography crew, capturing the living cadence from entry foyer to outdoor entertaining loggias.",
    sellerImpact: "Creates deep emotional attachment before out-of-state or local buyers set foot inside, averaging 14,000+ targeted views.",
    image: "/media/gallery/modern-staircase-dining.jpeg"
  },
  {
    id: "aerial-drone",
    slug: "/services/aerial-drone",
    badge: "Step 1.4",
    title: "HD aerial/drone video",
    desc: "FAA Part-107 certified aerial cinematography capturing estate parcel boundaries, acreage, topography, and neighborhood amenities.",
    executionDetail: "High-altitude 4K drone sweeps showcase full property lines, outdoor living pavilions, mature tree canopies, and proximity to golf clubs or top schools.",
    sellerImpact: "Proves lot value and privacy buffers for high-net-worth buyers evaluating Oklahoma estates.",
    image: "/media/gallery/brian-closing-clients.jpeg"
  },
  {
    id: "global-portals",
    slug: "/services/global-portals",
    badge: "Step 1.5",
    title: "Syndication to 350+ websites (Zillow, Facebook, Instagram, etc.)",
    desc: "Automated distribution across 350+ digital portals including MLS feeds, Zillow Showcase, Realtor.com, Trulia, Redfin, and global luxury networks.",
    executionDetail: "Direct API feeds syndicate your listing to every major domestic and international portal with premium featured placement that prevents listing burial.",
    sellerImpact: "Guarantees 100% reach across every qualified homebuyer searching across Oklahoma or relocating nationally.",
    image: "/media/gallery/brian-jamison-skyline.jpeg"
  },
  {
    id: "single-property-website",
    slug: "/services/single-property-website",
    badge: "Step 1.6",
    title: "Dedicated single-property website",
    desc: "A custom vanity address domain built exclusively for your property, showcasing uncompressed media, floor plans, and interactive tours.",
    executionDetail: "We secure a vanity URL (e.g., 1234GrandviewBlvd.com) configured solely to highlight your home free of third-party ads or competitor agent popups.",
    sellerImpact: "Prospective buyers and their brokers are locked into your home's exclusive narrative without distraction.",
    image: "/media/gallery/brian-jamison-sunset.jpeg"
  },
  {
    id: "social-advertising",
    slug: "/services/social-advertising",
    badge: "Step 1.7",
    title: "Consistent social media exposure",
    desc: "Paid hyper-targeted social advertising campaigns deployed across Instagram and Facebook reaching active local and relocating buyers across the OKC metro.",
    executionDetail: "Precision demographic targeting focusing on high-net-worth professionals, corporate relocations, and active real estate investors.",
    sellerImpact: "Proactively places your home in front of qualified buyers who are not actively searching MLS feeds daily.",
    image: "/media/gallery/sunset-deck-pool.jpeg"
  },
  {
    id: "listing-refreshes",
    slug: "/services/listing-refreshes",
    badge: "Step 1.8",
    title: "Listing refreshes to keep it current",
    desc: "Algorithmic updates, photo reshuffles, and strategic headline adjustments that keep your property trending at the top of buyer searches.",
    executionDetail: "Our team audits daily search impression velocity, rotating showcase photography and refreshing metadata to prevent algorithmic decay.",
    sellerImpact: "Prevents the dreaded 'Days on Market' fatigue that causes buyers to assume a home is stale or overpriced.",
    image: "/media/gallery/sunset-window-terrace.jpeg"
  },
  {
    id: "reverse-prospecting",
    slug: "/services/reverse-prospecting",
    badge: "Step 1.9",
    title: "Reverse prospecting",
    desc: "Direct outreach to buyer agents who have qualified clients with saved searches matching your home's exact criteria across the MLS database.",
    executionDetail: "Our team pulls backend MLS analytics to pinpoint every broker with an active buyer searching in your price bracket, initiating direct phone pitches.",
    sellerImpact: "Creates private showings with pre-qualified buyers before competing properties even get noticed.",
    image: "/media/gallery/midcentury-entry.jpeg"
  },
  {
    id: "agent-networking",
    slug: "/services/agent-networking",
    badge: "Step 1.10",
    title: "Agent networking",
    desc: "Proactive telephone pitching and direct broker previews with top-producing real estate agents across the downtown and OKC metro markets.",
    executionDetail: "We host private broker open-house previews and maintain direct communication lines with the top 10% luxury producers across the region.",
    sellerImpact: "Mobilizes the brokerage community to champion your property to their pre-approved private clients.",
    image: "/media/gallery/infinity-pool-hills.jpeg"
  },
  {
    id: "full-time-engagement",
    slug: "/services/full-time-engagement",
    badge: "Step 1.11",
    title: "Full-time engagement on the listing",
    desc: "Daily active oversight by our team managing showings, tracking traffic analytics, and following up on every lead—never passive placement.",
    executionDetail: "Continuous campaign management, prompt lead qualification, and constant monitoring of competitor pricing adjustments in your micro-market.",
    sellerImpact: "Ensures every single lead is followed up with urgency to maintain high deal momentum.",
    image: "/media/gallery/hill-country-driveway.jpeg"
  },
  {
    id: "print-and-digital-marketing",
    slug: "/services/print-and-digital-marketing",
    badge: "Step 1.12",
    title: "Postcards, online and print flyers, print ads",
    desc: "High-gloss direct mail postcards sent to neighborhood homeowner spheres, luxury print collateral, and regional lifestyle publications.",
    executionDetail: "Bespoke print collateral designed by our in-house media team, paired with targeted saturation mailings to surrounding affluent zip codes.",
    sellerImpact: "Activates neighborhood word-of-mouth and alerts affluent locals who have family looking to move nearby.",
    image: "/media/properties/136-nw-18th-heritage-hills.jpeg"
  },
  {
    id: "matterport-tour",
    slug: "/services/matterport-tour",
    badge: "Step 1.13",
    title: "Matterport Tour",
    desc: "3D interactive dollhouse scan providing remote relocation buyers a 24/7 virtual walkthrough experience with spatial dimensions.",
    executionDetail: "Pro3 LiDAR camera capturing exact interior spatial measurements, interactive 3D dollhouse perspectives, and schematic floor plans.",
    sellerImpact: "Allows out-of-state corporate transferees and medical fellows to make confident offers sight-unseen.",
    image: "/media/properties/11500-gateshead.jpg"
  }
];

/* =========================================================================
   PROCESS 02: COMMUNICATION (5 Sub-Processes)
   ========================================================================= */

export const PROCESS_TWO_DELIVERABLES = [
  {
    id: "showing-feedback",
    slug: "/services/showing-feedback",
    badge: "Step 2.1",
    title: "Call every showing agent for feedback after every showing",
    desc: "Our mandatory policy requires a telephone call to every showing agent within 2 hours of access to extract candid buyer feedback.",
    executionDetail: "We conduct direct phone debriefs to discover buyer sentiment on pricing, architectural flow, and competitive alternatives.",
    sellerImpact: "Eliminates seller anxiety and provides real-time data to counter buyer objections before they stall a sale.",
    image: "/media/properties/3233-n-harvey-crown-heights.jpeg"
  },
  {
    id: "downtown-agent-collaboration",
    slug: "/services/downtown-agent-collaboration",
    badge: "Step 2.2",
    title: "Collaborate with other agents in the downtown market",
    desc: "Active intelligence sharing with downtown and metro market makers to gauge incoming buyer volume, off-market demand, and competitor pricing.",
    executionDetail: "Continuous synergy with active broker networks across Midtown, Downtown, Nichols Hills, and Edmond.",
    sellerImpact: "Positions your home as the top recommendation when fellow brokers have qualified buyers entering the market.",
    image: "/media/properties/616-nw-6th-downtown.jpeg"
  },
  {
    id: "contract-and-market-clarity",
    slug: "/services/contract-and-market-clarity",
    badge: "Step 2.3",
    title: "Explain market conditions, opportunities, contracts, terms, and disclosures",
    desc: "Clear, plain-English breakdowns of inspection reports, title disclosures, financing contingencies, and legal clauses so you make decisions with clarity.",
    executionDetail: "Every purchase agreement, counter-offer, and escrow addendum is explained in clear financial terms without confusing jargon.",
    sellerImpact: "Total confidence and legal protection at every milestone of the escrow closing process.",
    image: "/media/properties/22801-n-briarwood-edmond.jpeg"
  },
  {
    id: "milestone-updates",
    slug: "/services/milestone-updates",
    badge: "Step 2.4",
    title: "Detailed updates on showings, feedback, offers, inspections, and key documents",
    desc: "Comprehensive weekly reporting dashboards detailing digital traffic, showing notes, buyer objections, and verified contract milestone timelines.",
    executionDetail: "We compile real-time MLS impression stats, Zillow saves, and pending sales within your exact micro-market every Monday.",
    sellerImpact: "You never have to wonder what is happening; you have clear transparency and data at your fingertips.",
    image: "/media/properties/22402-emily-way-edmond.jpeg"
  },
  {
    id: "strategic-negotiation",
    slug: "/services/strategic-negotiation",
    badge: "Step 2.5",
    title: "Negotiation aimed at common ground and your desired outcome",
    desc: "Hard-nosed fiduciary advocacy protecting your bottom-line equity, pushing for non-refundable earnest deposits and minimal repair concessions.",
    executionDetail: "Strategic counter-offer calibration designed to achieve seller-favorable escrow timelines and maximum net proceeds.",
    sellerImpact: "Consistently nets our clients top-of-bracket financial outcomes with airtight contractual terms.",
    image: "/media/properties/3911-creek-bank-edmond.jpeg"
  }
];

/* =========================================================================
   PROCESS 03: ACCESSIBILITY (2 Sub-Processes)
   ========================================================================= */

export const PROCESS_THREE_DELIVERABLES = [
  {
    id: "weekend-and-evening-accessibility",
    slug: "/services/weekend-and-evening-accessibility",
    badge: "Step 3.1",
    title: "Reachable mornings, days, evenings, and weekends",
    desc: "Uninterrupted accessibility via phone, SMS, and email. High-intent luxury buyers tour during evenings and weekends—our team is always available.",
    executionDetail: "Our team operates 7 days a week, providing rapid response times on all incoming inquiries, showing bookings, and offer submissions.",
    sellerImpact: "Captures high-net-worth buyers who cannot tour during standard weekday business hours.",
    image: "/media/properties/11616-estrella-arcadia.jpeg"
  },
  {
    id: "redundant-backup-coverage",
    slug: "/services/redundant-backup-coverage",
    badge: "Step 3.2",
    title: "Backup coverage when your schedule is full",
    desc: "A licensed listing backup associate is always assigned to your property to escort VIP showings, accept urgent offers, and ensure zero lead lag.",
    executionDetail: "If our lead director is actively in a contract negotiation, our licensed team partner ensures zero incoming calls or tour requests go unanswered.",
    sellerImpact: "Zero missed opportunities. 100% listing coverage 365 days a year.",
    image: "/media/properties/9687-bear-creek-guthrie.jpeg"
  }
];

/* =========================================================================
   PROCESS 04: TEAM SUPPORT (7 Sub-Processes)
   ========================================================================= */

export const PROCESS_FOUR_DELIVERABLES = [
  {
    id: "personal-assistant-support",
    slug: "/services/personal-assistant-support",
    badge: "Step 4.1",
    title: "Personal assistant for scheduling, communication, and documentation",
    desc: "Dedicated client concierge managing showing appointments, calendar approvals, and immediate dispatch of listing documentation.",
    executionDetail: "Coordinates calendar bookings, lockbox codes, and private showing notifications so you never experience family disruption.",
    sellerImpact: "Ensures seamless communication and protects your family's schedule during peak showing windows.",
    image: "/media/properties/1817-sun-valley-edmond.jpeg"
  },
  {
    id: "transaction-coordinator",
    slug: "/services/transaction-coordinator",
    badge: "Step 4.2",
    title: "Transaction coordinator for documentation and compliance",
    desc: "Certified escrow coordinator supervising earnest deposits, title compliance, lender conditions, appraisal tracking, and closing paperwork.",
    executionDetail: "Audits contract timelines, title commitments, and mandatory Oklahoma Real Estate Commission disclosure paperwork.",
    sellerImpact: "Guarantees 100% legal compliance and eliminates closing day surprises.",
    image: "/media/properties/715-s-friendly-okc.jpeg"
  },
  {
    id: "staging-team",
    slug: "/services/staging-team",
    badge: "Step 4.3",
    title: "Staging team for decluttering and market prep",
    desc: "Hands-on staging specialists advising on furniture layout, spatial flow, artwork placement, and lighting optimization for maximum perceived value.",
    executionDetail: "In-person staging consultation ensuring light angles, furniture spacing, and luxury accents photograph impeccably.",
    sellerImpact: "Maximizes perceived square footage and creates emotional resonance for luxury buyers.",
    image: "/media/properties/534-w-chickasaw.jpg"
  },
  {
    id: "listing-operations-team",
    slug: "/services/listing-operations-team",
    badge: "Step 4.4",
    title: "Listing team for flyers, websites, print ads, and social marketing",
    desc: "Operations team managing MLS data accuracy, property domains, digital marketing pipelines, and syndication feeds.",
    executionDetail: "Coordinates MLS data feeds, single-property vanity websites, lockboxes, and syndication channels.",
    sellerImpact: "Guarantees data accuracy and rapid multi-platform launch speed.",
    image: "/media/properties/435-nw-21st-heritage-hills.jpeg"
  },
  {
    id: "design-team",
    slug: "/services/design-team",
    badge: "Step 4.5",
    title: "Design team for postcards and print/online flyers",
    desc: "Professional graphic design studio crafting bespoke glossy mailers, print brochures, and digital buyer presentation packages.",
    executionDetail: "Creates tailored print collateral, embossed property brochures, and high-impact digital social assets.",
    sellerImpact: "Elevates your home's brand prestige above competing area listings.",
    image: "/media/properties/13701-s-independence-okc.jpeg"
  },
  {
    id: "property-photographer",
    slug: "/services/property-photographer",
    badge: "Step 4.6",
    title: "Property photographer (photos and aerial)",
    desc: "FAA-certified drone pilots and architectural photographers equipped with specialized tilt-shift lenses and HDR lighting.",
    executionDetail: "Dedicated aerial pilots and photographers shooting sunset golden hours to produce pristine listing media.",
    sellerImpact: "Delivers magazine-cover caliber visual marketing without relying on generic subcontractors.",
    image: "/media/properties/85006-n-2520-watonga.jpeg"
  },
  {
    id: "marketing-team",
    slug: "/services/marketing-team",
    badge: "Step 4.7",
    title: "Marketing team for listing and post-close marketing",
    desc: "Strategic growth division orchestrating listing launch campaigns, private broker previews, and post-close tax and moving transitions.",
    executionDetail: "Manages digital retargeting campaigns, broker open-house events, and final escrow coordination.",
    sellerImpact: "Maintains high buyer urgency from listing launch through successful closing.",
    image: "/media/properties/2950-nw-37th-newcastle.jpeg"
  }
];

/* =========================================================================
   PROCESS 05: PRICING STRATEGY (5 Sub-Processes)
   ========================================================================= */

export const PROCESS_FIVE_DELIVERABLES = [
  {
    id: "local-market-update",
    slug: "/services/local-market-update",
    badge: "Step 5.1",
    title: "Local market update (downtown OKC trends, DOM, sale-to-list, inventory)",
    desc: "Real-time econometric analysis tracking inventory absorption, average days on market (DOM), and sale-to-list price ratios across downtown and metro OKC.",
    executionDetail: "Continuous tracking of active supply, pending escrows, and interest rate impacts in your immediate neighborhood enclave.",
    sellerImpact: "Provides clarity on market timing to launch your property when buyer demand is peaking.",
    image: "/media/gallery/modern-estate-pool-lawn.jpeg"
  },
  {
    id: "subject-property-valuation",
    slug: "/services/subject-property-valuation",
    badge: "Step 5.2",
    title: "Subject property valuation, including added value of an adjacent lot",
    desc: "Comprehensive comparative valuation including parcel boundaries, zoning potential, and added market appraisal value of adjacent land or lots.",
    executionDetail: "Forensic adjustment for premium lot views, acreage buffers, custom joinery, pool pavilions, and building potential.",
    sellerImpact: "Uncovers hidden equity and ensures unique land assets are never given away for free.",
    image: "/media/gallery/modern-kitchen.jpeg"
  },
  {
    id: "comparable-sales-analysis",
    slug: "/services/comparable-sales-analysis",
    badge: "Step 5.3",
    title: "Comparable sales analysis",
    desc: "Forensic comp analysis comparing recent closed transactions, pending escrows, and active competing inventory in your immediate micro-market.",
    executionDetail: "Detailed comp review analyzing sold price per square foot, concessions, and condition differences within the past 90 days.",
    sellerImpact: "Guarantees an airtight appraisal defense so buyers cannot negotiate price cuts during escrow.",
    image: "/media/gallery/modern-staircase-dining.jpeg"
  },
  {
    id: "tiered-pricing-recommendation",
    slug: "/services/tiered-pricing-recommendation",
    badge: "Step 5.4",
    title: "Tiered pricing recommendation (conservative / target / aspirational)",
    desc: "A 3-tier valuation model presenting Conservative (rapid liquidity), Target (peak comp appraisal), and Aspirational (surge premium testing).",
    executionDetail: "Outlines Conservative (swift cash exit), Target (accurate peak market value), and Aspirational (testing surge demand).",
    sellerImpact: "Gives you complete strategic clarity to choose the listing approach matching your financial timeline.",
    image: "/media/gallery/brian-closing-clients.jpeg"
  },
  {
    id: "buyer-minded-pricing",
    slug: "/services/buyer-minded-pricing",
    badge: "Step 5.5",
    title: "Buyer-minded pricing to drive competitive bidding",
    desc: "Psychological price positioning calibrated directly beneath search brackets to generate higher showing velocity and spark multiple competing bids.",
    executionDetail: "Positions list price just beneath major online search filters (e.g. $749,000 instead of $755,000) to trigger auto-email alerts to double the buyer pool.",
    sellerImpact: "Doubles buyer search notifications and triggers multi-offer tension during the critical opening 14 days.",
    image: "/media/gallery/brian-jamison-skyline.jpeg"
  }
];

/* =========================================================================
   PROCESS 06: FAIR PRICING AND CONTRACT FLEXIBILITY (2 Sub-Processes)
   ========================================================================= */

export const PROCESS_SIX_DELIVERABLES = [
  {
    id: "partnership-approach",
    slug: "/services/partnership-approach",
    badge: "Step 6.1",
    title: "Partnership approach focused on your most profitable outcome",
    desc: "Our compensation and advisory incentives are directly aligned with maximizing your net proceeds—not rushing a quick below-market sale.",
    executionDetail: "Our fiduciary incentives match your net return, ensuring firm negotiation that defends your equity at every turn.",
    sellerImpact: "We negotiate every dollar with the same vigilance as if it were our own equity.",
    image: "/media/gallery/brian-jamison-sunset.jpeg"
  },
  {
    id: "cancel-anytime-listing-agreement",
    slug: "/services/cancel-anytime-listing-agreement",
    badge: "Step 6.2",
    title: "Cancel-anytime listing agreement: if promises aren't met, fire us, no strings attached",
    desc: "If Brian Jamison fails to meet any contractual commitment, you hold the unconditional right to cancel the agreement immediately. Zero penalty, no fees, no hassle.",
    executionDetail: "A binding addendum explicitly stating that if you are not 100% satisfied with our marketing or communication, you may terminate immediately with $0.00 fee.",
    sellerImpact: "Zero risk, zero penalty, and total peace of mind throughout the listing experience.",
    image: "/media/gallery/sunset-deck-pool.jpeg"
  }
];

/* =========================================================================
   THE 6 MAIN DEDICATED PROCESS PAGES
   ========================================================================= */

export const MAIN_PROCESS_PAGES: Record<string, InteriorPageData> = {
  "marketing-plan-and-process": {
    id: "marketing-plan-and-process",
    slug: "/services/marketing-plan-and-process",
    category: "service",
    kicker: "PROCESS 01 OF 06 · EXPOSURE ENGINE",
    title: "Marketing plan and process",
    subtitle: "Every listing gets a full marketing campaign built to put your home in front of every qualified buyer and trigger competitive bidding.",
    heroVideoUrl: "/media/videos/vid2.mp4",
    heroFallbackImage: "/media/gallery/sunset-window-terrace.jpeg",
    heroMetrics: [
      { label: "Global Portals", value: "350+" },
      { label: "Video View Velocity", value: "14.2k Avg" },
      { label: "List-to-Sale Ratio", value: "98.4%" }
    ],
    overview: "In modern luxury real estate, buyers make emotional decisions within the first 8 seconds of seeing a home online. Jamison Real Estate deploys a comprehensive media production engine for every listing—transforming standard properties into high-demand lifestyle assets through professional cinematography, 3D spatial mapping, and hyper-targeted advertising.",
    keyTakeaways: [
      "Home-prep guidance: first-impression review, refresh recommendations, and ROI-based suggestions",
      "Architectural HDR photography captured with natural light and golden hour illumination",
      "Cinema-grade 4K motion walkthrough video with professional editing and sound design",
      "FAA Part-107 certified aerial drone video capturing grounds, acreage, and neighborhood amenities",
      "Automated syndication across 350+ domestic and international real estate portals",
      "Dedicated single-property website with custom vanity address domain",
      "Consistent paid Meta (Instagram & Facebook) advertising retargeting qualified pre-approved buyers",
      "Active MLS algorithmic refreshes and proactive reverse-prospecting direct to buyer brokers",
      "Interactive 24/7 Matterport 3D Dollhouse virtual open house for out-of-state transferees"
    ],
    deliverables: PROCESS_ONE_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "communication": {
    id: "communication",
    slug: "/services/communication",
    category: "service",
    kicker: "PROCESS 02 OF 06 · ZERO GUESSWORK",
    title: "Communication",
    subtitle: "Jamison Real Estate enforces transparent, timely, and disciplined communication so you retain total control throughout the transaction.",
    heroVideoUrl: "/media/videos/vid3.mp4",
    heroFallbackImage: "/media/gallery/midcentury-entry.jpeg",
    heroMetrics: [
      { label: "Showing Feedback", value: "< 2 Hours" },
      { label: "Weekly Intelligence", value: "Every Monday" },
      { label: "Contract Clarity", value: "100%" }
    ],
    overview: "The primary complaint homeowners have about traditional realtors is silence after the listing agreement is signed. Jamison Real Estate operates on a strict corporate communication protocol: mandatory phone calls after every showing, weekly analytical traffic dashboards, and plain-English contract debriefs.",
    keyTakeaways: [
      "Call every showing agent for feedback after every showing within 2 hours of access",
      "Collaborate with other agents in the downtown market to track incoming buyer volume",
      "Explain market conditions, opportunities, contracts, terms, and disclosures in plain English",
      "Detailed updates on showings, feedback, offers, inspections, and key documents every Monday",
      "Negotiation aimed at common ground and your desired outcome with fiduciary equity defense"
    ],
    deliverables: PROCESS_TWO_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "accessibility": {
    id: "accessibility",
    slug: "/services/accessibility",
    category: "service",
    kicker: "PROCESS 03 OF 06 · ZERO LEAD LAG",
    title: "Accessibility",
    subtitle: "Our agency maintains uninterrupted seven-day reachability with dedicated backup coverage so opportunities are never missed.",
    heroVideoUrl: "/media/videos/vid4.mp4",
    heroFallbackImage: "/media/gallery/infinity-pool-hills.jpeg",
    heroMetrics: [
      { label: "Days Reachable", value: "7 Days/Wk" },
      { label: "Lead Response Time", value: "< 15 Mins" },
      { label: "Backup Coverage", value: "Dual Desk" }
    ],
    overview: "High-value buyers, corporate transferees, and medical executives do not operate strictly during 9-to-5 banking hours. When a qualified family requests a private showing on a Sunday evening, every minute of delay increases the odds they purchase a competitor's listing. Our firm ensures continuous reachability and dedicated backup coverage.",
    keyTakeaways: [
      "Reachable mornings, days, evenings, and weekends via phone, SMS, and email",
      "Backup coverage when your schedule is full, ensuring VIP showings are never missed",
      "Sub-15-minute response time on all digital portal inquiries and yard sign calls",
      "Dedicated client concierge managing showing approvals without disrupting your schedule"
    ],
    deliverables: PROCESS_THREE_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "team-support": {
    id: "team-support",
    slug: "/services/team-support",
    category: "service",
    kicker: "PROCESS 04 OF 06 · SPECIALIZED FORCE",
    title: "Team support",
    subtitle: "Our firm operates a full specialized organizational matrix so every operational, legal, and creative detail is handled by an expert.",
    heroVideoUrl: "/media/videos/vid5.mp4",
    heroFallbackImage: "/media/gallery/hill-country-driveway.jpeg",
    heroMetrics: [
      { label: "Specialists Deployed", value: "7 Pros" },
      { label: "Contract Accuracy", value: "100%" },
      { label: "Closing On-Time", value: "99.1%" }
    ],
    overview: "Real estate transactions involve over 140 critical legal, financial, and marketing deadlines. Solo agents easily get overwhelmed by paperwork and phone tag. Jamison Real Estate backs your listing with dedicated specialists handling escrow compliance, staging advisory, graphic design, and media production.",
    keyTakeaways: [
      "Personal assistant for scheduling, communication, and documentation",
      "Certified transaction coordinator for title, escrow, and state regulatory compliance",
      "Staging team for decluttering, spatial sightlines, and market prep",
      "Listing operations team managing flyers, websites, print ads, and social marketing",
      "Design team for bespoke postcards, brochures, and print/online marketing collateral",
      "Property photographer and FAA-certified aerial drone pilots",
      "Marketing team for listing launch acceleration and post-close transitions"
    ],
    deliverables: PROCESS_FOUR_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "pricing-strategy": {
    id: "pricing-strategy",
    slug: "/services/pricing-strategy",
    category: "service",
    kicker: "PROCESS 05 OF 06 · DATA ARCHITECTURE",
    title: "Pricing strategy",
    subtitle: "Our pricing methodology is data-driven and buyer-minded, calculated to trigger multiple competing offers and maximize your net proceeds.",
    heroVideoUrl: "/media/videos/vid6.mp4",
    heroFallbackImage: "/media/properties/136-nw-18th-heritage-hills.jpeg",
    heroMetrics: [
      { label: "Avg Escrow Velocity", value: "11 Days" },
      { label: "Pricing Strategy", value: "3-Tier CMA" },
      { label: "List-to-Sale Ratio", value: "98.4%" }
    ],
    overview: "Overpricing leads to stigmatized listings and painful price cuts. Underpricing leaves tens of thousands of hard-earned equity on the table. Jamison Real Estate utilizes an econometric pricing framework calibrated beneath active buyer search thresholds to drive urgency and multi-offer tension.",
    keyTakeaways: [
      "Local market update covering downtown OKC trends, Days on Market (DOM), sale-to-list ratios, and inventory absorption",
      "Subject property valuation including added value of an adjacent lot or acreage buffer",
      "Forensic comparable sales analysis evaluating recent closed escrows within 90 days",
      "Tiered pricing recommendation: Conservative, Target, and Aspirational tiers",
      "Buyer-minded pricing calibrated beneath round search brackets to drive competitive bidding"
    ],
    deliverables: PROCESS_FIVE_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "fair-pricing-and-contract-flexibility": {
    id: "fair-pricing-and-contract-flexibility",
    slug: "/services/fair-pricing-and-contract-flexibility",
    category: "service",
    kicker: "PROCESS 06 OF 06 · ZERO RISK",
    title: "Fair pricing and contract flexibility",
    subtitle: "Our partnership model guarantees 100% mutual alignment with our unconditional Cancel-Anytime Pledge: if promises aren't met, fire us with zero penalty.",
    heroVideoUrl: "/media/videos/vid7.mp4",
    heroFallbackImage: "/media/properties/11500-gateshead.jpg",
    heroMetrics: [
      { label: "Cancellation Fee", value: "$0.00" },
      { label: "Seller Risk", value: "Zero" },
      { label: "Client Satisfaction", value: "100%" }
    ],
    overview: "Traditional brokerages trap sellers in 6-to-12 month contracts even when their service is substandard. Jamison Real Estate believes that trust must be earned through daily execution. If Brian Jamison fails to meet every written marketing, communication, and fiduciary commitment, you can fire us immediately. No penalty, no fees, no strings attached.",
    keyTakeaways: [
      "Partnership approach focused strictly on your most profitable net outcome",
      "Cancel-anytime listing agreement: if promises aren't met, fire us, no strings attached",
      "Zero termination penalties, zero administrative fees, and no media repayment charges",
      "Complete performance accountability backed by Jamison Real Estate"
    ],
    deliverables: PROCESS_SIX_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

/* =========================================================================
   DEDICATED SINGLE PAGES FOR EVERY INDIVIDUAL SUB-PROCESS (34 Pages)
   ========================================================================= */

export const SUB_PROCESS_PAGES: Record<string, InteriorPageData> = {
  // Process 1 Sub-processes
  "home-prep-guidance": {
    id: "home-prep-guidance",
    slug: "/services/home-prep-guidance",
    category: "service",
    kicker: "SUB-PROCESS 1.1 · MARKETING PLAN AND PROCESS",
    title: "Home-prep guidance: first-impression review, refresh recommendations, and ROI-based update suggestions",
    subtitle: "Room-by-room architectural review and decluttering roadmap to ensure your property captivates luxury buyers on arrival.",
    heroVideoUrl: "/media/videos/vid8.mp4",
    heroFallbackImage: "/media/properties/3233-n-harvey-crown-heights.jpeg",
    heroMetrics: [
      { label: "Prep ROI Avg", value: "385%" },
      { label: "Private Showings", value: "+300%" },
      { label: "Turnaround", value: "3-5 Days" }
    ],
    overview: "Before a single camera lens enters your home, our architectural staging and advisory team conducts a comprehensive first-impression audit. By identifying high-ROI cosmetic refresh recommendations, optimal lighting adjustments, and strategic decluttering, we elevate your home's perceived value before the first showing.",
    keyTakeaways: [
      "Room-by-room architectural punch list focusing on high-impact cosmetic updates",
      "Curb appeal, landscaping, and golden-hour architectural lighting audit",
      "Staging alignment with the pre-approved demographic in your price tier",
      "Coordination with pre-vetted trade craftsmen for prompt, professional execution"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "professional-photography": {
    id: "professional-photography",
    slug: "/services/professional-photography",
    category: "service",
    kicker: "SUB-PROCESS 1.2 · MARKETING PLAN AND PROCESS",
    title: "Professional photography",
    subtitle: "Magazine-grade golden-hour and natural-light architectural photography that captures emotional warmth and structural depth.",
    heroVideoUrl: "/media/videos/vid9.mp4",
    heroFallbackImage: "/media/properties/616-nw-6th-downtown.jpeg",
    heroMetrics: [
      { label: "Buyer First Look", value: "Online 95%" },
      { label: "Camera Resolution", value: "61MP HDR" },
      { label: "Photo Standard", value: "Magazine HDR" }
    ],
    overview: "Over 95% of prospective buyers encounter your listing online before deciding to book a private tour. Jamison Real Estate employs dedicated architectural photographers who shoot with wide-angle tilt-shift glass, natural ambient and golden-hour exposures, and custom hand-blended HDR processing.",
    keyTakeaways: [
      "Exterior golden-hour and natural daylight architectural illumination",
      "Interior exposures balanced with crystal-clear window view preservation",
      "Architectural wide-angle glass that prevents unnatural fish-eye distortion",
      "Color-calibrated post-production ensuring warm, natural stone and wood tones"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "cinematic-video": {
    id: "cinematic-video",
    slug: "/services/cinematic-video",
    category: "service",
    kicker: "SUB-PROCESS 1.3 · MARKETING PLAN AND PROCESS",
    title: "Professional video with professional editing",
    subtitle: "4K cinematic motion walkthrough capturing light, spatial scale, and living flow with custom sound design.",
    heroVideoUrl: "/media/videos/vid10.mp4",
    heroFallbackImage: "/media/properties/22801-n-briarwood-edmond.jpeg",
    heroMetrics: [
      { label: "View Velocity", value: "14.2k Avg" },
      { label: "Resolution", value: "4K 60fps" },
      { label: "Emotional Recall", value: "+84%" }
    ],
    overview: "Static photos alone do not convey the emotional cadence of an Oklahoma luxury estate. Our firm produces cinema-grade motion films filmed on high-precision stabilizers, calibrated with warm cinematic color grading, and scored to evoke lifestyle aspiration.",
    keyTakeaways: [
      "Cinema-grade gimbal stabilization capturing continuous fluid walkthroughs",
      "Professional color grading highlighting natural hardwood and stone richness",
      "Paced lifestyle editing showing seamless transitions from great room to pool loggia",
      "Dedicated social cuts optimized for Instagram Reels and YouTube 4K"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "aerial-drone": {
    id: "aerial-drone",
    slug: "/services/aerial-drone",
    category: "service",
    kicker: "SUB-PROCESS 1.4 · MARKETING PLAN AND PROCESS",
    title: "HD aerial/drone video",
    subtitle: "High-altitude 4K drone sweeps capturing property lot lines, roof condition, golf course proximity, and mature oak canopy.",
    heroVideoUrl: "/media/videos/vid11.mp4",
    heroFallbackImage: "/media/properties/22402-emily-way-edmond.jpeg",
    heroMetrics: [
      { label: "FAA Certified", value: "Part 107" },
      { label: "Elevation Sweep", value: "Up to 400ft" },
      { label: "Lot Perimeter", value: "100% Mapped" }
    ],
    overview: "Oklahoma estates are defined as much by their land, sunset vistas, and neighborhood enclaves as by their interior square footage. Our FAA-certified drone pilots document exact parcel boundaries, topography, and privacy buffers.",
    keyTakeaways: [
      "FAA Part-107 licensed and fully insured commercial drone flight operations",
      "Dynamic digital parcel line overlays showing full acreage and boundary markers",
      "Neighborhood context showing proximity to country clubs, lakes, and schools",
      "High-angle roof and architectural facade condition transparency"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "global-portals": {
    id: "global-portals",
    slug: "/services/global-portals",
    category: "service",
    kicker: "SUB-PROCESS 1.5 · MARKETING PLAN AND PROCESS",
    title: "Syndication to 350+ websites (Zillow, Facebook, Instagram, etc.)",
    subtitle: "Instant API syndication to Zillow Showcase, Realtor.com Featured, Redfin, MLSOK, and international luxury real estate feeds.",
    heroVideoUrl: "/media/videos/vid12.mp4",
    heroFallbackImage: "/media/properties/3911-creek-bank-edmond.jpeg",
    heroMetrics: [
      { label: "Syndicated Portals", value: "350+" },
      { label: "Global Reach", value: "48 Countries" },
      { label: "Search Indexing", value: "< 2 Hours" }
    ],
    overview: "A listing is only as potent as its distribution. Our firm ensures your home is automatically syndicated across 350+ domestic and international real estate portals, with enhanced featured status that prevents listing burial.",
    keyTakeaways: [
      "Instant API broadcast to Zillow, Realtor.com, Trulia, Redfin, and Homes.com",
      "Global luxury real estate portal syndication across Asia, Europe, and the Middle East",
      "High-priority visual placement ensuring your listing is not buried by competing agents",
      "Synchronized updates whenever pricing, photos, or open houses are modified"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "single-property-website": {
    id: "single-property-website",
    slug: "/services/single-property-website",
    category: "service",
    kicker: "SUB-PROCESS 1.6 · MARKETING PLAN AND PROCESS",
    title: "Dedicated single-property website",
    subtitle: "Custom address domain created exclusively for your listing—free of third-party ads or competitor agent popups.",
    heroVideoUrl: "/media/videos/vid13.mp4",
    heroFallbackImage: "/media/properties/11616-estrella-arcadia.jpeg",
    heroMetrics: [
      { label: "Dedicated URL", value: "100% Custom" },
      { label: "Competitor Ads", value: "Zero" },
      { label: "Page Load Speed", value: "< 1.2s" }
    ],
    overview: "We secure a custom web address (e.g. 1234GrandviewBlvd.com) configured solely to highlight your estate. Featuring edge-to-edge 4K video, high-resolution photo galleries, digital floor plans, and seller disclosures without competitor distractions.",
    keyTakeaways: [
      "Vanity URL matching your exact street address or estate name",
      "Edge-to-edge mobile-first responsive design engineered for rapid conversion",
      "Direct one-click private tour scheduling routing straight to our lead team",
      "Integrated floor plans, Matterport 3D embeds, and downloadable property brief PDF"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "social-advertising": {
    id: "social-advertising",
    slug: "/services/social-advertising",
    category: "service",
    kicker: "SUB-PROCESS 1.7 · MARKETING PLAN AND PROCESS",
    title: "Consistent social media exposure",
    subtitle: "Targeted paid campaigns reaching active pre-approved buyers, relocating families, and high-intent home shoppers across the OKC metropolitan area.",
    heroVideoUrl: "/media/videos/vid14.mp4",
    heroFallbackImage: "/media/properties/9687-bear-creek-guthrie.jpeg",
    heroMetrics: [
      { label: "Impressions Targeted", value: "25k-50k+" },
      { label: "Target Coverage", value: "OKC Metro" },
      { label: "Qualified Demographics", value: "Top 5% HNW" }
    ],
    overview: "Passive MLS entries miss the massive demographic of passive buyers—qualified individuals who are not browsing Zillow daily but will take action when the right home appears in their Instagram and Facebook feeds.",
    keyTakeaways: [
      "Precision demographic targeting focusing on high-income zip codes and executive profiles",
      "Dynamic retargeting showing secondary photo carousels to anyone who watched the walkthrough video",
      "Geo-fenced mobile ads deployed around prominent Oklahoma City private clubs and hospitals",
      "Transparent campaign performance reports showing exact clicks, saves, and inquiries"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "listing-refreshes": {
    id: "listing-refreshes",
    slug: "/services/listing-refreshes",
    category: "service",
    kicker: "SUB-PROCESS 1.8 · MARKETING PLAN AND PROCESS",
    title: "Listing refreshes to keep it current",
    subtitle: "Daily algorithmic adjustments to prevent listing stagnation in broker saved-searches and buyer portals.",
    heroVideoUrl: "/media/videos/vid15.mp4",
    heroFallbackImage: "/media/properties/1817-sun-valley-edmond.jpeg",
    heroMetrics: [
      { label: "Audit Frequency", value: "Daily" },
      { label: "Search Ranking", value: "Top Bracket" },
      { label: "Stagnation Index", value: "Zero" }
    ],
    overview: "When homes sit without strategic updates, MLS algorithms push them down search queues. Our firm actively rotates primary showcase photography, adjusts keyword tags, and refreshes listing metadata to maintain top-tier visibility.",
    keyTakeaways: [
      "Rotating hero photography between twilight exterior, kitchen island, and primary retreat",
      "Daily audit of search impression velocity and days-on-market metrics",
      "Algorithmic keyword optimization targeting active buyer search filters",
      "Re-triggering automated email alerts to active buyer agents across the metro"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "reverse-prospecting": {
    id: "reverse-prospecting",
    slug: "/services/reverse-prospecting",
    category: "service",
    kicker: "SUB-PROCESS 1.9 · MARKETING PLAN AND PROCESS",
    title: "Reverse prospecting",
    subtitle: "Proactive outreach to buyer agents with clients actively searching within your property's exact price and criteria.",
    heroVideoUrl: "/media/videos/vid16.mp4",
    heroFallbackImage: "/media/properties/715-s-friendly-okc.jpeg",
    heroMetrics: [
      { label: "Direct Phone Calls", value: "100% Proactive" },
      { label: "Broker Network", value: "Top 250 OKC" },
      { label: "Pre-Listing Showings", value: "Guaranteed" }
    ],
    overview: "Our team queries backend MLS buyer-agent matching engines daily, identifying which Oklahoma brokers have pre-approved buyers actively searching within your exact price bracket. We pick up the phone and personally pitch your listing.",
    keyTakeaways: [
      "Backend MLS agent database extraction identifying buyers with saved searches in your neighborhood",
      "Direct personal telephone outreach from our firm to top Oklahoma City luxury producing brokers",
      "Private broker open-house previews hosted before public weekend showings commence",
      "Proactive matchmaking that creates early competition before other listings get noticed"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "agent-networking": {
    id: "agent-networking",
    slug: "/services/agent-networking",
    category: "service",
    kicker: "SUB-PROCESS 1.10 · MARKETING PLAN AND PROCESS",
    title: "Agent networking",
    subtitle: "Direct telephone pitches and private broker preview gatherings with top luxury producers across Oklahoma.",
    heroVideoUrl: "/media/videos/vid17.mp4",
    heroFallbackImage: "/media/properties/534-w-chickasaw.jpg",
    heroMetrics: [
      { label: "Broker Reach", value: "Top 10% OKC" },
      { label: "Private Previews", value: "Exclusive" },
      { label: "Co-Broke Synergy", value: "Immediate" }
    ],
    overview: "Over 80% of luxury sales in Oklahoma involve cooperation between top-producing agents. Our firm maintains direct relationships with high-volume brokers, personally presenting your property to colleagues who represent active, qualified buyers.",
    keyTakeaways: [
      "Direct broker-to-broker phone presentations before public marketing launch",
      "Catered twilight broker preview receptions for elite area specialists",
      "Distribution to exclusive luxury agent networks and masterminds across the state"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "full-time-engagement": {
    id: "full-time-engagement",
    slug: "/services/full-time-engagement",
    category: "service",
    kicker: "SUB-PROCESS 1.11 · MARKETING PLAN AND PROCESS",
    title: "Full-time engagement on the listing",
    subtitle: "Continuous daily management monitoring inquiry velocity, buyer feedback, and competitive pricing adjustments.",
    heroVideoUrl: "/media/videos/vid18.mp4",
    heroFallbackImage: "/media/properties/435-nw-21st-heritage-hills.jpeg",
    heroMetrics: [
      { label: "Daily Oversight", value: "365 Days" },
      { label: "Inquiry Velocity", value: "Continuous" },
      { label: "Deal Momentum", value: "Priority" }
    ],
    overview: "We do not believe in passive listing management. Our firm conducts daily audits of your listing performance, follows up with past showing brokers, and actively adapts campaign parameters to keep your home at the forefront of the market.",
    keyTakeaways: [
      "Daily active oversight of incoming leads, showings, and portal impressions",
      "Constant monitoring of competing neighborhood listings and price changes",
      "Rapid response to changing buyer sentiment and market feedback"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "print-and-digital-marketing": {
    id: "print-and-digital-marketing",
    slug: "/services/print-and-digital-marketing",
    category: "service",
    kicker: "SUB-PROCESS 1.12 · MARKETING PLAN AND PROCESS",
    title: "Postcards, online and print flyers, print ads",
    subtitle: "High-gloss oversized direct mail postcards, bespoke architectural print brochures, and regional lifestyle placement.",
    heroVideoUrl: "/media/videos/vid19.mp4",
    heroFallbackImage: "/media/properties/13701-s-independence-okc.jpeg",
    heroMetrics: [
      { label: "Print Postcards", value: "Oversized Gloss" },
      { label: "Mailing Radius", value: "Top Affluent" },
      { label: "Digital Synergy", value: "QR Enabled" }
    ],
    overview: "While digital reaches global audiences, tactile luxury print captures affluent neighborhood residents who know friends, business partners, or family seeking to move nearby. Our design studio produces museum-grade print materials for your property.",
    keyTakeaways: [
      "Embossed, heavy cardstock property presentation portfolios for private tours",
      "Oversized direct-mail postcards delivered to top-income neighborhood households",
      "Interactive QR codes linking directly to the 4K walkthrough film and 3D scan"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "matterport-tour": {
    id: "matterport-tour",
    slug: "/services/matterport-tour",
    category: "service",
    kicker: "SUB-PROCESS 1.13 · MARKETING PLAN AND PROCESS",
    title: "Matterport Tour",
    subtitle: "Millimeter-accurate virtual dollhouse allowing 360-degree exploration for corporate transferees and out-of-state buyers.",
    heroVideoUrl: "/media/videos/vid20.mp4",
    heroFallbackImage: "/media/properties/85006-n-2520-watonga.jpeg",
    heroMetrics: [
      { label: "Spatial Accuracy", value: "99.8%" },
      { label: "Available Hours", value: "24/7 Global" },
      { label: "Out-of-State Cash", value: "+42%" }
    ],
    overview: "Serious executive transferees moving to Oklahoma City from major metro hubs need the ability to inspect floor plans, room dimensions, and ceiling clearances at 11:00 PM from across the country. Our 3D scans enable confident sight-unseen cash offers.",
    keyTakeaways: [
      "Pro3 LiDAR laser camera capturing exact interior spatial dimensions",
      "Interactive 3D Dollhouse and schematic floor plan view",
      "Digital measurement tool allowing buyers to verify furniture and artwork fits",
      "Embedded multimedia tags highlighting custom smart home and Sub-Zero appliances"
    ],
    parentProcess: {
      number: "1",
      title: "Marketing plan and process",
      slug: "/services/marketing-plan-and-process"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  // Process 2 Sub-processes
  "showing-feedback": {
    id: "showing-feedback",
    slug: "/services/showing-feedback",
    category: "service",
    kicker: "SUB-PROCESS 2.1 · COMMUNICATION",
    title: "Call every showing agent for feedback after every showing",
    subtitle: "Direct telephone debrief with every showing broker within 120 minutes of home access to extract candid buyer feedback.",
    heroVideoUrl: "/media/videos/vid21.mp4",
    heroFallbackImage: "/media/properties/2950-nw-37th-newcastle.jpeg",
    heroMetrics: [
      { label: "Debrief Speed", value: "< 2 Hours" },
      { label: "Compliance Rate", value: "100%" },
      { label: "Actionable Intel", value: "Immediate" }
    ],
    overview: "Automated email feedback forms receive low response rates and sanitized answers. Our team calls each showing agent personally, engaging in a peer-to-peer discussion to extract raw buyer impressions regarding price, layout, and offer probability.",
    keyTakeaways: [
      "Immediate personal phone call to every showing agent within 2 hours",
      "Unfiltered intelligence on buyer price perception and objections",
      "Strategic follow-up to convert hesitant buyers into formal written offers"
    ],
    parentProcess: {
      number: "2",
      title: "Communication",
      slug: "/services/communication"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "downtown-agent-collaboration": {
    id: "downtown-agent-collaboration",
    slug: "/services/downtown-agent-collaboration",
    category: "service",
    kicker: "SUB-PROCESS 2.2 · COMMUNICATION",
    title: "Collaborate with other agents in the downtown market",
    subtitle: "Active intelligence sharing with downtown and metro market makers to evaluate incoming buyer migration and competitor pricing.",
    heroVideoUrl: "/media/videos/vid22.mp4",
    heroFallbackImage: "/media/gallery/modern-estate-pool-lawn.jpeg",
    heroMetrics: [
      { label: "Market Synergy", value: "Daily" },
      { label: "Off-Market Intel", value: "Real-Time" },
      { label: "Downtown Hub", value: "Direct Link" }
    ],
    overview: "Downtown and urban core transactions move fast. Our ongoing dialogue with top agents across Downtown, Midtown, and surrounding historic enclaves gives our clients a distinct edge in anticipating demand waves and off-market buyer inquiries.",
    keyTakeaways: [
      "Daily communication with active agents in the urban core",
      "Early warning on competing listings before they hit the MLS",
      "Cross-promotional pitches to buyers seeking luxury urban properties"
    ],
    parentProcess: {
      number: "2",
      title: "Communication",
      slug: "/services/communication"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "contract-and-market-clarity": {
    id: "contract-and-market-clarity",
    slug: "/services/contract-and-market-clarity",
    category: "service",
    kicker: "SUB-PROCESS 2.3 · COMMUNICATION",
    title: "Explain market conditions, opportunities, contracts, terms, and disclosures",
    subtitle: "Clear, plain-English translations of complex purchase contracts, title disclosures, and inspection reports.",
    heroVideoUrl: "/media/videos/vid23.mp4",
    heroFallbackImage: "/media/gallery/modern-kitchen.jpeg",
    heroMetrics: [
      { label: "Contract Clarity", value: "100%" },
      { label: "Jargon Free", value: "Guaranteed" },
      { label: "Seller Shield", value: "Complete" }
    ],
    overview: "Real estate contracts are full of legal terminology that can feel overwhelming. Our firm breaks down every clause, deadline, and disclosure in straightforward financial terms so you understand your legal protections and obligations with complete clarity.",
    keyTakeaways: [
      "Detailed review of earnest money contingencies and default remedies",
      "Clear translation of title commitments and property survey findings",
      "Pragmatic cost evaluations for inspection repair requests"
    ],
    parentProcess: {
      number: "2",
      title: "Communication",
      slug: "/services/communication"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "milestone-updates": {
    id: "milestone-updates",
    slug: "/services/milestone-updates",
    category: "service",
    kicker: "SUB-PROCESS 2.4 · COMMUNICATION",
    title: "Detailed updates on showings, feedback, offers, inspections, and key documents",
    subtitle: "Structured Monday morning intelligence dashboards tracking online traffic, buyer sentiment, and escrow milestones.",
    heroVideoUrl: "/media/videos/vid24.mp4",
    heroFallbackImage: "/media/gallery/modern-staircase-dining.jpeg",
    heroMetrics: [
      { label: "Reporting Schedule", value: "Every Monday" },
      { label: "Analytics Depth", value: "Comprehensive" },
      { label: "Milestone Alerts", value: "Instant" }
    ],
    overview: "You will never have to ask what our firm is doing. Every Monday morning, you receive an analytical report compiling weekly showing volume, digital traffic analytics from 350+ portals, and updates on active escrow milestones.",
    keyTakeaways: [
      "Online view and save counts from Zillow, Realtor.com, and Meta campaigns",
      "Chronological log of all agent showings and synthesized feedback",
      "Escrow timeline tracking ensuring closing deadlines are met without delay"
    ],
    parentProcess: {
      number: "2",
      title: "Communication",
      slug: "/services/communication"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "strategic-negotiation": {
    id: "strategic-negotiation",
    slug: "/services/strategic-negotiation",
    category: "service",
    kicker: "SUB-PROCESS 2.5 · COMMUNICATION",
    title: "Negotiation aimed at common ground and your desired outcome",
    subtitle: "Hard-nosed fiduciary advocacy protecting your bottom-line equity while steering buyers toward common ground.",
    heroVideoUrl: "/media/videos/vid25.mp4",
    heroFallbackImage: "/media/gallery/brian-closing-clients.jpeg",
    heroMetrics: [
      { label: "Equity Defended", value: "100%" },
      { label: "Closing Ratio", value: "99.1%" },
      { label: "Net Proceeds", value: "Maximized" }
    ],
    overview: "Negotiation is not about aggression; it is about leverage and strategic precision. We negotiate firmly to defend your equity, secure substantial non-refundable earnest money, and structure terms that align perfectly with your move-out plans.",
    keyTakeaways: [
      "Rigorous pre-qualification of buyer financing before accepting offers",
      "Firm defense against unreasonable post-inspection repair credits",
      "Strategic counter-offering to foster multi-buyer competitive tension"
    ],
    parentProcess: {
      number: "2",
      title: "Communication",
      slug: "/services/communication"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  // Process 3 Sub-processes
  "weekend-and-evening-accessibility": {
    id: "weekend-and-evening-accessibility",
    slug: "/services/weekend-and-evening-accessibility",
    category: "service",
    kicker: "SUB-PROCESS 3.1 · ACCESSIBILITY",
    title: "Reachable mornings, days, evenings, and weekends",
    subtitle: "Seven-day direct phone, text, and email access so urgent buyer opportunities are acted upon immediately.",
    heroVideoUrl: "/media/videos/vid26.mp4",
    heroFallbackImage: "/media/gallery/brian-jamison-skyline.jpeg",
    heroMetrics: [
      { label: "Reachability", value: "7 Days/Wk" },
      { label: "Response Speed", value: "< 15 Mins" },
      { label: "Hours Active", value: "7am - 9pm" }
    ],
    overview: "Qualified corporate transferees and executives tour homes during evenings, Saturdays, and Sundays. Our team maintains constant accessibility so tour requests and incoming contract offers are processed with zero delay.",
    keyTakeaways: [
      "Direct cell and email access available seven days a week",
      "Sub-15-minute response on all incoming digital leads and showing requests",
      "Prompt handling of twilight and weekend private showings"
    ],
    parentProcess: {
      number: "3",
      title: "Accessibility",
      slug: "/services/accessibility"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "redundant-backup-coverage": {
    id: "redundant-backup-coverage",
    slug: "/services/redundant-backup-coverage",
    category: "service",
    kicker: "SUB-PROCESS 3.2 · ACCESSIBILITY",
    title: "Backup coverage when your schedule is full",
    subtitle: "A licensed listing backup associate is assigned to your property to ensure zero lead lag and complete continuity.",
    heroVideoUrl: "/media/videos/vid27.mp4",
    heroFallbackImage: "/media/gallery/brian-jamison-sunset.jpeg",
    heroMetrics: [
      { label: "Backup Coverage", value: "Licensed Associate" },
      { label: "Lead Lag", value: "Zero" },
      { label: "Annual Continuity", value: "365 Days" }
    ],
    overview: "If our lead director is actively presenting a multi-offer counter or at an appraisal, our licensed team associate steps in immediately so that no prospective buyer call is sent to voicemail and no tour is turned away.",
    keyTakeaways: [
      "Dedicated licensed secondary associate familiar with every detail of your home",
      "Seamless VIP tour hosting during peak showing schedules",
      "Guaranteed listing representation 365 days a year"
    ],
    parentProcess: {
      number: "3",
      title: "Accessibility",
      slug: "/services/accessibility"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  // Process 4 Sub-processes
  "personal-assistant-support": {
    id: "personal-assistant-support",
    slug: "/services/personal-assistant-support",
    category: "service",
    kicker: "SUB-PROCESS 4.1 · TEAM SUPPORT",
    title: "Personal assistant for scheduling, communication, and documentation",
    subtitle: "Dedicated client concierge managing showing approvals, lockbox access, and prompt paperwork dispatch.",
    heroVideoUrl: "/media/videos/vid28.mp4",
    heroFallbackImage: "/media/gallery/sunset-deck-pool.jpeg",
    heroMetrics: [
      { label: "Showing Approvals", value: "Instant" },
      { label: "Family Privacy", value: "Protected" },
      { label: "Paperwork Speed", value: "Same-Day" }
    ],
    overview: "Selling a luxury home should not disrupt your daily family routine. Our executive assistant coordinates all tour schedules in advance, ensuring you have ample warning to prepare your home and maintain complete peace of mind.",
    keyTakeaways: [
      "Prompt notification and calendar coordination for every requested showing",
      "Managing lockbox security and buyer agent access credentials",
      "Immediate distribution of listing brochures, disclosures, and surveys"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "transaction-coordinator": {
    id: "transaction-coordinator",
    slug: "/services/transaction-coordinator",
    category: "service",
    kicker: "SUB-PROCESS 4.2 · TEAM SUPPORT",
    title: "Transaction coordinator for documentation and compliance",
    subtitle: "Certified escrow specialist supervising earnest deposits, title searches, lender verifications, and regulatory disclosures.",
    heroVideoUrl: "/media/videos/vid29.mp4",
    heroFallbackImage: "/media/gallery/sunset-window-terrace.jpeg",
    heroMetrics: [
      { label: "Compliance Rate", value: "100%" },
      { label: "Audit Milestones", value: "140+ Points" },
      { label: "On-Time Closing", value: "99.1%" }
    ],
    overview: "From contract execution to the disbursement of closing funds, our transaction coordinator monitors every deadline, audits title commitments, verifies buyer loan underwriting progress, and ensures 100% legal compliance.",
    keyTakeaways: [
      "Meticulous tracking of earnest money deposits and escrow receipt verifications",
      "Continuous liaison with title attorneys and buyer lending officers",
      "Ensuring all Oklahoma Real Estate Commission disclosures are properly executed"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "staging-team": {
    id: "staging-team",
    slug: "/services/staging-team",
    category: "service",
    kicker: "SUB-PROCESS 4.3 · TEAM SUPPORT",
    title: "Staging team for decluttering and market prep",
    subtitle: "Hands-on spatial designers optimizing sightlines, furniture spacing, lighting, and architectural flow.",
    heroVideoUrl: "/media/videos/vid30.mp4",
    heroFallbackImage: "/media/gallery/midcentury-entry.jpeg",
    heroMetrics: [
      { label: "Perceived Value", value: "Maximized" },
      { label: "Flow Optimization", value: "Room-by-Room" },
      { label: "Photo Readiness", value: "100%" }
    ],
    overview: "Our staging professionals understand how architectural scale is perceived through the camera lens and in person. We refine room layouts, open sightlines to outdoor living areas, and highlight high-end millwork to make spaces feel grand and inviting.",
    keyTakeaways: [
      "In-person styling review addressing furniture placement and lighting balance",
      "Decluttering roadmap to maximize visible floor space and architectural features",
      "Color and accessory curation tailored to luxury buyer preferences"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "listing-operations-team": {
    id: "listing-operations-team",
    slug: "/services/listing-operations-team",
    category: "service",
    kicker: "SUB-PROCESS 4.4 · TEAM SUPPORT",
    title: "Listing team for flyers, websites, print ads, and social marketing",
    subtitle: "Operations crew managing MLS data feeds, single-property domains, and digital syndication pipelines.",
    heroVideoUrl: "/media/videos/vid31.mp4",
    heroFallbackImage: "/media/gallery/infinity-pool-hills.jpeg",
    heroMetrics: [
      { label: "Data Accuracy", value: "100%" },
      { label: "Platform Feeds", value: "350+" },
      { label: "Launch Speed", value: "Within 24h" }
    ],
    overview: "Precision in MLS data entry is essential. Our listing operations crew enters room measurements, school feeder codes, and luxury feature tags with meticulous care, ensuring your property ranks at the top of buyer searches across every platform.",
    keyTakeaways: [
      "Accurate input of property details and high-resolution media into MLSOK",
      "Setup of custom single-property vanity websites and virtual tour links",
      "Immediate syndication verification across national portals"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "design-team": {
    id: "design-team",
    slug: "/services/design-team",
    category: "service",
    kicker: "SUB-PROCESS 4.5 · TEAM SUPPORT",
    title: "Design team for postcards and print/online flyers",
    subtitle: "In-house graphic studio crafting bespoke print collateral, embossed brochures, and digital buyer packages.",
    heroVideoUrl: "/media/videos/vid1.mp4",
    heroFallbackImage: "/media/gallery/hill-country-driveway.jpeg",
    heroMetrics: [
      { label: "Design Quality", value: "Bespoke" },
      { label: "Typography", value: "Editorial" },
      { label: "Print Finish", value: "Luxe Cardstock" }
    ],
    overview: "Every property has a distinct personality. Our design studio builds custom typography, color palettes, and editorial layouts that reflect your home's architecture, creating marketing materials that feel like an architectural magazine spread.",
    keyTakeaways: [
      "Custom-designed multi-page property presentation booklets",
      "Oversized direct-mail postcards with high-gloss finishes",
      "Branded digital PDFs for buyer agents and out-of-state relocations"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "property-photographer": {
    id: "property-photographer",
    slug: "/services/property-photographer",
    category: "service",
    kicker: "SUB-PROCESS 4.6 · TEAM SUPPORT",
    title: "Property photographer (photos and aerial)",
    subtitle: "FAA-certified drone pilots and architectural photographers equipped with specialized tilt-shift lenses and HDR lighting.",
    heroVideoUrl: "/media/videos/vid2.mp4",
    heroFallbackImage: "/media/properties/136-nw-18th-heritage-hills.jpeg",
    heroMetrics: [
      { label: "Equipment", value: "Cinema & Tilt-Shift" },
      { label: "Drone License", value: "FAA Part 107" },
      { label: "Processing", value: "Hand-Blended" }
    ],
    overview: "Our visual specialists do not take rushed snapshots. They study sun angles, shoot during prime golden and blue hours, and use specialized equipment to capture the authentic grandeur of your property.",
    keyTakeaways: [
      "Tilt-shift lenses ensuring vertical lines remain perfectly parallel",
      "Dual golden-hour and twilight photography sessions",
      "FAA-certified aerial sweeps capturing lot acreage and neighborhood context"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "marketing-team": {
    id: "marketing-team",
    slug: "/services/marketing-team",
    category: "service",
    kicker: "SUB-PROCESS 4.7 · TEAM SUPPORT",
    title: "Marketing team for listing and post-close marketing",
    subtitle: "Strategic growth division managing listing launch campaigns, broker preview events, and post-close transitions.",
    heroVideoUrl: "/media/videos/vid3.mp4",
    heroFallbackImage: "/media/properties/11500-gateshead.jpg",
    heroMetrics: [
      { label: "Launch Blast", value: "Opening 72h" },
      { label: "Digital Synergy", value: "Multi-Platform" },
      { label: "Post-Close Support", value: "Guaranteed" }
    ],
    overview: "Our marketing division manages the initial launch surge, paid social retargeting campaigns, and post-closing concierge transitions—ensuring high buyer momentum that carries all the way through escrow completion.",
    keyTakeaways: [
      "Strategic opening-weekend listing launch timing",
      "Continuous optimization of paid advertising budgets and target demographics",
      "Post-close assistance with moving coordination and escrow reconciliations"
    ],
    parentProcess: {
      number: "4",
      title: "Team support",
      slug: "/services/team-support"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  // Process 5 Sub-processes
  "local-market-update": {
    id: "local-market-update",
    slug: "/services/local-market-update",
    category: "service",
    kicker: "SUB-PROCESS 5.1 · PRICING STRATEGY",
    title: "Local market update (downtown OKC trends, DOM, sale-to-list, inventory)",
    subtitle: "Real-time econometric analysis tracking inventory absorption, average days on market (DOM), and sale-to-list price ratios.",
    heroVideoUrl: "/media/videos/vid4.mp4",
    heroFallbackImage: "/media/properties/3233-n-harvey-crown-heights.jpeg",
    heroMetrics: [
      { label: "Data Freshness", value: "Real-Time" },
      { label: "DOM Tracking", value: "Hyper-Local" },
      { label: "Inventory Index", value: "Monthly Velocity" }
    ],
    overview: "Market conditions change rapidly. Our firm continuously monitors pending contracts, days on market (DOM), and sales velocity in your specific neighborhood to calibrate the optimal pricing window for your home.",
    keyTakeaways: [
      "Analysis of active versus pending inventory in your immediate enclave",
      "Tracking sale-to-list ratios to determine true buyer negotiation power",
      "Seasonal and interest rate absorption trends impacting luxury purchasers"
    ],
    parentProcess: {
      number: "5",
      title: "Pricing strategy",
      slug: "/services/pricing-strategy"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "subject-property-valuation": {
    id: "subject-property-valuation",
    slug: "/services/subject-property-valuation",
    category: "service",
    kicker: "SUB-PROCESS 5.2 · PRICING STRATEGY",
    title: "Subject property valuation, including added value of an adjacent lot",
    subtitle: "Detailed valuation auditing parcel boundaries, zoning potential, and appraisal premiums for adjacent lots or acreage.",
    heroVideoUrl: "/media/videos/vid5.mp4",
    heroFallbackImage: "/media/properties/616-nw-6th-downtown.jpeg",
    heroMetrics: [
      { label: "Land Appraisal", value: "Comprehensive" },
      { label: "Zoning Audit", value: "Complete" },
      { label: "Added Equity", value: "Captured" }
    ],
    overview: "Automated algorithms cannot properly value estate acreage, privacy buffers, or separate buildable parcels. Our firm conducts an in-depth land audit to ensure unique parcel assets and architectural improvements are fully monetized.",
    keyTakeaways: [
      "Forensic evaluation of adjacent lot development and subdivision potential",
      "Appraisal adjustments for custom swimming pools, outdoor pavilions, and workshops",
      "Ensuring land value is highlighted as a distinct selling feature to high-net-worth buyers"
    ],
    parentProcess: {
      number: "5",
      title: "Pricing strategy",
      slug: "/services/pricing-strategy"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "comparable-sales-analysis": {
    id: "comparable-sales-analysis",
    slug: "/services/comparable-sales-analysis",
    category: "service",
    kicker: "SUB-PROCESS 5.3 · PRICING STRATEGY",
    title: "Comparable sales analysis",
    subtitle: "Forensic comp review analyzing closed transactions, pending escrows, and active neighborhood competitors within 90 days.",
    heroVideoUrl: "/media/videos/vid6.mp4",
    heroFallbackImage: "/media/properties/22801-n-briarwood-edmond.jpeg",
    heroMetrics: [
      { label: "Comps Evaluated", value: "Closed & Pending" },
      { label: "Timeframe", value: "Past 90 Days" },
      { label: "Appraisal Defense", value: "Ironclad" }
    ],
    overview: "We analyze recent closed comps line-by-line, adjusting for square footage differences, quality of construction, lot size, and seller-paid concessions to build an ironclad appraisal defense that protects your negotiated contract price.",
    keyTakeaways: [
      "Adjustments for true architectural finishes and ceiling heights",
      "Interviews with listing agents of pending comps to uncover contract prices before public recording",
      "Defending your contract price during the buyer's professional appraisal"
    ],
    parentProcess: {
      number: "5",
      title: "Pricing strategy",
      slug: "/services/pricing-strategy"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "tiered-pricing-recommendation": {
    id: "tiered-pricing-recommendation",
    slug: "/services/tiered-pricing-recommendation",
    category: "service",
    kicker: "SUB-PROCESS 5.4 · PRICING STRATEGY",
    title: "Tiered pricing recommendation (conservative / target / aspirational)",
    subtitle: "A 3-tier valuation model presenting Conservative (rapid liquidity), Target (peak comp appraisal), and Aspirational (surge premium testing).",
    heroVideoUrl: "/media/videos/vid7.mp4",
    heroFallbackImage: "/media/properties/22402-emily-way-edmond.jpeg",
    heroMetrics: [
      { label: "Pricing Tiers", value: "3 Levels" },
      { label: "Strategic Choice", value: "Seller Decides" },
      { label: "Risk Mitigation", value: "Complete" }
    ],
    overview: "No two sellers share identical financial objectives or relocation timelines. We provide three distinct pricing strategies: a Conservative tier for rapid guaranteed liquidity, a Target tier aligned with peak comparable sales, and an Aspirational tier to test surge demand in low-inventory markets.",
    keyTakeaways: [
      "Conservative Tier: Defensive liquidity pricing for immediate cash sale",
      "Target Tier: Accurate peak-market value supported by verified comps",
      "Aspirational Tier: Premium ceiling testing when neighborhood inventory is constrained"
    ],
    parentProcess: {
      number: "5",
      title: "Pricing strategy",
      slug: "/services/pricing-strategy"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "buyer-minded-pricing": {
    id: "buyer-minded-pricing",
    slug: "/services/buyer-minded-pricing",
    category: "service",
    kicker: "SUB-PROCESS 5.5 · PRICING STRATEGY",
    title: "Buyer-minded pricing to drive competitive bidding",
    subtitle: "Psychological price positioning calibrated directly beneath search brackets to generate higher showing velocity and spark multiple competing bids.",
    heroVideoUrl: "/media/videos/vid8.mp4",
    heroFallbackImage: "/media/properties/3911-creek-bank-edmond.jpeg",
    heroMetrics: [
      { label: "Search Bracket", value: "Optimized" },
      { label: "Buyer Eyeballs", value: "Doubled" },
      { label: "Multi-Offer Velocity", value: "High" }
    ],
    overview: "Homebuyers filter their searches by major round brackets (e.g. $500k, $750k, $1M). Pricing just beneath these parameters (e.g. $749,000 instead of $755,000) exposes your home to a significantly larger pool of qualified buyers, creating the competitive urgency needed for multiple offers.",
    keyTakeaways: [
      "Strategic alignment with portal search price increments",
      "Igniting buyer urgency during the crucial first 14 days on market",
      "Creating competitive bidding environments that drive contract prices above ask"
    ],
    parentProcess: {
      number: "5",
      title: "Pricing strategy",
      slug: "/services/pricing-strategy"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  // Process 6 Sub-processes
  "partnership-approach": {
    id: "partnership-approach",
    slug: "/services/partnership-approach",
    category: "service",
    kicker: "SUB-PROCESS 6.1 · FAIR PRICING & CONTRACT FLEXIBILITY",
    title: "Partnership approach focused on your most profitable outcome",
    subtitle: "Fiduciary alignment where our firm's success is directly tied to maximizing your net proceeds.",
    heroVideoUrl: "/media/videos/vid9.mp4",
    heroFallbackImage: "/media/properties/11616-estrella-arcadia.jpeg",
    heroMetrics: [
      { label: "Fiduciary Duty", value: "100%" },
      { label: "Net Alignment", value: "Direct" },
      { label: "Long-Term Trust", value: "Paramount" }
    ],
    overview: "Our relationship with you is a true financial partnership. We treat your equity with the same care as our own, counseling you with candid market truths and negotiating vigorously to maximize your net proceeds rather than pushing for a quick, below-market closing.",
    keyTakeaways: [
      "Complete fiduciary transparency at every decision point",
      "No rushing or pressuring you into unfavorable deal terms",
      "Long-term client relationships prioritized over quick commission checks"
    ],
    parentProcess: {
      number: "6",
      title: "Fair pricing and contract flexibility",
      slug: "/services/fair-pricing-and-contract-flexibility"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },

  "cancel-anytime-listing-agreement": {
    id: "cancel-anytime-listing-agreement",
    slug: "/services/cancel-anytime-listing-agreement",
    category: "service",
    kicker: "SUB-PROCESS 6.2 · FAIR PRICING & CONTRACT FLEXIBILITY",
    title: "Cancel-anytime listing agreement: if promises aren't met, fire us, no strings attached",
    subtitle: "An unconditional written guarantee embedded into your listing contract giving you the right to terminate immediately if any promise is unfulfilled.",
    heroVideoUrl: "/media/videos/vid10.mp4",
    heroFallbackImage: "/media/properties/9687-bear-creek-guthrie.jpeg",
    heroMetrics: [
      { label: "Cancellation Fee", value: "$0.00" },
      { label: "Contract Penalties", value: "Zero" },
      { label: "Seller Control", value: "100%" }
    ],
    overview: "Trust is earned through action, not contractual handcuffs. If our firm fails to execute every written marketing standard, communication commitment, or fiduciary duty to your satisfaction, you hold the unconditional right to fire us immediately. Zero cancellation fees, zero penalties, no questions asked.",
    keyTakeaways: [
      "100% Risk-Free Cancel-Anytime Listing Clause written directly into your agreement",
      "Zero repayment charges for photography, drone video, or portal advertising",
      "You remain in total control of your property from listing launch to closing"
    ],
    parentProcess: {
      number: "6",
      title: "Fair pricing and contract flexibility",
      slug: "/services/fair-pricing-and-contract-flexibility"
    },
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

/* =========================================================================
   3 MAJOR REAL ESTATE SERVICES (Home Buying, Home Selling, Land Buying & Selling)
   ========================================================================= */

export const MAJOR_SERVICE_PAGES: Record<string, InteriorPageData> = {
  "home-buying": {
    id: "home-buying",
    slug: "/services/home-buying",
    category: "service",
    kicker: "01 / BUYER CONCIERGE & EQUITY ADVISORY",
    title: "Home Buying: Private Advisory & Fiduciary Representation",
    subtitle: "From exclusive off-market pocket listings to rigorous structural inspections and winning contract negotiation, our firm defends your equity across Edmond & Greater Oklahoma City.",
    heroVideoUrl: "/media/videos/vid11.mp4",
    heroFallbackImage: "/media/properties/1817-sun-valley-edmond.jpeg",
    heroMetrics: [
      { label: "Client Price Advantage", value: "$24,500 Avg" },
      { label: "Off-Market Access", value: "Priority" },
      { label: "Inspection Defended", value: "100%" }
    ],
    overview: "Purchasing a home in the Oklahoma City metropolitan area is both a significant financial investment and a defining lifestyle transition. Jamison Real Estate operates as your exclusive fiduciary advocate. We refuse to let our clients overpay, accept deferred structural maintenance, or navigate complex Oklahoma real estate contracts without aggressive protection. A former collegiate athlete, Brian Jamison brings championship stamina and hands-on presence to every private showing, crawlspace inspection, and escrow deadline.",
    keyTakeaways: [
      "Direct access to pre-market and unlisted pocket luxury inventory before public MLS distribution",
      "Exhaustive architectural, foundation, HVAC, and roof due diligence with trusted engineering partners",
      "Custom multiple-bid offer architecture utilizing calibrated escalation formulas without overpaying",
      "Zero-fee buyer representation with 100% fiduciary loyalty to your financial goals"
    ],
    deliverables: [
      {
        id: "hb-pocket-sourcing",
        title: "Private Off-Market Pocket Sourcing",
        desc: "Proactive outreach to Oklahoma luxury homeowners and broker networks to source unlisted pocket listings before public release.",
        executionDetail: "We cross-reference private broker feeds, title data, and neighborhood databases to find homes matching your exact parameters before other buyers know they are available.",
        sellerImpact: "Eliminates public bidding frenzy and secures priority negotiation positioning for our buyers.",
        badge: "Step 01 · Priority Sourcing",
        image: "/media/properties/715-s-friendly-okc.jpeg"
      },
      {
        id: "hb-valuation-audit",
        title: "Comparative Valuation Audit",
        desc: "Comprehensive algorithmic comp analysis cross-referencing closed sales, active competition, and cost-per-square-foot benchmarks.",
        executionDetail: "We conduct an institutional audit of adjacent subdivision pricing, historical appreciation, and recent appraisal trends to pinpoint the exact fair market value.",
        sellerImpact: "Guarantees you never overpay or fall into appraisal shortage traps.",
        badge: "Step 02 · Valuation Audit",
        image: "/media/properties/534-w-chickasaw.jpg"
      },
      {
        id: "hb-inspection-defense",
        title: "Structural, Roof & Mechanical Due Diligence",
        desc: "Physical inspection attendance by Brian Jamison alongside certified engineers to test foundation, HVAC, roof, and plumbing.",
        executionDetail: "Brian personally accompanies every inspector on-site, testing drainage grading, slab movement, panel capacity, and sewer lines to uncover latent defects.",
        sellerImpact: "Saves our buyer clients tens of thousands in post-closing repair disputes or renegotiates credits before escrow closes.",
        badge: "Step 03 · Inspection Defense",
        image: "/media/properties/435-nw-21st-heritage-hills.jpeg"
      },
      {
        id: "hb-contract-terms",
        title: "Strategic Contract Structuring & Escalation Formula",
        desc: "Drafting fortified purchase agreements tailored to win competitive multi-offer situations while retaining inspection rights.",
        executionDetail: "We calibrate earnest money buffers, inspection timeframes, and targeted escalation caps that make your offer stand out to sellers without sacrificing legal safeguards.",
        sellerImpact: "Highest win rate in competitive multiple-bid scenarios across Nichols Hills, Edmond, and Gaillardia.",
        badge: "Step 04 · Winning Terms",
        image: "/media/properties/13701-s-independence-okc.jpeg"
      },
      {
        id: "hb-escrow-oversight",
        title: "Title, Escrow & Closing Fiduciary Oversight",
        desc: "Full coordination with Jamison Real Estate transaction coordinators, title attorneys, and vetted Oklahoma mortgage partners.",
        executionDetail: "Daily timeline tracking ensures clear title commitment, survey approval, appraisal resolution, and seamless wire transfer execution.",
        sellerImpact: "Zero last-minute closing delays or surprise escrow charges.",
        badge: "Step 05 · Title & Escrow",
        image: "/media/properties/85006-n-2520-watonga.jpeg"
      },
      {
        id: "hb-concierge-transition",
        title: "Post-Close Concierge & Transition Network",
        desc: "Curated introductions to Oklahoma City's premier interior designers, landscapers, pool technicians, and security specialists.",
        executionDetail: "Our client relationship does not end at closing. We dispatch our vetted vendor directory and provide key exchange coordination.",
        sellerImpact: "Effortless move-in experience and peace of mind from day one.",
        badge: "Step 06 · Concierge Service",
        image: "/media/properties/2950-nw-37th-newcastle.jpeg"
      }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "home-selling": {
    id: "home-selling",
    slug: "/services/home-selling",
    category: "service",
    kicker: "02 / MAXIMUM-NET LISTING MACHINE",
    title: "Home Selling: The Proprietary 6-Step Selling Machine",
    subtitle: "We do not passively place a sign in the yard. Jamison Real Estate executes an institutional 6-step selling blueprint backed by cinema-grade 4K media, 350+ portal syndication, and our 100% Risk-Free Cancel-Anytime Pledge.",
    heroVideoUrl: "/media/videos/vid12.mp4",
    heroFallbackImage: "/media/gallery/modern-estate-pool-lawn.jpeg",
    heroMetrics: [
      { label: "List-to-Sale Ratio", value: "98.6%" },
      { label: "Volume Sold", value: "$70M+" },
      { label: "Days to Escrow", value: "14 Days Avg" }
    ],
    overview: "Selling an Oklahoma estate for peak market price requires active demand generation, not passive MLS placement. Jamison Real Estate executes a proprietary multi-phase marketing and negotiation framework engineered to ignite competitive bidding wars. From golden-hour architectural cinematography and Matterport 3D dollhouses to reverse prospecting and our unconditional 100% Risk-Free Cancel-Anytime Listing Guarantee, every dollar of your home equity is defended with championship athletic discipline.",
    keyTakeaways: [
      "ROI-driven pre-listing refresh consultation that delivers $3-$5 in net proceeds for every $1 invested",
      "Cinema-grade 4K motion video walkthroughs, FAA-certified drone mapping, and architectural HDR photography",
      "Instant syndication to 350+ national and global real estate portals including Zillow Showcase and Realtor.com",
      "Unconditional Cancel-Anytime Listing Pledge: fire Brian Jamison at any moment with zero penalties if we fall short"
    ],
    deliverables: [
      {
        id: "hs-staging-prep",
        title: "ROI-Driven Pre-Listing Refresh Guidance",
        desc: "Strategic first-impression walk-through identifying high-leverage cosmetic, landscaping, and staging enhancements.",
        executionDetail: "We audit curb appeal, paint tones, decluttering flow, and fixture upgrades, focusing strictly on high-ROI improvements that generate multiple competitive offers.",
        sellerImpact: "Every $1 invested in targeted prep returns $3 to $5 at the closing table.",
        badge: "Step 01 · Staging & Prep",
        image: "/media/gallery/modern-kitchen.jpeg"
      },
      {
        id: "hs-hdr-photo",
        title: "Magazine-Grade Architectural HDR Photography",
        desc: "Captured with natural ambient light and golden-hour illumination using professional wide-angle tilt-shift lenses and multi-exposure lighting.",
        executionDetail: "We schedule golden-hour exterior shoots and HDR interior bracket exposures that make your listing shine on mobile feeds.",
        sellerImpact: "Stops buyers scrolling on Zillow and Realtor.com, resulting in 4x more saved listings.",
        badge: "Step 02 · 4K HDR Photography",
        image: "/media/gallery/modern-staircase-dining.jpeg"
      },
      {
        id: "hs-cinema-film",
        title: "Cinema-Grade 4K Motion Walkthrough Film",
        desc: "High-bitrate cinematic video on stabilized gimbals with bespoke musical score and color grading.",
        executionDetail: "We film an evocative lifestyle motion picture that takes buyers on an emotional walkthrough of your home's architectural rhythm and natural light.",
        sellerImpact: "Generates over 14,000+ views across Instagram, YouTube, and Facebook targeted ad campaigns.",
        badge: "Step 03 · Cinema Walkthrough",
        image: "/media/gallery/brian-closing-clients.jpeg"
      },
      {
        id: "hs-drone-mapping",
        title: "FAA Part-107 Aerial Drone Mapping & Boundary Plotting",
        desc: "High-altitude 4K drone sweeps illustrating dynamic lot boundaries, privacy buffers, and proximity to golf courses and schools.",
        executionDetail: "FAA-licensed drone pilots plot custom animated boundary overlays, roof inspections, and neighborhood panoramas.",
        sellerImpact: "Allows out-of-state buyers to understand the exact acreage, privacy, and outdoor amenities instantly.",
        badge: "Step 04 · FAA Drone Mapping",
        image: "/media/gallery/brian-jamison-skyline.jpeg"
      },
      {
        id: "hs-global-syndication",
        title: "Syndication Across 350+ Global Luxury Portals",
        desc: "Direct API syndication to Zillow Showcase, Realtor.com Featured, Redfin, Trulia, and global luxury partner networks.",
        executionDetail: "We secure priority placement so your home appears at the very top of search results in Edmond, Nichols Hills, and Oklahoma City.",
        sellerImpact: "Puts your listing directly in front of 100% of active qualified homebuyers worldwide.",
        badge: "Step 05 · Global Syndication",
        image: "/media/gallery/brian-jamison-sunset.jpeg"
      },
      {
        id: "hs-bidding-wars",
        title: "3-Tier Strategic Pricing & Bidding War Architecture",
        desc: "Econometric pricing calibration positioned beneath buyer search brackets to trigger multiple competitive bids.",
        executionDetail: "We model buyer search behavior in $25k and $50k increments to capture the largest pool of qualified pre-approved shoppers on day one.",
        sellerImpact: "Triggers competitive buyer tension, often producing offers substantially over list price.",
        badge: "Step 06 · Bidding War Engine",
        image: "/media/gallery/sunset-deck-pool.jpeg"
      }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "land-buying-and-selling": {
    id: "land-buying-and-selling",
    slug: "/services/land-buying-and-selling",
    category: "service",
    kicker: "03 / ACREAGE & DEVELOPMENT ENCLAVES",
    title: "Land Buying and Selling: Acreage & Parcel Advisory",
    subtitle: "Navigating topography, soil percolation, utility easements, and zoning requires specialized land expertise. Our firm represents landowners, developers, and estate buyers across Oklahoma.",
    heroVideoUrl: "/media/videos/vid13.mp4",
    heroFallbackImage: "/media/gallery/sunset-window-terrace.jpeg",
    heroMetrics: [
      { label: "Acreage Transacted", value: "1,450+ Acres" },
      { label: "Land Parcels Closed", value: "85+ Parcels" },
      { label: "Builder Network", value: "24+ Partners" }
    ],
    overview: "Raw land, residential acreage, and development parcels require an entirely different technical and marketing discipline than standard single-family residential transactions. Jamison Real Estate provides end-to-end land advisory for buyers and sellers across Oklahoma. From aerial topographical drone surveys and soil perk tests to utility corridor verification, municipal zoning analysis, and direct outreach to custom home builders, we ensure maximum valuation and risk protection on every acre.",
    keyTakeaways: [
      "FAA drone boundary mapping with GPS coordinate overlays and topographical elevation models",
      "Technical due diligence: soil percolation tests, well water quality, flood plain status, and septic feasibility",
      "Utility corridor verification: electrical capacity, municipal water access, natural gas, and road easements",
      "Direct marketing network linking land sellers directly to Oklahoma's top custom home builders and developers"
    ],
    deliverables: [
      {
        id: "land-drone-mapping",
        title: "Aerial Drone Topographical & Boundary Mapping",
        desc: "High-resolution aerial drone sweeps plotting precision GPS boundary overlays, tree canopies, and elevation contours.",
        executionDetail: "We produce interactive drone maps and boundary graphics illustrating exact property lines, gate entrances, and building envelopes.",
        sellerImpact: "Prospective buyers and builders can visualize the layout, driveway placement, and homesite orientation immediately.",
        badge: "Step 01 · Drone Boundary",
        image: "/media/gallery/midcentury-entry.jpeg"
      },
      {
        id: "land-soil-perk",
        title: "Soil Perk, Well & Septic Feasibility Audits",
        desc: "Technical verification of soil conditions, percolation rates, and water well sustainability.",
        executionDetail: "We coordinate with certified soil scientists and environmental inspectors to verify suitability for conventional or aerobic septic systems and water tables.",
        sellerImpact: "Eliminates deal-killing surprises during buyer inspection periods and validates property value.",
        badge: "Step 02 · Soil & Perk Audit",
        image: "/media/gallery/infinity-pool-hills.jpeg"
      },
      {
        id: "land-utility-corridor",
        title: "Utility Corridor & Access Easement Verification",
        desc: "Investigating electrical availability (OG&E), rural water meters, natural gas/propane lines, and public road access rights.",
        executionDetail: "We review county recorded surveys, utility tap fees, line extension estimates, and deeded ingress/egress easements.",
        sellerImpact: "Provides clear cost projections for buyers and protects sellers against misrepresentation claims.",
        badge: "Step 03 · Utility Due Diligence",
        image: "/media/gallery/hill-country-driveway.jpeg"
      },
      {
        id: "land-zoning-analysis",
        title: "Zoning, Covenants & Highest-and-Best-Use Modeling",
        desc: "Analyzing agricultural vs. residential zoning, subdivision potential, minimum square footage deed restrictions, and outbuilding allowances.",
        executionDetail: "We consult with county commissioners and planning departments to determine parcel split potential and deed restrictions.",
        sellerImpact: "Unlocks hidden land equity by marketing acreage for its highest economic use.",
        badge: "Step 04 · Zoning Analysis",
        image: "/media/properties/136-nw-18th-heritage-hills.jpeg"
      },
      {
        id: "land-builder-network",
        title: "Builder & Developer Network Distribution",
        desc: "Direct pitches to our established network of 24+ Oklahoma custom builders, spec home contractors, and land investors.",
        executionDetail: "We pitch your parcel directly to builders searching for custom homesite envelopes in Edmond, Piedmont, Arcadia, and Deer Creek.",
        sellerImpact: "Generates pre-qualified cash buyer inquiries without waiting for random internet shoppers.",
        badge: "Step 05 · Builder Network",
        image: "/media/properties/11500-gateshead.jpg"
      },
      {
        id: "land-mineral-title",
        title: "Mineral Rights & Title Boundary Guarantee",
        desc: "Comprehensive title search ensuring clear surface ownership, boundary line agreements, and mineral rights clarification.",
        executionDetail: "We partner with experienced Oklahoma title attorneys to ensure seamless title insurance and ironclad closing documentation.",
        sellerImpact: "Guarantees an airtight transaction with zero lingering boundary or mineral title disputes.",
        badge: "Step 06 · Mineral & Title",
        image: "/media/properties/3233-n-harvey-crown-heights.jpeg"
      }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

/* =========================================================================
   COMBINED SERVICE PAGES (Major Services + Main Processes + Sub-Processes + Aliases)
   ========================================================================= */

// Legacy and direct route aliases for seamless navigation
const LEGACY_ALIASES: Record<string, InteriorPageData> = {
  "home-buying-direct": {
    ...MAJOR_SERVICE_PAGES["home-buying"],
    id: "home-buying-direct",
    slug: "/home-buying"
  },
  "home-selling-direct": {
    ...MAJOR_SERVICE_PAGES["home-selling"],
    id: "home-selling-direct",
    slug: "/home-selling"
  },
  "land-buying-direct": {
    ...MAJOR_SERVICE_PAGES["land-buying-and-selling"],
    id: "land-buying-direct",
    slug: "/land-buying-and-selling"
  },
  "land-sales": {
    ...MAJOR_SERVICE_PAGES["land-buying-and-selling"],
    id: "land-sales",
    slug: "/services/land-sales"
  },
  "land-sales-direct": {
    ...MAJOR_SERVICE_PAGES["land-buying-and-selling"],
    id: "land-sales-direct",
    slug: "/land-sales"
  },
  "elite-marketing": {
    ...MAIN_PROCESS_PAGES["marketing-plan-and-process"],
    id: "elite-marketing",
    slug: "/services/elite-marketing"
  },
  "transparent-communication": {
    ...MAIN_PROCESS_PAGES["communication"],
    id: "transparent-communication",
    slug: "/services/transparent-communication"
  },
  "accessibility-guarantee": {
    ...MAIN_PROCESS_PAGES["accessibility"],
    id: "accessibility-guarantee",
    slug: "/services/accessibility-guarantee"
  },
  "support-team": {
    ...MAIN_PROCESS_PAGES["team-support"],
    id: "support-team",
    slug: "/services/support-team"
  },
  "precision-pricing": {
    ...MAIN_PROCESS_PAGES["pricing-strategy"],
    id: "precision-pricing",
    slug: "/services/precision-pricing"
  },
  "cancel-anytime-guarantee": {
    ...MAIN_PROCESS_PAGES["fair-pricing-and-contract-flexibility"],
    id: "cancel-anytime-guarantee",
    slug: "/services/cancel-anytime-guarantee"
  }
};

export const SERVICE_PAGES: Record<string, InteriorPageData> = {
  ...MAJOR_SERVICE_PAGES,
  ...MAIN_PROCESS_PAGES,
  ...SUB_PROCESS_PAGES,
  ...LEGACY_ALIASES
};
