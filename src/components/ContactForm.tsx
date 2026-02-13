import { useState } from 'react';
import { Send } from 'lucide-react';
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
                        <div className="relative">
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className={`${inputClasses} appearance-none`}
                            >
                                <option value="" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>
                                    {t.contacts.selectAreaPlaceholder || 'Select an area'}
                                </option>
                                <option value="lifting" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.lifting}</option>
                                <option value="dump" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.dump}</option>
                                <option value="special" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.special}</option>
                                <option value="metal" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.metal}</option>
                                <option value="agricultural" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.agricultural}</option>
                                <option value="tanks" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.tanks}</option>
                                <option value="mining" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.mining}</option>
                                <option value="cranes" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.cranes}</option>
                                <option value="custom" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.custom}</option>
                                <option value="service" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.service}</option>
                                <option value="careers" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.careers}</option>
                                <option value="other" className={dark ? "bg-[#0B0C0E]" : "bg-white"}>{t.contacts.subjectOptions?.other}</option>
                            </select>
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
