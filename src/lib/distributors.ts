import type { DistributorKind, DistributorLocation } from '../data/distributors';
import type { Language, getTranslation } from '../data/translations';

type DistributorDictionary = ReturnType<typeof getTranslation>['distributors'];

interface DistributorUiCopy {
  heroTitle: string;
  heroDescription: string;
  statsTotal: string;
  statsUzbekistan: string;
  statsMarkets: string;
  findNearest: string;
  locating: string;
  resetFilters: string;
  clearSelection: string;
  results: string;
  resultsDescription: string;
  sortedByDistance: string;
  selectionHint: string;
  mapTitle: string;
  mapDescription: string;
  mapHint: string;
  selectedLocation: string;
  call: string;
  clearSearch: string;
  locationNotSupported: string;
  locationPermissionDenied: string;
  locationLookupFailed: string;
  nearestMatch: string;
  serviceLabel: string;
  regionalLabel: string;
  loadingMap: string;
  mapUnavailable: string;
  distanceLabel: (distance: string) => string;
}

const distributorUiCopy: Record<Language, DistributorUiCopy> = {
  en: {
    heroTitle: 'Find KRANTAS dealers without friction',
    heroDescription:
      'Search by city, region, or partner name, compare nearby service points, and move straight into directions or a call.',
    statsTotal: 'Locations',
    statsUzbekistan: 'In Uzbekistan',
    statsMarkets: 'Markets',
    findNearest: 'Find nearest',
    locating: 'Locating...',
    resetFilters: 'Reset filters',
    clearSelection: 'Clear selection',
    results: 'Locations',
    resultsDescription: 'Select a card to focus the map and open quick actions.',
    sortedByDistance: 'Sorted by distance',
    selectionHint: 'Select a location to open directions, contact details, and a focused map view.',
    mapTitle: 'Dealer map',
    mapDescription: 'Pins update instantly with your search and market filters.',
    mapHint: 'Select a card or map pin',
    selectedLocation: 'Selected location',
    call: 'Call',
    clearSearch: 'Clear',
    locationNotSupported: 'This browser does not support geolocation.',
    locationPermissionDenied: 'Location access was denied.',
    locationLookupFailed: 'We could not determine your position.',
    nearestMatch: 'Nearest match',
    serviceLabel: 'Service Partner',
    regionalLabel: 'Regional Center',
    loadingMap: 'Loading dealer network',
    mapUnavailable: 'Map is currently unavailable.',
    distanceLabel: (distance) => `${distance} km away`,
  },
  ru: {
    heroTitle: 'Найдите дилера KRANTAS без лишних шагов',
    heroDescription:
      'Ищите по городу, региону или названию партнера, сравнивайте ближайшие сервисные точки и сразу переходите к маршруту или звонку.',
    statsTotal: 'Локации',
    statsUzbekistan: 'В Узбекистане',
    statsMarkets: 'Рынки',
    findNearest: 'Найти ближайшего',
    locating: 'Определяем...',
    resetFilters: 'Сбросить фильтры',
    clearSelection: 'Снять выбор',
    results: 'Локации',
    resultsDescription: 'Выберите карточку, чтобы сфокусировать карту и открыть быстрые действия.',
    sortedByDistance: 'Сортировка по расстоянию',
    selectionHint:
      'Выберите локацию, чтобы открыть маршрут, контакты и сфокусированный вид карты.',
    mapTitle: 'Карта дилеров',
    mapDescription: 'Метки на карте обновляются по вашему поиску и фильтрам.',
    mapHint: 'Выберите карточку или метку на карте',
    selectedLocation: 'Выбранная локация',
    call: 'Позвонить',
    clearSearch: 'Очистить',
    locationNotSupported: 'Этот браузер не поддерживает геолокацию.',
    locationPermissionDenied: 'Доступ к геолокации отклонен.',
    locationLookupFailed: 'Не удалось определить ваше местоположение.',
    nearestMatch: 'Ближайший вариант',
    serviceLabel: 'Сервисный партнер',
    regionalLabel: 'Региональный центр',
    loadingMap: 'Загрузка дилерской сети',
    mapUnavailable: 'Карта сейчас недоступна.',
    distanceLabel: (distance) => `${distance} км`,
  },
  uz: {
    heroTitle: 'KRANTAS dilerlarini tez va aniq toping',
    heroDescription:
      'Shahar, hudud yoki hamkor nomi bo‘yicha qidiring, yaqin servis nuqtalarini solishtiring va darhol yo‘nalish yoki qo‘ng‘iroqqa o‘ting.',
    statsTotal: 'Manzillar',
    statsUzbekistan: 'O‘zbekistonda',
    statsMarkets: 'Bozorlar',
    findNearest: 'Eng yaqinini topish',
    locating: 'Aniqlanmoqda...',
    resetFilters: 'Filtrlarni tozalash',
    clearSelection: 'Tanlovni bekor qilish',
    results: 'Manzillar',
    resultsDescription: 'Kartani markazga olish va tezkor amallarni ochish uchun kartani tanlang.',
    sortedByDistance: 'Masofa bo‘yicha saralangan',
    selectionHint:
      'Yo‘nalish, kontaktlar va xaritaning aniq ko‘rinishini ochish uchun manzilni tanlang.',
    mapTitle: 'Diler xaritasi',
    mapDescription: 'Qidiruv va bozor filtrlari bo‘yicha pinlar darhol yangilanadi.',
    mapHint: 'Kartani yoki xarita pinini tanlang',
    selectedLocation: 'Tanlangan manzil',
    call: 'Qo‘ng‘iroq qilish',
    clearSearch: 'Tozalash',
    locationNotSupported: 'Bu brauzer geolokatsiyani qo‘llab-quvvatlamaydi.',
    locationPermissionDenied: 'Joylashuvga ruxsat berilmadi.',
    locationLookupFailed: 'Joylashuvingizni aniqlab bo‘lmadi.',
    nearestMatch: 'Eng yaqin natija',
    serviceLabel: 'Servis hamkori',
    regionalLabel: 'Mintaqaviy markaz',
    loadingMap: 'Dilerlar tarmog‘i yuklanmoqda',
    mapUnavailable: 'Xarita hozircha mavjud emas.',
    distanceLabel: (distance) => `${distance} km`,
  },
  de: {
    heroTitle: 'KRANTAS Händler ohne Umwege finden',
    heroDescription:
      'Suchen Sie nach Stadt, Region oder Partnername, vergleichen Sie nahe Servicepunkte und wechseln Sie direkt zu Route oder Anruf.',
    statsTotal: 'Standorte',
    statsUzbekistan: 'In Usbekistan',
    statsMarkets: 'Märkte',
    findNearest: 'Nächsten finden',
    locating: 'Standort wird ermittelt...',
    resetFilters: 'Filter zurücksetzen',
    clearSelection: 'Auswahl aufheben',
    results: 'Standorte',
    resultsDescription: 'Wählen Sie eine Karte, um die Karte zu fokussieren und Schnellaktionen zu öffnen.',
    sortedByDistance: 'Nach Entfernung sortiert',
    selectionHint:
      'Wählen Sie einen Standort, um Route, Kontaktdaten und eine fokussierte Kartenansicht zu öffnen.',
    mapTitle: 'Händlerkarte',
    mapDescription: 'Pins reagieren sofort auf Suche und Marktfilter.',
    mapHint: 'Karte oder Pin auswählen',
    selectedLocation: 'Ausgewählter Standort',
    call: 'Anrufen',
    clearSearch: 'Löschen',
    locationNotSupported: 'Dieser Browser unterstützt keine Geolokalisierung.',
    locationPermissionDenied: 'Der Zugriff auf den Standort wurde abgelehnt.',
    locationLookupFailed: 'Ihre Position konnte nicht bestimmt werden.',
    nearestMatch: 'Nächster Treffer',
    serviceLabel: 'Servicepartner',
    regionalLabel: 'Regionalzentrum',
    loadingMap: 'Händlernetz wird geladen',
    mapUnavailable: 'Die Karte ist derzeit nicht verfügbar.',
    distanceLabel: (distance) => `${distance} km entfernt`,
  },
};

export function getDistributorUiCopy(language: Language) {
  return distributorUiCopy[language];
}

export function getDistributorAreaLabel(
  location: DistributorLocation,
  distributors: DistributorDictionary,
) {
  if (location.market === 'uzbekistan' && location.regionKey) {
    return distributors.regions[location.regionKey];
  }

  if (location.countryKey) {
    return distributors.countries[location.countryKey];
  }

  return location.city;
}

export function getDistributorKindLabel(
  kind: DistributorKind,
  distributors: DistributorDictionary,
  language: Language,
) {
  if (kind === 'hq') {
    return distributors.info.hq;
  }

  if (kind === 'dealer') {
    return distributors.info.dealer;
  }

  if (kind === 'service') {
    return distributorUiCopy[language].serviceLabel;
  }

  return distributorUiCopy[language].regionalLabel;
}
