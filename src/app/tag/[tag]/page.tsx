import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { Metadata } from "next";

type Params = Promise<{ tag: string }>;

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `All blog posts tagged with "${decodedTag}"`,
  };
}

export default async function TagPage({ params }: { params: Params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tagged: {decodedTag}
        </h1>
        <p className="text-gray-500">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts found with this tag.</p>
      )}
    </div>
  );
}
