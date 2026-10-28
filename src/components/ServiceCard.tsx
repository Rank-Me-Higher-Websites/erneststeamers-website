import { Link } from "react-router-dom";
import type { HomeImageName } from "@/lib/homeImages";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import StartsAtBadge from "@/components/StartsAtBadge";
import ResponsiveImage from "@/components/home/ResponsiveImage";
import { bodyText, buttonOrange, buttonOutline } from "@/components/home/ui";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  image: HomeImageName;
  alt: string;
  service: string;
  startsAt?: boolean;
};

export default function ServiceCard({ title, description, href, image, alt, service, startsAt = false }: ServiceCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <ResponsiveImage name={image} alt={alt} sizes="(min-width: 1024px) 360px, 100vw" className="aspect-[3/2] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-xl font-bold text-primary">{title}</h3>
        <p className={bodyText}>{description}</p>
        {startsAt ? <StartsAtBadge /> : <p className="text-base font-semibold text-primary">Request a quote</p>}
        <div className="mt-auto flex flex-col gap-2">
          <Link to={href} className={`${buttonOutline} w-full`}>
            Service details
          </Link>
          <QuoteFormDialog defaultService={service}>
            <button type="button" className={`${buttonOrange} w-full`}>
              Get a quote
            </button>
          </QuoteFormDialog>
        </div>
      </div>
    </article>
  );
}
