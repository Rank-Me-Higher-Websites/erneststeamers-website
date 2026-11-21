import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { HomeImageName } from "@/lib/homeImages";
import QuoteFormDialog from "@/components/QuoteFormDialog";
import ResponsiveImage from "@/components/home/ResponsiveImage";

type ServiceCardProps = {
  title: string;
  description: ReactNode;
  href: string;
  image: HomeImageName;
  alt: string;
  service: string;
  startsAt?: boolean;
};

export default function ServiceCard({ title, description, href, image, alt, service, startsAt }: ServiceCardProps) {
  return (
    <article className="service-entry">
      <ResponsiveImage name={image} alt={alt} sizes="(min-width: 768px) 110px, 76px" />
      <div>
        <h3><Link to={href}>{title}</Link></h3>
        <p>{startsAt ? "Starts at $99" : description}</p>
        <QuoteFormDialog defaultService={service}>
          <button type="button" aria-label={`Request a quote for ${service}`}>Get a quote <ArrowUpRight size={15} /></button>
        </QuoteFormDialog>
      </div>
    </article>
  );
}
