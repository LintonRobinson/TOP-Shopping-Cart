import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Footer from "./Footer.jsx";

describe("Footer", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
  });

  it("renders Shop Training link", () => {
    expect(screen.getByRole("link", { name: "Shop Training Page" })).toBeInTheDocument();
  });

  it("renders Shop All link", () => {
    expect(screen.getByRole("link", { name: "Shop All Page" })).toBeInTheDocument();
  });

  it("renders Home link", () => {
    expect(screen.getByRole("link", { name: "Home Page" })).toBeInTheDocument();
  });
});
