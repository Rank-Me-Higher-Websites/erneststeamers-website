/**
 * Measures the sticky header at real phone and tablet viewports.
 * Fails when links, the logo, or buttons overlap, wrap, overflow, or clip.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const base = process.env.HEADER_CHECK_URL ?? "http://localhost:5000/";
const chromeBin = ["/usr/local/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/google-chrome"].find((bin) =>
  existsSync(bin),
);

export const HEADER_VIEWPORTS = [
  [568, 320],
  [667, 375],
  [740, 360],
  [844, 390],
  [852, 393],
  [320, 568],
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [820, 1180],
  [1180, 820],
];

const DESKTOP_NAV_MIN = 1024;

if (!chromeBin) {
  console.error("google-chrome not found");
  process.exit(2);
}

const chrome = spawn(
  chromeBin,
  [
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--remote-debugging-port=9333",
    "--user-data-dir=/tmp/chrome-header-check",
    "about:blank",
  ],
  { stdio: "ignore" },
);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForChrome() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const response = await fetch("http://127.0.0.1:9333/json/version");
      if (response.ok) return response.json();
    } catch {
      await sleep(150);
    }
  }
  throw new Error("Chrome did not start");
}

function connect(url) {
  const browser = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  browser.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const waiter = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(JSON.stringify(message.error)));
    else waiter.resolve(message.result);
  });
  const ready = new Promise((resolve) => browser.addEventListener("open", resolve));
  function send(method, params = {}, sessionId) {
    const msgId = ++id;
    const payload = { id: msgId, method, params };
    if (sessionId) payload.sessionId = sessionId;
    browser.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      pending.set(msgId, { resolve, reject });
      setTimeout(() => {
        if (!pending.has(msgId)) return;
        pending.delete(msgId);
        reject(new Error(`timeout ${method}`));
      }, 20000);
    });
  }
  return { browser, ready, send };
}

const measureExpression = `(() => {
  const visible = (el) => {
    if (!el) return false;
    const style = getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1;
  };
  const box = (el) => {
    const rect = el.getBoundingClientRect();
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
  };
  const overlaps = (a, b) => a.left < b.right - 1 && a.right > b.left + 1 && a.top < b.bottom - 1 && a.bottom > b.top + 1;
  const row = document.querySelector("[data-testid='header-row']");
  const nav = row?.closest("nav");
  const primary = document.querySelector("[data-testid='primary-nav']");
  const menuButton = document.querySelector("nav button[aria-label='Open menu'], nav button[aria-label='Close menu']");
  const menu = document.querySelector("[data-testid='mobile-menu']");
  const controls = [];
  const logo = row?.querySelector("a[href='/']");
  if (logo && visible(logo)) controls.push(["logo", logo]);
  for (const link of primary?.querySelectorAll("a") ?? []) {
    if (visible(link)) controls.push([link.innerText.replace(/\\s+/g, " ").trim(), link]);
  }
  for (const phone of row?.querySelectorAll("a[href^='tel:']") ?? []) {
    if (visible(phone)) controls.push(["phone", phone]);
  }
  const quote = [...row?.querySelectorAll("a, button") ?? []].find((el) => (el.getAttribute("aria-label") || "") === "Get a Quote" && visible(el));
  if (quote) controls.push(["quote", quote]);
  if (menuButton && visible(menuButton)) controls.push(["menu", menuButton]);
  const problems = [];
  const rowBox = box(row);
  if (row.scrollWidth > row.clientWidth + 1) problems.push("header row overflows horizontally");
  if (rowBox.height > 68) problems.push("header row is taller than one line (" + Math.round(rowBox.height) + "px)");
  if (nav && !menu && nav.getBoundingClientRect().height > rowBox.height + 2) problems.push("closed header has more than one row");
  for (let i = 0; i < controls.length; i += 1) {
    const [name, el] = controls[i];
    const item = box(el);
    if (item.left < rowBox.left - 1 || item.right > rowBox.right + 1 || item.top < rowBox.top - 1 || item.bottom > rowBox.bottom + 1) {
      problems.push(name + " is outside the header row");
    }
    if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2) {
      problems.push(name + " text is wrapped or clipped");
    }
    for (let j = i + 1; j < controls.length; j += 1) {
      if (overlaps(item, box(controls[j][1]))) problems.push(name + " overlaps " + controls[j][0]);
    }
  }
  const desktop = visible(primary);
  const width = window.innerWidth;
  if (width >= ${DESKTOP_NAV_MIN}) {
    if (!desktop) problems.push("desktop nav is hidden at " + width);
    if (menuButton && visible(menuButton)) problems.push("menu button still visible at " + width);
    const franchise = document.querySelector("[data-testid='nav-franchise-link']");
    if (!franchise || !visible(franchise)) problems.push("Franchise is missing from the desktop nav");
  } else if (desktop) {
    problems.push("desktop nav is showing below " + ${DESKTOP_NAV_MIN});
  }
  let menuReport = null;
  if (menu && visible(menu)) {
    const labels = [...menu.querySelectorAll("a")].map((link) => link.innerText.replace(/\\s+/g, " ").trim());
    for (const label of ["Home", "Services", "Service Areas", "About Us", "Blog", "Contact", "Franchise (opens in a new tab)"]) {
      if (!labels.some((item) => item.startsWith(label.replace(" (opens in a new tab)", "")) )) problems.push("menu missing " + label);
    }
    const menuBox = box(menu);
    const items = [...menu.querySelectorAll("a")].filter(visible);
    items.forEach((link, index) => {
      const item = box(link);
      if (item.height > 56) problems.push(labels[index] + " wraps in the menu");
      if (link.scrollWidth > link.clientWidth + 1) problems.push(labels[index] + " is clipped in the menu");
      for (let other = index + 1; other < items.length; other += 1) {
        if (overlaps(item, box(items[other]))) problems.push(labels[index] + " overlaps another menu item");
      }
    });
    const franchise = menu.querySelector("[data-testid='nav-franchise-link-mobile']");
    franchise?.scrollIntoView({ block: "nearest" });
    const after = franchise?.getBoundingClientRect();
    const menuAfter = menu.getBoundingClientRect();
    if (!after || after.top < menuAfter.top - 1 || after.bottom > menuAfter.bottom + 1) {
      problems.push("Franchise cannot be scrolled into the open menu");
    }
    menuReport = { scrollHeight: menu.scrollHeight, clientHeight: menu.clientHeight, labels };
  }
  const phone = [...document.querySelectorAll("nav a[href^='tel:']")].map((link) => link.getAttribute("href"));
  if (!phone.includes("tel:+16304030180")) problems.push("header phone href changed");
  return JSON.stringify({
    width,
    height: window.innerHeight,
    desktop,
    rowHeight: Math.round(rowBox.height),
    rowClient: row.clientWidth,
    rowScroll: row.scrollWidth,
    spare: row.clientWidth - row.scrollWidth,
    quote: quote ? quote.innerText.replace(/\\s+/g, " ").trim() : null,
    phoneText: (() => {
      const phoneControl = controls.find(([name]) => name === "phone");
      return phoneControl ? phoneControl[1].innerText.replace(/\\s+/g, " ").trim() : null;
    })(),
    menu: menuReport,
    problems,
  });
})()`;

const results = [];
try {
  const version = await waitForChrome();
  const { browser, ready, send } = connect(version.webSocketDebuggerUrl);
  await ready;
  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);

  async function evaluate() {
    const response = await send(
      "Runtime.evaluate",
      { expression: measureExpression, returnByValue: true },
      sessionId,
    );
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    return JSON.parse(response.result.value);
  }

  for (const [width, height] of HEADER_VIEWPORTS) {
    await send(
      "Emulation.setDeviceMetricsOverride",
      { width, height, deviceScaleFactor: 1, mobile: width < DESKTOP_NAV_MIN },
      sessionId,
    );
    await send("Page.navigate", { url: base }, sessionId);
    await send(
      "Runtime.evaluate",
      {
        expression:
          "new Promise((resolve) => { const start = Date.now(); const timer = setInterval(() => { if (document.querySelector('[data-testid=header-row]') && document.fonts.status === 'loaded') { clearInterval(timer); resolve('ready'); } else if (Date.now() - start > 8000) { clearInterval(timer); resolve('timeout'); } }, 40); })",
        awaitPromise: true,
      },
      sessionId,
    );
    const closed = await evaluate();
    let opened = null;
    if (width < DESKTOP_NAV_MIN) {
      await send(
        "Runtime.evaluate",
        { expression: "document.querySelector(\"nav button[aria-label='Open menu']\")?.click()", returnByValue: true },
        sessionId,
      );
      await sleep(50);
      opened = await evaluate();
    }
    results.push({ closed, opened });
    const problems = [...closed.problems, ...(opened?.problems ?? [])];
    const state = closed.desktop ? "desktop-nav" : "collapsed";
    console.log(
      `${width}x${height} ${state} spare=${closed.spare}px quote="${closed.quote}" phone="${closed.phoneText}" ${problems.length ? "FAIL " + problems.join("; ") : "ok"}`,
    );
  }
  browser.close();
} finally {
  chrome.kill();
}

const failed = results.some((result) => result.closed.problems.length || result.opened?.problems.length);
if (failed) process.exit(1);
