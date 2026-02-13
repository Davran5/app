import { useState } from 'react';
import { ChevronRight, MapPin, Briefcase, Clock, X, Send } from 'lucide-react';
import Hero from '../components/Hero';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

export default function Careers() {
  const { t } = useLanguage();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null); // Type 'any' for simplicity with dynamic data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    experience: '',
    message: '',
  });

  const openPositions = [
    {
      id: 1,
      title: t.careers.positions[1].title,
      department: t.careers.positions[1].department,
      location: t.careers.positions[1].location,
      type: t.careers.fullTime,
      experience: t.careers.positions[1].experience,
      age: t.careers.positions[1].age,
      description: t.careers.positions[1].description,
      requirements: t.careers.positions[1].requirements,
    },
    {
      id: 2,
      title: t.careers.positions[2].title,
      department: t.careers.positions[2].department,
      location: t.careers.positions[2].location,
      type: t.careers.fullTime,
      experience: t.careers.positions[2].experience,
      age: t.careers.positions[2].age,
      description: t.careers.positions[2].description,
      requirements: t.careers.positions[2].requirements,
    },
    {
      id: 3,
      title: t.careers.positions[3].title,
      department: t.careers.positions[3].department,
      location: t.careers.positions[3].location,
      type: t.careers.fullTime,
      experience: t.careers.positions[3].experience,
      age: t.careers.positions[3].age,
      description: t.careers.positions[3].description,
      requirements: t.careers.positions[3].requirements,
    },
    {
      id: 4,
      title: t.careers.positions[4].title,
      department: t.careers.positions[4].department,
      location: t.careers.positions[4].location,
      type: t.careers.fullTime,
      experience: t.careers.positions[4].experience,
      age: t.careers.positions[4].age,
      description: t.careers.positions[4].description,
      requirements: t.careers.positions[4].requirements,
    },
  ];

  const teamMembers = [
    {
      name: t.careers.teamMembers.sergey.name,
      role: t.careers.teamMembers.sergey.role,
      story: t.careers.teamMembers.sergey.story,
      image: '/Konstantinovich.jpeg',
    },
    {
      name: t.careers.teamMembers.komil.name,
      role: t.careers.teamMembers.komil.role,
      story: t.careers.teamMembers.komil.story,
      image: '/komil.png',
    },
    {
      name: t.careers.teamMembers.elvira.name,
      role: t.careers.teamMembers.elvira.role,
      story: t.careers.teamMembers.elvira.story,
      image: '/elvira.png',
    },
  ];

  const handleApply = (job: any) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Application submitted for ${selectedJob?.title}! We will contact you soon.`);
    setShowApplication(false);
    setFormData({ name: '', email: '', phone: '', age: '', experience: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <Hero title={t.careers.title} description={t.careers.heroIntro} />

      <div className="relative z-10 bg-white -mt-12 lg:-mt-16">


        <div className="bg-white relative z-10">
          {/* Why Work With Us */}
          <section className="pt-12 lg:pt-16 pb-10 lg:pb-14">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  <img
                    src="/about_factory.jpg"
                    alt="Krantas Workplace"
                    className="w-full h-[240px] lg:h-[300px] object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-6">
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
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E]">
                  {t.careers.team}
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-display text-xl lg:text-2xl font-medium text-[#0B0C0E] mb-1">{member.name}</h4>
                      <p className="text-base text-[#244d85] mb-3">{member.role}</p>
                      <p className="text-base text-gray-500">{member.story}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className="py-10 lg:py-14">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
              <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#0B0C0E] mb-10">
                {t.careers.openPositions}
              </h2>

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
