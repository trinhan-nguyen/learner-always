import { describe, it, expect, vi, beforeEach } from "vitest";
import path from "path";

const fixtureDir = path.resolve(__dirname, "../fixtures");

// Mock process.cwd() before importing posts module so postsDirectory
// points to our fixture content instead of the real content.
vi.spyOn(process, "cwd").mockReturnValue(fixtureDir);

// Dynamic import after the mock is set up
const { getAllPosts, getPostBySlug, getPostsByTag, getAllTags, getAllSlugs } =
  await import("@/lib/posts");

describe("getAllPosts", () => {
  it("returns only published posts", () => {
    const posts = getAllPosts();
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("published-post");
    expect(slugs).toContain("minimal-post");
    expect(slugs).not.toContain("unpublished-post");
  });

  it("sorts posts by date descending (newest first)", () => {
    const posts = getAllPosts();
    expect(posts[0].slug).toBe("published-post"); // 2024-06-15
    expect(posts[1].slug).toBe("minimal-post"); // 2024-05-01
  });

  it("includes reading time", () => {
    const posts = getAllPosts();
    posts.forEach((post) => {
      expect(post.readingTime).toMatch(/min read/);
    });
  });
});

describe("getPostBySlug", () => {
  it("returns the correct post for a valid slug", () => {
    const post = getPostBySlug("published-post");
    expect(post).not.toBeNull();
    expect(post!.frontmatter.title).toBe("Published Test Post");
    expect(post!.frontmatter.tags).toEqual(["Testing", "Vitest"]);
    expect(post!.frontmatter.coverImage).toBe("/images/posts/test-cover.jpg");
  });

  it("returns null for a non-existent slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeNull();
  });

  it("returns null for an unpublished post", () => {
    expect(getPostBySlug("unpublished-post")).toBeNull();
  });
});

describe("getPostsByTag", () => {
  it("filters posts by tag (case-insensitive)", () => {
    const posts = getPostsByTag("testing");
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("published-post");
    expect(slugs).toContain("minimal-post");
  });

  it("matches tags regardless of case", () => {
    const lower = getPostsByTag("vitest");
    const upper = getPostsByTag("VITEST");
    expect(lower).toEqual(upper);
    expect(lower.length).toBe(1);
    expect(lower[0].slug).toBe("published-post");
  });

  it("returns empty array for unknown tag", () => {
    expect(getPostsByTag("nonexistent")).toEqual([]);
  });
});

describe("getAllTags", () => {
  it("returns sorted unique tags from published posts", () => {
    const tags = getAllTags();
    expect(tags).toEqual(["Testing", "Vitest"]);
  });

  it("does not include tags from unpublished posts", () => {
    const tags = getAllTags();
    expect(tags).not.toContain("Draft");
  });
});

describe("getAllSlugs", () => {
  it("returns all slugs including unpublished", () => {
    const slugs = getAllSlugs();
    expect(slugs).toContain("published-post");
    expect(slugs).toContain("unpublished-post");
    expect(slugs).toContain("minimal-post");
    expect(slugs).toHaveLength(3);
  });
});
