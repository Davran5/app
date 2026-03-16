import { useMemo, useState } from 'react';
import { ArrowUpDown, Calendar, User, ChevronRight } from 'lucide-react';
import { useCms } from '../contexts/CmsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getNewsItemLocalization } from '../lib/cms';

export default function News() {
  const { t, language } = useLanguage();
  const { newsItems } = useCms();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const locale = useMemo(() => {
    switch (language) {
      case 'ru':
        return 'ru-RU';
      case 'uz':
        return 'uz-UZ';
      case 'de':
        return 'de-DE';
      default:
        return 'en-US';
    }
  }, [language]);

  const blogPosts = useMemo(
    () =>
      newsItems
        .filter((newsItem) => newsItem.isActive)
        .map((newsItem) => {
          const localization = getNewsItemLocalization(newsItem, language);

          return {
            id: newsItem.id,
            title: localization.title.trim(),
            excerpt: localization.excerpt.trim(),
            image: newsItem.image.trim(),
            imagePosition: newsItem.imagePosition,
            date: newsItem.date.trim(),
            author: newsItem.author.trim(),
            link: newsItem.link.trim(),
          };
        })
        .filter((post) => post.title),
    [language, newsItems],
  );

  const formatDate = (
    value: string,
    options: Intl.DateTimeFormatOptions,
  ) => {
    if (!value) {
      return 'No date';
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'No date';
    }

    return parsedDate.toLocaleDateString(locale, options);
  };

  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((left, right) => {
      const leftTime = Number.isNaN(new Date(left.date).getTime()) ? 0 : new Date(left.date).getTime();
      const rightTime = Number.isNaN(new Date(right.date).getTime()) ? 0 : new Date(right.date).getTime();
      return sortOrder === 'desc' ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [blogPosts, sortOrder]);

  const resolvedSelectedPostId = sortedPosts.some((post) => post.id === selectedPostId)
    ? selectedPostId
    : sortedPosts[0]?.id ?? null;

  const selectedPost = resolvedSelectedPostId
    ? sortedPosts.find((post) => post.id === resolvedSelectedPostId) || sortedPosts[0]
    : sortedPosts[0];

  const emptyState = (
    <div className="rounded-[28px] border border-black/10 bg-neutral-50 px-6 py-12 text-center lg:px-10">
      <h3 className="font-display text-xl font-semibold text-[#0B0C0E]">No news published yet</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500">
        Publish articles from the admin panel to populate this page.
      </p>
    </div>
  );

  return (
    <div className="bg-white w-full flex-1 flex flex-col">
      <div className="relative z-10 bg-white w-full flex-1 flex flex-col">
        <div className="bg-white relative z-10">
          {/* Magazine Layout */}
          <section className="pt-12 lg:pt-16 pb-10 lg:pb-14">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              {sortedPosts.length === 0 ? (
                emptyState
              ) : (
                <>
              {/* MOBILE VIEW: Accordion Style */}
              <div className="lg:hidden space-y-4">
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={() => setSortOrder((current) => (current === 'desc' ? 'asc' : 'desc'))}
                    className="inline-flex items-center gap-2 border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#0B0C0E] transition hover:bg-gray-50"
                  >
                    <ArrowUpDown size={16} />
                    {sortOrder === 'desc' ? t.blog.newestFirst : t.blog.oldestFirst}
                  </button>
                </div>
                <div className="flex flex-col border-t border-gray-100">
                  {sortedPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-100">
                      <button
                        onClick={() => setSelectedPostId(resolvedSelectedPostId === post.id ? null : post.id)}
                        className={`w-full text-left py-6 flex items-center justify-between transition-all duration-300 ${resolvedSelectedPostId === post.id ? 'text-[#244d85]' : 'text-[#0B0C0E]'}`}
                      >
                        <h4 className="font-display text-lg font-semibold leading-tight pr-4">
                          {post.title}
                        </h4>
                        <div className={`transition-transform duration-300 flex-shrink-0 ${resolvedSelectedPostId === post.id ? 'rotate-90 text-[#244d85]' : 'text-gray-300'}`}>
                          <ChevronRight size={20} />
                        </div>
                      </button>

                      {resolvedSelectedPostId === post.id && (
                        <div className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="aspect-video w-full overflow-hidden mb-6">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                              style={{
                                objectPosition: `${post.imagePosition.x}% ${post.imagePosition.y}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {formatDate(post.date, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {post.author || 'KRANTAS Group'}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 leading-relaxed mb-6">
                            {post.excerpt}
                          </p>

                          {post.link && (
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-[#244d85] text-white px-5 py-3 text-sm font-medium transition-all hover:bg-[#1E4ECC]"
                            >
                              {t.blog.readOriginal || 'Read Original News'}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* DESKTOP VIEW: Magazine Layout */}
              <div className="hidden lg:flex flex-row gap-8">
                {/* Left - Article List (Scrollable) */}
                <div className="lg:w-1/3">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl lg:text-2xl font-semibold text-[#0B0C0E]">
                      {t.blog.latest}
                    </h3>
                    <button
                      onClick={() => setSortOrder((current) => (current === 'desc' ? 'asc' : 'desc'))}
                      className="inline-flex items-center gap-2 border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#0B0C0E] transition hover:bg-gray-50"
                    >
                      <ArrowUpDown size={16} />
                      {sortOrder === 'desc' ? t.blog.newestFirst : t.blog.oldestFirst}
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                    {sortedPosts.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => setSelectedPostId(post.id)}
                        className={`w-full text-left p-4 transition-all ${resolvedSelectedPostId === post.id
                          ? 'bg-[#244d85]/5'
                          : ''
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-2 text-base text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(post.date, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {post.author || 'KRANTAS Group'}
                          </span>
                        </div>
                        <h4 className={`font-medium text-base ${resolvedSelectedPostId === post.id ? 'text-[#244d85]' : 'text-[#0B0C0E]'}`}>
                          {post.title}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right - Featured Article (Fixed) */}
                <div className="lg:w-2/3 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-white overflow-hidden">
                    <div className="h-[20.7rem] lg:h-[23rem] overflow-hidden">
                      <img
                        src={selectedPost?.image}
                        alt={selectedPost?.title}
                        className="w-full h-full object-cover"
                        style={
                          selectedPost
                            ? {
                                objectPosition: `${selectedPost.imagePosition.x}% ${selectedPost.imagePosition.y}%`,
                              }
                            : undefined
                        }
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4 text-base text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(selectedPost?.date || '', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {selectedPost?.author || 'KRANTAS Group'}
                        </span>
                      </div>
                      <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-semibold text-[#0B0C0E] mb-4">
                        {selectedPost?.title}
                      </h2>
                      <p className="text-base text-gray-600 leading-relaxed mb-6">
                        {selectedPost?.excerpt}
                      </p>
                      {selectedPost?.link && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                          <a
                            href={selectedPost.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#244d85] text-white px-6 py-3 font-medium transition-all hover:bg-[#1E4ECC]"
                          >
                            {t.blog.readOriginal || 'Read Original News'}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
