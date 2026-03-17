import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { Calendar, ArrowRight } from "lucide-react";

import blogCarpetTips from "@/assets/blog-carpet-tips.jpg";
import blogPetStains from "@/assets/blog-pet-stains.jpg";
import blogSteamVsDry from "@/assets/blog-steam-vs-dry.jpg";
import blogUpholstery from "@/assets/blog-upholstery.jpg";
import blogAllergies from "@/assets/blog-allergies.jpg";
import blogCommercial from "@/assets/blog-commercial.jpg";

const posts = [
  {
    title: "5 Carpet Cleaning Tips Every Homeowner Should Know",
    excerpt:
      "Keeping your carpets looking fresh between professional cleanings doesn't have to be hard. From quick spot-treatment tricks to vacuuming schedules, here are five tips that extend the life of your carpet and keep your home feeling clean.",
    image: blogCarpetTips,
    date: "March 10, 2026",
    category: "Tips & Tricks",
  },
  {
    title: "How to Remove Pet Stains & Odors for Good",
    excerpt:
      "Pet accidents happen — but they don't have to leave a permanent mark. Learn why store-bought cleaners often fall short and how professional steam extraction eliminates stains and odors at the source, keeping your home safe for the whole family.",
    image: blogPetStains,
    date: "February 24, 2026",
    category: "Pet Care",
  },
  {
    title: "Steam Cleaning vs. Dry Cleaning: Which Is Better?",
    excerpt:
      "Not all carpet cleaning methods are created equal. We break down the pros and cons of hot water extraction (steam cleaning) vs. dry cleaning so you can make an informed decision for your home or office.",
    image: blogSteamVsDry,
    date: "February 12, 2026",
    category: "Education",
  },
  {
    title: "Why You Should Clean Your Upholstery More Often",
    excerpt:
      "Your couch collects dust, allergens, and bacteria every single day. Regular upholstery cleaning doesn't just improve the look of your furniture — it improves your indoor air quality and extends the life of your investment.",
    image: blogUpholstery,
    date: "January 28, 2026",
    category: "Upholstery",
  },
  {
    title: "Carpet Cleaning & Allergies: What You Need to Know",
    excerpt:
      "Dirty carpets are one of the biggest triggers for indoor allergies. Dust mites, pet dander, and pollen get trapped in carpet fibers. Here's how professional cleaning can dramatically reduce allergy symptoms in your home.",
    image: blogAllergies,
    date: "January 15, 2026",
    category: "Health",
  },
  {
    title: "Commercial Carpet Cleaning: Why It Matters for Your Business",
    excerpt:
      "First impressions count. Clean carpets in your office or retail space signal professionalism and care. We explain how routine commercial cleaning protects your flooring investment and creates a healthier workplace.",
    image: blogCommercial,
    date: "January 3, 2026",
    category: "Commercial",
  },
];

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
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-xl border-2 border-border bg-card overflow-hidden flex flex-col hover:border-accent/50 transition-colors group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold bg-accent/20 text-accent px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-card-foreground/60">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-lg text-card-foreground mb-2 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-card-foreground/70 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <button className="mt-4 inline-flex items-center gap-1.5 text-accent font-heading font-bold text-sm hover:gap-2.5 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
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
