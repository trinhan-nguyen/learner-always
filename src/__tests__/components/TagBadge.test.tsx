import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TagBadge from "@/components/TagBadge";

describe("TagBadge", () => {
  it("renders the tag text", () => {
    render(<TagBadge tag="React" />);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("links to the correct lowercase tag URL", () => {
    render(<TagBadge tag="TypeScript" />);
    const link = screen.getByRole("link", { name: "TypeScript" });
    expect(link).toHaveAttribute("href", "/tag/typescript");
  });
});
