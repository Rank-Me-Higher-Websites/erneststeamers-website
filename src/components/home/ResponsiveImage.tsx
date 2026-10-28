import { homeImages, type HomeImageName } from "@/lib/homeImages";

type ResponsiveImageProps = {
  name: HomeImageName;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function ResponsiveImage({
  name,
  alt,
  sizes,
  priority = false,
  className,
}: ResponsiveImageProps) {
  const meta = homeImages[name];
  const srcSet = (extension: "avif" | "webp") =>
    meta.widths.map((width) => `/images/home/${name}-${width}.${extension} ${width}w`).join(", ");

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`/images/home/${name}.jpg`}
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
