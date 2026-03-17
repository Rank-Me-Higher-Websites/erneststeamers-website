const VSLSection = () => {
  return (
    <section id="vsl" className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary/30 glow-box-strong bg-card">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="ml-1">
                <path d="M8 5v14l11-7L8 5z" fill="hsl(220 20% 4%)" />
              </svg>
            </div>
            <p className="text-muted-foreground text-sm font-medium">Click to play</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="font-heading font-bold text-2xl md:text-4xl mb-4">
            Ready To Transform Your Property?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book your free estimate today. No obligations, no pressure — just results.
          </p>
          <a
            href="#contact"
            className="inline-block bg-primary text-primary-foreground font-heading font-bold px-12 py-4 rounded-lg text-lg hover:brightness-110 transition-all glow-box"
          >
            GET YOUR FREE ESTIMATE →
          </a>
        </div>
      </div>
    </section>
  );
};

export default VSLSection;
