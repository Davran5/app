import { useEffect } from 'react';

function protectImageElement(image: HTMLImageElement) {
  image.draggable = false;
  image.setAttribute('draggable', 'false');
  image.dataset.imageProtected = 'true';
}

function protectVideoElement(video: HTMLVideoElement) {
  video.draggable = false;
  video.setAttribute('draggable', 'false');
  video.setAttribute('controlsList', 'nodownload noplaybackrate noremoteplayback nofullscreen');
  video.setAttribute('disablePictureInPicture', 'true');
  video.setAttribute('disableRemotePlayback', 'true');
  video.disablePictureInPicture = true;
  video.dataset.videoProtected = 'true';
}

function isProtectedMediaTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  const media = target.closest('img,video');
  return media instanceof HTMLImageElement || media instanceof HTMLVideoElement;
}

export default function ImageProtection() {
  useEffect(() => {
    document.body.classList.add('image-protection-active');

    document.querySelectorAll('img').forEach((image) => {
      protectImageElement(image);
    });
    document.querySelectorAll('video').forEach((video) => {
      protectVideoElement(video);
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node instanceof HTMLImageElement) {
            protectImageElement(node);
          }
          if (node instanceof HTMLVideoElement) {
            protectVideoElement(node);
          }

          node.querySelectorAll('img').forEach((image) => {
            protectImageElement(image);
          });
          node.querySelectorAll('video').forEach((video) => {
            protectVideoElement(video);
          });
        });
      });
    });

    const handleContextMenu = (event: MouseEvent) => {
      if (!isProtectedMediaTarget(event.target)) {
        return;
      }

      event.preventDefault();
    };

    const handleDragStart = (event: DragEvent) => {
      if (!isProtectedMediaTarget(event.target)) {
        return;
      }

      event.preventDefault();
    };

    const handleSelectStart = (event: Event) => {
      if (!isProtectedMediaTarget(event.target)) {
        return;
      }

      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if ((event.ctrlKey || event.metaKey) && key === 's') {
        event.preventDefault();
      }
    };

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      observer.disconnect();
      document.body.classList.remove('image-protection-active');
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  return null;
}
