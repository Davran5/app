import { useCallback, useEffect, useState } from 'react';
import { Globe2, Info } from 'lucide-react';
import { toast } from 'sonner';
import { SEO_PAGE_LABELS, type SeoPageKey, type SeoSettings } from '../../lib/cms';
import { ADMIN_PANEL_PATH } from '../../lib/adminRoute';
import {
  adminCardClass,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
  getAdminListItemClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface AdminSeoProps {
  seo: Record<SeoPageKey, SeoSettings>;
  updateSeoPage: (pageKey: SeoPageKey, settings: SeoSettings) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

const SEO_ROUTE_PATHS: Record<SeoPageKey, string> = {
  home: '/',
  about: '/about',
  products: '/products',
  catalog: '/catalog',
  productDetail: '/product/:productId',
  customSolutions: '/custom-solutions',
  services: '/services',
  news: '/news',
  careers: '/careers',
  contacts: '/contacts',
  findDealer: '/find-dealer',
  admin: ADMIN_PANEL_PATH,
};

const SEO_PAGE_DESCRIPTIONS: Partial<Record<SeoPageKey, string>> = {
  home: 'Controls the title and meta description shown in search results for the main landing page.',
  about: 'Affects how the About Us page appears in search engine results and social shares.',
  products: 'Meta data for the Products listing page.',
  catalog: 'Meta data for the full product catalog view.',
  productDetail: 'Shared meta template used for individual product detail pages.',
  customSolutions: 'Controls SEO for the Custom Solutions page.',
  services: 'Meta data for the Services overview page.',
  news: 'Affects news and press releases discoverability.',
  careers: 'Controls how the Careers / Vacancies page appears in search.',
  contacts: 'Meta data for the Contacts and inquiry page.',
  findDealer: 'SEO data for the Find a Dealer locator page.',
};

function getScoreColor(length: number, ideal: [number, number], warn: number) {
  if (length === 0) return 'text-neutral-400';
  if (length < ideal[0] || length > warn) return 'text-amber-500';
  if (length > ideal[1]) return 'text-amber-500';
  return 'text-emerald-600';
}

export default function AdminSeo({
  seo,
  updateSeoPage,
  onPrimaryActionChange,
}: AdminSeoProps) {
  const [selectedSeoPage, setSelectedSeoPage] = useState<SeoPageKey>('home');
  const [seoDraft, setSeoDraft] = useState<SeoSettings>(seo.home);

  useEffect(() => {
    setSeoDraft(seo[selectedSeoPage]);
  }, [seo, selectedSeoPage]);

  const handleSaveSeo = useCallback(async () => {
    try {
      const routePath = SEO_ROUTE_PATHS[selectedSeoPage];
      const response = await fetch('/api/seo', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          path: routePath,
          seo: {
            ...seoDraft,
            ogTitle: seoDraft.title,
            ogDescription: seoDraft.description,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      updateSeoPage(selectedSeoPage, seoDraft);
      toast.success('SEO settings saved to server.');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Failed to save SEO settings to server.', error);
      }
      toast.error('Failed to save SEO settings.');
    }
  }, [seoDraft, selectedSeoPage, updateSeoPage]);

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save SEO',
      onClick: handleSaveSeo,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [handleSaveSeo, onPrimaryActionChange]);

  const pageDescription = SEO_PAGE_DESCRIPTIONS[selectedSeoPage];
  const routePath = SEO_ROUTE_PATHS[selectedSeoPage];
  const titleLen = seoDraft.title.length;
  const descLen = seoDraft.description.length;

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div>
          <p className={adminLabelClass}>Route SEO</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-black">Page Settings</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Select a route to edit its search engine metadata.
          </p>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-2">
            {(Object.keys(SEO_PAGE_LABELS) as SeoPageKey[]).map((pageKey) => {
              const active = selectedSeoPage === pageKey;
              const settings = seo[pageKey];
              const hasContent = settings?.title || settings?.description;

              return (
                <button
                  key={pageKey}
                  onClick={() => setSelectedSeoPage(pageKey)}
                  className={getAdminListItemClass(active)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{SEO_PAGE_LABELS[pageKey]}</p>
                    {hasContent && (
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          active ? 'bg-white/60' : 'bg-emerald-500'
                        }`}
                      />
                    )}
                  </div>
                  <p
                    className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                      active ? 'text-white/70' : 'text-neutral-500'
                    }`}
                  >
                    {SEO_ROUTE_PATHS[pageKey]}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Editor */}
      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden`}>
        {/* Header */}
        <div className="shrink-0 border-b border-black/10 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className={adminLabelClass}>Editing</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">
                {SEO_PAGE_LABELS[selectedSeoPage]}
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">{routePath}</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-neutral-50 text-black">
              <Globe2 size={18} />
            </div>
          </div>

          {pageDescription && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-blue-50 px-3 py-2.5">
              <Info size={14} className="mt-0.5 shrink-0 text-blue-500" />
              <p className="text-xs leading-relaxed text-blue-700">{pageDescription}</p>
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="max-w-2xl space-y-6">
            {/* Title */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.06] bg-neutral-50/60 px-4 py-2.5">
                <div>
                  <h3 className="text-sm font-semibold text-black">Page Title</h3>
                  <p className="text-[11px] text-neutral-500">Shown in browser tabs and search result headings</p>
                </div>
                <span className={`text-xs font-semibold tabular-nums ${getScoreColor(titleLen, [50, 60], 70)}`}>
                  {titleLen} / 60
                </span>
              </div>
              <div className="p-4">
                <input
                  value={seoDraft.title}
                  onChange={(event) =>
                    setSeoDraft((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Page title…"
                  className={adminInputClass}
                />
                {titleLen > 60 && (
                  <p className="mt-2 text-xs text-amber-600">
                    Recommended max is 60 characters. Longer titles may be truncated in search results.
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/[0.06] bg-neutral-50/60 px-4 py-2.5">
                <div>
                  <h3 className="text-sm font-semibold text-black">Meta Description</h3>
                  <p className="text-[11px] text-neutral-500">Shown in search engine result previews</p>
                </div>
                <span className={`text-xs font-semibold tabular-nums ${getScoreColor(descLen, [120, 160], 180)}`}>
                  {descLen} / 160
                </span>
              </div>
              <div className="p-4">
                <textarea
                  value={seoDraft.description}
                  onChange={(event) =>
                    setSeoDraft((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Brief, compelling summary of this page…"
                  className={adminTextareaClass}
                />
                {descLen > 160 && (
                  <p className="mt-2 text-xs text-amber-600">
                    Recommended max is 160 characters. Longer descriptions may be cut off in search results.
                  </p>
                )}
              </div>
            </div>

            {/* Keywords */}
            <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
              <div className="border-b border-black/[0.06] bg-neutral-50/60 px-4 py-2.5">
                <h3 className="text-sm font-semibold text-black">Keywords</h3>
                <p className="text-[11px] text-neutral-500">
                  Comma-separated terms (less critical for modern SEO, still useful for context)
                </p>
              </div>
              <div className="p-4">
                <textarea
                  value={seoDraft.keywords}
                  onChange={(event) =>
                    setSeoDraft((current) => ({
                      ...current,
                      keywords: event.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="keyword one, keyword two, keyword three…"
                  className={adminTextareaClass}
                />
              </div>
            </div>

            {/* SERP Preview */}
            <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
              <p className={adminLabelClass}>Search Preview</p>
              <div className="mt-3 rounded-xl border border-black/10 bg-white p-4">
                <p className="text-xs text-emerald-700">{`krantos.com${routePath}`}</p>
                <p className="mt-1 text-base font-medium text-blue-700 leading-snug">
                  {seoDraft.title || <span className="italic text-neutral-400">No title set</span>}
                </p>
                <p className="mt-1 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                  {seoDraft.description || <span className="italic text-neutral-400">No description set</span>}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
