import Image from "next/image";
import TagBadge from "./TagBadge";
import { Post } from "@/lib/types";

export default function PostLayout({
  post,
  children,
}: {
  post: Post;
  children: React.ReactNode;
}) {
  const { frontmatter, readingTime } = post;

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <time>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>&middot;</span>
          <span>{readingTime}</span>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={`/blog/${post.slug}/opengraph-image`}
            alt={frontmatter.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      </header>
      <div className="prose prose-gray max-w-none">{children}</div>
    </article>
  );
}
