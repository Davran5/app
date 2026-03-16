import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const HERO_VIDEO_SOURCE_CANDIDATES = [
  path.resolve(projectRoot, 'media-source', 'herovid-source.mp4'),
  path.resolve(projectRoot, 'public', 'herovid.mp4'),
];
const HERO_VIDEO_OUTPUT = path.resolve(projectRoot, 'public', 'herovid-desktop.mp4');
const HERO_POSTER_SOURCE = path.resolve(projectRoot, 'public', 'hero_cover.png');
const HERO_POSTER_OUTPUT = path.resolve(projectRoot, 'public', 'hero-poster.webp');
const OG_IMAGE_OUTPUT = path.resolve(projectRoot, 'public', 'og-default.jpg');
const LOGO_SOURCE = path.resolve(projectRoot, 'public', 'logo.png');
const TARGET_VIDEO_SIZE_BYTES = 2_100_000;

function formatBytes(value) {
  if (value < 1024) {
    return `${value} B`;
  }

  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} KB`;
  }

  return `${(value / (1024 * 1024)).toFixed(2)} MB`;
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSourceVideoPath() {
  for (const candidate of HERO_VIDEO_SOURCE_CANDIDATES) {
    if (await pathExists(candidate)) {
      return candidate;
    }
  }

  throw new Error('Hero video source not found.');
}

async function runFfmpeg(args) {
  if (!ffmpegPath) {
    throw new Error('ffmpeg-static binary was not resolved.');
  }

  await new Promise((resolve, reject) => {
    const process = spawn(ffmpegPath, args, {
      stdio: 'ignore',
    });

    process.on('error', reject);
    process.on('close', (code) => {
      if (code === 0) {
        resolve(undefined);
        return;
      }

      reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function optimizeHeroVideo(sourcePath) {
  const variants = [
    { crf: '30', maxrate: '1600k', bufsize: '3200k' },
    { crf: '32', maxrate: '1300k', bufsize: '2600k' },
    { crf: '34', maxrate: '1100k', bufsize: '2200k' },
  ];

  for (const [index, variant] of variants.entries()) {
    const tempOutputPath = `${HERO_VIDEO_OUTPUT}.tmp-${index}.mp4`;

    await runFfmpeg([
      '-y',
      '-i',
      sourcePath,
      '-an',
      '-vf',
      'scale=1280:-2:force_original_aspect_ratio=decrease,fps=24',
      '-c:v',
      'libx264',
      '-preset',
      'slow',
      '-profile:v',
      'main',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      '-crf',
      variant.crf,
      '-maxrate',
      variant.maxrate,
      '-bufsize',
      variant.bufsize,
      tempOutputPath,
    ]);

    const size = (await fs.stat(tempOutputPath)).size;

    if (size <= TARGET_VIDEO_SIZE_BYTES || index === variants.length - 1) {
      await fs.rename(tempOutputPath, HERO_VIDEO_OUTPUT);
      return size;
    }

    await fs.unlink(tempOutputPath);
  }

  return 0;
}

async function buildHeroPoster() {
  await sharp(HERO_POSTER_SOURCE)
    .resize(1280, 720, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78 })
    .toFile(HERO_POSTER_OUTPUT);
}

async function buildOgDefault() {
  const logoBuffer = await sharp(LOGO_SOURCE).resize({ width: 220 }).png().toBuffer();
  const overlay = Buffer.from(
    `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(11,16,32,0.16)" />
          <stop offset="100%" stop-color="rgba(11,16,32,0.48)" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)" />
      <rect x="60" y="470" width="520" height="6" rx="3" fill="#F6B947" opacity="0.9" />
      <text x="60" y="380" fill="#ffffff" font-family="Arial, sans-serif" font-size="58" font-weight="700" letter-spacing="2">
        KRANTAS GROUP
      </text>
      <text x="60" y="438" fill="#ffffff" font-family="Arial, sans-serif" font-size="28" opacity="0.92">
        Industrial vehicles, cranes, custom engineering
      </text>
    </svg>`,
  );

  await sharp(HERO_POSTER_SOURCE)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logoBuffer, top: 54, left: 60 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OG_IMAGE_OUTPUT);
}

async function main() {
  const sourceVideoPath = await resolveSourceVideoPath();
  const inputSize = (await fs.stat(sourceVideoPath)).size;

  const outputVideoSize = await optimizeHeroVideo(sourceVideoPath);
  await buildHeroPoster();
  await buildOgDefault();

  console.log(`Hero video: ${formatBytes(inputSize)} -> ${formatBytes(outputVideoSize)}`);
  console.log(`Poster written to ${path.relative(projectRoot, HERO_POSTER_OUTPUT)}`);
  console.log(`OG image written to ${path.relative(projectRoot, OG_IMAGE_OUTPUT)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
