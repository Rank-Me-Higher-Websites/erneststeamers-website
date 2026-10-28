export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(174,62%,26%)]";

export const buttonOrange = `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cta-orange px-5 text-base font-heading font-bold text-[hsl(216,50%,12%)] transition hover:brightness-95 ${focusRing}`;

export const buttonNavy = `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-heading font-bold text-primary-foreground transition hover:brightness-110 ${focusRing}`;

export const buttonOutline = `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-primary bg-white px-5 text-base font-heading font-bold text-primary transition hover:bg-muted ${focusRing}`;

export const sectionTitle = "font-heading text-3xl font-bold leading-tight text-primary lg:text-4xl";

export const bodyText = "text-base leading-relaxed text-[hsl(216,30%,26%)]";

export const inputClass = `min-h-12 w-full rounded-lg border border-border bg-white px-3 text-base text-foreground ${focusRing}`;
