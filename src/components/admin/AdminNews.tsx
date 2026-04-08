import { useCallback, useEffect, useMemo, useState } from 'react';
import { Copy, Eye, EyeOff, Link2, Newspaper, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Language } from '../../data/translations';
import {
  createEmptyNewsItem,
  createEmptyNewsItemLocalization,
  getNewsItemLocalization,
  slugifyProductId,
  type CmsNewsItem,
  type CmsNewsItemLocalization,
} from '../../lib/cms';
import {
  adminCardClass,
  adminDangerButtonClass,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
  adminTextareaClass,
  getAdminListItemClass,
  getAdminPillClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface AdminNewsProps {
  newsItems: CmsNewsItem[];
  upsertNewsItem: (newsItem: CmsNewsItem) => void;
  deleteNewsItem: (id: string) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

type NewsDraft = CmsNewsItem;

const NEW_NEWS_KEY = '__new_news_item__';
const newsLanguages: Language[] = ['en', 'ru', 'uz', 'de'];

function cloneNewsItem(newsItem: CmsNewsItem): NewsDraft {
  return JSON.parse(JSON.stringify(newsItem)) as NewsDraft;
}

function getDraftLocalization(draft: NewsDraft, language: Language): CmsNewsItemLocalization {
  return draft.localizations[language] ?? createEmptyNewsItemLocalization();
}

export default function AdminNews({
  newsItems,
  upsertNewsItem,
  deleteNewsItem,
  onPrimaryActionChange,
}: AdminNewsProps) {
  const [selectedNewsKey, setSelectedNewsKey] = useState<string>(newsItems[0]?.id ?? NEW_NEWS_KEY);
  const [newsSearch, setNewsSearch] = useState('');
  const [editorLanguage, setEditorLanguage] = useState<Language>('en');
  const [newsDraft, setNewsDraft] = useState<NewsDraft>(cloneNewsItem(newsItems[0] ?? createEmptyNewsItem()));

  const filteredNews = useMemo(() => {
    const query = newsSearch.trim().toLowerCase();
    if (!query) {
      return newsItems;
    }

    return newsItems.filter((newsItem) =>
      newsLanguages.some((language) => {
        const localization = getNewsItemLocalization(newsItem, language);
        return (
          localization.title.toLowerCase().includes(query) ||
          localization.excerpt.toLowerCase().includes(query) ||
          newsItem.author.toLowerCase().includes(query) ||
          newsItem.id.toLowerCase().includes(query)
        );
      }),
    );
  }, [newsItems, newsSearch]);

  useEffect(() => {
    if (selectedNewsKey === NEW_NEWS_KEY) {
      return;
    }

    const selectedNewsItem = newsItems.find((newsItem) => newsItem.id === selectedNewsKey);
    if (selectedNewsItem) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewsDraft(cloneNewsItem(selectedNewsItem));
      return;
    }

    setSelectedNewsKey(newsItems[0]?.id ?? NEW_NEWS_KEY);
  }, [newsItems, selectedNewsKey]);

  const handleCreateNewsItem = () => {
    setSelectedNewsKey(NEW_NEWS_KEY);
    setEditorLanguage('en');
    setNewsDraft(cloneNewsItem(createEmptyNewsItem()));
  };

  const handleDuplicateNewsItem = () => {
    const sourceTitle =
      getDraftLocalization(newsDraft, 'en').title ||
      getDraftLocalization(newsDraft, editorLanguage).title ||
      'news-item';

    setSelectedNewsKey(NEW_NEWS_KEY);
    setNewsDraft((current) => ({
      ...cloneNewsItem(current),
      id: `${slugifyProductId(sourceTitle)}-copy`,
    }));
    toast.success('News draft duplicated.');
  };

  const updateLocalization = (
    language: Language,
    updater: (current: CmsNewsItemLocalization) => CmsNewsItemLocalization,
  ) => {
    setNewsDraft((current) => ({
      ...current,
      localizations: {
        ...current.localizations,
        [language]: updater(getDraftLocalization(current, language)),
      },
    }));
  };

  const handleSaveNewsItem = useCallback(() => {
    const englishTitle = getDraftLocalization(newsDraft, 'en').title.trim();
    const fallbackTitle = getDraftLocalization(newsDraft, editorLanguage).title.trim();
    const nextId = newsDraft.id.trim() || slugifyProductId(englishTitle || fallbackTitle || 'news-item');

    if (!nextId) {
      toast.error('News item ID is required.');
      return;
    }

    if (!englishTitle && !fallbackTitle) {
      toast.error('Add a news title before saving.');
      return;
    }

    const idTaken = newsItems.some(
      (newsItem) => newsItem.id === nextId && newsItem.id !== selectedNewsKey,
    );

    if (idTaken) {
      toast.error('That news item ID is already in use.');
      return;
    }

    const sanitized: CmsNewsItem = {
      ...cloneNewsItem(newsDraft),
      id: nextId,
      date: newsDraft.date.trim(),
      author: newsDraft.author.trim(),
      image: newsDraft.image.trim(),
      imagePosition: {
        x: Math.min(100, Math.max(0, newsDraft.imagePosition.x)),
        y: Math.min(100, Math.max(0, newsDraft.imagePosition.y)),
      },
      link: newsDraft.link.trim(),
      localizations: newsLanguages.reduce<Record<Language, CmsNewsItemLocalization>>(
        (acc, language) => {
          const localization = getDraftLocalization(newsDraft, language);
          acc[language] = {
            title: localization.title.trim(),
            excerpt: localization.excerpt.trim(),
          };
          return acc;
        },
        {
          en: createEmptyNewsItemLocalization(),
          ru: createEmptyNewsItemLocalization(),
          uz: createEmptyNewsItemLocalization(),
          de: createEmptyNewsItemLocalization(),
        },
      ),
    };

    upsertNewsItem(sanitized);

    if (selectedNewsKey !== NEW_NEWS_KEY && selectedNewsKey !== nextId) {
      deleteNewsItem(selectedNewsKey);
    }

    setSelectedNewsKey(nextId);
    setNewsDraft(cloneNewsItem(sanitized));
    toast.success('News item saved.');
  }, [deleteNewsItem, editorLanguage, newsDraft, newsItems, selectedNewsKey, upsertNewsItem]);

  const handleDeleteNewsItem = () => {
    if (selectedNewsKey === NEW_NEWS_KEY) {
      setNewsDraft(cloneNewsItem(createEmptyNewsItem()));
      return;
    }

    deleteNewsItem(selectedNewsKey);
    setSelectedNewsKey(newsItems.find((newsItem) => newsItem.id !== selectedNewsKey)?.id ?? NEW_NEWS_KEY);
    toast.success('News item deleted.');
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save News',
      onClick: handleSaveNewsItem,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [handleSaveNewsItem, onPrimaryActionChange]);

  const activeLocalization = getDraftLocalization(newsDraft, editorLanguage);
  const liveCount = newsItems.filter((n) => n.isActive).length;

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[300px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={adminLabelClass}>Newsroom</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">Articles</h2>
          </div>
          <button
            onClick={handleCreateNewsItem}
            className={adminPrimaryButtonClass}
            aria-label="Create news item"
            title="Create news item"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-black/10 bg-neutral-50 px-3 py-2 text-center">
            <p className="text-lg font-semibold text-black">{newsItems.length}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Total</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-center">
            <p className="text-lg font-semibold text-emerald-700">{liveCount}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600">Live</p>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
          <Search size={16} className="text-neutral-400" />
          <input
            value={newsSearch}
            onChange={(event) => setNewsSearch(event.target.value)}
            placeholder="Search articles"
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </label>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-2">
            <button
              onClick={handleCreateNewsItem}
              className={getAdminListItemClass(selectedNewsKey === NEW_NEWS_KEY)}
            >
              <p className="text-sm font-semibold">New Article</p>
              <p
                className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                  selectedNewsKey === NEW_NEWS_KEY ? 'text-white/70' : 'text-neutral-500'
                }`}
              >
                Draft
              </p>
            </button>

            {filteredNews.map((newsItem) => {
              const preview = getNewsItemLocalization(newsItem, 'en');
              const active = selectedNewsKey === newsItem.id;

              return (
                <button
                  key={newsItem.id}
                  onClick={() => setSelectedNewsKey(newsItem.id)}
                  className={getAdminListItemClass(active)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {preview.title || 'Untitled article'}
                      </p>
                      <p
                        className={`mt-1 truncate text-xs uppercase tracking-[0.12em] ${
                          active ? 'text-white/70' : 'text-neutral-500'
                        }`}
                      >
                        {newsItem.author || 'No source'}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        newsItem.isActive
                          ? active
                            ? 'bg-white/15 text-white'
                            : 'bg-emerald-50 text-emerald-700'
                          : active
                            ? 'bg-white/10 text-white'
                            : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {newsItem.isActive ? 'Live' : 'Hidden'}
                    </span>
                  </div>
                  {newsItem.date && (
                    <p className={`mt-2 text-xs ${active ? 'text-white/60' : 'text-neutral-400'}`}>
                      {newsItem.date}
                    </p>
                  )}
                </button>
              );
            })}

            {filteredNews.length === 0 && newsSearch && (
              <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
                No articles match &ldquo;{newsSearch}&rdquo;
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Editor */}
      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden`}>
        {/* Header */}
        <div className="shrink-0 border-b border-black/10 px-6 py-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className={adminLabelClass}>News Editor</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">
                {activeLocalization.title || 'Untitled article'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button onClick={handleDuplicateNewsItem} className={adminSecondaryButtonClass}>
                <Copy size={15} />
                Duplicate
              </button>
              <button onClick={handleDeleteNewsItem} className={adminDangerButtonClass}>
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-0 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Left column */}
            <div className="space-y-0 border-r border-black/10">
              {/* Article ID */}
              <div className="border-b border-black/[0.06] bg-neutral-50/60 px-5 py-3.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">Metadata</h3>
              </div>

              <div className="space-y-4 p-5">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Article ID</span>
                  <input
                    value={newsDraft.id}
                    onChange={(event) =>
                      setNewsDraft((current) => ({
                        ...current,
                        id: event.target.value,
                      }))
                    }
                    placeholder="news-item-id"
                    className={adminInputClass}
                  />
                </label>

                {/* Published toggle */}
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-black">Published</p>
                    <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                      Show on News page
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNewsDraft((current) => ({
                        ...current,
                        isActive: !current.isActive,
                      }))
                    }
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                      newsDraft.isActive ? 'bg-black' : 'bg-neutral-300'
                    }`}
                    aria-pressed={newsDraft.isActive}
                    aria-label="Toggle article visibility"
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white transition ${
                        newsDraft.isActive ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Date</span>
                    <input
                      type="date"
                      value={newsDraft.date}
                      onChange={(event) =>
                        setNewsDraft((current) => ({
                          ...current,
                          date: event.target.value,
                        }))
                      }
                      className={adminInputClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Source</span>
                    <input
                      value={newsDraft.author}
                      onChange={(event) =>
                        setNewsDraft((current) => ({
                          ...current,
                          author: event.target.value,
                        }))
                      }
                      placeholder="Publication or author"
                      className={adminInputClass}
                    />
                  </label>
                </div>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Article Link</span>
                  <div className="relative">
                    <Link2
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      value={newsDraft.link}
                      onChange={(event) =>
                        setNewsDraft((current) => ({
                          ...current,
                          link: event.target.value,
                        }))
                      }
                      placeholder="https://"
                      className={`${adminInputClass} pl-9`}
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Image URL</span>
                  <input
                    value={newsDraft.image}
                    onChange={(event) =>
                      setNewsDraft((current) => ({
                        ...current,
                        image: event.target.value,
                      }))
                    }
                    placeholder="https://"
                    className={adminInputClass}
                  />
                </label>

                {/* Image position sliders */}
                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={adminLabelClass}>Image Position</p>
                      <p className="mt-0.5 text-xs text-neutral-500">Focal-point for image cropping</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setNewsDraft((current) => ({
                          ...current,
                          imagePosition: { x: 50, y: 50 },
                        }))
                      }
                      className={adminSecondaryButtonClass}
                    >
                      Reset
                    </button>
                  </div>

                  <div className="mt-4 space-y-4">
                    <label className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className={adminLabelClass}>Horizontal</span>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          {Math.round(newsDraft.imagePosition.x)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={newsDraft.imagePosition.x}
                        onChange={(event) =>
                          setNewsDraft((current) => ({
                            ...current,
                            imagePosition: {
                              ...current.imagePosition,
                              x: Number(event.target.value),
                            },
                          }))
                        }
                        className="w-full accent-black"
                      />
                    </label>

                    <label className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className={adminLabelClass}>Vertical</span>
                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
                          {Math.round(newsDraft.imagePosition.y)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={newsDraft.imagePosition.y}
                        onChange={(event) =>
                          setNewsDraft((current) => ({
                            ...current,
                            imagePosition: {
                              ...current.imagePosition,
                              y: Number(event.target.value),
                            },
                          }))
                        }
                        className="w-full accent-black"
                      />
                    </label>
                  </div>

                  {/* Image preview */}
                  {newsDraft.image && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-black/10">
                      <img
                        src={newsDraft.image}
                        alt=""
                        className="aspect-video w-full object-cover"
                        style={{
                          objectPosition: `${newsDraft.imagePosition.x}% ${newsDraft.imagePosition.y}%`,
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Language selector */}
                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <p className={adminLabelClass}>Editing Language</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {newsLanguages.map((language) => (
                      <button
                        key={language}
                        type="button"
                        onClick={() => setEditorLanguage(language)}
                        className={getAdminPillClass(editorLanguage === language)}
                      >
                        {language.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-0">
              <div className="border-b border-black/[0.06] bg-neutral-50/60 px-5 py-3.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Content ({editorLanguage.toUpperCase()})
                </h3>
              </div>

              <div className="space-y-4 p-5">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Title</span>
                  <input
                    value={activeLocalization.title}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Article headline"
                    className={adminInputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Excerpt / Summary</span>
                  <textarea
                    rows={9}
                    value={activeLocalization.excerpt}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        excerpt: event.target.value,
                      }))
                    }
                    placeholder="Short article summary shown in the news feed…"
                    className={adminTextareaClass}
                  />
                </label>

                {/* Card preview */}
                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <p className={adminLabelClass}>Card Preview</p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-black/10 bg-white">
                    {newsDraft.image && (
                      <img
                        src={newsDraft.image}
                        alt=""
                        className="aspect-video w-full object-cover"
                        style={{
                          objectPosition: `${newsDraft.imagePosition.x}% ${newsDraft.imagePosition.y}%`,
                        }}
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 text-black">
                          <Newspaper size={13} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-black">{newsDraft.author || 'Source'}</p>
                          <p className="text-[10px] text-neutral-400">{newsDraft.date || 'No date'}</p>
                        </div>
                        <span
                          className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            newsDraft.isActive
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-neutral-100 text-neutral-500'
                          }`}
                        >
                          {newsDraft.isActive ? (
                            <><Eye size={10} /> Live</>
                          ) : (
                            <><EyeOff size={10} /> Hidden</>
                          )}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-black">
                        {activeLocalization.title || 'Article title'}
                      </p>
                      <p className="mt-1 line-clamp-3 text-xs text-neutral-500">
                        {activeLocalization.excerpt || 'Article summary will appear here.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
