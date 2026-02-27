import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import HomePage from "./HomePage";

describe("Home Page", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
  });

  it("renders hero heading", () => {
    expect(screen.getByRole("heading", { name: "Premium Supplies for Exceptional Dogs." })).toBeInTheDocument();
  });

  it("renders hero subheading heading", () => {
    expect(screen.getByText("Curated products chosen for safety, performance, and your dog’s long-term success.")).toBeInTheDocument();
  });

  it("renders 'Shop All' links ", () => {
    const shopAllLinks = screen.getAllByRole("link", { name: "Shop All Page" });
    expect(shopAllLinks).toHaveLength(2);
  });

  it("renders value prop paragraph", () => {
    const expectedParagraph = "We believe the things you use every day should be made with care. Every product in our store is selected for its craftsmanship, durability, and timeless design.";
    expect(screen.getByText(expectedParagraph)).toBeInTheDocument();
  });

  it("renders Shop Training link", () => {
    expect(screen.getByRole("link", { name: "Shop Training Page" })).toBeInTheDocument();
  });
});
