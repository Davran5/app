import { useMemo, useRef, useState } from 'react';
import { Building2, ChevronDown, ChevronUp, Mail, Navigation, Phone, Target } from 'lucide-react';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useCms } from '../contexts/CmsContext';
import { useLanguage } from '../contexts/LanguageContext';
import type { DistributorLocation } from '../data/distributors';
import { getDistributorAreaLabel, getDistributorKindLabel, getDistributorUiCopy } from '../lib/distributors';
import DistributorMap from './DistributorMap';

type FilterTab = 'all' | 'uzbekistan' | 'international';

type DisplayDistributor = DistributorLocation & {
  areaLabel: string;
  kindLabel: string;
  distance?: number;
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadiusKm = 6371;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;
  const haversine =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function getDirectionsUrl(location: DistributorLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${location.coords.lat},${location.coords.lng}&travelmode=driving`;
}

function getTelHref(phone: string) {
  return `tel:${phone.replace(/[\s\-()]/g, '')}`;
}

export default function Distributors() {
  const { language, t } = useLanguage();
  const { trackEvent } = useAnalytics();
  const { distributorLocations } = useCms();
  const ui = getDistributorUiCopy(language);
  const distanceFormatter = useMemo(
    () => new Intl.NumberFormat(language, { maximumFractionDigits: 0 }),
    [language],
  );

  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [focusedLocationId, setFocusedLocationId] = useState<string | null>(null);
  const [tab, setTab] = useState<FilterTab>('all');
  const [expandedLocationId, setExpandedLocationId] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const listRef = useRef<HTMLDivElement | null>(null);
  const distributorCounts = useMemo(
    () => ({
      all: distributorLocations.length,
      uzbekistan: distributorLocations.filter((location) => location.market === 'uzbekistan').length,
      international: distributorLocations.filter((location) => location.market === 'international').length,
    }),
    [distributorLocations],
  );

  const processedLocations = useMemo<DisplayDistributor[]>(() => {
    const nextLocations = distributorLocations.filter((location) => tab === 'all' || location.market === tab);

    return nextLocations
      .map((location) => {
        const areaLabel = getDistributorAreaLabel(location, t.distributors);
        const kindLabel = getDistributorKindLabel(location.kind, t.distributors, language);
        const distance =
          userLocation === null
            ? undefined
            : calculateDistance(
                userLocation[0],
                userLocation[1],
                location.coords.lat,
                location.coords.lng,
              );

        return { ...location, areaLabel, kindLabel, distance };
      })
      .sort((left, right) => {
        if (left.distance !== undefined || right.distance !== undefined) {
          return (left.distance ?? Number.POSITIVE_INFINITY) - (right.distance ?? Number.POSITIVE_INFINITY);
        }

        if (left.market !== right.market) {
          return left.market === 'uzbekistan' ? -1 : 1;
        }

        return left.city.localeCompare(right.city, language);
      });
  }, [distributorLocations, language, t, tab, userLocation]);

  const selectedLocation =
    processedLocations.find((location) => location.id === selectedLocationId) ?? null;
  const focusedLocation =
    processedLocations.find((location) => location.id === focusedLocationId) ??
    (userLocation ? processedLocations[0] ?? null : null);

  const handleLocationSelect = (
    location: DistributorLocation,
    options: { focusMap?: boolean; scrollCard?: boolean } = {},
  ) => {
    const { focusMap = true, scrollCard = false } = options;

    setSelectedLocationId(location.id);
    setExpandedLocationId(location.id);
    if (focusMap) {
      setFocusedLocationId(location.id);
    }
    setLocationError(null);

    if (scrollCard) {
      const card = cardRefs.current[location.id];
      if (card && listRef.current) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleFindNearest = () => {
    if (userLocation && !isLocating) {
      setUserLocation(null);
      setSelectedLocationId(null);
      setFocusedLocationId(null);
      setLocationError(null);
      return;
    }

    if (!navigator.geolocation) {
      setLocationError(ui.locationNotSupported);
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextUserLocation: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserLocation(nextUserLocation);
        setTab('all');
        setIsLocating(false);

        const nearest = distributorLocations
          .map((location) => ({
            location,
            distance: calculateDistance(
              nextUserLocation[0],
              nextUserLocation[1],
              location.coords.lat,
              location.coords.lng,
            ),
          }))
          .sort((left, right) => left.distance - right.distance)[0];

        if (nearest) {
          handleLocationSelect(nearest.location);
        }
      },
      (error) => {
        setIsLocating(false);
        setLocationError(
          error.code === error.PERMISSION_DENIED
            ? ui.locationPermissionDenied
            : ui.locationLookupFailed,
        );
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const handleClearSelection = () => {
    setSelectedLocationId(null);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#ece8df]">
      <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,36.5%)_minmax(0,1fr)] gap-3 p-3 lg:grid-cols-[420px_minmax(0,1fr)] lg:grid-rows-1 lg:gap-4 lg:p-4">
        <section className="order-1 flex min-h-0 flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-sm lg:order-2 lg:rounded-[28px]">
          <div className="min-h-0 flex-1">
              <DistributorMap
                locations={processedLocations}
                activeLocationId={selectedLocation?.id ?? null}
                hoveredLocationId={hoveredLocationId}
                centerOn={focusedLocation ? { ...focusedLocation.coords } : null}
                onLocationClick={(location) =>
                  handleLocationSelect(location, { focusMap: false, scrollCard: true })
                }
                onActiveLocationClose={handleClearSelection}
                onDirectionsClick={(location) =>
                  trackEvent('contact', {
                    contact_type: 'dealer_directions',
                    location_id: location.id,
                    location_name: location.name,
                    location_city: location.city,
                  })
                }
                onPhoneClick={(location, phone) =>
                  trackEvent('contact', {
                    contact_type: 'dealer_phone',
                    location_id: location.id,
                    location_name: location.name,
                    location_city: location.city,
                    phone,
                  })
                }
              />
            </div>
          </section>
        <aside className="order-2 flex min-h-0 flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-sm lg:order-1 lg:rounded-[28px]">
          <div className="shrink-0 border-b border-gray-100 px-4 py-4 lg:px-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {(['all', 'uzbekistan', 'international'] as FilterTab[]).map((tabId) => {
                    const active = tab === tabId;

                    return (
                      <button
                        key={tabId}
                        onClick={() => setTab(tabId)}
                        aria-pressed={active}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          active
                            ? 'bg-[#244d85] text-white'
                            : 'border border-gray-200 bg-white text-gray-600 hover:border-[#244d85]/30 hover:text-[#244d85]'
                        }`}
                      >
                        {tabId === 'all'
                            ? 'All'
                          : tabId === 'uzbekistan'
                            ? 'UZ'
                            : t.distributors.tabs[tabId]} ({distributorCounts[tabId]})
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleFindNearest}
                  disabled={isLocating}
                  aria-label={ui.findNearest}
                  title={ui.findNearest}
                  aria-pressed={userLocation !== null}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    userLocation
                      ? 'bg-[#244d85] text-white hover:bg-[#1c3c69]'
                      : 'bg-[#0B0C0E] text-white hover:bg-black'
                  }`}
                >
                  {isLocating ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  ) : (
                    <Target size={16} />
                  )}
                </button>
              </div>

              {locationError && (
                <div className="rounded-[18px] border border-[#c5a059]/30 bg-[#c5a059]/10 px-4 py-3 text-sm text-[#6f5722]">
                  {locationError}
                </div>
              )}
            </div>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto p-3 lg:p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-[#0B0C0E]">
                {processedLocations.length} {ui.results.toLocaleLowerCase(language)}
              </p>
              {userLocation && (
                <span className="rounded-full bg-[#c5a059]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b6d2c]">
                  {ui.sortedByDistance}
                </span>
              )}
            </div>

            {processedLocations.length === 0 ? (
              <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-[24px] border border-dashed border-gray-200 bg-gray-50 px-6 text-center">
                <Navigation className="mb-4 h-8 w-8 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">{t.distributors.noResults}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {processedLocations.map((location, index) => {
                  const selected = selectedLocationId === location.id;
                  const expanded = expandedLocationId === location.id;
                  const isNearest = Boolean(userLocation) && index === 0;

                  return (
                    <article
                      key={location.id}
                      ref={(element) => {
                        cardRefs.current[location.id] = element;
                      }}
                      onMouseEnter={() => setHoveredLocationId(location.id)}
                      onMouseLeave={() => setHoveredLocationId(null)}
                      className={`rounded-[24px] border px-4 py-4 text-left transition ${
                        selected
                          ? 'border-[#244d85] bg-[#244d85]/[0.04] shadow-[0_10px_26px_rgba(36,77,133,0.08)]'
                          : 'border-gray-200 bg-white hover:border-[#244d85]/25 hover:bg-gray-50'
                      }`}
                    >
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#244d85]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#244d85]">
                              {location.kindLabel}
                            </span>
                            {isNearest && (
                              <span className="rounded-full bg-[#c5a059]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b6d2c]">
                                {ui.nearestMatch}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <button
                            type="button"
                            onClick={() => {
                              if (expanded) {
                                setExpandedLocationId(null);
                                return;
                              }

                              handleLocationSelect(location, { focusMap: false });
                            }}
                            aria-expanded={expanded}
                            aria-label={expanded ? ui.clearSelection : ui.selectedLocation}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#244d85]/30 hover:text-[#244d85]"
                          >
                            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleLocationSelect(location)}
                          onFocus={() => setHoveredLocationId(location.id)}
                          onBlur={() => setHoveredLocationId(null)}
                          className="col-span-2 flex w-full min-w-0 flex-col items-start justify-start text-left"
                        >
                          <h3 className="text-[17px] font-semibold leading-snug text-[#0B0C0E]">
                            {location.name}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
                            <p>{location.city}</p>
                            {location.distance !== undefined && (
                              <span className="rounded-full bg-[#c5a059]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b6d2c]">
                                {ui.distanceLabel(distanceFormatter.format(location.distance))}
                              </span>
                            )}
                          </div>
                        </button>
                      </div>

                      {expanded && (
                        <div className="mt-4 border-t border-gray-100 pt-4">
                          <div className="flex items-start gap-3 text-sm text-gray-600">
                            <Building2 size={16} className="mt-0.5 flex-shrink-0 text-[#244d85]" />
                            <span className="leading-relaxed">{location.address}</span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <a
                              href={getDirectionsUrl(location)}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() =>
                                trackEvent('contact', {
                                  contact_type: 'dealer_directions',
                                  location_id: location.id,
                                  location_name: location.name,
                                  location_city: location.city,
                                })
                              }
                              className="inline-flex items-center gap-2 rounded-full bg-[#244d85] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1c3c69]"
                            >
                              <Navigation size={12} />
                              {t.distributors.info.directions}
                            </a>

                            {location.phones.map((phone) => (
                              <a
                                key={phone}
                                href={getTelHref(phone)}
                                onClick={() =>
                                  trackEvent('contact', {
                                    contact_type: 'dealer_phone',
                                    location_id: location.id,
                                    location_name: location.name,
                                    location_city: location.city,
                                    phone,
                                  })
                                }
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-[#0B0C0E] transition hover:border-[#244d85]/25 hover:text-[#244d85]"
                              >
                                <Phone size={12} />
                                {phone}
                              </a>
                            ))}

                            {location.email && (
                              <a
                                href={`mailto:${location.email}`}
                                onClick={() =>
                                  trackEvent('contact', {
                                    contact_type: 'dealer_email',
                                    location_id: location.id,
                                    location_name: location.name,
                                    location_city: location.city,
                                    email: location.email,
                                  })
                                }
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-[#0B0C0E] transition hover:border-[#244d85]/25 hover:text-[#244d85]"
                              >
                                <Mail size={12} />
                                {location.email}
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
