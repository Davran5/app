#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import sharp from 'sharp';

const MAX_WIDTH = 1920;
const QUALITY = 80;
const TARGET_BYTES = 300 * 1024;
const targetArg = process.argv[2];
const uploadsDir = targetArg
  ? path.resolve(process.cwd(), targetArg)
  : path.resolve(process.cwd(), 'public', 'uploads');

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
  }

  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)}KB`;
  }

  return `${bytes}B`;
}

async function optimizeImage(filePath) {
  const sourceBuffer = await fs.readFile(filePath);
  const image = sharp(sourceBuffer, { failOn: 'none' }).rotate();
  const metadata = await image.metadata();
  const extension = path.extname(filePath).toLowerCase();

  let pipeline = sharp(sourceBuffer, { failOn: 'none' }).rotate();

  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({
      width: MAX_WIDTH,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  switch (extension) {
    case '.jpg':
    case '.jpeg':
      pipeline = pipeline.jpeg({
        quality: QUALITY,
        mozjpeg: true,
      });
      break;
    case '.png':
      pipeline = pipeline.png({
        quality: QUALITY,
        compressionLevel: 9,
        palette: true,
      });
      break;
    case '.webp':
      pipeline = pipeline.webp({
        quality: QUALITY,
      });
      break;
    default:
      throw new Error(`Unsupported extension: ${extension}`);
  }

  const outputBuffer = await pipeline.toBuffer();
  const sourceSize = sourceBuffer.length;
  const outputSize = outputBuffer.length;
  const relativePath = path.relative(uploadsDir, filePath);
  const targetNote = outputSize > TARGET_BYTES ? ' [over 300KB]' : '';

  if (outputSize >= sourceSize) {
    console.log(`${relativePath}: ${formatBytes(sourceSize)} -> ${formatBytes(sourceSize)} (kept original)`);

    return {
      sourceSize,
      outputSize: sourceSize,
    };
  }

  const savedBytes = sourceSize - outputSize;

  await fs.writeFile(filePath, outputBuffer);

  console.log(
    `${relativePath}: ${formatBytes(sourceSize)} -> ${formatBytes(outputSize)} (saved ${formatBytes(savedBytes)})${targetNote}`,
  );

  return {
    sourceSize,
    outputSize,
  };
}

async function main() {
  try {
    const directoryStat = await fs.stat(uploadsDir);

    if (!directoryStat.isDirectory()) {
      throw new Error(`Not a directory: ${uploadsDir}`);
    }
  } catch (error) {
    console.error(`Uploads directory not found: ${uploadsDir}`);
    process.exitCode = 1;
    return;
  }

  const files = globSync('**/*.{jpg,jpeg,png,webp}', {
    absolute: true,
    cwd: uploadsDir,
    nocase: true,
    nodir: true,
  });

  if (files.length === 0) {
    console.log(`No images found in ${uploadsDir}`);
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const filePath of files) {
    try {
      const { sourceSize, outputSize } = await optimizeImage(filePath);
      totalBefore += sourceSize;
      totalAfter += outputSize;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`${path.relative(uploadsDir, filePath)}: failed (${message})`);
    }
  }

  console.log('');
  console.log(`Processed ${files.length} file(s).`);
  console.log(
    `Total: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (saved ${formatBytes(totalBefore - totalAfter)})`,
  );
}

await main();
