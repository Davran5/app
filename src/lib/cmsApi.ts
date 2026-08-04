import type { CmsLead, CmsLeadInput, CmsSnapshot } from './cms';
import type { UploadedMediaInput } from './media';

declare global {
  interface Window {
    __KRANTAS_CMS_PUBLIC__?: unknown;
  }
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | (T & { error?: string })
    | null;

  if (!response.ok) {
    throw new Error(payload?.error || `Request failed with ${response.status}`);
  }

  if (payload === null) {
    throw new Error('The server returned an empty response.');
  }

  return payload;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });
}

export async function uploadAdminMediaFile(file: File, id?: string) {
  const dataUrl = await readFileAsDataUrl(file);
  return uploadEmbeddedAdminMedia({
    id: id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${file.name}`,
    name: file.name,
    dataUrl,
    mimeType: file.type || undefined,
  });
}

async function uploadEmbeddedAdminMedia(
  input: Pick<UploadedMediaInput, 'id' | 'name' | 'dataUrl' | 'mimeType'>,
) {
  const response = await fetch('/api/admin/media/upload', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(input),
  });

  const result = await parseJsonResponse<{ ok: true; mediaItem: UploadedMediaInput }>(response);
  return result.mediaItem;
}

export async function deleteAdminMediaFile(id: string) {
  const response = await fetch(`/api/admin/media/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  await parseJsonResponse<{ ok: true }>(response);
}

function replaceExactMediaUrls<T>(value: T, replacements: Map<string, string>): T {
  if (typeof value === 'string') {
    return (replacements.get(value) ?? value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceExactMediaUrls(item, replacements)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, replaceExactMediaUrls(item, replacements)]),
    ) as T;
  }

  return value;
}

async function migrateEmbeddedMedia(snapshot: CmsSnapshot) {
  const replacements = new Map<string, string>();
  const mediaItems = await Promise.all(
    snapshot.mediaItems.map(async (item) => {
      if (!item.dataUrl) {
        return item;
      }

      const uploadedItem = await uploadEmbeddedAdminMedia(item);
      replacements.set(item.url, uploadedItem.url);
      replacements.set(item.dataUrl, uploadedItem.url);
      return uploadedItem;
    }),
  );

  if (replacements.size === 0) {
    return snapshot;
  }

  return replaceExactMediaUrls(
    {
      ...snapshot,
      mediaItems,
    },
    replacements,
  );
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
  const preparedSnapshot = await migrateEmbeddedMedia(snapshot);
  const response = await fetch('/api/admin/cms', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      snapshot: preparedSnapshot,
    }),
  });

  await parseJsonResponse<{ ok: true }>(response);
  return preparedSnapshot;
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
