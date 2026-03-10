import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Category, Product } from '../data/products';
import type { Language } from '../data/translations';
import {
  cloneCmsValue,
  createEmptyCategory,
  createEmptyProduct,
  getDefaultCmsSnapshot,
  loadCmsSnapshot,
  normalizeCmsSnapshot,
  saveCmsSnapshot,
  type CmsSnapshot,
  type SeoPageKey,
  type SeoSettings,
} from '../lib/cms';
import { setUploadedMediaRegistry, type UploadedMediaInput } from '../lib/media';

interface CmsContextValue extends CmsSnapshot {
  getProductById: (id: string) => Product | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  upsertMediaItem: (item: UploadedMediaInput) => void;
  deleteMediaItem: (id: string) => void;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCategory: (category: Category) => void;
  deleteCategory: (id: string) => boolean;
  setTranslationOverride: (language: Language, path: string, value: string) => void;
  clearTranslationOverride: (language: Language, path: string) => void;
  updateSeoPage: (pageKey: SeoPageKey, settings: SeoSettings) => void;
  importSnapshot: (snapshot: unknown) => void;
  exportSnapshot: () => CmsSnapshot;
  resetCms: () => void;
  createProductDraft: (categoryId?: string) => Product;
  createCategoryDraft: () => Category;
}

const CmsContext = createContext<CmsContextValue | undefined>(undefined);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<CmsSnapshot>(loadCmsSnapshot);

  useEffect(() => {
    saveCmsSnapshot(snapshot);
  }, [snapshot]);

  useEffect(() => {
    setUploadedMediaRegistry(snapshot.mediaItems);
  }, [snapshot.mediaItems]);

  const commitSnapshot = useCallback((updater: (current: CmsSnapshot) => CmsSnapshot) => {
    setSnapshot((currentSnapshot) => {
      const nextSnapshot = updater(currentSnapshot);
      return {
        ...nextSnapshot,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const getProductById = useCallback(
    (id: string) => snapshot.products.find((product) => product.id === id),
    [snapshot.products],
  );

  const getCategoryById = useCallback(
    (id: string) => snapshot.categories.find((category) => category.id === id),
    [snapshot.categories],
  );

  const getProductsByCategory = useCallback(
    (categoryId: string) => snapshot.products.filter((product) => product.categoryId === categoryId),
    [snapshot.products],
  );

  const upsertProduct = useCallback(
    (product: Product) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.products.findIndex(
          (existingProduct) => existingProduct.id === product.id,
        );
        const nextProducts = [...currentSnapshot.products];

        if (existingIndex >= 0) {
          nextProducts[existingIndex] = cloneCmsValue(product);
        } else {
          nextProducts.unshift(cloneCmsValue(product));
        }

        return {
          ...currentSnapshot,
          products: nextProducts,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteProduct = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        products: currentSnapshot.products.filter((product) => product.id !== id),
      }));
    },
    [commitSnapshot],
  );

  const upsertMediaItem = useCallback(
    (item: UploadedMediaInput) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.mediaItems.findIndex(
          (existingItem) => existingItem.id === item.id,
        );
        const nextMediaItems = [...currentSnapshot.mediaItems];

        if (existingIndex >= 0) {
          nextMediaItems[existingIndex] = cloneCmsValue(item);
        } else {
          nextMediaItems.unshift(cloneCmsValue(item));
        }

        return {
          ...currentSnapshot,
          mediaItems: nextMediaItems,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteMediaItem = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        mediaItems: currentSnapshot.mediaItems.filter((item) => item.id !== id),
      }));
    },
    [commitSnapshot],
  );

  const upsertCategory = useCallback(
    (category: Category) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.categories.findIndex(
          (existingCategory) => existingCategory.id === category.id,
        );
        const nextCategories = [...currentSnapshot.categories];

        if (existingIndex >= 0) {
          nextCategories[existingIndex] = cloneCmsValue(category);
        } else {
          nextCategories.push(cloneCmsValue(category));
        }

        const nextProducts = currentSnapshot.products.map((product) =>
          product.categoryId === category.id
            ? {
                ...product,
                category: category.name,
              }
            : product,
        );

        return {
          ...currentSnapshot,
          categories: nextCategories,
          products: nextProducts,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteCategory = useCallback(
    (id: string) => {
      if (snapshot.products.some((product) => product.categoryId === id)) {
        return false;
      }

      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        categories: currentSnapshot.categories.filter((category) => category.id !== id),
      }));

      return true;
    },
    [commitSnapshot, snapshot.products],
  );

  const setTranslationOverride = useCallback(
    (language: Language, path: string, value: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        translationOverrides: {
          ...currentSnapshot.translationOverrides,
          [language]: {
            ...currentSnapshot.translationOverrides[language],
            [path]: value,
          },
        },
      }));
    },
    [commitSnapshot],
  );

  const clearTranslationOverride = useCallback(
    (language: Language, path: string) => {
      commitSnapshot((currentSnapshot) => {
        const nextLanguageOverrides = { ...currentSnapshot.translationOverrides[language] };
        delete nextLanguageOverrides[path];

        return {
          ...currentSnapshot,
          translationOverrides: {
            ...currentSnapshot.translationOverrides,
            [language]: nextLanguageOverrides,
          },
        };
      });
    },
    [commitSnapshot],
  );

  const updateSeoPage = useCallback(
    (pageKey: SeoPageKey, settings: SeoSettings) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        seo: {
          ...currentSnapshot.seo,
          [pageKey]: cloneCmsValue(settings),
        },
      }));
    },
    [commitSnapshot],
  );

  const importSnapshot = useCallback((nextSnapshot: unknown) => {
    const normalizedSnapshot = normalizeCmsSnapshot(nextSnapshot);
    setSnapshot({
      ...normalizedSnapshot,
      updatedAt: new Date().toISOString(),
    });
  }, []);

  const exportSnapshot = useCallback(() => cloneCmsValue(snapshot), [snapshot]);

  const resetCms = useCallback(() => {
    setSnapshot(getDefaultCmsSnapshot());
  }, []);

  const value = useMemo<CmsContextValue>(
    () => ({
      ...snapshot,
      getProductById,
      getCategoryById,
      getProductsByCategory,
      upsertMediaItem,
      deleteMediaItem,
      upsertProduct,
      deleteProduct,
      upsertCategory,
      deleteCategory,
      setTranslationOverride,
      clearTranslationOverride,
      updateSeoPage,
      importSnapshot,
      exportSnapshot,
      resetCms,
      createProductDraft: createEmptyProduct,
      createCategoryDraft: createEmptyCategory,
    }),
    [
      snapshot,
      getProductById,
      getCategoryById,
      getProductsByCategory,
      upsertMediaItem,
      deleteMediaItem,
      upsertProduct,
      deleteProduct,
      upsertCategory,
      deleteCategory,
      setTranslationOverride,
      clearTranslationOverride,
      updateSeoPage,
      importSnapshot,
      exportSnapshot,
      resetCms,
    ],
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCms() {
  const context = useContext(CmsContext);

  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }

  return context;
}
