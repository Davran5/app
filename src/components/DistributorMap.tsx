import { useEffect, useMemo, useRef, useState } from 'react';
import { GoogleMap, InfoWindow, useJsApiLoader, type Libraries } from '@react-google-maps/api';
import { MapPin, Navigation, Phone, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { DistributorLocation } from '../data/distributors';
import { getDistributorKindLabel, getDistributorUiCopy } from '../lib/distributors';

const DEFAULT_CENTER = { lat: 43.5, lng: 64.5 };
const DEFAULT_ZOOM = 4;
const FOCUSED_LOCATION_ZOOM = 11;
const GOOGLE_MAPS_LIBRARIES: Libraries = ['marker'];
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || '';
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() || 'DEMO_MAP_ID';

const MARKER_COLORS = {
  dealer: { fill: '#244d85', inner: '#ffffff' },
  hq: { fill: '#c5a059', inner: '#ffffff' },
  service: { fill: '#0b0c0e', inner: '#c5a059' },
  regional: { fill: '#244d85', inner: '#c5a059' },
} as const;

function buildMarkerSvg(fill: string, inner: string, width: number, height: number) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 64 72" fill="none">`,
    `<path d="M32 70C32 70 56 46.15 56 28C56 13.64 45.26 2 32 2S8 13.64 8 28c0 18.15 24 42 24 42Z" fill="${fill}" stroke="rgba(15,23,42,0.16)" stroke-width="3"/>`,
    `<circle cx="32" cy="28" r="10" fill="${inner}"/>`,
    '</svg>',
  ].join('');
}

function getMarkerDimensions(isActive: boolean, isHovered: boolean) {
  const width = isActive ? 50 : isHovered ? 46 : 42;
  const height = Math.round(width * 1.125);

  return { width, height };
}

function createMarkerContent(location: DistributorLocation, isActive: boolean, isHovered: boolean) {
  const colors = MARKER_COLORS[location.kind];
  const { width, height } = getMarkerDimensions(isActive, isHovered);
  const marker = document.createElement('div');

  marker.innerHTML = buildMarkerSvg(colors.fill, colors.inner, width, height);
  marker.style.width = `${width}px`;
  marker.style.height = `${height}px`;
  marker.style.transform = 'translateZ(0)';

  return marker;
}

function getBoundsPadding(map: google.maps.Map) {
  const container = map.getDiv();
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (width < 768 || height < 420) {
    return 16;
  }

  return 24;
}

function getTelHref(phone: string) {
  return `tel:${phone.replace(/[\s\-()]/g, '')}`;
}

interface DistributorMapProps {
  locations: DistributorLocation[];
  activeLocationId?: string | null;
  hoveredLocationId?: string | null;
  centerOn?: { lat: number; lng: number } | null;
  onLocationClick?: (location: DistributorLocation) => void;
  onActiveLocationClose?: () => void;
  onDirectionsClick?: (location: DistributorLocation) => void;
  onPhoneClick?: (location: DistributorLocation, phone: string) => void;
}

export default function DistributorMap({
  locations,
  activeLocationId,
  hoveredLocationId,
  centerOn,
  onLocationClick,
  onActiveLocationClose,
  onDirectionsClick,
  onPhoneClick,
}: DistributorMapProps) {
  const { language, t } = useLanguage();
  const ui = getDistributorUiCopy(language);
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || 'missing-google-maps-key',
    libraries: GOOGLE_MAPS_LIBRARIES,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const markerInstancesRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const markerListenersRef = useRef<
    Array<{ marker: google.maps.marker.AdvancedMarkerElement; listener: EventListener }>
  >([]);

  const activeLocation = useMemo(
    () => locations.find((location) => location.id === activeLocationId) ?? null,
    [activeLocationId, locations],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      markerListenersRef.current.forEach(({ marker, listener }) => {
        marker.removeEventListener('gmp-click', listener);
      });
      markerInstancesRef.current.forEach((marker) => {
        marker.map = null;
      });
    };
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (centerOn) {
      map.panTo(centerOn);
      map.setZoom(FOCUSED_LOCATION_ZOOM);
      return;
    }

    if (locations.length === 0) {
      map.setCenter(DEFAULT_CENTER);
      map.setZoom(DEFAULT_ZOOM);
      return;
    }

    if (locations.length === 1) {
      map.setCenter(locations[0].coords);
      map.setZoom(7);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    locations.forEach((location) => bounds.extend(location.coords));
    map.fitBounds(bounds, getBoundsPadding(map));
  }, [centerOn, locations, map]);

  useEffect(() => {
    let disposed = false;

    if (!isLoaded || !map) {
      return;
    }

    const renderMarkers = async () => {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker',
      )) as google.maps.MarkerLibrary;

      if (disposed) {
        return;
      }

      markerListenersRef.current.forEach(({ marker, listener }) => {
        marker.removeEventListener('gmp-click', listener);
      });
      markerInstancesRef.current.forEach((marker) => {
        marker.map = null;
      });

      const nextMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
      const nextListeners: Array<{
        marker: google.maps.marker.AdvancedMarkerElement;
        listener: EventListener;
      }> = [];

      locations.forEach((location) => {
        const isActive = activeLocationId === location.id;
        const isHovered = hoveredLocationId === location.id;
        const marker = new AdvancedMarkerElement({
          map,
          position: location.coords,
          title: location.name,
          content: createMarkerContent(location, isActive, isHovered),
          gmpClickable: true,
          zIndex: isActive ? 1000 : isHovered ? 900 : 1,
        });

        const handleMarkerClick: EventListener = () => {
          onLocationClick?.(location);
        };

        marker.addEventListener('gmp-click', handleMarkerClick);
        nextListeners.push({ marker, listener: handleMarkerClick });
        nextMarkers.push(marker);
      });

      if (disposed) {
        nextListeners.forEach(({ marker, listener }) => {
          marker.removeEventListener('gmp-click', listener);
        });
        nextMarkers.forEach((marker) => {
          marker.map = null;
        });
        return;
      }

      markerListenersRef.current = nextListeners;
      markerInstancesRef.current = nextMarkers;
    };

    void renderMarkers();

    return () => {
      disposed = true;
    };
  }, [activeLocationId, hoveredLocationId, isLoaded, locations, map, onLocationClick]);

  if (!GOOGLE_MAPS_API_KEY || loadError) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-[#f2f1eb] p-6">
        <div className="max-w-[280px] text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#244d85]/15 bg-white text-[#244d85]">
            <MapPin size={18} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            {ui.mapUnavailable}
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-full min-h-0 items-center justify-center bg-[#f2f1eb]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#244d85]/15 border-t-[#244d85]" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            {ui.loadingMap}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={setMap}
        onUnmount={() => setMap(null)}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          gestureHandling: 'cooperative',
          clickableIcons: false,
          mapId: GOOGLE_MAP_ID,
        }}
      >
        {activeLocation && !isMobile && (
          <InfoWindow
            position={activeLocation.coords}
            options={{ pixelOffset: new google.maps.Size(0, -36) }}
            onCloseClick={onActiveLocationClose}
          >
            <div className="min-w-[240px] bg-white p-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#244d85]">
                {getDistributorKindLabel(activeLocation.kind, t.distributors, language)}
              </p>
              <h3 className="text-sm font-semibold text-[#0B0C0E]">{activeLocation.name}</h3>
              <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#c5a059]" />
                <p className="text-xs leading-relaxed text-neutral-600">{activeLocation.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.coords.lat},${activeLocation.coords.lng}&travelmode=driving`}
                target="_blank"
                rel="noreferrer"
                onClick={() => onDirectionsClick?.(activeLocation)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#244d85] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1c3c69]"
              >
                <Navigation size={12} />
                {t.distributors.info.directions}
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <div className="pointer-events-none absolute left-4 top-4 hidden rounded-full border border-white/80 bg-white/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 shadow-sm backdrop-blur md:block">
        {ui.mapHint}
      </div>

      {activeLocation && isMobile && (
        <div className="absolute inset-x-3 bottom-3 z-10 rounded-[24px] border border-black/5 bg-white p-4 shadow-[0_20px_45px_rgba(15,23,42,0.18)]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#244d85]">
                {getDistributorKindLabel(activeLocation.kind, t.distributors, language)}
              </p>
              <h3 className="text-sm font-semibold text-[#0B0C0E]">{activeLocation.name}</h3>
            </div>

            <button
              type="button"
              onClick={onActiveLocationClose}
              aria-label={ui.clearSelection}
              className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#244d85]/30 hover:text-[#244d85]"
            >
              <X size={14} />
            </button>
          </div>

          <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#c5a059]" />
            <p className="text-xs leading-relaxed text-neutral-600">{activeLocation.address}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeLocation.coords.lat},${activeLocation.coords.lng}&travelmode=driving`}
              target="_blank"
              rel="noreferrer"
              onClick={() => onDirectionsClick?.(activeLocation)}
              className="inline-flex items-center gap-2 rounded-full bg-[#244d85] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1c3c69]"
            >
              <Navigation size={12} />
              {t.distributors.info.directions}
            </a>

            {activeLocation.phones[0] && (
              <a
                href={getTelHref(activeLocation.phones[0])}
                onClick={() => onPhoneClick?.(activeLocation, activeLocation.phones[0])}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#0B0C0E] transition hover:border-[#244d85]/25 hover:text-[#244d85]"
              >
                <Phone size={12} />
                {ui.call}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
