export interface ProductSpecRow {
  key: string;
  label: string;
  value: string;
}

function humanizeSpecKey(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function parseProductSpec(key: string, content: string): ProductSpecRow {
  const value = content.trim();
  const colonIndex = value.indexOf(':');
  const dashMatch = value.match(/\s+-\s+/);
  const separatorIndex =
    colonIndex >= 0 ? colonIndex : dashMatch?.index ?? -1;
  const separatorLength = colonIndex >= 0 ? 1 : dashMatch?.[0].length ?? 0;

  if (separatorIndex > 0) {
    return {
      key,
      label: value.slice(0, separatorIndex).trim(),
      value: value.slice(separatorIndex + separatorLength).trim(),
    };
  }

  if (/^detail\d+$/i.test(key)) {
    return {
      key,
      label: value,
      value: '',
    };
  }

  return {
    key,
    label: humanizeSpecKey(key),
    value,
  };
}

export function getProductSpecRows(
  specs: Record<string, string | undefined> | undefined,
): ProductSpecRow[] {
  if (!specs) {
    return [];
  }

  return Object.entries(specs)
    .filter((entry): entry is [string, string] => typeof entry[1] === 'string' && entry[1].trim().length > 0)
    .map(([key, value]) => parseProductSpec(key, value));
}

export function compactMeasurementSpacing(content: string) {
  return content.replace(
    /(\d(?:[.,]\d+)?(?:\s*[+–—-]\s*\d(?:[.,]\d+)?)?)\s+(?=(?:mm|cm|km|m³|m²|m|kg|t|l|kW|kV|V|bar|MPa|rpm|hp|°C)\b)/gi,
    '$1',
  );
}
