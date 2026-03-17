import { Star } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy Clients" },
  { value: "4.9★", label: "Average Rating" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "24hr", label: "Response Time" },
];

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
    <section className="py-16 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border">
              <div className="font-heading font-bold text-3xl md:text-4xl text-gradient-gold mb-1">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-2">
            Don't Take Our Word For It
          </h2>
          <p className="text-muted-foreground">See what our clients are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-xl bg-card border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-heading font-semibold text-sm">{t.name}</p>
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
