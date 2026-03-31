import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar.jsx";
import ProductSearchBar from "../../ui/ProductSearchBar/ProductSearchBar.jsx";

vi.mock("../../ui/ProductSearchBar/ProductSearchBar.jsx", () => ({
  default: vi.fn(),
}));
describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    ProductSearchBar.mockReturnValue(<div></div>);
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

  it("renders the product search bar", () => {
    expect(ProductSearchBar).toHaveBeenCalled();
  });

  it("renders the cart button", () => {
    expect(screen.getByRole("link", { name: "Go To User Cart" })).toBeInTheDocument();
  });
});
