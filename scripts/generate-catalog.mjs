import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(projectRoot, 'src', 'data', 'catalog-source.ru.json');
const translationPath = path.join(projectRoot, 'src', 'data', 'catalog-translations.generated.json');
const catalogPath = path.join(projectRoot, 'src', 'data', 'catalog.generated.json');
const imageOutputDir = path.join(projectRoot, 'public', 'products', 'catalog');
const externalImageDir =
  process.env.KRANTAS_PRODUCT_IMAGE_DIR ||
  'C:\\Users\\Devron\\Desktop\\KrantosWeb\\app\\public\\products';

const catalogVersion = '2026-07-31.1';
const excludedRows = new Set([
  43, // Duplicate of row 42: identical specifications and source image.
]);

const categoryDefinitions = [
  {
    id: 'lifting-equipment',
    rows: [2, 21],
    imageRow: 5,
  },
  {
    id: 'drilling-workshops',
    rows: [22, 29],
    extraRows: [71, 72, 73],
    imageRow: 22,
  },
  {
    id: 'dump-trucks',
    rows: [30, 34],
    imageRow: 30,
  },
  {
    id: 'cargo-vehicles',
    rows: [35, 36],
    extraRows: [74, 75, 76, 77, 78, 79, 88],
    imageRow: 35,
  },
  {
    id: 'firefighting-rescue',
    rows: [37, 44],
    imageRow: 38,
  },
  {
    id: 'special-purpose',
    rows: [45, 51],
    extraRows: [86, 87],
    imageRow: 45,
  },
  {
    id: 'overhead-gantry',
    rows: [52, 54],
    imageRow: 52,
  },
  {
    id: 'tank-trucks',
    rows: [55, 64],
    extraRows: [84],
    imageRow: 58,
  },
  {
    id: 'municipal-road',
    rows: [65, 70],
    extraRows: [80, 81, 82, 83, 85],
    imageRow: 80,
  },
  {
    id: 'trailers-semitrailers',
    rows: [89, 98],
    imageRow: 89,
  },
  {
    id: 'agricultural',
    rows: [99, 106],
    imageRow: 99,
  },
];

const legacyIds = {
  4: 'le-crane-50t',
  5: 'le-crane-32t',
  7: 'le-crane-25t',
  8: 'le-crane-16t',
  9: 'le-crane-10-15t',
  10: 'le-crane-7t',
  13: 'le-crane-container-3.2t',
  14: 'le-all-terrain-crane',
  16: 'le-earth-auger',
  18: 'le-aerial-platform-36m',
  19: 'le-aerial-platform-28m',
  21: 'le-aerial-platform-18m',
  23: 'spm-mobile-workshop',
  25: 'spm-drilling-rig-urb50',
  28: 'spm-drilling-rig-zif',
  29: 'spm-dnp-pump-installation',
  30: 'mt-mining-truck-25t',
  31: 'dt-dump-truck-16m3',
  32: 'dt-dump-truck-8m3',
  33: 'dt-dump-truck-4m3',
  37: 'spm-firefighting-ladder',
  38: 'spm-firefighting-platform',
  45: 'spm-patrol-pickup',
  47: 'spm-admin-convoy',
  52: 'og-overhead-bridge',
  53: 'og-container-overhead',
  54: 'og-magnet-grab',
  55: 'tt-fuel-tanker-20-25m3',
  56: 'tt-fuel-tanker-16-18m3',
  58: 'tt-fuel-tanker-8-12m3',
  59: 'tt-fuel-tanker-4-6m3',
  61: 'tt-trailer-refueller-2-4m3',
  62: 'tt-water-tanker-allterrain',
  64: 'tt-water-tanker-4-6m3',
  80: 'spm-vacuum-sweeper',
  84: 'tt-acid-tanker-8-14m3',
  89: 'tt-fuel-semi-trailer',
  91: 'tt-acid-semi-trailer',
  92: 'dt-tipper-semi-trailer',
  105: 'am-tractor-n81c',
  106: 'am-tractor-n81',
};

const imageOverrides = {
  43: 'Пожарно-спасательный автомобиль — кузов пикап.png',
  48: 'Мультилифт 25  27 т — Контейнер   Компактор контейнер.png',
  49: 'Мультилифт 25  27 т — оКонтейнер   Компактор контейнер.png',
  88: 'Тентованный грузовой автомобиль — 10 т.png',
  99: 'AM John Deere6140B.png',
  100: 'AM Belarus80.1.png',
  101: 'AM DF404.png',
  102: 'AM TAT DF 904.png',
  103: 'AM Belarus80.1.png',
  104: 'AM Universal Tractor NURAFSHON N 81 C (Belarus-based).jpg',
  105: 'AM Universal Tractor NURAFSHON N 81 C (Belarus-based).jpg',
  106: 'AM Universal Tractor NURAFSHON N 81 (4×4, Belarus-based).jpeg',
};

function normalizeForMatch(value) {
  return value
    .normalize('NFKD')
    .toLocaleLowerCase('ru')
    .replace(/\.[^.]+$/, '')
    .replace(/[«»"'(),./\\—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value) {
  const transliteration = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
    з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
    ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu',
    я: 'ya',
  };

  return value
    .toLocaleLowerCase('ru')
    .split('')
    .map((character) => transliteration[character] ?? character)
    .join('')
    .replace(/×/g, 'x')
    .replace(/³/g, '3')
    .replace(/ø/g, 'diameter')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 72);
}

function categoryForRow(row) {
  return categoryDefinitions.find(({ rows, extraRows = [] }) => {
    return (row >= rows[0] && row <= rows[1]) || extraRows.includes(row);
  });
}

function splitLines(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function similarity(left, right) {
  const leftWords = new Set(normalizeForMatch(left).split(' '));
  const rightWords = new Set(normalizeForMatch(right).split(' '));
  const intersection = [...leftWords].filter((word) => rightWords.has(word)).length;
  const union = new Set([...leftWords, ...rightWords]).size;
  return union === 0 ? 0 : intersection / union;
}

async function locateImage(row, files) {
  const override = imageOverrides[row.row];
  if (override && files.includes(override)) {
    return { file: override, score: 1 };
  }

  const ranked = files
    .map((file) => ({ file, score: similarity(row.name, file) }))
    .sort((left, right) => right.score - left.score);
  return ranked[0];
}

function getTranslation(translations, language, productId, field, fallback) {
  return translations?.[language]?.productsData?.[productId]?.[field] ?? fallback;
}

function buildProductTranslations(row, productId, translations) {
  const fallbackSpecs = splitLines(row.specs);
  const fallbackFeatures = splitLines(row.equipment);
  const result = {};

  for (const language of ['en', 'ru', 'uz', 'de']) {
    const translated = translations?.[language]?.productsData?.[productId] ?? {};
    result[language] = {
      name: translated.name ?? row.name,
      description:
        translated.description ??
        `${translated.name ?? row.name} by KRANTAS Group.`,
      fullDescription:
        translated.fullDescription ??
        `${translated.name ?? row.name} is configured for demanding professional operations.`,
      specs: Object.fromEntries(
        fallbackSpecs.map((line, index) => [
          `detail${String(index + 1).padStart(2, '0')}`,
          translated.specs?.[`detail${String(index + 1).padStart(2, '0')}`] ?? line,
        ]),
      ),
      features: fallbackFeatures.map((line, index) => translated.features?.[index] ?? line),
    };
  }

  return result;
}

const sourceRows = JSON.parse(await fs.readFile(sourcePath, 'utf8'));
const translations = JSON.parse(await fs.readFile(translationPath, 'utf8'));
const sourceImageFiles = await fs.readdir(externalImageDir);
await fs.mkdir(imageOutputDir, { recursive: true });

const products = [];
const outputTranslations = Object.fromEntries(
  ['en', 'ru', 'uz', 'de'].map((language) => [
    language,
    {
      categories: translations[language].categories,
      productsData: {},
    },
  ]),
);
const imageReport = [];

for (const row of sourceRows) {
  if (excludedRows.has(row.row)) {
    continue;
  }

  const category = categoryForRow(row.row);
  if (!category) {
    throw new Error(`No category mapping for workbook row ${row.row}.`);
  }

  const productId = legacyIds[row.row] ?? `catalog-${String(row.row).padStart(3, '0')}-${slugify(row.name)}`;
  const localized = buildProductTranslations(row, productId, translations);
  const matchedImage = await locateImage(row, sourceImageFiles);
  const outputImageName = `${productId}.webp`;
  const outputImagePath = path.join(imageOutputDir, outputImageName);
  const sourceImagePath = path.join(externalImageDir, matchedImage.file);

  await sharp(sourceImagePath)
    .rotate()
    .resize({ width: 1400, height: 1000, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(outputImagePath);

  const image = `/products/catalog/${outputImageName}`;
  const base = localized.en;
  products.push({
    id: productId,
    name: base.name,
    category: translations.en.categories[category.id].name,
    categoryId: category.id,
    description: base.description,
    fullDescription: base.fullDescription,
    image,
    gallery: [image],
    specs: base.specs,
    features: base.features,
  });

  for (const language of ['en', 'ru', 'uz', 'de']) {
    outputTranslations[language].productsData[productId] = localized[language];
  }

  imageReport.push({
    row: row.row,
    productId,
    productName: row.name,
    sourceImage: matchedImage.file,
    score: Number(matchedImage.score.toFixed(3)),
  });
}

const categories = categoryDefinitions.map((definition) => {
  const localized = translations.en.categories[definition.id];
  const imageProduct = products.find((product) => {
    const source = sourceRows.find((row) => row.row === definition.imageRow);
    return product.id === (legacyIds[source.row] ?? `catalog-${String(source.row).padStart(3, '0')}-${slugify(source.name)}`);
  });

  return {
    id: definition.id,
    name: localized.name,
    description: localized.description,
    image: imageProduct.image,
  };
});

const catalog = {
  version: catalogVersion,
  categories,
  products,
  featuredProductIds: products.slice(0, 8).map((product) => product.id),
};

await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
await fs.writeFile(translationPath, `${JSON.stringify(outputTranslations, null, 2)}\n`, 'utf8');
await fs.writeFile(
  path.join(projectRoot, 'tmp', 'catalog-image-report.json'),
  `${JSON.stringify(imageReport, null, 2)}\n`,
  'utf8',
);

console.log(`Generated ${products.length} products in ${categories.length} categories.`);
console.log(`Image match report: ${path.join(projectRoot, 'tmp', 'catalog-image-report.json')}`);
