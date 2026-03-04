import Link from "next/link";
import Image from "next/image";
import TagBadge from "./TagBadge";
import { Post } from "@/lib/types";

export default function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <article className="group flex flex-col h-full">
      <Link href={`/blog/${slug}`} className="block">
        {frontmatter.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-black transition-colors mb-2">
          {frontmatter.title}
        </h2>
      </Link>
      <p className="text-gray-500 text-sm mb-3">{frontmatter.excerpt}</p>
      <div className="flex items-end justify-between gap-3 mt-auto">
        <div className="flex gap-2 flex-wrap min-w-0">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <div className="text-xs text-gray-400 text-right shrink-0">
          <div>{readingTime}</div>
          <div>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
