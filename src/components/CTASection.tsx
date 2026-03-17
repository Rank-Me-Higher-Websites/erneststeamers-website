import QuoteFormDialog from "./QuoteFormDialog";

const CTASection = () => {
  return (
    <section id="contact" className="py-12 px-4 bg-background">
      <div className="container max-w-3xl mx-auto text-center">
        <div className="p-8 md:p-12 rounded-2xl bg-primary border border-primary-foreground/10">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-3 text-primary-foreground">
            Get Your <span className="text-accent-yellow">Free Estimate</span> Today
          </h2>
          <p className="text-primary-foreground/70 text-base mb-6 max-w-lg mx-auto">
            No hidden fees. No commitments. Just a transparent quote and incredible results.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+16308309867"
              className="bg-cta-orange hover-cta-orange text-primary-foreground font-heading font-bold px-8 py-3 rounded-lg text-base transition-all"
            >
              CALL NOW
            </a>
            <QuoteFormDialog>
              <button className="btn-flash-yellow text-accent-foreground font-heading font-bold px-8 py-3 rounded-lg text-base transition-all">
                GET A QUOTE
              </button>
            </QuoteFormDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
