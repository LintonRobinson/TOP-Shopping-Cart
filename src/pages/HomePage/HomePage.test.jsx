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

  it("renders 'SHOP NOW' button", () => {
    expect(screen.getByRole("link", { name: "SHOP NOW" })).toBeInTheDocument();
  });
});
