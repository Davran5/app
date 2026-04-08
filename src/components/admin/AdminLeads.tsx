import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Building2,
  CalendarClock,
  Globe2,
  Mail,
  MessageSquarePlus,
  Phone,
  Search,
  Trash2,
  UserRound,
} from 'lucide-react';
import { toast } from 'sonner';
import type {
  CmsLead,
  CmsLeadPriority,
  CmsLeadSource,
  CmsLeadStatus,
} from '../../lib/cms';
import {
  adminCardClass,
  adminDangerButtonClass,
  adminInputClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminTextareaClass,
  getAdminListItemClass,
} from './styles';
import type { AdminPrimaryAction } from './types';

interface AdminLeadsProps {
  leads: CmsLead[];
  upsertLead: (lead: CmsLead) => void;
  deleteLead: (id: string) => void;
  onPrimaryActionChange?: (action: AdminPrimaryAction | null) => void;
}

const statusOptions: { value: CmsLeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'inReview', label: 'In Review' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'archived', label: 'Archived' },
];

const priorityOptions: { value: CmsLeadPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const sourceOptions: { value: 'all' | CmsLeadSource; label: string }[] = [
  { value: 'all', label: 'All Sources' },
  { value: 'contact', label: 'Contact Forms' },
  { value: 'careers', label: 'Career Applications' },
];

function cloneLead(lead: CmsLead) {
  return JSON.parse(JSON.stringify(lead)) as CmsLead;
}

function formatLeadDate(value: string) {
  if (!value) {
    return 'Not set';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleString();
}

function formatDateTimeLocal(value: string) {
  if (!value) {
    return '';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  const pad = (part: number) => part.toString().padStart(2, '0');

  return `${parsedDate.getFullYear()}-${pad(parsedDate.getMonth() + 1)}-${pad(parsedDate.getDate())}T${pad(parsedDate.getHours())}:${pad(parsedDate.getMinutes())}`;
}

function normalizeDateTimeLocal(value: string) {
  return value ? new Date(value).toISOString() : '';
}

function humanizeOriginPage(pathname: string) {
  if (!pathname) {
    return 'Website';
  }

  if (pathname === '/') {
    return 'Home';
  }

  return pathname
    .replace(/^\//, '')
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (character) => character.toUpperCase()),
    )
    .join(' / ');
}

function getStatusLabel(status: CmsLeadStatus) {
  return statusOptions.find((option) => option.value === status)?.label ?? status;
}

function getPriorityLabel(priority: CmsLeadPriority) {
  return priorityOptions.find((option) => option.value === priority)?.label ?? priority;
}

function getSourceLabel(source: CmsLeadSource) {
  return source === 'careers' ? 'Career Application' : 'Contact Form';
}

function getStatusBadgeClass(active: boolean, status: CmsLeadStatus) {
  if (active) {
    return 'rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white';
  }

  if (status === 'won') {
    return 'rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700';
  }

  if (status === 'lost' || status === 'archived') {
    return 'rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500';
  }

  if (status === 'contacted' || status === 'qualified' || status === 'proposal') {
    return 'rounded-full bg-sky-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-700';
  }

  return 'rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-700';
}

function getLeadPreview(lead: CmsLead) {
  return lead.subject || lead.name || lead.email || 'Untitled lead';
}

function sanitizeLead(lead: CmsLead) {
  return {
    ...cloneLead(lead),
    name: lead.name.trim(),
    email: lead.email.trim(),
    phone: lead.phone.trim(),
    company: lead.company.trim(),
    subject: lead.subject.trim(),
    message: lead.message.trim(),
    originPage: lead.originPage.trim(),
    assignee: lead.assignee.trim(),
    followUpAt: lead.followUpAt,
    internalNotes: lead.internalNotes
      .map((note) => ({
        ...note,
        text: note.text.trim(),
      }))
      .filter((note) => note.text),
    metadata: Object.fromEntries(
      Object.entries(lead.metadata).filter(([key, value]) => key.trim() && value.trim()),
    ),
  };
}

export default function AdminLeads({
  leads,
  upsertLead,
  deleteLead,
  onPrimaryActionChange,
}: AdminLeadsProps) {
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id ?? '');
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CmsLeadStatus>('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | CmsLeadSource>('all');
  const [leadDraft, setLeadDraft] = useState<CmsLead | null>(leads[0] ? cloneLead(leads[0]) : null);
  const [noteDraft, setNoteDraft] = useState('');

  const filteredLeads = useMemo(() => {
    const query = leadSearch.trim().toLowerCase();

    return [...leads]
      .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
      .filter((lead) => (statusFilter === 'all' ? true : lead.status === statusFilter))
      .filter((lead) => (sourceFilter === 'all' ? true : lead.source === sourceFilter))
      .filter((lead) => {
        if (!query) {
          return true;
        }

        return [
          lead.name,
          lead.email,
          lead.phone,
          lead.company,
          lead.subject,
          lead.message,
          lead.assignee,
          lead.originPage,
          ...Object.values(lead.metadata),
        ]
          .join(' ')
          .toLowerCase()
          .includes(query);
      });
  }, [leadSearch, leads, sourceFilter, statusFilter]);

  const selectedLead =
    filteredLeads.find((lead) => lead.id === selectedLeadId) ?? filteredLeads[0] ?? null;

  const activeLead = useMemo(() => {
    if (!selectedLead) {
      return null;
    }

    return leadDraft && leadDraft.id === selectedLead.id ? leadDraft : cloneLead(selectedLead);
  }, [leadDraft, selectedLead]);

  const updateDraft = (updater: (lead: CmsLead) => CmsLead) => {
    setLeadDraft((current) => {
      const baseLead =
        activeLead && current && current.id === activeLead.id ? current : activeLead;

      return baseLead ? updater(cloneLead(baseLead)) : current;
    });
  };

  const handleSaveLead = useCallback(() => {
    if (!activeLead) {
      return;
    }

    const sanitizedLead = sanitizeLead(activeLead);
    upsertLead(sanitizedLead);
    setLeadDraft(cloneLead(sanitizedLead));
    toast.success('Lead saved.');
  }, [activeLead, upsertLead]);

  const handleDeleteLead = () => {
    if (!activeLead) {
      return;
    }

    const remainingLeads = filteredLeads.filter((lead) => lead.id !== activeLead.id);
    const nextLead = remainingLeads[0] ?? null;

    deleteLead(activeLead.id);
    setSelectedLeadId(nextLead?.id ?? '');
    setLeadDraft(nextLead ? cloneLead(nextLead) : null);
    setNoteDraft('');
    toast.success('Lead deleted.');
  };

  const handleAddNote = () => {
    if (!activeLead || !noteDraft.trim()) {
      return;
    }

    const nextLead = sanitizeLead({
      ...activeLead,
      internalNotes: [
        {
          id: `lead-note-${Date.now()}`,
          text: noteDraft.trim(),
          createdAt: new Date().toISOString(),
        },
        ...activeLead.internalNotes,
      ],
    });

    setLeadDraft(nextLead);
    setNoteDraft('');
    upsertLead(nextLead);
    toast.success('Lead note added.');
  };

  useEffect(() => {
    onPrimaryActionChange?.({
      label: 'Save Lead',
      onClick: handleSaveLead,
      disabled: !activeLead,
    });

    return () => {
      onPrimaryActionChange?.(null);
    };
  }, [activeLead, handleSaveLead, onPrimaryActionChange]);

  const newCount = leads.filter((l) => l.status === 'new').length;
  const wonCount = leads.filter((l) => l.status === 'won').length;

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
      <aside className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-5`}>
        <div>
          <p className={adminLabelClass}>CRM</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">Leads</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Website inquiries and applications from live forms.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-black/10 bg-neutral-50 px-2 py-2 text-center">
            <p className="text-lg font-semibold text-black">{leads.length}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-500">Total</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-2 py-2 text-center">
            <p className="text-lg font-semibold text-amber-700">{newCount}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-600">New</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-2 text-center">
            <p className="text-lg font-semibold text-emerald-700">{wonCount}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-600">Won</p>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3">
          <Search size={16} className="text-neutral-400" />
          <input
            value={leadSearch}
            onChange={(event) => setLeadSearch(event.target.value)}
            placeholder="Search leads"
            className="w-full bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="space-y-2">
            <span className={adminLabelClass}>Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'all' | CmsLeadStatus)}
              className={adminInputClass}
            >
              <option value="all">All Statuses</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className={adminLabelClass}>Source</span>
            <select
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value as 'all' | CmsLeadSource)}
              className={adminInputClass}
            >
              {sourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {filteredLeads.length > 0 ? (
            <div className="space-y-3">
              {filteredLeads.map((lead) => {
                const active = activeLead?.id === lead.id;

                return (
                  <button
                    key={lead.id}
                    onClick={() => {
                      setSelectedLeadId(lead.id);
                      setNoteDraft('');
                    }}
                    className={getAdminListItemClass(active)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{getLeadPreview(lead)}</p>
                        <p
                          className={`mt-1 truncate text-xs uppercase tracking-[0.12em] ${
                            active ? 'text-white/70' : 'text-neutral-500'
                          }`}
                        >
                          {lead.name || lead.email || getSourceLabel(lead.source)}
                        </p>
                      </div>

                      <span className={getStatusBadgeClass(active, lead.status)}>
                        {getStatusLabel(lead.status)}
                      </span>
                    </div>

                    <div
                      className={`mt-3 flex items-center justify-between gap-3 text-xs ${
                        active ? 'text-white/70' : 'text-neutral-500'
                      }`}
                    >
                      <span>{getSourceLabel(lead.source)}</span>
                      <span>{formatLeadDate(lead.createdAt)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-4 py-8 text-center text-sm text-neutral-500">
              No leads found.
            </div>
          )}
        </div>
      </aside>

      <section className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden`}>
        {activeLead ? (
          <>
            <div className="shrink-0 border-b border-black/10 px-6 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className={adminLabelClass}>{getSourceLabel(activeLead.source)}</p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-black">{getLeadPreview(activeLead)}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
                      {getStatusLabel(activeLead.status)}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
                      {getPriorityLabel(activeLead.priority)}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-600">
                      {humanizeOriginPage(activeLead.originPage)}
                    </span>
                  </div>
                </div>

                <button onClick={handleDeleteLead} className={adminDangerButtonClass}>
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className={adminLabelClass}>Status</span>
                      <select
                        value={activeLead.status}
                        onChange={(event) =>
                          updateDraft((lead) => ({
                            ...lead,
                            status: event.target.value as CmsLeadStatus,
                          }))
                        }
                        className={adminInputClass}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-2">
                      <span className={adminLabelClass}>Priority</span>
                      <select
                        value={activeLead.priority}
                        onChange={(event) =>
                          updateDraft((lead) => ({
                            ...lead,
                            priority: event.target.value as CmsLeadPriority,
                          }))
                        }
                        className={adminInputClass}
                      >
                        {priorityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className={adminLabelClass}>Assignee</span>
                      <input
                        value={activeLead.assignee}
                        onChange={(event) =>
                          updateDraft((lead) => ({
                            ...lead,
                            assignee: event.target.value,
                          }))
                        }
                        placeholder="Sales owner"
                        className={adminInputClass}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className={adminLabelClass}>Follow Up</span>
                      <input
                        type="datetime-local"
                        value={formatDateTimeLocal(activeLead.followUpAt)}
                        onChange={(event) =>
                          updateDraft((lead) => ({
                            ...lead,
                            followUpAt: normalizeDateTimeLocal(event.target.value),
                          }))
                        }
                        className={adminInputClass}
                      />
                    </label>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <p className={adminLabelClass}>Contact</p>
                    <div className="mt-4 space-y-3 text-sm text-neutral-700">
                      <div className="flex items-center gap-3">
                        <UserRound size={16} className="text-neutral-400" />
                        <span>{activeLead.name || 'No name provided'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="text-neutral-400" />
                        <span>{activeLead.email || 'No email provided'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="text-neutral-400" />
                        <span>{activeLead.phone || 'No phone provided'}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building2 size={16} className="text-neutral-400" />
                        <span>{activeLead.company || 'No company provided'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <p className={adminLabelClass}>Submission</p>
                    <div className="mt-4 grid gap-3 text-sm text-neutral-700">
                      <div className="flex items-center gap-3">
                        <Globe2 size={16} className="text-neutral-400" />
                        <span>{humanizeOriginPage(activeLead.originPage)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CalendarClock size={16} className="text-neutral-400" />
                        <span>{formatLeadDate(activeLead.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CalendarClock size={16} className="text-neutral-400" />
                        <span>Updated {formatLeadDate(activeLead.updatedAt)}</span>
                      </div>
                      <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                        Language: {activeLead.language.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="space-y-2">
                    <span className={adminLabelClass}>Subject</span>
                    <input
                      value={activeLead.subject}
                      onChange={(event) =>
                        updateDraft((lead) => ({
                          ...lead,
                          subject: event.target.value,
                        }))
                      }
                      className={adminInputClass}
                    />
                  </label>

                  <label className="space-y-2">
                    <span className={adminLabelClass}>Message</span>
                    <textarea
                      rows={8}
                      value={activeLead.message}
                      onChange={(event) =>
                        updateDraft((lead) => ({
                          ...lead,
                          message: event.target.value,
                        }))
                      }
                      className={adminTextareaClass}
                      placeholder="Lead message"
                    />
                  </label>

                  <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <p className={adminLabelClass}>Lead Metadata</p>
                    {Object.keys(activeLead.metadata).length > 0 ? (
                      <div className="mt-4 grid gap-3">
                        {Object.entries(activeLead.metadata).map(([key, value]) => (
                          <div key={key} className="rounded-2xl border border-black/5 bg-white px-4 py-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                              {key}
                            </p>
                            <p className="mt-2 text-sm text-black">{value}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-neutral-500">No extra metadata for this lead.</p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={adminLabelClass}>Internal Notes</p>
                        <p className="mt-1 text-sm text-neutral-500">
                          Track follow-up, qualification, and next steps.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <textarea
                        rows={3}
                        value={noteDraft}
                        onChange={(event) => setNoteDraft(event.target.value)}
                        placeholder="Add a note"
                        className={`${adminTextareaClass} min-h-[96px]`}
                      />
                      <button
                        type="button"
                        onClick={handleAddNote}
                        className={`${adminPrimaryButtonClass} h-fit shrink-0 px-3`}
                      >
                        <MessageSquarePlus size={16} />
                        Note
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {activeLead.internalNotes.length > 0 ? (
                        activeLead.internalNotes.map((note) => (
                          <div key={note.id} className="rounded-2xl border border-black/5 bg-white px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">
                              {formatLeadDate(note.createdAt)}
                            </p>
                            <p className="mt-2 whitespace-pre-wrap text-sm text-black">{note.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-2xl border border-dashed border-black/10 bg-white px-4 py-6 text-center text-sm text-neutral-500">
                          No notes yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl border border-dashed border-black/10 bg-neutral-50 text-sm text-neutral-500">
            No leads captured yet.
          </div>
        )}
      </section>
    </div>
  );
}
