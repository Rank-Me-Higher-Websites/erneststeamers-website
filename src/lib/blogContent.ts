export type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function headingId(text: string, used: Map<string, number>): string {
  const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
  const seen = used.get(base) ?? 0;
  used.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen + 1}`;
}

function isTableRule(line: string): boolean {
  const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

/** Turn the stored markdown into blocks without changing its words. */
export function parseBlocks(content: string): Block[] {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  const used = new Map<string, number>();
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();
    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4).trim();
      blocks.push({ type: "h3", text, id: headingId(text, used) });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3).trim();
      blocks.push({ type: "h2", text, id: headingId(text, used) });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    if (trimmed.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        const line = lines[index].trim();
        if (!isTableRule(line)) {
          const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
          if (cells.length > 0) rows.push(cells);
        }
        index += 1;
      }
      const [headers, ...body] = rows;
      if (headers) blocks.push({ type: "table", headers, rows: body });
      continue;
    }

    blocks.push({ type: "p", text: trimmed });
    index += 1;
  }

  return blocks;
}

function blockText(block: Block): string {
  if (block.type === "ul" || block.type === "ol") return block.items.join(" ");
  if (block.type === "table") return [...block.headers, ...block.rows.flat()].join(" ");
  return block.text;
}

/** Index of the block that completes the first third of the article. */
export function firstThirdIndex(blocks: Block[]): number {
  const total = blocks.reduce((count, block) => count + blockText(block).split(/\s+/).filter(Boolean).length, 0);
  let seen = 0;
  let index = Math.max(0, blocks.length - 1);
  for (let cursor = 0; cursor < blocks.length; cursor += 1) {
    seen += blockText(blocks[cursor]).split(/\s+/).filter(Boolean).length;
    if (seen >= total / 3) {
      index = cursor;
      break;
    }
  }
  if (blocks[index]?.type === "h2" || blocks[index]?.type === "h3") {
    index = Math.max(0, index - 1);
  }
  return index;
}

export function readingMinutes(content: string): number {
  const words = content
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*|]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function shortExcerpt(excerpt: string, limit = 20): string {
  const words = excerpt.trim().split(/\s+/);
  if (words.length <= limit) return excerpt.trim();
  return `${words.slice(0, limit).join(" ")}…`;
}
