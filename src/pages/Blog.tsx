import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { formatPostDate } from "@/lib/formatPostDate";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-hero py-12 lg:py-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            Blog
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Expert carpet cleaning tips, guides, and insights from the Ernest Steamers team.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const formattedDate = formatPostDate(post.date);
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}/`}
                  className="rounded-xl border-2 border-primary-foreground/10 bg-primary text-primary-foreground overflow-hidden flex flex-col hover:border-accent-yellow transition-colors group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold bg-accent/20 text-accent px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-primary-foreground/60">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-lg text-primary-foreground mb-2 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-primary-foreground/70 text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-accent font-heading font-bold text-sm group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-hero py-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary-foreground mb-4">
            Ready for a Cleaner Home?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Put these tips into action — or let the pros handle it. Get your free quote from Ernest Steamers today!
          </p>
          <QuoteFormDialog>
            <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-8 py-3 rounded-lg text-lg transition-all">
              GET A FREE QUOTE
            </button>
          </QuoteFormDialog>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
