import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import QuoteFormDialog from "./QuoteFormDialog";
import ResponsiveImage from "./home/ResponsiveImage";
import { phoneTelHref } from "@/data/locations";

export default function HeroSection() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="funnel-hero">
      <div>
        <h1>Expert Carpet Cleaning in Chicago &amp; Suburbs</h1>
        <p>Carpet cleaning starts at $99. Tell our Franklin Park crew which rooms need attention and when you’d like us to visit.</p>
        <div className="flex flex-wrap items-center gap-5">
          <QuoteFormDialog><button className="book-clean">Request a quote <ArrowUpRight size={18} /></button></QuoteFormDialog>
          <a className="font-semibold underline underline-offset-4" href={phoneTelHref()}>Call the crew</a>
        </div>
      </div>
      <figure className="hero-job">
        {playing ? <iframe title="Ernest Steamers carpet cleaning demonstration" src="https://iframe.mediadelivery.net/embed/619469/fdc92897-83b6-4c5a-884d-5423d5c9910c?autoplay=true" allow="autoplay; fullscreen" allowFullScreen /> : <>
          <ResponsiveImage name="hero" alt="Our technician brushing carpet before extraction" sizes="(min-width: 900px) 540px, 100vw" priority />
          <button type="button" className="job-play" onClick={() => setPlaying(true)}><Play size={16} /> Watch the cleaning</button>
        </>}
      </figure>
    </section>
  );
}
