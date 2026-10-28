export const homeImages = {
  hero: { width: 1920, height: 1279, widths: [480, 768, 1200, 1600] },
  carpet: { width: 1024, height: 682, widths: [480, 768] },
  upholstery: { width: 1440, height: 960, widths: [480, 768, 1200] },
  rug: { width: 1024, height: 680, widths: [480, 768] },
  tile: { width: 1024, height: 680, widths: [480, 768] },
  equipment: { width: 2000, height: 1333, widths: [480, 768, 1200, 1600] },
  van: { width: 1920, height: 1279, widths: [480, 768, 1200] },
  "van-setup": { width: 2000, height: 1334, widths: [480, 768, 1200, 1600] },
} as const;

export type HomeImageName = keyof typeof homeImages;

/** Matches the hero `<img sizes>` and the homepage preload. */
export const HERO_IMAGE_SIZES = "(min-width: 1024px) 640px, 100vw";

export const HERO_PRELOAD_HREF = "/images/home/hero-1200.avif";

export const HERO_AVIF_SRCSET = homeImages.hero.widths
  .map((width) => `/images/home/hero-${width}.avif ${width}w`)
  .join(", ");
