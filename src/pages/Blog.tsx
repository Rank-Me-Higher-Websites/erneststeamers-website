import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import CallButton from "@/components/CallButton";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import PostCard from "@/components/blog/PostCard";
import { bodyText, buttonOrange, buttonOutline, focusRing, sectionTitle } from "@/components/home/ui";
import { BLOG_TOPICS, blogPosts, type BlogTopic } from "@/data/blogPosts";

function QuoteBand({ heading, links = false }: { heading: string; links?: boolean }) {
  return (
    <section className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground">
      <h2 className="font-heading text-2xl font-bold md:text-3xl">{heading}</h2>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <CallButton className={`${buttonOrange} w-full sm:w-auto`} />
        <QuoteFormDialog>
          <button type="button" className={`${buttonOutline} w-full sm:w-auto`}>
            Get a Quote
          </button>
        </QuoteFormDialog>
      </div>
      {links ? (
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-base">
          <Link to="/services/" className={`underline underline-offset-2 ${focusRing}`}>
            Cleaning services
          </Link>
          <Link to="/service-areas/" className={`underline underline-offset-2 ${focusRing}`}>
            Service areas
          </Link>
        </p>
      ) : null}
    </section>
  );
}

const Blog = () => {
  const [filter, setFilter] = useState<"All" | BlogTopic>("All");
  const matches = filter === "All" ? blogPosts : blogPosts.filter((post) => post.topic === filter);
  const featured = filter === "All" ? matches[0] : undefined;
  const grid = featured ? matches.slice(1) : matches;
  const chips = ["All", ...BLOG_TOPICS] as const;

  return (
    <div className="min-h-screen bg-white pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar />
      <main>
        <section className="bg-white px-4 pb-4 pt-12 lg:pt-16">
          <div className="mx-auto max-w-6xl">
            <h1 className={sectionTitle}>Carpet Cleaning Tips &amp; Guides</h1>
            <p className={`${bodyText} mt-3 max-w-2xl`}>
              Carpet, upholstery, and pet-stain cleaning guides for Chicago-area homes.
            </p>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="toolbar" aria-label="Filter articles">
              {chips.map((chip) => {
                const selected = filter === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(chip)}
                    className={`inline-flex min-h-12 shrink-0 items-center rounded-full px-4 text-base font-semibold ${focusRing} ${
                      selected ? "bg-primary text-primary-foreground" : "bg-[hsl(216,40%,96%)] text-primary"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-6" aria-label="Articles">
          <div className="mx-auto flex max-w-6xl flex-col gap-8">
            {featured ? <PostCard post={featured} featured priority /> : null}
            <QuoteBand heading="Need a quote? Carpet cleaning starts at $99" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            <QuoteBand heading="Ready for a professional clean?" links />
          </div>
        </section>
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
};

export default Blog;
