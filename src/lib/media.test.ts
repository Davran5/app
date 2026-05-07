import assert from 'node:assert';
import test from 'node:test';
import { isImageMedia } from './media';

test('isImageMedia should identify images by mimeType', () => {
  assert.strictEqual(isImageMedia('test.file', 'image/jpeg'), true);
  assert.strictEqual(isImageMedia('test.file', 'image/png'), true);
  assert.strictEqual(isImageMedia('test.file', 'image/svg+xml'), true);
  assert.strictEqual(isImageMedia('test.file', 'image/webp'), true);
  assert.strictEqual(isImageMedia('test.file', 'image/avif'), true);
  assert.strictEqual(isImageMedia('test.file', 'image/gif'), true);
});

test('isImageMedia should return false for non-image mimeTypes', () => {
  assert.strictEqual(isImageMedia('test.jpg', 'video/mp4'), false);
  assert.strictEqual(isImageMedia('test.png', 'application/pdf'), false);
  assert.strictEqual(isImageMedia('test.gif', 'text/plain'), false);
});

test('isImageMedia should identify images by extension when mimeType is missing', () => {
  assert.strictEqual(isImageMedia('test.jpg'), true);
  assert.strictEqual(isImageMedia('test.jpeg'), true);
  assert.strictEqual(isImageMedia('test.png'), true);
  assert.strictEqual(isImageMedia('test.gif'), true);
  assert.strictEqual(isImageMedia('test.svg'), true);
  assert.strictEqual(isImageMedia('test.webp'), true);
  assert.strictEqual(isImageMedia('test.avif'), true);
});

test('isImageMedia should be case-insensitive for extensions', () => {
  assert.strictEqual(isImageMedia('test.JPG'), true);
  assert.strictEqual(isImageMedia('test.Png'), true);
  assert.strictEqual(isImageMedia('test.SVG'), true);
  assert.strictEqual(isImageMedia('test.WEBP'), true);
});

test('isImageMedia should identify data:image URLs', () => {
  assert.strictEqual(isImageMedia('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='), true);
  assert.strictEqual(isImageMedia('data:image/jpeg;base64,...'), true);
});

test('isImageMedia should return false for non-image extensions', () => {
  assert.strictEqual(isImageMedia('test.mp4'), false);
  assert.strictEqual(isImageMedia('test.pdf'), false);
  assert.strictEqual(isImageMedia('test.txt'), false);
  assert.strictEqual(isImageMedia('test.zip'), false);
});

test('isImageMedia should return false for URLs without extension or mimeType', () => {
  assert.strictEqual(isImageMedia('https://example.com/image'), false);
  assert.strictEqual(isImageMedia('/path/to/media'), false);
});

test('isImageMedia should handle multiple dots in filename', () => {
  assert.strictEqual(isImageMedia('my.photo.jpg'), true);
  assert.strictEqual(isImageMedia('archive.tar.gz'), false);
});
