import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import InlineQuoteCta from "@/components/blog/InlineQuoteCta";
import { bodyText, focusRing } from "@/components/home/ui";
import { firstThirdIndex, parseBlocks, type Block } from "@/lib/blogContent";
import { PHONE_ALT_DISPLAY, PHONE_SCHEMA, phoneTelHref } from "@/data/locations";

function nationalDigits(value: string) {
  return value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
}

function normalizeHref(href: string): string {
  if (!href.startsWith("tel:")) return href;
  const digits = nationalDigits(href);
  if (digits === nationalDigits(PHONE_SCHEMA) || digits === nationalDigits(PHONE_ALT_DISPLAY)) return phoneTelHref();
  return href;
}

export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let count = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] && match[2]) {
      const href = normalizeHref(match[2]);
      const className = `font-semibold text-primary underline underline-offset-2 ${focusRing}`;
      nodes.push(
        href.startsWith("/") ? (
          <Link key={`${keyPrefix}-${count}`} to={href} className={className}>
            {match[1]}
          </Link>
        ) : (
          <a key={`${keyPrefix}-${count}`} href={href} className={className}>
            {match[1]}
          </a>
        ),
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`${keyPrefix}-${count}`} className="font-semibold text-foreground">
          {match[3]}
        </strong>,
      );
    }
    count += 1;
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function RenderBlock({ block, index }: { block: Block; index: number }) {
  if (block.type === "h2") {
    return (
      <h2 id={block.id} className="mb-3 mt-10 scroll-mt-28 font-heading text-2xl font-bold text-primary">
        {block.text}
      </h2>
    );
  }
  if (block.type === "h3") {
    return (
      <h3 id={block.id} className="mb-2 mt-8 scroll-mt-28 font-heading text-xl font-bold text-primary">
        {block.text}
      </h3>
    );
  }
  if (block.type === "ul" || block.type === "ol") {
    const List = block.type === "ul" ? "ul" : "ol";
    return (
      <List className={`mb-4 space-y-2 pl-6 ${bodyText} ${block.type === "ul" ? "list-disc" : "list-decimal"}`}>
        {block.items.map((item, itemIndex) => (
          <li key={`${index}-${itemIndex}`}>{renderInline(item, `${index}-${itemIndex}`)}</li>
        ))}
      </List>
    );
  }
  if (block.type === "table") {
    return (
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse text-base">
          <thead>
            <tr>
              {block.headers.map((header) => (
                <th key={header} className="border-b border-border px-3 py-3 text-left font-semibold text-primary">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="border-b border-border px-3 py-3 text-[hsl(216,30%,26%)]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p className={`mb-4 ${bodyText}`}>{renderInline(block.text, String(index))}</p>;
}

export default function ArticleBody({ content, defaultService }: { content: string; defaultService?: string }) {
  const blocks = parseBlocks(content);
  const insertAfter = firstThirdIndex(blocks);

  return (
    <div>
      {blocks.map((block, index) => (
        <Fragment key={index}>
          <RenderBlock block={block} index={index} />
          {index === insertAfter ? <InlineQuoteCta id="article-quote" defaultService={defaultService} /> : null}
        </Fragment>
      ))}
      <InlineQuoteCta id="article-quote-end" defaultService={defaultService} />
    </div>
  );
}
