import { Link, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import StartsAtBadge from "@/components/StartsAtBadge";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleToc from "@/components/blog/ArticleToc";
import BlogImage from "@/components/blog/BlogImage";
import PostCard from "@/components/blog/PostCard";
import { bodyText, buttonOrange, buttonOutline, focusRing, sectionTitle } from "@/components/home/ui";
import { getPostBySlug, relatedPosts } from "@/data/blogPosts";
import { BLOG_HERO_SIZES } from "@/lib/blogImages";
import { parseBlocks, readingMinutes } from "@/lib/blogContent";
import { formatPostDate } from "@/lib/formatPostDate";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  const headings = parseBlocks(post.content).filter((block) => block.type === "h2");
  const minutes = readingMinutes(post.content);
  const related = relatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-white pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main className="px-4 py-8 lg:py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <header>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-base text-muted-foreground">
                <li>
                  <Link to="/" className={`text-primary underline-offset-2 hover:underline ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li>
                  <Link to="/blog/" className={`text-primary underline-offset-2 hover:underline ${focusRing}`}>
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="text-foreground">
                  {post.title}
                </li>
              </ol>
            </nav>
            <h1 className={`${sectionTitle} mt-4`}>{post.title}</h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted-foreground">
              <span className="font-semibold uppercase tracking-wide text-[hsl(174,62%,26%)]">{post.topic}</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span>{minutes} min read</span>
              <span>By {post.author}</span>
            </p>
          </header>

          <details className="group rounded-2xl border border-border bg-white p-4 lg:hidden">
            <summary
              className={`flex min-h-12 cursor-pointer list-none items-center justify-between font-heading text-base font-bold text-primary [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              In this article
              <ChevronDown className="h-5 w-5 transition group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ArticleToc headings={headings} />
          </details>

          <BlogImage
            name={post.image}
            alt={post.imageAlt}
            sizes={BLOG_HERO_SIZES}
            priority
            className="aspect-video w-full rounded-2xl object-cover"
          />

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <article className="min-w-0 max-w-[70ch]">
              <ArticleBody content={post.content} defaultService={post.serviceValue} />
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <ArticleToc headings={headings} showLabel />
                </div>
                <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <StartsAtBadge />
                  <p className={`${bodyText} mt-3`}>Carpet cleaning starts at $99.</p>
                  <CallButton className={`${buttonOrange} mt-4 w-full`} />
                  <a href="#article-quote" className={`${buttonOutline} mt-2 w-full`}>
                    Get a quote
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <section aria-labelledby="related-heading" className="mt-4">
            <h2 id="related-heading" className={sectionTitle}>
              Related articles
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.slug} post={item} heading="h3" />
              ))}
            </div>
          </section>

          <section aria-labelledby="related-service-heading" className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 id="related-service-heading" className="font-heading text-2xl font-bold text-primary">
              Related service
            </h2>
            <h3 className="mt-3 font-heading text-xl font-bold text-primary">{post.serviceLabel}</h3>
            <div className="mt-4">
              {post.serviceValue === "Carpet Cleaning" ? (
                <StartsAtBadge />
              ) : (
                <p className="text-base font-semibold text-primary">Request a quote</p>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link to={post.serviceHref} className={`${buttonOutline} w-full sm:w-auto`}>
                Service details
              </Link>
              <QuoteFormDialog defaultService={post.serviceValue}>
                <button type="button" className={`${buttonOrange} w-full sm:w-auto`}>
                  Get a quote
                </button>
              </QuoteFormDialog>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <StickyMobileBar scrollTo="article-quote" />
    </div>
  );
};

export default BlogPost;
