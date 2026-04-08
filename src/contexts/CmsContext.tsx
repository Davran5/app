import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import type { Category, Product } from '../data/products';
import type { DistributorLocation } from '../data/distributors';
import type { Language } from '../data/translations';
import {
  cloneCmsValue,
  createEmptyCategory,
  createEmptyDistributorLocation,
  createEmptyNewsItem,
  createEmptyProduct,
  createEmptyVacancy,
  getDefaultCmsSnapshot,
  normalizeCmsSnapshot,
  type CmsLead,
  type CmsLeadInput,
  type CmsNewsItem,
  type CmsSectionMediaMap,
  type CmsSnapshot,
  type CmsVacancy,
  resolveSectionMediaUrl,
  type SeoPageKey,
  type SeoSettings,
} from '../lib/cms';
import {
  fetchAdminCmsSnapshot,
  fetchPublicCmsSnapshot,
  readInjectedPublicCmsSnapshot,
  saveAdminCmsSnapshot,
  submitLeadToServer,
} from '../lib/cmsApi';
import { isAdminRoutePath } from '../lib/adminRoute';
import { setUploadedMediaRegistry, type UploadedMediaInput } from '../lib/media';

interface CmsContextValue extends CmsSnapshot {
  getProductById: (id: string) => Product | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getDistributorById: (id: string) => DistributorLocation | undefined;
  getVacancyById: (id: string) => CmsVacancy | undefined;
  getNewsItemById: (id: string) => CmsNewsItem | undefined;
  getLeadById: (id: string) => CmsLead | undefined;
  getSectionMedia: (id: string, fallbackUrl: string) => string;
  refreshSnapshot: (scope?: 'public' | 'admin') => Promise<void>;
  flushSnapshot: () => Promise<void>;
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
  createLead: (leadInput: CmsLeadInput) => Promise<CmsLead>;
  upsertLead: (lead: CmsLead) => void;
  deleteLead: (id: string) => void;
  setSectionMedia: (id: string, url: string) => void;
  clearSectionMedia: (id: string) => void;
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
  const location = useLocation();
  const isAdminRoute = isAdminRoutePath(location.pathname);
  const initialSnapshot = normalizeCmsSnapshot(readInjectedPublicCmsSnapshot() ?? getDefaultCmsSnapshot());
  const [snapshot, setSnapshot] = useState<CmsSnapshot>(initialSnapshot);
  const snapshotRef = useRef<CmsSnapshot>(initialSnapshot);
  const lastServerSnapshotHashRef = useRef(JSON.stringify(snapshot));
  const persistTimerRef = useRef<number | null>(null);
  const hasShownSyncErrorRef = useRef(false);

  const applyServerSnapshot = useCallback((rawSnapshot: unknown) => {
    const normalized = normalizeCmsSnapshot(rawSnapshot);
    snapshotRef.current = normalized;
    lastServerSnapshotHashRef.current = JSON.stringify(normalized);
    setSnapshot(normalized);
  }, []);

  const flushSnapshot = useCallback(async () => {
    if (!isAdminRoute) {
      return;
    }

    if (persistTimerRef.current) {
      window.clearTimeout(persistTimerRef.current);
      persistTimerRef.current = null;
    }

    const currentSnapshot = snapshotRef.current;
    const snapshotHash = JSON.stringify(currentSnapshot);

    if (snapshotHash === lastServerSnapshotHashRef.current) {
      return;
    }

    await saveAdminCmsSnapshot(currentSnapshot);
    lastServerSnapshotHashRef.current = snapshotHash;
    hasShownSyncErrorRef.current = false;
  }, [isAdminRoute]);

  const refreshSnapshot = useCallback(
    async (scope: 'public' | 'admin' = isAdminRoute ? 'admin' : 'public') => {
      const nextSnapshot =
        scope === 'admin' ? await fetchAdminCmsSnapshot() : await fetchPublicCmsSnapshot();

      applyServerSnapshot(nextSnapshot);
    },
    [applyServerSnapshot, isAdminRoute],
  );

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    let isActive = true;

    void (async () => {
      try {
        const nextSnapshot = await fetchPublicCmsSnapshot();

        if (!isActive) {
          return;
        }

        applyServerSnapshot(nextSnapshot);
      } catch {
        // Public routes can safely continue with the injected/default snapshot.
      }
    })();

    return () => {
      isActive = false;
    };
  }, [applyServerSnapshot, isAdminRoute, location.pathname]);

  useEffect(() => {
    setUploadedMediaRegistry(snapshot.mediaItems);
  }, [snapshot.mediaItems]);

  useEffect(() => {
    if (!isAdminRoute) {
      hasShownSyncErrorRef.current = false;

      if (persistTimerRef.current) {
        window.clearTimeout(persistTimerRef.current);
        persistTimerRef.current = null;
      }

      return;
    }

    const snapshotHash = JSON.stringify(snapshot);

    if (snapshotHash === lastServerSnapshotHashRef.current) {
      return;
    }

    if (persistTimerRef.current) {
      window.clearTimeout(persistTimerRef.current);
    }

    persistTimerRef.current = window.setTimeout(() => {
      void (async () => {
        try {
          await flushSnapshot();
          hasShownSyncErrorRef.current = false;
        } catch {
          if (!hasShownSyncErrorRef.current) {
            toast.error('Admin changes failed to sync to the server.');
            hasShownSyncErrorRef.current = true;
          }
        }
      })();
    }, 200);

    return () => {
      if (persistTimerRef.current) {
        window.clearTimeout(persistTimerRef.current);
        persistTimerRef.current = null;
      }
    };
  }, [flushSnapshot, isAdminRoute, snapshot]);

  const commitSnapshot = useCallback((updater: (current: CmsSnapshot) => CmsSnapshot) => {
    const nextSnapshot = {
      ...updater(snapshotRef.current),
      updatedAt: new Date().toISOString(),
    };
    snapshotRef.current = nextSnapshot;
    setSnapshot(nextSnapshot);
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

  const getSectionMedia = useCallback(
    (id: string, fallbackUrl: string) => resolveSectionMediaUrl(snapshot.sectionMedia, id, fallbackUrl),
    [snapshot.sectionMedia],
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
          featuredProductIds: Array.from(new Set(ids.filter((id) => availableProductIds.has(id)))),
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
    async (leadInput: CmsLeadInput) => {
      const { lead } = await submitLeadToServer(leadInput);

      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        leads: [lead, ...currentSnapshot.leads],
      }));

      return lead;
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

  const setSectionMedia = useCallback(
    (id: string, url: string) => {
      commitSnapshot((currentSnapshot) => ({
        ...currentSnapshot,
        sectionMedia: {
          ...currentSnapshot.sectionMedia,
          [id]: url,
        },
      }));
    },
    [commitSnapshot],
  );

  const clearSectionMedia = useCallback(
    (id: string) => {
      commitSnapshot((currentSnapshot) => {
        const nextSectionMedia: CmsSectionMediaMap = { ...currentSnapshot.sectionMedia };
        delete nextSectionMedia[id];

        return {
          ...currentSnapshot,
          sectionMedia: nextSectionMedia,
        };
      });
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
    const committedSnapshot = {
      ...normalizedSnapshot,
      updatedAt: new Date().toISOString(),
    };
    snapshotRef.current = committedSnapshot;
    setSnapshot(committedSnapshot);
  }, []);

  const exportSnapshot = useCallback(() => cloneCmsValue(snapshotRef.current), []);

  const resetCms = useCallback(() => {
    const nextSnapshot = getDefaultCmsSnapshot();
    snapshotRef.current = nextSnapshot;
    setSnapshot(nextSnapshot);
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
      getSectionMedia,
      refreshSnapshot,
      flushSnapshot,
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
      setSectionMedia,
      clearSectionMedia,
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
      getSectionMedia,
      refreshSnapshot,
      flushSnapshot,
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
      setSectionMedia,
      clearSectionMedia,
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
