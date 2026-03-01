import Link from "next/link";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <Link
      href={`/tag/${tag.toLowerCase()}`}
      className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full hover:bg-gray-200 transition-colors"
    >
      {tag}
    </Link>
  );
}
