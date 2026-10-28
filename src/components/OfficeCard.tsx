import { Link } from "react-router-dom";
import CallButton from "@/components/CallButton";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, buttonOutline } from "@/components/home/ui";
import { formatCityLine, mapsDirectionsHref } from "@/data/locations";
import type { HomeImageName } from "@/lib/homeImages";

type OfficeCardProps = {
  name: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  primary?: boolean;
  pageHref?: string;
  image: HomeImageName;
  imageAlt: string;
  imageCaption: string;
};

export default function OfficeCard({
  name,
  street,
  city,
  region,
  postalCode,
  primary = false,
  pageHref,
  image,
  imageAlt,
  imageCaption,
}: OfficeCardProps) {
  const office = { street, city, region, postalCode };
  const heading = pageHref ? (
    <Link to={pageHref} className="underline decoration-[hsl(174,62%,26%)] underline-offset-4">
      {city}
    </Link>
  ) : (
    city
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <figure>
        <ResponsiveImage
          name={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="aspect-[3/2] w-full object-cover"
        />
        <figcaption className={`${bodyText} px-5 pt-4`}>{imageCaption}</figcaption>
      </figure>
      <div className="flex flex-1 flex-col gap-3 p-5 pt-3">
        {primary ? (
          <p className="text-sm font-bold uppercase tracking-wide text-[hsl(174,62%,26%)]">Primary office</p>
        ) : null}
        <h3 className="font-heading text-2xl font-bold text-primary">{heading}</h3>
        <p className="text-base font-semibold text-primary">{name}</p>
        <p className={bodyText}>
          {street}
          <br />
          {formatCityLine(office)}
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <CallButton className={`${buttonOutline} w-full`} />
          {pageHref ? (
            <Link to={pageHref} className={`${buttonOutline} w-full`}>
              Office details
            </Link>
          ) : null}
          <a
            href={mapsDirectionsHref(office)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonOutline} w-full`}
          >
            Get directions
            <span className="sr-only"> to the {city} office (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
