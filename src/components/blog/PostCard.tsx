import { Link } from "react-router-dom";
import BlogImage from "@/components/blog/BlogImage";
import { bodyText, focusRing } from "@/components/home/ui";
import { BLOG_CARD_SIZES, BLOG_FEATURED_SIZES } from "@/lib/blogImages";
import { shortExcerpt } from "@/lib/blogContent";
import { formatPostDate } from "@/lib/formatPostDate";
import type { BlogPost } from "@/data/blogPosts";

type PostCardProps = {
  post: BlogPost;
  heading?: "h2" | "h3";
  priority?: boolean;
  featured?: boolean;
};

export default function PostCard({ post, heading = "h2", priority = false, featured = false }: PostCardProps) {
  const Title = heading;
  const href = `/blog/${post.slug}/`;

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <BlogImage
        name={post.image}
        alt={post.imageAlt}
        priority={priority}
        sizes={featured ? BLOG_FEATURED_SIZES : BLOG_CARD_SIZES}
        className="aspect-video w-full object-cover"
      />
      <div className={`flex flex-1 flex-col gap-3 p-5 ${featured ? "lg:p-8" : ""}`}>
        <p className="text-sm font-semibold uppercase tracking-wide text-[hsl(174,62%,26%)]">{post.topic}</p>
        <Title className={`font-heading font-bold leading-tight text-primary ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          <Link to={href} className={focusRing}>
            {post.title}
          </Link>
        </Title>
        <p className={bodyText}>{shortExcerpt(post.excerpt)}</p>
        <time dateTime={post.date} className="text-sm text-muted-foreground">
          {formatPostDate(post.date)}
        </time>
        <Link to={href} className={`mt-auto inline-flex min-h-12 items-center font-heading text-base font-bold text-primary ${focusRing}`}>
          Read
        </Link>
      </div>
    </article>
  );
}
