const CTASection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <div className="p-10 md:p-16 rounded-2xl bg-primary border border-primary-foreground/10">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-primary-foreground">
            Get Your <span className="text-accent-yellow">Free Estimate</span> Today
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-lg mx-auto">
            No hidden fees. No commitments. Just a transparent quote and incredible results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+16308309867"
              className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-10 py-4 rounded-lg text-lg transition-all"
            >
              CALL NOW
            </a>
            <a
              href="mailto:info@erneststeamers.com"
              className="bg-primary-foreground/10 text-primary-foreground font-heading font-bold px-10 py-4 rounded-lg text-lg hover:bg-primary-foreground/20 transition-all border border-primary-foreground/20"
            >
              EMAIL US
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
