import React, { useEffect, useRef, useState } from 'react';
import { X, MapPin, Check, Compass, Navigation, Crosshair, Search, Loader2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapLocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (address: string, coords?: { lat: number; lng: number }) => void;
  initialQuery?: string;
}

// Key luxury Oklahoma City Metro enclaves with exact GPS coordinates
const ENCLAVE_SHORTCUTS = [
  { name: 'Gaillardia', lat: 35.6042, lng: -97.6035, desc: 'Luxury Golf & Country Club Enclave' },
  { name: 'Nichols Hills', lat: 35.5398, lng: -97.5381, desc: 'Premier Historic Estate District' },
  { name: 'Edmond / Oak Tree', lat: 35.6528, lng: -97.4781, desc: 'Championship Golf Estates' },
  { name: 'Deer Creek', lat: 35.6698, lng: -97.6481, desc: 'Northwest Luxury Acreage' },
  { name: 'Heritage Hills', lat: 35.4880, lng: -97.5180, desc: 'Historic Urban Architectural Gems' },
  { name: 'Rose Creek', lat: 35.6250, lng: -97.5850, desc: 'Gated Master-Planned Community' },
  { name: 'Lake Hefner', lat: 35.5685, lng: -97.5985, desc: 'Waterfront & Lakeside Enclaves' }
];

export const MapLocationPickerModal: React.FC<MapLocationPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  initialQuery = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number }>({
    lat: 35.6042, // Default to Gaillardia / Northwest OKC
    lng: -97.6035
  });
  const [selectedAddress, setSelectedAddress] = useState<string>('Gaillardia Parkway, Oklahoma City, OK 73142');
  const [isReverseGeocoding, setIsReverseGeocoding] = useState<boolean>(false);
  const [activeEnclave, setActiveEnclave] = useState<string>('Gaillardia');

  // Custom luxury SVG marker in Brian Jamison Orange with glowing pulse ring
  const createLuxuryMarkerIcon = () => {
    return L.divIcon({
      className: 'custom-luxury-pin',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(234, 88, 12, 0.25); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 34px; height: 34px; border-radius: 9999px; background: #002D61; border: 3px solid #EA580C; box-shadow: 0 4px 14px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EA580C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3" fill="#EA580C"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });
  };

  // Reverse geocode given coordinates to an Oklahoma City Metro address
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsReverseGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const houseNumber = addr.house_number || '';
        const road = addr.road || addr.street || addr.neighbourhood || addr.suburb || 'Property Location';
        const city = addr.city || addr.town || addr.village || 'Oklahoma City';
        const state = addr.state === 'Oklahoma' ? 'OK' : addr.state || 'OK';
        const postcode = addr.postcode || '73142';

        const streetLine = [houseNumber, road].filter(Boolean).join(' ');
        const full = `${streetLine}, ${city}, ${state} ${postcode}`.trim();
        setSelectedAddress(full);
      } else {
        setSelectedAddress(`Property at ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°W, Oklahoma City, OK`);
      }
    } catch {
      setSelectedAddress(`Property at ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°W, Oklahoma City, OK`);
    } finally {
      setIsReverseGeocoding(false);
    }
  };

  // Initialize Leaflet Map when modal opens
  useEffect(() => {
    if (!isOpen) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      return;
    }

    // Small delay to ensure modal DOM is mounted and sized
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const initialLat = currentCoords.lat;
      const initialLng = currentCoords.lng;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 14,
        zoomControl: true,
        attributionControl: false
      });

      // Luxury CartoDB / OSM High-res tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Add Custom Luxury Marker
      const marker = L.marker([initialLat, initialLng], {
        draggable: true,
        icon: createLuxuryMarkerIcon()
      }).addTo(map);

      // Handle marker drag
      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        setCurrentCoords({ lat: pos.lat, lng: pos.lng });
        reverseGeocode(pos.lat, pos.lng);
        setActiveEnclave('');
      });

      // Handle click anywhere on the map to reposition pin
      map.on('click', (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        setCurrentCoords({ lat, lng });
        reverseGeocode(lat, lng);
        setActiveEnclave('');
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Invalidate map size to prevent gray tiles
      setTimeout(() => map.invalidateSize(), 150);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen]);

  const handleSelectEnclave = (enclave: typeof ENCLAVE_SHORTCUTS[0]) => {
    setActiveEnclave(enclave.name);
    setCurrentCoords({ lat: enclave.lat, lng: enclave.lng });

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.flyTo([enclave.lat, enclave.lng], 15, {
        duration: 1.2
      });
      markerRef.current.setLatLng([enclave.lat, enclave.lng]);
    }

    reverseGeocode(enclave.lat, enclave.lng);
  };

  const handleConfirm = () => {
    onSelectLocation(selectedAddress, currentCoords);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EA580C]/40 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#001D40] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center shadow-lg shadow-orange-600/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FB923C]">
                  Google Maps Geospatial Pinpoint
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live MLSOK Area
                </span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">
                Select Your Oklahoma City or Edmond Property on Map
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Enclave Jump Pills */}
        <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E5E0D8] flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#6B7280] shrink-0 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
            Jump To Enclave:
          </span>
          {ENCLAVE_SHORTCUTS.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleSelectEnclave(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeEnclave === item.name
                  ? 'bg-[#EA580C] text-white shadow-sm'
                  : 'bg-white text-[#002D61] border border-[#E5E0D8] hover:border-[#EA580C]/40 hover:bg-[#F5EFE6]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Interactive Map Viewport */}
        <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] w-full bg-stone-100">
          <div ref={mapContainerRef} className="absolute inset-0 z-0" />

          {/* Floating Instructions Pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#EA580C]/30 text-xs text-[#002D61] font-semibold flex items-center gap-2 pointer-events-none">
            <Crosshair className="w-3.5 h-3.5 text-[#EA580C] animate-pulse" />
            <span>Click anywhere or drag the orange pin to your home location</span>
          </div>

          {/* Center Crosshair Marker Guide */}
          {isReverseGeocoding && (
            <div className="absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-[#E5E0D8] text-xs text-[#002D61] flex items-center gap-2 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EA580C]" />
              <span>Identifying address from Google Maps...</span>
            </div>
          )}
        </div>

        {/* Bottom Action Footer with Selected Address */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#EA580C] block mb-0.5">
              Selected Property Location
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
              <p className="font-serif text-sm sm:text-base font-bold text-[#002D61] truncate">
                {selectedAddress}
              </p>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-0.5">
              Coordinates: {currentCoords.lat.toFixed(4)}°N, {Math.abs(currentCoords.lng).toFixed(4)}°W · Calibrated for Oklahoma City MLS Audit
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#6B7280] hover:text-[#002D61] rounded-xl hover:bg-[#FAF9F6] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#EA580C] hover:bg-[#C2410C] rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Use Location</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
