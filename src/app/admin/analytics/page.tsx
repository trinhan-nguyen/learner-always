import { Metadata } from "next";
import Link from "next/link";
import { getPostViewCounts, TimePeriod } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

const periods: { value: TimePeriod; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "all", label: "All time" },
];

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const { period: rawPeriod } = await searchParams;
  const period: TimePeriod =
    rawPeriod && ["7d", "30d", "90d", "all"].includes(rawPeriod)
      ? (rawPeriod as TimePeriod)
      : "30d";

  const data = await getPostViewCounts(period);

  if (!data.configured) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold mb-2">Not configured</h2>
          <p className="text-sm text-gray-600 mb-4">
            Analytics requires a running Umami instance. Set the following
            environment variables to get started:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 font-mono">
            <li>NEXT_PUBLIC_UMAMI_URL</li>
            <li>NEXT_PUBLIC_UMAMI_WEBSITE_ID</li>
            <li>UMAMI_API_KEY</li>
          </ul>
        </div>
      </div>
    );
  }

  if ("error" in data) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Analytics</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error fetching analytics
          </h2>
          <p className="text-sm text-red-700">{data.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Period selector */}
      <div className="flex gap-2 mb-6">
        {periods.map((p) => (
          <Link
            key={p.value}
            href={`/admin/analytics?period=${p.value}`}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              period === p.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {p.label}
          </Link>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total views</p>
          <p className="text-2xl font-bold">{data.totalViews.toLocaleString()}</p>
        </div>
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Posts tracked</p>
          <p className="text-2xl font-bold">{data.posts.length}</p>
        </div>
      </div>

      {/* Post view table */}
      {data.posts.length === 0 ? (
        <p className="text-sm text-gray-500">
          No page view data available for this period.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-gray-500">
                <th className="pb-2 pr-4 font-medium">#</th>
                <th className="pb-2 pr-4 font-medium">Post</th>
                <th className="pb-2 pr-4 font-medium">Published</th>
                <th className="pb-2 text-right font-medium">Views</th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((post, i) => (
                <tr key={post.slug} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-400">{i + 1}</td>
                  <td className="py-2 pr-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-gray-900 hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-gray-500">{post.date}</td>
                  <td className="py-2 text-right font-medium">
                    {post.views.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
