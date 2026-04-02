import { describe, it, expect, beforeEach } from "vitest";
import { getAllByRole, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProductPage from "./ProductPage.jsx";
import useFetchProduct from "../../hooks/useFetchProduct.js";
import { useOutletContext, useParams } from "react-router";
import ProductQuantitySelector from "../../components/ui/ProductQuantitySelector/ProductQuantitySelector.jsx";
import userEvent from "@testing-library/user-event";

import { Skeleton } from "react-loading-skeleton";

describe("Product Page", () => {
  const mockedProductData = {
    _id: 1,
    title: "Twisted Latigo Dog Lead",
    price: 53.3,
    description: "Made from the same high-quality leather as the popular Latigo line, these top-of-the-line leads offer a sophisticated style alternative.",
    category: "All Products",
    image: "https://www.petsupplies.com/cdn/shop/files/T100701_P.jpg?height=1946&pad_color=fff&v=1738861020&width=1946",
    rating: {
      rate: 3.9,
      count: 120,
    },
  };

  vi.mock("react-router", () => ({
    useOutletContext: vi.fn(),
    useParams: () => ({ productId: "1" }),
  }));

  vi.mock("../../hooks/useFetchProduct.js", () => ({
    default: vi.fn(),
  }));

  vi.mock("../../components/ui/ProductQuantitySelector/ProductQuantitySelector.jsx", () => ({
    default: vi.fn(() => <div data-testid="ProductQuantitySelector" />),
  }));

  vi.mock("react-loading-skeleton", () => {
    const Skeleton = vi.fn();
    return {
      default: Skeleton,
      Skeleton,
    };
  });

  beforeEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("renders 5 loading Skeleton components when data has not been fetched", () => {
    useFetchProduct.mockReturnValue({ loadingState: true, productData: null, error: null });
    useOutletContext.mockReturnValue([
      {
        id: 1,
        userId: 1,
        date: "2020-03-02T00:00:00.000Z",
        products: [],
        __v: 0,
      },
      vi.fn(),
    ]);
    render(<ProductPage />);
    expect(Skeleton).toHaveBeenCalledTimes(10);
  });

  it("renders the fetched products image", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[], vi.fn()]);
    render(<ProductPage />);
    const productImage = screen.getAllByRole("img", { name: mockedProductData.title });

    expect(productImage[0]).toHaveAttribute("src", "https://www.petsupplies.com/cdn/shop/files/T100701_P.jpg?height=1946&pad_color=fff&v=1738861020&width=1946");
  });

  it("renders the fetched products category", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[], vi.fn()]);
    render(<ProductPage />);
    const productCategory = screen.getAllByRole("heading", { name: mockedProductData.category });

    expect(productCategory).toHaveLength(2);
    expect(productCategory[0]).toBeInTheDocument();
  });

  it("renders the fetched products title", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[], vi.fn()]);
    render(<ProductPage />);
    const productTitle = screen.getAllByRole("heading", { name: mockedProductData.title });
    expect(productTitle).toHaveLength(2);
    expect(productTitle[0]).toBeInTheDocument();
  });

  it("renders the fetched products price", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([
      {
        id: 1,
        userId: 1,
        date: "2020-03-02T00:00:00.000Z",
        products: ["ya mama"],
        __v: 0,
      },
      vi.fn(),
    ]);
    render(<ProductPage />);
    const productPrice = screen.getAllByText(`$${mockedProductData.price.toFixed(2)}`);
    expect(productPrice).toHaveLength(2);
    expect(productPrice[0]).toBeInTheDocument();
  });

  it("renders the fetched products description", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[], vi.fn()]);
    render(<ProductPage />);
    const productDescription = screen.getAllByText(mockedProductData.description);
    useOutletContext.mockReturnValue([
      {
        id: 1,
        userId: 1,
        date: "2020-03-02T00:00:00.000Z",
        products: [],
        __v: 0,
      },
      vi.fn(),
    ]);
    expect(productDescription).toHaveLength(2);
    expect(productDescription[0]).toBeInTheDocument();
  });

  it("renders a ProductQuantitySelector button", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[{ id: 1, quantity: 1 }], vi.fn()]);
    render(<ProductPage />);

    expect(ProductQuantitySelector).toHaveBeenCalled();
  });

  it("passes the correct productQuantity when the product is in the cart", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[{ id: 1, quantity: 1 }], vi.fn()]);
    render(<ProductPage />);

    expect(ProductQuantitySelector).toHaveBeenLastCalledWith(
      expect.objectContaining({
        productQuantity: 1,
        productId: "1",
        productTitle: mockedProductData.title,
      }),
      undefined,
    );
  });

  it("passes productQuantity of 0 when the product is not in the cart", () => {
    useFetchProduct.mockReturnValue({ loadingState: false, productData: mockedProductData, error: null });
    useOutletContext.mockReturnValue([[], vi.fn()]);
    render(<ProductPage />);

    expect(ProductQuantitySelector).toHaveBeenLastCalledWith(
      expect.objectContaining({
        productQuantity: 0,
        productId: "1",
        productTitle: mockedProductData.title,
      }),
      undefined,
    );
  });
});
