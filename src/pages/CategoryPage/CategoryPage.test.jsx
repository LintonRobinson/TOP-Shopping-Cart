import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router";
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

  vi.mock("react-router", () => ({
    useParams: vi.fn(),
  }));
  vi.mock("../../hooks/useFetchProducts.js");

  vi.mock("../../components/ui/ProductCard/ProductCard.jsx", () => ({
    default: mockedProductCard,
  }));

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({});
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });
  });

  describe("heading", () => {
    it("renders 'All Products' as category heading when a category is not passed", () => {
      useParams.mockReturnValue({ category: "all" });
      render(<CategoryPage />);
      expect(screen.getByText("All Products")).toBeInTheDocument();
    });

    it("renders the correct category heading when a category is extracted from url param", () => {
      useParams.mockReturnValue({ category: "training" });
      render(<CategoryPage />);
      expect(screen.getByText("Training")).toBeInTheDocument();
    });
  });

  describe("product count", () => {
    it("renders the correct number of all products", () => {
      useParams.mockReturnValue({ category: "all" });
      render(<CategoryPage />);
      const numberOfProductsText = "2 Products";
      expect(screen.getByText(numberOfProductsText)).toBeInTheDocument();
    });
  });

  describe("product card", () => {
    it("renders the correct number of product cards", async () => {
      useParams.mockReturnValue({ category: "all" });
      render(<CategoryPage />);
      expect(mockedProductCard).toHaveBeenCalledTimes(2);
    });
  });
});
