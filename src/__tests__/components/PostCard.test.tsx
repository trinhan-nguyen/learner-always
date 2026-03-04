import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PostCard from "@/components/PostCard";
import { Post } from "@/lib/types";

const basePost: Post = {
  slug: "test-post",
  frontmatter: {
    title: "Test Post Title",
    date: "2024-06-15",
    excerpt: "This is a test excerpt.",
    tags: ["React", "Testing"],
    coverImage: "/images/posts/test.jpg",
    published: true,
  },
  content: "Some content",
  readingTime: "3 min read",
};

// Compute expected formatted date the same way the component does
const expectedDate = new Date("2024-06-15").toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

describe("PostCard", () => {
  it("renders title, excerpt, and reading time", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test excerpt.")).toBeInTheDocument();
    expect(screen.getByText("3 min read")).toBeInTheDocument();
  });

  it("renders the formatted date", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });

  it("links to the blog post page", () => {
    render(<PostCard post={basePost} />);
    const link = screen.getByRole("link", { name: /Test Post Title/ });
    expect(link).toHaveAttribute("href", "/blog/test-post");
  });

  it("renders cover image when provided", () => {
    render(<PostCard post={basePost} />);
    const img = screen.getByRole("img", { name: "Test Post Title" });
    expect(img).toBeInTheDocument();
  });

  it("does not render cover image when not provided", () => {
    const postWithoutImage: Post = {
      ...basePost,
      frontmatter: { ...basePost.frontmatter, coverImage: undefined },
    };
    render(<PostCard post={postWithoutImage} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders all tags", () => {
    render(<PostCard post={basePost} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
  });
});
