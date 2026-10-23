// Cloudflare Pages Function. Webhook URL comes from the N8N_LEAD_WEBHOOK secret.
// The quote form posts JSON to /api/leads. `website` is a honeypot: if it is
// filled, the submission is dropped and never forwarded.

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context) {
  let data;
  try {
    data = await context.request.json();
  } catch {
    return json(400, { ok: false });
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return json(400, { ok: false });
  }

  if (typeof data.website === "string" && data.website.trim() !== "") {
    return json(200, { ok: true });
  }

  const webhook = String(context.env?.N8N_LEAD_WEBHOOK || "").trim();
  if (!webhook) {
    console.error("N8N_LEAD_WEBHOOK is not set");
    return json(502, { ok: false });
  }

  const lead = { ...data };
  delete lead.website;

  try {
    const n8nRes = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (n8nRes.ok) return json(200, { ok: true });
    console.error("n8n webhook non-2xx:", n8nRes.status);
    return json(502, { ok: false });
  } catch (err) {
    console.error("n8n webhook error:", err);
    return json(502, { ok: false });
  }
}
