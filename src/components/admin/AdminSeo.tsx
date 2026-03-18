import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { SEO_PAGE_LABELS, type SeoPageKey, type SeoSettings } from '../../lib/cms';
import { ADMIN_PANEL_PATH } from '../../lib/adminRoute';
import {
  adminCardClass,
  adminInputClass,
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

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <h2 className="text-lg font-semibold text-black">Pages</h2>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-3">
            {(Object.keys(SEO_PAGE_LABELS) as SeoPageKey[]).map((pageKey) => (
              <button
                key={pageKey}
                onClick={() => setSelectedSeoPage(pageKey)}
                className={getAdminListItemClass(selectedSeoPage === pageKey)}
              >
                <p className="text-sm font-semibold">{SEO_PAGE_LABELS[pageKey]}</p>
                <p
                  className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                    selectedSeoPage === pageKey ? 'text-white/70' : 'text-neutral-500'
                  }`}
                >
                  {pageKey}
                </p>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-6`}>
        <h2 className="text-lg font-semibold text-black">{SEO_PAGE_LABELS[selectedSeoPage]}</h2>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Title</span>
              <input
                value={seoDraft.title}
                onChange={(event) =>
                  setSeoDraft((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                className={adminInputClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Description</span>
              <textarea
                value={seoDraft.description}
                onChange={(event) =>
                  setSeoDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                rows={5}
                className={adminTextareaClass}
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Keywords</span>
              <textarea
                value={seoDraft.keywords}
                onChange={(event) =>
                  setSeoDraft((current) => ({
                    ...current,
                    keywords: event.target.value,
                  }))
                }
                rows={4}
                className={adminTextareaClass}
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
