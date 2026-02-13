import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import Hero from '../components/Hero';
import { historyEvents, teamMembers } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/ContactForm';

// Draggable certificates component
function CertificatesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 1. Array must be inside the function
  const certificates = [
    { name: 'Certificate', desc: 'OOO "KRANTAS"', org: 'Directorate of the International Industrial Fair and Cooperation Exchange', image: '/KRANTAS.jpg' },
    { name: 'Certificate', desc: 'OOO "Crane and Special Trucks"', org: 'Directorate of the International Industrial Fair and Cooperation Exchange', image: '/crane_special.jpg' },
    { name: 'Certificate', desc: 'OOO "TTEMZ"', org: 'Directorate of the International Industrial Fair and Cooperation Exchange', image: '/ttemz.jpg' },
    { name: 'Performance Award', desc: 'Global Specific Performance Award 2022', org: 'FOTON', image: '/foton.jpg' },
    { name: 'Diplom', desc: 'Turkmen Construction 2015', org: 'Chamber of Commerce and Industry', image: '/diplom.jpg' },
    { name: 'Certificate', desc: '17th Kazakhstan International Building Exhibition', org: 'Astana Build', image: '/astana_build.jpg' },
    // Add your other certs here...
  ];

  // 2. These functions MUST be defined before the "return" statement
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // 3. The JSX "return" comes LAST
  return (
    <div
      ref={containerRef}
      className={`flex gap-8 overflow-x-auto scrollbar-hide py-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {certificates.map((cert, index) => (
        <div key={index} className="flex-shrink-0 w-[310px] bg-white p-4 transition-all select-none shadow-sm hover:shadow-xl">
          <div className="w-full aspect-[1/1.41] bg-gray-50 flex items-center justify-center mb-4 overflow-hidden">
            <img
              src={cert.image}
              alt={cert.name}
              draggable="false"
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 pointer-events-none"
            />
          </div>
          <h4 className="font-display text-lg font-medium text-[#0B0C0E] mb-1">{cert.name}</h4>
          <p className="text-sm text-gray-600 mb-2">{cert.desc}</p>
          <span className="text-xs text-gray-400">{cert.org}</span>
        </div>
      ))}
    </div>
  );
}



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
  // History Initialization
  useEffect(() => {
    if (historyEvents.length > 0) {
      setActiveYear(historyEvents[0].year);
    }
  }, []);





  return (
    <div className="bg-white min-h-screen">
      <Hero title={t.about.heroTitle} description={t.about.heroIntro} />

      <div className="bg-white relative z-10 -mt-12 lg:-mt-16">
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
                <h2 className="font-display text-4xl lg:text-6xl font-medium text-[#0B0C0E] mb-8">
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
        <section className="pt-10 lg:pt-14 pb-20 lg:pb-28 bg-white overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-4">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
                Growth & Progress
              </h2>
            </div>

            <div className="max-w-[1440px] mx-auto">
              <div className="grid lg:grid-cols-12 gap-12 items-center">

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
                        transform: `translateY(calc(-${historyEvents.findIndex(e => e.year === activeYear) * 80}px - 40px))`
                      }}
                    >
                      {historyEvents.map((event) => {
                        const isActive = event.year === activeYear;
                        return (
                          <button
                            key={event.year}
                            onClick={() => setActiveYear(event.year)}
                            className={`w-full h-[80px] flex items-center justify-center transition-all duration-500 group relative select-none ${isActive ? 'scale-150 opacity-100 z-20' : 'scale-75 opacity-30 hover:opacity-60 z-10'
                              }`}
                          >
                            <span
                              className={`font-display font-bold transition-all duration-500 ${isActive ? 'text-5xl lg:text-7xl text-[#244d85]' : 'text-4xl text-gray-400'
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
                      transform: `translateY(calc(-${historyEvents.findIndex(e => e.year === activeYear) * 420}px))`
                    }}
                  >
                    {historyEvents.map((event) => {
                      const isActive = event.year === activeYear;
                      return (
                        <div
                          key={event.year}
                          className={`w-full h-[420px] flex items-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-20 blur-[2px]'}`}
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
                              <h3 className="font-display text-2xl lg:text-3xl font-medium text-[#0B0C0E] mb-4 flex items-center gap-4">
                                <span className="text-[#244d85] text-lg font-mono opacity-60">
                                  {String(historyEvents.findIndex(e => e.year === event.year) + 1).padStart(2, '0')}
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
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-3">
                Family of KRANTAS
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Generations of dedication. Decades of expertise. The people who make KRANTAS more than a company.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Sergey */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src="/Konstantinovich.jpeg"
                    alt="Petrov Sergey Konstantinovich"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                      Petrov Sergey Konstantinovich
                    </h3>
                    <p className="text-[#244d85] font-medium text-sm">Deputy Director</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">50+ years with KRANTAS</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    From a young specialist in 1972 to leading operations as Deputy Director today. Witnessed KRANTAS transform from experimental plant to modern manufacturer while preserving core values.
                  </p>
                </div>
              </div>

              {/* Komil */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src="/komil.png"
                    alt="Komil Khaitmatov"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                      Komil Khaitmatov
                    </h3>
                    <p className="text-[#244d85] font-medium text-sm">Assembly Technician</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">45 years with KRANTAS</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    Started as a driver in 1980, grew to master crane assembly. From KamAZ trucks to 60-ton cranes — he's been part of every transformation.
                  </p>
                </div>
              </div>

              {/* Elvira */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img
                    src="/elvira.png"
                    alt="Elvira"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">
                      Elvira
                    </h3>
                    <p className="text-[#244d85] font-medium text-sm">Overhead Crane Operator</p>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">Third-generation · 10+ years</p>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    Parents, grandparents, and brothers all worked at KRANTAS. Father: 40 years as painter. Mother: 37 years as crane operator. A legacy of dedication.
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
                Join Our Family
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
                <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-8 leading-tight">
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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#244d85]/20" />
                <img
                  src="/chairman_portrait.jpeg"
                  alt="Chairman"
                  className="w-full aspect-[16/9] lg:aspect-[16/9] object-cover transition-all duration-700 shadow-2xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#244d85]/5 -z-0" />
              </div>
              <div>
                <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-12">
                  {t.about.chairman}
                </h2>
                <div className="relative mb-12">
                  <span className="absolute -top-10 -left-6 text-[8rem] font-serif text-[#244d85]/5 leading-none select-none">"</span>
                  <blockquote className="text-xl lg:text-2xl font-display text-[#0B0C0E] leading-relaxed relative z-10 italic">
                    {t.about.chairmanQuote}
                  </blockquote>
                </div>
                <div className="flex items-center gap-6">
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
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-10 lg:py-14">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
                {t.about.teamSubtitle}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white border border-gray-200 overflow-hidden hover:border-[#244d85] transition-all">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-display text-xl font-medium text-[#0B0C0E]">{member.name}</h4>
                    <p className="text-base text-gray-500">
                      {(t.about.teamRoles as any)[member.role] || member.role}
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-[2px]">
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
        <section className="py-10 lg:py-14 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-6">
                {t.about.distributors.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {t.about.distributors.description}
              </p>
            </div>

            <div className="bg-white shadow-xl rounded-sm overflow-hidden">
              <div className="grid lg:grid-cols-12">
                {/* Visual Map Side */}
                <div className="lg:col-span-7 bg-gray-100 relative min-h-[400px] lg:min-h-[600px]">
                  <div
                    className="absolute inset-0 bg-center bg-contain bg-no-repeat m-8"
                    style={{ backgroundImage: 'url(/dismap.jpg)' }}
                  />
                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-gray-500 text-sm font-medium bg-white/80 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                      {t.about.distributors.mapLegend}
                    </p>
                  </div>
                </div>

                {/* Distributors List Side */}
                <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-center bg-white">
                  <h3 className="font-display text-2xl font-medium text-[#0B0C0E] mb-6">
                    {t.about.distributors.centersTitle}
                  </h3>

                  <div className="space-y-6">
                    {/* Item 1 */}
                    <div className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0 group hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg">
                      <div className="w-10 h-10 bg-[#244d85]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#244d85] rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-display text-lg font-medium text-[#0B0C0E]">{t.about.distributors.countries.azerbaijan}</h4>
                        <p className="text-xs text-[#244d85] font-medium uppercase tracking-wider mb-1">{t.about.distributors.regionalBranch}</p>
                        <p className="text-sm text-gray-600">Baku</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0 group hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg">
                      <div className="w-10 h-10 bg-[#fdc15e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#fdc15e] rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-display text-lg font-medium text-[#0B0C0E]">{t.about.distributors.countries.kazakhstan}</h4>
                        <p className="text-xs text-[#fdc15e] font-medium uppercase tracking-wider mb-1">{t.about.distributors.regionalCenter}</p>
                        <p className="text-sm text-gray-600">Almaty, Nur-Sultan, Shymkent</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0 group hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg">
                      <div className="w-10 h-10 bg-[#244d85]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#244d85] rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-display text-lg font-medium text-[#0B0C0E]">{t.about.distributors.countries.kyrgyzstan}</h4>
                        <p className="text-xs text-[#244d85] font-medium uppercase tracking-wider mb-1">{t.about.distributors.mountainSpecialist}</p>
                        <p className="text-sm text-gray-600">Bishkek, Osh</p>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="flex border-b border-gray-100 pb-4 last:border-0 last:pb-0 group hover:bg-gray-50 transition-colors -mx-4 px-4 py-2 rounded-lg">
                      <div className="w-10 h-10 bg-[#fdc15e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-[#fdc15e] rounded-full"></div>
                      </div>
                      <div className="ml-4">
                        <h4 className="font-display text-lg font-medium text-[#0B0C0E]">{t.about.distributors.countries.tajikTurkmen}</h4>
                        <p className="text-xs text-[#fdc15e] font-medium uppercase tracking-wider mb-1">{t.about.distributors.emergingMarkets}</p>
                        <p className="text-sm text-gray-600">Dushanbe, Ashgabat</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates - Draggable scroll */}
        <section className="py-10 lg:py-14 bg-gray-50 overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
                {t.about.certificates}
              </h2>
            </div>

            {/* Draggable certificates container */}
            <CertificatesScroll />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 lg:py-14 bg-[#0B0C0E]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-white mb-6">
                {t.cta.title}
              </h2>
              <p className="text-gray-400 mb-8">
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
      </div>
    </div>
  );
}
