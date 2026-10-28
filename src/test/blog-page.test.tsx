import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import { parseBlocks } from "@/lib/blogContent";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

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

    expect([...container.querySelectorAll("h1")].map((node) => node.textContent)).toEqual(["Blog"]);
    expect(container.textContent).toContain("1018 Hummingbird Way");
    expect(container.textContent).toContain("Bartlett, IL 60103");
    expect(container.querySelector('a[href="/locations/franklin-park/"]')).toBeTruthy();
    expect(container.textContent).toContain("Need a quote? Carpet cleaning starts at $99");

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
      expect(link.getAttribute("href")).toBe("tel:+16308309867");
    }
    expect(container.querySelectorAll('a[href="tel:+16308309867"]').length).toBeGreaterThan(0);
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
    expect(container.textContent).toContain("Up to 80% of the dirt in your carpet comes from shoes.");
    expect(screen.getAllByRole("link", { name: "Why Carpet Maintenance Matters" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "Read" })).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Service details" }).getAttribute("href")).toBe("/services/#carpet");
    expect(container.textContent).toContain("By Ernest Steamers");
    expect(container.textContent).toContain("1018 Hummingbird Way");
    expect(container.textContent).toContain("Bartlett, IL 60103");
    expect(container.querySelector('a[href="/locations/franklin-park/"]')).toBeTruthy();

    const photos = [...container.querySelectorAll("picture img")];
    expect(photos[0].getAttribute("fetchpriority")).toBe("high");
    expect(photos[0].getAttribute("loading")).toBe("eager");
    expect(photos.filter((photo) => photo.getAttribute("loading") === "lazy").length).toBe(photos.length - 1);

    for (const link of container.querySelectorAll('a[href^="tel:"]')) {
      expect(link.getAttribute("href")).toBe("tel:+16308309867");
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
    expect(allergies.container.textContent).toContain("98% of allergens");
    allergies.unmount();

    const commercial = renderPost("commercial-carpet-cleaning-business");
    expect(commercial.container.textContent).toContain("50% or more");
    expect(commercial.container.textContent).toContain("$3 to $12 per square foot");
    expect(commercial.container.querySelector("table")?.textContent).toContain("Medical/dental offices");
    commercial.unmount();

    const upholstery = renderPost("upholstery-cleaning-benefits");
    expect(upholstery.container.textContent).toContain("$1,000 to $5,000");
    expect(upholstery.container.querySelector('a[href="/services/#upholstery"]')).toBeTruthy();
  });
});

describe("stored article copy", () => {
  it("leaves the unsourced statistics in place and normalizes only the phone link", () => {
    const tips = getPostBySlug("carpet-cleaning-tips-homeowners");
    const allergies = getPostBySlug("carpet-cleaning-allergies-indoor-air-quality");
    const commercial = getPostBySlug("commercial-carpet-cleaning-business");
    const upholstery = getPostBySlug("upholstery-cleaning-benefits");
    expect(tips?.content).toContain("Up to 80% of the dirt in your carpet comes from shoes.");
    expect(tips?.content).toContain("](/blog/carpet-cleaning-allergies-indoor-air-quality/)");
    expect(allergies?.content).toContain("98% of allergens");
    expect(commercial?.content).toContain("50% or more");
    expect(commercial?.content).toContain("$3 to $12 per square foot");
    expect(upholstery?.content).toContain("$1,000 to $5,000 or more");
    expect(tips?.title).toBe("5 Carpet Cleaning Tips Every Homeowner Should Know");
    expect(tips?.metaTitle).toBe("Carpet Cleaning Tips for Homeowners | Ernest Steamers");
    expect(getPostBySlug("remove-pet-stains-odors")?.metaTitle).toBeUndefined();

    for (const post of blogPosts) {
      expect(post.content).toContain("tel:+16308309867");
      expect(post.content).not.toContain("tel:6308309867");
      expect(post.content).toContain("[630-830-9867](tel:+16308309867)");
    }

    const table = parseBlocks(commercial?.content ?? "").find((block) => block.type === "table");
    expect(table?.type === "table" && table.headers).toEqual(["Business Type", "Recommended Frequency"]);
    expect(table?.type === "table" && table.rows).toHaveLength(6);
  });
});
