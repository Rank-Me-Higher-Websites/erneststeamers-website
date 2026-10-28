import { useState } from "react";
import CallButton from "@/components/CallButton";
import QuoteForm from "@/components/QuoteForm";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, buttonNavy, buttonOrange, buttonOutline } from "@/components/home/ui";
import { HERO_IMAGE_SIZES } from "@/lib/homeImages";

const VIDEO_SRC =
  "https://iframe.mediadelivery.net/embed/619469/fdc92897-83b6-4c5a-884d-5423d5c9910c?autoplay=true&preload=true";

function focusHeroForm() {
  window.setTimeout(() => {
    document.querySelector<HTMLElement>("#hero-quote input[name='name']")?.focus();
  }, 0);
}

export default function HomeHero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-white px-4 pb-12 pt-8 lg:pb-20 lg:pt-14">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <h1 className="font-heading text-[1.75rem] font-bold leading-[1.15] text-primary sm:text-4xl lg:text-[3.25rem]">
            Carpet, Rug & Upholstery Steam Cleaning in Chicago & the Suburbs
          </h1>
          <p className={`${bodyText} mt-4 hidden lg:block lg:text-lg`}>
            Certified technicians. Carpet cleaning starts at $99.
          </p>
          <ul className={`${bodyText} mt-4 list-disc space-y-1 pl-5 lg:hidden`}>
            <li>Certified technicians</li>
            <li>Carpet cleaning starts at $99</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href="#hero-quote" onClick={focusHeroForm} className={`${buttonOrange} w-full sm:w-auto`}>
              Get a Free Quote
            </a>
            <CallButton className={`${buttonOutline} w-full sm:w-auto`} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_12px_40px_rgba(14,42,71,0.08)] lg:col-span-5 lg:row-span-2">
          <QuoteForm id="hero-quote" compact heading="Get your free quote" />
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl bg-[hsl(210,30%,96%)]">
            {playing ? (
              <div className="relative aspect-video">
                <iframe
                  src={VIDEO_SRC}
                  title="Ernest Steamers technician cleaning a carpet"
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            ) : (
              <>
                <ResponsiveImage
                  name="hero"
                  alt="Ernest Steamers technician brushing a living room carpet with a drill and sprayer"
                  sizes={HERO_IMAGE_SIZES}
                  priority
                  className="aspect-[1920/1279] w-full object-cover"
                />
                <button type="button" onClick={() => setPlaying(true)} className={`${buttonNavy} absolute bottom-4 left-4`}>
                  Watch how we clean
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
