import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/posts", () => ({
  getAllPosts: () => [
    {
      slug: "hello-world",
      frontmatter: { title: "Hello World", date: "2024-06-15", tags: [] },
      content: "",
      readingTime: "3 min read",
    },
    {
      slug: "second-post",
      frontmatter: { title: "Second Post", date: "2024-05-01", tags: [] },
      content: "",
      readingTime: "2 min read",
    },
  ],
}));

const { isAnalyticsConfigured, getPostViewCounts } = await import(
  "@/lib/analytics"
);

describe("isAnalyticsConfigured", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns false when env vars are missing", () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_URL", "");
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "");
    vi.stubEnv("UMAMI_API_KEY", "");
    expect(isAnalyticsConfigured()).toBe(false);
  });

  it("returns false when only some env vars are set", () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_URL", "https://analytics.example.com");
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "");
    vi.stubEnv("UMAMI_API_KEY", "");
    expect(isAnalyticsConfigured()).toBe(false);
  });

  it("returns true when all env vars are set", () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_URL", "https://analytics.example.com");
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "abc-123");
    vi.stubEnv("UMAMI_API_KEY", "key-456");
    expect(isAnalyticsConfigured()).toBe(true);
  });
});

describe("getPostViewCounts", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns configured: false when not configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_URL", "");
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "");
    vi.stubEnv("UMAMI_API_KEY", "");

    const result = await getPostViewCounts("30d");
    expect(result).toEqual({ configured: false });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns error on API failure", async () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_URL", "https://analytics.example.com");
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "abc-123");
    vi.stubEnv("UMAMI_API_KEY", "key-456");

    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, { status: 500, statusText: "Internal Server Error" })
    );

    const result = await getPostViewCounts("30d");
    expect(result).toEqual({
      configured: true,
      error: "Umami API error: 500 Internal Server Error",
    });
  });

  it("returns sorted, filtered post view counts on success", async () => {
    vi.stubEnv("NEXT_PUBLIC_UMAMI_URL", "https://analytics.example.com");
    vi.stubEnv("NEXT_PUBLIC_UMAMI_WEBSITE_ID", "abc-123");
    vi.stubEnv("UMAMI_API_KEY", "key-456");

    const apiResponse = [
      { x: "/blog/second-post", y: 100 },
      { x: "/blog/hello-world", y: 50 },
      { x: "/about", y: 30 }, // not a blog post — should be filtered out
    ];

    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify(apiResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await getPostViewCounts("30d");
    expect(result).toEqual({
      configured: true,
      totalViews: 150,
      posts: [
        {
          slug: "second-post",
          title: "Second Post",
          date: "2024-05-01",
          views: 100,
        },
        {
          slug: "hello-world",
          title: "Hello World",
          date: "2024-06-15",
          views: 50,
        },
      ],
    });
  });
});
