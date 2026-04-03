import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard.jsx";
import { MemoryRouter } from "react-router";

describe("ProductCard", () => {
  const mockedProductData = {
    ["_id"]: 1,
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

  it("renders the Product Cards image", () => {
    render(
      <MemoryRouter>
        <ProductCard productData={mockedProductData} />
      </MemoryRouter>,
    );
    const cartProductItemImage = screen.getByRole("img", { name: mockedProductData.title });
    expect(cartProductItemImage).toBeInTheDocument();
    expect(cartProductItemImage).toHaveAttribute("src", "https://www.petsupplies.com/cdn/shop/files/T100701_P.jpg?height=1946&pad_color=fff&v=1738861020&width=1946");
  });

  it("renders the Cart Product Items title heading", () => {
    render(
      <MemoryRouter>
        <ProductCard productData={mockedProductData} />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockedProductData.title)).toBeInTheDocument();
  });

  it("renders the Cart Product Items category", () => {
    render(
      <MemoryRouter>
        <ProductCard productData={mockedProductData} />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockedProductData.category)).toBeInTheDocument();
  });

  it("renders the Cart Product Items price", () => {
    render(
      <MemoryRouter>
        <ProductCard productData={mockedProductData} />
      </MemoryRouter>,
    );

    expect(screen.getByText(`$${mockedProductData.price}`)).toBeInTheDocument();
  });
});
