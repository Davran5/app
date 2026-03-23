import { useEffect, useMemo, useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import type { Language } from '../../data/translations';
import {
  getTranslationEntries,
  getTranslationFieldMeta,
  getTranslationPageList,
  getTranslationPageMeta,
  getTranslationSectionsForPage,
  type TranslationOverrideMap,
} from '../../lib/cms';
import {
  adminCardClass,
  adminInputClass,
  adminLabelClass,
  adminSecondaryButtonClass,
  adminTextareaClass,
  adminTitleClass,
  getAdminPillClass,
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
  const [translationSearch, setTranslationSearch] = useState('');
  const [showOverridesOnly, setShowOverridesOnly] = useState(false);

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
  const activePageOverrideCount = translationItems.filter(
    (item) => item.pageId === activePageId && item.overridden,
  ).length;

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

  const groupedSections = useMemo(() => {
    const visiblePathSet = new Set(visibleItems.map((item) => item.path));
    const sectionGroups = sections
      .map((section) => ({
        ...section,
        items: translationItems.filter(
          (item) => item.pageId === activePageId && item.sectionId === section.id && visiblePathSet.has(item.path),
        ),
      }))
      .filter((section) => section.items.length > 0);

    const uncategorizedItems = visibleItems.filter(
      (item) => !sections.some((section) => section.id === item.sectionId),
    );

    if (uncategorizedItems.length > 0) {
      sectionGroups.push({
        id: '__uncategorized__',
        label: 'Other Fields',
        description: '',
        count: uncategorizedItems.length,
        items: uncategorizedItems,
      });
    }

    return sectionGroups;
  }, [activePageId, sections, translationItems, visibleItems]);

  const handleValueChange = (item: TranslationListItem, nextValue: string) => {
    if (nextValue === item.baseValue) {
      clearTranslationOverride(translationLanguage, item.path);
      return;
    }

    setTranslationOverride(translationLanguage, item.path, nextValue);
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save Content',
      onClick: () => undefined,
      disabled: translationItems.length === 0,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [onPrimaryActionChange, translationItems.length]);

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-4`}>
        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={adminLabelClass}>Language</p>
              <h2 className="mt-2 text-lg font-semibold text-black">Page Content</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowOverridesOnly(false)}
                className={getAdminPillClass(!showOverridesOnly)}
              >
                All
              </button>
              <button
                onClick={() => setShowOverridesOnly(true)}
                className={getAdminPillClass(showOverridesOnly)}
              >
                Changed
              </button>
            </div>
          </div>

          <select
            value={translationLanguage}
            onChange={(event) => {
              setTranslationLanguage(event.target.value as Language);
              setSelectedSectionId(ALL_FIELDS_KEY);
            }}
            className={adminInputClass}
          >
            <option value="en">English</option>
            <option value="ru">Russian</option>
            <option value="uz">Uzbek</option>
            <option value="de">German</option>
          </select>

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
          <div className="space-y-2">
            {pages.map((page) => {
              const active = page.id === activePageId;

              return (
                <button
                  key={page.id}
                  onClick={() => {
                    setSelectedPageId(page.id);
                    setSelectedSectionId(ALL_FIELDS_KEY);
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    active
                      ? 'border-black bg-black text-white'
                      : 'border-black/10 bg-white text-black hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{page.label}</p>
                      <p
                        className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                          active ? 'text-white/70' : 'text-neutral-500'
                        }`}
                      >
                        {page.count} fields
                      </p>
                    </div>

                    {page.overrideCount > 0 && (
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                          active ? 'bg-white/15 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {page.overrideCount} changed
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-4">
          <div>
            <p className={adminLabelClass}>Editing Page</p>
            <h2 className={adminTitleClass}>{activePage.label}</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Edit fields inline below, then use the main Save button to publish them to the server.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-right">
            <p className={adminLabelClass}>Status</p>
            <p className="mt-2 text-sm font-semibold text-black">{activePageCount} total fields</p>
            <p className="mt-1 text-sm text-neutral-500">{activePageOverrideCount} changed</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSectionId(ALL_FIELDS_KEY)}
            className={getAdminPillClass(activeSectionId === ALL_FIELDS_KEY)}
          >
            {`All Sections (${activePageCount})`}
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSectionId(section.id)}
              className={getAdminPillClass(activeSectionId === section.id)}
            >
              {`${section.label} (${section.count})`}
            </button>
          ))}
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          {groupedSections.length > 0 ? (
            <div className="space-y-5">
              {groupedSections.map((section) => (
                <div key={section.id} className="rounded-[24px] border border-black/10 bg-neutral-50 p-4 lg:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-black">{section.label}</h3>
                      {section.description && (
                        <p className="mt-2 max-w-2xl text-sm text-neutral-500">{section.description}</p>
                      )}
                    </div>
                    <span className="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600">
                      {section.items.length} fields
                    </span>
                  </div>

                  <div className="mt-4 space-y-4">
                    {section.items.map((item) => (
                      <div key={item.path} className="rounded-[20px] border border-black/10 bg-white p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm font-semibold text-black">{item.fieldLabel}</h4>
                              {item.overridden && (
                                <span className="rounded-full bg-black px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                                  Changed
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                              {item.fieldContext || 'Page field'}
                            </p>
                          </div>

                          <button
                            onClick={() => clearTranslationOverride(translationLanguage, item.path)}
                            className={adminSecondaryButtonClass}
                          >
                            <Trash2 size={14} />
                            Use Base Text
                          </button>
                        </div>

                        <div className="mt-4 grid gap-4 xl:grid-cols-2">
                          <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                            <p className={adminLabelClass}>Base Text</p>
                            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-neutral-700">
                              {item.baseValue || 'Empty'}
                            </p>
                          </div>

                          <label className="block space-y-2">
                            <span className={adminLabelClass}>Live Edit</span>
                            <textarea
                              value={item.currentValue}
                              onChange={(event) => handleValueChange(item, event.target.value)}
                              rows={Math.min(Math.max((item.currentValue || item.baseValue || ' ').split('\n').length + 2, 5), 12)}
                              className={adminTextareaClass}
                            />
                          </label>
                        </div>

                        <p className="mt-3 break-all font-mono text-[11px] text-neutral-400">{item.path}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-black/10 bg-neutral-50 text-sm text-neutral-500">
              No fields match the current filters.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
