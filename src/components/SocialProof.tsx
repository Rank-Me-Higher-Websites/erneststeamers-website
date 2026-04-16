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
  {
    name: "Alanas 21",
    role: "Homeowner",
    text: "Ordered the service for my living room carpet and some tile cleaning in the kitchen. Really satisfied with the results, we were considering replacing the carpet altogether, but the steam cleaning gave the carpet a new life. Would recommend.",
  },
];

const SocialProof = () => {
  return (
    <section className="py-6 lg:py-12 px-3 lg:px-4 bg-primary">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-4 lg:mb-8">
          <h2 className="font-heading font-bold text-xl lg:text-3xl text-primary-foreground mb-0.5 lg:mb-1">
            Don't Take Our Word For It
          </h2>
          <p className="text-primary-foreground/60 text-xs lg:text-sm">See what our clients are saying</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="p-3 lg:p-5 rounded-lg lg:rounded-xl border border-primary-foreground/10 bg-hero-dark shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex gap-0.5 mb-1.5 lg:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 leading-relaxed text-xs lg:text-sm">"{t.text}"</p>
              </div>
              <div className="mt-3 lg:mt-4 pt-2 lg:pt-3 border-t border-primary-foreground/10">
                <p className="font-heading font-semibold text-xs lg:text-sm text-primary-foreground">{t.name}</p>
                <p className="text-primary-foreground/50 text-[10px] lg:text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
