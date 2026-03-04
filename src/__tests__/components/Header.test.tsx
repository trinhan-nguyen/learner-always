import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("renders the site name", () => {
    render(<Header />);
    expect(screen.getByText("Learner Always")).toBeInTheDocument();
  });

  it("renders the logo image", () => {
    render(<Header />);
    const logo = screen.getByAltText("Learner Always logo");
    expect(logo).toBeInTheDocument();
  });

  it("has a Home link with correct href", () => {
    render(<Header />);
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    expect(homeLinks.some((link) => link.getAttribute("href") === "/")).toBe(true);
  });

  it("has an About link with correct href", () => {
    render(<Header />);
    const aboutLink = screen.getByRole("link", { name: /about/i });
    expect(aboutLink).toHaveAttribute("href", "/about");
  });
});
