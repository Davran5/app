import { useState } from 'react';
import { Calendar, User, ChevronRight } from 'lucide-react';
import Hero from '../components/Hero';
import { useLanguage } from '../contexts/LanguageContext';

export default function News() {
  const { t, language } = useLanguage();
  const [selectedPostId, setSelectedPostId] = useState(7);

  const blogPosts = [
    {
      id: 7,
      title: t.blog.posts[7].title,
      excerpt: t.blog.posts[7].excerpt,
      image: 'https://www.spot.uz/media/img/2025/05/dOcWxi17473091207912_l.jpg',
      date: '2025-05-15',
      author: 'Spot',
      link: 'https://www.spot.uz/ru/2025/05/15/renovation-krantas/'
    },
    {
      id: 6,
      title: t.blog.posts[6].title,
      excerpt: t.blog.posts[6].excerpt,
      image: 'https://www.spot.uz/media/img/2024/07/m5TVxw17211275895782_l.jpg',
      date: '2024-07-16',
      author: 'Spot',
      link: 'https://www.spot.uz/ru/2024/07/16/arms-industry/'
    },
    {
      id: 5,
      title: t.blog.posts[5].title,
      excerpt: t.blog.posts[5].excerpt,
      image: 'https://agmk.uz/uploads/news/236088321ac0abe73c75ef80ec63b8b5.JPG',
      date: '2024-05-28',
      author: 'AGMK',
      link: 'https://agmk.uz/ru/news/okmkga-yana-2-dona-avtogigant-olib-kelindi'
    },
    {
      id: 4,
      title: t.blog.posts[4].title,
      excerpt: t.blog.posts[4].excerpt,
      image: 'https://storage.kun.uz/source/10/3R4Aqu-Op0JTgyB_EUUhA_-maxH4yBUi.jpg',
      date: '2024-02-13',
      author: 'Kun',
      link: 'https://kun.uz/en/news/2024/02/13/minsk-tractor-works-to-start-assembling-tractors-in-uzbekistan'
    },
    {
      id: 3,
      title: t.blog.posts[3].title,
      excerpt: t.blog.posts[3].excerpt,
      image: 'https://storage.kun.uz/source/9/cgLbGkvOhvDMBmDUvQ4EO3Gqe9uuwjE-.jpg',
      date: '2023-02-25',
      author: 'Kun',
      link: 'https://kun.uz/news/2023/02/25/krantas-group-jahon-bozorida-yengil-bronlangan-avtoni-taqdim-etdi'
    },
    {
      id: 2,
      title: t.blog.posts[2].title,
      excerpt: t.blog.posts[2].excerpt,
      image: 'https://www.gazeta.uz/media/img/2021/01/f11B6V16104622858626_l.jpg',
      date: '2021-01-12',
      author: 'Gazeta',
      link: 'https://www.gazeta.uz/ru/2021/01/12/equipment/'
    },
    {
      id: 1,
      title: t.blog.posts[1].title,
      excerpt: t.blog.posts[1].excerpt,
      image: 'https://www.gazeta.uz/media/img/2017/04/oBWirl14920003414464_b.jpg?r=1498751454',
      date: '2017-06-29',
      author: 'Gazeta',
      link: 'https://www.gazeta.uz/ru/2017/06/29/krantas/'
    }
  ];

  const selectedPost = blogPosts.find(p => p.id === selectedPostId) || blogPosts[0];

  return (
    <div className="bg-white w-full flex-1 flex flex-col">
      <Hero title={t.blog.title} description={t.blog.heroIntro} />

      <div className="relative z-10 bg-white -mt-12 lg:-mt-16 w-full flex-1 flex flex-col">


        <div className="bg-white relative z-10">


          {/* Magazine Layout */}
          <section className="pt-12 lg:pt-16 pb-10 lg:pb-14">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              {/* MOBILE VIEW: Accordion Style */}
              <div className="lg:hidden space-y-4">
                <div className="flex flex-col border-t border-gray-100">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="border-b border-gray-100">
                      <button
                        onClick={() => setSelectedPostId(selectedPostId === post.id ? 0 : post.id)}
                        className={`w-full text-left py-6 flex items-center justify-between transition-all duration-300 ${selectedPostId === post.id ? 'text-[#244d85]' : 'text-[#0B0C0E]'}`}
                      >
                        <h4 className="font-display text-lg font-medium leading-tight pr-4">
                          {post.title}
                        </h4>
                        <div className={`transition-transform duration-300 flex-shrink-0 ${selectedPostId === post.id ? 'rotate-90 text-[#244d85]' : 'text-gray-300'}`}>
                          <ChevronRight size={20} />
                        </div>
                      </button>

                      {selectedPostId === post.id && (
                        <div className="pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="aspect-video w-full overflow-hidden mb-6">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(post.date).toLocaleDateString(language || 'en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <User size={12} />
                              {post.author}
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
                  <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-6">{t.blog.latest}</h3>
                  <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                    {blogPosts.map((post) => (
                      <button
                        key={post.id}
                        onClick={() => setSelectedPostId(post.id)}
                        className={`w-full text-left p-4 transition-all ${selectedPostId === post.id
                          ? 'bg-[#244d85]/5'
                          : ''
                          }`}
                      >
                        <div className="flex items-center gap-3 mb-2 text-base text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.date).toLocaleDateString(language || 'en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {post.author}
                          </span>
                        </div>
                        <h4 className={`font-medium text-base ${selectedPostId === post.id ? 'text-[#244d85]' : 'text-[#0B0C0E]'}`}>
                          {post.title}
                        </h4>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right - Featured Article (Fixed) */}
                <div className="lg:w-2/3 lg:sticky lg:top-24 lg:self-start">
                  <div className="bg-white overflow-hidden">
                    <div className="h-72 lg:h-80 overflow-hidden">
                      <img
                        src={selectedPost.image}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4 text-base text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(selectedPost.date).toLocaleDateString(language || 'en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {selectedPost.author}
                        </span>
                      </div>
                      <h2 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-4">
                        {selectedPost.title}
                      </h2>
                      <p className="text-base text-gray-600 leading-relaxed mb-6">
                        {selectedPost.excerpt}
                      </p>
                      {selectedPost.link && (
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
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
