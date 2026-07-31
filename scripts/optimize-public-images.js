#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(projectRoot, 'public');
const optimizedMediaMapPath = path.resolve(projectRoot, 'src', 'lib', 'optimized-media.ts');
const responsiveVariantNames = new Set([
  'about_factory',
  'our_vis',
  'cust_sol',
  'logo',
]);

const imageFiles = globSync('**/*.{jpg,jpeg,png}', {
  absolute: true,
  cwd: publicDir,
  nocase: true,
  nodir: true,
});
const sourceGroups = imageFiles.reduce((groups, filePath) => {
  const extension = path.extname(filePath);
  const basePath = filePath.slice(0, -extension.length);
  const group = groups.get(basePath) ?? [];

  group.push(filePath);
  groups.set(basePath, group);

  return groups;
}, new Map());

const transparentLogoNames = new Set([
  'allison',
  'aselan',
  'bosch',
  'comet',
  'cukurova',
  'hydro',
  'hyundai',
  'kia',
  'kozmaksan',
  'logo',
  'sampo',
  'ssab',
  'weichai',
]);

function formatBytes(value) {
  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

function getOptimizationProfile(filePath) {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/').toLowerCase();
  const basename = path.basename(filePath, path.extname(filePath)).toLowerCase();

  if (transparentLogoNames.has(basename)) {
    return {
      maxWidth: basename === 'logo' ? 420 : 520,
      quality: 88,
      alphaQuality: 95,
      effort: 6,
    };
  }

  if (relativePath.startsWith('products/')) {
    return {
      maxWidth: 1400,
      quality: 82,
      alphaQuality: 90,
      effort: 5,
    };
  }

  if (basename.startsWith('cover_') || basename === 'cust_sol') {
    return {
      maxWidth: 960,
      quality: 78,
      alphaQuality: 90,
      effort: 5,
    };
  }

  if (basename === 'hero_cover') {
    return {
      maxWidth: 1440,
      quality: 78,
      alphaQuality: 90,
      effort: 5,
    };
  }

  return {
    maxWidth: 1280,
    quality: 80,
    alphaQuality: 90,
    effort: 5,
  };
}

function getResponsiveProfile(filePath) {
  const basename = path.basename(filePath, path.extname(filePath)).toLowerCase();

  if (basename === 'logo') {
    return {
      widths: [167, 240, 320],
      quality: 86,
      alphaQuality: 95,
      effort: 6,
    };
  }

  if (basename === 'about_factory' || basename === 'our_vis') {
    return {
      widths: [420, 720, 960, 1280],
      quality: 76,
      alphaQuality: 90,
      effort: 5,
    };
  }

  if (basename === 'cust_sol' || basename.startsWith('cover_')) {
    return {
      widths: [360, 520, 720, 960],
      quality: 74,
      alphaQuality: 90,
      effort: 5,
    };
  }

  return null;
}

function shouldBuildResponsiveVariants(filePath) {
  const basename = path.basename(filePath, path.extname(filePath)).toLowerCase();

  return responsiveVariantNames.has(basename) || basename.startsWith('cover_');
}

function getOutputPath(filePath) {
  const extension = path.extname(filePath);
  const basePath = filePath.slice(0, -extension.length);
  const hasSiblingCollision = (sourceGroups.get(basePath)?.length ?? 0) > 1;

  if (hasSiblingCollision) {
    return `${filePath}.webp`;
  }

  return `${basePath}.webp`;
}

function getResponsiveOutputPath(filePath, width) {
  const extension = path.extname(filePath);
  const basePath = filePath.slice(0, -extension.length);

  return `${basePath}-w${width}.webp`;
}

function toPublicUrl(filePath) {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');

  return encodeURI(`/${relativePath}`);
}

async function removeIfExists(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function optimizeToWebp(filePath) {
  const sourceBuffer = await fs.readFile(filePath);
  const sourceSize = sourceBuffer.length;
  const outputPath = getOutputPath(filePath);
  const profile = getOptimizationProfile(filePath);

  const image = sharp(sourceBuffer, { failOn: 'none' }).rotate();
  const metadata = await image.metadata();
  let pipeline = sharp(sourceBuffer, { failOn: 'none' }).rotate();

  if (metadata.width && metadata.width > profile.maxWidth) {
    pipeline = pipeline.resize({
      width: profile.maxWidth,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const outputBuffer = await pipeline
    .webp({
      quality: profile.quality,
      alphaQuality: profile.alphaQuality,
      effort: profile.effort,
    })
    .toBuffer();

  if (outputBuffer.length >= sourceSize) {
    await removeIfExists(outputPath);

    return {
      input: path.relative(publicDir, filePath).replace(/\\/g, '/'),
      output: path.relative(publicDir, outputPath).replace(/\\/g, '/'),
      sourceUrl: toPublicUrl(filePath),
      outputUrl: toPublicUrl(outputPath),
      sourceSize,
      outputSize: sourceSize,
      wasWritten: false,
    };
  }

  await fs.writeFile(outputPath, outputBuffer);

  return {
    input: path.relative(publicDir, filePath).replace(/\\/g, '/'),
    output: path.relative(publicDir, outputPath).replace(/\\/g, '/'),
    sourceUrl: toPublicUrl(filePath),
    outputUrl: toPublicUrl(outputPath),
    sourceSize,
    outputSize: outputBuffer.length,
    wasWritten: true,
  };
}

async function optimizeResponsiveVariants(filePath) {
  if (!shouldBuildResponsiveVariants(filePath)) {
    return [];
  }

  const profile = getResponsiveProfile(filePath);

  if (!profile) {
    return [];
  }

  const sourceBuffer = await fs.readFile(filePath);
  const sourceSize = sourceBuffer.length;
  const metadata = await sharp(sourceBuffer, { failOn: 'none' }).rotate().metadata();
  const variants = [];

  for (const width of profile.widths) {
    if (metadata.width && metadata.width < width) {
      continue;
    }

    const outputPath = getResponsiveOutputPath(filePath, width);
    const outputBuffer = await sharp(sourceBuffer, { failOn: 'none' })
      .rotate()
      .resize({
        width,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: profile.quality,
        alphaQuality: profile.alphaQuality,
        effort: profile.effort,
      })
      .toBuffer();

    if (outputBuffer.length >= sourceSize) {
      await removeIfExists(outputPath);
      continue;
    }

    await fs.writeFile(outputPath, outputBuffer);
    variants.push({
      width,
      url: toPublicUrl(outputPath),
      outputSize: outputBuffer.length,
    });
  }

  return variants;
}

async function removeStaleCollisionOutputs() {
  for (const [basePath, group] of sourceGroups.entries()) {
    if (group.length > 1) {
      await removeIfExists(`${basePath}.webp`);
    }
  }
}

async function writeOptimizedMediaMap(entries, responsiveEntries) {
  const sortedEntries = entries.sort(([sourceA], [sourceB]) => sourceA.localeCompare(sourceB));
  const sortedResponsiveEntries = responsiveEntries.sort(([sourceA], [sourceB]) =>
    sourceA.localeCompare(sourceB),
  );
  const lines = [
    'export const OPTIMIZED_MEDIA_URL_BY_SOURCE = {',
    ...sortedEntries.map(([sourceUrl, outputUrl]) => `  '${sourceUrl}': '${outputUrl}',`),
    '} as const;',
    '',
    'export const RESPONSIVE_MEDIA_URLS_BY_SOURCE = {',
    ...sortedResponsiveEntries.map(
      ([sourceUrl, variants]) =>
        `  '${sourceUrl}': [${variants
          .map((variant) => `{ width: ${variant.width}, url: '${variant.url}' }`)
          .join(', ')}],`,
    ),
    '} as const;',
    '',
  ];

  await fs.writeFile(optimizedMediaMapPath, lines.join('\n'));
}

async function main() {
  if (imageFiles.length === 0) {
    console.log('No public JPG, JPEG, or PNG files found.');
    await writeOptimizedMediaMap([], []);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let converted = 0;
  let skipped = 0;
  let responsiveConverted = 0;
  const optimizedMediaEntries = [];
  const responsiveMediaEntries = [];

  await removeStaleCollisionOutputs();

  for (const filePath of imageFiles) {
    try {
      const result = await optimizeToWebp(filePath);
      totalBefore += result.sourceSize;
      totalAfter += result.outputSize;

      if (result.wasWritten) {
        converted += 1;
        optimizedMediaEntries.push([result.sourceUrl, result.outputUrl]);
      } else {
        skipped += 1;
      }

      console.log(
        `${result.input} -> ${result.output}: ${formatBytes(result.sourceSize)} -> ${formatBytes(result.outputSize)}${
          result.wasWritten ? '' : ' (kept original)'
        }`,
      );

      const responsiveVariants = await optimizeResponsiveVariants(filePath);

      if (responsiveVariants.length > 0) {
        responsiveConverted += responsiveVariants.length;
        responsiveMediaEntries.push([result.sourceUrl, responsiveVariants]);
        console.log(
          `  responsive: ${responsiveVariants
            .map((variant) => `${variant.width}w ${formatBytes(variant.outputSize)}`)
            .join(', ')}`,
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`${path.relative(publicDir, filePath)}: failed (${message})`);
    }
  }

  await writeOptimizedMediaMap(optimizedMediaEntries, responsiveMediaEntries);

  console.log('');
  console.log(`Generated ${converted} WebP file(s).`);
  console.log(`Generated ${responsiveConverted} responsive WebP variant(s).`);
  console.log(`Kept ${skipped} original file(s) where WebP was not smaller.`);
  console.log(`Optimized media map written to ${path.relative(projectRoot, optimizedMediaMapPath)}`);
  console.log(
    `Total comparable size: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (saved ${formatBytes(totalBefore - totalAfter)})`,
  );
}

await main();
