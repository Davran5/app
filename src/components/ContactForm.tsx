import { useState, useRef, useEffect } from 'react';
import { Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

import { pseudonymizeData } from '../utils/privacy';
import { securityAgent } from '../utils/securityAgent';

export default function ContactForm({ dark = false }: { dark?: boolean }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const subjectOptions = [
        { value: 'lifting', label: t.contacts.subjectOptions?.lifting },
        { value: 'dump', label: t.contacts.subjectOptions?.dump },
        { value: 'special', label: t.contacts.subjectOptions?.special },
        { value: 'metal', label: t.contacts.subjectOptions?.metal },
        { value: 'agricultural', label: t.contacts.subjectOptions?.agricultural },
        { value: 'tanks', label: t.contacts.subjectOptions?.tanks },
        { value: 'mining', label: t.contacts.subjectOptions?.mining },
        { value: 'cranes', label: t.contacts.subjectOptions?.cranes },
        { value: 'custom', label: t.contacts.subjectOptions?.custom },
        { value: 'service', label: t.contacts.subjectOptions?.service },
        { value: 'careers', label: t.contacts.subjectOptions?.careers },
        { value: 'other', label: t.contacts.subjectOptions?.other },
    ];

    const selectedSubjectLabel = subjectOptions.find(opt => opt.value === formData.subject)?.label;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!securityAgent.checkActivity('form_submission')) {
            toast.error('Security Alert: Suspicious activity detected. Action blocked.');
            return;
        }

        const secureData = await pseudonymizeData(formData);
        console.log('Secure Contact Submission:', secureData);

        toast.success(t.contacts.successMessage || 'Message sent! We will contact you within 1-2 business days.');
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    };

    const inputClasses = dark
        ? "w-full bg-white/5 border border-white/10 px-5 py-4 text-base text-white focus:outline-none focus:border-[#244d85] transition-all placeholder:text-gray-600"
        : "w-full bg-white border border-gray-200 px-5 py-4 text-base text-[#0B0C0E] focus:outline-none focus:border-[#244d85] transition-all placeholder:text-gray-400";

    const labelClasses = dark
        ? "text-sm font-medium text-gray-400 block mb-2 uppercase tracking-wide"
        : "text-sm font-medium text-gray-900 block mb-2 uppercase tracking-wide";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 text-left">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>{t.contacts.name} *</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={inputClasses}
                            placeholder={t.contacts.name}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>{t.contacts.emailLabel} *</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputClasses}
                            placeholder={t.contacts.emailPlaceholder || "your@email.com"}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>{t.contacts.phoneLabel || t.contacts.phone}</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputClasses}
                            placeholder="+998 XX XXX XX XX"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>{t.contacts.companyLabel || 'Company'}</label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className={inputClasses}
                            placeholder={t.contacts.organizationPlaceholder || 'Your organization'}
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>{t.contacts.areaOfInterestLabel || 'Area of Interest'}</label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`${inputClasses} flex items-center justify-between text-left h-[58px] ${!formData.subject ? (dark ? 'text-gray-600' : 'text-gray-400') : ''}`}
                            >
                                <span className="truncate">
                                    {selectedSubjectLabel || t.contacts.selectAreaPlaceholder || 'Select an area'}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform duration-300 flex-shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''} ${dark ? 'text-gray-600' : 'text-gray-400'}`}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className={`absolute z-50 w-full mt-2 py-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 border ${dark
                                        ? 'bg-[#0B0C0E] border-white/10'
                                        : 'bg-white border-gray-100'
                                    }`}>
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {subjectOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setFormData({ ...formData, subject: option.value });
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-3 text-sm transition-colors ${formData.subject === option.value
                                                        ? (dark ? 'bg-[#244d85]/20 text-white' : 'bg-[#244d85]/5 text-[#244d85]')
                                                        : (dark ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-[#244d85]')
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <label className={labelClasses}>{t.contacts.messageLabel} *</label>
                <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClasses} resize-none`}
                    placeholder={t.contacts.messageLabel}
                />
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
                <button
                    type="submit"
                    className="bg-[#244d85] text-white px-10 py-5 font-medium
                   transition-all duration-200 hover:bg-[#1E4ECC]
                   flex items-center justify-center gap-3 shadow-lg shadow-[#244d85]/20 uppercase tracking-widest text-sm"
                >
                    <Send size={18} />
                    {t.contacts.send}
                </button>
            </div>
        </form>
    );
}
