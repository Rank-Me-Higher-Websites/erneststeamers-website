import { Link } from "react-router-dom";
import AreaChips from "@/components/AreaChips";
import { bodyText, buttonOutline, focusRing, sectionTitle } from "@/components/home/ui";

const groups = [
  "Chicago & Cook County",
  "DuPage County & South Suburbs",
  "North Shore Neighborhoods",
  "Northwest Lake & Cook Counties",
];

export default function AreaTeaser() {
  return (
    <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="areas-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="areas-heading" className={sectionTitle}>
          Service areas
        </h2>
        <p className={`${bodyText} mt-3 max-w-2xl`}>
          We clean in Chicago and the suburbs from offices in Bartlett and Franklin Park.
        </p>
        <div className="mt-6">
          <AreaChips items={groups.map((label) => ({ label, href: "/service-areas/" }))} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/locations/franklin-park/" className={`${buttonOutline} w-full sm:w-auto`}>
            Franklin Park office
          </Link>
          <Link to="/service-areas/" className={`${buttonOutline} w-full sm:w-auto ${focusRing}`}>
            See all service areas
          </Link>
        </div>
      </div>
    </section>
  );
}
