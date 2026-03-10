import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Language } from '../../data/translations';
import {
  getTranslationEntries,
  getTranslationFieldMeta,
  getTranslationPageList,
  getTranslationPageMeta,
  getTranslationSectionMeta,
  getTranslationSectionsForPage,
  type TranslationOverrideMap,
} from '../../lib/cms';
import {
  adminCardClass,
  adminDangerButtonClass,
  adminInputClass,
  adminLabelClass,
  adminTextareaClass,
  adminTitleClass,
  getAdminListItemClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface TranslationListItem {
  path: string;
  baseValue: string;
  currentValue: string;
  overridden: boolean;
  pageId: string;
  sectionId: string;
  fieldLabel: string;
  fieldContext: string;
}

interface AdminTranslationsProps {
  translationOverrides: TranslationOverrideMap;
  setTranslationOverride: (language: Language, path: string, value: string) => void;
  clearTranslationOverride: (language: Language, path: string) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

const ALL_FIELDS_KEY = '__all_fields__';

export default function AdminTranslations({
  translationOverrides,
  setTranslationOverride,
  clearTranslationOverride,
  onPrimaryActionChange,
}: AdminTranslationsProps) {
  const [translationLanguage, setTranslationLanguage] = useState<Language>('en');
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [selectedSectionId, setSelectedSectionId] = useState(ALL_FIELDS_KEY);
  const [selectedFieldPath, setSelectedFieldPath] = useState<string | null>(null);
  const [translationSearch, setTranslationSearch] = useState('');
  const [showOverridesOnly, setShowOverridesOnly] = useState(false);
  const [draftPath, setDraftPath] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');

  const currentOverrides = translationOverrides[translationLanguage];

  const baseTranslationEntries = useMemo(
    () => getTranslationEntries(translationLanguage),
    [translationLanguage],
  );

  const translationItems = useMemo<TranslationListItem[]>(() => {
    const itemMap = new Map<string, TranslationListItem>();

    baseTranslationEntries.forEach((entry) => {
      const overrideValue = currentOverrides[entry.path];
      const fieldMeta = getTranslationFieldMeta(entry.path);

      itemMap.set(entry.path, {
        path: entry.path,
        baseValue: entry.value,
        currentValue: overrideValue ?? entry.value,
        overridden: overrideValue !== undefined,
        pageId: fieldMeta.pageId,
        sectionId: fieldMeta.sectionId,
        fieldLabel: fieldMeta.label,
        fieldContext: fieldMeta.context,
      });
    });

    Object.entries(currentOverrides).forEach(([path, value]) => {
      if (itemMap.has(path)) {
        return;
      }

      const fieldMeta = getTranslationFieldMeta(path);

      itemMap.set(path, {
        path,
        baseValue: '',
        currentValue: value,
        overridden: true,
        pageId: fieldMeta.pageId,
        sectionId: fieldMeta.sectionId,
        fieldLabel: fieldMeta.label,
        fieldContext: fieldMeta.context,
      });
    });

    return Array.from(itemMap.values()).sort((left, right) => left.path.localeCompare(right.path));
  }, [baseTranslationEntries, currentOverrides]);

  const pages = useMemo(
    () =>
      getTranslationPageList(translationLanguage, currentOverrides).map((page) => {
        const pageItems = translationItems.filter((item) => item.pageId === page.id);
        return {
          ...page,
          count: pageItems.length,
          overrideCount: pageItems.filter((item) => item.overridden).length,
        };
      }),
    [currentOverrides, translationItems, translationLanguage],
  );

  const activePageId = pages.some((page) => page.id === selectedPageId)
    ? selectedPageId
    : pages[0]?.id ?? 'global';
  const activePage = getTranslationPageMeta(activePageId);

  const sections = useMemo(
    () =>
      getTranslationSectionsForPage(activePageId, translationLanguage, currentOverrides).map((section) => ({
        ...section,
        count: translationItems.filter(
          (item) => item.pageId === activePageId && item.sectionId === section.id,
        ).length,
      })),
    [activePageId, currentOverrides, translationItems, translationLanguage],
  );

  const activePageCount = translationItems.filter((item) => item.pageId === activePageId).length;

  const activeSectionId =
    selectedSectionId === ALL_FIELDS_KEY || sections.some((section) => section.id === selectedSectionId)
      ? selectedSectionId
      : ALL_FIELDS_KEY;

  const visibleItems = useMemo(() => {
    const query = translationSearch.trim().toLowerCase();

    return translationItems
      .filter((item) => item.pageId === activePageId)
      .filter((item) => activeSectionId === ALL_FIELDS_KEY || item.sectionId === activeSectionId)
      .filter((item) => (showOverridesOnly ? item.overridden : true))
      .filter((item) => {
        if (!query) {
          return true;
        }

        return (
          item.path.toLowerCase().includes(query) ||
          item.fieldLabel.toLowerCase().includes(query) ||
          item.fieldContext.toLowerCase().includes(query) ||
          item.baseValue.toLowerCase().includes(query) ||
          item.currentValue.toLowerCase().includes(query)
        );
      });
  }, [activePageId, activeSectionId, showOverridesOnly, translationItems, translationSearch]);

  const activeItem =
    visibleItems.find((item) => item.path === selectedFieldPath) ??
    visibleItems[0] ??
    null;

  const editorValue = activeItem
    ? draftPath === activeItem.path
      ? draftValue
      : activeItem.currentValue
    : '';

  const handleSelectField = (item: TranslationListItem) => {
    setSelectedFieldPath(item.path);
    setDraftPath(item.path);
    setDraftValue(item.currentValue);
  };

  const handleSaveTranslation = useCallback(() => {
    if (!activeItem) {
      return;
    }

    const nextValue = draftPath === activeItem.path ? draftValue : activeItem.currentValue;

    if (nextValue === activeItem.baseValue) {
      clearTranslationOverride(translationLanguage, activeItem.path);
      toast.success('Translation cleared.');
      return;
    }

    setTranslationOverride(translationLanguage, activeItem.path, nextValue);
    toast.success('Translation saved.');
  }, [
    activeItem,
    clearTranslationOverride,
    draftPath,
    draftValue,
    setTranslationOverride,
    translationLanguage,
  ]);

  const handleClearTranslation = () => {
    if (!activeItem) {
      return;
    }

    clearTranslationOverride(translationLanguage, activeItem.path);
    setDraftPath(activeItem.path);
    setDraftValue(activeItem.baseValue);
    toast.success('Translation cleared.');
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save Content',
      onClick: handleSaveTranslation,
      disabled: !activeItem,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [activeItem, handleSaveTranslation, onPrimaryActionChange]);

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-4`}>
        <div className="grid gap-3">
          <div className="grid gap-2 sm:grid-cols-[150px_minmax(0,1fr)]">
            <select
              value={translationLanguage}
              onChange={(event) => {
                setTranslationLanguage(event.target.value as Language);
                setSelectedFieldPath(null);
                setDraftPath(null);
                setDraftValue('');
              }}
              className={adminInputClass}
            >
              <option value="en">English</option>
              <option value="ru">Russian</option>
              <option value="uz">Uzbek</option>
              <option value="de">German</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setShowOverridesOnly(false)}
                className={
                  !showOverridesOnly
                    ? 'rounded-full bg-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition'
                    : 'rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 transition hover:bg-neutral-100'
                }
              >
                All
              </button>
              <button
                onClick={() => setShowOverridesOnly(true)}
                className={
                  showOverridesOnly
                    ? 'rounded-full bg-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition'
                    : 'rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 transition hover:bg-neutral-100'
                }
              >
                Changed
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className={adminLabelClass}>Page</span>
              <select
                value={activePageId}
                onChange={(event) => {
                  setSelectedPageId(event.target.value);
                  setSelectedSectionId(ALL_FIELDS_KEY);
                  setSelectedFieldPath(null);
                }}
                className={adminInputClass}
              >
                {pages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {`${page.label} (${page.count})`}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className={adminLabelClass}>Section</span>
              <select
                value={activeSectionId}
                onChange={(event) => {
                  setSelectedSectionId(event.target.value);
                  setSelectedFieldPath(null);
                }}
                className={adminInputClass}
              >
                <option value={ALL_FIELDS_KEY}>{`All Fields (${activePageCount})`}</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {`${section.label} (${section.count})`}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              value={translationSearch}
              onChange={(event) => setTranslationSearch(event.target.value)}
              placeholder="Search"
              className={`${adminInputClass} pl-10`}
            />
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {visibleItems.length > 0 ? (
            <div className="space-y-3">
              {visibleItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleSelectField(item)}
                  className={getAdminListItemClass(activeItem?.path === item.path)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{item.fieldLabel}</p>
                      <p
                        className={`mt-1 truncate text-xs uppercase tracking-[0.12em] ${
                          activeItem?.path === item.path ? 'text-white/70' : 'text-neutral-500'
                        }`}
                      >
                        {getTranslationSectionMeta(item.sectionId).label}
                        {item.fieldContext ? ` / ${item.fieldContext}` : ''}
                      </p>
                    </div>

                    {item.overridden && (
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          activeItem?.path === item.path ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-500'
                        }`}
                      >
                        Changed
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-3 line-clamp-2 text-xs ${
                      activeItem?.path === item.path ? 'text-white/75' : 'text-neutral-500'
                    }`}
                  >
                    {item.currentValue || item.baseValue || 'Empty'}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
              No results
            </div>
          )}
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        {activeItem ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className={adminTitleClass}>{activeItem.fieldLabel}</h2>
                <p className="mt-2 text-sm text-neutral-500">
                  {activePage.label}
                  {activeSectionId !== ALL_FIELDS_KEY ? ` / ${getTranslationSectionMeta(activeSectionId).label}` : ''}
                  {activeItem.fieldContext ? ` / ${activeItem.fieldContext}` : ''}
                </p>
              </div>

              <button onClick={handleClearTranslation} className={adminDangerButtonClass}>
                <Trash2 size={16} />
                Clear
              </button>
            </div>

            <div className="mt-5 flex-1 overflow-y-auto pr-1">
              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <p className={adminLabelClass}>Path</p>
                <p className="mt-2 break-all font-mono text-xs text-neutral-600">{activeItem.path}</p>
              </div>

              <div className="mt-4 rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <p className={adminLabelClass}>Base Value</p>
                <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-700">
                  {activeItem.baseValue || 'Empty'}
                </p>
              </div>

              <label className="mt-4 block space-y-2">
                <span className={adminLabelClass}>Override Value</span>
                <textarea
                  value={editorValue}
                  onChange={(event) => {
                    setSelectedFieldPath(activeItem.path);
                    setDraftPath(activeItem.path);
                    setDraftValue(event.target.value);
                  }}
                  rows={16}
                  className={adminTextareaClass}
                />
              </label>
            </div>
          </>
        ) : (
          <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-black/10 bg-neutral-50 text-sm text-neutral-500">
            Select a field
          </div>
        )}
      </section>
    </div>
  );
}
