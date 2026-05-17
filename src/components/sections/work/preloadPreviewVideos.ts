type PreloadPreviewVideosOptions = Readonly<{
  delay?: number;
  concurrency?: number;
}>;

function preloadPreviewVideo(src: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.src = src;

    const finish = () => {
      video.removeEventListener("loadeddata", finish);
      video.removeEventListener("error", finish);
      resolve();
    };

    video.addEventListener("loadeddata", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.load();
  });
}

function canPreloadPreviewVideos(): boolean {
  if (typeof window === "undefined") return false;
  const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
  const saveDataMq = window.matchMedia("(prefers-reduced-data: reduce)");
  return hoverMq.matches && !saveDataMq.matches;
}

/**
 * Preloads preview MP4s in order via off-DOM video elements.
 * Returns a cancel function. Never preloads lightbox sources.
 */
export function preloadPreviewVideos(
  srcs: readonly string[],
  options?: PreloadPreviewVideosOptions,
): () => void {
  if (!canPreloadPreviewVideos() || srcs.length === 0) return () => {};

  const delay = options?.delay ?? 0;
  const concurrency = Math.max(1, options?.concurrency ?? 1);
  let cancelled = false;
  let index = 0;
  let active = 0;

  const pump = async () => {
    while (!cancelled && index < srcs.length) {
      while (!cancelled && active < concurrency && index < srcs.length) {
        const src = srcs[index];
        index += 1;
        active += 1;
        try {
          await preloadPreviewVideo(src);
        } finally {
          active -= 1;
        }
      }
      if (cancelled || index >= srcs.length) break;
      await Promise.resolve();
    }
  };

  const timer = window.setTimeout(() => {
    void pump();
  }, delay);

  return () => {
    cancelled = true;
    window.clearTimeout(timer);
  };
}
