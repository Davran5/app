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

const MAX_OPTIMIZED_IMAGE_BYTES = 600 * 1024;
const MAX_OPTIMIZED_IMAGE_DIMENSION = 2000;
const MIN_OPTIMIZED_IMAGE_DIMENSION = 900;
const WEBP_QUALITY_STEPS = [0.82, 0.74, 0.66, 0.58];

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });
}

function createWebpFilename(filename: string) {
  const basename = filename.replace(/\.[^.]+$/, '').trim() || 'image';
  return `${basename}.webp`;
}

function canvasToWebpBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/webp', quality);
  });
}

async function optimizeImageForUpload(file: File) {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return file;
  }

  let bitmap: ImageBitmap;

  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  try {
    const initialScale = Math.min(
      1,
      MAX_OPTIMIZED_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height),
    );
    let width = Math.max(1, Math.round(bitmap.width * initialScale));
    let height = Math.max(1, Math.round(bitmap.height * initialScale));
    let smallestBlob: Blob | null = null;

    for (let resizeAttempt = 0; resizeAttempt < 5; resizeAttempt += 1) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { alpha: true });

      if (!context) {
        return file;
      }

      context.drawImage(bitmap, 0, 0, width, height);

      for (const quality of WEBP_QUALITY_STEPS) {
        const blob = await canvasToWebpBlob(canvas, quality);

        if (!blob) {
          continue;
        }

        if (!smallestBlob || blob.size < smallestBlob.size) {
          smallestBlob = blob;
        }

        if (blob.size <= MAX_OPTIMIZED_IMAGE_BYTES) {
          return new File([blob], createWebpFilename(file.name), {
            type: 'image/webp',
            lastModified: file.lastModified,
          });
        }
      }

      if (Math.max(width, height) <= MIN_OPTIMIZED_IMAGE_DIMENSION) {
        break;
      }

      width = Math.max(1, Math.round(width * 0.8));
      height = Math.max(1, Math.round(height * 0.8));
    }

    return smallestBlob
      ? new File([smallestBlob], createWebpFilename(file.name), {
          type: 'image/webp',
          lastModified: file.lastModified,
        })
      : file;
  } finally {
    bitmap.close();
  }
}

async function prepareMediaUpload(file: File, id: string) {
  const preparedFile = await optimizeImageForUpload(file);
  return {
    id,
    name: preparedFile.name,
    dataUrl: await readFileAsDataUrl(preparedFile),
    mimeType: preparedFile.type || undefined,
  };
}

export async function uploadAdminMediaFile(file: File, id?: string) {
  const mediaId = id || globalThis.crypto?.randomUUID?.() || `${Date.now()}-${file.name}`;
  return uploadEmbeddedAdminMedia(await prepareMediaUpload(file, mediaId));
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
  const embeddedItems = snapshot.mediaItems.filter((item) => item.dataUrl);

  if (embeddedItems.length === 0) {
    return snapshot;
  }

  const response = await fetch('/api/admin/media/migrate', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });
  const result = await parseJsonResponse<{
    ok: true;
    mediaItems: UploadedMediaInput[];
  }>(response);
  const migratedById = new Map(result.mediaItems.map((item) => [item.id, item]));
  const replacements = new Map<string, string>();
  const mediaItems = snapshot.mediaItems.map((item) => {
    const migratedItem = migratedById.get(item.id);

    if (!item.dataUrl || !migratedItem) {
      return item;
    }

    replacements.set(item.url, migratedItem.url);
    replacements.set(item.dataUrl, migratedItem.url);
    return migratedItem;
  });

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
