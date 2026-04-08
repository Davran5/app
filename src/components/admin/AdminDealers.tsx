import { useCallback, useEffect, useMemo, useState } from 'react';
import { Copy, Mail, MapPin, MapPinned, Phone, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { DistributorLocation } from '../../data/distributors';
import { createEmptyDistributorLocation, slugifyProductId } from '../../lib/cms';
import {
  adminCardClass,
  adminDangerButtonClass,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
  adminTextareaClass,
  adminTitleClass,
  getAdminListItemClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface AdminDealersProps {
  distributorLocations: DistributorLocation[];
  upsertDistributorLocation: (location: DistributorLocation) => void;
  deleteDistributorLocation: (id: string) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

const NEW_LOCATION_KEY = '__new_location__';

const MARKET_LABELS: Record<string, string> = {
  uzbekistan: 'Uzbekistan',
  international: 'International',
};

const KIND_LABELS: Record<string, string> = {
  hq: 'Headquarters',
  dealer: 'Authorized Dealer',
  service: 'Service Partner',
  regional: 'Regional Center',
};

function cloneLocation(location: DistributorLocation) {
  return JSON.parse(JSON.stringify(location)) as DistributorLocation;
}

export default function AdminDealers({
  distributorLocations,
  upsertDistributorLocation,
  deleteDistributorLocation,
  onPrimaryActionChange,
}: AdminDealersProps) {
  const [selectedLocationKey, setSelectedLocationKey] = useState<string>(
    distributorLocations[0]?.id ?? NEW_LOCATION_KEY,
  );
  const [dealerSearch, setDealerSearch] = useState('');
  const [locationDraft, setLocationDraft] = useState<DistributorLocation>(
    cloneLocation(distributorLocations[0] ?? createEmptyDistributorLocation()),
  );

  const filteredLocations = useMemo(() => {
    const query = dealerSearch.trim().toLowerCase();
    if (!query) {
      return distributorLocations;
    }

    return distributorLocations.filter((location) =>
      [location.name, location.city, location.address, location.id]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [dealerSearch, distributorLocations]);

  useEffect(() => {
    if (selectedLocationKey === NEW_LOCATION_KEY) {
      return;
    }

    const selectedLocation = distributorLocations.find((location) => location.id === selectedLocationKey);

    if (selectedLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocationDraft(cloneLocation(selectedLocation));
      return;
    }

    setSelectedLocationKey(distributorLocations[0]?.id ?? NEW_LOCATION_KEY);
  }, [distributorLocations, selectedLocationKey]);

  const handleCreateLocation = () => {
    setSelectedLocationKey(NEW_LOCATION_KEY);
    setLocationDraft(cloneLocation(createEmptyDistributorLocation()));
  };

  const handleDuplicateLocation = () => {
    setSelectedLocationKey(NEW_LOCATION_KEY);
    setLocationDraft((current) => ({
      ...cloneLocation(current),
      id: `${slugifyProductId(current.name || current.city || 'dealer')}-copy`,
      name: current.name ? `${current.name} Copy` : '',
    }));
    toast.success('Dealer draft duplicated.');
  };

  const handleSaveLocation = useCallback(() => {
    const nextId = locationDraft.id.trim() || slugifyProductId(locationDraft.name || locationDraft.city);
    if (!nextId) {
      toast.error('Location ID is required.');
      return;
    }

    if (!locationDraft.name.trim() || !locationDraft.city.trim()) {
      toast.error('Location name and city are required.');
      return;
    }

    const idTaken = distributorLocations.some(
      (location) => location.id === nextId && location.id !== selectedLocationKey,
    );

    if (idTaken) {
      toast.error('That location ID is already in use.');
      return;
    }

    const sanitized: DistributorLocation = {
      ...cloneLocation(locationDraft),
      id: nextId,
      name: locationDraft.name.trim(),
      address: locationDraft.address.trim(),
      city: locationDraft.city.trim(),
      phones: locationDraft.phones.map((phone) => phone.trim()).filter(Boolean),
      email: locationDraft.email.trim(),
      coords: {
        lat: Number(locationDraft.coords.lat) || 0,
        lng: Number(locationDraft.coords.lng) || 0,
      },
      regionKey: locationDraft.market === 'uzbekistan' ? locationDraft.regionKey : undefined,
      countryKey: locationDraft.market === 'international' ? locationDraft.countryKey : undefined,
    };

    upsertDistributorLocation(sanitized);

    if (selectedLocationKey !== NEW_LOCATION_KEY && selectedLocationKey !== nextId) {
      deleteDistributorLocation(selectedLocationKey);
    }

    setSelectedLocationKey(nextId);
    setLocationDraft(cloneLocation(sanitized));
    toast.success('Dealer location saved.');
  }, [deleteDistributorLocation, distributorLocations, locationDraft, selectedLocationKey, upsertDistributorLocation]);

  const handleDeleteLocation = () => {
    if (selectedLocationKey === NEW_LOCATION_KEY) {
      setLocationDraft(cloneLocation(createEmptyDistributorLocation()));
      return;
    }

    deleteDistributorLocation(selectedLocationKey);
    setSelectedLocationKey(
      distributorLocations.find((location) => location.id !== selectedLocationKey)?.id ?? NEW_LOCATION_KEY,
    );
    toast.success('Dealer location deleted.');
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save Dealer',
      onClick: handleSaveLocation,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [handleSaveLocation, onPrimaryActionChange]);

  // Group counts
  const uzCount = distributorLocations.filter((l) => l.market === 'uzbekistan').length;
  const intlCount = distributorLocations.filter((l) => l.market === 'international').length;

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={adminLabelClass}>Find Dealer</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">Locations</h2>
          </div>
          <button onClick={handleCreateLocation} className={adminPrimaryButtonClass}>
            <Plus size={16} />
          </button>
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-black/10 bg-neutral-50 px-2 py-2 text-center">
            <p className="text-lg font-semibold text-black">{distributorLocations.length}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Total</p>
          </div>
          <div className="rounded-xl border border-black/10 bg-neutral-50 px-2 py-2 text-center">
            <p className="text-lg font-semibold text-black">{uzCount}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">UZ</p>
          </div>
          <div className="rounded-xl border border-black/10 bg-neutral-50 px-2 py-2 text-center">
            <p className="text-lg font-semibold text-black">{intlCount}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Intl</p>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
          <Search size={16} className="text-neutral-400" />
          <input
            value={dealerSearch}
            onChange={(event) => setDealerSearch(event.target.value)}
            placeholder="Search dealers"
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </label>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-2">
            <button
              onClick={handleCreateLocation}
              className={getAdminListItemClass(selectedLocationKey === NEW_LOCATION_KEY)}
            >
              <p className="text-sm font-semibold">New Location</p>
              <p
                className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                  selectedLocationKey === NEW_LOCATION_KEY ? 'text-white/70' : 'text-neutral-500'
                }`}
              >
                Draft
              </p>
            </button>

            {filteredLocations.map((location) => {
              const active = selectedLocationKey === location.id;
              return (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocationKey(location.id)}
                  className={getAdminListItemClass(active)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{location.name}</p>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        active ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {KIND_LABELS[location.kind] ?? location.kind}
                    </span>
                  </div>
                  <div className={`mt-1.5 flex items-center gap-1.5 text-xs ${active ? 'text-white/70' : 'text-neutral-500'}`}>
                    <MapPin size={11} />
                    {location.city}
                    <span className={`ml-auto text-[10px] font-semibold uppercase tracking-[0.1em] ${active ? 'text-white/50' : 'text-neutral-400'}`}>
                      {MARKET_LABELS[location.market] ?? location.market}
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredLocations.length === 0 && dealerSearch && (
              <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
                No dealers match &ldquo;{dealerSearch}&rdquo;
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Editor */}
      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden`}>
        {/* Header */}
        <div className="shrink-0 border-b border-black/10 px-6 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className={adminLabelClass}>Dealer Editor</p>
              <h2 className={adminTitleClass}>{locationDraft.name || 'Dealer location'}</h2>
              {locationDraft.city && (
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-neutral-500">
                  <MapPin size={13} />
                  {locationDraft.city}
                  {locationDraft.market ? ` · ${MARKET_LABELS[locationDraft.market] ?? locationDraft.market}` : ''}
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button onClick={handleDuplicateLocation} className={adminSecondaryButtonClass}>
                <Copy size={15} />
                Duplicate
              </button>
              <button onClick={handleDeleteLocation} className={adminDangerButtonClass}>
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            {/* Left column */}
            <div className="border-r border-black/10">
              <div className="border-b border-black/[0.06] bg-neutral-50/60 px-5 py-3.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Location Details</h3>
              </div>

              <div className="space-y-4 p-5">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Location ID</span>
                  <input
                    value={locationDraft.id}
                    onChange={(event) => setLocationDraft((current) => ({ ...current, id: event.target.value }))}
                    className={adminInputClass}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Location Name</span>
                    <input
                      value={locationDraft.name}
                      onChange={(event) => setLocationDraft((current) => ({ ...current, name: event.target.value }))}
                      className={adminInputClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>City</span>
                    <input
                      value={locationDraft.city}
                      onChange={(event) => setLocationDraft((current) => ({ ...current, city: event.target.value }))}
                      className={adminInputClass}
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Address</span>
                  <textarea
                    rows={3}
                    value={locationDraft.address}
                    onChange={(event) => setLocationDraft((current) => ({ ...current, address: event.target.value }))}
                    className={adminTextareaClass}
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Latitude</span>
                    <input
                      type="number"
                      step="any"
                      value={locationDraft.coords.lat}
                      onChange={(event) =>
                        setLocationDraft((current) => ({
                          ...current,
                          coords: { ...current.coords, lat: Number(event.target.value) },
                        }))
                      }
                      className={adminInputClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Longitude</span>
                    <input
                      type="number"
                      step="any"
                      value={locationDraft.coords.lng}
                      onChange={(event) =>
                        setLocationDraft((current) => ({
                          ...current,
                          coords: { ...current.coords, lng: Number(event.target.value) },
                        }))
                      }
                      className={adminInputClass}
                    />
                  </label>
                </div>

                {/* Map preview link */}
                {locationDraft.coords.lat !== 0 && locationDraft.coords.lng !== 0 && (
                  <a
                    href={`https://www.google.com/maps?q=${locationDraft.coords.lat},${locationDraft.coords.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-100"
                  >
                    <MapPinned size={14} />
                    View on Google Maps
                  </a>
                )}
              </div>
            </div>

            {/* Right column */}
            <div>
              <div className="border-b border-black/[0.06] bg-neutral-50/60 px-5 py-3.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Contact & Classification</h3>
              </div>

              <div className="space-y-4 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Market</span>
                    <select
                      value={locationDraft.market}
                      onChange={(event) =>
                        setLocationDraft((current) => ({
                          ...current,
                          market: event.target.value as DistributorLocation['market'],
                          regionKey: event.target.value === 'uzbekistan' ? current.regionKey : undefined,
                          countryKey: event.target.value === 'international' ? current.countryKey : undefined,
                        }))
                      }
                      className={adminInputClass}
                    >
                      <option value="uzbekistan">Uzbekistan</option>
                      <option value="international">International</option>
                    </select>
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Location Type</span>
                    <select
                      value={locationDraft.kind}
                      onChange={(event) =>
                        setLocationDraft((current) => ({
                          ...current,
                          kind: event.target.value as DistributorLocation['kind'],
                        }))
                      }
                      className={adminInputClass}
                    >
                      <option value="hq">Headquarters</option>
                      <option value="dealer">Authorized Dealer</option>
                      <option value="service">Service Partner</option>
                      <option value="regional">Regional Center</option>
                    </select>
                  </label>
                </div>

                {locationDraft.market === 'uzbekistan' ? (
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Region</span>
                    <select
                      value={locationDraft.regionKey ?? ''}
                      onChange={(event) =>
                        setLocationDraft((current) => ({
                          ...current,
                          regionKey: (event.target.value || undefined) as DistributorLocation['regionKey'],
                        }))
                      }
                      className={adminInputClass}
                    >
                      <option value="">No region</option>
                      <option value="tashkent">Tashkent</option>
                      <option value="fergana">Fergana</option>
                      <option value="jizzakh">Jizzakh</option>
                      <option value="bukhara">Bukhara</option>
                      <option value="kashkadarya">Kashkadarya</option>
                      <option value="navoiy">Navoiy</option>
                      <option value="namangan">Namangan</option>
                    </select>
                  </label>
                ) : (
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Country</span>
                    <select
                      value={locationDraft.countryKey ?? ''}
                      onChange={(event) =>
                        setLocationDraft((current) => ({
                          ...current,
                          countryKey: (event.target.value || undefined) as DistributorLocation['countryKey'],
                        }))
                      }
                      className={adminInputClass}
                    >
                      <option value="">No country</option>
                      <option value="azerbaijan">Azerbaijan</option>
                      <option value="kazakhstan">Kazakhstan</option>
                      <option value="kyrgyzstan">Kyrgyzstan</option>
                      <option value="tajikistan">Tajikistan</option>
                      <option value="turkmenistan">Turkmenistan</option>
                    </select>
                  </label>
                )}

                <label className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-neutral-400" />
                    <span className={adminLabelClass}>Phone Numbers</span>
                    <span className="ml-auto text-[10px] text-neutral-400">One per line</span>
                  </div>
                  <textarea
                    rows={4}
                    value={locationDraft.phones.join('\n')}
                    onChange={(event) =>
                      setLocationDraft((current) => ({
                        ...current,
                        phones: event.target.value.split('\n'),
                      }))
                    }
                    placeholder={`+998 71 123 4567\n+998 71 123 4568`}
                    className={adminTextareaClass}
                  />
                </label>

                <label className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-neutral-400" />
                    <span className={adminLabelClass}>Email</span>
                  </div>
                  <input
                    value={locationDraft.email}
                    onChange={(event) => setLocationDraft((current) => ({ ...current, email: event.target.value }))}
                    placeholder="dealer@example.com"
                    className={adminInputClass}
                  />
                </label>

                {/* Contact preview card */}
                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm">
                      <MapPinned size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">{locationDraft.name || 'Location preview'}</p>
                      <p className="text-xs text-neutral-500">
                        {locationDraft.city || 'No city set'}
                        {locationDraft.market ? ` · ${MARKET_LABELS[locationDraft.market] ?? locationDraft.market}` : ''}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600">{locationDraft.address || 'Address preview will appear here.'}</p>
                  {locationDraft.phones.filter(Boolean).length > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-neutral-600">
                      <Phone size={13} className="text-neutral-400" />
                      {locationDraft.phones.filter(Boolean)[0]}
                    </div>
                  )}
                  {locationDraft.email && (
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-neutral-600">
                      <Mail size={13} className="text-neutral-400" />
                      {locationDraft.email}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
