import React, { useState } from 'react';
import {
  Play,
  Pause,
  X,
  Sparkles,
  Phone,
  ArrowRight,
  Video,
  Eye,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  VolumeX
} from 'lucide-react';
import { BrianAvatar } from './BrianAvatar';

interface VideoMarqueeFooterProps {
  onOpenConsultation?: () => void;
  onOpenValuation?: () => void;
}

interface VideoItem {
  id: number;
  title: string;
  category: string;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  keyLesson: string;
}

const MARQUEE_VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: "Nichols Hills & OKC Luxury Estate Drone Tour",
    category: "4K Aerial Drone",
    duration: "1:12",
    views: "28.4K",
    thumbnail: "/media/gallery/modern-estate-pool-lawn.jpeg",
    videoUrl: "/media/videos/vid1.mp4",
    description: "4K golden-hour aerial sweep capturing boundary tree canopies, architectural limestone masonry, and resort pool grounds.",
    keyLesson: "High-altitude boundary mapping stops out-of-state buyers scrolling and validates lot privacy."
  },
  {
    id: 2,
    title: "Edmond Staging Masterclass: +$24k in Equity",
    category: "Interior Transformation",
    duration: "0:58",
    views: "34.1K",
    thumbnail: "/media/gallery/modern-kitchen.jpeg",
    videoUrl: "/media/videos/vid2.mp4",
    description: "Watch how our dedicated staging crew transformed cold empty spaces into an emotional showpiece that produced 4 offers in 72 hours.",
    keyLesson: "Neutral soft furnishings, 3000K daylight lighting, and 80% countertop clearing yield 3x opening showings."
  },
  {
    id: 3,
    title: "Arcadia 20-Acre Land Survey & Elevation Tour",
    category: "Acreage & Soil",
    duration: "1:05",
    views: "19.7K",
    thumbnail: "/media/properties/11616-estrella-arcadia.jpeg",
    videoUrl: "/media/videos/vid3.mp4",
    description: "FAA Part-107 flight plotting natural drainage contours, Garber-Wellington well depth, and custom homesite building envelopes.",
    keyLesson: "Validating soil perk tests and utility corridors before listing prevents escrow cancellations."
  },
  {
    id: 4,
    title: "Gaillardia Guarded Fairway Tour",
    category: "Golf Community",
    duration: "1:18",
    views: "42.8K",
    thumbnail: "/media/properties/11500-gateshead.jpg",
    videoUrl: "/media/videos/vid4.mp4",
    description: "Touring the Arthur Hills championship golf greens and 55,000 sq ft French Normandy clubhouse at Gaillardia.",
    keyLesson: "Highlighting 24/7 guarded security gates commands a proven 15% resale premium."
  },
  {
    id: 5,
    title: "Historic Heritage Hills Architectural Walkthrough",
    category: "Preservation",
    duration: "0:52",
    views: "23.5K",
    thumbnail: "/media/properties/136-nw-18th-heritage-hills.jpeg",
    videoUrl: "/media/videos/vid5.mp4",
    description: "Early 20th-century craftsmanship meets modern scullery kitchen updates in Oklahoma City's crown historic district.",
    keyLesson: "Honoring historic preservation guidelines while showcasing turnkey mechanicals attracts affluent buyers."
  },
  {
    id: 6,
    title: "Edmond Custom Build & Architectural Walkthrough",
    category: "New Construction",
    duration: "1:04",
    views: "39.2K",
    thumbnail: "/media/properties/22801-n-briarwood-edmond.jpeg",
    videoUrl: "/media/videos/vid6.mp4",
    description: "Checking custom woodwork, high-efficiency foam envelopes, and smart-home zoning across premier Edmond enclaves.",
    keyLesson: "Highlighting structural build quality and energy ratings builds massive buyer confidence."
  },
  {
    id: 7,
    title: "Deer Creek Executive Estate Bidding War Case Study",
    category: "Seller Results",
    duration: "1:10",
    views: "31.9K",
    thumbnail: "/media/properties/22402-emily-way-edmond.jpeg",
    videoUrl: "/media/videos/vid7.mp4",
    description: "How our 3-tier pricing strategy generated 3 competing bids and closed at $35,000 above asking price.",
    keyLesson: "Strategic search-bracket pricing just beneath major round numbers triggers opening-weekend frenzy."
  },
  {
    id: 8,
    title: "Crown Heights Modern Renovation Showcase",
    category: "Renovation ROI",
    duration: "0:55",
    views: "21.3K",
    thumbnail: "/media/properties/3233-n-harvey-crown-heights.jpeg",
    videoUrl: "/media/videos/vid8.mp4",
    description: "Cathedral great rooms, hand-hewn oak timbers, and seamless pocket sliding glass doors to outdoor entertaining.",
    keyLesson: "Indoor-outdoor living transitions rank as the #1 requested feature among executive buyers in OKC."
  }
];

export const VideoMarqueeFooter: React.FC<VideoMarqueeFooterProps> = ({
  onOpenConsultation,
  onOpenValuation
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Duplicate for seamless infinite marquee loop
  const loopVideos = [...MARQUEE_VIDEOS, ...MARQUEE_VIDEOS];

  return (
    <section className="w-full bg-[#001D40] text-white py-16 sm:py-20 border-t border-b border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F] via-[#001D40] to-[#00142C] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-8 sm:mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40 text-[#FB923C] text-[11px] font-bold uppercase tracking-widest mb-3">
              <Video className="w-3.5 h-3.5" />
              <span>Cinematic Media & Reels Vault</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
              Watch Properties Before You Visit
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-white/70 max-w-md font-sans leading-relaxed">
            Browse property videos, aerial footage, and short reels showing how homes and land are presented to buyers online.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Gradient Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#00142C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#00142C] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee gap-5 flex items-center will-change-transform">
          {loopVideos.map((video, index) => (
            <div
              key={`${video.id}-${index}`}
              onClick={() => setSelectedVideo(video)}
              className="group relative w-[280px] sm:w-[320px] h-[200px] sm:h-[220px] rounded-2xl overflow-hidden bg-[#0A192F] border border-white/15 hover:border-[#EA580C] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer shrink-0 flex flex-col justify-between p-4"
            >
              {/* Autoplay Video Loop */}
              <video
                src={video.videoUrl}
                poster={video.thumbnail}
                autoPlay
                playsInline
                muted
                loop
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Scrim Gradient for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/50 group-hover:from-black/85 transition-opacity pointer-events-none" />

              {/* Top Header Badge */}
              <div className="relative z-10 flex items-center justify-between pointer-events-none">
                <span className="px-2 py-0.5 rounded bg-black/65 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                  <span>{video.category}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#EA580C] text-[10px] font-bold text-white tracking-wider flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{video.duration}</span>
                </span>
              </div>

              {/* Bottom Title & Views */}
              <div className="relative z-10 pointer-events-none">
                <h4 className="font-serif text-sm font-bold text-white leading-snug line-clamp-2 mb-1.5 group-hover:text-[#FDBA74] transition-colors drop-shadow-md">
                  {video.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-white/80">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#FB923C]" />
                    <span>{video.views}</span>
                  </span>
                  <span className="text-[#FB923C] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Watch Clip</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Popup Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#001D40] rounded-3xl overflow-hidden border border-white/30 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Display */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                muted
                playsInline
                poster={selectedVideo.thumbnail}
                className="w-full h-full object-cover"
              />

              {/* Top Details */}
              <div className="absolute top-4 left-4 right-14 z-10 flex items-center gap-2.5 pointer-events-none">
                <BrianAvatar size="sm" />
                <div className="bg-black/60 px-2 py-1 rounded-md backdrop-blur-xs">
                  <span className="block text-xs font-bold text-white leading-tight">
                    Brian Jamison, Realtor
                  </span>
                  <span className="text-[10px] text-white/70">
                    Salt Real Estate · {selectedVideo.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Details & Actions */}
            <div className="p-5 bg-[#001D40]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#FB923C] mb-1">
                <span>{selectedVideo.category}</span>
                <span>{selectedVideo.duration}</span>
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {selectedVideo.title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                {selectedVideo.description}
              </p>

              <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs text-white/90 mb-4 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#FB923C] shrink-0 mt-0.5" />
                <span>
                  <strong>Key Strategic Insight:</strong> {selectedVideo.keyLesson}
                </span>
              </div>

                <div className="flex items-center justify-between gap-3">
                  {onOpenConsultation && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVideo(null);
                        onOpenConsultation();
                      }}
                      className="flex-1 py-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors shadow-md text-center cursor-pointer"
                    >
                      Book Strategy Session
                    </button>
                  )}
                  <a
                    href="tel:4055133039"
                    className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Direct</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };
