import React, { useState } from 'react';
import { Video, Layers, Compass, Play, Pause, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InteriorMediaTourProps {
  title?: string;
  droneVideoUrl?: string;
  matterportTitle?: string;
}

export const InteriorMediaTour: React.FC<InteriorMediaTourProps> = ({
  title = "Embedded Media & Interactive Walkthrough Suite",
  droneVideoUrl = "/media/videos/vid2.mp4",
  matterportTitle = "Matterport Pro3 3D Spatial Model & Floorplan Inspection"
}) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'drone' | 'briefing'>('3d');
  const [activeFloor, setActiveFloor] = useState<number>(1);
  const [dronePlaying, setDronePlaying] = useState<boolean>(true);

  return (
    <section className="w-full py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#EA580C]/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#EA580C] block mb-2">
            Immersive Technology
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A192F]">
            {title}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B7280] mt-2">
            Every listing deployed through Brian Jamison receives cinema-grade 4K aerial footage and 24/7 Matterport interactive 3D dollhouse scans.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === '3d'
                ? 'bg-[#0A192F] text-white shadow-md'
                : 'bg-white text-[#0A192F] border border-[#EA580C]/30 hover:bg-[#FAF9F6]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Interactive 3D Virtual Tour</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('drone')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'drone'
                ? 'bg-[#0A192F] text-white shadow-md'
                : 'bg-white text-[#0A192F] border border-[#EA580C]/30 hover:bg-[#FAF9F6]'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>4K Drone Aerial Boundary Flyover</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('briefing')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              activeTab === 'briefing'
                ? 'bg-[#0A192F] text-white shadow-md'
                : 'bg-white text-[#0A192F] border border-[#EA580C]/30 hover:bg-[#FAF9F6]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Strategic Agent Video Walkthrough</span>
          </button>
        </div>

        {/* Media Container */}
        <div className="bg-[#FAF9F6] border border-[#EA580C]/30 rounded-2xl overflow-hidden shadow-xl p-4 sm:p-6">
          {activeTab === '3d' && (
            <div className="relative w-full h-[450px] sm:h-[580px] bg-stone-900 rounded-xl overflow-hidden flex flex-col justify-between">
              {/* Background 3D Viewport simulation */}
              <div className="absolute inset-0">
                <img
                  src={
                    activeFloor === 1
                      ? "/media/gallery/modern-staircase-dining.jpeg"
                      : activeFloor === 2
                      ? "/media/gallery/modern-kitchen.jpeg"
                      : "/media/gallery/midcentury-entry.jpeg"
                  }
                  alt="3D Walkthrough Viewport"
                  className="w-full h-full object-cover opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

                {/* Hotspot Markers */}
                <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-white/90 border-2 border-[#EA580C] flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-[11px] px-3 py-1 rounded-md shadow-xl border border-white/10">
                    Grand Foyer & 24' Limestone Fireplace
                  </div>
                </div>

                <div className="absolute top-[60%] left-[28%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-white/90 border-2 border-[#EA580C] flex items-center justify-center shadow-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-[11px] px-3 py-1 rounded-md shadow-xl border border-white/10">
                    Wolf & Sub-Zero Scullery Kitchen
                  </div>
                </div>

                <div className="absolute top-[52%] left-[72%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-white/90 border-2 border-[#EA580C] flex items-center justify-center shadow-lg">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EA580C]" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black/90 text-white text-[11px] px-3 py-1 rounded-md shadow-xl border border-white/10">
                    Primary Retreat & Spa En-Suite
                  </div>
                </div>
              </div>

              {/* Viewport Top Bar */}
              <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-white text-xs font-semibold tracking-wide">
                    {matterportTitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-stone-200">
                  <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Interactive Dollhouse Active</span>
                </div>
              </div>

              {/* Viewport Bottom Controls */}
              <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-300 px-2">
                    Floor:
                  </span>
                  {[1, 2, 3].map((floor) => (
                    <button
                      key={floor}
                      type="button"
                      onClick={() => setActiveFloor(floor)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        activeFloor === floor
                          ? 'bg-[#EA580C] text-white shadow-xs'
                          : 'text-stone-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      Level {floor}
                    </button>
                  ))}
                </div>

                <div className="text-right text-[11px] text-stone-300 hidden sm:block">
                  Click on golden nodes to tour individual rooms
                </div>
              </div>
            </div>
          )}

          {activeTab === 'drone' && (
            <div className="relative w-full h-[450px] sm:h-[580px] bg-stone-900 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src="/media/properties/11500-gateshead.jpg"
                alt="FAA Part-107 Certified 4K Drone Boundary Mapping"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs">
                <Video className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>FAA Part-107 Certified 4K Drone Boundary Mapping</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white text-xs">
                <span>Lot boundary, topography & golden hour perimeter scans included in every listing</span>
                <span className="text-[#EA580C] font-semibold">4K UHD Cinema Grade</span>
              </div>
            </div>
          )}

          {activeTab === 'briefing' && (
            <div className="relative w-full h-[450px] sm:h-[580px] bg-stone-900 rounded-xl overflow-hidden flex flex-col justify-end p-8 text-white">
              <img
                src="/media/gallery/brian-jamison-skyline.jpeg"
                alt="Agent Walkthrough Briefing with Brian Jamison"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 max-w-2xl">
                <span className="text-xs uppercase tracking-widest text-[#EA580C] font-bold block mb-2">
                  Personal Executive Representation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
                  Strategic Property Briefing with Brian Jamison
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  Brian delivers an authentic, transparent walkthrough explaining every architectural highlight, structural upgrade, and neighborhood valuation driver directly to pre-approved buyers and luxury agents.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#EA580C]">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 100% Showing Feedback Protocol</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Direct Buyer Inquiry Response</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
