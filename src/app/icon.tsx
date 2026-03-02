import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
          borderRadius: "6px",
        }}
      >
        <svg
          viewBox="0 0 100 50"
          fill="none"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="26"
          height="26"
        >
          <path d="M50 25C50 25 62 5 78 5C90 5 95 15 95 25C95 35 90 45 78 45C62 45 50 25 50 25C50 25 38 5 22 5C10 5 5 15 5 25C5 35 10 45 22 45C38 45 50 25 50 25Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
