export interface MediaItem {
  id: string;
  url: string;
  decodedUrl: string;
  filename: string;
  label: string;
  groupId: string;
  groupLabel: string;
  mimeType?: string;
  source: 'bundled' | 'uploaded';
}

const MEDIA_GROUP_LABELS: Record<string, string> = {
  products: 'Products',
  site: 'Site Assets',
};

const MEDIA_URLS = [
  '/1945.jpeg',
  '/1966.jpg',
  '/1991.png',
  '/2018.png',
  '/2021.png',
  '/2024.png',
  '/about_factory.jpg',
  '/allison.png',
  '/aselan.png',
  '/assembly_line.jpeg',
  '/bosch.png',
  '/chairman_portrait.jpeg',
  '/chassis_mod.jpeg',
  '/cnc.jpeg',
  '/comet.png',
  '/cov_ser.jpeg',
  '/cover_am.jpg',
  '/cover_dt.jpg',
  '/cover_le.jpg',
  '/cover_ms.jpeg',
  '/cover_mt.jpeg',
  '/cover_og.jpg',
  '/cover_spm.jpg',
  '/cover_tt.jpg',
  '/cukurova.png',
  '/cust_sol.jpg',
  '/Daniyarov.jpeg',
  '/dismap.jpg',
  '/elvira.png',
  '/full_cycle.jpeg',
  '/hero_cover.png',
  '/hq.jpeg',
  '/hyd_ele.jpeg',
  '/hydro.png',
  '/hyundai.png',
  '/Karimov.jpeg',
  '/kia.png',
  '/komil.png',
  '/Konstantinovich.jpeg',
  '/kozmaksan.png',
  '/logo.png',
  '/man_floor.jpeg',
  '/non_stan.jpeg',
  '/Nuriddin.jpeg',
  '/our_vis.jpeg',
  '/products/AM%20Grain%20Combine%20Harvester%20(Self-Propelled).jpeg',
  '/products/AM%20Tractor%20Equipped%20with%20Earth%20Auger.jpeg',
  '/products/AM%20Universal%20Tractor%20NURAFSHON%20N%2081%20(4%C3%974,%20Belarus-based).jpeg',
  '/products/AM%20Universal%20Tractor%20NURAFSHON%20N%2081%20C%20(Belarus-based).jpg',
  '/products/DT%20Dump%20Truck,%2016%20m%C2%B3%20%2020%20t.jpeg',
  '/products/DT%20Dump%20Truck,%204%20m%C2%B3%20%204.5%20t.jpeg',
  '/products/DT%20Dump%20Truck,%208%20m%C2%B3%20%2010%20t.jpeg',
  '/products/DT%20Tipper%20Semi-Trailer%20(24%20m%C2%B3%20%2026%20m%C2%B3).jpeg',
  '/products/LE%20Aerial%20Work%20Platform%20Truck,%2018%20m.jpeg',
  '/products/LE%20Aerial%20Work%20Platform%20Truck,%2028%20m.jpeg',
  '/products/LE%20Aerial%20Work%20Platform%20Truck,%2036%20m.jpeg',
  '/products/LE%20All-Terrain%20Truck-Mounted%20Crane%20with%20Off-Road%20Semi-Trailer.jpeg',
  '/products/LE%20Truck-Mounted%20Crane%20with%20Container%20Platform,%203.2%20t.jpg',
  '/products/LE%20Truck-Mounted%20Crane,%2016%20t.jpeg',
  '/products/LE%20Truck-Mounted%20Crane,%2016.jpeg',
  '/products/LE%20Truck-Mounted%20Crane,%2025%20t%202.jpeg',
  '/products/LE%20Truck-Mounted%20Crane,%2025%20t.jpeg',
  '/products/LE%20Truck-Mounted%20Crane,%2032%20t.jpeg',
  '/products/LE%20Truck-Mounted%20Crane,%2050%20t.jpeg',
  '/products/LE%20Truck-Mounted%20Earth%20Auger%20%20Drilling%20Diameter%20%C3%98%20350%20mm%202.jpeg',
  '/products/LE%20Truck-Mounted%20Earth%20Auger%20%20Drilling%20Diameter%20%C3%98%20350%20mm.jpeg',
  '/products/LE%20Truck-Mounted%20Knuckle%20Boom%20Crane,%2010%E2%80%9315%20t.jpeg',
  '/products/LE%20Truck-Mounted%20Knuckle%20Boom%20Crane,%207%20t.jpeg',
  '/products/MT%20Dump%20Truck,%2020%20m%C2%B3%20%2025%20t.jpeg',
  '/products/OG%20Container%20Overhead%20Cranes.jpg',
  '/products/OG%20Magnet%20&%20Grab%20Crane.jpg',
  '/products/OG%20Overhead%20Bridge%20Crane.jpg',
  '/products/OG%20Single-Girder%20Gantry%20Crane.jpg',
  '/products/OG%20Truss%20Gantry%20Crane.jpg',
  '/products/SPM%20Administrative%20Convoy%20Special-Purpose%20Vehicle.jpg',
  '/products/SPM%20DNP%20(Installation%20for%20Lowering%20Pumps%20into%20Wells).jpeg',
  '/products/SPM%20Firefighting%20and%20Rescue%20Hydraulic%20Aerial%20Platform%20Truck%20(52%E2%80%9355%20m).jpg',
  '/products/SPM%20Firefighting%20and%20Rescue%20Hydraulic%20Aerial%20Platform,%2072%20m.jpeg',
  '/products/SPM%20Firefighting%20Vehicle%20with%20Aerial%20Ladder%20%20Rescue%20Platform.jpg',
  '/products/SPM%20Mobile%20Vehicle%20Repair%20Workshop%20(MVRW).jpeg',
  '/products/SPM%20Patrol%20and%20Guard%20Service%20Pickup%20(PPS).jpg',
  '/products/SPM%20URB-50%20Drilling%20Rig%20on%20All-Terrain%20Chassis%20(8%C3%978).jpeg',
  '/products/SPM%20Vacuum%20Sweeper%20Truck.jpeg',
  '/products/SPM%20ZIF%20Drilling%20Rig.jpeg',
  '/products/TT%20Acid%20Tank%20Semi-Trailer%20(14%20m%C2%B3%20%2016%20m%C2%B3%20%2020%20m%C2%B3).jpeg',
  '/products/TT%20Acid%20Tanker%20Truck%20%E2%80%93%208%20m%C2%B3%20%2010%20m%C2%B3%20%2012%20m%C2%B3%20%2014%20m%C2%B3.jpeg',
  '/products/TT%20Fuel%20Tank%20Semi-Trailer%20(30%20m%C2%B3%20%2033%20m%C2%B3%20%2035%20m%C2%B3%20%2040%20m%C2%B3).jpeg',
  '/products/TT%20Fuel%20Tank%20Truck%20&%20Refueller%20ATZ%20(4%20m%C2%B3%20%205%20m%C2%B3%20%206%20m%C2%B3)2.jpg',
  '/products/TT%20Fuel%20Tanker%20&%20Refueling%20Truck%20ATZ%20%E2%80%93%2016%20m%C2%B3%20%2018%20m%C2%B3.jpg',
  '/products/TT%20Fuel%20Tanker%20&%20Refueling%20Truck%20ATZ%20%E2%80%93%2020%20m%C2%B3%20%2025%20m%C2%B3.jpg',
  '/products/TT%20Fuel%20Tanker%20&%20Refueling%20Truck%20ATZ%20%E2%80%93%204%20m%C2%B3%20%205%20m%C2%B3%20%206%20m%C2%B3.jpg',
  '/products/TT%20Fuel%20Tanker%20&%20Refueling%20Truck%20ATZ%20%E2%80%93%208%20m%C2%B3%20%2010%20m%C2%B3%20%2012%20m%C2%B3.jpg',
  '/products/TT%20Trailer-Mounted%20Fuel%20Refueller%20ATZ%20(2%20m%C2%B3%20%203%20m%C2%B3%20%204%20m%C2%B3).jpg',
  '/products/TT%20Water%20Tanker%20for%20Drinking%20and%20Technical%20Water%20%E2%80%93%204%20m%C2%B3%20%205%20m%C2%B3%20%206%20m%C2%B3.jpeg',
  '/products/TT%20Water%20Tanker%20for%20Drinking%20and%20Technical%20Water%20(All-Terrain)%20%E2%80%93%2010%20m%C2%B3%20%2012%20m%C2%B3.jpeg',
  '/Pulatov.jpeg',
  '/sampo.png',
  '/serv.jpeg',
  '/spare.jpeg',
  '/spec_eng.jpeg',
  '/ssab.png',
  '/tech_cnc.jpg',
  '/warehouse.jpeg',
  '/warehouse.jpg',
  '/weichai.png',
  '/welding.jpeg',
  '/work.jpeg',
  '/Yunusov.jpeg',
] as const;

function decodeMediaUrl(url: string) {
  try {
    return decodeURI(url);
  } catch {
    return url;
  }
}

function toLooseMediaKey(url: string) {
  return decodeMediaUrl(url)
    .toLowerCase()
    .replace(/\\/g, '/')
    .replace(/[^a-z0-9/.-]+/g, '');
}

function humanizeSegment(value: string) {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildMediaItem(url: string): MediaItem {
  const decodedUrl = decodeMediaUrl(url);
  const segments = decodedUrl.split('/').filter(Boolean);
  const filename = segments[segments.length - 1] ?? decodedUrl;
  const groupId = segments.length > 1 ? segments[0] : 'site';
  const label = filename.replace(/\.[^.]+$/, '');

  return {
    id: url,
    url,
    decodedUrl,
    filename,
    label: label.replace(/\s+/g, ' ').trim(),
    groupId,
    groupLabel: MEDIA_GROUP_LABELS[groupId] ?? humanizeSegment(groupId),
    source: 'bundled',
  };
}

export const MEDIA_LIBRARY = MEDIA_URLS.map(buildMediaItem);

const MEDIA_BY_LOOSE_KEY = new Map(MEDIA_LIBRARY.map((item) => [toLooseMediaKey(item.decodedUrl), item.url]));

export const MEDIA_GROUPS = Array.from(
  new Map(MEDIA_LIBRARY.map((item) => [item.groupId, item.groupLabel])).entries(),
).map(([id, label]) => ({ id, label }));

export interface UploadedMediaInput {
  id: string;
  name: string;
  url: string;
  dataUrl: string;
  mimeType?: string;
}

const UPLOADED_MEDIA_PREFIX = '/__cms_media__/';
const uploadedMediaRegistry = new Map<string, UploadedMediaInput>();

export function createUploadedMediaItem(input: UploadedMediaInput): MediaItem {
  const decodedUrl = decodeMediaUrl(input.url);
  const filename = input.name.trim() || `media-${input.id}`;
  const groupId = input.mimeType?.startsWith('image/') ? 'uploads-images' : 'uploads-files';

  return {
    id: input.id,
    url: input.url,
    decodedUrl,
    filename,
    label: filename.replace(/\.[^.]+$/, '').replace(/\s+/g, ' ').trim(),
    groupId,
    groupLabel: groupId === 'uploads-images' ? 'Uploaded Images' : 'Uploaded Files',
    mimeType: input.mimeType,
    source: 'uploaded',
  };
}

export function getMediaLibrary(uploadedMedia: UploadedMediaInput[] = []) {
  const uploadedItems = uploadedMedia.map(createUploadedMediaItem);
  return [...uploadedItems, ...MEDIA_LIBRARY];
}

export function getMediaGroups(uploadedMedia: UploadedMediaInput[] = []) {
  return Array.from(
    new Map(getMediaLibrary(uploadedMedia).map((item) => [item.groupId, item.groupLabel])).entries(),
  ).map(([id, label]) => ({ id, label }));
}

export function isImageMedia(url: string, mimeType?: string) {
  if (mimeType) {
    return mimeType.startsWith('image/');
  }

  return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(url) || url.startsWith('data:image/');
}

export function normalizeMediaUrl(url: string) {
  return decodeMediaUrl(url).replace(/\\/g, '/');
}

export function createUploadedMediaUrl(id: string, name: string) {
  const safeName = encodeURIComponent(name.trim() || `media-${id}`);
  return `${UPLOADED_MEDIA_PREFIX}${id}/${safeName}`;
}

export function setUploadedMediaRegistry(items: UploadedMediaInput[]) {
  uploadedMediaRegistry.clear();
  items.forEach((item) => {
    uploadedMediaRegistry.set(normalizeMediaUrl(item.url), item);
  });
}

export function getUploadedMediaItem(url: string) {
  return uploadedMediaRegistry.get(normalizeMediaUrl(url));
}

export function resolveMediaInputUrl(url: string) {
  if (!url) {
    return '';
  }

  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const normalized = normalizeMediaUrl(url);
  const uploadedItem = uploadedMediaRegistry.get(normalized);

  if (uploadedItem) {
    return uploadedItem.dataUrl;
  }

  const exactMatch = MEDIA_LIBRARY.find((item) => item.decodedUrl === normalized || item.url === url);

  if (exactMatch) {
    return exactMatch.url;
  }

  return MEDIA_BY_LOOSE_KEY.get(toLooseMediaKey(normalized)) ?? encodeURI(normalized);
}

export function getMediaPreviewUrl(url: string) {
  return resolveMediaInputUrl(url);
}
