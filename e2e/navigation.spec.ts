import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads and shows post cards", async ({ page }) => {
    await page.goto("/");
    const articles = page.locator("article");
    await expect(articles.first()).toBeVisible();
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test("click a post card navigates to blog post page", async ({ page }) => {
    await page.goto("/");
    const firstPostLink = page.locator("article a").first();
    const href = await firstPostLink.getAttribute("href");
    expect(href).toMatch(/^\/blog\//);
    await firstPostLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Blog post page", () => {
  test("has title, content, and tags", async ({ page }) => {
    await page.goto("/");
    const firstPostLink = page.locator("article a").first();
    await firstPostLink.click();

    await expect(page.locator("h1")).toBeVisible();
    // Post should have tag badges linking to tag pages
    const tagLinks = page.locator('a[href^="/tag/"]');
    const tagCount = await tagLinks.count();
    expect(tagCount).toBeGreaterThan(0);
  });
});

test.describe("Header navigation", () => {
  test("Home link navigates to home page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("About link navigates to about page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
  });
});

test.describe("Tag navigation", () => {
  test("clicking a tag badge navigates to tag page with filtered posts", async ({
    page,
  }) => {
    await page.goto("/");
    const tagBadge = page.locator('a[href^="/tag/"]').first();
    const tagHref = await tagBadge.getAttribute("href");
    await tagBadge.click();
    await expect(page).toHaveURL(tagHref!);
    // Tag page should show at least one post
    const articles = page.locator("article");
    await expect(articles.first()).toBeVisible();
  });
});

test.describe("404 page", () => {
  test("shows not found for invalid URLs", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist-12345");
    expect(response?.status()).toBe(404);
  });
});
