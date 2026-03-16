import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, MapPin, Briefcase, Clock, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useCms } from '../contexts/CmsContext';
import TeamMemberStoryCards from '../components/TeamMemberStoryCards';
import { getVacancyLocalization } from '../lib/cms';

interface OpenPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  age: string;
  description: string;
  requirements: string[];
}

export default function Careers() {
  const { t, language } = useLanguage();
  const { trackEvent } = useAnalytics();
  const { vacancies, createLead } = useCms();
  const location = useLocation();
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState<OpenPosition | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    message: '',
  });

  const openPositions = useMemo<OpenPosition[]>(
    () =>
      vacancies
        .filter((vacancy) => vacancy.isActive)
        .map((vacancy) => {
          const localized = getVacancyLocalization(vacancy, language);

          return {
            id: vacancy.id,
            title: localized.title,
            department: localized.department,
            location: localized.location,
            type: localized.type || t.careers.fullTime,
            experience: localized.experience,
            age: localized.age,
            description: localized.description,
            requirements: localized.requirements,
          };
        })
        .filter((vacancy) => vacancy.title.trim()),
    [language, t.careers.fullTime, vacancies],
  );

  const handleApply = (job: OpenPosition) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedJob) {
      return;
    }

    createLead({
      source: 'careers',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `Application: ${selectedJob.title}`,
      message: formData.message,
      language,
      originPage: location.pathname,
      metadata: {
        vacancyId: selectedJob.id,
        vacancyTitle: selectedJob.title,
        department: selectedJob.department,
        location: selectedJob.location,
        employmentType: selectedJob.type,
        experienceRequired: selectedJob.experience,
        ageRequirement: selectedJob.age,
        candidateAge: formData.age,
        candidateExperience: formData.experience,
      },
    });

    trackEvent('generate_lead', {
      form_type: 'vacancy_application',
      lead_source: 'careers',
      page_path: location.pathname,
      language,
      vacancy_id: selectedJob.id,
      vacancy_title: selectedJob.title,
      department: selectedJob.department,
      location: selectedJob.location,
    });

    toast.success(`Application submitted for ${selectedJob?.title}! We will contact you soon.`);
    setShowApplication(false);
    setFormData({ name: '', email: '', phone: '', age: '', experience: '', message: '' });
  };

  return (
    <div className="bg-white w-full flex-1 flex flex-col">
      <div className="relative z-10 bg-white w-full flex-1 flex flex-col">


        <div className="bg-white relative z-10">
          {/* Why Work With Us */}
          <section className="pt-12 lg:pt-16 pb-10 lg:pb-14">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <img
                    src="/work.jpeg"
                    alt="Krantas Workplace"
                    className="w-full h-[240px] lg:h-[300px] object-cover"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E] mb-6">
                    {t.careers.whyWork}
                  </h2>
                  <p className="text-base text-gray-600 leading-relaxed mb-8">
                    {t.careers.subtitle}
                  </p>

                </div>
              </div>
            </div>
          </section>

          {/* Honorable Team Members */}
          <section className="py-10 lg:py-14 bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="text-left md:text-center mb-10 md:mb-16">
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E]">
                  {t.careers.team}
                </h2>
              </div>

              <TeamMemberStoryCards />
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-10 lg:py-14">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-[#0B0C0E] mb-10">
                {t.careers.openPositions}
              </h2>

              {openPositions.length > 0 ? (
                <div className="space-y-4">
                  {openPositions.map((position) => (
                    <div
                      key={position.id}
                      className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-all rounded-sm"
                    >
                      <button
                        onClick={() => setExpandedJob(expandedJob === position.id ? null : position.id)}
                        className="w-full p-6 text-left"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div>
                            <h3 className="font-display text-lg font-medium text-[#0B0C0E] mb-2">
                              {position.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-4 text-base text-gray-500">
                              <span className="flex items-center gap-1">
                                <Briefcase size={14} />
                                {position.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {position.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {position.type}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            size={20}
                            className={`text-gray-400 transition-transform ${expandedJob === position.id ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </button>

                      {expandedJob === position.id && (
                        <div className="px-6 pb-6 pt-4 bg-gray-50/50">
                          <p className="text-base text-gray-600 mb-4">{position.description}</p>
                          <div className="mb-4">
                            <span className="text-base text-gray-500">{t.careers.experienceLabel} </span>
                            <span className="text-base text-[#0B0C0E] font-medium">{position.experience}</span>
                            <span className="text-base text-gray-500 ml-4">{t.careers.ageLabel} </span>
                            <span className="text-base text-[#0B0C0E] font-medium">{position.age}</span>
                          </div>
                          <div className="mb-6">
                            <h4 className="font-medium text-[#0B0C0E] mb-2">{t.careers.requirementsLabel}</h4>
                            <ul className="space-y-1">
                              {position.requirements.map((req: string, i: number) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-[#244d85]">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={() => handleApply(position)}
                            className="inline-flex items-center gap-2 bg-[#244d85] text-white px-6 py-3 font-medium
                               transition-all duration-200 hover:bg-[#1E4ECC]"
                          >
                            {t.careers.apply}
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-sm border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-base text-gray-500">
                  No open vacancies available right now.
                </div>
              )}
            </div>
          </section>

          {/* Application Modal */}
          {showApplication && selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-medium text-[#0B0C0E]">{t.careers.applyPopupTitle}</h3>
                    <p className="text-sm text-gray-500">{selectedJob.title}</p>
                  </div>
                  <button
                    onClick={() => setShowApplication(false)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">{t.careers.fullName} *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#244d85]"
                      placeholder={t.careers.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">{t.careers.email} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#244d85]"
                      placeholder={t.careers.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">{t.careers.phone} *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#244d85]"
                      placeholder={t.careers.phonePlaceholder}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-2">{t.careers.ageLabel}</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#244d85]"
                        placeholder={t.careers.agePlaceholder}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-2">{t.careers.experienceLabel}</label>
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-[#244d85]"
                        placeholder={t.careers.experiencePlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2">{t.careers.message}</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#244d85]"
                      placeholder={t.careers.messagePlaceholder}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#244d85] text-white px-6 py-3 font-medium
                         transition-all duration-200 hover:bg-[#1E4ECC]
                         flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {t.careers.submit}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
