import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, focusRing, sectionTitle } from "@/components/home/ui";

const linkClass = `font-semibold text-primary underline decoration-[hsl(174,62%,26%)] underline-offset-4 ${focusRing}`;

export default function WhyLocal() {
  return (
    <section className="bg-white px-4 py-16 lg:py-24" aria-labelledby="why-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="why-heading" className={sectionTitle}>
            Local steam cleaning crew serving Chicagoland
          </h2>
          <div className={`${bodyText} mt-4 space-y-4`}>
            <p>
              Ernest Steamers is a local steam cleaning crew for homes and businesses in Chicago and the suburbs. We clean
              wall-to-wall carpet, area rugs, upholstery, and tile and grout. The main office is in Bartlett, and a second
              office is in Franklin Park.
            </p>
            <p>
              Certified technicians clean carpet with hot-water extraction, also called steam cleaning. Carpet cleaning starts
              at $99. The price for a job depends on the rooms, the size, and the condition — get an exact quote before you
              schedule.
            </p>
            <p>
              The Bartlett office is at 1018 Hummingbird Way, Bartlett, IL 60103. The{" "}
              <Link to="/locations/franklin-park/" className={linkClass}>
                Franklin Park office
              </Link>{" "}
              is at 10549 Crown Rd #4, Franklin Park, IL 60131. See the towns on our{" "}
              <Link to="/service-areas/" className={linkClass}>
                service areas
              </Link>{" "}
              page, or read{" "}
              <Link to="/blog/carpet-cleaning-tips-homeowners/" className={linkClass}>
                carpet cleaning tips for homeowners
              </Link>
              ,{" "}
              <Link to="/blog/remove-pet-stains-odors/" className={linkClass}>
                how to remove pet stains and odors
              </Link>
              , and{" "}
              <Link to="/blog/steam-cleaning-vs-dry-cleaning-carpet/" className={linkClass}>
                steam cleaning compared with dry cleaning
              </Link>
              .
            </p>
          </div>
        </div>
        <figure className="lg:col-span-5">
          <ResponsiveImage
            name="van"
            alt="Ernest Steamers van parked in the driveway of a brick house"
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[3/2] w-full rounded-2xl object-cover"
          />
          <figcaption className={`${bodyText} mt-3`}>Ernest Steamers van on a residential job.</figcaption>
        </figure>
      </div>
    </section>
  );
}
