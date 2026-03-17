declare global {
  interface Window {
    __KRANTAS_RUNTIME_CONFIG__?: {
      googleMapsApiKey?: string;
      googleMapsMapId?: string;
      cspNonce?: string;
    };
  }
}

function readRuntimeConfig() {
  if (typeof window === 'undefined') {
    return {};
  }

  return window.__KRANTAS_RUNTIME_CONFIG__ || {};
}

export function getGoogleMapsApiKey() {
  return (
    readRuntimeConfig().googleMapsApiKey?.trim() ||
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ||
    ''
  );
}

export function getGoogleMapsMapId() {
  return (
    readRuntimeConfig().googleMapsMapId?.trim() ||
    import.meta.env.VITE_GOOGLE_MAPS_MAP_ID?.trim() ||
    ''
  );
}

export function getCspNonce() {
  return readRuntimeConfig().cspNonce?.trim() || '';
}
