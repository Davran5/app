import { useEffect, useMemo, useState } from 'react';
import { ImageIcon, RotateCcw, Search, Type, X } from 'lucide-react';
import type { Language } from '../../data/translations';
import {
  getEditableTranslationEntries,
  getTranslationFieldMeta,
  getTranslationPageList,
  getSectionMediaFieldsForPage,
  getTranslationSectionsForPage,
  type SectionMediaFieldMeta,
  type TranslationOverrideMap,
} from '../../lib/cms';
import { useCms } from '../../contexts/CmsContext';
import { getMediaLibrary, getMediaPreviewUrl } from '../../lib/media';
import AdminMediaLibrary from './AdminMediaLibrary';
import {
  adminCardClass,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
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

interface SectionGroup {
  id: string;
  label: string;
  description: string;
  count: number;
  overrideCount: number;
  items: TranslationListItem[];
  imageFields: SectionMediaFieldMeta[];
}

interface AdminTranslationsProps {
  translationOverrides: TranslationOverrideMap;
  setTranslationOverride: (language: Language, path: string, value: string) => void;
  clearTranslationOverride: (language: Language, path: string) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

const ALL_FIELDS_KEY = '__all_fields__';
const UNCATEGORIZED_SECTION_ID = '__uncategorized__';

const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  ru: 'Russian',
  uz: 'Uzbek',
  de: 'German',
};

function shouldUseTextarea(item: TranslationListItem) {
  const value = item.currentValue || item.baseValue;

  return value.includes('\n') || value.length > 120;
}

function getEditorRows(item: TranslationListItem) {
  const value = item.currentValue || item.baseValue || ' ';
  const lineCount = value.split('\n').length;

  return Math.min(Math.max(lineCount + 1, 3), 8);
}

export default function AdminTranslations({
  translationOverrides,
  setTranslationOverride,
  clearTranslationOverride,
  onPrimaryActionChange,
}: AdminTranslationsProps) {
  const { mediaItems, sectionMedia, setSectionMedia, clearSectionMedia } = useCms();
  const [translationLanguage, setTranslationLanguage] = useState<Language>('en');
  const [selectedPageId, setSelectedPageId] = useState('home');
  const [selectedSectionId, setSelectedSectionId] = useState(ALL_FIELDS_KEY);
  const [translationSearch, setTranslationSearch] = useState('');
  const [showOverridesOnly, setShowOverridesOnly] = useState(false);
  const [selectedImageFieldId, setSelectedImageFieldId] = useState<string | null>(null);

  const currentOverrides = translationOverrides[translationLanguage];
  const mediaLibrary = useMemo(() => getMediaLibrary(mediaItems), [mediaItems]);

  const baseTranslationEntries = useMemo(
    () => getEditableTranslationEntries(translationLanguage),
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

  const sections = useMemo(
    () =>
      getTranslationSectionsForPage(activePageId, translationLanguage, currentOverrides).map((section) => {
        const sectionItems = translationItems.filter(
          (item) => item.pageId === activePageId && item.sectionId === section.id,
        );

        return {
          ...section,
          count: sectionItems.length,
          overrideCount: sectionItems.filter((item) => item.overridden).length,
        };
      }),
    [activePageId, currentOverrides, translationItems, translationLanguage],
  );

  const pageImageFields = useMemo(
    () => getSectionMediaFieldsForPage(activePageId),
    [activePageId],
  );

  const activePageCount =
    translationItems.filter((item) => item.pageId === activePageId).length + pageImageFields.length;
  const activePageOverrideCount =
    translationItems.filter((item) => item.pageId === activePageId && item.overridden).length +
    pageImageFields.filter((field) => Boolean(sectionMedia[field.id]?.trim())).length;

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

  const visibleImageFields = useMemo(() => {
    const query = translationSearch.trim().toLowerCase();

    return pageImageFields
      .filter((field) => activeSectionId === ALL_FIELDS_KEY || field.sectionId === activeSectionId)
      .filter((field) => (showOverridesOnly ? Boolean(sectionMedia[field.id]?.trim()) : true))
      .filter((field) => {
        if (!query) {
          return true;
        }

        const currentUrl = sectionMedia[field.id] || field.defaultUrl;

        return (
          field.label.toLowerCase().includes(query) ||
          field.description.toLowerCase().includes(query) ||
          field.id.toLowerCase().includes(query) ||
          currentUrl.toLowerCase().includes(query)
        );
      });
  }, [activeSectionId, pageImageFields, sectionMedia, showOverridesOnly, translationSearch]);

  const groupedSections = useMemo<SectionGroup[]>(() => {
    const visiblePathSet = new Set(visibleItems.map((item) => item.path));
    const visibleImageFieldIds = new Set(visibleImageFields.map((field) => field.id));
    const sectionGroups = sections
      .map((section) => {
        const items = translationItems.filter(
          (item) =>
            item.pageId === activePageId &&
            item.sectionId === section.id &&
            visiblePathSet.has(item.path),
        );
        const imageFields = pageImageFields.filter(
          (field) => field.sectionId === section.id && visibleImageFieldIds.has(field.id),
        );

        return {
          ...section,
          items,
          imageFields,
          count: items.length + imageFields.length,
          overrideCount:
            items.filter((item) => item.overridden).length +
            imageFields.filter((field) => Boolean(sectionMedia[field.id]?.trim())).length,
        };
      })
      .filter((section) => section.items.length > 0 || section.imageFields.length > 0);

    const uncategorizedItems = visibleItems.filter(
      (item) => !sections.some((section) => section.id === item.sectionId),
    );
    const uncategorizedImageFields = visibleImageFields.filter(
      (field) => !sections.some((section) => section.id === field.sectionId),
    );

    if (uncategorizedItems.length > 0 || uncategorizedImageFields.length > 0) {
      sectionGroups.push({
        id: UNCATEGORIZED_SECTION_ID,
        label: 'Other Fields',
        description: '',
        count: uncategorizedItems.length + uncategorizedImageFields.length,
        overrideCount:
          uncategorizedItems.filter((item) => item.overridden).length +
          uncategorizedImageFields.filter((field) => Boolean(sectionMedia[field.id]?.trim())).length,
        items: uncategorizedItems,
        imageFields: uncategorizedImageFields,
      });
    }

    return sectionGroups;
  }, [
    activePageId,
    pageImageFields,
    sectionMedia,
    sections,
    translationItems,
    visibleImageFields,
    visibleItems,
  ]);

  // Compute sidebar section counts (independent of section filter so sidebar always shows all)
  const sidebarSections = useMemo(() => {
    const query = translationSearch.trim().toLowerCase();

    return sections.map((section) => {
      const sectionItems = translationItems.filter(
        (item) =>
          item.pageId === activePageId &&
          item.sectionId === section.id &&
          (showOverridesOnly ? item.overridden : true) &&
          (!query ||
            item.path.toLowerCase().includes(query) ||
            item.fieldLabel.toLowerCase().includes(query) ||
            item.fieldContext.toLowerCase().includes(query) ||
            item.baseValue.toLowerCase().includes(query) ||
            item.currentValue.toLowerCase().includes(query)),
      );
      const sectionImageFields = pageImageFields.filter(
        (field) =>
          field.sectionId === section.id &&
          (showOverridesOnly ? Boolean(sectionMedia[field.id]?.trim()) : true) &&
          (!query ||
            field.label.toLowerCase().includes(query) ||
            field.description.toLowerCase().includes(query) ||
            field.id.toLowerCase().includes(query) ||
            (sectionMedia[field.id] || field.defaultUrl).toLowerCase().includes(query)),
      );
      const count = sectionItems.length + sectionImageFields.length;
      const overrideCount =
        sectionItems.filter((i) => i.overridden).length +
        sectionImageFields.filter((f) => Boolean(sectionMedia[f.id]?.trim())).length;

      return { ...section, count, overrideCount };
    }).filter((s) => s.count > 0);
  }, [activePageId, pageImageFields, sections, sectionMedia, showOverridesOnly, translationItems, translationSearch]);

  const handleValueChange = (item: TranslationListItem, nextValue: string) => {
    if (nextValue === item.baseValue) {
      clearTranslationOverride(translationLanguage, item.path);
      return;
    }

    setTranslationOverride(translationLanguage, item.path, nextValue);
  };

  const handleImageChange = (field: SectionMediaFieldMeta, nextValue: string) => {
    const trimmedValue = nextValue.trim();

    if (!trimmedValue || trimmedValue === field.defaultUrl) {
      clearSectionMedia(field.id);
      return;
    }

    setSectionMedia(field.id, trimmedValue);
  };

  const selectedImageField = useMemo(
    () => pageImageFields.find((field) => field.id === selectedImageFieldId) ?? null,
    [pageImageFields, selectedImageFieldId],
  );

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
    <section className={`${adminCardClass} relative flex h-full min-h-0 flex-col overflow-hidden`}>
      {/* ── Toolbar ── */}
      <div className="shrink-0 border-b border-black/10 bg-white px-4 py-3">
        {/* Row 1: page, language, search */}
        <div className="flex items-center gap-3">
          <label className="block w-[170px] shrink-0 space-y-1">
            <span className={adminLabelClass}>Page</span>
            <select
              value={activePageId}
              onChange={(event) => {
                setSelectedPageId(event.target.value);
                setSelectedSectionId(ALL_FIELDS_KEY);
              }}
              className={`${adminInputClass} px-3 py-2`}
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block w-[130px] shrink-0 space-y-1">
            <span className={adminLabelClass}>Language</span>
            <select
              value={translationLanguage}
              onChange={(event) => {
                setTranslationLanguage(event.target.value as Language);
                setSelectedSectionId(ALL_FIELDS_KEY);
              }}
              className={`${adminInputClass} px-3 py-2`}
            >
              {(Object.entries(LANGUAGE_LABELS) as [Language, string][]).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block min-w-0 flex-1 space-y-1">
            <span className={adminLabelClass}>Search</span>
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={translationSearch}
                onChange={(event) => setTranslationSearch(event.target.value)}
                placeholder="Search fields, labels, or content..."
                className={`${adminInputClass} px-3 py-2 pl-10`}
              />
              {translationSearch && (
                <button
                  onClick={() => setTranslationSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </label>
        </div>

        {/* Row 2: filter + status */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOverridesOnly(false)}
              className={getAdminPillClass(!showOverridesOnly)}
            >
              All fields
            </button>
            <button
              onClick={() => setShowOverridesOnly(true)}
              className={getAdminPillClass(showOverridesOnly)}
            >
              Changed only
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
            <span className="rounded-full border border-black/10 bg-neutral-50 px-2.5 py-1.5">
              {activePageCount} fields
            </span>
            {activePageOverrideCount > 0 && (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-emerald-700">
                {activePageOverrideCount} changed
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body: sidebar + content ── */}
      <div className="flex flex-1 min-h-0">
        {/* Section sidebar */}
        <div className="w-[200px] shrink-0 overflow-y-auto border-r border-black/10 bg-neutral-50/70 py-2">
          <button
            onClick={() => setSelectedSectionId(ALL_FIELDS_KEY)}
            className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition ${
              activeSectionId === ALL_FIELDS_KEY
                ? 'bg-black font-semibold text-white'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>All Sections</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                activeSectionId === ALL_FIELDS_KEY
                  ? 'bg-white/20 text-white'
                  : 'bg-neutral-200/80 text-neutral-600'
              }`}
            >
              {visibleItems.length + visibleImageFields.length}
            </span>
          </button>

          <div className="mt-1 px-2">
            <div className="border-t border-black/10" />
          </div>

          <div className="mt-1 space-y-0.5">
            {sidebarSections.map((section) => {
              const isActive = activeSectionId === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-[13px] transition ${
                    isActive
                      ? 'bg-black font-semibold text-white'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                >
                  <span className="min-w-0 truncate">{section.label}</span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    {section.overrideCount > 0 && (
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? 'bg-emerald-400' : 'bg-emerald-500'
                        }`}
                      />
                    )}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-200/80 text-neutral-500'
                      }`}
                    >
                      {section.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto">
          {groupedSections.length > 0 ? (
            <div className="space-y-0">
              {groupedSections.map((section) => (
                <div key={section.id}>
                  {/* Section header */}
                  {activeSectionId === ALL_FIELDS_KEY && (
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-neutral-50/95 px-5 py-2.5 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-800">
                          {section.label}
                        </h3>
                        {section.overrideCount > 0 && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            {section.overrideCount} changed
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold tracking-wide text-neutral-400">
                        {section.count} {section.count === 1 ? 'field' : 'fields'}
                      </span>
                    </div>
                  )}

                  {/* Section description when viewing a single section */}
                  {activeSectionId !== ALL_FIELDS_KEY && section.description && (
                    <div className="border-b border-black/10 bg-neutral-50/60 px-5 py-3">
                      <p className="text-sm text-neutral-500">{section.description}</p>
                    </div>
                  )}

                  {/* Fields */}
                  <div className="space-y-3 px-4 py-4">
                    {/* Image fields */}
                    {section.imageFields.map((field) => {
                      const currentUrl = sectionMedia[field.id] || field.defaultUrl;
                      const overridden = Boolean(sectionMedia[field.id]?.trim());

                      return (
                        <div
                          key={field.id}
                          className={`overflow-hidden rounded-2xl border bg-white transition ${
                            overridden
                              ? 'border-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]'
                              : 'border-black/10'
                          }`}
                        >
                          {/* Image header */}
                          <div className="flex items-center justify-between border-b border-black/[0.06] bg-neutral-50/60 px-4 py-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                                <ImageIcon size={14} />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-black">{field.label}</h4>
                                <p className="text-[11px] text-neutral-500">{field.description}</p>
                              </div>
                              {overridden && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                  Changed
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedImageFieldId(field.id)}
                                className={`${adminPrimaryButtonClass} px-3 py-1.5 text-xs`}
                              >
                                <ImageIcon size={13} />
                                Choose
                              </button>
                              {overridden && (
                                <button
                                  onClick={() => clearSectionMedia(field.id)}
                                  className={`${adminSecondaryButtonClass} px-2.5 py-1.5 text-xs`}
                                >
                                  <RotateCcw size={13} />
                                  Reset
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Image body */}
                          <div className="flex gap-4 p-4">
                            {/* Thumbnail */}
                            <div className="h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-neutral-100">
                              <img
                                src={getMediaPreviewUrl(currentUrl)}
                                alt={field.label}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            {/* URL input */}
                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
                              <input
                                type="text"
                                value={currentUrl}
                                onChange={(event) => handleImageChange(field, event.target.value)}
                                className={`${adminInputClass} rounded-xl px-3 py-2`}
                                placeholder={field.defaultUrl}
                              />
                              <p className="break-all text-[11px] text-neutral-400">
                                Default: {field.defaultUrl}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Text fields */}
                    {section.items.map((item) => {
                      const multiline = shouldUseTextarea(item);

                      return (
                        <div
                          key={item.path}
                          className={`overflow-hidden rounded-2xl border bg-white transition ${
                            item.overridden
                              ? 'border-emerald-200 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]'
                              : 'border-black/10'
                          }`}
                        >
                          {/* Field header */}
                          <div className="flex items-center justify-between px-4 py-2.5">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                                <Type size={13} />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-black">
                                  {item.fieldLabel}
                                </h4>
                                <p className="text-[11px] text-neutral-500">
                                  {item.fieldContext || 'Page field'}
                                </p>
                              </div>
                              {item.overridden && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                                  Changed
                                </span>
                              )}
                            </div>

                            {item.overridden ? (
                              <button
                                onClick={() =>
                                  clearTranslationOverride(translationLanguage, item.path)
                                }
                                className={`${adminSecondaryButtonClass} shrink-0 px-2.5 py-1.5 text-xs`}
                              >
                                <RotateCcw size={13} />
                                Reset
                              </button>
                            ) : (
                              <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                                Base value
                              </span>
                            )}
                          </div>

                          {/* Field body */}
                          <div className="px-4 pb-3.5">
                            {item.baseValue && item.overridden && (
                              <p className="mb-2 rounded-lg bg-neutral-50 px-3 py-2 text-xs leading-relaxed text-neutral-500">
                                <span className="font-semibold uppercase tracking-wider text-neutral-400">
                                  Base:
                                </span>{' '}
                                <span className="whitespace-pre-wrap">{item.baseValue}</span>
                              </p>
                            )}
                            {multiline ? (
                              <textarea
                                value={item.currentValue}
                                onChange={(event) =>
                                  handleValueChange(item, event.target.value)
                                }
                                rows={getEditorRows(item)}
                                className={`${adminInputClass} min-h-[84px] resize-y rounded-xl px-3 py-2.5`}
                              />
                            ) : (
                              <input
                                type="text"
                                value={item.currentValue}
                                onChange={(event) =>
                                  handleValueChange(item, event.target.value)
                                }
                                className={`${adminInputClass} rounded-xl px-3 py-2.5`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100">
                  <Search size={20} className="text-neutral-400" />
                </div>
                <p className="text-sm font-medium text-neutral-500">No fields match the current filters.</p>
                <p className="mt-1 text-xs text-neutral-400">Try adjusting your search or filter settings.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Image picker modal ── */}
      {selectedImageField && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 p-4">
          <div className="flex h-[min(86vh,820px)] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <div>
                <p className={adminLabelClass}>Select Image</p>
                <h3 className="mt-1 text-lg font-semibold text-black">{selectedImageField.label}</h3>
                <p className="mt-1 text-sm text-neutral-500">{selectedImageField.description}</p>
              </div>

              <button
                onClick={() => setSelectedImageFieldId(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:bg-neutral-100"
                aria-label="Close image picker"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden p-4">
              <AdminMediaLibrary
                title="Section Images"
                description="Choose an image from the media library for this section."
                selectLabel="Use Image"
                mediaLibrary={mediaLibrary.filter((item) => item.mimeType?.startsWith('image/') || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(item.url))}
                selectedUrls={[sectionMedia[selectedImageField.id] || selectedImageField.defaultUrl]}
                onSelect={(url) => {
                  handleImageChange(selectedImageField, url);
                  setSelectedImageFieldId(null);
                }}
                emptyMessage="No images are available in the media library."
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
