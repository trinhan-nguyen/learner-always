import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Learner Always
        </h1>
        <p className="text-lg text-gray-500">
          Exploring technology, career growth, and the pursuit of continuous learning.
        </p>
      </section>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts yet. Check back soon!</p>
      )}
    </div>
  );
}
