const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-primary">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Photo placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl border-4 border-primary-foreground/10 bg-primary-foreground/5 flex items-center justify-center shadow-2xl">
              <p className="text-primary-foreground/30 font-medium text-sm">Photo placeholder</p>
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-2">
              Need a Reliable{" "}
              <span className="text-accent-yellow">Carpet Cleaning in Chicago?</span>
            </h2>
            <div className="w-16 h-1 bg-cta-orange my-6" />

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-4 rounded-lg text-lg transition-all mb-8"
            >
              Read More <span className="text-xl">→</span>
            </a>

            <p className="text-primary-foreground/80 text-base leading-relaxed mb-4">
              Ernest Steamers provides professional carpet cleaning in Chicago and surrounding suburbs. We specialize in residential and commercial carpet cleaning, upholstery cleaning, area rug cleaning, tile and grout cleaning, and stain removal.
            </p>
            <p className="text-primary-foreground/80 text-base leading-relaxed">
              Our certified technicians use industry-grade equipment to deliver deep, effective cleaning that extends the life of your carpets and flooring. With hundreds of satisfied clients across the Chicagoland area, we're the go-to choice for high-quality, reliable cleaning services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
