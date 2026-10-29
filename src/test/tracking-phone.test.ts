import { describe, expect, it } from "vitest";
import { render } from "@/entry-server";

const DISPLAY = "(630) 403-0180";
const TEL = "tel:+16304030180";
const SCHEMA = "+1-630-403-0180";
const ALT = "630-830-9867";

function telephones(value: unknown): string[] {
  const found: string[] = [];
  const walk = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;
    const record = node as Record<string, unknown>;
    if (typeof record.telephone === "string") found.push(record.telephone);
    for (const child of Object.values(record)) walk(child);
  };
  walk(value);
  return found;
}

describe("tracking phone on prerendered pages", () => {
  for (const path of ["/", "/contact/"]) {
    it(`${path} shows (630) 403-0180 in the page and in LocalBusiness telephone`, () => {
      const { html, head } = render(path);
      expect(html).toContain(DISPLAY);
      expect(html).toContain(TEL);
      expect(html).toContain(`alt ${ALT}`);
      expect(html).not.toContain("tel:+16308309867");
      expect(html).not.toContain("(800) 270-6228");
      expect(html).not.toContain("800-270-6228");
      expect(html.split(`alt ${ALT}`).join("")).not.toContain(ALT);

      expect(html).toContain("1018 Hummingbird Way");
      expect(html).toContain("Bartlett, IL 60103");

      const blocks = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) =>
        JSON.parse(match[1]),
      );
      expect(blocks.length).toBeGreaterThan(0);
      const phones = blocks.flatMap(telephones);
      expect(phones.length).toBeGreaterThan(0);
      expect(phones.every((phone) => phone === SCHEMA)).toBe(true);
      const serialized = JSON.stringify(blocks);
      expect(serialized).toContain(`"telephone":"${SCHEMA}"`);
      expect(serialized).not.toContain(ALT);
      expect(serialized).not.toContain("270-6228");
      expect(serialized).toContain("1018 Hummingbird Way");
      expect(serialized).toContain("60103");
      expect(serialized).toContain("10549 Crown Rd #4");
      expect(serialized).toContain("60131");
    });
  }
});
