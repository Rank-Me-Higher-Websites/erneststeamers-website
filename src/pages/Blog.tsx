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

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

function TextLink({ to, children }: { to: string; children: string }) {
  return <Link to={to} className={linkClass}>{children}</Link>;
}

const POST_SUMMARIES: Record<string, string> = {
  "how-often-clean-tile-grout":
    "Kitchens, baths, entries, and mudrooms collect different soil in tile and grout. Sweep grit, blot spills, and book a visit when the lines stay dark after a regular wipe.",
  "winter-salt-slush-carpet-care":
    "Road salt and slush sit in the yarn and the pad. Blot the liquid, skip a heavy rinse, and call when the entry stays gritty.",
  "carpet-cleaning-tips-homeowners":
    "Vacuum busy rooms, blot spills instead of rubbing, and keep soil at the door. Move heavy furniture so the pile does not flatten. Extraction reaches dirt a vacuum leaves behind.",
  "remove-pet-stains-odors":
    "Pet urine can soak through the carpet into the padding, where a surface cleaner often does not reach. Blot a fresh accident. A visit pre-treats the spots and flushes them with hot-water extraction.",
  "steam-cleaning-vs-dry-cleaning-carpet":
    "Hot-water extraction pushes hot water into the carpet and vacuums soil back out. Dry cleaning uses little moisture for a light refresh. The guide uses hot-water extraction for homes.",
  "upholstery-cleaning-benefits":
    "Sofas and chairs hold body oils, dust, dander, and crumbs that a wipe leaves behind. A visit checks the fabric, pre-treats stains, and uses hot-water extraction made for upholstery.",
  "carpet-cleaning-allergies-indoor-air-quality":
    "Carpet holds dust mites, pet dander, pollen, and other particles. When it is overloaded, walking can send them back into the room. Hot-water extraction removes many of those allergens.",
  "commercial-carpet-cleaning-business":
    "Visitors notice stained or odorous carpet in an office or shop. Soil in the pile wears the fiber, and replacement costs more than cleaning. Appointments can be evenings, weekends, or early mornings.",
};

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
            <div id="blog-intro" className={`${bodyText} mt-4 max-w-3xl space-y-4`}>
              <p>
                These guides cover practical <TextLink to="/services/#carpet">carpet</TextLink>,{" "}
                <TextLink to="/services/#rugs">rug</TextLink>, and{" "}
                <TextLink to="/services/#upholstery">upholstery</TextLink> care for homes and businesses in the Chicago
                western suburbs. They take the jobs people describe on a quote: everyday care, pet stains, winter salt
                and slush, steam and dry cleaning, sofas, allergies, and shop carpet.
              </p>
              <p>
                Read them before you book so you know what to describe. Home guides cover vacuuming, blotting a fresh
                spill, and pet urine that can sink into the padding. The methods guide explains hot-water extraction,
                the method professional cleaners use, and where a low-moisture clean still fits. Franklin Park and Bartlett
                are among the towns served. The town list is on the <TextLink to="/service-areas/">service areas</TextLink>{" "}
                page, and home and business work is on the <TextLink to="/services/">services</TextLink> page. Carpet
                cleaning starts at $99.
              </p>
            </div>
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
            {featured ? (
              <PostCard post={featured} featured priority summary={POST_SUMMARIES[featured.slug]} />
            ) : null}
            <QuoteBand heading="Need a quote? Carpet cleaning starts at $99" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {grid.map((post) => (
                <PostCard key={post.slug} post={post} summary={POST_SUMMARIES[post.slug]} />
              ))}
            </div>
            <section
              id="blog-topics"
              aria-labelledby="blog-topics-heading"
              className="rounded-2xl border border-border bg-[hsl(210,40%,98%)] px-6 py-8"
            >
              <h2 id="blog-topics-heading" className="font-heading text-2xl font-bold text-primary md:text-3xl">
                Topics
              </h2>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">Home care</h3>
                  <p className={`${bodyText} mt-2`}>
                    <TextLink to="/blog/carpet-cleaning-tips-homeowners/">Homeowner tips</TextLink>,{" "}
                    <TextLink to="/blog/remove-pet-stains-odors/">pet stains and odors</TextLink>,{" "}
                    <TextLink to="/blog/winter-salt-slush-carpet-care/">winter salt and slush</TextLink>,{" "}
                    <TextLink to="/blog/carpet-cleaning-allergies-indoor-air-quality/">allergies</TextLink>, and{" "}
                    <TextLink to="/blog/how-often-clean-tile-grout/">tile and grout</TextLink> cover
                    vacuuming, fresh spills, and dust in carpet. The service page is{" "}
                    <TextLink to="/services/#carpet">carpet cleaning</TextLink>.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">Methods</h3>
                  <p className={`${bodyText} mt-2`}>
                    <TextLink to="/blog/steam-cleaning-vs-dry-cleaning-carpet/">Steam cleaning versus dry cleaning</TextLink>{" "}
                    compares hot-water extraction with low-moisture cleaning. The service page is{" "}
                    <TextLink to="/services/#carpet">carpet cleaning</TextLink>.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">Upholstery</h3>
                  <p className={`${bodyText} mt-2`}>
                    The <TextLink to="/blog/upholstery-cleaning-benefits/">sofa and chair guide</TextLink> covers what
                    fabric holds between cleanings and how a visit is planned. The service page is{" "}
                    <TextLink to="/services/#upholstery">upholstery cleaning</TextLink>.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">Commercial</h3>
                  <p className={`${bodyText} mt-2`}>
                    The <TextLink to="/blog/commercial-carpet-cleaning-business/">business guide</TextLink> covers
                    offices and shops, soil that wears carpet, and visits around open hours. The service page is{" "}
                    <TextLink to="/services/#commercial">commercial carpet cleaning</TextLink>.
                  </p>
                </div>
              </div>
            </section>
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
