import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CartProductItem from "./CartProductItem.jsx";
import ProductQuantitySelector from "../ProductQuantitySelector/ProductQuantitySelector.jsx";
import userEvent from "@testing-library/user-event";
import { TailSpin } from "react-loader-spinner";
import useChangeProductQuantity from "../../../hooks/useChangeProductQuantity.js";

describe("CartProductItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockedProductData = {
    id: 1,
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

  const mockUserCart = {
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:00.000Z",
    products: [
      {
        id: 1,
        quantity: 4,
      },
      {
        id: 2,
        quantity: 1,
      },
      {
        id: 3,
        quantity: 6,
      },
    ],
    __v: 0,
  };

  vi.mock("../../../hooks/useChangeProductQuantity.js");

  vi.mock("react-loader-spinner", () => {
    const TailSpin = vi.fn();
    return {
      default: TailSpin,
      TailSpin,
    };
  });

  vi.mock("../ProductQuantitySelector/ProductQuantitySelector.jsx", () => ({
    default: vi.fn(() => <div></div>),
  }));

  it("renders the Cart Product Items image", () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: false, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });
    render(
      <CartProductItem
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
      />,
    );
    const cartProductItemImage = screen.getByRole("img", { name: mockedProductData.title });
    expect(cartProductItemImage).toBeInTheDocument();
    expect(cartProductItemImage).toHaveAttribute("src", "https://www.petsupplies.com/cdn/shop/files/T100701_P.jpg?height=1946&pad_color=fff&v=1738861020&width=1946");
  });

  it("renders the Cart Product Items title", () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: false, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });

    render(
      <CartProductItem
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
      />,
    );
    expect(screen.getByText(mockedProductData.title)).toBeInTheDocument();
  });

  it("renders the Cart Product Items category", () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: false, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });
    render(
      <CartProductItem
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
      />,
    );
    expect(screen.getByText(mockedProductData.category)).toBeInTheDocument();
  });

  it("renders the Cart Product Items price", () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: false, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });
    render(
      <CartProductItem
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
      />,
    );
    expect(screen.getByText(`$${mockedProductData.price.toFixed(2)}`)).toBeInTheDocument();
  });

  it("renders the 'Remove From Cart' button", () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: false, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });

    render(
      <CartProductItem
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
      />,
    );

    const removeFromCartButton = screen.getByRole("button", { name: `Remove ${mockedProductData.title} From Cart` });
    expect(removeFromCartButton).toBeInTheDocument();
  });

  it("calls the passed function (handleCartUpdate) to CartProductItem when the removeFromCartButton is clicked", async () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: false, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });
    const mockHandleCartUpdate = vi.fn();
    render(
      <CartProductItem
        userCartProducts={mockUserCart.products}
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
        handleCartUpdate={mockHandleCartUpdate}
      />,
    );
    const user = userEvent.setup();
    const removeFromCartButton = screen.getByRole("button", { name: `Remove ${mockedProductData.title} From Cart` });
    await user.click(removeFromCartButton);
    expect(mockHandleCartUpdate).toHaveBeenCalled();
  });

  it("renders the loading 'TailSpin' component when the user clicks remove product from cart button and the components loading state is true", async () => {
    useChangeProductQuantity.mockReturnValue({ loadingState: true, error: false, changeProductQuantity: vi.fn(() => null), setError: vi.fn() });
    const mockHandleCartUpdate = vi.fn();
    render(
      <CartProductItem
        userCartProducts={mockUserCart.products}
        cartProductItemDetails={{
          cartProductItemImage: mockedProductData.image,
          cartProductItemName: mockedProductData.title,
          cartProductItemCategory: mockedProductData.category,
          cartProductItemPrice: mockedProductData.price,
        }}
        cartProductItemQuantity={1}
        handleCartUpdate={mockHandleCartUpdate}
      />,
    );

    expect(TailSpin).toHaveBeenCalled();
  });
});
