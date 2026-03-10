import { Copy, FileIcon, ImageIcon, Trash2, Upload } from 'lucide-react';
import { useMemo, useRef, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';
import { useCms } from '../../contexts/CmsContext';
import {
  createUploadedMediaUrl,
  getMediaLibrary,
  getMediaPreviewUrl,
  isImageMedia,
  type UploadedMediaInput,
} from '../../lib/media';
import {
  adminCardClass,
  adminDangerButtonClass,
  adminLabelClass,
  adminPrimaryButtonClass,
  adminSubtleTextClass,
  adminTitleClass,
} from './styles';
import AdminMediaLibrary from './AdminMediaLibrary';

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Could not read file.'));
    reader.readAsDataURL(file);
  });
}

export default function AdminMedia() {
  const { mediaItems, upsertMediaItem, deleteMediaItem } = useCms();
  const [selectedUrl, setSelectedUrl] = useState('');
  const uploadRef = useRef<HTMLInputElement>(null);
  const mediaLibrary = useMemo(() => getMediaLibrary(mediaItems), [mediaItems]);

  const selectedMedia =
    mediaLibrary.find((item) => item.url === selectedUrl) ?? mediaLibrary[0] ?? null;

  const handleCopyPath = async () => {
    if (!selectedMedia) {
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedMedia.url);
      toast.success('File path copied.');
    } catch {
      toast.error('Could not copy the file path.');
    }
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    try {
      const uploadedItems = await Promise.all(
        files.map(async (file) => {
          const dataUrl = await readFileAsDataUrl(file);
          const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${file.name}`;

          return {
            id,
            name: file.name,
            url: createUploadedMediaUrl(id, file.name),
            dataUrl,
            mimeType: file.type || undefined,
          } satisfies UploadedMediaInput;
        }),
      );

      uploadedItems.forEach(upsertMediaItem);
      setSelectedUrl(uploadedItems[0]?.url ?? '');
      toast.success(`${uploadedItems.length} file${uploadedItems.length > 1 ? 's' : ''} uploaded.`);
    } catch {
      toast.error('Could not upload the selected files.');
    } finally {
      event.target.value = '';
    }
  };

  const handleDelete = () => {
    if (!selectedMedia || selectedMedia.source !== 'uploaded') {
      return;
    }

    deleteMediaItem(selectedMedia.id);
    setSelectedUrl('');
    toast.success('Uploaded file removed.');
  };

  return (
    <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
      <AdminMediaLibrary
        title="Media Library"
        description="Upload images or files, then reuse them across products and content from one shared media library."
        selectLabel="Preview"
        mediaLibrary={mediaLibrary}
        selectedUrls={selectedMedia ? [selectedMedia.url] : []}
        onSelect={setSelectedUrl}
        emptyMessage="No media files are available yet."
      />

      <div className={`${adminCardClass} flex min-h-0 flex-col overflow-hidden p-6`}>
        <p className={adminLabelClass}>Media</p>
        <h2 className={adminTitleClass}>Upload & Preview</h2>

        <div className="mt-4">
          <input
            ref={uploadRef}
            type="file"
            multiple
            onChange={(event) => void handleUpload(event)}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,.rar,.json,.svg"
          />

          <button
            onClick={() => uploadRef.current?.click()}
            className={adminPrimaryButtonClass}
          >
            <Upload size={16} />
            Upload Files
          </button>
        </div>

        {selectedMedia ? (
          <div className="mt-6 flex-1 overflow-y-auto pr-1">
            <div className="space-y-5">
              {isImageMedia(selectedMedia.url, selectedMedia.mimeType) ? (
                <div className="overflow-hidden rounded-[24px] border border-black/10 bg-neutral-100">
                  <img
                    src={getMediaPreviewUrl(selectedMedia.url)}
                    alt={selectedMedia.label}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center rounded-[24px] border border-black/10 bg-neutral-50">
                  <div className="inline-flex rounded-full bg-white p-4">
                    <FileIcon size={24} className="text-neutral-500" />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-lg font-semibold text-black">{selectedMedia.label}</p>
                  <p className="mt-1 text-sm text-neutral-600">{selectedMedia.groupLabel}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">
                    {selectedMedia.source === 'uploaded' ? 'Uploaded' : 'Bundled'}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-neutral-50 p-4">
                  <p className={adminLabelClass}>Path</p>
                  <p className="mt-2 break-all font-mono text-xs text-neutral-600">{selectedMedia.url}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={() => void handleCopyPath()} className={adminPrimaryButtonClass}>
                    <Copy size={16} />
                    Copy Path
                  </button>

                  {selectedMedia.source === 'uploaded' && (
                    <button onClick={handleDelete} className={adminDangerButtonClass}>
                      <Trash2 size={16} />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-black/10 bg-neutral-50 px-5 py-10 text-center">
            <div>
              <div className="inline-flex rounded-full bg-white p-3">
                <ImageIcon size={20} className="text-neutral-500" />
              </div>
              <p className={`mt-4 ${adminSubtleTextClass}`}>
                Upload or choose a file from the library to preview it here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
