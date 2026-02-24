import { useState, useRef, useEffect, useMemo } from 'react';
import { MapPin, Phone, Mail, Building2, ChevronRight, Target, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DistributorMap from './DistributorMap';

// Data is now defined inside the component to support localization

// ─── Utils ────────────────────────────────────────────────────────────────────

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = 'all' | 'uzbekistan' | 'international';

// ─── DealerCard ──────────────────────────────────────────────────────────────

const DealerCard = ({
    item,
    isExpanded,
    activePin,
    onMouseEnter,
    onMouseLeave,
    onCardClick,
    onDealerClick,
    cardRef,
    distance,
    geocodedCoords,
}: {
    item: any;
    isExpanded: boolean;
    activePin: string | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onCardClick: () => void;
    onDealerClick: (id: string, coords: { lat: number, lng: number }) => void;
    cardRef: (el: HTMLDivElement | null) => void;
    distance?: number;
    geocodedCoords: Record<string, { lat: number, lng: number }>;
}) => {
    const title = item.filterTitle || item.region || item.country;
    const subtitle = item.city;
    const dealers = item.dealers;
    return (
        <div
            ref={cardRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onCardClick}
            className={`border-b transition-all duration-300 cursor-pointer select-none group border-l-4 ${isExpanded
                ? 'border-l-[#244d85] bg-slate-50/80 shadow-[inset_0_0_20px_rgba(36,77,133,0.03)]'
                : 'border-l-transparent hover:bg-slate-50/50'
                }`}
            style={{
                borderColor: isExpanded ? '#244d85' : '#F1F5F9',
            }}
        >
            <div className="flex items-center justify-between px-5 py-3 gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="min-w-0 flex items-baseline gap-2">
                        <p className="text-[14px] font-bold text-[#0F172A] truncate uppercase tracking-tight"
                            style={{ fontFamily: "'Inter', sans-serif" }}>
                            {title}
                        </p>
                        <p className="text-[10px] text-[#64748B] truncate font-medium uppercase opacity-60 hidden sm:block">{subtitle}</p>
                    </div>
                    {distance !== undefined && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-[#C5A059] bg-[#C5A059]/10 px-1.5 py-0.5 rounded uppercase flex-shrink-0">
                            <Target className="w-2.5 h-2.5" />
                            {distance.toFixed(0)} km
                        </span>
                    )}
                </div>
                <ChevronRight
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                    style={{
                        color: isExpanded ? '#244d85' : '#CBD5E1',
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                />
            </div>

            <div style={{
                maxHeight: isExpanded ? '800px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                <div className="bg-slate-50/50 border-t border-slate-100 flex flex-col gap-0">
                    {dealers.map((d: any, i: number) => {
                        const coords = d.id ? geocodedCoords[d.id] : null;
                        const isSelected = activePin === d.id;
                        return (
                            <div
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (coords && d.id) onDealerClick(d.id, coords);
                                }}
                                className={`px-6 py-4 border-b border-slate-100 last:border-0 transition-all hover:bg-white ${isSelected ? 'bg-white shadow-sm ring-1 ring-slate-100' : ''}`}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-2.5 flex-1 min-w-0">
                                        <div className="flex items-start gap-3">
                                            <Building2 className="w-4 h-4 text-[#244d85] mt-0.5 flex-shrink-0" />
                                            <span className="text-xs font-bold text-[#1E293B] leading-snug uppercase tracking-tight">{d.name}</span>
                                        </div>
                                        <div className="flex items-start gap-3 pl-7">
                                            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-xs text-slate-500 leading-relaxed font-medium">{d.address}</span>
                                        </div>
                                    </div>

                                    {coords && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}&travelmode=driving`, '_blank');
                                            }}
                                            className="p-2.5 bg-white border border-slate-200 rounded text-slate-400 hover:text-[#244d85] hover:border-[#244d85] hover:bg-[#244d85]/5 transition-all active:scale-95 group/btn"
                                            title="Get Directions"
                                        >
                                            <Navigation size={14} className="group-hover/btn:fill-[#244d85]" />
                                        </button>
                                    )}
                                </div>

                                {d.phones.length > 0 && (
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 pl-7 mt-3">
                                        {d.phones.map((p: string) => (
                                            <a key={p}
                                                href={`tel:${p.replace(/[\s\-()]/g, '')}`}
                                                onClick={e => e.stopPropagation()}
                                                className="flex items-center gap-2 text-xs font-bold text-[#1a5fb4] hover:text-[#C5A059] transition-all"
                                            >
                                                <div className="p-1 bg-[#1a5fb4]/10 rounded">
                                                    <Phone className="w-3 h-3" />
                                                </div>
                                                {p}
                                            </a>
                                        ))}
                                    </div>
                                )}
                                {d.email && (
                                    <a
                                        href={`mailto:${d.email}`}
                                        onClick={e => e.stopPropagation()}
                                        className="flex items-center gap-2 pl-7 mt-2 text-xs text-slate-400 font-medium hover:text-[#244d85] transition-colors"
                                    >
                                        <div className="p-1 bg-slate-100 rounded">
                                            <Mail className="w-3 h-3" />
                                        </div>
                                        {d.email}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Distributors() {
    const { language, t } = useLanguage();
    const [geocodedCoords, setGeocodedCoords] = useState<Record<string, { lat: number, lng: number }>>({});
    const [activePin, setActivePin] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hoveredPin, setHoveredPin] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [centerOn, setCenterOn] = useState<{ lat: number, lng: number } | null>(null);
    const [tab, setTab] = useState<FilterTab>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const uzbekRegions = useMemo(() => [
        {
            id: 'group_tashkent',
            region: t.distributors.regions.tashkent,
            flag: '🇺🇿',
            city: 'Tashkent',
            dealers: [
                {
                    id: 'hq',
                    name: 'OOO "Krantaslizing"',
                    address: 'г. Ташкент, Мирзо Улугбекский район, ул. Зиёлилар, д. 1',
                    phones: ['+998 97 444-23-11', '+998 99 842-38-07'],
                    email: '',
                },
                {
                    id: 't2',
                    name: 'ООО «MAX NET PROFIT»',
                    address: 'г. Ташкент, ул. Катта Хирмонтепа, дом 3 «А»',
                    phones: ['+998 95 145-70-06', '+998 90 806-39-39'],
                    email: 'm.profit@inbox.ru',
                },
                {
                    id: 't3',
                    name: 'ООО «Imagine»',
                    address: '100017 г. Ташкент, Юнусабадский р-н, ул. Янгишахар, дом 9 «А»',
                    phones: ['+998 71 234-64-49', '+998 71 234-64-48'],
                    email: 'info@imagine-group.uz',
                },
            ],
        },
        {
            id: 'f1',
            region: t.distributors.regions.fergana,
            flag: '🇺🇿',
            city: 'Kokand',
            dealers: [
                {
                    id: 'f1',
                    name: 'ООО «Автосанкомплект Транс Сервис»',
                    address: 'г. Коканд, улица Ген. Захирова, 1',
                    phones: ['+998 98 276-61-02', '+998 90 556-61-02', '+998 73 543-30-71'],
                    email: 'mankokand@mail.ru',
                },
            ],
        },
        {
            id: 'j1',
            region: t.distributors.regions.jizzakh,
            flag: '🇺🇿',
            city: 'Jizzakh',
            dealers: [
                { id: 'j1', name: 'ООО «MOPAR TECHNO GROUP»', address: 'г. Джизак, ул. Шароф Рашидова, автомагистраль, дом 92', phones: ['+998 97 740-00-26', '+998 97 774-03-33', '+998 71 269-01-41'], email: 'manservis-morap@mail.ru' },
            ],
        },
        {
            id: 'b1', region: t.distributors.regions.bukhara, flag: '🇺🇿', city: 'Kagan (Bukhara)',
            dealers: [
                { id: 'b1', name: 'ООО «Автоленд-Сервис»', address: 'г. Каган, ул. Бухарская, шоссе 17', phones: ['+998 65 228-82-4', '+998 97 301-33-66', '+998 90 612-00-01'], email: 'avtolend-servis@mail.ru' },
            ],
        },
        {
            id: 'b2', region: t.distributors.regions.bukhara, flag: '🇺🇿', city: 'Bukhara City',
            dealers: [
                { id: 'b2', name: 'ООО «Авто Арсенал»', address: 'Бухарская обл., г. Бухара, ул. А. Дониш, 11', phones: ['+998 98 774-77-57', '+998 98 140-80-48', '+998 98 180-80-48'], email: 'avtosaltanatservis@mail.ru' },
            ],
        },
        {
            id: 'k1', region: t.distributors.regions.kashkadarya, flag: '🇺🇿', city: 'Mubarek',
            dealers: [
                { id: 'k1', name: 'ООО «Муборак-Ягуар»', address: 'Кашкадарьинская обл., ул. Муборак 1м/т Саноар', phones: ['+998 75 672-19-00'], email: 'yaguar_5656@mail.ru' },
            ],
        },
        {
            id: 'n1', region: t.distributors.regions.navoiy, flag: '🇺🇿', city: 'Navoiy',
            dealers: [
                { id: 'n1', name: 'ООО «Navoiy Fast Trans Servise»', address: 'Навоийская обл, г. Навои', phones: ['+998 93 663-00-08', '+998 93 312-41-00'], email: '' },
            ],
        },
        {
            id: 'nam1', region: t.distributors.regions.namangan, flag: '🇺🇿', city: 'Namangan',
            dealers: [
                { id: 'nam1', name: 'ООО «NAM AVTO UNIVERSAL TRANS SERVIS»', address: 'г. Наманган, ул. Кукумбой, дом №7', phones: ['+998 91 347-88-88', '+998 98 771-31-13'], email: '' },
            ],
        },
    ], [t]);

    const internationalRegions = useMemo(() => [
        {
            id: 'group_azerbaijan',
            country: t.distributors.countries.azerbaijan,
            flag: '🇦🇿',
            region: t.distributors.countries.azerbaijan,
            city: 'Baku',
            dealers: [{ id: 'az1', name: 'Baku Regional Center', address: 'г. Баку, Азербайджан', phones: [], email: '' }],
        },
        {
            id: 'group_kazakhstan',
            country: t.distributors.countries.kazakhstan,
            flag: '🇰🇿',
            region: t.distributors.countries.kazakhstan,
            city: 'Almaty, Astana',
            dealers: [
                { id: 'kz1', name: 'Almaty Regional Center', address: 'г. Алматы, Казахстан', phones: [], email: '' },
                { id: 'kz2', name: 'Astana Regional Center', address: 'г. Астана, Казахстан', phones: [], email: '' }
            ],
        },
        {
            id: 'group_kyrgyzstan',
            country: t.distributors.countries.kyrgyzstan,
            flag: '🇰🇬',
            region: t.distributors.countries.kyrgyzstan,
            city: 'Bishkek, Osh',
            dealers: [
                { id: 'kg1', name: 'Bishkek Regional Center', address: 'г. Бишкек, Кыргызстан', phones: [], email: '' },
                { id: 'kg2', name: 'Osh Regional Center', address: 'г. Ош, Кыргызстан', phones: [], email: '' }
            ],
        },
        {
            id: 'group_tajikistan',
            country: t.distributors.countries.tajikistan,
            flag: '🇹🇯',
            region: t.distributors.countries.tajikistan,
            city: 'Dushanbe',
            dealers: [{ id: 'tj1', name: 'Dushanbe Regional Center', address: 'г. Душанbe, Таджикистан', phones: [], email: '' }],
        },
        {
            id: 'group_turkmenistan',
            country: t.distributors.countries.turkmenistan,
            flag: '🇹🇲',
            region: t.distributors.countries.turkmenistan,
            city: 'Ashgabat',
            dealers: [{ id: 'tm1', name: 'Ashgabat Regional Center', address: 'г. Ашхабад, Туркменистан', phones: [], email: '' }],
        },
    ], [t]);

    // Auto-locate on load
    const hasAutoLocated = useRef(false);
    // Auto-locate on load
    useEffect(() => {
        if (Object.keys(geocodedCoords).length > 0 && !hasAutoLocated.current) {
            hasAutoLocated.current = true;
            // Delay auto-location slightly to ensure map is ready
            setTimeout(handleFindNearest, 1000);
        }
    }, [geocodedCoords]);

    const [isLocating, setIsLocating] = useState(false);

    // Refs for scrolling sidebar cards into view
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const listRef = useRef<HTMLDivElement | null>(null);

    // Geolocation logic
    const handleFindNearest = () => {
        if (!navigator.geolocation) return;

        setIsLocating(true);
        setActivePin(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setUserLocation([latitude, longitude]);
                setIsLocating(false);

                // Find the nearest dealer right away to flyTo it
                let nearestId: string | null = null;
                let minDist = Infinity;

                allDealersList.forEach(loc => {
                    // For grouped locations, we check the first dealer's geocoded ID for distance if the group ID itself isn't geocoded
                    const targetId = loc.id === 'group_tashkent' ? 'hq' : loc.id;
                    const coords = geocodedCoords[targetId];
                    if (coords) {
                        const dist = calculateDistance(latitude, longitude, coords.lat, coords.lng);
                        if (dist < minDist) {
                            minDist = dist;
                            nearestId = loc.id;
                        }
                    }
                });

                if (nearestId) {
                    handleCardClick(nearestId);
                }
            },
            (err) => {
                console.warn(err);
                setIsLocating(false);
            }
        );
    };

    // Unified list with geocoded coordinates
    const allDealersList = useMemo(() => {
        return [
            ...uzbekRegions.map(r => ({ ...r, category: 'uzbekistan' as const })),
            ...internationalRegions.map(r => ({ ...r, title: r.country, category: 'international' as const }))
        ];
    }, [uzbekRegions, internationalRegions]);

    // Calculate distances and sort
    const processedDealers = useMemo(() => {
        let list = allDealersList.map(loc => {
            let distance: number | undefined;
            const targetId = loc.id === 'group_tashkent' ? 'hq' : loc.id;
            const coords = geocodedCoords[targetId];
            if (userLocation && coords) {
                distance = calculateDistance(userLocation[0], userLocation[1], coords.lat, coords.lng);
            }
            return {
                ...loc,
                distance,
                filterTitle: (loc as any).title || (loc as any).country || loc.region
            };
        });

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            list = list.filter(l =>
                l.filterTitle.toLowerCase().includes(query) ||
                l.city.toLowerCase().includes(query) ||
                l.dealers.some(d => d.name.toLowerCase().includes(query) || d.address.toLowerCase().includes(query))
            );
        }

        // Tab filter
        if (tab !== 'all') {
            list = list.filter(l => l.category === tab);
        }

        // Nearest sorting
        if (userLocation) {
            list.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
        }

        return list;
    }, [allDealersList, geocodedCoords, tab, userLocation]);

    const handleCardClick = (id: string) => {
        const isOpening = expandedId !== id;
        // Accordion: only one open at a time
        setExpandedId(isOpening ? id : null);

        // Scroll the list container to show the card at the top
        if (isOpening) {
            setTimeout(() => {
                const card = cardRefs.current[id];
                const list = listRef.current;
                if (card && list) {
                    const cardRect = card.getBoundingClientRect();
                    const listRect = list.getBoundingClientRect();
                    const scrollTo = list.scrollTop + cardRect.top - listRect.top - 8;
                    list.scrollTo({ top: scrollTo, behavior: 'smooth' });
                }
            }, 50);
        }
    };

    const handleDealerSelect = (id: string, coords: { lat: number, lng: number }) => {
        setActivePin(id);
        setCenterOn(coords);

        const group = allDealersList.find(loc =>
            loc.id === id || loc.dealers.some(d => d.id === id)
        );

        if (group) {
            setExpandedId(group.id);
            const card = cardRefs.current[group.id];
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    };

    // Callback when map marker is clicked
    const handleMapMarkerClick = (id: string, coords: { lat: number, lng: number }) => {
        handleDealerSelect(id, coords);
    };

    return (
        <section className="relative w-full flex flex-col lg:grid lg:grid-cols-1 overflow-hidden" style={{ height: 'calc(100vh - 60px)', minHeight: 600 }}>

            {/* ════════ MAP CONTAINER ════════ */}
            <div className="h-[40dvh] lg:h-full lg:absolute lg:inset-0 z-0">
                <DistributorMap
                    activePin={activePin}
                    hoveredPin={hoveredPin}
                    centerOn={centerOn}
                    onLocationClick={handleMapMarkerClick}
                    onGeocoded={setGeocodedCoords}
                />
            </div>

            {/* ════════ SIDEBAR / LIST ════════ */}
            <aside
                className="relative lg:absolute lg:top-0 lg:left-0 w-full lg:w-[380px] h-[60dvh] lg:h-full z-[1001] flex flex-col"
                style={{
                    background: 'rgba(255,255,255,0.98)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '10px 0 50px rgba(0,0,0,0.1)',
                }}
            >
                {/* ─ Header ─ */}
                <div className="flex-shrink-0 px-6 pt-10 pb-6 border-b border-slate-100 space-y-4">
                    <h2 className="font-display text-2xl font-black text-[#0F172A] leading-tight uppercase tracking-tight"
                        style={{ fontFamily: "'Montreal', sans-serif" }}>
                        {t.distributors.title}
                    </h2>

                    <div className="relative group hidden lg:block">
                        <input
                            type="text"
                            placeholder={t.distributors.searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 focus:bg-white focus:border-[#244d85]/30 focus:ring-0 text-xs font-bold uppercase tracking-wider transition-all"
                            style={{ borderRadius: '2px' }}
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#244d85] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                    </div>
                </div>

                {/* ─ Filter Tabs & Geolocation ─ */}
                <div className="flex-shrink-0 px-6 py-4 flex gap-1 items-center">
                    {(['all', 'uzbekistan', 'international'] as FilterTab[]).map((tId) => {
                        const label = t.distributors.tabs[tId];
                        const isActive = tab === tId;
                        return (
                            <button
                                key={tId}
                                onClick={() => setTab(tId)}
                                className={`py-2.5 text-[10px] flex-1 ${language === 'ru' ? 'font-medium' : 'font-black'} uppercase tracking-wider transition-all border ${isActive
                                    ? 'bg-[#244d85] border-[#244d85] text-white shadow-md'
                                    : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                                    }`}
                                style={{ borderRadius: '2px' }}
                            >
                                {label}
                            </button>
                        );
                    })}

                    <button
                        onClick={handleFindNearest}
                        disabled={isLocating}
                        title="Find Nearest"
                        className={`p-2.5 transition-all text-[#244d85] hover:bg-slate-50 active:scale-95 disabled:opacity-50 flex items-center justify-center`}
                    >
                        {isLocating ? (
                            <div className="w-5 h-5 border-2 border-[#244d85] border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Target className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* ─ List Content ─ */}
                <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-hide border-t border-slate-50">
                    {processedDealers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 opacity-20">
                            <Navigation className="w-12 h-12 mb-4" />
                            <p className="text-xs font-bold uppercase tracking-widest">{t.distributors.noResults}</p>
                        </div>
                    ) : (
                        processedDealers.map((loc) => (
                            <DealerCard
                                key={loc.id}
                                item={loc}
                                cardRef={(el) => cardRefs.current[loc.id] = el}
                                distance={loc.distance}
                                geocodedCoords={geocodedCoords}
                                isExpanded={expandedId === loc.id}
                                activePin={activePin}
                                onMouseEnter={() => setHoveredPin(loc.id)}
                                onMouseLeave={() => setHoveredPin(null)}
                                onCardClick={() => handleCardClick(loc.id)}
                                onDealerClick={handleDealerSelect}
                            />
                        ))
                    )}
                </div>


            </aside>
        </section>
    );
}
