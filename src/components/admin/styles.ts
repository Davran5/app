export const adminCardClass =
  'rounded-[24px] border border-black/10 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]';

export const adminLabelClass =
  'text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500';

export const adminTitleClass = 'mt-2 text-2xl font-semibold tracking-tight text-black';

export const adminSubtleTextClass = 'text-sm text-neutral-600';

export const adminInputClass =
  'w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/5';

export const adminTextareaClass = adminInputClass;

export const adminPrimaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:hover:bg-neutral-200';

export const adminSecondaryButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 disabled:hover:bg-neutral-100';

export const adminDangerButtonClass =
  'inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-red-100 disabled:bg-red-50/60 disabled:text-red-300 disabled:hover:bg-red-50/60';

export function getAdminListItemClass(active: boolean) {
  return active
    ? 'w-full rounded-2xl border border-black bg-black px-4 py-3 text-left text-white transition'
    : 'w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-left text-black transition hover:border-black/20 hover:bg-neutral-50';
}

export function getAdminPillClass(active: boolean) {
  return active
    ? 'rounded-full bg-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition'
    : 'rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 transition hover:bg-neutral-100';
}
