import { useState } from "react";
import { Pause, Play, Sparkle } from "lucide-react";

const materials = ["Carpet", "Upholstery", "Area rugs", "Tile & grout", "Commercial carpet"];

export default function ServiceRibbon() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="service-ribbon">
      <div className="ribbon-window">
        <div className="ribbon-track" data-paused={paused}>
          {[0, 1].map(copy => (
            <ul key={copy} aria-label={copy === 0 ? "Cleaning specialties" : undefined} aria-hidden={copy === 1}>
              {materials.map(material => <li key={material}>{material}<Sparkle aria-hidden="true" /></li>)}
            </ul>
          ))}
        </div>
      </div>
      <button type="button" aria-label={paused ? "Play moving text" : "Pause moving text"} onClick={() => setPaused(!paused)}>
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </div>
  );
}
