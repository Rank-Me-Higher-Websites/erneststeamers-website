import { focusRing } from "@/components/home/ui";

export type TocHeading = { id: string; text: string };

export default function ArticleToc({ headings, showLabel = false }: { headings: TocHeading[]; showLabel?: boolean }) {
  return (
    <nav aria-label="In this article">
      {showLabel ? (
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-[hsl(174,62%,26%)]">In this article</p>
      ) : null}
      <ol className={showLabel ? "mt-2" : ""}>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`flex min-h-12 items-center text-base leading-snug text-primary underline-offset-2 hover:underline ${focusRing}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
