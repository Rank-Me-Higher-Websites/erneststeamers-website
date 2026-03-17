const CTASection = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="container max-w-3xl mx-auto text-center">
        <div className="p-10 md:p-16 rounded-2xl bg-card border border-primary/20 glow-box-strong">
          <h2 className="font-heading font-bold text-3xl md:text-5xl mb-4">
            Get Your <span className="text-gradient-gold">Free Estimate</span> Today
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            No hidden fees. No commitments. Just a transparent quote and incredible results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1234567890"
              className="bg-primary text-primary-foreground font-heading font-bold px-10 py-4 rounded-lg text-lg hover:brightness-110 transition-all"
            >
              CALL NOW
            </a>
            <a
              href="mailto:info@erneststeamers.com"
              className="bg-secondary text-secondary-foreground font-heading font-bold px-10 py-4 rounded-lg text-lg hover:bg-secondary/80 transition-all border border-border"
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
