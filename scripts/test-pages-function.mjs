import { spawn } from "node:child_process";
import http from "node:http";
import { rmSync, writeFileSync } from "node:fs";

const MOCK_PORT = 9877;
const PAGES_PORT = 8788;
const lead = {
  name: "Test Person",
  email: "test@example.com",
  phone: "708-111-2222",
  address: "1 Oak Ave, Naperville, IL",
  service: "Carpet Cleaning",
  rooms: "2",
  squareFootage: "800",
  preferredDate: "2026-11-01",
  message: "Pet odor in the living room",
  source: "http://127.0.0.1/test",
  website: "",
};

function startMock() {
  const hits = [];
  let status = 200;
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      let json = raw;
      try {
        json = JSON.parse(raw);
      } catch {
        /* keep raw */
      }
      hits.push({ url: req.url, json });
      res.writeHead(status, { "content-type": "application/json" });
      res.end(JSON.stringify({ mock: true }));
    });
  });
  return new Promise((resolve) => {
    server.listen(MOCK_PORT, "127.0.0.1", () => {
      resolve({
        server,
        hits,
        setStatus(code) {
          status = code;
        },
      });
    });
  });
}

function startPages(bindings = []) {
  const args = [
    "wrangler",
    "pages",
    "dev",
    "dist",
    "--port",
    String(PAGES_PORT),
    "--ip",
    "127.0.0.1",
    "--show-interactive-dev-session=false",
    "--log-level=info",
  ];
  for (const binding of bindings) args.push("--binding", binding);
  const child = spawn("npx", args, {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, CI: "1" },
  });
  let log = "";
  let settled = false;
  const ready = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error(`wrangler did not become ready\n${log.slice(-4000)}`));
    }, 120000);
    const onData = (buf) => {
      log += buf.toString();
      if (!settled && new RegExp(`:${PAGES_PORT}`).test(log) && /Ready|http:\/\//.test(log)) {
        settled = true;
        clearTimeout(timer);
        resolve();
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        reject(new Error(`wrangler exited ${code}\n${log.slice(-4000)}`));
      }
    });
  });
  return { child, ready };
}

function stop(child) {
  return new Promise((resolve) => {
    if (!child || child.exitCode !== null) {
      resolve();
      return;
    }
    const timer = setTimeout(() => {
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch {
        /* already gone */
      }
      resolve();
    }, 4000);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve();
    });
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      clearTimeout(timer);
      resolve();
    }
  });
}

async function post(body) {
  let lastError;
  for (let attempt = 0; attempt < 15; attempt++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PAGES_PORT}/api/leads`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      let json = text;
      try {
        json = JSON.parse(text);
      } catch {
        /* keep text */
      }
      return { status: res.status, json };
    } catch (err) {
      lastError = err;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw lastError;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const mock = await startMock();
let pages;

try {
  writeFileSync(".dev.vars", `N8N_LEAD_WEBHOOK=http://127.0.0.1:${MOCK_PORT}/webhook\n`);
  pages = startPages([`N8N_LEAD_WEBHOOK=http://127.0.0.1:${MOCK_PORT}/webhook`]);
  await pages.ready;

  const ok = await post(lead);
  assert(ok.status === 200 && ok.json?.ok === true, `expected 200 {ok:true}, got ${ok.status} ${JSON.stringify(ok.json)}`);
  assert(mock.hits.length === 1, `expected 1 webhook call, got ${mock.hits.length}`);
  assert(mock.hits[0].url === "/webhook", `unexpected webhook path ${mock.hits[0].url}`);
  assert(mock.hits[0].json.name === lead.name, "webhook payload missing name");
  assert(mock.hits[0].json.website === undefined, "honeypot field was forwarded");
  assert(!JSON.stringify(mock.hits[0].json).includes("N8N_LEAD_WEBHOOK"), "env var name leaked into payload");

  const bot = await post({ ...lead, website: "https://spam.example" });
  assert(bot.status === 200 && bot.json?.ok === true, `honeypot should return {ok:true}, got ${bot.status} ${JSON.stringify(bot.json)}`);
  assert(mock.hits.length === 1, "honeypot submission was forwarded");

  mock.setStatus(500);
  const failed = await post({ ...lead, name: "Should Fail" });
  assert(failed.status === 502, `expected 502 when n8n is not 2xx, got ${failed.status}`);
  assert(mock.hits.length === 2, "non-2xx n8n response should still be attempted");
  console.log("webhook configured: forward, honeypot drop, and 502 ok");

  await stop(pages.child);
  pages = null;
  rmSync(".dev.vars", { force: true });

  const before = mock.hits.length;
  pages = startPages();
  await pages.ready;
  const missing = await post(lead);
  assert(missing.status === 502, `expected 502 when N8N_LEAD_WEBHOOK is unset, got ${missing.status} ${JSON.stringify(missing.json)}`);
  assert(mock.hits.length === before, "unset webhook still forwarded");
  console.log("unset N8N_LEAD_WEBHOOK returns 502 and does not forward");
} finally {
  if (pages) await stop(pages.child);
  rmSync(".dev.vars", { force: true });
  await new Promise((resolve) => mock.server.close(resolve));
}
