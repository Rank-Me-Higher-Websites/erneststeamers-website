import { bodyText } from "@/components/home/ui";
import {
  franklinParkOfficePoint,
  serviceRegions,
  townCoordinates,
} from "@/data/serviceAreas";

/** Plot frame for the listed towns. North stays below the Illinois line; there is no state outline. */
export const COVERAGE_MAP = {
  width: 420,
  height: 640,
  pad: 36,
  minLat: 41.54,
  maxLat: 42.36,
  minLon: -88.42,
  maxLon: -87.6,
} as const;

const REGION_COLOR: Record<string, string> = {
  cook: "#1e3a5f",
  dupage: "#0f6e66",
  "north-shore": "#8a4b12",
  northwest: "#5c3d7a",
};

const OFFICE_FILL = "hsl(28, 100%, 48%)";

export function projectCoveragePoint(lat: number, lon: number) {
  const { width, height, pad, minLat, maxLat, minLon, maxLon } = COVERAGE_MAP;
  const midLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
  const xSpan = (maxLon - minLon) * Math.cos(midLat);
  const ySpan = maxLat - minLat;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const scale = Math.min(innerW / xSpan, innerH / ySpan);
  const usedW = xSpan * scale;
  const usedH = ySpan * scale;
  const x0 = (width - usedW) / 2;
  const y0 = (height - usedH) / 2;
  return {
    x: x0 + (lon - minLon) * Math.cos(midLat) * scale,
    y: y0 + (maxLat - lat) * scale,
  };
}

function diamondPoints(x: number, y: number, radius: number) {
  return `${x},${y - radius} ${x + radius},${y} ${x},${y + radius} ${x - radius},${y}`;
}

export default function CoverageMap() {
  const plotted = serviceRegions.flatMap((region) =>
    region.towns.map((town) => {
      const source = town === "Franklin Park" ? franklinParkOfficePoint : townCoordinates[town];
      if (!source) throw new Error(`Missing coordinates for ${town}`);
      const point = projectCoveragePoint(source.lat, source.lon);
      return { town, regionId: region.id, office: town === "Franklin Park", ...point };
    }),
  );

  return (
    <figure className="mx-auto w-full max-w-md">
      <svg
        id="coverage-map"
        viewBox={`0 0 ${COVERAGE_MAP.width} ${COVERAGE_MAP.height}`}
        role="img"
        aria-labelledby="coverage-map-title coverage-map-desc"
        className="h-auto w-full"
      >
        <title id="coverage-map-title">Listed towns and the Franklin Park office</title>
        <desc id="coverage-map-desc">
          Scatter plot of each town published on this page. North is up. Circles mark Census internal points for
          those towns. The diamond is the Franklin Park office on Crown Road, the only office. Space between the
          marks is not automatically covered. Town names are in the lists below.
        </desc>
        <rect width={COVERAGE_MAP.width} height={COVERAGE_MAP.height} rx="16" fill="hsl(210, 40%, 96%)" />
        <g aria-hidden="true" fill="#1e3a5f">
          <polygon points="36,22 30,34 42,34" />
          <rect x="34" y="34" width="4" height="16" />
        </g>
        {plotted.map((point) =>
          point.office ? (
            <polygon
              key={point.town}
              data-town={point.town}
              data-office="true"
              data-x={point.x.toFixed(1)}
              data-y={point.y.toFixed(1)}
              points={diamondPoints(point.x, point.y, 8)}
              fill={OFFICE_FILL}
              stroke="#1e3a5f"
              strokeWidth="1.5"
            >
              <title>Franklin Park office, 10549 Crown Rd</title>
            </polygon>
          ) : (
            <circle
              key={point.town}
              data-town={point.town}
              data-x={point.x.toFixed(1)}
              data-y={point.y.toFixed(1)}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={REGION_COLOR[point.regionId]}
              stroke="#ffffff"
              strokeWidth="1.5"
            >
              <title>{point.town}</title>
            </circle>
          ),
        )}
      </svg>
      <figcaption className={`${bodyText} mt-3`}>
        <p>
          North is up. Circles are the towns listed below, plotted from U.S. Census Bureau 2025 Gazetteer internal
          points. The diamond is the only office, at 10549 Crown Rd in Franklin Park. Bartlett is a circle, not an
          office. Colors match the marketing groups and are not county lines or a boundary around the dots.
        </p>
        <ul className="mt-3 space-y-2">
          {serviceRegions.map((region) => (
            <li key={region.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: REGION_COLOR[region.id] }}
              />
              {region.region}
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-3 w-3 shrink-0 rotate-45"
              style={{ backgroundColor: OFFICE_FILL }}
            />
            Franklin Park office only
          </li>
        </ul>
      </figcaption>
    </figure>
  );
}
