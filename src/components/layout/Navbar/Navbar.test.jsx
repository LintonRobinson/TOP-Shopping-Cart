import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar.jsx";

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
  });

  it("renders Home links", () => {
    const homeLinks = screen.getAllByRole("link", { name: "Home Page" });
    expect(homeLinks).toHaveLength(2);
  });

  it("renders Shop link", () => {
    expect(screen.getByRole("link", { name: "Shop All Page" })).toBeInTheDocument();
  });
});
