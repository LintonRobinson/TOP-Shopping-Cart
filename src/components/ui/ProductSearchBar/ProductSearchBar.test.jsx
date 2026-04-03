import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import ProductSearchBar from "./ProductSearchBar.jsx";
import userEvent from "@testing-library/user-event";
import useFetchProducts from "../../../hooks/useFetchProducts.js";
import { MemoryRouter } from "react-router";
import { ThreeDots } from "react-loader-spinner";

describe("ProductSearchBar", () => {
  const mockedStoreProducts = [
    {
      ["_id"]: 0,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
    {
      ["_id"]: 1,
      title: "Mens Cotton Jacket",
      price: 0.2,
      description: "string 2",
      category: "string 2z",
      image: "http://example2.com",
    },
    {
      ["_id"]: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 0.2,
      description: "string 2",
      category: "string 2",
      image: "http://example2.com",
    },
  ];
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock("../../../hooks/useFetchProducts.js");

  vi.mock("react-loader-spinner", () => {
    const ThreeDots = vi.fn();
    return {
      default: ThreeDots,
      ThreeDots,
    };
  });

  it("renders an input for the user to search", () => {
    useFetchProducts.mockReturnValue({ loadingState: true, storeProductsData: null, error: null });

    render(<ProductSearchBar />);
    expect(screen.getByRole("textbox", { name: "Product Search Bar Text Entry" })).toBeInTheDocument();
  });

  it("renders loading 'Three Dots' when data has not been loaded", async () => {
    const user = userEvent.setup();
    useFetchProducts.mockReturnValue({ loadingState: true, storeProductsData: null, error: null });

    render(
      <MemoryRouter>
        <ProductSearchBar />
      </MemoryRouter>,
    );
    const userInput = screen.getByRole("textbox", { name: "Product Search Bar Text Entry" });
    await user.type(userInput, "me");

    expect(ThreeDots).toHaveBeenCalled();
  });

  it("renders the correct search results count", async () => {
    const user = userEvent.setup();
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });

    render(
      <MemoryRouter>
        <ProductSearchBar />
      </MemoryRouter>,
    );
    const userInput = screen.getByRole("textbox", { name: "Product Search Bar Text Entry" });
    await user.type(userInput, "me");
    expect(screen.getByText("2 Products")).toBeInTheDocument();
  });

  it("renders an product search matches for search query that matches", async () => {
    const user = userEvent.setup();
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });

    render(
      <MemoryRouter>
        <ProductSearchBar />
      </MemoryRouter>,
    );
    const userInput = screen.getByRole("textbox", { name: "Product Search Bar Text Entry" });
    await user.type(userInput, "me");
    expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument();
    expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();
    expect(screen.queryByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")).not.toBeInTheDocument();
  });

  it("renders no products found if no matches have been found", async () => {
    const user = userEvent.setup();
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });

    render(
      <MemoryRouter>
        <ProductSearchBar />
      </MemoryRouter>,
    );
    const userInput = screen.getByRole("textbox", { name: "Product Search Bar Text Entry" });
    await user.type(userInput, "xo");
    expect(screen.getByText("No Products Found!")).toBeInTheDocument();
  });

  it("renders mobile search bar when user clicks magnifying glass icon button", async () => {
    const user = userEvent.setup();
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });

    render(
      <MemoryRouter>
        <ProductSearchBar />
      </MemoryRouter>,
    );
    const showMobileSearchBarButton = screen.getByRole("button", { name: "Show Mobile Search Bar" });

    let mobileSearchBar = screen.queryByLabelText("Mobile Product Search Bar");
    expect(mobileSearchBar).not.toBeInTheDocument();

    await user.click(showMobileSearchBarButton);
    mobileSearchBar = screen.queryByLabelText("Mobile Product Search Bar");

    expect(mobileSearchBar).toBeInTheDocument();
  });

  it("does not render  mobile search bar when user clicks cancel search button", async () => {
    const user = userEvent.setup();
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockedStoreProducts, error: null });

    render(
      <MemoryRouter>
        <ProductSearchBar />
      </MemoryRouter>,
    );
    const showMobileSearchBarButton = screen.getByRole("button", { name: "Show Mobile Search Bar" });

    let mobileSearchBar = screen.queryByLabelText("Mobile Product Search Bar");
    expect(mobileSearchBar).not.toBeInTheDocument();

    await user.click(showMobileSearchBarButton);
    mobileSearchBar = screen.queryByLabelText("Mobile Product Search Bar");

    expect(mobileSearchBar).toBeInTheDocument();
    const cancelSearchButton = screen.getByRole("button", { name: "Cancel Search Button" });
    await user.click(cancelSearchButton);
    mobileSearchBar = screen.queryByLabelText("Mobile Product Search Bar");
    expect(mobileSearchBar).not.toBeInTheDocument();
  });
});
