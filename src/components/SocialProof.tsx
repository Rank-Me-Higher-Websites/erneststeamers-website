import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Homeowner",
    text: "Ernest Steamers completely transformed my driveway and patio. It looks like new concrete. Absolutely blown away by the results.",
  },
  {
    name: "Sarah K.",
    role: "Property Manager",
    text: "We use them for all 12 of our properties. Professional, reliable, and the results speak for themselves. Best vendor relationship we have.",
  },
  {
    name: "David R.",
    role: "Restaurant Owner",
    text: "Our storefront was embarrassing before Ernest Steamers. Now customers compliment how clean it looks. Worth every penny.",
  },
];

const SocialProof = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-1">
            Don't Take Our Word For It
          </h2>
          <p className="text-muted-foreground text-sm">See what our clients are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.name} className="p-5 rounded-xl border-2 border-muted-foreground/40 bg-background shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground mb-3 leading-relaxed text-sm">"{t.text}"</p>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
