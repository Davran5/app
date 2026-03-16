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
import type { DistributorLocation } from '../data/distributors';
import type { Language } from '../data/translations';
import {
  CMS_STORAGE_KEY,
  cloneCmsValue,
  createLeadFromInput,
  createEmptyDistributorLocation,
  createEmptyCategory,
  createEmptyNewsItem,
  createEmptyProduct,
  createEmptyVacancy,
  type CmsLead,
  type CmsLeadInput,
  type CmsNewsItem,
  getDefaultCmsSnapshot,
  loadCmsSnapshot,
  normalizeCmsSnapshot,
  saveCmsSnapshot,
  type CmsVacancy,
  type CmsSnapshot,
  type SeoPageKey,
  type SeoSettings,
} from '../lib/cms';
import { setUploadedMediaRegistry, type UploadedMediaInput } from '../lib/media';

interface CmsContextValue extends CmsSnapshot {
  getProductById: (id: string) => Product | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getDistributorById: (id: string) => DistributorLocation | undefined;
  getVacancyById: (id: string) => CmsVacancy | undefined;
  getNewsItemById: (id: string) => CmsNewsItem | undefined;
  getLeadById: (id: string) => CmsLead | undefined;
  setFeaturedProductIds: (ids: string[]) => void;
  upsertMediaItem: (item: UploadedMediaInput) => void;
  deleteMediaItem: (id: string) => void;
  upsertProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  upsertCategory: (category: Category) => void;
  deleteCategory: (id: string) => boolean;
  upsertDistributorLocation: (location: DistributorLocation) => void;
  deleteDistributorLocation: (id: string) => void;
  upsertVacancy: (vacancy: CmsVacancy) => void;
  deleteVacancy: (id: string) => void;
  upsertNewsItem: (newsItem: CmsNewsItem) => void;
  deleteNewsItem: (id: string) => void;
  createLead: (leadInput: CmsLeadInput) => CmsLead;
  upsertLead: (lead: CmsLead) => void;
  deleteLead: (id: string) => void;
  setTranslationOverride: (language: Language, path: string, value: string) => void;
  clearTranslationOverride: (language: Language, path: string) => void;
  updateSeoPage: (pageKey: SeoPageKey, settings: SeoSettings) => void;
  importSnapshot: (snapshot: unknown) => void;
  exportSnapshot: () => CmsSnapshot;
  resetCms: () => void;
  createProductDraft: (categoryId?: string) => Product;
  createCategoryDraft: () => Category;
  createDistributorDraft: () => DistributorLocation;
  createVacancyDraft: () => CmsVacancy;
  createNewsItemDraft: () => CmsNewsItem;
}

const CmsContext = createContext<CmsContextValue | undefined>(undefined);

export function CmsProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<CmsSnapshot>(loadCmsSnapshot);

  useEffect(() => {
    saveCmsSnapshot(snapshot);
  }, [snapshot]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CMS_STORAGE_KEY || !event.newValue) {
        return;
      }

      try {
        setSnapshot(normalizeCmsSnapshot(JSON.parse(event.newValue)));
      } catch {
        // Ignore invalid cross-tab updates and keep the in-memory snapshot intact.
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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

  const getDistributorById = useCallback(
    (id: string) => snapshot.distributorLocations.find((location) => location.id === id),
    [snapshot.distributorLocations],
  );

  const getVacancyById = useCallback(
    (id: string) => snapshot.vacancies.find((vacancy) => vacancy.id === id),
    [snapshot.vacancies],
  );

  const getNewsItemById = useCallback(
    (id: string) => snapshot.newsItems.find((newsItem) => newsItem.id === id),
    [snapshot.newsItems],
  );

  const getLeadById = useCallback(
    (id: string) => snapshot.leads.find((lead) => lead.id === id),
    [snapshot.leads],
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
        featuredProductIds: currentSnapshot.featuredProductIds.filter(
          (productId) => productId !== id,
        ),
      }));
    },
    [commitSnapshot],
  );

  const setFeaturedProductIds = useCallback(
    (ids: string[]) => {
      commitSnapshot((currentSnapshot) => {
        const availableProductIds = new Set(currentSnapshot.products.map((product) => product.id));

        return {
          ...currentSnapshot,
          featuredProductIds: Array.from(
            new Set(ids.filter((id) => availableProductIds.has(id))),
          ),
        };
      });
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

  const upsertDistributorLocation = useCallback(
    (location: DistributorLocation) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.distributorLocations.findIndex(
          (existingLocation) => existingLocation.id === location.id,
        );
        const nextLocations = [...currentSnapshot.distributorLocations];

        if (existingIndex >= 0) {
          nextLocations[existingIndex] = cloneCmsValue(location);
        } else {
          nextLocations.unshift(cloneCmsValue(location));
        }

        return {
          ...currentSnapshot,
          distributorLocations: nextLocations,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteDistributorLocation = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        distributorLocations: currentSnapshot.distributorLocations.filter(
          (location) => location.id !== id,
        ),
      }));
    },
    [commitSnapshot],
  );

  const upsertVacancy = useCallback(
    (vacancy: CmsVacancy) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.vacancies.findIndex(
          (existingVacancy) => existingVacancy.id === vacancy.id,
        );
        const nextVacancies = [...currentSnapshot.vacancies];

        if (existingIndex >= 0) {
          nextVacancies[existingIndex] = cloneCmsValue(vacancy);
        } else {
          nextVacancies.unshift(cloneCmsValue(vacancy));
        }

        return {
          ...currentSnapshot,
          vacancies: nextVacancies,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteVacancy = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        vacancies: currentSnapshot.vacancies.filter((vacancy) => vacancy.id !== id),
      }));
    },
    [commitSnapshot],
  );

  const upsertNewsItem = useCallback(
    (newsItem: CmsNewsItem) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.newsItems.findIndex(
          (existingNewsItem) => existingNewsItem.id === newsItem.id,
        );
        const nextNewsItems = [...currentSnapshot.newsItems];

        if (existingIndex >= 0) {
          nextNewsItems[existingIndex] = cloneCmsValue(newsItem);
        } else {
          nextNewsItems.unshift(cloneCmsValue(newsItem));
        }

        return {
          ...currentSnapshot,
          newsItems: nextNewsItems,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteNewsItem = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        newsItems: currentSnapshot.newsItems.filter((newsItem) => newsItem.id !== id),
      }));
    },
    [commitSnapshot],
  );

  const createLead = useCallback(
    (leadInput: CmsLeadInput) => {
      const nextLead = createLeadFromInput(leadInput);

      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        leads: [nextLead, ...currentSnapshot.leads],
      }));

      return nextLead;
    },
    [commitSnapshot],
  );

  const upsertLead = useCallback(
    (lead: CmsLead) => {
      commitSnapshot((currentSnapshot) => {
        const existingIndex = currentSnapshot.leads.findIndex(
          (existingLead) => existingLead.id === lead.id,
        );
        const nextLead: CmsLead = {
          ...cloneCmsValue(lead),
          createdAt:
            existingIndex >= 0
              ? currentSnapshot.leads[existingIndex].createdAt
              : lead.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const nextLeads = [...currentSnapshot.leads];

        if (existingIndex >= 0) {
          nextLeads[existingIndex] = nextLead;
        } else {
          nextLeads.unshift(nextLead);
        }

        return {
          ...currentSnapshot,
          leads: nextLeads,
        };
      });
    },
    [commitSnapshot],
  );

  const deleteLead = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        leads: currentSnapshot.leads.filter((lead) => lead.id !== id),
      }));
    },
    [commitSnapshot],
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
      getDistributorById,
      getVacancyById,
      getNewsItemById,
      getLeadById,
      setFeaturedProductIds,
      upsertMediaItem,
      deleteMediaItem,
      upsertProduct,
      deleteProduct,
      upsertCategory,
      deleteCategory,
      upsertDistributorLocation,
      deleteDistributorLocation,
      upsertVacancy,
      deleteVacancy,
      upsertNewsItem,
      deleteNewsItem,
      createLead,
      upsertLead,
      deleteLead,
      setTranslationOverride,
      clearTranslationOverride,
      updateSeoPage,
      importSnapshot,
      exportSnapshot,
      resetCms,
      createProductDraft: createEmptyProduct,
      createCategoryDraft: createEmptyCategory,
      createDistributorDraft: createEmptyDistributorLocation,
      createVacancyDraft: createEmptyVacancy,
      createNewsItemDraft: createEmptyNewsItem,
    }),
    [
      snapshot,
      getProductById,
      getCategoryById,
      getProductsByCategory,
      getDistributorById,
      getVacancyById,
      getNewsItemById,
      getLeadById,
      setFeaturedProductIds,
      upsertMediaItem,
      deleteMediaItem,
      upsertProduct,
      deleteProduct,
      upsertCategory,
      deleteCategory,
      upsertDistributorLocation,
      deleteDistributorLocation,
      upsertVacancy,
      deleteVacancy,
      upsertNewsItem,
      deleteNewsItem,
      createLead,
      upsertLead,
      deleteLead,
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
