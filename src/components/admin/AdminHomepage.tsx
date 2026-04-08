import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Plus, Search, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '../../data/products';
import { getMediaPreviewUrl, resolveMediaInputUrl } from '../../lib/media';
import {
  adminCardClass,
  adminDangerButtonClass,
  adminInputClass,
  adminLabelClass,
  adminSecondaryButtonClass,
  getAdminListItemClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface AdminHomepageProps {
  products: Product[];
  featuredProductIds: string[];
  setFeaturedProductIds: (ids: string[]) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

function arraysEqual(left: string[], right: string[]) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export default function AdminHomepage({
  products,
  featuredProductIds,
  setFeaturedProductIds,
  onPrimaryActionChange,
}: AdminHomepageProps) {
  const [featuredDraftIds, setFeaturedDraftIds] = useState<string[]>(featuredProductIds);
  const [librarySearch, setLibrarySearch] = useState('');

  useEffect(() => {
    setFeaturedDraftIds(featuredProductIds);
  }, [featuredProductIds]);

  const featuredProducts = useMemo(
    () =>
      featuredDraftIds
        .map((productId) => products.find((product) => product.id === productId))
        .filter((product): product is Product => Boolean(product)),
    [featuredDraftIds, products],
  );

  const availableProducts = useMemo(() => {
    const query = librarySearch.trim().toLowerCase();

    return products.filter((product) => {
      if (featuredDraftIds.includes(product.id)) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query)
      );
    });
  }, [featuredDraftIds, librarySearch, products]);

  const isDirty = !arraysEqual(featuredDraftIds, featuredProductIds);

  const handleSave = useCallback(() => {
    setFeaturedProductIds(featuredDraftIds);
    toast.success('Featured products saved.');
  }, [featuredDraftIds, setFeaturedProductIds]);

  const handleAddProduct = (productId: string) => {
    if (!productId || featuredDraftIds.includes(productId)) {
      return;
    }

    setFeaturedDraftIds((current) => [...current, productId]);
  };

  const handleRemoveProduct = (productId: string) => {
    setFeaturedDraftIds((current) => current.filter((id) => id !== productId));
  };

  const handleMoveProduct = (productId: string, direction: -1 | 1) => {
    setFeaturedDraftIds((current) => {
      const index = current.indexOf(productId);

      if (index === -1) {
        return current;
      }

      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const next = [...current];
      const [moved] = next.splice(index, 1);
      next.splice(nextIndex, 0, moved);
      return next;
    });
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save Featured Products',
      onClick: handleSave,
      disabled: !isDirty,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [handleSave, isDirty, onPrimaryActionChange]);

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={adminLabelClass}>Homepage</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">Featured Products</h2>
            <p className="mt-1 text-sm text-neutral-500">Products shown in the hero spotlight on the homepage.</p>
          </div>
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-neutral-50 text-black">
            <Star size={18} />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-black">Selected products</span>
            <span className="text-xs uppercase tracking-[0.12em] text-neutral-500">
              {featuredProducts.length}
            </span>
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-3">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-black/10 bg-white p-3"
                >
                  <div className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                      {product.image ? (
                        <img
                          src={getMediaPreviewUrl(resolveMediaInputUrl(product.image))}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-black">{product.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                        {product.category}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                      Position {index + 1}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleMoveProduct(product.id, -1)}
                        disabled={index === 0}
                        className={adminSecondaryButtonClass}
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMoveProduct(product.id, 1)}
                        disabled={index === featuredProducts.length - 1}
                        className={adminSecondaryButtonClass}
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className={adminDangerButtonClass}
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-10 text-center text-sm text-neutral-500">
                No featured products selected.
              </div>
            )}
          </div>
        </div>
      </section>

      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={adminLabelClass}>Product Library</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">Add Products</h2>
          </div>
          <span className="rounded-full border border-black/10 bg-neutral-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600">
            {availableProducts.length}
          </span>
        </div>

        <div className="relative mt-5">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            value={librarySearch}
            onChange={(event) => setLibrarySearch(event.target.value)}
            placeholder="Search existing products"
            className={`${adminInputClass} pl-10`}
          />
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-3">
            {availableProducts.length > 0 ? (
              availableProducts.map((product) => (
                <div key={product.id} className={getAdminListItemClass(false)}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black">{product.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                        {product.category} | {product.id}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddProduct(product.id)}
                      className={adminSecondaryButtonClass}
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-10 text-center text-sm text-neutral-500">
                No matching products available.
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
