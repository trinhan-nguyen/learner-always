export default function InfinityLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M50 25C50 25 62 5 78 5C90 5 95 15 95 25C95 35 90 45 78 45C62 45 50 25 50 25C50 25 38 5 22 5C10 5 5 15 5 25C5 35 10 45 22 45C38 45 50 25 50 25Z" />
    </svg>
  );
}
