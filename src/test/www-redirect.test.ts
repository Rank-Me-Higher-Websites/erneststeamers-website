import { describe, expect, it } from "vitest";
import { onRequest } from "../../functions/_middleware.js";
import { onRequestPost } from "../../functions/api/leads.js";

function middleware(request: Request, next = async () => new Response("next", { status: 200 })) {
  return onRequest({ request, next });
}

describe("www to apex middleware", () => {
  it("301s www to https apex and keeps the path and query", async () => {
    const response = await middleware(
      new Request("http://www.erneststeamers.com/services?city=Franklin+Park&ref=a%26b", {
        headers: { host: "www.erneststeamers.com" },
      }),
    );

    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toBe(
      "https://erneststeamers.com/services?city=Franklin+Park&ref=a%26b",
    );
  });

  it("passes apex /api/leads through to the leads function", async () => {
    const request = new Request("https://erneststeamers.com/api/leads?source=form", {
      method: "POST",
      headers: {
        host: "erneststeamers.com",
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: "Ada", website: "https://spam.example" }),
    });

    let continued = false;
    const response = await middleware(request, async () => {
      continued = true;
      return onRequestPost({ request, env: {} });
    });

    expect(continued).toBe(true);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("does not redirect other hosts", async () => {
    const response = await middleware(
      new Request("https://preview.example/api/leads", {
        headers: { host: "preview.example" },
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("next");
  });
});
