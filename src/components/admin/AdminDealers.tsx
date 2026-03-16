import { useCallback, useEffect, useMemo, useState } from 'react';
import { Copy, MapPinned, Plus, Search, Trash2 } from 'lucide-react';
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

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-black">Dealer Locations</h2>
            <p className="mt-1 text-sm text-neutral-500">Edit map locations, contact details, and market data.</p>
          </div>
          <button onClick={handleCreateLocation} className={adminPrimaryButtonClass}>
            <Plus size={16} />
          </button>
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
          <div className="space-y-3">
            <button
              onClick={handleCreateLocation}
              className={getAdminListItemClass(selectedLocationKey === NEW_LOCATION_KEY)}
            >
              <p className="text-sm font-semibold">New Location</p>
            </button>

            {filteredLocations.map((location) => {
              const active = selectedLocationKey === location.id;
              return (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocationKey(location.id)}
                  className={getAdminListItemClass(active)}
                >
                  <p className="truncate text-sm font-semibold">{location.name}</p>
                  <p className={`mt-1 text-xs uppercase tracking-[0.12em] ${active ? 'text-white/70' : 'text-neutral-500'}`}>
                    {location.city} | {location.market}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-6`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={adminLabelClass}>Find Dealer</p>
            <h2 className={adminTitleClass}>{locationDraft.name || 'Dealer location'}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleDuplicateLocation} className={adminSecondaryButtonClass}>
              <Copy size={16} />
              Duplicate
            </button>
            <button onClick={handleDeleteLocation} className={adminDangerButtonClass}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="space-y-4">
              <label className="space-y-2">
                <span className={adminLabelClass}>Location ID</span>
                <input
                  value={locationDraft.id}
                  onChange={(event) => setLocationDraft((current) => ({ ...current, id: event.target.value }))}
                  className={adminInputClass}
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
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

              <div className="grid gap-4 md:grid-cols-2">
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
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
                <span className={adminLabelClass}>Phones</span>
                <textarea
                  rows={4}
                  value={locationDraft.phones.join('\n')}
                  onChange={(event) =>
                    setLocationDraft((current) => ({
                      ...current,
                      phones: event.target.value.split('\n'),
                    }))
                  }
                  placeholder="One phone per line"
                  className={adminTextareaClass}
                />
              </label>

              <label className="space-y-2">
                <span className={adminLabelClass}>Email</span>
                <input
                  value={locationDraft.email}
                  onChange={(event) => setLocationDraft((current) => ({ ...current, email: event.target.value }))}
                  className={adminInputClass}
                />
              </label>

              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm">
                    <MapPinned size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">{locationDraft.name || 'Location preview'}</p>
                    <p className="text-xs text-neutral-500">{locationDraft.city || 'No city set'}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-600">{locationDraft.address || 'Address preview will appear here.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
