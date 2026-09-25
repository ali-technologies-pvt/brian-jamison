export interface InteriorPageData {
  id: string;
  slug: string;
  category: 'service' | 'community' | 'audience' | 'brand' | 'resource' | 'legal';
  title: string;
  subtitle: string;
  kicker: string;
  heroVideoUrl: string;
  heroFallbackImage: string;
  heroMetrics?: { label: string; value: string }[];
  overview: string;
  keyTakeaways: string[];
  deliverables?: { title: string; desc: string; icon?: string }[];
  images: { url: string; caption: string; tag: string }[];
  virtualTourTitle?: string;
  droneVideoUrl?: string;
  stats?: { label: string; value: string; desc?: string }[];
  schools?: { name: string; type: string; rating: string; dist?: string }[];
  lifestyleHighlights?: string[];
  faqs?: { q: string; a: string }[];
}
