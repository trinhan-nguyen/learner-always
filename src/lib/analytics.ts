import { getAllPosts } from "@/lib/posts";

export type TimePeriod = "7d" | "30d" | "90d" | "all";

export interface PostViewCount {
  slug: string;
  title: string;
  date: string;
  views: number;
}

export type AnalyticsData =
  | { configured: false }
  | { configured: true; error: string }
  | { configured: true; posts: PostViewCount[]; totalViews: number };

export function isAnalyticsConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_UMAMI_URL &&
    process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID &&
    process.env.UMAMI_API_KEY
  );
}

function getPeriodDates(period: TimePeriod): { startAt: number; endAt: number } {
  const endAt = Date.now();
  const days: Record<TimePeriod, number> = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    all: 365 * 5,
  };
  const startAt = endAt - days[period] * 24 * 60 * 60 * 1000;
  return { startAt, endAt };
}

interface UmamiMetric {
  x: string;
  y: number;
}

async function umamiGet<T>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
  const apiKey = process.env.UMAMI_API_KEY;

  const url = new URL(`${umamiUrl}/api${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { "x-umami-api-key": apiKey! },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Umami API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getPostViewCounts(
  period: TimePeriod = "30d"
): Promise<AnalyticsData> {
  if (!isAnalyticsConfigured()) {
    return { configured: false };
  }

  try {
    const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!;
    const { startAt, endAt } = getPeriodDates(period);

    const metrics = await umamiGet<UmamiMetric[]>(
      `/websites/${websiteId}/metrics`,
      {
        startAt: String(startAt),
        endAt: String(endAt),
        type: "url",
      }
    );

    const posts = getAllPosts();
    const postMap = new Map(
      posts.map((p) => [`/blog/${p.slug}`, p])
    );

    const postViews: PostViewCount[] = [];
    let totalViews = 0;

    for (const metric of metrics) {
      const post = postMap.get(metric.x);
      if (post) {
        postViews.push({
          slug: post.slug,
          title: post.frontmatter.title,
          date: post.frontmatter.date,
          views: metric.y,
        });
        totalViews += metric.y;
      }
    }

    postViews.sort((a, b) => b.views - a.views);

    return { configured: true, posts: postViews, totalViews };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { configured: true, error: message };
  }
}
