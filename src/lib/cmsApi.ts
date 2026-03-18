import type { CmsLead, CmsLeadInput, CmsSnapshot } from './cms';

declare global {
  interface Window {
    __KRANTAS_CMS_PUBLIC__?: unknown;
  }
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export function readInjectedPublicCmsSnapshot() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.__KRANTAS_CMS_PUBLIC__ ?? null;
}

export async function fetchPublicCmsSnapshot() {
  const response = await fetch('/api/cms/public', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  return parseJsonResponse<unknown>(response);
}

export async function fetchAdminCmsSnapshot() {
  const response = await fetch('/api/admin/cms', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  return parseJsonResponse<unknown>(response);
}

export async function saveAdminCmsSnapshot(snapshot: CmsSnapshot) {
  const response = await fetch('/api/admin/cms', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      snapshot,
    }),
  });

  await parseJsonResponse<{ ok: true }>(response);
}

export async function submitLeadToServer(leadInput: CmsLeadInput) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      lead: leadInput,
    }),
  });

  return parseJsonResponse<{ ok: true; lead: CmsLead }>(response);
}
