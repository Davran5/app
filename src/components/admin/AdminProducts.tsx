import { useCallback, useEffect, useMemo, useState } from 'react';
import { FileJson, ImageIcon, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Category, Product } from '../../data/products';
import { createEmptyCategory, createEmptyProduct, slugifyProductId } from '../../lib/cms';
import type { MediaItem } from '../../lib/media';
import { getMediaPreviewUrl, isImageMedia, resolveMediaInputUrl } from '../../lib/media';
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
  getAdminPillClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface SpecRow {
  rowId: string;
  key: string;
  value: string;
}

interface ProductDraft {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  fullDescription: string;
  image: string;
  galleryText: string;
  featuresText: string;
  specs: SpecRow[];
}

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  featuredProductIds: string[];
  getProductById: (id: string) => Product | undefined;
  getCategoryById: (id: string) => Category | undefined;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCategory: (category: Category) => void;
  deleteCategory: (id: string) => boolean;
  mediaLibrary: MediaItem[];
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

type LibraryMode = 'products' | 'categories';

const NEW_PRODUCT_KEY = '__new_product__';
const NEW_CATEGORY_KEY = '__new_category__';

function createRowId() {
  return globalThis.crypto?.randomUUID?.() ?? `row-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function serializeLines(lines: string[]) {
  return lines.join('\n');
}

function deserializeLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function specsToRows(specs: Product['specs']): SpecRow[] {
  const rows = Object.entries(specs)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({
      rowId: createRowId(),
      key,
      value: value ?? '',
    }));

  return rows.length > 0 ? rows : [{ rowId: createRowId(), key: '', value: '' }];
}

function rowsToSpecs(rows: SpecRow[]) {
  return rows.reduce<Record<string, string>>((acc, row) => {
    if (!row.key.trim() || !row.value.trim()) {
      return acc;
    }

    acc[row.key.trim()] = row.value.trim();
    return acc;
  }, {});
}

function productToDraft(product: Product): ProductDraft {
  return {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    description: product.description,
    fullDescription: product.fullDescription,
    image: product.image,
    galleryText: serializeLines(product.gallery),
    featuresText: serializeLines(product.features),
    specs: specsToRows(product.specs),
  };
}

function draftToProduct(draft: ProductDraft, categoryName: string): Product {
  return {
    id: draft.id.trim(),
    name: draft.name.trim(),
    categoryId: draft.categoryId.trim(),
    category: categoryName,
    description: draft.description.trim(),
    fullDescription: draft.fullDescription.trim(),
    image: resolveMediaInputUrl(draft.image.trim()),
    gallery: deserializeLines(draft.galleryText).map(resolveMediaInputUrl),
    features: deserializeLines(draft.featuresText),
    specs: rowsToSpecs(draft.specs),
  };
}

function ImagePreview({
  url,
  emptyLabel,
}: {
  url: string;
  emptyLabel: string;
}) {
  if (!url) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
        <div className="inline-flex rounded-full bg-white p-3">
          <ImageIcon size={18} className="text-neutral-400" />
        </div>
        <p className="mt-3">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
      <img src={getMediaPreviewUrl(url)} alt="" className="aspect-[4/3] w-full object-cover" />
    </div>
  );
}

export default function AdminProducts({
  products,
  categories,
  featuredProductIds,
  getProductById,
  getCategoryById,
  upsertProduct,
  deleteProduct,
  upsertCategory,
  deleteCategory,
  mediaLibrary,
  onPrimaryActionChange,
}: AdminProductsProps) {
  const [libraryMode, setLibraryMode] = useState<LibraryMode>('products');
  const [librarySearch, setLibrarySearch] = useState('');
  const [selectedProductKey, setSelectedProductKey] = useState<string>(
    products[0]?.id ?? NEW_PRODUCT_KEY,
  );
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>(
    categories[0]?.id ?? NEW_CATEGORY_KEY,
  );
  const [productDraft, setProductDraft] = useState<ProductDraft>(() =>
    productToDraft(products[0] ?? createEmptyProduct(categories[0]?.id ?? '')),
  );
  const [categoryDraft, setCategoryDraft] = useState<Category>(
    categories[0] ?? createEmptyCategory(),
  );

  const filteredProducts = useMemo(() => {
    const query = librarySearch.trim().toLowerCase();
    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.id.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );
  }, [librarySearch, products]);

  const filteredCategories = useMemo(() => {
    const query = librarySearch.trim().toLowerCase();
    if (!query) {
      return categories;
    }

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) || category.id.toLowerCase().includes(query),
    );
  }, [categories, librarySearch]);

  const galleryImages = useMemo(
    () => deserializeLines(productDraft.galleryText).map(resolveMediaInputUrl),
    [productDraft.galleryText],
  );
  const imageMediaOptions = useMemo(
    () => mediaLibrary.filter((item) => isImageMedia(item.url, item.mimeType)),
    [mediaLibrary],
  );

  useEffect(() => {
    if (selectedProductKey === NEW_PRODUCT_KEY) {
      return;
    }

    const selectedProduct = getProductById(selectedProductKey);

    if (selectedProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductDraft(productToDraft(selectedProduct));
      return;
    }

    setSelectedProductKey(products[0]?.id ?? NEW_PRODUCT_KEY);
  }, [getProductById, products, selectedProductKey]);

  useEffect(() => {
    if (selectedCategoryKey === NEW_CATEGORY_KEY) {
      return;
    }

    const selectedCategory = getCategoryById(selectedCategoryKey);

    if (selectedCategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategoryDraft(selectedCategory);
      return;
    }

    setSelectedCategoryKey(categories[0]?.id ?? NEW_CATEGORY_KEY);
  }, [categories, getCategoryById, selectedCategoryKey]);

  const handleCreateProduct = () => {
    setLibraryMode('products');
    setSelectedProductKey(NEW_PRODUCT_KEY);
    setProductDraft(productToDraft(createEmptyProduct(categories[0]?.id ?? '')));
  };

  const handleDuplicateProduct = () => {
    setLibraryMode('products');
    setSelectedProductKey(NEW_PRODUCT_KEY);
    setProductDraft((current) => ({
      ...current,
      id: `${slugifyProductId(current.name || 'product')}-copy`,
      name: `${current.name || 'Untitled Product'} Copy`,
    }));
    toast.success('Product draft duplicated.');
  };

  const handleSaveProduct = useCallback(() => {
    const nextId = productDraft.id.trim() || slugifyProductId(productDraft.name);
    const category = getCategoryById(productDraft.categoryId);
    const existingProduct = getProductById(nextId);

    if (!nextId || !productDraft.name.trim()) {
      toast.error('Product ID and name are required.');
      return;
    }

    if (!category) {
      toast.error('Choose a valid category.');
      return;
    }

    if (
      existingProduct &&
      (selectedProductKey === NEW_PRODUCT_KEY || selectedProductKey !== existingProduct.id)
    ) {
      toast.error('That product ID is already in use.');
      return;
    }

    upsertProduct(draftToProduct({ ...productDraft, id: nextId }, category.name));

    if (selectedProductKey !== NEW_PRODUCT_KEY && selectedProductKey !== nextId) {
      deleteProduct(selectedProductKey);
    }

    setSelectedProductKey(nextId);
    toast.success('Product saved.');
  }, [
    deleteProduct,
    getCategoryById,
    getProductById,
    productDraft,
    selectedProductKey,
    upsertProduct,
  ]);

  const handleDeleteProduct = () => {
    if (selectedProductKey === NEW_PRODUCT_KEY) {
      setProductDraft(productToDraft(createEmptyProduct(categories[0]?.id ?? '')));
      return;
    }

    deleteProduct(selectedProductKey);
    setSelectedProductKey(
      products.find((product) => product.id !== selectedProductKey)?.id ?? NEW_PRODUCT_KEY,
    );
    toast.success('Product deleted.');
  };

  const handleCreateCategory = () => {
    setLibraryMode('categories');
    setSelectedCategoryKey(NEW_CATEGORY_KEY);
    setCategoryDraft(createEmptyCategory());
  };

  const handleSaveCategory = useCallback(() => {
    const nextId = categoryDraft.id.trim();
    const isExisting = selectedCategoryKey !== NEW_CATEGORY_KEY;

    if (!nextId || !categoryDraft.name.trim()) {
      toast.error('Category ID and name are required.');
      return;
    }

    if (!isExisting && getCategoryById(nextId)) {
      toast.error('That category ID already exists.');
      return;
    }

    upsertCategory({
      ...categoryDraft,
      id: nextId,
      name: categoryDraft.name.trim(),
      description: categoryDraft.description.trim(),
      image: resolveMediaInputUrl(categoryDraft.image.trim()),
    });
    setSelectedCategoryKey(nextId);
    toast.success('Category saved.');
  }, [categoryDraft, getCategoryById, selectedCategoryKey, upsertCategory]);

  const handleDeleteCategory = () => {
    if (selectedCategoryKey === NEW_CATEGORY_KEY) {
      setCategoryDraft(createEmptyCategory());
      return;
    }

    const deleted = deleteCategory(selectedCategoryKey);

    if (!deleted) {
      toast.error('This category is still assigned to products.');
      return;
    }

    setSelectedCategoryKey(
      categories.find((category) => category.id !== selectedCategoryKey)?.id ?? NEW_CATEGORY_KEY,
    );
    toast.success('Category deleted.');
  };

  const handleRemoveGalleryImage = (url: string) => {
    setProductDraft((current) => ({
      ...current,
      galleryText: serializeLines(
        deserializeLines(current.galleryText)
          .map(resolveMediaInputUrl)
          .filter((imageUrl) => imageUrl !== url),
      ),
    }));
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: libraryMode === 'products' ? 'Save Product' : 'Save Category',
      onClick: libraryMode === 'products' ? handleSaveProduct : handleSaveCategory,
      disabled: libraryMode === 'products' ? categories.length === 0 : false,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [
    categories.length,
    handleSaveCategory,
    handleSaveProduct,
    libraryMode,
    onPrimaryActionChange,
  ]);

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-4`}>
        <div className="flex gap-2">
          <button
            onClick={() => setLibraryMode('products')}
            className={getAdminPillClass(libraryMode === 'products')}
          >
            Products
          </button>
          <button
            onClick={() => setLibraryMode('categories')}
            className={getAdminPillClass(libraryMode === 'categories')}
          >
            Categories
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-black">
            {libraryMode === 'products' ? 'Products' : 'Categories'}
          </h2>
          <button
            onClick={libraryMode === 'products' ? handleCreateProduct : handleCreateCategory}
            className={adminPrimaryButtonClass}
          >
            <Plus size={14} />
            New
          </button>
        </div>

        <div className="relative mt-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            value={librarySearch}
            onChange={(event) => setLibrarySearch(event.target.value)}
            placeholder={libraryMode === 'products' ? 'Search products' : 'Search categories'}
            className={`${adminInputClass} pl-10`}
          />
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-3">
            {libraryMode === 'products' ? (
              <>
                <button
                  onClick={handleCreateProduct}
                  className={getAdminListItemClass(selectedProductKey === NEW_PRODUCT_KEY)}
                >
                  <p className="text-sm font-semibold">New Product</p>
                </button>

                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductKey(product.id)}
                    className={getAdminListItemClass(selectedProductKey === product.id)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold">{product.name}</p>
                      {featuredProductIds.includes(product.id) && (
                        <span
                          className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                            selectedProductKey === product.id
                              ? 'bg-white/15 text-white'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                        selectedProductKey === product.id ? 'text-white/75' : 'text-neutral-500'
                      }`}
                    >
                      {product.category} | {product.id}
                    </p>
                  </button>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={handleCreateCategory}
                  className={getAdminListItemClass(selectedCategoryKey === NEW_CATEGORY_KEY)}
                >
                  <p className="text-sm font-semibold">New Category</p>
                </button>

                {filteredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryKey(category.id)}
                    className={getAdminListItemClass(selectedCategoryKey === category.id)}
                  >
                    <p className="text-sm font-semibold">{category.name}</p>
                    <p
                      className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                        selectedCategoryKey === category.id ? 'text-white/75' : 'text-neutral-500'
                      }`}
                    >
                      {category.id}
                    </p>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        {libraryMode === 'products' ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className={adminTitleClass}>
                {selectedProductKey === NEW_PRODUCT_KEY ? 'New Product' : productDraft.name || 'Product'}
              </h2>

              <div className="flex flex-wrap gap-2">
                <button onClick={handleDuplicateProduct} className={adminSecondaryButtonClass}>
                  <FileJson size={16} />
                  Duplicate
                </button>
                <button onClick={handleDeleteProduct} className={adminDangerButtonClass}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            <div className="mt-5 flex-1 overflow-y-auto pr-1">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Product ID</span>
                  <input
                    value={productDraft.id}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, id: event.target.value }))
                    }
                    className={adminInputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Product Name</span>
                  <div className="flex gap-2">
                    <input
                      value={productDraft.name}
                      onChange={(event) =>
                        setProductDraft((current) => ({ ...current, name: event.target.value }))
                      }
                      className={adminInputClass}
                    />
                    <button
                      onClick={() =>
                        setProductDraft((current) => ({
                          ...current,
                          id: current.id || slugifyProductId(current.name),
                        }))
                      }
                      className={adminSecondaryButtonClass}
                    >
                      Slug
                    </button>
                  </div>
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Category</span>
                  <select
                    value={productDraft.categoryId}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, categoryId: event.target.value }))
                    }
                    className={adminInputClass}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Cover Image</span>
                  <div className="space-y-2">
                    <input
                      value={productDraft.image}
                      onChange={(event) =>
                        setProductDraft((current) => ({ ...current, image: event.target.value }))
                      }
                      className={adminInputClass}
                    />
                    <select
                      value=""
                      onChange={(event) => {
                        if (!event.target.value) return;
                        setProductDraft((current) => ({ ...current, image: event.target.value }));
                        event.target.value = '';
                      }}
                      className={adminInputClass}
                    >
                      <option value="">Choose from media library</option>
                      {imageMediaOptions.map((item) => (
                        <option key={item.id} value={item.url}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                <ImagePreview url={productDraft.image} emptyLabel="No image selected" />

                <div className="space-y-4">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Short Description</span>
                    <textarea
                      value={productDraft.description}
                      onChange={(event) =>
                        setProductDraft((current) => ({ ...current, description: event.target.value }))
                      }
                      rows={3}
                      className={adminTextareaClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Full Description</span>
                    <textarea
                      value={productDraft.fullDescription}
                      onChange={(event) =>
                        setProductDraft((current) => ({
                          ...current,
                          fullDescription: event.target.value,
                        }))
                      }
                      rows={5}
                      className={adminTextareaClass}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className={adminLabelClass}>Gallery</span>
                      <span className="text-xs text-neutral-500">{galleryImages.length}</span>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {galleryImages.length > 0 ? (
                        galleryImages.map((url) => (
                          <div key={url} className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-50">
                            <img src={getMediaPreviewUrl(url)} alt="" className="aspect-[4/3] w-full object-cover" />
                            <div className="space-y-3 p-3">
                              <p className="break-all font-mono text-xs text-neutral-500">{url}</p>
                              <button
                                onClick={() => handleRemoveGalleryImage(url)}
                                className={adminDangerButtonClass}
                              >
                                <Trash2 size={14} />
                                Remove
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500 sm:col-span-2">
                          No gallery images
                        </div>
                      )}
                    </div>
                  </div>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Gallery Paths</span>
                    <div className="space-y-2">
                      <textarea
                        value={productDraft.galleryText}
                        onChange={(event) =>
                          setProductDraft((current) => ({ ...current, galleryText: event.target.value }))
                        }
                        rows={5}
                        placeholder="One image path per line"
                        className={adminTextareaClass}
                      />
                      <select
                        value=""
                        onChange={(event) => {
                          const nextUrl = event.target.value;
                          if (!nextUrl) return;
                          setProductDraft((current) => ({
                            ...current,
                            galleryText: serializeLines([
                              ...deserializeLines(current.galleryText).map(resolveMediaInputUrl),
                              nextUrl,
                            ]),
                          }));
                          event.target.value = '';
                        }}
                        className={adminInputClass}
                      >
                        <option value="">Add image from media library</option>
                        {imageMediaOptions.map((item) => (
                          <option key={item.id} value={item.url}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Features</span>
                  <textarea
                    value={productDraft.featuresText}
                    onChange={(event) =>
                      setProductDraft((current) => ({ ...current, featuresText: event.target.value }))
                    }
                    rows={12}
                    placeholder="One feature per line"
                    className={adminTextareaClass}
                  />
                </label>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-3">
                  <span className={adminLabelClass}>Specifications</span>
                  <button
                    onClick={() =>
                      setProductDraft((current) => ({
                        ...current,
                        specs: [...current.specs, { rowId: createRowId(), key: '', value: '' }],
                      }))
                    }
                    className={adminSecondaryButtonClass}
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {productDraft.specs.map((row) => (
                    <div key={row.rowId} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                      <input
                        value={row.key}
                        onChange={(event) =>
                          setProductDraft((current) => ({
                            ...current,
                            specs: current.specs.map((specRow) =>
                              specRow.rowId === row.rowId
                                ? { ...specRow, key: event.target.value }
                                : specRow,
                            ),
                          }))
                        }
                        placeholder="Key"
                        className={adminInputClass}
                      />
                      <input
                        value={row.value}
                        onChange={(event) =>
                          setProductDraft((current) => ({
                            ...current,
                            specs: current.specs.map((specRow) =>
                              specRow.rowId === row.rowId
                                ? { ...specRow, value: event.target.value }
                                : specRow,
                            ),
                          }))
                        }
                        placeholder="Value"
                        className={adminInputClass}
                      />
                      <button
                        onClick={() =>
                          setProductDraft((current) => ({
                            ...current,
                            specs:
                              current.specs.length === 1
                                ? [{ rowId: createRowId(), key: '', value: '' }]
                                : current.specs.filter((specRow) => specRow.rowId !== row.rowId),
                          }))
                        }
                        className={adminDangerButtonClass}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className={adminTitleClass}>
                {selectedCategoryKey === NEW_CATEGORY_KEY ? 'New Category' : categoryDraft.name || 'Category'}
              </h2>

              <button onClick={handleDeleteCategory} className={adminDangerButtonClass}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            <div className="mt-5 flex-1 overflow-y-auto pr-1">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Category ID</span>
                  <input
                    value={categoryDraft.id}
                    disabled={selectedCategoryKey !== NEW_CATEGORY_KEY}
                    onChange={(event) =>
                      setCategoryDraft((current) => ({ ...current, id: event.target.value }))
                    }
                    className={`${adminInputClass} disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500`}
                  />
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Name</span>
                  <input
                    value={categoryDraft.name}
                    onChange={(event) =>
                      setCategoryDraft((current) => ({ ...current, name: event.target.value }))
                    }
                    className={adminInputClass}
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)]">
                <ImagePreview url={categoryDraft.image} emptyLabel="No image selected" />

                <div className="space-y-4">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Cover Image</span>
                    <div className="space-y-2">
                      <input
                        value={categoryDraft.image}
                        onChange={(event) =>
                          setCategoryDraft((current) => ({ ...current, image: event.target.value }))
                        }
                        className={adminInputClass}
                      />
                      <select
                        value=""
                        onChange={(event) => {
                          if (!event.target.value) return;
                          setCategoryDraft((current) => ({ ...current, image: event.target.value }));
                          event.target.value = '';
                        }}
                        className={adminInputClass}
                      >
                        <option value="">Choose from media library</option>
                        {imageMediaOptions.map((item) => (
                          <option key={item.id} value={item.url}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Description</span>
                    <textarea
                      value={categoryDraft.description}
                      onChange={(event) =>
                        setCategoryDraft((current) => ({ ...current, description: event.target.value }))
                      }
                      rows={6}
                      className={adminTextareaClass}
                    />
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
