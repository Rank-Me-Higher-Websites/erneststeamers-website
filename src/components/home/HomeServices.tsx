import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import { serviceBlocks } from "@/data/servicesPage";

const descriptions: Record<string, string> = {
  carpet: "Wall-to-wall carpet, stairs and hallways. Starts at $99.",
  upholstery: "Seats, arms and cushions on sofas, sectionals and chairs.",
  rugs: "Individual rugs and runners. Tell us the size and where each rug sits.",
  "tile-grout": "Tile floors and the grout lines between them.",
  commercial: "Carpet in offices, lobbies and shared spaces.",
};

export default function HomeServices() {
  return (
    <section className="sample-book" aria-labelledby="services-heading">
      <div className="sample-heading">
        <h2 id="services-heading">What needs cleaning?</h2>
        <Link to="/services/">All services <ArrowRight size={17} /></Link>
      </div>
      <ul className="sample-list">
        {serviceBlocks.map(({ id, nav, title, image, alt, service }, index) => (
          <li key={id} className={index < 3 ? "sample-feature" : "sample-extra"}>
            <article className="material-sample">
              <Link to={`/services/#${id}`} aria-label={`Explore ${title.toLowerCase()}`} className="sample-link">
                <div className="sample-image">
                  <ResponsiveImage name={image} alt={alt} sizes={index < 3 ? "(min-width: 768px) 360px, 96px" : "76px"} />
                </div>
                <h3>{id === "commercial" ? "Commercial carpet" : nav}</h3>
                <ArrowUpRight className="sample-arrow" size={19} aria-hidden="true" />
              </Link>
              <div className="sample-description">
                <p>{descriptions[id]}</p>
                <QuoteFormDialog defaultService={service}>
                  <button type="button" aria-label={`Request a quote for ${service}`}>Get a quote <ArrowRight size={15} /></button>
                </QuoteFormDialog>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
