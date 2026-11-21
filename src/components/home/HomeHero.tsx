import { useState } from "react";
import { ArrowUpRight, MapPin, Play } from "lucide-react";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { HERO_IMAGE_SIZES } from "@/lib/homeImages";

const video = "https://iframe.mediadelivery.net/embed/619469/fdc92897-83b6-4c5a-884d-5423d5c9910c?autoplay=true&preload=true";

export default function HomeHero() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="clean-hero">
      <div className="hero-copy">
        <a className="hero-location" href="/service-areas/"><MapPin size={15} />Chicago &amp; suburbs</a>
        <h1>Deep cleaning for <em>lived-in</em> homes.</h1>
        <p>Carpet, rug and upholstery steam cleaning by our Franklin Park crew. Carpet cleaning starts at <strong>$99.</strong></p>
        <QuoteFormDialog>
          <button type="button" className="book-clean">Request a cleaning <ArrowUpRight size={20} /></button>
        </QuoteFormDialog>
      </div>
      <figure className="hero-job">
        {playing ? (
          <iframe title="Ernest Steamers technician cleaning a carpet" src={video} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        ) : (
          <>
            <ResponsiveImage name="hero" alt="Ernest Steamers technician brushing a living room carpet with a drill and sprayer" sizes={HERO_IMAGE_SIZES} priority />
            <button onClick={() => setPlaying(true)} className="job-play" type="button"><Play size={15} fill="currentColor" /> Watch how we clean</button>
          </>
        )}
      </figure>
    </section>
  );
}
