# Learner Always Blog

## Project Overview
A self-hosted Next.js static blog replacing a Ghost-powered blog at learneralways.com.

## Tech Stack
- **Framework**: Next.js 15 (App Router, server components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + `@tailwindcss/typography`
- **Content**: MDX files in `content/posts/` with `next-mdx-remote` for rendering
- **Syntax Highlighting**: `rehype-pretty-code` + Shiki (github-light theme)

## Project Structure
```
content/posts/          # MDX blog posts with frontmatter
public/images/posts/    # Post cover images
src/
  app/                  # Next.js App Router pages
    blog/[slug]/        # Dynamic blog post pages
    tag/[tag]/          # Dynamic tag filter pages
    about/              # About page
  components/           # React components
  lib/                  # Data layer (posts.ts, types.ts)
```

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build (static generation)
- `npm run lint` — Run ESLint

## Content
- Blog posts are MDX files in `content/posts/`
- Frontmatter: title, date, excerpt, tags, coverImage, published
- Posts with `published: false` are excluded from builds
- Posts are sorted by date (newest first)
