import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";
import { formatPostDate } from "@/lib/formatPostDate";
import { Calendar, ArrowLeft, User } from "lucide-react";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) return <NotFound />;

  const formattedDate = formatPostDate(post.date);

  // Simple markdown-to-HTML for the content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      // H2
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="font-heading font-bold text-xl md:text-2xl text-foreground mt-8 mb-3">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      // H3
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="font-heading font-bold text-lg text-foreground mt-6 mb-2">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      // Bullet list
      if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/^- \*\*(.+?)\*\*\s*[—–-]?\s*(.*)$/);
        if (match) {
          return (
            <li key={i} className="text-muted-foreground text-sm leading-relaxed ml-4 mb-1.5 list-disc">
              <strong className="text-foreground">{match[1]}</strong>
              {match[2] ? ` — ${match[2]}` : ""}
            </li>
          );
        }
        const match2 = trimmed.match(/^- \*\*(.+?)\*\*(.*)$/);
        if (match2) {
          return (
            <li key={i} className="text-muted-foreground text-sm leading-relaxed ml-4 mb-1.5 list-disc">
              <strong className="text-foreground">{match2[1]}</strong>{match2[2]}
            </li>
          );
        }
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={i} className="text-muted-foreground text-sm leading-relaxed ml-4 mb-1.5 list-disc">
            {renderInline(trimmed.replace("- ", ""))}
          </li>
        );
      }
      // Table header
      if (trimmed.startsWith("|") && trimmed.includes("---|")) return null;
      if (trimmed.startsWith("| Business Type")) {
        return null; // skip, we'll handle table separately
      }
      if (trimmed.startsWith("|") && !trimmed.includes("---")) {
        const cells = trimmed.split("|").filter(Boolean).map((c) => c.trim());
        if (cells.length >= 2) {
          return (
            <div key={i} className="flex justify-between border-b border-border py-2 text-sm">
              <span className="text-foreground font-medium">{cells[0]}</span>
              <span className="text-muted-foreground">{cells[1]}</span>
            </div>
          );
        }
      }
      // Regular paragraph
      return (
        <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-3">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  const renderInline = (text: string) => {
    // Handle bold, links
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Check for links [text](url)
      const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);
      // Check for bold **text**
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);

      let firstMatch: { index: number; type: "link" | "bold"; match: RegExpMatchArray } | null = null;

      if (linkMatch && linkMatch.index !== undefined) {
        firstMatch = { index: linkMatch.index, type: "link", match: linkMatch };
      }
      if (boldMatch && boldMatch.index !== undefined) {
        if (!firstMatch || boldMatch.index < firstMatch.index) {
          firstMatch = { index: boldMatch.index, type: "bold", match: boldMatch };
        }
      }

      if (!firstMatch) {
        parts.push(remaining);
        break;
      }

      if (firstMatch.index > 0) {
        parts.push(remaining.substring(0, firstMatch.index));
      }

      if (firstMatch.type === "link") {
        const [full, linkText, url] = firstMatch.match;
        parts.push(
          <a key={key++} href={url} className="text-accent hover:underline font-medium">
            {linkText}
          </a>
        );
        remaining = remaining.substring(firstMatch.index + full.length);
      } else {
        const [full, boldText] = firstMatch.match;
        parts.push(
          <strong key={key++} className="text-foreground font-semibold">
            {boldText}
          </strong>
        );
        remaining = remaining.substring(firstMatch.index + full.length);
      }
    }

    return <>{parts}</>;
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
      </div>

      {/* Article */}
      <article className="py-10 px-4">
        <div className="container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link
            to="/blog/"
            className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-accent/20 text-accent px-2.5 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="w-3 h-3" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose-wrapper">{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="mt-12 rounded-xl border-2 border-border bg-primary p-8 text-center">
            <h3 className="font-heading font-bold text-xl text-primary-foreground mb-2">
              Ready for a Professional Clean?
            </h3>
            <p className="text-primary-foreground/70 text-sm mb-5 max-w-md mx-auto">
              Ernest Steamers serves Chicago and all Chicagoland suburbs with eco-friendly, professional carpet cleaning.
            </p>
            <QuoteFormDialog>
              <button className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-6 py-3 rounded-lg text-base transition-all">
                Get A Free Quote →
              </button>
            </QuoteFormDialog>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-12 px-4 bg-background">
        <div className="container max-w-7xl mx-auto">
          <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">
            More from the Blog
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                to={`/blog/${rp.slug}/`}
                className="rounded-xl border-2 border-primary-foreground/10 bg-primary text-primary-foreground overflow-hidden hover:border-accent-yellow transition-colors group"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={rp.image}
                    alt={rp.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                    {rp.category}
                  </span>
                  <h3 className="font-heading font-bold text-sm text-primary-foreground mt-2 leading-tight">
                    {rp.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
