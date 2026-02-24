import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, MarkerClusterer, InfoWindow, Marker } from '@react-google-maps/api';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Data ─────────────────────────────────────────────────────────────────────

export const mapLocations = [
    // TASHKENT (HQ + 2 Dealers)
    { id: 'hq', isHQ: true, name: 'ООО "Krantaslizing"', address: 'г. Ташкент, Мирзо Улугбекский район, ул. Зиёлилар, д. 1, Uzbekistan', city: 'Tashkent', coords: { lat: 41.3323, lng: 69.3400 } },
    { id: 't2', isHQ: false, name: 'ООО «MAX NET PROFIT»', address: 'г. Ташкент, ул. Катта Хирмонтепа, дом 3 «А», Uzbekistan', city: 'Tashkent', iconType: 'wrench', coords: { lat: 41.2827, lng: 69.1856 } },
    { id: 't3', isHQ: false, name: 'ООО «Imagine»', address: '100017 г. Ташкент, Юнусабадский р-н, ул. Янгишахар, дом 9 «А», Uzbekistan', city: 'Tashkent', iconType: 'briefcase', coords: { lat: 41.3662, lng: 69.2811 } },

    // UZBEKISTAN REGIONS
    { id: 'f1', isHQ: false, name: 'ООО «Автосанкомплект Транс Сервис»', address: 'г. Коканд, улица Ген. Захирова, 1, Uzbekistan', city: 'Kokand', iconType: 'wrench', coords: { lat: 40.5285, lng: 70.9425 } },
    { id: 'j1', isHQ: false, name: 'ООО «MOPAR TECHNO GROUP»', address: 'г.Джизак, ул.Шароф Рашидова, автомагистраль, дом 92, Uzbekistan', city: 'Jizzakh', iconType: 'wrench', coords: { lat: 40.1158, lng: 67.8422 } },
    { id: 'b1', isHQ: false, name: 'ООО «Автоленд-Сервис»', address: 'г. Каган, ул. Бухарская, шоссе 17, Uzbekistan', city: 'Kagan', iconType: 'wrench', coords: { lat: 39.7196, lng: 64.5367 } },
    { id: 'b2', isHQ: false, name: 'ООО «Авто Arsenal»', address: 'Бухарская обл., г. Бухара, ул. А.Дониш, 11, Uzbekistan', city: 'Bukhara', iconType: 'store', coords: { lat: 39.7671, lng: 64.4552 } },
    { id: 'k1', isHQ: false, name: 'ООО «Муборак-Ягуар»', address: 'Кашкадарьинская обл, ул. Муборак 1м/т Саноар, Uzbekistan', city: 'Mubarek', iconType: 'wrench', coords: { lat: 39.2558, lng: 65.1539 } },
    { id: 'n1', isHQ: false, name: 'ООО «Navoiy Fast Trans Servise»', address: 'г. Навои, Навоийская обл, Uzbekistan', city: 'Navoiy', iconType: 'wrench', coords: { lat: 40.1039, lng: 65.3736 } },
    { id: 'nam1', isHQ: false, name: 'ООО «NAM AVTO UNIVERSAL»', address: 'г. Наманган, ул. Кукумбой, дом №7, Uzbekistan', city: 'Namangan', iconType: 'store', coords: { lat: 41.0001, lng: 71.6726 } },

    // INTERNATIONAL REGIONAL CENTERS
    { id: 'az1', isHQ: false, name: 'Baku Regional Center', address: 'Baku, Azerbaijan', city: 'Baku', iconType: 'briefcase', coords: { lat: 40.4093, lng: 49.8671 } },
    { id: 'kz1', isHQ: false, name: 'Almaty Regional Center', address: 'Almaty, Kazakhstan', city: 'Almaty', iconType: 'briefcase', coords: { lat: 43.2220, lng: 76.8512 } },
    { id: 'kz2', isHQ: false, name: 'Astana Regional Center', address: 'Astana, Kazakhstan', city: 'Astana', iconType: 'briefcase', coords: { lat: 51.1694, lng: 71.4491 } },
    { id: 'kg1', isHQ: false, name: 'Bishkek Regional Center', address: 'Bishkek, Kyrgyzstan', city: 'Bishkek', iconType: 'briefcase', coords: { lat: 42.8746, lng: 74.5698 } },
    { id: 'kg2', isHQ: false, name: 'Osh Regional Center', address: 'Osh, Kyrgyzstan', city: 'Osh', iconType: 'briefcase', coords: { lat: 40.5140, lng: 72.8161 } },
    { id: 'tj1', isHQ: false, name: 'Dushanbe Regional Center', address: 'Dushanbe, Tajikistan', city: 'Dushanbe', iconType: 'briefcase', coords: { lat: 38.5358, lng: 68.7791 } },
    { id: 'tm1', isHQ: false, name: 'Ashgabat Regional Center', address: 'Ashgabat, Turkmenistan', city: 'Ashgabat', iconType: 'briefcase', coords: { lat: 37.9601, lng: 58.3261 } }
];

const MAP_STYLES = [
    { elementType: "geometry", stylers: [{ color: "#ebf0f5" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#ebf0f5" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#94a3b8" }, { weight: 1 }] },
    { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#64748b" }, { weight: 1.2 }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#cbd5e1" }] }
];

const DEFAULT_CENTER = { lat: 45.0, lng: 63.0 };
const DEFAULT_ZOOM = 4;

// ─── Marker Icon Generator ────────────────────────────────────────────────────

const getMarkerIcon = (loc: typeof mapLocations[0], isActive: boolean, isHovered: boolean) => {
    let iconUrl = '/Dealer.png';
    if (loc.isHQ) iconUrl = '/HQ.png';
    else if (loc.iconType === 'wrench') iconUrl = '/service.png';

    // Base size increased from 40 to 48 for better visibility
    const size = isActive ? 56 : (isHovered ? 52 : 48);

    return {
        url: iconUrl,
        scaledSize: new google.maps.Size(size, size),
        anchor: new google.maps.Point(size / 2, size), // Anchor at the bottom-center
    };
};

// ─── Component ────────────────────────────────────────────────────────────────

interface DistributorMapProps {
    onLocationClick?: (id: string, coords: { lat: number; lng: number }) => void;
    onGeocoded?: (coords: Record<string, { lat: number, lng: number }>) => void;
    activePin?: string | null;
    hoveredPin?: string | null;
    zoomed?: boolean;
    centerOn?: { lat: number, lng: number } | null;
}

export default function DistributorMap({
    onLocationClick,
    onGeocoded,
    activePin,
    hoveredPin,
    zoomed = false,
    centerOn,
}: DistributorMapProps) {
    const { t } = useLanguage();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const [resolvedLocations, setResolvedLocations] = useState<Record<string, { lat: number, lng: number }>>({});
    const [map, setMap] = useState<google.maps.Map | null>(null);

    // Geocoding Logic
    useEffect(() => {
        if (!isLoaded || Object.keys(resolvedLocations).length > 0) return;

        const geocoder = new google.maps.Geocoder();
        const results: Record<string, { lat: number, lng: number }> = {};
        let count = 0;

        mapLocations.forEach(loc => {
            if ((loc as any).coords) {
                count++;
                results[loc.id] = (loc as any).coords;
                if (count === mapLocations.length) {
                    setResolvedLocations(results);
                    onGeocoded?.(results);
                }
                return;
            }

            geocoder.geocode({ address: loc.address }, (res, status) => {
                count++;
                if (status === 'OK' && res?.[0]) {
                    const coords = {
                        lat: res[0].geometry.location.lat(),
                        lng: res[0].geometry.location.lng()
                    };
                    results[loc.id] = coords;
                }

                if (count === mapLocations.length) {
                    setResolvedLocations(results);
                    onGeocoded?.(results);
                }
            });
        });
    }, [isLoaded, onGeocoded, resolvedLocations]);

    // Pan Logic — driven exclusively by centerOn for a premium, smooth transition
    useEffect(() => {
        if (!map || !centerOn) return;

        // Smooth Pan
        map.panTo(centerOn);

        // On mobile, the map is only 40dvh tall — after panTo, offset upward
        // so the marker is visible in the top portion of the clipped map container.
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
            setTimeout(() => {
                // Shift up by ~25% of map container height in pixels
                const mapDiv = map.getDiv();
                const offsetY = mapDiv ? Math.round(mapDiv.clientHeight * 0.25) : 60;
                map.panBy(0, offsetY);
            }, 100);
        }

        // DELAYED ZOOM: This is the key to smoothness.
        const zoomTimeout = setTimeout(() => {
            const currentZoom = map.getZoom();
            if (currentZoom !== 13) {
                map.setZoom(13);
            }
        }, 450);

        return () => clearTimeout(zoomTimeout);
    }, [map, centerOn]);

    // Handle Reset / Global View (if needed)
    useEffect(() => {
        if (!map || centerOn || !zoomed) return;

        map.panTo(DEFAULT_CENTER);
        const zoomTimeout = setTimeout(() => {
            map.setZoom(DEFAULT_ZOOM);
        }, 450);
        return () => clearTimeout(zoomTimeout);
    }, [map, centerOn, zoomed]);

    const onLoad = useCallback((m: google.maps.Map) => {
        setMap(m);

        // Highlight countries we operate in (Using ISO_A3 codes which are more reliable in world GeoJSONs)
        const targetCountries = ['UZB', 'KAZ', 'AZE', 'KGZ', 'TJK', 'TKM'];

        // Load comprehensive GeoJSON for boundaries
        m.data.loadGeoJson('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json');

        m.data.setStyle((feature) => {
            const id = (feature.getProperty('id') || feature.getProperty('iso_a3') || '').toString().toUpperCase();
            const isOperating = targetCountries.includes(id);

            return {
                fillColor: isOperating ? '#244d85' : 'transparent',
                fillOpacity: isOperating ? 0.35 : 0, // Solid visibility
                strokeWeight: isOperating ? 2 : 0.5,
                strokeColor: isOperating ? '#244d85' : '#CBD5E1',
                visible: true,
                clickable: false,
                zIndex: isOperating ? 2 : 1
            };
        });
    }, []);

    const onUnmount = useCallback(() => setMap(null), []);

    if (!isLoaded) {
        return (
            <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 border-4 border-[#244d85]/10 border-t-[#244d85] rounded-full animate-spin mb-4" />
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                    {t.distributors.title}...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative" style={{ background: "#E8EDF4" }}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={DEFAULT_CENTER}
                zoom={DEFAULT_ZOOM}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    styles: MAP_STYLES,
                    disableDefaultUI: true,
                    zoomControl: false,
                    scrollwheel: true,
                }}
            >
                <MarkerClusterer
                    options={{
                        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
                        gridSize: 50,
                        maxZoom: 15,
                    }}
                >
                    {(clusterer) => (
                        <>
                            {mapLocations.map((loc) => {
                                const coords = resolvedLocations[loc.id];
                                if (!coords) return null;

                                const isActive = activePin === loc.id;
                                const isHovered = hoveredPin === loc.id;

                                return (
                                    <Marker
                                        key={loc.id}
                                        position={coords}
                                        clusterer={clusterer}
                                        icon={getMarkerIcon(loc, isActive, isHovered)}
                                        onClick={() => onLocationClick?.(loc.id, coords)}
                                        zIndex={isActive ? 1000 : (isHovered ? 900 : 1)}
                                    />
                                );
                            })}

                            {activePin && (
                                (() => {
                                    const locData = mapLocations.find(l => l.id === activePin);
                                    const pos = resolvedLocations[activePin];
                                    if (!pos || !locData) return null;

                                    return (
                                        <InfoWindow
                                            position={pos}
                                            options={{ pixelOffset: new google.maps.Size(0, -35) }}
                                        >
                                            <div className="p-3 min-w-[220px] bg-white">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#244d85] mb-1 opacity-60">
                                                    {locData.isHQ ? t.distributors.info.hq : t.distributors.info.dealer}
                                                </p>
                                                <h3 className="text-xs font-black text-[#0F172A] uppercase leading-tight mb-1.5">
                                                    {locData.name}
                                                </h3>
                                                <div className="flex items-start gap-1.5 py-2 border-t border-slate-50 mt-1 mb-3">
                                                    <MapPin size={10} className="text-[#C5A059] mt-0.5 flex-shrink-0" />
                                                    <p className="text-[9px] text-slate-500 leading-normal font-medium">
                                                        {locData.address}
                                                    </p>
                                                </div>

                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${pos.lat},${pos.lng}&travelmode=driving`, '_blank')}
                                                        className="w-full flex items-center justify-center gap-2 py-2 bg-[#244d85] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#1a3a63] transition-colors rounded"
                                                    >
                                                        <Navigation size={10} className="fill-current" />
                                                        {t.distributors.info.directions}
                                                    </button>
                                                </div>
                                            </div>
                                        </InfoWindow>
                                    );
                                })()
                            )}
                        </>
                    )}
                </MarkerClusterer>
            </GoogleMap>

            <div className="absolute bottom-4 right-4 z-[1000] text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 px-3 py-2 pointer-events-none bg-white/90 backdrop-blur-md border border-slate-100 shadow-sm">
                <MapPin size={12} className="text-[#C5A059]" />
                {zoomed ? 'Use scroll to zoom • drag to pan' : 'Scroll to zoom • Click a pin to explore'}
            </div>
        </div>
    );
}
