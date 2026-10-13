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
  }
};

export const ALL_INTERIOR_PAGES: Record<string, InteriorPageData> = {
  ...SERVICE_PAGES,
  ...COMMUNITY_PAGES,
  ...AUDIENCE_PAGES,
  ...BRAND_PAGES
};

export function getPageByPath(path: string): InteriorPageData | null {
  const clean = path.replace(/^\//, '').replace(/\/$/, '');
  if (!clean) return null;

  for (const page of Object.values(ALL_INTERIOR_PAGES)) {
    const pageClean = page.slug.replace(/^\//, '').replace(/\/$/, '');
    if (pageClean === clean || page.id === clean) {
      return page;
    }
  }

  const parts = clean.split('/');
  const lastPart = parts[parts.length - 1];
  if (ALL_INTERIOR_PAGES[lastPart]) {
    return ALL_INTERIOR_PAGES[lastPart];
  }

  return null;
}


