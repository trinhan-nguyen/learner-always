import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

export const alt = "Learner Always";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const TAG_COLORS: Record<string, { from: string; to: string }> = {
  android: { from: "#10B981", to: "#047857" },
  mobile: { from: "#10B981", to: "#047857" },
  compose: { from: "#22C55E", to: "#15803D" },
  flutter: { from: "#0EA5E9", to: "#0369A1" },
  kotlin: { from: "#8B5CF6", to: "#6D28D9" },
  backend: { from: "#8B5CF6", to: "#5B21B6" },
  coding: { from: "#3B82F6", to: "#1D4ED8" },
  programming: { from: "#3B82F6", to: "#1D4ED8" },
  tech: { from: "#6366F1", to: "#4338CA" },
  ai: { from: "#6366F1", to: "#4338CA" },
  tutorial: { from: "#06B6D4", to: "#0E7490" },
  career: { from: "#F59E0B", to: "#B45309" },
  resume: { from: "#14B8A6", to: "#0F766E" },
  interview: { from: "#F97316", to: "#C2410C" },
  finance: { from: "#10B981", to: "#047857" },
  productivity: { from: "#EC4899", to: "#BE185D" },
};

function getGradient(tags: string[]): { from: string; to: string } {
  for (const tag of tags) {
    const match = TAG_COLORS[tag.toLowerCase()];
    if (match) return match;
  }
  return { from: "#6B7280", to: "#374151" };
}

type Params = Promise<{ slug: string }>;

export default async function OGImage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.frontmatter.title ?? "Learner Always";
  const tags = post?.frontmatter.tags ?? [];
  const gradient = getGradient(tags);

  const fontsDir = path.join(process.cwd(), "src/assets/fonts");
  const interBold = fs.readFileSync(path.join(fontsDir, "Inter-Bold.woff"));
  const interRegular = fs.readFileSync(path.join(fontsDir, "Inter-Regular.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
          fontFamily: "Inter",
        }}
      >
        {/* Top: Logo + site name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <svg
            viewBox="0 0 100 50"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="40"
            height="20"
          >
            <path d="M50 25C50 25 62 5 78 5C90 5 95 15 95 25C95 35 90 45 78 45C62 45 50 25 50 25C50 25 38 5 22 5C10 5 5 15 5 25C5 35 10 45 22 45C38 45 50 25 50 25Z" />
          </svg>
          <span
            style={{
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "24px",
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            Learner Always
          </span>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: title.length > 50 ? "48px" : "56px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              margin: 0,
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom: Tags */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "16px",
                fontWeight: 400,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    }
  );
}
