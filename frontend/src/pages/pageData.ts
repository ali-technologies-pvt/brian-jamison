import { SERVICE_PAGES, CORE_PROCESSES_NAV } from "./serviceData";
import { InteriorPageData } from './types';

// Curated 12-image high-resolution architectural gallery
const DEFAULT_ARCHITECTURAL_GALLERY = [
  {
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    caption: "Grand limestone façade with custom slate roofing and golden hour illumination.",
    tag: "Architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    caption: "Chef's gourmet kitchen with dual waterfall quartzite islands and Sub-Zero refrigeration.",
    tag: "Interiors"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    caption: "Cathedral great room with hand-hewn oak timbers and 24-foot fireplace.",
    tag: "Interiors"
  },
  {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    caption: "Zero-edge heated swimming pool, travertine sundeck, and outdoor pavilion.",
    tag: "Grounds"
  },
  {
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    caption: "Primary spa bath featuring freestanding soaking tub and dual rainfall showers.",
    tag: "Details"
  },
  {
    url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    caption: "Custom temperature-controlled wine cellar with glass display enclosure.",
    tag: "Details"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    caption: "Executive study with floor-to-ceiling walnut wainscoting and hidden storage.",
    tag: "Interiors"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    caption: "Twilight rear elevation showcasing seamless sliding pocket glass wall transitions.",
    tag: "Architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
    caption: "Private guest casita with dedicated kitchenette and courtyard veranda.",
    tag: "Architecture"
  },
  {
    url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
    caption: "Open concept dining salon framed by designer bronze chandeliers and garden views.",
    tag: "Interiors"
  },
  {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    caption: "Multi-acre gated entry perimeter lined with mature native Oklahoma oaks.",
    tag: "Grounds"
  },
  {
    url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
    caption: "Covered outdoor kitchen with built-in gas rotisserie, pizza oven, and bar seating.",
    tag: "Grounds"
  }
];

export const TEN_LISTING_STANDARDS_DELIVERABLES = [
  {
    id: "home-prep-guidance",
    slug: "/services/home-prep-guidance",
    title: "Home-Prep Guidance & Architectural Staging",
    desc: "First-impression architectural review, decluttering roadmap, and ROI-driven refresh suggestions.",
    executionDetail: "Brian conducts a room-by-room architectural walkthrough, identifying high-ROI cosmetic paint, lighting, and depersonalization adjustments so buyers fall in love on arrival.",
    sellerImpact: "Transforms homes from 'lived in' to an emotional showpiece, generating 3x more opening-weekend private showings and eliminating lowball concessions.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 01 · Curb Appeal"
  },
  {
    id: "professional-photography",
    slug: "/services/professional-photography",
    title: "Professional Architectural HDR Photography",
    desc: "Interior and exterior golden-hour captures using architectural wide-angle glass.",
    executionDetail: "Captured with natural ambient light and golden-hour multi-bracket HDR lighting, preserving structural depth, true window exposure, and natural interior warmth.",
    sellerImpact: "Over 95% of buyers first see your home online; magazine-grade photography stops buyer scrolling instantly.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 02 · 4K HDR"
  },
  {
    id: "cinematic-video",
    slug: "/services/cinematic-video",
    title: "Cinema-Grade 4K Motion Walkthrough Film",
    desc: "4K high-bitrate video capturing light, scale, and living flow with custom sound design.",
    executionDetail: "Filmed on cinema-grade gimbal stabilizers with professional color grading, custom sound design, and lifestyle pacing that highlights the architectural flow.",
    sellerImpact: "Videos average 14.2k+ views across platforms and create strong emotional attachment before buyers ever set foot inside.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 03 · 60fps Cinema"
  },
  {
    id: "aerial-drone",
    slug: "/services/aerial-drone",
    title: "FAA Part-107 HD Aerial Drone Mapping",
    desc: "Drone flyovers capturing lot lines, roof condition, and scenic surroundings.",
    executionDetail: "FAA-certified drone pilots film high-altitude 4K aerial sweeps, plotting dynamic parcel boundary lines, tree canopies, and proximity to golf courses and schools.",
    sellerImpact: "Shows buyers the exact land scale, privacy buffers, and lot value that ground-level photography cannot convey.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 04 · FAA Drone"
  },
  {
    id: "matterport-3d",
    slug: "/services/matterport-3d",
    title: "Interactive Matterport Pro3 3D Virtual Tour",
    desc: "Millimeter-accurate virtual dollhouse allowing 360-degree room exploration.",
    executionDetail: "Laser-guided spatial cameras scan every square foot of your home, compiling an interactive 3D dollhouse model and digital floor plan.",
    sellerImpact: "Enables pre-approved corporate transferees moving to OKC from California, Texas, and New York to make confident sight-unseen cash offers.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 05 · 3D Dollhouse"
  },
  {
    id: "global-portals",
    slug: "/services/global-portals",
    title: "Syndication to 350+ Global Luxury Feeds",
    desc: "Syndicated instantly to Zillow, Realtor.com, Trulia, Redfin, MLS, and luxury networks.",
    executionDetail: "Direct API feeds syndicate your listing to every major national and international portal, including Zillow Showcase, Realtor.com Featured, Redfin, and global luxury networks.",
    sellerImpact: "Ensures your property reaches 100% of active qualified homebuyers worldwide, preventing your home from getting lost in local MLS silos.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 06 · 350+ Portals"
  },
  {
    id: "single-property-website",
    slug: "/services/single-property-website",
    title: "Dedicated Single-Property Vanity Domain Website",
    desc: "Custom vanity domain created solely to showcase your home without competing ads.",
    executionDetail: "We purchase and launch a custom domain (e.g. 1234GrandviewBlvd.com) featuring full-screen 4K video, complete photo albums, floor plans, and seller disclosures.",
    sellerImpact: "Zero competing ads or distraction listings; prospective buyers and their agents are locked into your property's exclusive narrative.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 07 · Custom URL"
  },
  {
    id: "social-advertising",
    slug: "/services/social-advertising",
    title: "Hyper-Targeted Meta Paid Retargeting Campaigns",
    desc: "Targeted digital campaigns reaching active buyers and relocating families across the OKC metro.",
    executionDetail: "Paid targeted advertising campaigns deployed across Instagram & Facebook, targeting high-net-worth professionals, executives, physicians, and transferees searching OKC real estate.",
    sellerImpact: "Proactively places your home in front of qualified buyers who aren't actively searching MLS feeds daily.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 08 · Meta Ads"
  },
  {
    id: "mls-refreshes",
    slug: "/services/mls-refreshes",
    title: "Active MLS Algorithmic Tuning & Refreshes",
    desc: "Daily algorithmic tuning to prevent listing stagnation in broker search queries.",
    executionDetail: "Unlike passive agents who enter a listing and wait, Brian monitors daily search impressions, rotating the primary hero photo and updating search tags to keep the listing at the top of buyer auto-searches.",
    sellerImpact: "Maintains high urgency and prevents the dreaded 'Days on Market' fatigue that leads to price reductions.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 09 · MLS Algorithm"
  },
  {
    id: "reverse-prospecting",
    slug: "/services/reverse-prospecting",
    title: "Reverse Prospecting & Direct Broker Matchmaking",
    desc: "Direct outreach to buyer agents with clients searching within your exact price bracket.",
    executionDetail: "Brian pulls MLS database backend analytics to pinpoint every broker who has an active buyer searching in your exact square footage and price bracket, placing direct telephone calls to pitch your property.",
    sellerImpact: "Creates private showings with pre-qualified buyers before other listings even get noticed.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Step 10 · Matchmaking"
  }
];

export { SERVICE_PAGES, CORE_PROCESSES_NAV };

export const COMMUNITY_PAGES: Record<string, InteriorPageData> = {
  "areas": {
    id: "areas",
    slug: "/areas",
    category: "community",
    kicker: "METROPOLITAN SERVICE AREAS",
    title: "21 Oklahoma City Metropolitan Service Areas & Communities",
    subtitle: "Explore our primary service areas across Greater Oklahoma City, Edmond, Nichols Hills, Norman, and surrounding acreage enclaves.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Metro Communities", value: "21 Areas" },
      { label: "Volume Sold", value: "$70M+" },
      { label: "Active Comps", value: "100% Updated" }
    ],
    overview: "Brian Jamison and Salt Real Estate provide comprehensive, top-tier advisory and transactional representation across the entire Oklahoma City metropolitan area. From the historic mansions of Heritage Hills and Nichols Hills to the gated golf fairways of Gaillardia, the acclaimed academic corridors of Edmond and Deer Creek, and sprawling rural acreage in Arcadia and Guthrie, our local market intelligence gives our clients an undeniable competitive edge.",
    keyTakeaways: [
      "In-depth micro-market data covering Days on Market (DOM), absorption velocity, and school feeder ratings",
      "Full representation across both luxury residential enclaves and rural development acreage",
      "Direct connections with local planning commissions, utility districts, and municipal inspectors",
      "Tailored strategies for sellers, relocation buyers, custom builds, and expired listing turnarounds"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "oklahoma-city": {
    id: "oklahoma-city",
    slug: "/areas/oklahoma-city",
    category: "community",
    kicker: "METROPOLITAN CORE",
    title: "Oklahoma City Luxury Real Estate & Historic Enclaves",
    subtitle: "The cultural, economic, and architectural heartbeat of Oklahoma, featuring historic mansions, modern penthouse lofts, and premier golf estates.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Home Price", value: "$345,000" },
      { label: "Avg Days on Market", value: "14 Days" },
      { label: "Appreciation 5-Yr", value: "+38.4%" }
    ],
    overview: "Oklahoma City has transformed into one of the country's most vibrant sunbelt destinations. From the tree-canopied grand boulevards of Heritage Hills and Crown Heights to the contemporary high-rise penthouses of Midtown and the guarded fairways of Gaillardia, OKC offers unparalleled luxury value per square foot.",
    keyTakeaways: [
      "Dynamic urban renaissance with streetcar connectivity, Scissortail Park, and Michelin-caliber dining",
      "Prestigious historic preservation districts alongside world-class private and public schools",
      "Robust corporate economy anchored by energy, aerospace, biotechnology, and healthcare",
      "Unmatched price-to-luxury ratio compared to Dallas, Denver, or Austin"
    ],
    schools: [
      { name: "Casady School", type: "Private Independent (PK-12)", rating: "10/10 Gold Standard", dist: "Nichols Hills" },
      { name: "Heritage Hall", type: "Private College Prep (PK-12)", rating: "10/10 Academic Leader", dist: "North OKC" },
      { name: "Bishop McGuinness High School", type: "Private Catholic (9-12)", rating: "9/10 Acclaimed", dist: "Midtown / Central" },
      { name: "Classen School of Advanced Studies", type: "Public Magnet (6-12)", rating: "9/10 IB World School", dist: "Central OKC" }
    ],
    lifestyleHighlights: [
      "Midtown & Automobile Alley rooftop lounges and culinary scene",
      "Lake Hefner sailing, walking trails, and waterfront dining",
      "Paycom Center (NBA Oklahoma City Thunder)",
      "Oklahoma City Museum of Art & Civic Center Music Hall"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "edmond": {
    id: "edmond",
    slug: "/areas/edmond",
    category: "community",
    kicker: "PREMIER NORTH SUBURB",
    title: "Edmond Luxury Real Estate & Custom Acreage Living",
    subtitle: "Consistently ranked among America's best suburbs, Edmond delivers nationally acclaimed schools, championship golf, and sprawling private wooded estates.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Luxury Price", value: "$685,000" },
      { label: "School Feeder Rating", value: "10/10" },
      { label: "Avg Days on Market", value: "11 Days" }
    ],
    overview: "Located just north of Oklahoma City, Edmond is the crown jewel of family luxury living in central Oklahoma. Featuring celebrated golf communities like Oak Tree and Rose Creek, rolling wooded hills along the Covell Corridor, and vibrant downtown dining.",
    keyTakeaways: [
      "Top-tier public education across Edmond Public Schools and Deer Creek Schools",
      "Multiple guard-gated golf country club sanctuaries",
      "Spacious 1-to-5 acre wooded building envelopes with low property taxes",
      "Direct 20-minute commute to downtown Oklahoma City via Broadway Extension"
    ],
    schools: [
      { name: "Edmond Memorial High School", type: "Public (9-12)", rating: "10/10 National Blue Ribbon" },
      { name: "Edmond Santa Fe High School", type: "Public (9-12)", rating: "9/10 Academic Excellence" },
      { name: "Edmond North High School", type: "Public (9-12)", rating: "10/10 Blue Ribbon" },
      { name: "Deer Creek High School", type: "Public (9-12)", rating: "10/10 State Athletics & STEM" }
    ],
    lifestyleHighlights: [
      "Oak Tree National (Pete Dye Championship Golf Course)",
      "Downtown Edmond historic rail district, festivals & boutiques",
      "Arcadia Lake recreation, camping, and boat launch access",
      "Mitch Park & YMCA 280-acre athletic complex"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "nichols-hills": {
    id: "nichols-hills",
    slug: "/areas/nichols-hills",
    category: "community",
    kicker: "OKC'S MOST PRESTIGIOUS ZIP CODE",
    title: "Nichols Hills Premier Estates & Grand Enclaves",
    subtitle: "Oklahoma's most exclusive residential enclave, featuring multi-million dollar architectural masterpieces, 24/7 dedicated city police, and private country clubs.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Estate Price", value: "$1,380,000" },
      { label: "Police Response", value: "< 2 Mins" },
      { label: "Private Acreages", value: "Up to 3+ Ac" }
    ],
    overview: "Conceived by visionary developer G.A. Nichols in 1929, Nichols Hills was designed with wide curvilinear streets, expansive park medians, and strict architectural standards. It remains the preferred residence of Oklahoma's leading executives, doctors, and civic founders.",
    keyTakeaways: [
      "Independent municipality with its own dedicated police and fire departments",
      "Home to the prestigious Oklahoma City Golf & Country Club",
      "Walking distance to Nichols Hills Plaza and Classen Curve luxury shopping",
      "Highest historical appreciation and property value resilience in Oklahoma"
    ],
    schools: [
      { name: "Casady School", type: "Independent (PK-12)", rating: "10/10" },
      { name: "Nichols Hills Elementary", type: "Public (K-5)", rating: "9/10 Magnet" }
    ],
    lifestyleHighlights: [
      "Oklahoma City Golf & Country Club",
      "Nichols Hills Plaza upscale shopping and dining",
      "Grand Boulevard walking trails and shaded park sanctuaries"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "norman": {
    id: "norman",
    slug: "/areas/norman",
    category: "community",
    kicker: "UNIVERSITY & CULTURAL ENCLAVE",
    title: "Norman Real Estate, Golf Estates & University Living",
    subtitle: "Home to the University of Oklahoma, Norman merges college-town energy with affluent neighborhoods like Brookhaven, Hallbrooke, and Lake Thunderbird acreages.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$395,000" },
      { label: "Avg Days on Market", value: "17 Days" },
      { label: "Rental & Equity Yield", value: "High" }
    ],
    overview: "Norman is Oklahoma's third-largest city and intellectual core. Residents enjoy SEC football Saturdays, world-class research institutions, historic tree-lined avenues in Chautauqua, and serene waterfront living at Lake Thunderbird.",
    keyTakeaways: [
      "Vibrant cultural atmosphere with museums, music venues, and college athletics",
      "Top-rated Norman Public Schools and University of Oklahoma faculty communities",
      "Diverse housing stock from historic Tudor revival homes to custom modern estates"
    ],
    schools: [
      { name: "Norman North High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Norman High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Community Christian School", type: "Private (PK-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Gaylord Family Oklahoma Memorial Stadium (OU Sooners Football)",
      "Fred Jones Jr. Museum of Art",
      "Lake Thunderbird State Park boating and equestrian trails"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "yukon": {
    id: "yukon",
    slug: "/areas/yukon",
    category: "community",
    kicker: "WEST METRO EXPANSION",
    title: "Yukon Homes for Sale & Family Neighborhoods",
    subtitle: "A fast-growing west metro hub celebrated for Czech heritage, top-ranking school athletics, and swift access along I-40 and Kilpatrick Turnpike.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$335,000" },
      { label: "Avg Days on Market", value: "10 Days" },
      { label: "Feeder Rating", value: "9/10" }
    ],
    overview: "Known as the hometown of country music legend Garth Brooks, Yukon combines classic Oklahoma warmth with modern retail corridors and master-planned subdivisions like Surrey Hills and Stone Mill.",
    keyTakeaways: [
      "Rapid connection to Downtown OKC and Will Rogers Airport",
      "State-of-the-art high school athletic facilities and robotics programs",
      "Excellent value for single-family homes and half-acre parcels"
    ],
    schools: [
      { name: "Yukon High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Surrey Hills Elementary", type: "Public (K-5)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "Czech Hall & Annual Oklahoma Czech Festival",
      "Chisholm Trail Park & Christmas in the Park light display",
      "Express Clydesdales Barn & Welcome Center"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "piedmont": {
    id: "piedmont",
    slug: "/areas/piedmont",
    category: "community",
    kicker: "NORTHWEST ACREAGES",
    title: "Piedmont Rural Acreages & Custom Estate Communities",
    subtitle: "Scenic country skies, 1-to-5 acre homesites with outbuildings, and an academic powerhouse school district in northwest Canadian County.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Acreage Price", value: "$415,000" },
      { label: "Parcel Sizes", value: "1 - 5 Acres" },
      { label: "School Feeder", value: "10/10" }
    ],
    overview: "Piedmont is the premier choice for families who desire wide open spaces, shops, workshops, and custom home construction without sacrificing quick turnpike access to OKC and Edmond.",
    keyTakeaways: [
      "High academic standards across Piedmont Public Schools",
      "Zoning allows for workshops, equestrian barns, and detached garages",
      "Peaceful rural lifestyle with zero city hustle"
    ],
    schools: [
      { name: "Piedmont High School", type: "Public (9-12)", rating: "10/10" },
      { name: "Piedmont Intermediate", type: "Public (5-6)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Chester's Party Barn & Farm events",
      "Piedmont Founders Day parade and community sports",
      "Expansive sunset views and tranquil starry nights"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "mustang": {
    id: "mustang",
    slug: "/areas/mustang",
    category: "community",
    kicker: "SOUTHWEST METRO FAVORITE",
    title: "Mustang Real Estate & Community-First Neighborhoods",
    subtitle: "A close-knit southwest suburb known for outstanding school athletics, low municipal taxes, and rapidly appreciating family communities.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$320,000" },
      { label: "Avg Days on Market", value: "12 Days" },
      { label: "School Feeder", value: "9/10" }
    ],
    overview: "Mustang offers a blend of small-town safety with immediate proximity to Oklahoma City's employment corridors. Master-planned communities with community pools and half-acre lots make it a favorite for growing families.",
    keyTakeaways: [
      "Renowned Mustang High School athletics and fine arts",
      "Convenient access to Will Rogers World Airport and Tinker Air Force Base",
      "Affordable luxury new construction options"
    ],
    schools: [
      { name: "Mustang High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Horizon Intermediate School", type: "Public (5-6)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Wild Horse Park & Mustang Aquatics Center",
      "Annual Western Days festival",
      "Local dining along Highway 152"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "arcadia": {
    id: "arcadia",
    slug: "/areas/arcadia",
    category: "community",
    kicker: "HISTORIC ROUTE 66 & LAKE ENCLAVE",
    title: "Arcadia Equestrian Acreages & Lakefront Estates",
    subtitle: "Sprawling multi-acre forested tracts, equestrian compounds, and Lake Hiwassee retreats situated along historic Route 66 east of Edmond.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Estate Price", value: "$790,000" },
      { label: "Parcel Acreages", value: "2 - 20+ Ac" },
      { label: "School Rating", value: "9/10 Oakdale" }
    ],
    overview: "Where dramatic wooded topography meets luxury modern ranches. Arcadia provides privacy and nature while being just 12 minutes from Edmond's I-35 corridor.",
    keyTakeaways: [
      "Acclaimed Oakdale School District feeder",
      "Lake Hiwassee water recreation and private docks",
      "Architecturally significant modern custom builds on multi-acre parcels"
    ],
    schools: [
      { name: "Oakdale Public School", type: "Public (PK-8)", rating: "10/10 Gold Standard" },
      { name: "Edmond Memorial High School", type: "Public (9-12)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "Historic Round Barn on Route 66",
      "POPS 66 landmark dining & soda pavilion",
      "Lake Arcadia hiking, mountain biking, and watercraft"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "guthrie": {
    id: "guthrie",
    slug: "/areas/guthrie",
    category: "community",
    kicker: "TERRITORIAL CAPITAL",
    title: "Guthrie Historic Architecture & Country Ranches",
    subtitle: "Victorian brick downtown storefronts, Hollywood film backdrops, and expansive private acreage ranches in Logan County.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$380,000" },
      { label: "Historic District Size", value: "Largest in US" },
      { label: "Acreage Ranches", value: "5 - 80+ Ac" }
    ],
    overview: "As Oklahoma's first state capital, Guthrie features red-brick Victorian streets, historic boutique shopping, and sprawling country estates along the Cimarron River.",
    keyTakeaways: [
      "Largest National Historic Landmark District in the United States",
      "Expansive acreage properties at attractive price points per acre",
      "Thriving arts and festival community"
    ],
    schools: [
      { name: "Guthrie High School", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "Pollard Theatre & Historic Downtown Guthrie",
      "89er Days celebration",
      "Cimarron National Golf Club"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "moore": {
    id: "moore",
    slug: "/areas/moore",
    category: "community",
    kicker: "I-35 CORRIDOR HUB",
    title: "Moore Homes for Sale & Vibrant Parks System",
    subtitle: "Centrally positioned between OKC and Norman with premier municipal parks, state-of-the-art recreation centers, and steady equity growth.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$285,000" },
      { label: "Commute to OKC", value: "14 Mins" },
      { label: "Days on Market", value: "13 Days" }
    ],
    overview: "Moore is renowned for community pride, expansive park facilities like Buck Thomas Park, and effortless commuting to Tinker AFB and downtown OKC.",
    keyTakeaways: [
      "High affordability paired with strong appreciation fundamentals",
      "Comprehensive municipal services and parks infrastructure",
      "Highly regarded Moore Public Schools"
    ],
    schools: [
      { name: "Moore High School", type: "Public (9-12)", rating: "8/10" },
      { name: "Southmoore High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Westmoore High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "The Station at Central Park aquatic and fitness center",
      "Buck Thomas Park walking trails and skatepark",
      "Warren Theatres luxury cinema complex"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "midwest-city": {
    id: "midwest-city",
    slug: "/areas/midwest-city",
    category: "community",
    kicker: "AEROSPACE GATEWAY",
    title: "Midwest City Real Estate Near Tinker AFB",
    subtitle: "The aerospace capital of Oklahoma, offering established residential neighborhoods, mature oak shade, and immediate base proximity.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$265,000" },
      { label: "Tinker Commute", value: "5 Mins" },
      { label: "Rental Demand", value: "Very High" }
    ],
    overview: "Midwest City is directly adjacent to Tinker Air Force Base—the state's largest single-site employer. It offers solid mid-century homes and new construction pockets.",
    keyTakeaways: [
      "Recession-resistant aerospace employment foundation",
      "Short drive to Downtown OKC via I-40",
      "Rich park system and municipal golf"
    ],
    schools: [
      { name: "Carl Albert High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Midwest City High School", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "John Conrad Regional Golf Course",
      "Reed Conference Center",
      "Joe B. Barnes Regional Park"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "choctaw": {
    id: "choctaw",
    slug: "/areas/choctaw",
    category: "community",
    kicker: "EAST METRO WOODED ACREAGES",
    title: "Choctaw Acreages & Quiet Country Living",
    subtitle: "Rolling oak hills, spacious 1-to-5 acre homesites, and top-tier eastern schools with low traffic congestion.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$355,000" },
      { label: "Avg Lot Size", value: "2.1 Acres" },
      { label: "Feeder Rating", value: "9/10" }
    ],
    overview: "Choctaw gives families the opportunity to own significant wooded land while remaining within 25 minutes of central Oklahoma City.",
    keyTakeaways: [
      "Top-performing Choctaw-Nicoma Park School District",
      "Ideal for homeowners with boats, RVs, and custom workshops",
      "Peaceful canopy of native timber"
    ],
    schools: [
      { name: "Choctaw High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Choctaw Oktoberfest celebration",
      "Ten Acre Lake park",
      "Country living with city utilities"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "harrah": {
    id: "harrah",
    slug: "/areas/harrah",
    category: "community",
    kicker: "EAST METRO RURAL CORRIDOR",
    title: "Harrah Land & Custom Builds",
    subtitle: "Affordable country living, spacious acreage parcels, and expanding Kickapoo Turnpike connectivity.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$295,000" },
      { label: "Turnpike Access", value: "Direct" },
      { label: "Acreage Value", value: "High" }
    ],
    overview: "With the completion of the Kickapoo Turnpike, Harrah has become one of the fastest connecting rural suburbs in eastern Oklahoma County.",
    keyTakeaways: [
      "Accelerated commute to North OKC and I-44 via Kickapoo Turnpike",
      "Low property taxes and quiet neighborhoods",
      "Generous lot sizes and new construction developments"
    ],
    schools: [
      { name: "Harrah High School", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "Harrah Heritage Park amphitheater",
      "Annual Market in the Park",
      "Horses and livestock friendly acreages"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "blanchard": {
    id: "blanchard",
    slug: "/areas/blanchard",
    category: "community",
    kicker: "TRI-CITY HILL COUNTRY",
    title: "Blanchard Ranches & Winter Creek Golf Estates",
    subtitle: "Rolling topography south of the Canadian River, custom acreage homes, and championship golf at Winter Creek.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$360,000" },
      { label: "Winter Creek Golf", value: "18-Hole Championship" },
      { label: "Lot Sizes", value: "1 - 10+ Ac" }
    ],
    overview: "Blanchard delivers rolling hills and sweeping horizons. Highly desired for private ranches and luxury homes inside Winter Creek Golf Club.",
    keyTakeaways: [
      "Winter Creek Golf & Country Club luxury enclave",
      "Rapidly developing Tri-City commercial amenities",
      "Spacious custom acreage homes with workshops"
    ],
    schools: [
      { name: "Blanchard High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Winter Creek Golf Club",
      "Annual May Days festival",
      "Country sunsets and privacy"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "newcastle": {
    id: "newcastle",
    slug: "/areas/newcastle",
    category: "community",
    kicker: "SOUTH METRO BOOM CORRIDOR",
    title: "Newcastle Luxury Acreage Real Estate",
    subtitle: "One of Oklahoma's fastest growing cities, featuring modern custom estates on 1-to-3 acres just across the river from OKC.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$375,000" },
      { label: "Population Growth", value: "+32%" },
      { label: "School Feeder", value: "9/10" }
    ],
    overview: "Newcastle provides quick bridge access into downtown Oklahoma City and Norman, combining rural spaciousness with high-end transitional architecture.",
    keyTakeaways: [
      "Bridge connection via I-44 directly into south OKC",
      "Top-rated Newcastle Public Schools",
      "Spacious custom build neighborhoods with generous setbacks"
    ],
    schools: [
      { name: "Newcastle High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Newcastle Casino and entertainment",
      "South Lakes Regional Park adjacent",
      "Tri-City retail corridor"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "tuttle": {
    id: "tuttle",
    slug: "/areas/tuttle",
    category: "community",
    kicker: "WEST TRI-CITY ACREAGES",
    title: "Tuttle Country Estates & Agricultural Heritage",
    subtitle: "Sprawling family estates, Braum's Family Farm heritage, and championship high school athletics in Grady County.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$390,000" },
      { label: "State Athletics", value: "Powerhouse" },
      { label: "Lot Sizes", value: "2 - 15 Ac" }
    ],
    overview: "Tuttle provides large acreage living with a strong sense of community pride. Known for its championship wrestling and athletic traditions.",
    keyTakeaways: [
      "Exceptional Tuttle Public Schools athletic and academic prestige",
      "Generous lot dimensions and equestrian options",
      "Scenic countryside with clean prairie air"
    ],
    schools: [
      { name: "Tuttle High School", type: "Public (9-12)", rating: "9/10 State Champions" }
    ],
    lifestyleHighlights: [
      "Tiger Stadium Friday night football",
      "Braum's Family Farm headquarters",
      "Local ice cream and family farmers markets"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "bethany": {
    id: "bethany",
    slug: "/areas/bethany",
    category: "community",
    kicker: "COLLEGIATE & ROUTE 66 ENCLAVE",
    title: "Bethany Homes for Sale Near Southern Nazarene",
    subtitle: "A walkable university enclave featuring Route 66 culture, tree-lined quiet avenues, and excellent proximity to Lake Overholser.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$250,000" },
      { label: "Walkability", value: "Very High" },
      { label: "Lake Overholser", value: "5 Mins" }
    ],
    overview: "Bethany is an independent municipality inside the northwest OKC metro. Home to Southern Nazarene University and Children's Center Rehabilitation Hospital.",
    keyTakeaways: [
      "Southern Nazarene University campus atmosphere",
      "Route 66 historic corridor and nostalgic dining",
      "Minutes from Lake Overholser boat ramps and trails"
    ],
    schools: [
      { name: "Bethany High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Lake Overholser kayaking and trail system",
      "Route 66 vintage neon corridor",
      "Eldon Lyon Park"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "nicoma-park": {
    id: "nicoma-park",
    slug: "/areas/nicoma-park",
    category: "community",
    kicker: "EAST METRO ENCLAVE",
    title: "Nicoma Park Residential Real Estate",
    subtitle: "A peaceful eastern suburb offering spacious residential lots, mature trees, and direct feeder access to Choctaw schools.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$280,000" },
      { label: "Lot Sizes", value: "0.5 - 2 Ac" },
      { label: "School Feeder", value: "9/10" }
    ],
    overview: "Nicoma Park shares school districts with Choctaw while offering tranquil residential streets and convenient shopping along NE 23rd Street.",
    keyTakeaways: [
      "Choctaw-Nicoma Park school feeder",
      "Spacious yards with mature oak trees",
      "Convenient access to Tinker AFB and I-35"
    ],
    schools: [
      { name: "Nicoma Park Intermediate", type: "Public (3-5)", rating: "9/10" },
      { name: "Choctaw High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Tree-lined quiet neighborhoods",
      "Local community parks",
      "Quick trip to Midwest City shopping"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "warr-acres": {
    id: "warr-acres",
    slug: "/areas/warr-acres",
    category: "community",
    kicker: "NORTHWEST CENTRAL OKC",
    title: "Warr Acres Homes & Lake Hefner Proximity",
    subtitle: "Centrally located northwest metro enclave with mid-century architecture, diverse dining, and rapid Lake Hefner access.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$260,000" },
      { label: "Lake Hefner", value: "7 Mins" },
      { label: "Days on Market", value: "11 Days" }
    ],
    overview: "Warr Acres sits conveniently between NW 39th Expressway and Lake Hefner, delivering solid brick ranch construction and accessible pricing.",
    keyTakeaways: [
      "Close to Lake Hefner bike trails, parks, and golf",
      "Vibrant international culinary scene along NW 39th and MacArthur",
      "Solid brick ranch construction with generous yards"
    ],
    schools: [
      { name: "Putnam City High School", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "Lake Hefner golf and lake breezes",
      "Dolese Youth Park and disc golf",
      "Rapid connection to Northwest Expressway"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "the-village": {
    id: "the-village",
    slug: "/areas/the-village",
    category: "community",
    kicker: "HIGH-DEMAND MID-CENTURY",
    title: "The Village Homes for Sale & Modern Renovations",
    subtitle: "Surrounded by Nichols Hills and Lake Hefner, The Village is OKC's fastest appreciating mid-century renovation hot spot.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$345,000" },
      { label: "Avg Days on Market", value: "9 Days" },
      { label: "Appreciation 3-Yr", value: "+29.2%" }
    ],
    overview: "The Village has become the preferred neighborhood for young professionals and design enthusiasts seeking high-end renovated mid-century ranch homes.",
    keyTakeaways: [
      "Immediate proximity to Nichols Hills Plaza and Classen Curve",
      "Walking access to Lake Hefner trails and parks",
      "High-velocity bidding competition on turnkey renovated properties"
    ],
    schools: [
      { name: "The Village Elementary", type: "Public (K-5)", rating: "8/10" },
      { name: "John Marshall Enterprise High", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "Lake Hefner sunset dining and marina",
      "Trader Joe's and Whole Foods minutes away at Classen Curve",
      "Community parks and dog park"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "jones": {
    id: "jones",
    slug: "/areas/jones",
    category: "community",
    kicker: "NORTHEAST ACREAGE SANCTUARY",
    title: "Jones Country Acreages & Private Wooded Parcels",
    subtitle: "Serene country estates, equestrian land, and dark night skies just northeast of Edmond and Oklahoma City.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$325,000" },
      { label: "Lot Sizes", value: "2 - 20+ Ac" },
      { label: "Tranquility", value: "100%" }
    ],
    overview: "Jones delivers quiet country living with towering native trees, gravel roads, and sprawling acreage tracts while retaining easy access to the Turner Turnpike.",
    keyTakeaways: [
      "Spacious property envelopes ideal for equestrian or livestock hobbies",
      "Affordable acreage prices compared to North Edmond",
      "Close to Kickapoo Turnpike for fast north-south transit"
    ],
    schools: [
      { name: "Jones High School", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "Expansive starry skies and peaceful wildlife",
      "Proximity to Lake Arcadia recreational areas",
      "Country lifestyle with quick urban access"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "heritage-hills": {
    id: "heritage-hills",
    slug: "/areas/heritage-hills",
    category: "community",
    kicker: "HISTORIC PRESERVATION ENCLAVE",
    title: "Heritage Hills Historic Estates & Mansions",
    subtitle: "Oklahoma City's premier historic preservation district, showcasing grand 1920s architecture, tree-canopied boulevards, and century-old brick mansions.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$895,000" },
      { label: "Historic Designation", value: "National Register" },
      { label: "Downtown Commute", value: "4 Mins" }
    ],
    overview: "Heritage Hills was the original home of Oklahoma City's founding families, oil barons, and civic leaders. Today, it remains an architectural sanctuary protected by strict historical preservation covenants with restored Italianate, Georgian, and Tudor mansions.",
    keyTakeaways: [
      "Protected architectural district ensuring permanent character preservation",
      "Walking distance to Midtown rooftop dining, streetcars, and Scissortail Park",
      "Active neighborhood association maintaining private security patrols and tree-shaded parks",
      "Outstanding historic appreciation and resilient equity retention"
    ],
    schools: [
      { name: "Casady School", type: "Private (PK-12)", rating: "10/10 Gold Standard" },
      { name: "Wilson Elementary School", type: "Public Arts Integration (K-5)", rating: "9/10 Acclaimed" },
      { name: "Classen SAS High School", type: "Public Magnet (6-12)", rating: "10/10 IB World School" }
    ],
    lifestyleHighlights: [
      "Annual Heritage Hills Historic Homes Tour",
      "Overholser Mansion landmark and museum",
      "Midtown streetcar dining and cultural venues"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "gaillardia": {
    id: "gaillardia",
    slug: "/areas/gaillardia",
    category: "community",
    kicker: "24/7 GUARD-GATED LUXURY GOLF",
    title: "Gaillardia Golf Community & Country Club Estates",
    subtitle: "Oklahoma City's premier guard-gated golf country club sanctuary, featuring Arthur Hills championship golf, 55,000 sq ft French Normandy clubhouse, and private gated villas.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Estate Price", value: "$1,650,000" },
      { label: "Security", value: "24/7 Guard-Gated" },
      { label: "Championship Golf", value: "Arthur Hills 18" }
    ],
    overview: "Gaillardia offers unmatched security and resort-level privacy in northwest Oklahoma City. Set across 600 lush acres, the community features private lakes, manicured fairways, and multi-million dollar custom stone estates.",
    keyTakeaways: [
      "24-hour guarded security gate with electronic perimeter monitoring",
      "Arthur Hills-designed championship 18-hole golf course and private training facility",
      "55,000 sq ft clubhouse with formal dining, aquatic center, and tennis facilities",
      "Coveted feeder into top Edmond and northwest OKC academic schools"
    ],
    schools: [
      { name: "Deer Creek Schools", type: "Public (PK-12)", rating: "10/10 Academic Leader" },
      { name: "Casady School", type: "Private Independent (PK-12)", rating: "10/10" },
      { name: "Crossings Christian School", type: "Private Christian (PK-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Private Gaillardia Country Club championship golf and pro shop",
      "Resort-style infinity pool, cabanas, and fitness pavilion",
      "Wine tasting dinners and executive networking events"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "crown-heights": {
    id: "crown-heights",
    slug: "/areas/crown-heights",
    category: "community",
    kicker: "HISTORIC URBAN SANCTUARY",
    title: "Crown Heights Historic District Real Estate",
    subtitle: "Charming stone cottages, Spanish and Tudor revivals, and deep-porch living along OKC's Western Avenue gourmet corridor.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$575,000" },
      { label: "Avg Days on Market", value: "12 Days" },
      { label: "Western Ave Proximity", value: "Walking Distance" }
    ],
    overview: "Built predominantly in the 1930s, Crown Heights is celebrated for architectural variety, mature tree canopies, and vibrant community spirit. Steps from Western Avenue's celebrated culinary strip.",
    keyTakeaways: [
      "Enchanting mix of Tudor Revival, Spanish Colonial, and French Eclectic architecture",
      "Crown Heights Park hosting annual Fourth of July parades and music festivals",
      "Immediate proximity to Western Avenue dining and Classen Curve shopping",
      "High equity resilience with sustained buyer demand"
    ],
    schools: [
      { name: "Bishop McGuinness High School", type: "Private Catholic (9-12)", rating: "9/10 Acclaimed" },
      { name: "Wilson Elementary", type: "Public Arts Focus (K-5)", rating: "9/10" },
      { name: "Classen SAS", type: "Public Magnet (6-12)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "Western Avenue antique shops, bakeries, and gourmet bistros",
      "Crown Heights Park tennis courts and central green space",
      "Short 8-minute commute to downtown OKC financial district"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "downtown-midtown": {
    id: "downtown-midtown",
    slug: "/areas/downtown-midtown",
    category: "community",
    kicker: "URBAN SKYLINE & PENTHOUSES",
    title: "Downtown & Midtown OKC Luxury Condos & Lofts",
    subtitle: "High-rise luxury penthouses, historic brick townhomes, modern loft spaces, and Michelin-rated dining in the urban epicenter.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Penthouse", value: "$620,000" },
      { label: "Walk Score", value: "92 Walkers Paradise" },
      { label: "Streetcar Transit", value: "Full Connectivity" }
    ],
    overview: "Downtown and Midtown Oklahoma City provide the premier urban live-work-play address. With streetcar access, Scissortail Park, and rooftop lounges, this district draws top executives and creative entrepreneurs.",
    keyTakeaways: [
      "Skyline panoramic views, private garage parking, and concierge living",
      "Automobile Alley historic industrial lofts and contemporary rowhouses",
      "Walking access to Paycom Center for NBA Oklahoma City Thunder games",
      "Strong corporate relocation executive demand"
    ],
    schools: [
      { name: "Classen SAS Middle & High", type: "Public Magnet (6-12)", rating: "10/10" },
      { name: "John Rex Charter Elementary", type: "Public Charter (PK-5)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Scissortail Park 70-acre botanical gardens and concert stage",
      "Midtown rooftop cocktail lounges and Michelin-guide chef dining",
      "Oklahoma City Museum of Art and Civic Center performances"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "quail-creek": {
    id: "quail-creek",
    slug: "/areas/quail-creek",
    category: "community",
    kicker: "FAIRWAY GOLF SANCTUARY",
    title: "Quail Creek Golf Club Real Estate & Homes",
    subtitle: "Sprawling golf course homes, classic mid-century transitional architecture, mature shade trees, and active country club living in northwest OKC.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$540,000" },
      { label: "Avg Days on Market", value: "16 Days" },
      { label: "Country Club Golf", value: "18-Hole Championship" }
    ],
    overview: "Established around the prestigious Quail Creek Golf & Country Club, this neighborhood is celebrated for wide lots, golf cart lifestyle, and swift Kilpatrick Turnpike connectivity.",
    keyTakeaways: [
      "Quail Creek Golf & Country Club with championship greens and tennis",
      "Generous third-acre to half-acre manicured residential parcels",
      "Convenient access to Lake Hefner and Chisholm Creek entertainment district",
      "High family retention and sustained multi-generational equity"
    ],
    schools: [
      { name: "Quail Creek Elementary", type: "Public (K-5)", rating: "8/10" },
      { name: "Crossings Christian School", type: "Private (PK-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Quail Creek Country Club junior Olympic pool and golf programs",
      "Lake Hefner sailing and cycling trails 5 minutes south",
      "Chisholm Creek outdoor dining, Topgolf, and shopping hub"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "edmond-oakdale": {
    id: "edmond-oakdale",
    slug: "/areas/edmond-oakdale",
    category: "community",
    kicker: "10/10 ACADEMIC GOLD STANDARD",
    title: "Edmond & Oakdale Corridor Luxury Real Estate",
    subtitle: "Nationally acclaimed 10/10 schools, rolling wooded topography, luxury acreage estates, and vibrant downtown Edmond rail district living.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Luxury Price", value: "$685,000" },
      { label: "Oakdale Feeder", value: "10/10 Gold Standard" },
      { label: "Avg Days on Market", value: "15 Days" }
    ],
    overview: "The prestigious corridor uniting East Edmond and Oakdale represents central Oklahoma's most desired family address. Offering private wooded acreages and elite public and private schooling.",
    keyTakeaways: [
      "Celebrated Oakdale and Edmond school districts with unmatched academic honors",
      "Private 1-to-5 acre wooded estate parcels with low Logan/Oklahoma County tax burdens",
      "Minutes from Arcadia Lake recreation and I-35 regional transit corridor",
      "Consistently ranked among America's safest and highest-appreciating suburbs"
    ],
    schools: [
      { name: "Oakdale Elementary & Middle", type: "Public (PK-8)", rating: "10/10 Gold Standard" },
      { name: "Edmond Memorial High School", type: "Public (9-12)", rating: "10/10 Blue Ribbon" }
    ],
    lifestyleHighlights: [
      "Arcadia Lake trails, horseback riding, and fishing",
      "Downtown Edmond historic rail district boutique dining",
      "Mitch Park & YMCA 280-acre multi-sport complex"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "deer-creek": {
    id: "deer-creek",
    slug: "/areas/deer-creek",
    category: "community",
    kicker: "MASTER-PLANNED CUSTOM LUXURY",
    title: "Deer Creek School District Real Estate & Custom Builds",
    subtitle: "Premier destination for luxury new construction, young professional families, and state champion academic and athletic programs in northwest Edmond.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$520,000" },
      { label: "Feeder Rating", value: "10/10 Academic Leader" },
      { label: "Avg Days on Market", value: "11 Days" }
    ],
    overview: "Deer Creek represents the primary high-growth luxury corridor for Northwest Edmond. Drawing executive families seeking master-planned communities, resort amenities, and modern transitional floorplans.",
    keyTakeaways: [
      "Acclaimed Deer Creek Public Schools with top athletic championships and STEM scores",
      "Master-planned neighborhoods featuring community pools, walking trails, and lakes",
      "Fast access to Kilpatrick Turnpike, Mercy Hospital, and Paycom campus",
      "Tremendous appreciation and resale velocity on turnkey custom homes"
    ],
    schools: [
      { name: "Deer Creek High School", type: "Public (9-12)", rating: "10/10 State Athletics & STEM" },
      { name: "Deer Creek Middle School", type: "Public (7-8)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "Deer Creek community athletics complexes and Friday night lights",
      "Fast access to Rose Creek and Gaillardia private golf clubs",
      "Covell Corridor shopping and family medical centers"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "oak-tree": {
    id: "oak-tree",
    slug: "/areas/oak-tree",
    category: "community",
    kicker: "PGA CHAMPIONSHIP PETE DYE GREENS",
    title: "Oak Tree Golf & Country Club Luxury Estates",
    subtitle: "Two Pete Dye championship 36-hole golf courses, PGA Tour pedigree, 24-hr guarded gate, and sprawling custom stone architecture in North Edmond.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Luxury Price", value: "$1,150,000" },
      { label: "Pete Dye Championship", value: "36 Holes" },
      { label: "Guarded Security", value: "24/7 Gated" }
    ],
    overview: "A legendary golf enclave that has hosted major PGA championships and Senior PGA tours. Oak Tree provides multi-million dollar custom residences set against mature wooded fairways and water hazards.",
    keyTakeaways: [
      "Two Pete Dye championship 18-hole courses: Oak Tree National & Oak Tree Country Club",
      "24-hour guarded security entrance with dedicated perimeter patrols",
      "World-class private tennis pavilion, Olympic pool, and private dining rooms",
      "Premier North Edmond location with unmatched address prestige"
    ],
    schools: [
      { name: "Edmond North High School", type: "Public (9-12)", rating: "10/10 Blue Ribbon" },
      { name: "Sequoyah Middle School", type: "Public (6-8)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "Oak Tree National elite championship golf experience",
      "Country club social events, wine dinners, and junior golf academies",
      "Scenic walking paths and golf-cart friendly streets"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "arcadia-hiwassee": {
    id: "arcadia-hiwassee",
    slug: "/areas/arcadia-hiwassee",
    category: "community",
    kicker: "LAKE & EQUESTRIAN ACREAGES",
    title: "Arcadia & Lake Hiwassee Waterfront & Acreage Estates",
    subtitle: "Equestrian acreage estates, Route 66 historic charm, water sports, and tranquil forested retreats just 15 minutes east of I-35.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$790,000" },
      { label: "Lot Sizes", value: "2 - 40+ Ac" },
      { label: "Lake Proximity", value: "Waterfront Access" }
    ],
    overview: "Where scenic country expanse meets modern architectural luxury. Arcadia and Lake Hiwassee offer expansive multi-acre wooded compounds with private horse stables, docks, and scenic privacy.",
    keyTakeaways: [
      "Rare private lakefront lots and equestrian-zoned multi-acre tracts",
      "Oakdale and Edmond school feeder zones",
      "Iconic Route 66 landmarks including POPS 66 and the Historic Round Barn",
      "Fast commute into Edmond and North OKC via Route 66 and Covell Rd"
    ],
    schools: [
      { name: "Oakdale Public School", type: "Public (PK-8)", rating: "10/10" },
      { name: "Edmond Memorial High School", type: "Public (9-12)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "Private skiing, fishing, and boating on Lake Hiwassee",
      "Spring Creek and Arcadia Lake equestrian trail networks",
      "Tranquil starry skies without urban light pollution"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "guthrie-historic": {
    id: "guthrie-historic",
    slug: "/areas/guthrie-historic",
    category: "community",
    kicker: "VICTORIAN ARCHITECTURE & RANCHES",
    title: "Guthrie Historic Enclave & Country Acreage Ranches",
    subtitle: "Territorial capital architecture, antique stores, sprawling country ranches, and equestrian tracts along the scenic Cimarron River.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$380,000" },
      { label: "Historic Landmark", value: "Largest in US" },
      { label: "Avg Days on Market", value: "28 Days" }
    ],
    overview: "Oklahoma's first state capital provides majestic red-brick Victorian downtown blocks, antique shops, and film-production backdrops alongside expansive private acreage properties.",
    keyTakeaways: [
      "Largest National Historic Landmark District in the United States",
      "Generous acreage properties with horse barns, shops, and ponds",
      "Thriving arts, theater, and annual frontier festivals",
      "Direct 20-minute north drive into Edmond along I-35"
    ],
    schools: [
      { name: "Guthrie High School", type: "Public (9-12)", rating: "8/10" }
    ],
    lifestyleHighlights: [
      "Historic downtown Guthrie Pollard Theatre performances",
      "Cimarron National Golf Club and country recreation",
      "89er Days celebration and frontier parades"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "twin-bridges": {
    id: "twin-bridges",
    slug: "/areas/twin-bridges",
    category: "community",
    kicker: "COVELL CORRIDOR RESORT COMMUNITY",
    title: "Twin Bridges & Covell Corridor Luxury Real Estate",
    subtitle: "Master-planned amenity pools, walking trails, clubhouse, and modern transitional architecture in Edmond's high-demand north corridor.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$625,000" },
      { label: "Avg Days on Market", value: "14 Days" },
      { label: "Edmond Schools", value: "10/10 Feeder" }
    ],
    overview: "Twin Bridges combines neighborhood walkability, lake views, resort pool amenities, and modern transitional architecture with Edmond's premier school feeder routes.",
    keyTakeaways: [
      "Resort community clubhouse, aquatic center, and scenic walking trails",
      "Minutes from Covell retail centers, dining, and Interstate 35",
      "Feeder into top-ranked Edmond Public Schools",
      "High family retention and strong resale equity appreciation"
    ],
    schools: [
      { name: "Edmond Memorial High School", type: "Public (9-12)", rating: "10/10" },
      { name: "Central Middle School", type: "Public (6-8)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Twin Bridges clubhouse and community social events",
      "Mitch Park sports complex and ice rink 5 minutes west",
      "Covell Village shopping and artisan cafes"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "rose-creek": {
    id: "rose-creek",
    slug: "/areas/rose-creek",
    category: "community",
    kicker: "GUARD-GATED ARTHUR HILLS GOLF",
    title: "Rose Creek Golf Community & Country Club Living",
    subtitle: "Guard-gated Arthur Hills 18-hole golf, aquatic park, modern clubhouse dining, and contemporary luxury design in Edmond/Deer Creek.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$920,000" },
      { label: "Security", value: "24/7 Guard-Gated" },
      { label: "Arthur Hills Golf", value: "Championship 18" }
    ],
    overview: "Elite guard-gated haven with dramatic custom architecture, resort fitness facilities, aquatic park, and vibrant country club dining on the fairways.",
    keyTakeaways: [
      "24-hour guarded security with controlled visitor access",
      "Arthur Hills championship 18-hole links golf course",
      "Resort clubhouse with full-service bar, restaurant, and aquatic complex",
      "Exceptional academic feeder options across Edmond and Deer Creek"
    ],
    schools: [
      { name: "Deer Creek High School", type: "Public (9-12)", rating: "10/10" },
      { name: "Edmond North High School", type: "Public (9-12)", rating: "10/10" }
    ],
    lifestyleHighlights: [
      "The Club at Rose Creek golf tournaments and dining",
      "Resort-style aquatic center with children's splash pad",
      "Fitness center with personal training and group classes"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "norman-university": {
    id: "norman-university",
    slug: "/areas/norman-university",
    category: "community",
    kicker: "OU CAMPUS & BROOKHAVEN ENCLAVE",
    title: "Norman & University Enclave Luxury Real Estate",
    subtitle: "Historic Chautauqua avenues, prestigious Brookhaven golf living, Lake Thunderbird retreats, and SEC game-day energy in Norman.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$395,000" },
      { label: "Avg Days on Market", value: "17 Days" },
      { label: "Campus Feeder", value: "OU Research Tier 1" }
    ],
    overview: "Home to the University of Oklahoma, Norman merges college-town intellect with affluent enclaves like Brookhaven, Hallbrooke, and private wooded properties.",
    keyTakeaways: [
      "Historic Chautauqua avenues with protected pre-war architectural estates",
      "Brookhaven Country Club golf community on Norman's affluent west side",
      "Top-tier research faculty, healthcare, and engineering career hubs",
      "Dynamic cultural lifestyle with museums, arts, and SEC athletics"
    ],
    schools: [
      { name: "Norman North High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Norman High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "OU Sooners game day at Gaylord Family Oklahoma Memorial Stadium",
      "Sam Noble Oklahoma Museum of Natural History",
      "Brookhaven Square upscale dining and boutiques"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "midwest-city-choctaw": {
    id: "midwest-city-choctaw",
    slug: "/areas/midwest-city-choctaw",
    category: "community",
    kicker: "AEROSPACE & WOODED ACREAGES",
    title: "Midwest City & Choctaw Acreage Real Estate",
    subtitle: "Tinker Air Force Base aerospace career convenience combined with scenic wooded acreages, private shops, and quiet eastern country living.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$310,000" },
      { label: "Lot Dimensions", value: "1 - 10+ Ac" },
      { label: "Tinker AFB Commute", value: "8 Mins" }
    ],
    overview: "A blend of aerospace career stability and scenic rolling oak acreages. Offering lower density, spacious shop-friendly properties, and top Choctaw-Nicoma Park schools.",
    keyTakeaways: [
      "Proximity to Tinker Air Force Base—the largest single-site employer in Oklahoma",
      "Spacious wooded residential parcels permitting workshops and outbuildings",
      "Highly regarded Choctaw-Nicoma Park academic and athletic programs",
      "Peaceful country feel with fast I-40 and Kickapoo Turnpike connections"
    ],
    schools: [
      { name: "Choctaw High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Carl Albert High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Choctaw Creek Golf Course and nature trails",
      "Annual Oktoberfest festival in Choctaw",
      "Spacious wooded acreage with dark night skies"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "blanchard-newcastle": {
    id: "blanchard-newcastle",
    slug: "/areas/blanchard-newcastle",
    category: "community",
    kicker: "HILL COUNTRY RANCHES & GOLF",
    title: "Blanchard & Newcastle Luxury Acreages & Winter Creek",
    subtitle: "Custom acreage properties with workshops, championship golf at Winter Creek, scenic hill country vistas, and rapid bridge access to OKC.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Median Price", value: "$360,000" },
      { label: "Lot Sizes", value: "1 - 15+ Ac" },
      { label: "Winter Creek Golf", value: "18-Hole Championship" }
    ],
    overview: "Fastest-growing rural-suburban corridors south of the Canadian River, celebrated for custom acreage homes, equestrian ranches, and golf communities like Winter Creek.",
    keyTakeaways: [
      "Scenic rolling hill country topography with panoramic horizons",
      "Winter Creek Golf & Country Club championship 18-hole course",
      "Generous acreage parcels accommodating custom workshops and horse barns",
      "Convenient multi-lane highway commute into South OKC and Norman"
    ],
    schools: [
      { name: "Newcastle High School", type: "Public (9-12)", rating: "9/10" },
      { name: "Blanchard High School", type: "Public (9-12)", rating: "9/10" }
    ],
    lifestyleHighlights: [
      "Winter Creek Golf & Country Club dining and tournaments",
      "Tri-City retail amenities and regional parks",
      "Breathtaking Oklahoma country sunsets"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

export const AUDIENCE_PAGES: Record<string, InteriorPageData> = {
  "sellers": {
    id: "sellers",
    slug: "/sellers",
    category: "audience",
    kicker: "SELLER BLUEPRINT ROADMAP",
    title: "Sell for Top Dollar: The Brian Jamison Roadmap",
    subtitle: "A proven, systematic selling machine designed to eliminate seller stress, attract qualified buyers, and command top market value.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Volume Sold", value: "$70M+" },
      { label: "List-to-Sale Ratio", value: "98.4%" },
      { label: "Career Closings", value: "370+" }
    ],
    overview: "Selling your home should never be a gamble. Brian Jamison deploys a 6-phase marketing machine, cinema-grade video, 3D tours, and hard-nosed negotiation to ensure you walk away with maximum net proceeds.",
    keyTakeaways: [
      "Complete home prep and high-ROI pre-listing staging recommendations",
      "Bespoke 4K cinematic video, drone flyovers, and Matterport 3D tours",
      "Paid hyper-targeted social ad campaigns retargeting pre-approved buyers",
      "100% Risk-Free Cancel-Anytime Listing Guarantee"
    ],
    deliverables: [
      { title: "Pre-Listing Home Audit", desc: "Inspection preview to address deal-killer objections before buyers arrive." },
      { title: "Targeted Search Calibration", desc: "Pricing strategically beneath active buyer search thresholds." },
      { title: "Global Syndication", desc: "Listing syndicated to 350+ portals worldwide within 24 hours." },
      { title: "Firm Escrow Defense", desc: "Vigorous negotiation during inspections, appraisal review, and closing." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "expired-listings": {
    id: "expired-listings",
    slug: "/expired-listings",
    category: "audience",
    kicker: "TURNAROUND PROTOCOL",
    title: "Expired Listing Turnaround Protocol",
    subtitle: "Did your home sit on the market without selling? Brian Jamison diagnoses MLS stagnation and relaunches with uncompromised momentum.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Turnaround Escrow", value: "21 Days Avg" },
      { label: "Failure Diagnosis", value: "48 Hours" },
      { label: "Media Overhaul", value: "100%" }
    ],
    overview: "When a home expires, 90% of the time the issue is not the property itself—it is poor photography, passive MLS placement, and zero proactive outreach. Brian identifies the friction points and engineers a rapid sale.",
    keyTakeaways: [
      "Rigorous 48-hour diagnostic of why your previous agent failed to produce offers",
      "Total visual overhaul: complete retake with 4K drone, HDR lighting, and staging adjustments",
      "Strategic pricing recalibration beneath active buyer search brackets",
      "Direct outreach to every agent who showed the home previously with updated terms"
    ],
    deliverables: [
      { title: "Listing Autopsy", desc: "Detailed breakdown of previous showing agent feedback and traffic bottlenecks." },
      { title: "Fresh MLS Reset", desc: "Full relaunch as an active new listing rather than a stale property." },
      { title: "Direct Broker Blitz", desc: "Phone calls to top 50 active luxury agents in your micro-market." },
      { title: "No Upfront Cost", desc: "Brian covers 100% of the new media production costs upfront." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "first-time-buyers": {
    id: "first-time-buyers",
    slug: "/first-time-buyers",
    category: "audience",
    kicker: "BUYER EMPOWERMENT",
    title: "First-Time Homebuyer Blueprint",
    subtitle: "Navigate mortgage options, inspection pitfalls, and closing costs with patience, transparency, and expert guidance.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Buyer Agent Fee", value: "Zero to Buyer" },
      { label: "Inspection Defended", value: "100%" },
      { label: "Closing Guidance", value: "Step-by-Step" }
    ],
    overview: "Purchasing your first home is one of the most exciting financial milestones of your life. Brian Jamison acts as your trusted fiduciary, ensuring you never overpay and protecting your earnest money deposit.",
    keyTakeaways: [
      "Plain-English explanation of pre-approval, down payments, and closing costs",
      "Thorough home inspections protecting you against hidden foundation or HVAC issues",
      "Access to off-market inventory and coming-soon MLS properties",
      "Calm, patient guidance through every paragraph of the purchase contract"
    ],
    deliverables: [
      { title: "Buyer Consultation", desc: "One-on-one session mapping your budget, lifestyle, and neighborhood priorities." },
      { title: "Mortgage Alliance", desc: "Introductions to Oklahoma's most trusted local lenders with zero surprise fees." },
      { title: "Private Showings", desc: "Accompanied tours where Brian checks roof age, plumbing, and structural integrity." },
      { title: "Offer Strategy", desc: "Crafting offers designed to win in multiple-bid scenarios without overpaying." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "luxury-buyers": {
    id: "luxury-buyers",
    slug: "/luxury-buyers",
    category: "audience",
    kicker: "PRIVATE CONCIERGE",
    title: "Luxury & Experienced Buyer Concierge",
    subtitle: "Discreet acquisitions, off-market private pocket listings, and white-glove advisory for prominent families and executives.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Off-Market Access", value: "Exclusive" },
      { label: "NDA Privacy", value: "Guaranteed" },
      { label: "Top 2% Producer", value: "Statewide" }
    ],
    overview: "High-net-worth buyers require discretion, architectural discernment, and off-market broker access. Brian Jamison provides confidential executive search services across Nichols Hills, Gaillardia, Oak Tree, and Lake Arcadia.",
    keyTakeaways: [
      "Strict confidentiality and NDA execution for public figures and executives",
      "Direct access to unlisted private pocket listings before they reach the public MLS",
      "Architectural evaluation of custom millwork, smart home systems, and structural integrity",
      "Coordination of private escrow, estate attorneys, and wealth advisory teams"
    ],
    deliverables: [
      { title: "Confidential Search", desc: "Curated portfolio of trophy properties matched strictly to your criteria." },
      { title: "Private Broker Pitch", desc: "Reaching out directly to homeowners of target unlisted properties." },
      { title: "Architectural Audit", desc: "Review of builder pedigree, mechanicals, and structural warranties." },
      { title: "Discreet Escrow Closing", desc: "Structuring purchases through private trusts or LLC entities." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "custom-builds": {
    id: "custom-builds",
    slug: "/custom-builds",
    category: "audience",
    kicker: "NEW CONSTRUCTION ADVISORY",
    title: "Custom Builds & New Construction Advisory",
    subtitle: "From homesite acquisition and builder vetting to floor plan reviews and construction milestone inspections.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Builder Partners", value: "18+ Premier" },
      { label: "Build Milestones", value: "Inspected" },
      { label: "Spec Savings", value: "$45k+ Avg" }
    ],
    overview: "Building a custom estate is a multi-month endeavor with hundreds of design choices. Brian Jamison acts as your independent builder advocate, protecting your timeline, budget, and resale equity.",
    keyTakeaways: [
      "Independent representation with zero loyalty to builder sales reps",
      "Comprehensive vetting of builder track records, warranties, and finish quality",
      "Assistance with lot acquisition, soil testing, and utility tap feasibility",
      "Milestone site walkthroughs during framing, plumbing, electrical, and pre-drywall stages"
    ],
    deliverables: [
      { title: "Homesite Selection", desc: "Analyzing topography, sun orientation, drainage, and HOA design guidelines." },
      { title: "Contract Negotiation", desc: "Scrutinizing builder escalation clauses, allowances, and completion deadlines." },
      { title: "Framing Walkthrough", desc: "Verifying electrical locations, HVAC runs, and structural framing." },
      { title: "Final Punch-List Audit", desc: "Rigorous blue-tape inspection before releasing final construction funds." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "fsbo": {
    id: "fsbo",
    slug: "/fsbo",
    category: "audience",
    kicker: "PARTNERSHIP PROTOCOL",
    title: "For Sale By Owner (FSBO) Partnership",
    subtitle: "Thinking of selling on your own? Access professional contracts, MLS exposure, and legal paperwork with zero pressure.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "FSBO Price Lift", value: "+16% Avg" },
      { label: "Legal Compliance", value: "100%" },
      { label: "Pressure", value: "Zero" }
    ],
    overview: "Selling on your own is tempting, but unrepresented sellers often fall victim to tire-kickers, lowball investors, and legal liability. Brian Jamison offers unbundled support or full representation with a cancel-anytime guarantee.",
    keyTakeaways: [
      "Complimentary Comparative Market Analysis (CMA) so you don't underprice your asset",
      "Access to standard Oklahoma Real Estate Commission (OREC) legally compliant disclosure forms",
      "Guidance on buyer pre-qualification so you don't invite unqualified strangers into your home",
      "Option to partner on a 1-day showing agreement if Brian brings a qualified buyer"
    ],
    deliverables: [
      { title: "Free Pricing Audit", desc: "Comprehensive review of recent comps and neighborhood absorption rates." },
      { title: "OREC Disclosure Pack", desc: "Mandatory state disclosures covering lead paint, property condition, and title." },
      { title: "Buyer Vetting Protocol", desc: "Checklist for verifying proof of funds or mortgage approval letters." },
      { title: "Backup Representation", desc: "Option to transition to full representation with 100% risk-free cancel-anytime guarantee." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

export const BRAND_PAGES: Record<string, InteriorPageData> = {
  "about": {
    id: "about",
    slug: "/about",
    category: "brand",
    kicker: "LEADERSHIP & ETHOS",
    title: "About Brian Jamison & Salt Real Estate",
    subtitle: "A former collegiate athlete bringing uncompromising work ethic, data-driven pricing, and seven-day accessibility to Oklahoma City luxury real estate.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Career Volume", value: "$70M+" },
      { label: "Career Closings", value: "370+" },
      { label: "Statewide Rank", value: "Top 2%" }
    ],
    overview: "Brian Jamison operates with an athlete's discipline. License #184931. Operating as Jamison Real Estate in Edmond, Brian has built a reputation for relentless client advocacy, creative marketing, and transparent communication.",
    keyTakeaways: [
      "Top 2% Real Estate Producer statewide with over $70 Million in closed career volume",
      "Collegiate athletic pedigree driving a relentless work ethic and meticulous preparation",
      "Direct personal availability 7 days a week with zero corporate runaround",
      "Located at 1508 W. Edmond Rd., Edmond, Oklahoma"
    ],
    deliverables: [
      { title: "Athletic Discipline", desc: "Early mornings, daily prospect calls, and constant market studying." },
      { title: "Data-Driven Decisions", desc: "No guesswork or emotional missteps—pricing backed by hard market stats." },
      { title: "Total Alignment", desc: "Your financial interests always come ahead of commissions." }
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "seller-blueprint": {
    id: "seller-blueprint",
    slug: "/seller-blueprint",
    category: "brand",
    kicker: "PROPRIETARY 6-STEP MACHINE",
    title: "The 6-Step Seller Blueprint Machine",
    subtitle: "Every service, deliverable, and guarantee engineered into a single repeatable system that sells your home for top dollar.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Blueprint Phases", value: "6 Steps" },
      { label: "Key Deliverables", value: "30+ Actions" },
      { label: "Risk Guarantee", value: "100% Free" }
    ],
    overview: "Most real estate agents stick a sign in the yard, upload a few dark photos to the MLS, and pray for another agent to bring a buyer. Brian Jamison operates a proactive 6-phase marketing machine designed to trigger bidding wars.",
    keyTakeaways: [
      "Phase 1: Cinema-grade 4K media, drone mapping, 3D Matterport, and 350+ portal distribution",
      "Phase 2: Mandatory showing feedback within 2 hours and weekly traffic analytics",
      "Phase 3: 24/7 direct cell phone reachability 7 days a week",
      "Phase 4: 7-person specialized transaction support team",
      "Phase 5: 3-tier data-driven pricing architecture calibrated for competition",
      "Phase 6: 100% Risk-Free Cancel-Anytime Listing Guarantee"
    ],
    deliverables: TEN_LISTING_STANDARDS_DELIVERABLES,
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "listings": {
    id: "listings",
    slug: "/listings",
    category: "brand",
    kicker: "ACTIVE PORTFOLIO",
    title: "Active & Featured Luxury Listings",
    subtitle: "Explore current properties exclusively represented by Brian Jamison across Nichols Hills, Edmond, Gaillardia, and Lake Arcadia.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Active Volume", value: "$8.4M" },
      { label: "Matterport 3D", value: "Included" },
      { label: "Private Tours", value: "Available" }
    ],
    overview: "Every property represented by Brian Jamison receives full cinema treatment, architectural photography, and global syndication. Browse current listings or schedule a private showing.",
    keyTakeaways: [
      "High-definition architectural tours and interactive 3D dollhouse floorplans",
      "Detailed property specifications including HOA rules, school feeder zones, and lot dimensions",
      "Direct showing concierge scheduling directly through Brian's private desk"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "past-sales": {
    id: "past-sales",
    slug: "/past-sales",
    category: "brand",
    kicker: "VERIFIED TRACK RECORD",
    title: "$70M+ Past Sales Track Record",
    subtitle: "Over 370+ career closings across central Oklahoma. Explore our history of record-setting prices and rapid days-on-market.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Career Volume", value: "$70M+" },
      { label: "Total Closings", value: "370+" },
      { label: "Avg Escrow", value: "11 Days" }
    ],
    overview: "Results matter. Brian Jamison's track record is backed by public MLS records, client testimonials, and continuous recognition as a Top 2% Producer in Oklahoma.",
    keyTakeaways: [
      "Multiple record-setting neighborhood sales in Nichols Hills and Edmond",
      "Average list-to-sale price ratio exceeding 98.4%",
      "Consistent 5-star verified reviews from doctors, attorneys, and executives"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "reviews": {
    id: "reviews",
    slug: "/reviews",
    category: "brand",
    kicker: "CLIENT EXPERIENCES",
    title: "Verified Client Reviews & Testimonials",
    subtitle: "Read authentic experiences from homeowners and buyers who trusted Brian Jamison with their real estate transactions.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Google Rating", value: "5.0 ★" },
      { label: "Repeat & Referral", value: "84%" },
      { label: "Verified Reviews", value: "100%" }
    ],
    overview: "Real estate is a relationship built on trust, transparency, and execution. Read firsthand how Brian's 6-step blueprint delivers results without anxiety.",
    keyTakeaways: [
      "100% five-star rating across Google, Zillow, and client surveys",
      "Praise for rapid showing feedback, negotiation firmness, and patience",
      "Seamless relocations handled for families moving from California, Texas, and New York"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "home-valuation": {
    id: "home-valuation",
    slug: "/home-valuation",
    category: "brand",
    kicker: "CONFIDENTIAL APPRAISAL",
    title: "Confidential Market Valuation & CMA Dossier",
    subtitle: "Request an accurate 3-tier valuation report calibrated against hyper-local pending comps, absorption velocity, and land value.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Valuation Tiers", value: "3 Levels" },
      { label: "Turnaround", value: "< 24 Hours" },
      { label: "Cost & Obligation", value: "Zero" }
    ],
    overview: "Automated computer algorithms like Zillow Zestimates miss premium finishes, custom pools, and lot premiums. Brian personally audits your home's unique features.",
    keyTakeaways: [
      "Conservative, Target, and Aspirational pricing tiers",
      "Detailed comp breakdown with photos and price-per-square-foot metrics",
      "Actionable recommendations to boost net equity before listing"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "contact": {
    id: "contact",
    slug: "/contact",
    category: "brand",
    kicker: "JAMISON REAL ESTATE",
    title: "Contact Brian Jamison | Jamison Real Estate",
    subtitle: "Direct access: Call, text, or schedule an in-person advisory meeting at Jamison Real Estate in Edmond, Oklahoma.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Direct Phone", value: "(405) 513-3039" },
      { label: "Physical Office", value: "Edmond, OK" },
      { label: "Days Reachable", value: "7 Days" }
    ],
    overview: "Whether you are looking to sell a luxury property, turnaround an expired listing, or acquire a private estate, Brian Jamison is ready to assist.",
    keyTakeaways: [
      "Physical Office: 1508 W. Edmond Rd., Edmond, Oklahoma 73003",
      "Direct Cell: (405) 513-3039",
      "Email: BJamison@Salt.RealEstate",
      "Prompt consultation scheduling with zero pressure"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "sitemap": {
    id: "sitemap",
    slug: "/sitemap",
    category: "brand",
    kicker: "PLATFORM DIRECTORY",
    title: "Complete Sitemap & Platform Architecture (58+ Pages)",
    subtitle: "Explore all 58+ indexed portals, community guides, seller blueprint phases, and advisory resources for Jamison Real Estate in the Oklahoma City metropolitan area.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Indexed Pages", value: "58+ Pages" },
      { label: "Metro Enclaves", value: "21 Areas" },
      { label: "XML Sitemap", value: "sitemap.xml" }
    ],
    overview: "Comprehensive directory indexing every core brand page, 3 major services, 6-phase seller blueprint, 10 listing standards, and 21 Oklahoma City metro community hubs.",
    keyTakeaways: [
      "Live search & category filter covering all 58+ platform pages",
      "Direct canonical links with XML sitemap for search engine crawlers",
      "Complete transparency into Oklahoma City metro market coverage"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

export const RESOURCE_PAGES: Record<string, InteriorPageData> = {
  "services": {
    id: "services",
    slug: "/services",
    category: "service",
    kicker: "FULL-SPECTRUM ADVISORY",
    title: "Comprehensive Real Estate Services & 6-Phase Selling Machine",
    subtitle: "From private home buying concierge and land development to the proprietary 6-step selling machine with 100% cancel-anytime guarantee.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Core Practices", value: "3 Pillars" },
      { label: "Blueprint Phases", value: "6 Steps" },
      { label: "Risk Guarantee", value: "100% Free" }
    ],
    overview: "Explore the comprehensive real estate practice of Brian Jamison. Every service is delivered with athletic discipline, fiduciary rigor, and cancel-anytime flexibility.",
    keyTakeaways: [
      "Home Buying Advisory & Private Client Representation",
      "The 6-Phase Selling Machine with HDR Cinema & Matterport 3D",
      "Land & Acreage Development Feasibility",
      "Direct personal reachability 7 days a week"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "home-sellers-checklist": {
    id: "home-sellers-checklist",
    slug: "/resources/home-sellers-checklist",
    category: "audience",
    kicker: "SELLER PREPARATION DOSSIER",
    title: "The 2026 Home Seller's Readiness Checklist",
    subtitle: "A comprehensive room-by-room preparation guide designed to eliminate buyer inspection renegotiations and spark multiple-offer bidding wars.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Action Items", value: "15 Key Tasks" },
      { label: "Inspection Risk", value: "Minimized" },
      { label: "Print Format", value: "PDF Ready" }
    ],
    overview: "Preparation is the foundation of peak net proceeds. This checklist walks you through exterior curb appeal, interior flow, and mechanical inspections prior to going active on MLS.",
    keyTakeaways: [
      "Curb appeal high-ROI refresh recommendations",
      "Strategic depersonalization and architectural flow guidelines",
      "Pre-listing HVAC and mechanical checks to avoid price concessions"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "mortgage-calculator": {
    id: "mortgage-calculator",
    slug: "/resources/mortgage-calculator",
    category: "audience",
    kicker: "FINANCIAL ENGINE",
    title: "Oklahoma City Mortgage & Payment Calculator",
    subtitle: "Calculate exact monthly obligations including principal, interest, Oklahoma County ad valorem taxes, and hazard homeowners insurance.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Oklahoma Tax", value: "1.15% Avg" },
      { label: "Amortization", value: "15/30 Yr" },
      { label: "Accuracy", value: "Instant" }
    ],
    overview: "Model your purchasing power across central Oklahoma's luxury communities. Calculate exact monthly payments with real-time tax and insurance estimates.",
    keyTakeaways: [
      "Principal and interest amortization calculation",
      "County-specific property tax rate modeling",
      "Integration with Brian Jamison's vetted local mortgage lenders"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "okc-relocation-guide": {
    id: "okc-relocation-guide",
    slug: "/resources/okc-relocation-guide",
    category: "audience",
    kicker: "EXECUTIVE RELOCATION",
    title: "Relocating to the Oklahoma City Metropolitan Area",
    subtitle: "Everything you need to know when moving from California, Texas, New York, or Colorado to Oklahoma's thriving luxury enclaves.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Cost Index", value: "84.2 vs US" },
      { label: "Top Schools", value: "10/10 Gold" },
      { label: "Airport Transit", value: "20 Mins" }
    ],
    overview: "Central Oklahoma offers extraordinary luxury purchasing power, premier independent college preparatory academies, and a thriving corporate economy.",
    keyTakeaways: [
      "Neighborhood comparison across Nichols Hills, Edmond, and Gaillardia",
      "School feeder zone analysis for public and private academies",
      "Corporate tax advantages and executive lifestyle amenities"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "what-to-watch-out-for": {
    id: "what-to-watch-out-for",
    slug: "/resources/what-to-watch-out-for",
    category: "audience",
    kicker: "FIDUCIARY PROTECTION",
    title: "What to Watch Out For: The Most Costly Real Estate Traps in Oklahoma",
    subtitle: "Protect your equity from expansive red clay soil settling, hail insurance ACV schedules, and restrictive non-cancellable listing agreements.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Red Clay Soil", value: "Foundation Trap" },
      { label: "Roof Deductible", value: "ACV vs RCV" },
      { label: "Cancel Clause", value: "100% Free" }
    ],
    overview: "Don't fall victim to costly Oklahoma real estate traps. Learn how Brian Jamison shields buyers and sellers through relentless inspection audits.",
    keyTakeaways: [
      "Oklahoma red clay soil expansion and drainage protocols",
      "Navigating post-storm roof insurance replacement claims",
      "Avoiding brokerages that hold you hostage in rigid agreements"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "faq": {
    id: "faq",
    slug: "/faq",
    category: "brand",
    kicker: "CLEAR ANSWERS",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our 6-Phase Selling Machine, cancel-anytime guarantee, pricing philosophy, and fiduciary duties.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Transparency", value: "100%" },
      { label: "Reachability", value: "7 Days" },
      { label: "Office Location", value: "Edmond OK" }
    ],
    overview: "Browse frequently asked questions regarding listing agreements, buyer representation, marketing syndication, and showing feedback.",
    keyTakeaways: [
      "How the Cancel-Anytime Listing Guarantee protects homeowners",
      "How 3-tier pricing triggers competitive bidding wars",
      "What happens during buyer showings and mandatory feedback calls"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "privacy-policy": {
    id: "privacy-policy",
    slug: "/privacy-policy",
    category: "brand",
    kicker: "LEGAL COMPLIANCE",
    title: "Privacy Policy",
    subtitle: "Our commitment to client confidentiality, data protection, and federal communication compliance.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Data Sharing", value: "Zero" },
      { label: "Security", value: "Protected" },
      { label: "Jurisdiction", value: "Oklahoma" }
    ],
    overview: "We protect your confidential property, contact, and valuation data in strict accordance with federal and state regulations.",
    keyTakeaways: [
      "No selling or renting of personal information",
      "Strict data privacy for home valuation submissions",
      "Salt Real Estate Corporate Office compliance"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "terms-of-service": {
    id: "terms-of-service",
    slug: "/terms-of-service",
    category: "brand",
    kicker: "LEGAL TERMS",
    title: "Terms of Service",
    subtitle: "Official platform terms, copyright disclosures, and licensing information.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "License", value: "#184931" },
      { label: "Brokerage", value: "Salt Real Estate" },
      { label: "Governing Law", value: "Oklahoma" }
    ],
    overview: "Terms of use governing all property listings, valuation calculators, and media assets on this platform.",
    keyTakeaways: [
      "Proprietary media and architectural copyright protection",
      "Professional valuation disclaimers",
      "OREC compliance and brokerage affiliation"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  },
  "fair-housing-disclosure": {
    id: "fair-housing-disclosure",
    slug: "/fair-housing-disclosure",
    category: "brand",
    kicker: "EQUAL HOUSING OPPORTUNITY",
    title: "Fair Housing & Equal Opportunity",
    subtitle: "Uncompromising commitment to federal, state, and municipal fair housing laws.",
    heroVideoUrl: "https://www.pexels.com/download/video/29383137/",
    heroFallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    heroMetrics: [
      { label: "Equal Housing", value: "100%" },
      { label: "Federal Law", value: "Title VIII" },
      { label: "Discrimination", value: "Zero Tolerance" }
    ],
    overview: "Brian Jamison and Salt Real Estate conduct all business in strict compliance with the Federal Fair Housing Act.",
    keyTakeaways: [
      "Equal opportunity in all real estate transactions",
      "Zero tolerance for discrimination based on protected classes",
      "HUD complaint filing instructions and regulatory contacts"
    ],
    images: DEFAULT_ARCHITECTURAL_GALLERY
  }
};

export const ALL_INTERIOR_PAGES: Record<string, InteriorPageData> = {
  ...SERVICE_PAGES,
  ...COMMUNITY_PAGES,
  ...AUDIENCE_PAGES,
  ...BRAND_PAGES,
  ...RESOURCE_PAGES
};

// Aliases lookup table for broken-link prevention
const PATH_ALIASES: Record<string, string> = {
  // About Brian Jamison aliases
  "about": "about",
  "about-jamison": "about",
  "about-brian-jamison": "about",
  "about/jamison": "about",
  "about/brian-jamison": "about",
  "brian-jamison": "about",
  "leadership": "about",
  "bio": "about",

  // Community & Micro-Markets aliases
  "community": "areas",
  "communities": "areas",
  "areas": "areas",
  "community-hub": "areas",
  "micro-markets": "areas",
  "neighborhoods": "areas",

  // Services aliases
  "services": "services",
  "all-services": "services",
  "services-hub": "services",
  "home-buying": "home-buying",
  "services/home-buying": "home-buying",
  "home-selling": "home-selling",
  "services/home-selling": "home-selling",
  "land-sales": "land-buying-and-selling",
  "services/land-sales": "land-buying-and-selling",
  "land-buying-and-selling": "land-buying-and-selling",
  "services/land-buying-and-selling": "land-buying-and-selling",

  // Blueprint aliases
  "seller-blueprint": "seller-blueprint",
  "the-blueprint": "seller-blueprint",
  "blueprint": "seller-blueprint",
  "6-step-blueprint": "seller-blueprint",
  "the-method": "seller-blueprint",

  // Resource aliases
  "resources/home-sellers-checklist": "home-sellers-checklist",
  "home-sellers-checklist": "home-sellers-checklist",
  "sellers-checklist": "home-sellers-checklist",
  "checklist": "home-sellers-checklist",

  "resources/mortgage-calculator": "mortgage-calculator",
  "mortgage-calculator": "mortgage-calculator",
  "calculator": "mortgage-calculator",

  "resources/okc-relocation-guide": "okc-relocation-guide",
  "okc-relocation-guide": "okc-relocation-guide",
  "relocation-guide": "okc-relocation-guide",
  "relocation": "okc-relocation-guide",

  "resources/what-to-watch-out-for": "what-to-watch-out-for",
  "what-to-watch-out-for": "what-to-watch-out-for",
  "pitfalls": "what-to-watch-out-for",

  "faq": "faq",
  "faqs": "faq",

  "privacy-policy": "privacy-policy",
  "privacy": "privacy-policy",

  "terms-of-service": "terms-of-service",
  "terms": "terms-of-service",

  "fair-housing-disclosure": "fair-housing-disclosure",
  "fairhousing": "fair-housing-disclosure",
  "fair-housing": "fair-housing-disclosure",

  // Brand aliases
  "listings": "listings",
  "featured-closings": "listings",
  "past-sales": "past-sales",
  "closings": "past-sales",
  "reviews": "reviews",
  "testimonials": "reviews",
  "home-valuation": "home-valuation",
  "valuation": "home-valuation",
  "cma": "home-valuation",
  "contact": "contact"
};

export function getPageByPath(path: string): InteriorPageData | null {
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return null;

  // 1. Check exact alias table
  if (PATH_ALIASES[clean] && ALL_INTERIOR_PAGES[PATH_ALIASES[clean]]) {
    return ALL_INTERIOR_PAGES[PATH_ALIASES[clean]];
  }

  // 2. Direct match by slug or id
  for (const page of Object.values(ALL_INTERIOR_PAGES)) {
    const pageClean = page.slug.replace(/^\//, '').replace(/\/$/, '');
    if (pageClean === clean || page.id === clean) {
      return page;
    }
  }

  // 3. Match last path segment (e.g. /areas/edmond or /services/accessibility)
  const parts = clean.split('/');
  const lastPart = parts[parts.length - 1];

  if (PATH_ALIASES[lastPart] && ALL_INTERIOR_PAGES[PATH_ALIASES[lastPart]]) {
    return ALL_INTERIOR_PAGES[PATH_ALIASES[lastPart]];
  }

  if (ALL_INTERIOR_PAGES[lastPart]) {
    return ALL_INTERIOR_PAGES[lastPart];
  }

  return null;
}



