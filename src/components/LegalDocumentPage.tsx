import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import type { Language } from '../data/translations';
import { COMPANY_LEGAL_CONTACT, type LegalDocumentContent } from '../lib/legalContent';

const LEGAL_UI = {
  en: {
    eyebrow: 'Legal',
    updatedLabel: 'Last reviewed',
    frameworkLabel: 'Uzbek legal framework',
    onThisPage: 'On this page',
    contactTitle: 'Contact',
    noteLabel: 'Operational note',
    backToContacts: 'Contact KRANTAS',
  },
  ru: {
    eyebrow: 'Правовая информация',
    updatedLabel: 'Дата последнего пересмотра',
    frameworkLabel: 'Правовая база Узбекистана',
    onThisPage: 'Разделы страницы',
    contactTitle: 'Контакты',
    noteLabel: 'Операционное примечание',
    backToContacts: 'Связаться с KRANTAS',
  },
  uz: {
    eyebrow: 'Huquqiy ma’lumot',
    updatedLabel: 'Oxirgi ko‘rib chiqilgan sana',
    frameworkLabel: 'O‘zbekiston huquqiy asoslari',
    onThisPage: 'Sahifa bo‘limlari',
    contactTitle: 'Aloqa',
    noteLabel: 'Amaliy eslatma',
    backToContacts: 'KRANTAS bilan bog‘lanish',
  },
  de: {
    eyebrow: 'Rechtliches',
    updatedLabel: 'Zuletzt geprüft',
    frameworkLabel: 'Rechtsrahmen Usbekistan',
    onThisPage: 'Auf dieser Seite',
    contactTitle: 'Kontakt',
    noteLabel: 'Operativer Hinweis',
    backToContacts: 'KRANTAS kontaktieren',
  },
} as const;

interface LegalDocumentPageProps {
  language: Language;
  content: LegalDocumentContent;
  actions?: ReactNode;
}

export default function LegalDocumentPage({
  language,
  content,
  actions,
}: LegalDocumentPageProps) {
  const ui = LEGAL_UI[language] ?? LEGAL_UI.en;

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-white">
      <section className="bg-[#f7f7f4] py-12 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#244d85]">
                {ui.eyebrow}
              </p>
              <h1 className="mt-3 font-display text-3xl font-semibold text-[#0B0C0E] md:text-4xl lg:text-5xl">
                {content.title}
              </h1>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-neutral-700">
                {content.lead}
              </p>

              <div className="mt-8 rounded-sm border border-[#244d85]/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {ui.updatedLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-[#0B0C0E]">{content.updatedAt}</p>
                <div className="mt-5 border-t border-neutral-200 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    {ui.onThisPage}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {content.sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="text-sm text-[#244d85] transition-colors hover:text-[#1E4ECC]"
                      >
                        {section.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-8">
              <div className="rounded-sm border border-[#244d85]/10 bg-white p-6 shadow-sm lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {ui.frameworkLabel}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-700">
                  {content.framework.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#f6b947]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 rounded-sm border border-neutral-200 bg-white p-6 shadow-sm lg:p-8"
                >
                  <h2 className="font-display text-2xl font-semibold text-[#0B0C0E]">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-5 space-y-3 text-sm leading-relaxed text-neutral-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-[#244d85]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <section className="rounded-sm border border-[#244d85]/10 bg-[#f8f9fb] p-6 lg:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {ui.contactTitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-neutral-700">
                  {content.contactBody}
                </p>
                <div className="mt-5 grid gap-3 text-sm text-[#0B0C0E] md:grid-cols-3">
                  <span>{COMPANY_LEGAL_CONTACT.email}</span>
                  <span>{COMPANY_LEGAL_CONTACT.phone}</span>
                  <span>{COMPANY_LEGAL_CONTACT.address}</span>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contacts"
                    className="inline-flex items-center justify-center rounded-sm bg-[#244d85] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1E4ECC]"
                  >
                    {ui.backToContacts}
                  </Link>
                  {actions}
                </div>
              </section>

              <section className="rounded-sm border border-[#f6b947]/40 bg-[#fff9ee] p-6 text-sm leading-relaxed text-neutral-700">
                <p className="font-semibold uppercase tracking-[0.14em] text-[#244d85]">
                  {ui.noteLabel}
                </p>
                <p className="mt-3">{content.note}</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
