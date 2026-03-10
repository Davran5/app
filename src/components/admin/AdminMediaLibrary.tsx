import { Copy, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  getMediaPreviewUrl,
  getMediaLibrary,
  type MediaItem,
  normalizeMediaUrl,
  resolveMediaInputUrl,
} from '../../lib/media';
import {
  adminCardClass,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
  adminSubtleTextClass,
  adminTitleClass,
  getAdminPillClass,
} from './styles';

interface AdminMediaLibraryProps {
  title: string;
  description: string;
  selectLabel: string;
  mediaLibrary?: MediaItem[];
  selectedUrls?: string[];
  onSelect: (url: string) => void;
  emptyMessage?: string;
}

export default function AdminMediaLibrary({
  title,
  description,
  selectLabel,
  mediaLibrary,
  selectedUrls = [],
  onSelect,
  emptyMessage = 'No images match the current filter.',
}: AdminMediaLibraryProps) {
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const resolvedMediaLibrary = mediaLibrary ?? getMediaLibrary();
  const resolvedGroups = useMemo(() => {
    return Array.from(
      new Map(resolvedMediaLibrary.map((item) => [item.groupId, item.groupLabel])).entries(),
    ).map(([id, label]) => ({ id, label }));
  }, [resolvedMediaLibrary]);

  const selectedUrlSet = useMemo(
    () =>
      new Set(
        selectedUrls
          .filter(Boolean)
          .map(resolveMediaInputUrl)
          .map(normalizeMediaUrl),
      ),
    [selectedUrls],
  );

  const filteredMedia = useMemo(() => {
    const query = search.trim().toLowerCase();

    return resolvedMediaLibrary.filter((item) => {
      if (selectedGroup !== 'all' && item.groupId !== selectedGroup) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        item.label.toLowerCase().includes(query) ||
        item.groupLabel.toLowerCase().includes(query) ||
        item.decodedUrl.toLowerCase().includes(query)
      );
    });
  }, [resolvedMediaLibrary, search, selectedGroup]);

  const handleCopyPath = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Image path copied.');
    } catch {
      toast.error('Could not copy the image path.');
    }
  };

  return (
    <div className={`${adminCardClass} flex h-full min-h-0 flex-col overflow-hidden p-5`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className={adminLabelClass}>Media</p>
          <h2 className={adminTitleClass}>{title}</h2>
          <p className={`mt-2 max-w-2xl ${adminSubtleTextClass}`}>{description}</p>
        </div>
        <div className="rounded-full border border-black/10 bg-neutral-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
          {resolvedMediaLibrary.length} files
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by file name or path"
            className={`${adminInputClass} pl-10`}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGroup('all')}
            className={getAdminPillClass(selectedGroup === 'all')}
          >
            All Media
          </button>
          {resolvedGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className={getAdminPillClass(selectedGroup === group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex-1 overflow-y-auto pr-1">
        {filteredMedia.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-5 py-10 text-center text-sm text-neutral-500">
            {emptyMessage}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {filteredMedia.map((item) => {
              const selected = selectedUrlSet.has(normalizeMediaUrl(item.url));

              return (
                <div
                  key={item.id}
                  className={`overflow-hidden rounded-[22px] border transition ${
                    selected
                      ? 'border-black shadow-[0_12px_30px_rgba(0,0,0,0.08)]'
                      : 'border-black/10 hover:border-black/20'
                  }`}
                >
                  <div className="aspect-[4/3] bg-neutral-100">
                    <img
                      src={getMediaPreviewUrl(item.url)}
                      alt={item.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-4 p-4">
                    <div>
                      <p className="text-sm font-semibold text-black">{item.label}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                        {item.groupLabel}
                      </p>
                      <p className="mt-2 break-all font-mono text-xs text-neutral-500">{item.url}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => onSelect(item.url)}
                        className={adminPrimaryButtonClass}
                      >
                        {selectLabel}
                      </button>
                      <button
                        onClick={() => void handleCopyPath(item.url)}
                        className={adminSecondaryButtonClass}
                      >
                        <Copy size={14} />
                        Copy Path
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
