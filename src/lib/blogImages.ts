export const blogImages = {
  "carpet-tips": { width: 800, height: 512, widths: [480, 800] },
  "pet-stains": { width: 800, height: 512, widths: [480, 800] },
  "steam-vs-dry": { width: 800, height: 512, widths: [480, 800] },
  upholstery: { width: 800, height: 512, widths: [480, 800] },
  allergies: { width: 800, height: 512, widths: [480, 800] },
  commercial: { width: 800, height: 512, widths: [480, 800] },
} as const;

export type BlogImageName = keyof typeof blogImages;

export const BLOG_HERO_SIZES = "(min-width: 1024px) 720px, 100vw";
export const BLOG_FEATURED_SIZES = "(min-width: 1024px) 560px, 100vw";
export const BLOG_CARD_SIZES = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw";

export function blogImageSrc(name: BlogImageName): string {
  return `/images/blog/${name}.jpg`;
}

export function blogPreload(name: BlogImageName, sizes: string) {
  const { widths } = blogImages[name];
  return {
    href: `/images/blog/${name}-800.avif`,
    srcSet: widths.map((width) => `/images/blog/${name}-${width}.avif ${width}w`).join(", "),
    sizes,
  };
}
