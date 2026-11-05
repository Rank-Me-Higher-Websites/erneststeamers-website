import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const banned = /certified\s+technicians?/i;
const textExt = new Set([".html", ".js", ".mjs", ".cjs", ".css", ".json", ".svg", ".txt", ".xml", ".ts", ".tsx", ".md"]);

function walk(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function matches(file: string) {
  const ext = file.slice(file.lastIndexOf(".")).toLowerCase();
  if (!textExt.has(ext)) return false;
  return banned.test(readFileSync(file, "utf8"));
}

describe("certified technician claims", () => {
  it("does not ship certified technician or certified technicians wording", () => {
    const files = [
      join(root, "index.html"),
      ...["src", "public", "functions", "scripts"].flatMap((dir) => walk(join(root, dir))),
    ];
    if (existsSync(join(root, "dist"))) files.push(...walk(join(root, "dist")));

    const hits = files
      .filter((file) => !file.endsWith("no-certified-technicians.test.ts"))
      .filter(matches)
      .map((file) => relative(root, file));
    expect(hits).toEqual([]);
  });
});
