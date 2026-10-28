import { blogImages, type BlogImageName } from "@/lib/blogImages";

type BlogImageProps = {
  name: BlogImageName;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function BlogImage({ name, alt, sizes, priority = false, className }: BlogImageProps) {
  const meta = blogImages[name];
  const srcSet = (extension: "avif" | "webp") =>
    meta.widths.map((width) => `/images/blog/${name}-${width}.${extension} ${width}w`).join(", ");

  return (
    <picture className="block">
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/blog/${name}.jpg`}
        alt={alt}
        width={meta.width}
        height={meta.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "auto" : "async"}
        {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
        className={className}
      />
    </picture>
  );
}
