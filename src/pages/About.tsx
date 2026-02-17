import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import Hero from '../components/Hero';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';
import { teamMembers } from '../data/products';
import Distributors from '../components/Distributors';




const partners = [
  { name: 'Sampo', logo: '/sampo.png' },
  { name: 'SSAB', logo: '/ssab.png' },
  { name: 'Kia', logo: '/kia.png' },
  { name: 'Hyundai', logo: '/hyundai.png' },
  { name: 'Allison', logo: '/allison.png' },
  { name: 'Aselan', logo: '/aselan.png' },
  { name: 'Bosch', logo: '/bosch.png' },
  { name: 'Comet', logo: '/comet.png' },
  { name: 'Cukurova', logo: '/cukurova.png' },
  { name: 'Hydro', logo: '/hydro.png' },
  { name: 'Kozmaksan', logo: '/kozmaksan.png' },
  { name: 'Weichai', logo: '/weichai.png' },
];



export default function About() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [activeYear, setActiveYear] = useState(1945);
  const mobileYearScrollRef = useRef<HTMLDivElement>(null);
  // History Initialization
  const historyEventsList = Object.values(t.about.historyEvents || {}).map((event: any, index) => ({
    year: parseInt(Object.keys(t.about.historyEvents)[index]),
    ...event
  }));

  useEffect(() => {
    if (historyEventsList.length > 0) {
      setActiveYear(historyEventsList[0].year);
    }
  }, [t.about.historyEvents]);

  // Auto-scroll mobile year selector to center active year
  useEffect(() => {
    if (mobileYearScrollRef.current) {
      const activeBtn = document.getElementById(`year-btn-${activeYear}`);
      if (activeBtn) {
        const container = mobileYearScrollRef.current;
        const scrollLeft = activeBtn.offsetLeft - (container.clientWidth / 2) + (activeBtn.clientWidth / 2);

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeYear]);





  return (
    <div className="bg-white w-full flex-1 flex flex-col">
      <Hero title={t.about.heroTitle} description={t.about.heroIntro} />

      <div className="bg-white relative z-10 -mt-12 lg:-mt-16 w-full flex-1 flex flex-col">
        {/* Story Section */}
        <section className="pt-12 lg:pt-16 pb-10 lg:pb-14 bg-white relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img
                  src="/hq.jpeg"
                  alt="Krantas Factory History"
                  className="w-full h-[320px] lg:h-[380px] object-cover shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#244d85] opacity-20" />
              </div>
              <div>
                <h2 className="font-display text-2xl lg:text-6xl font-medium text-[#0B0C0E] mb-8">
                  {t.about.story}
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>{t.about.storyP1}</p>
                  <p>{t.about.storyP2}</p>
                  <p>{t.about.storyP3}</p>
                  <p>{t.about.storyP4}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth & Progress (Formerly History) */}
        <section className="pt-4 lg:pt-14 pb-20 lg:pb-28 bg-white overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-4">
              <h2 className="font-display text-2xl lg:text-5xl font-medium text-[#0B0C0E]">
                {t.about.history}
              </h2>
            </div>

            <div className="max-w-[1440px] mx-auto">

              {/* === Mobile Layout (Horizontal Scroll) === */}
              <div className="lg:hidden flex flex-col gap-8">
                {/* Mobile Content Display */}
                <div className="min-h-[280px]">
                  {historyEventsList.map((event) => {
                    if (event.year !== activeYear) return null;
                    return (
                      <div key={event.year} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-6">
                          <img
                            src={event.image || "/about_factory.jpg"}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-medium text-[#0B0C0E] mb-3 flex items-center gap-3">
                            <span className="text-[#244d85] text-lg font-mono opacity-60">
                              {String(historyEventsList.findIndex(e => e.year === event.year) + 1).padStart(2, '0')}
                            </span>
                            {event.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-sm italic border-l-4 border-[#244d85] pl-4">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Horizontal Year Selector */}
                <div
                  ref={mobileYearScrollRef}
                  className="overflow-x-auto scrollbar-hide pb-2 -mx-6 px-[calc(50%-2rem)] snap-x snap-mandatory"
                >
                  <div className="flex items-center gap-8 w-max mx-auto md:mx-0">
                    {historyEventsList.map((event) => (
                      <button
                        key={event.year}
                        id={`year-btn-${event.year}`}
                        onClick={() => setActiveYear(event.year)}
                        className={`font-display font-bold text-4xl transition-all duration-300 snap-center flex-shrink-0 ${event.year === activeYear
                          ? 'text-[#244d85] scale-110 opacity-100'
                          : 'text-gray-300 hover:text-gray-400 opacity-50 scale-90'
                          }`}
                      >
                        {event.year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* === Desktop Layout (Vertical Wheel) === */}
              <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-center">
                {/* Left: Year Selector (3 units) */}
                <div className="lg:col-span-3 h-[240px] relative flex flex-col items-center justify-center overflow-hidden">
                  {/* Gradient overlays for fade effect */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

                  {/* The Scrolling Wheel */}
                  <div className="relative w-full h-full">
                    <div
                      className="absolute left-0 right-0 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={{
                        top: '50%',
                        transform: `translateY(calc(-${historyEventsList.findIndex(e => e.year === activeYear) * 80}px - 40px))`
                      }}
                    >
                      {historyEventsList.map((event) => {
                        const isActive = event.year === activeYear;
                        return (
                          <button
                            key={event.year}
                            onClick={() => setActiveYear(event.year)}
                            className={`w-full h-[80px] flex items-center justify-center transition-all duration-500 group relative select-none ${isActive ? 'scale-150 opacity-100 z-20' : 'scale-75 opacity-30 hover:opacity-60 z-10'
                              }`}
                          >
                            <span
                              className={`font-display font-bold transition-all duration-500 ${isActive ? 'text-7xl text-[#244d85]' : 'text-4xl text-gray-400'
                                }`}
                            >
                              {event.year}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Middle & Right: Content Carousel (9 units) */}
                <div className="lg:col-span-9 relative h-[420px] overflow-hidden">
                  <div
                    className="absolute w-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      transform: `translateY(calc(-${historyEventsList.findIndex(e => e.year === activeYear) * 420}px))`
                    }}
                  >
                    {historyEventsList.map((event) => {
                      const isActive = event.year === activeYear;
                      return (
                        <div
                          key={event.year}
                          className={`w-full h-[420px] flex items-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20 blur-[2px]'
                            }`}
                        >
                          <div className="grid lg:grid-cols-10 gap-12 items-center w-full px-4">
                            {/* Middle: Image (6 units) */}
                            <div className="lg:col-span-6">
                              <div className="w-[90%] mx-auto aspect-video overflow-hidden shadow-2xl">
                                <img
                                  src={event.image || "/about_factory.jpg"}
                                  alt={`${event.year} - ${event.title}`}
                                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                              </div>
                            </div>

                            {/* Right: Text Content (4 units) */}
                            <div className="lg:col-span-4 text-left">
                              <h3 className="font-display text-3xl font-medium text-[#0B0C0E] mb-4 flex items-center gap-4">
                                <span className="text-[#244d85] text-lg font-mono opacity-60">
                                  {String(historyEventsList.findIndex(e => e.year === event.year) + 1).padStart(2, '0')}
                                </span>
                                {event.title}
                              </h3>
                              <p className="text-gray-600 leading-relaxed text-base italic border-l-4 border-[#244d85] pl-6">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family of Krantas - Featured Stories */}
        <section className="py-10 lg:py-12 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-7">
              <h2 className="font-display text-2xl lg:text-5xl font-medium text-[#0B0C0E] mb-3">
                {t.about.family}
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                {t.about.familyDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Sergey */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="h-[205px] lg:h-64 overflow-hidden">
                  <img
                    src="/Konstantinovich.jpeg"
                    alt="Petrov Sergey Konstantinovich"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                      {t.about.teamMemberStories.sergey.name}
                    </h3>
                    <p className="text-[#244d85] font-medium text-sm">{t.about.teamMemberStories.sergey.role}</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{t.about.teamMemberStories.sergey.years}</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {t.about.teamMemberStories.sergey.text}
                  </p>
                </div>
              </div>

              {/* Komil */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="h-[205px] lg:h-64 overflow-hidden">
                  <img
                    src="/komil.png"
                    alt="Komil Khaitmatov"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                      {t.about.teamMemberStories.komil.name}
                    </h3>
                    <p className="text-[#244d85] font-medium text-sm">{t.about.teamMemberStories.komil.role}</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{t.about.teamMemberStories.komil.years}</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {t.about.teamMemberStories.komil.text}
                  </p>
                </div>
              </div>

              {/* Elvira */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="h-[205px] lg:h-64 overflow-hidden">
                  <img
                    src="/elvira.png"
                    alt="Elvira"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                      {t.about.teamMemberStories.elvira.name}
                    </h3>
                    <p className="text-[#244d85] font-medium text-sm">{t.about.teamMemberStories.elvira.role}</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{t.about.teamMemberStories.elvira.years}</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {t.about.teamMemberStories.elvira.text}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-7">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 bg-[#244d85] text-white px-6 py-3 font-semibold text-sm
                           transition-all duration-200 hover:bg-[#1E4ECC]"
              >
                {t.about.joinFamily}
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>


        {/* Our Mission Section - Redesigned */}
        <section className="py-10 lg:py-14 bg-gray-50 border-y border-gray-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Side: Mission Statement */}
              <div>
                <h2 className="font-display text-2xl lg:text-5xl font-medium text-[#0B0C0E] mb-8 leading-tight">
                  {t.mission.heading}
                </h2>
                <div className="h-1 w-20 bg-[#244d85] mb-8" />
                <p className="text-base text-gray-600 leading-relaxed">
                  {t.mission.description}
                </p>
              </div>

              {/* Right Side: Three Principles in Vertical Rows */}
              <div className="space-y-12">
                <div className="group">
                  <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-4 group-hover:text-[#244d85] transition-colors">
                    {t.mission.qualityFirst}
                  </h3>
                  <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-6 group-hover:border-[#244d85] transition-colors">
                    {t.mission.qualityFirstDesc}
                  </p>
                </div>

                <div className="group">
                  <h3 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-4 group-hover:text-[#244d85] transition-colors">
                    {t.mission.localProduction}
                  </h3>
                  <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-6 group-hover:border-[#244d85] transition-colors text-base">
                    {t.mission.localProductionDesc}
                  </p>
                </div>

                <div className="group">
                  <h3 className="font-display text-2xl font-medium text-[#0B0C0E] mb-4 group-hover:text-[#244d85] transition-colors">
                    {t.mission.globalStandards}
                  </h3>
                  <p className="text-gray-600 leading-relaxed border-l-2 border-gray-200 pl-6 group-hover:border-[#244d85] transition-colors">
                    {t.mission.globalStandardsDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>







        {/* Chairman's Message - Redesigned to Light */}
        <section className="py-10 lg:py-14 bg-gray-50 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              {/* Mobile-only Title & Quote */}
              <div className="lg:hidden order-1">
                <h2 className="font-display text-2xl font-medium text-[#0B0C0E] mb-6">
                  {t.about.chairman}
                </h2>
                <div className="relative mb-8">
                  <span className="absolute -top-10 -left-6 text-[8rem] font-serif text-[#244d85]/5 leading-none select-none">"</span>
                  <blockquote className="text-xl font-display text-[#0B0C0E] leading-relaxed relative z-10 italic">
                    {t.about.chairmanQuote}
                  </blockquote>
                </div>
              </div>

              {/* Image Section - Order 2 on mobile, 1 on desktop */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#244d85]/20" />
                <img
                  src="/chairman_portrait.jpeg"
                  alt="Chairman"
                  className="w-full aspect-[16/9] lg:aspect-[16/9] object-cover transition-all duration-700 shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#244d85]/5 -z-0" />

                {/* Name and Position - moved under image */}
                <div className="flex items-center gap-6 mt-12 relative z-10">
                  <div className="h-px w-12 bg-[#244d85]" />
                  <div>
                    <h4 className="font-display text-xl font-medium text-[#0B0C0E] mb-1">
                      {t.about.chairmanName}
                    </h4>
                    <p className="text-[#244d85] font-mono text-base uppercase tracking-widest">
                      {t.about.chairmanTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Text content - Order 3 on mobile, 2 on desktop */}
              <div className="order-3 lg:order-2">
                {/* Desktop-only Title & Quote */}
                <div className="hidden lg:block">
                  <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-12">
                    {t.about.chairman}
                  </h2>
                  <div className="relative mb-12">
                    <span className="absolute -top-10 -left-6 text-[8rem] font-serif text-[#244d85]/5 leading-none select-none">"</span>
                    <blockquote className="text-xl lg:text-2xl font-display text-[#0B0C0E] leading-relaxed relative z-10 italic">
                      {t.about.chairmanQuote}
                    </blockquote>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-8 lg:py-14 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
            <div className="text-center mb-8 lg:mb-10">
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#0B0C0E] mb-2 lg:mb-3">
                {t.about.team}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.about.teamSubtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="group bg-gray-50 pb-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative mb-3 overflow-hidden aspect-[16/9] lg:aspect-[3/2]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="px-3 lg:px-6">
                    <h3 className="font-display text-lg lg:text-xl font-medium text-[#0B0C0E] mb-1 whitespace-nowrap truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-[#244d85] font-medium uppercase tracking-wider truncate">
                      {t.about.teamRoles[member.role as keyof typeof t.about.teamRoles]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-10 lg:py-14 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#0B0C0E] mb-3">
                {t.about.partners}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.about.partnersDesc}
              </p>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-[2px]">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center justify-center aspect-square"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Global Distributors */}
        {/* Our Global Distributors */}
        <Distributors />


        {/* CTA Section */}
        <section className="py-4 lg:py-14 bg-[#0B0C0E] mt-auto mb-[-4px] relative z-20">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl lg:text-5xl font-medium text-white mb-2">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 mb-6">
                {t.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {!showForm ? (
                  <>
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center justify-center gap-2 bg-[#244d85] text-white px-8 py-4 font-medium transition-all duration-200 hover:bg-[#1E4ECC]"
                    >
                      {t.contacts.title}
                      <ChevronRight size={18} />
                    </button>
                    <Link
                      to="/catalog"
                      className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 font-medium transition-all duration-200 hover:bg-white/10"
                    >
                      {t.catalog.showAll}
                    </Link>
                  </>
                ) : (
                  <div className="w-full mt-12 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                      <h3 className="text-xl font-medium text-white uppercase tracking-wider">{t.services.inquiryForm || t.contacts.inquiryForm || 'Inquiry Form'}</h3>
                      <button
                        onClick={() => setShowForm(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                    <ContactForm dark />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div >
    </div >
  );
}
