import { useCallback, useEffect, useMemo, useState } from 'react';
import { Copy, Newspaper, Plus, Search, Trash2 } from 'lucide-react';
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

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-black">News</h2>
            <p className="mt-1 text-sm text-neutral-500">Create, publish, edit, and remove newsroom articles.</p>
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

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
          <Search size={16} className="text-neutral-400" />
          <input
            value={newsSearch}
            onChange={(event) => setNewsSearch(event.target.value)}
            placeholder="Search news"
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </label>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-3">
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
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
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
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-6`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className={adminLabelClass}>News Editor</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
              {activeLocalization.title || 'Untitled article'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleDuplicateNewsItem} className={adminSecondaryButtonClass}>
              <Copy size={16} />
              Duplicate
            </button>
            <button onClick={handleDeleteNewsItem} className={adminDangerButtonClass}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="space-y-4">
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

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-black">Published</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                    Show this article on the News page
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

              <div className="grid gap-4 md:grid-cols-2">
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
                    className={adminInputClass}
                  />
                </label>
              </div>

              <label className="space-y-2">
                <span className={adminLabelClass}>Article Link</span>
                <input
                  value={newsDraft.link}
                  onChange={(event) =>
                    setNewsDraft((current) => ({
                      ...current,
                      link: event.target.value,
                    }))
                  }
                  placeholder="https://"
                  className={adminInputClass}
                />
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

              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={adminLabelClass}>Image Position</p>
                    <p className="mt-1 text-xs text-neutral-500">Adjust the focal point for article image cropping.</p>
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
              </div>

              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <p className={adminLabelClass}>Languages</p>
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

              <div className="mx-auto w-[85%] max-w-[42rem] overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
                {newsDraft.image ? (
                  <img
                    src={newsDraft.image}
                    alt=""
                    className="aspect-video w-full object-cover"
                    style={{
                      objectPosition: `${newsDraft.imagePosition.x}% ${newsDraft.imagePosition.y}%`,
                    }}
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center text-sm text-neutral-500">
                    No preview image
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
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
                  className={adminInputClass}
                />
              </label>

              <label className="space-y-2">
                <span className={adminLabelClass}>Excerpt</span>
                <textarea
                  rows={9}
                  value={activeLocalization.excerpt}
                  onChange={(event) =>
                    updateLocalization(editorLanguage, (current) => ({
                      ...current,
                      excerpt: event.target.value,
                    }))
                  }
                  className={adminTextareaClass}
                />
              </label>

              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm">
                    <Newspaper size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">{newsDraft.author || 'Source preview'}</p>
                    <p className="text-xs text-neutral-500">{newsDraft.date || 'No date selected'}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold text-black">
                  {activeLocalization.title || 'Article title preview'}
                </p>
                <p className="mt-2 text-sm text-neutral-600">
                  {activeLocalization.excerpt || 'Article summary preview will appear here.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
