import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const exec = promisify(execFile);
const chrome = ["/usr/local/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/google-chrome"].find((bin) =>
  existsSync(bin),
);

describe("header layout at phone and tablet sizes", () => {
  it("keeps one row without overlap from 320px through tablet landscape", async () => {
    if (!chrome) return;
    try {
      await fetch("http://localhost:5000/");
    } catch {
      return;
    }
    const { stdout } = await exec(process.execPath, ["scripts/check-header-layout.mjs"], {
      cwd: process.cwd(),
      timeout: 120000,
      env: { ...process.env, HEADER_CHECK_URL: "http://localhost:5000/" },
    });
    for (const size of ["568x320", "667x375", "740x360", "844x390", "852x393", "320x568", "390x844", "430x932", "768x1024", "1024x768", "820x1180", "1180x820"]) {
      expect(stdout).toContain(`${size} `);
    }
    expect(stdout).not.toContain("FAIL");
    expect(stdout).toContain("1024x768 desktop-nav");
    expect(stdout).toContain("1180x820 desktop-nav");
    expect(stdout).toContain("844x390 collapsed");
    expect(stdout).toContain("768x1024 collapsed");
    expect(stdout).toContain("320x568 collapsed");
  }, 120000);
});
