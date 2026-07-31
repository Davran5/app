import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const translationPath = path.join(
  projectRoot,
  'src',
  'data',
  'catalog-translations.generated.json',
);
const outputPath = path.join(projectRoot, 'src', 'data', 'product-translation-seed.json');

function flattenStrings(value, prefix = '') {
  if (typeof value === 'string') {
    return prefix ? { [prefix]: value } : {};
  }

  if (Array.isArray(value)) {
    return value.reduce(
      (result, item, index) => ({
        ...result,
        ...flattenStrings(item, prefix ? `${prefix}.${index}` : String(index)),
      }),
      {},
    );
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).reduce(
      (result, [key, nestedValue]) => ({
        ...result,
        ...flattenStrings(nestedValue, prefix ? `${prefix}.${key}` : key),
      }),
      {},
    );
  }

  return {};
}

const translations = JSON.parse(await fs.readFile(translationPath, 'utf8'));
const seed = Object.fromEntries(
  ['en', 'ru', 'uz', 'de'].map((language) => [
    language,
    {
      ...flattenStrings(translations[language].categories, 'categories'),
      ...flattenStrings(translations[language].productsData, 'productsData'),
    },
  ]),
);

await fs.writeFile(outputPath, `${JSON.stringify(seed, null, 2)}\n`, 'utf8');
console.log(`Generated ${outputPath}`);
