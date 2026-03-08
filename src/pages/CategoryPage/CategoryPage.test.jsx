import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CategoryPage from "./CategoryPage.jsx";
import useFetchProducts from "../../hooks/useFetchProducts.js";

describe("CategoryPage", () => {
  const mockedProductCard = vi.hoisted(() => vi.fn(() => <div />));
  const mockedStoreProducts = [
    {
      id: 0,
      title: "Dog Leash",
      price: 10,
      description: "A dog leash",
      category: "training",
      image: "http://example.com",
    },
    {
      id: 1,
      title: "Dog Toy",
      price: 0.2,
      description: "A dog toy",
      category: "toys",
      image: "http://example2.com",
    },
  ];
  vi.mock("../../hooks/useFetchProducts.js");

  vi.mock("../../components/ui/ProductCard/ProductCard.jsx", () => ({
    default: mockedProductCard,
  }));

  beforeEach(() => {
    vi.clearAllMocks();
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });
  });

  describe("heading", () => {
    it("renders 'All Products' as category heading when a category is not passed", () => {
      render(<CategoryPage />);
      expect(screen.getByText("All Products")).toBeInTheDocument();
    });

    it("renders the passed category as category heading when a category is passed", () => {
      render(<CategoryPage currentCategory={mockedStoreProducts[0].title} />);
      expect(screen.getByText(mockedStoreProducts[0].title)).toBeInTheDocument();
    });
  });

  describe("product count", () => {
    it("renders the correct number of all products", () => {
      render(<CategoryPage />);
      const numberOfProductsText = "2 Products";
      expect(screen.getByText(numberOfProductsText)).toBeInTheDocument();
    });
  });

  describe("product card", () => {
    it("renders the correct number of product cards", async () => {
      render(<CategoryPage />);
      await waitFor(() => {
        expect(mockedProductCard).toHaveBeenCalledTimes(2);
      });
    });
  });
});
