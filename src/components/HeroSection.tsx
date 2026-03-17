const HeroSection = () => {
  return (
    <section className="pt-32 pb-8 px-4 text-center">
      <div className="container max-w-4xl mx-auto">
        <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-4">
          Professional Steam Cleaning
        </p>
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
          We Make Your Property Look{" "}
          <span className="text-gradient-gold">Brand New</span>{" "}
          — Guaranteed.
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          The #1 rated steam cleaning service trusted by 500+ homeowners &amp; businesses. 
          Watch the short video below to see why.
        </p>
        <a
          href="#vsl"
          className="inline-block bg-primary text-primary-foreground font-heading font-bold px-10 py-4 rounded-lg text-lg hover:brightness-110 transition-all glow-box"
        >
          WATCH THE FREE VIDEO ↓
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
