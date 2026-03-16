import { useCallback, useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, Copy, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Language } from '../../data/translations';
import {
  createEmptyVacancy,
  getVacancyLocalization,
  slugifyProductId,
  type CmsVacancy,
  type CmsVacancyLocalization,
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

interface AdminVacanciesProps {
  vacancies: CmsVacancy[];
  upsertVacancy: (vacancy: CmsVacancy) => void;
  deleteVacancy: (id: string) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

type VacancyDraft = CmsVacancy;

const NEW_VACANCY_KEY = '__new_vacancy__';
const vacancyLanguages: Language[] = ['en', 'ru', 'uz', 'de'];

function serializeLines(lines: string[]) {
  return lines.join('\n');
}

function deserializeLines(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function cloneVacancy(vacancy: CmsVacancy): VacancyDraft {
  return JSON.parse(JSON.stringify(vacancy)) as VacancyDraft;
}

function getDraftLocalization(draft: VacancyDraft, language: Language): CmsVacancyLocalization {
  return draft.localizations[language] ?? createEmptyVacancy().localizations[language];
}

export default function AdminVacancies({
  vacancies,
  upsertVacancy,
  deleteVacancy,
  onPrimaryActionChange,
}: AdminVacanciesProps) {
  const [selectedVacancyKey, setSelectedVacancyKey] = useState<string>(
    vacancies[0]?.id ?? NEW_VACANCY_KEY,
  );
  const [vacancySearch, setVacancySearch] = useState('');
  const [editorLanguage, setEditorLanguage] = useState<Language>('en');
  const [vacancyDraft, setVacancyDraft] = useState<VacancyDraft>(
    cloneVacancy(vacancies[0] ?? createEmptyVacancy()),
  );

  const filteredVacancies = useMemo(() => {
    const query = vacancySearch.trim().toLowerCase();
    if (!query) {
      return vacancies;
    }

    return vacancies.filter((vacancy) =>
      vacancyLanguages.some((language) => {
        const localization = getVacancyLocalization(vacancy, language);
        return (
          localization.title.toLowerCase().includes(query) ||
          localization.department.toLowerCase().includes(query) ||
          localization.location.toLowerCase().includes(query) ||
          vacancy.id.toLowerCase().includes(query)
        );
      }),
    );
  }, [vacancies, vacancySearch]);

  useEffect(() => {
    if (selectedVacancyKey === NEW_VACANCY_KEY) {
      return;
    }

    const selectedVacancy = vacancies.find((vacancy) => vacancy.id === selectedVacancyKey);
    if (selectedVacancy) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVacancyDraft(cloneVacancy(selectedVacancy));
      return;
    }

    setSelectedVacancyKey(vacancies[0]?.id ?? NEW_VACANCY_KEY);
  }, [selectedVacancyKey, vacancies]);

  const handleCreateVacancy = () => {
    setSelectedVacancyKey(NEW_VACANCY_KEY);
    setEditorLanguage('en');
    setVacancyDraft(cloneVacancy(createEmptyVacancy()));
  };

  const handleDuplicateVacancy = () => {
    const sourceTitle =
      getDraftLocalization(vacancyDraft, 'en').title ||
      getDraftLocalization(vacancyDraft, editorLanguage).title ||
      'vacancy';

    setSelectedVacancyKey(NEW_VACANCY_KEY);
    setVacancyDraft((current) => ({
      ...cloneVacancy(current),
      id: `${slugifyProductId(sourceTitle)}-copy`,
    }));
    toast.success('Vacancy draft duplicated.');
  };

  const updateLocalization = (
    language: Language,
    updater: (current: CmsVacancyLocalization) => CmsVacancyLocalization,
  ) => {
    setVacancyDraft((current) => ({
      ...current,
      localizations: {
        ...current.localizations,
        [language]: updater(getDraftLocalization(current, language)),
      },
    }));
  };

  const handleSaveVacancy = useCallback(() => {
    const englishTitle = getDraftLocalization(vacancyDraft, 'en').title.trim();
    const fallbackTitle = getDraftLocalization(vacancyDraft, editorLanguage).title.trim();
    const nextId = vacancyDraft.id.trim() || slugifyProductId(englishTitle || fallbackTitle || 'vacancy');

    if (!nextId) {
      toast.error('Vacancy ID is required.');
      return;
    }

    if (!englishTitle && !fallbackTitle) {
      toast.error('Add a vacancy title before saving.');
      return;
    }

    const idTaken = vacancies.some(
      (vacancy) => vacancy.id === nextId && vacancy.id !== selectedVacancyKey,
    );

    if (idTaken) {
      toast.error('That vacancy ID is already in use.');
      return;
    }

    const sanitized: CmsVacancy = {
      ...cloneVacancy(vacancyDraft),
      id: nextId,
      localizations: vacancyLanguages.reduce<Record<Language, CmsVacancyLocalization>>(
        (acc, language) => {
          const localization = getDraftLocalization(vacancyDraft, language);
          acc[language] = {
            ...localization,
            title: localization.title.trim(),
            department: localization.department.trim(),
            location: localization.location.trim(),
            type: localization.type.trim(),
            experience: localization.experience.trim(),
            age: localization.age.trim(),
            description: localization.description.trim(),
            requirements: localization.requirements.map((item) => item.trim()).filter(Boolean),
          };
          return acc;
        },
        {
          en: createEmptyVacancy().localizations.en,
          ru: createEmptyVacancy().localizations.ru,
          uz: createEmptyVacancy().localizations.uz,
          de: createEmptyVacancy().localizations.de,
        },
      ),
    };

    upsertVacancy(sanitized);

    if (selectedVacancyKey !== NEW_VACANCY_KEY && selectedVacancyKey !== nextId) {
      deleteVacancy(selectedVacancyKey);
    }

    setSelectedVacancyKey(nextId);
    setVacancyDraft(cloneVacancy(sanitized));
    toast.success('Vacancy saved.');
  }, [deleteVacancy, editorLanguage, selectedVacancyKey, upsertVacancy, vacancies, vacancyDraft]);

  const handleDeleteVacancy = () => {
    if (selectedVacancyKey === NEW_VACANCY_KEY) {
      setVacancyDraft(cloneVacancy(createEmptyVacancy()));
      return;
    }

    deleteVacancy(selectedVacancyKey);
    setSelectedVacancyKey(
      vacancies.find((vacancy) => vacancy.id !== selectedVacancyKey)?.id ?? NEW_VACANCY_KEY,
    );
    toast.success('Vacancy deleted.');
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save Vacancy',
      onClick: handleSaveVacancy,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [handleSaveVacancy, onPrimaryActionChange]);

  const activeLocalization = getDraftLocalization(vacancyDraft, editorLanguage);

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-black">Vacancies</h2>
            <p className="mt-1 text-sm text-neutral-500">Create, edit, publish, and remove job openings.</p>
          </div>
          <button
            onClick={handleCreateVacancy}
            className={adminPrimaryButtonClass}
            aria-label="Create vacancy"
            title="Create vacancy"
          >
            <Plus size={16} />
          </button>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
          <Search size={16} className="text-neutral-400" />
          <input
            value={vacancySearch}
            onChange={(event) => setVacancySearch(event.target.value)}
            placeholder="Search vacancies"
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </label>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          <div className="space-y-3">
            <button
              onClick={handleCreateVacancy}
              className={getAdminListItemClass(selectedVacancyKey === NEW_VACANCY_KEY)}
            >
              <p className="text-sm font-semibold">New Vacancy</p>
              <p
                className={`mt-1 text-xs uppercase tracking-[0.12em] ${
                  selectedVacancyKey === NEW_VACANCY_KEY ? 'text-white/70' : 'text-neutral-500'
                }`}
              >
                Draft
              </p>
            </button>

            {filteredVacancies.map((vacancy) => {
              const preview = getVacancyLocalization(vacancy, 'en');
              const active = selectedVacancyKey === vacancy.id;

              return (
                <button
                  key={vacancy.id}
                  onClick={() => setSelectedVacancyKey(vacancy.id)}
                  className={getAdminListItemClass(active)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {preview.title || 'Untitled vacancy'}
                      </p>
                      <p
                        className={`mt-1 truncate text-xs uppercase tracking-[0.12em] ${
                          active ? 'text-white/70' : 'text-neutral-500'
                        }`}
                      >
                        {preview.department || 'No department'}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        vacancy.isActive
                          ? active
                            ? 'bg-white/15 text-white'
                            : 'bg-emerald-50 text-emerald-700'
                          : active
                            ? 'bg-white/10 text-white'
                            : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {vacancy.isActive ? 'Live' : 'Hidden'}
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
            <p className={adminLabelClass}>Vacancy Editor</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
              {activeLocalization.title || 'Untitled vacancy'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={handleDuplicateVacancy} className={adminSecondaryButtonClass}>
              <Copy size={16} />
              Duplicate
            </button>
            <button onClick={handleDeleteVacancy} className={adminDangerButtonClass}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-1">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div className="space-y-4">
              <label className="space-y-2">
                <span className={adminLabelClass}>Vacancy ID</span>
                <input
                  value={vacancyDraft.id}
                  onChange={(event) =>
                    setVacancyDraft((current) => ({
                      ...current,
                      id: event.target.value,
                    }))
                  }
                  placeholder="vacancy-id"
                  className={adminInputClass}
                />
              </label>

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-black">Published</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                    Show this vacancy on the careers page
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setVacancyDraft((current) => ({
                      ...current,
                      isActive: !current.isActive,
                    }))
                  }
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    vacancyDraft.isActive ? 'bg-black' : 'bg-neutral-300'
                  }`}
                  aria-pressed={vacancyDraft.isActive}
                  aria-label="Toggle vacancy visibility"
                >
                  <span
                    className={`inline-block h-5 w-5 rounded-full bg-white transition ${
                      vacancyDraft.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <p className={adminLabelClass}>Languages</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vacancyLanguages.map((language) => (
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

              <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm">
                    <BriefcaseBusiness size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Preview</p>
                    <p className="text-xs text-neutral-500">
                      {activeLocalization.department || 'Department'} · {activeLocalization.location || 'Location'}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-600">
                  {activeLocalization.description || 'Vacancy summary will appear here.'}
                </p>
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

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Department</span>
                  <input
                    value={activeLocalization.department}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        department: event.target.value,
                      }))
                    }
                    className={adminInputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Location</span>
                  <input
                    value={activeLocalization.location}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        location: event.target.value,
                      }))
                    }
                    className={adminInputClass}
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-2">
                  <span className={adminLabelClass}>Type</span>
                  <input
                    value={activeLocalization.type}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        type: event.target.value,
                      }))
                    }
                    className={adminInputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Experience</span>
                  <input
                    value={activeLocalization.experience}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        experience: event.target.value,
                      }))
                    }
                    className={adminInputClass}
                  />
                </label>

                <label className="space-y-2">
                  <span className={adminLabelClass}>Age</span>
                  <input
                    value={activeLocalization.age}
                    onChange={(event) =>
                      updateLocalization(editorLanguage, (current) => ({
                        ...current,
                        age: event.target.value,
                      }))
                    }
                    className={adminInputClass}
                  />
                </label>
              </div>

              <label className="space-y-2">
                <span className={adminLabelClass}>Description</span>
                <textarea
                  rows={5}
                  value={activeLocalization.description}
                  onChange={(event) =>
                    updateLocalization(editorLanguage, (current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className={adminTextareaClass}
                />
              </label>

              <label className="space-y-2">
                <span className={adminLabelClass}>Requirements</span>
                <textarea
                  rows={7}
                  value={serializeLines(activeLocalization.requirements)}
                  onChange={(event) =>
                    updateLocalization(editorLanguage, (current) => ({
                      ...current,
                      requirements: deserializeLines(event.target.value),
                    }))
                  }
                  className={adminTextareaClass}
                  placeholder="One requirement per line"
                />
              </label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
