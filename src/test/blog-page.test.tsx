import { renderToString } from "react-dom/server";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AppProviders, AppRoutes } from "@/App";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import { parseBlocks } from "@/lib/blogContent";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { getSeo, renderSeoHead } from "@/seo";

function words(value: string): string[] {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&quot;/g, '"')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

const leadFields = ["name", "phone", "email", "address", "service", "rooms", "squareFootage", "preferredDate", "message", "website"];

function renderPost(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("blog index", () => {
  it("keeps one h1 and shows a photo card for every post", () => {
    const { container } = render(
      <MemoryRouter>
        <Blog />
      </MemoryRouter>,
    );

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([
      "Carpet Cleaning Tips & Guides",
    ]);
    expect(container.textContent).toContain("10549 Crown Rd #4");
    expect(container.textContent).toContain("Franklin Park, IL 60131");
    expect(container.textContent).not.toContain("Hummingbird");
    expect(container.textContent).not.toContain("60103");
    expect(container.querySelector('a[href="/locations/franklin-park/"]')).toBeTruthy();
    expect(container.textContent).toContain("Need a quote? Carpet cleaning starts at $99");
    expect(container.querySelectorAll("h1")).toHaveLength(1);

    const intro = container.querySelector("#blog-intro");
    expect(intro?.querySelector("a[href='/services/']")).toBeTruthy();
    expect(intro?.querySelector("a[href='/service-areas/']")).toBeTruthy();
    const introWords = words(intro?.textContent ?? "");
    expect(introWords.length).toBeGreaterThanOrEqual(120);
    expect(introWords.length).toBeLessThanOrEqual(150);

    const summaries = [...container.querySelectorAll("[data-summary]")];
    expect(summaries).toHaveLength(blogPosts.length);
    for (const summary of summaries) {
      const count = words(summary.textContent ?? "").length;
      expect(count).toBeGreaterThanOrEqual(25);
      expect(count).toBeLessThanOrEqual(40);
    }

    const topics = container.querySelector("#blog-topics");
    expect(topics?.querySelector("h2")?.textContent).toBe("Topics");
    expect(topics?.querySelectorAll("h1")).toHaveLength(0);
    for (const post of blogPosts) {
      expect(topics?.querySelector(`a[href="/blog/${post.slug}/"]`)).toBeTruthy();
    }
    expect(topics?.querySelector("a[href='/services/#carpet']")).toBeTruthy();
    expect(topics?.querySelector("a[href='/services/#upholstery']")).toBeTruthy();
    expect(topics?.querySelector("a[href='/services/#commercial']")).toBeTruthy();
    const topicWords = words(topics?.textContent ?? "");
    expect(topicWords.length).toBeGreaterThanOrEqual(80);
    expect(topicWords.length).toBeLessThanOrEqual(100);

    const pageHtml = `${renderSeoHead(getSeo("/blog/"))}\n${renderToString(
      <AppProviders>
        <StaticRouter location="/blog/">
          <AppRoutes />
        </StaticRouter>
      </AppProviders>,
    )}`;
    const pageWords = words(pageHtml);
    expect(pageWords.length).toBeGreaterThanOrEqual(600);
    expect(pageWords.length).toBeLessThanOrEqual(760);
    expect(pageWords.join("\n")).not.toMatch(/rating|review|years|guarantee|\b800\b/i);
    expect(pageHtml).not.toContain("(800)");

    for (const post of blogPosts) {
      expect(screen.getByRole("heading", { name: post.title })).toBeTruthy();
      expect(container.querySelector(`a[href="/blog/${post.slug}/"]`)).toBeTruthy();
    }

    const photos = [...container.querySelectorAll("picture img")];
    expect(photos).toHaveLength(blogPosts.length);
    expect(photos[0].getAttribute("fetchpriority")).toBe("high");
    expect(photos[0].getAttribute("loading")).toBe("eager");
    for (const [index, photo] of photos.entries()) {
      expect(photo.getAttribute("width")).toBe("800");
      expect(photo.getAttribute("height")).toBe("512");
      expect(photo.getAttribute("src")).toMatch(/\/images\/blog\/.+\.jpg$/);
      const alt = photo.getAttribute("alt") ?? "";
      expect(alt.length).toBeGreaterThan(10);
      expect(alt.length).toBeLessThanOrEqual(125);
      if (index > 0) expect(photo.getAttribute("loading")).toBe("lazy");
    }

    for (const link of container.querySelectorAll('a[href^="tel:"]')) {
      expect(link.getAttribute("href")).toBe("tel:+16304030180");
    }
    expect(container.querySelectorAll('a[href="tel:+16304030180"]').length).toBeGreaterThan(0);
    expect(container.innerHTML).not.toMatch(/aggregateRating|reviewCount|BlogPosting/);

    fireEvent.click(screen.getByRole("button", { name: "Health" }));
    expect(screen.getByRole("heading", { name: "Carpet Cleaning & Allergies: How Clean Carpets Improve Your Health" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "5 Carpet Cleaning Tips Every Homeowner Should Know" })).toBeNull();
  });
});

describe("blog post", () => {
  it("renders the article, a table of contents, related articles, and the quote form", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const post = getPostBySlug("carpet-cleaning-tips-homeowners");
    if (!post) throw new Error("missing post");
    const { container } = renderPost(post.slug);

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([post.title]);
    expect(screen.getByRole("link", { name: "carpet cleaning for allergies" }).getAttribute("href")).toBe(
      "/blog/carpet-cleaning-allergies-indoor-air-quality/",
    );
    expect(container.textContent).toContain("Much of the dirt in carpet is tracked in on shoes.");
    expect(screen.getAllByRole("link", { name: "Why Carpet Maintenance Matters" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Read" })).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Service details" }).getAttribute("href")).toBe("/services/#carpet");
    expect(container.textContent).toContain("By Ernest Steamers");
    expect(container.textContent).toContain("10549 Crown Rd #4");
    expect(container.textContent).toContain("Franklin Park, IL 60131");
    expect(container.textContent).not.toContain("Hummingbird");
    expect(container.textContent).not.toContain("60103");
    expect(container.querySelector('a[href="/locations/franklin-park/"]')).toBeTruthy();

    const photos = [...container.querySelectorAll("picture img")];
    expect(photos[0].getAttribute("fetchpriority")).toBe("high");
    expect(photos[0].getAttribute("loading")).toBe("eager");
    expect(photos.filter((photo) => photo.getAttribute("loading") === "lazy").length).toBe(photos.length - 1);

    for (const link of container.querySelectorAll('a[href^="tel:"]')) {
      expect(link.getAttribute("href")).toBe("tel:+16304030180");
    }
    expect(container.innerHTML).not.toContain("tel:6308309867");
    expect(container.innerHTML).not.toMatch(/aggregateRating|reviewCount/);

    const form = document.getElementById("article-quote");
    expect(form).toBeTruthy();
    expect(form?.querySelector("[name='website']")?.closest("[aria-hidden='true']")).toBeTruthy();
    expect(form?.querySelector("select[name='service']")).toHaveValue("Carpet Cleaning");
    for (const name of leadFields) {
      expect(form?.querySelector(`[name='${name}']`)).toBeTruthy();
    }

    const view = within(form as HTMLElement);
    fireEvent.change(view.getByLabelText(/Full name/), { target: { value: "Ada Lovelace" } });
    fireEvent.change(view.getByLabelText(/^Phone/), { target: { value: "6305550100" } });
    fireEvent.change(view.getByLabelText(/^Email/), { target: { value: "ada@example.com" } });
    fireEvent.change(view.getByLabelText(/Service address/), { target: { value: "1 Main St, Bartlett, IL" } });
    fireEvent.submit(view.getByRole("button", { name: /Get my free quote/i }).closest("form")!);

    expect(await screen.findAllByText("Thanks — we'll contact you shortly.")).toHaveLength(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/leads", expect.objectContaining({ method: "POST" }));
    const body = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
    expect(body).toMatchObject({
      name: "Ada Lovelace",
      phone: "6305550100",
      email: "ada@example.com",
      address: "1 Main St, Bartlett, IL",
      service: "Carpet Cleaning",
      website: "",
    });
    expect(Object.keys(body).sort()).toEqual([...leadFields, "source"].sort());
    vi.unstubAllGlobals();
  });

  it("keeps the other posts' wording, internal link, and phone link", () => {
    const steam = renderPost("steam-cleaning-vs-dry-cleaning-carpet");
    expect(steam.container.textContent).toContain("hot water extraction (steam cleaning)");
    expect(steam.container.querySelector('a[href="/blog/commercial-carpet-cleaning-business/"]')).toBeTruthy();
    steam.unmount();

    const allergies = renderPost("carpet-cleaning-allergies-indoor-air-quality");
    expect(allergies.container.textContent).toContain("Hot-water extraction removes many allergens");
    expect(allergies.container.textContent).not.toContain("98%");
    allergies.unmount();

    const commercial = renderPost("commercial-carpet-cleaning-business");
    expect(commercial.container.textContent).toContain("Regular professional cleaning helps carpet last longer.");
    expect(commercial.container.textContent).toContain("Replacing carpet costs far more than cleaning it.");
    expect(commercial.container.textContent).toContain("Poor indoor air quality costs businesses in lost productivity.");
    expect(commercial.container.textContent).not.toMatch(/50%|\$3 to \$12|billions of dollars/);
    expect(commercial.container.querySelector("table")?.textContent).toContain("Medical/dental offices");
    commercial.unmount();

    const upholstery = renderPost("upholstery-cleaning-benefits");
    expect(upholstery.container.textContent).toContain("Quality upholstery is a real investment.");
    expect(upholstery.container.textContent).not.toContain("$1,000");
    expect(upholstery.container.querySelector('a[href="/services/#upholstery"]')).toBeTruthy();
  });

  it("publishes the winter salt and slush guide with two visible questions", () => {
    const post = getPostBySlug("winter-salt-slush-carpet-care");
    if (!post) throw new Error("missing post");
    const editorial = post.content
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*`|]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    expect(editorial.length).toBeGreaterThanOrEqual(600);
    expect(post.title.length).toBeLessThanOrEqual(60);
    expect(post.faqs).toHaveLength(2);
    expect(post.content).toContain("](/locations/franklin-park/)");
    expect(post.content).toContain("](/services/#carpet)");
    expect(post.content).not.toContain("10549 Crown Rd");
    expect(post.content).toContain("Carpet cleaning starts at $99.");
    expect(`${post.title}\n${post.excerpt}\n${post.content}\n${post.faqs?.map((item) => `${item.q} ${item.a}`).join("\n")}`).not.toMatch(
      /Hummingbird|60103|certified|1-800-270-6228|AggregateRating/i,
    );

    const { container } = renderPost(post.slug);
    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([post.title]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelector('a[href="/locations/franklin-park/"]')).toBeTruthy();
    expect(container.querySelector('a[href="/services/#carpet"]')).toBeTruthy();
    for (const faq of post.faqs ?? []) {
      expect(container.textContent).toContain(faq.q);
      expect(container.textContent).toContain(faq.a);
    }

    expect(getPostBySlug("carpet-cleaning-tips-homeowners")?.content).toContain(
      "](/blog/winter-salt-slush-carpet-care/)",
    );
    expect(getPostBySlug("steam-cleaning-vs-dry-cleaning-carpet")?.content).toContain(
      "](/blog/winter-salt-slush-carpet-care/)",
    );
    expect(getPostBySlug("carpet-cleaning-tips-homeowners")?.content).toContain("](/services/#carpet)");
    expect(getPostBySlug("carpet-cleaning-tips-homeowners")?.content).toContain("](/locations/franklin-park/)");
    expect(getPostBySlug("steam-cleaning-vs-dry-cleaning-carpet")?.content).toContain("](/services/#carpet)");
    expect(getPostBySlug("steam-cleaning-vs-dry-cleaning-carpet")?.content).toContain("](/blog/commercial-carpet-cleaning-business/)");
  });

  it("publishes the tile and grout frequency guide without a phone number in the body", () => {
    const post = getPostBySlug("how-often-clean-tile-grout");
    if (!post) throw new Error("missing post");
    const editorial = post.content
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[#*`|]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    expect(editorial.length).toBeGreaterThanOrEqual(800);
    expect(editorial.length).toBeLessThanOrEqual(1100);
    expect(post.title).toBe("How Often to Clean Tile and Grout in Chicago-Area Homes");
    expect(post.metaTitle).toBe("How Often to Clean Tile and Grout | Ernest Steamers");
    expect(post.metaTitle.length).toBeLessThanOrEqual(65);
    expect(post.faqs).toBeUndefined();
    expect(post.content).toContain("](/services/#tile-grout)");
    expect(post.content).toContain("](/blog/winter-salt-slush-carpet-care/)");
    expect(post.content).toContain("](/contact/)");
    expect(post.content).not.toMatch(/\$\d/);
    expect(post.image).toBe("equipment");
    expect(post.imageAlt).toBe("Ernest Steamers technician setting up the truck-mounted cleaning unit in the van");
    const copy = `${post.title}\n${post.excerpt}\n${post.content}`;
    expect(copy).not.toMatch(
      /walkthrough|walk the space|walk-through|certified|certification|guarantee|Franklin Park|Bartlett|Crown Rd|Hummingbird|60103|AggregateRating/i,
    );

    const { container } = renderPost(post.slug);
    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual([post.title]);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    const article = container.querySelector("article");
    expect(article?.querySelector("a[href='/services/#tile-grout']")).toBeTruthy();
    expect(article?.querySelector("a[href='/blog/winter-salt-slush-carpet-care/']")).toBeTruthy();
    expect(article?.querySelector("a[href='/contact/']")).toBeTruthy();
    expect(article?.textContent ?? "").not.toMatch(
      /franklin park|bartlett|crown rd|hummingbird|certified|walkthrough/i,
    );
    expect(container.querySelector("select[name='service']")).toHaveValue("Tile & Grout Cleaning");
  });
});

describe("stored article copy", () => {
  it("keeps the phone link and states the old statistics without figures", () => {
    const tips = getPostBySlug("carpet-cleaning-tips-homeowners");
    const allergies = getPostBySlug("carpet-cleaning-allergies-indoor-air-quality");
    const commercial = getPostBySlug("commercial-carpet-cleaning-business");
    const upholstery = getPostBySlug("upholstery-cleaning-benefits");
    expect(tips?.content).toContain("Much of the dirt in carpet is tracked in on shoes.");
    expect(tips?.content).not.toContain("80%");
    expect(tips?.content).toContain("](/blog/carpet-cleaning-allergies-indoor-air-quality/)");
    expect(allergies?.content).toContain("Hot-water extraction removes many allergens");
    expect(allergies?.content).not.toContain("98%");
    expect(commercial?.content).toContain("Regular professional cleaning helps carpet last longer.");
    expect(commercial?.content).toContain("Replacing carpet costs far more than cleaning it.");
    expect(commercial?.content).not.toMatch(/50%|\$3 to \$12|billions of dollars/);
    expect(upholstery?.content).toContain("Quality upholstery is a real investment.");
    expect(upholstery?.content).not.toContain("$1,000");
    const claims = blogPosts.map((post) => `${post.excerpt}\n${post.content}`).join("\n");
    expect(claims).not.toMatch(
      /200,000|4,000 times|toilet seat|Kills Dust Mites|150–200|antimicrobial|12 to 18 months|residue-free|eco-friendly|non-toxic|safe for kids and pets|safe for children|best results|6–12 hours|1–2 hours|4–6 hours|thousands of dollars|UV Light|far more concentrated|deepest clean available|far superior|warranty|enzyme/i,
    );

    expect(tips?.title).toBe("5 Carpet Cleaning Tips Every Homeowner Should Know");
    expect(tips?.metaTitle).toBe("Carpet Cleaning Tips for Homeowners | Ernest Steamers");
    expect(getPostBySlug("remove-pet-stains-odors")?.metaTitle).toBeUndefined();

    for (const post of blogPosts) {
      expect(post.content).not.toContain("tel:6308309867");
      if (post.slug === "how-often-clean-tile-grout") {
        expect(post.content).not.toMatch(/\(\d{3}\)\s*\d{3}-\d{4}|\b\d{3}[-.]\d{3}[-.]\d{4}\b|tel:/);
        continue;
      }
      expect(post.content).toContain("tel:+16304030180");
      expect(post.content).toContain("[(630) 403-0180](tel:+16304030180)");
    }

    const table = parseBlocks(commercial?.content ?? "").find((block) => block.type === "table");
    expect(table?.type === "table" && table.headers).toEqual(["Business Type", "Recommended Frequency"]);
    expect(table?.type === "table" && table.rows).toHaveLength(6);
  });
});
