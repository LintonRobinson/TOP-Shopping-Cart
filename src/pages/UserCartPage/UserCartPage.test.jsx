import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router";
import CartProductItem from "../../components/ui/CartProductItem/CartProductItem";
import { IoClose } from "react-icons/io5";
import userEvent from "@testing-library/user-event";
import UserCartPage from "./UserCartPage.jsx";
import { MemoryRouter } from "react-router";
import { TailSpin } from "react-loader-spinner";
import useFetchProducts from "../../hooks/useFetchProducts.js";

describe("UserCartPage", () => {
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

  const emptyMockUserCart = {
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:00.000Z",
    products: [],
    __v: 0,
  };

  const mockStoreProductsData = [
    {
      ["_id"]: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      ["_id"]: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
      rating: {
        rate: 4.1,
        count: 259,
      },
    },
    {
      ["_id"]: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
      rating: {
        rate: 4.7,
        count: 500,
      },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    //CartProductItem.mockReturnValue(<div></div>);
  });

  vi.mock("../../hooks/useFetchProducts.js", () => {
    return {
      default: vi.fn(),
    };
  });

  vi.mock("../../components/ui/CartProductItem/CartProductItem.jsx", () => {
    const CartProductItem = vi.fn();
    return {
      default: CartProductItem,
      CartProductItem,
    };
  });

  vi.mock("react-icons/io5", () => {
    const IoClose = vi.fn();
    return {
      default: IoClose,
      IoClose,
    };
  });

  vi.mock("react-loader-spinner", () => {
    const TailSpin = vi.fn();
    return {
      default: TailSpin,
      TailSpin,
    };
  });

  vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useOutletContext: vi.fn(),
    };
  });

  it("renders the 'TailSpin' loading component when the product data is loading", () => {
    useOutletContext.mockReturnValue([mockUserCart.products, vi.fn()]);
    useFetchProducts.mockReturnValue({ loadingState: true, storeProductsData: null, error: null });

    render(
      <MemoryRouter>
        <UserCartPage />
      </MemoryRouter>,
    );
    expect(TailSpin).toHaveBeenCalled();
  });

  it("renders 'My Cart' heading when the user cart has product items", () => {
    useOutletContext.mockReturnValue([mockUserCart.products, vi.fn()]);
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockStoreProductsData, error: null });

    render(
      <MemoryRouter>
        <UserCartPage />
      </MemoryRouter>,
    );
    expect(screen.getByText("My Cart")).toBeInTheDocument();
  });

  it("renders the correct number of Cart Product items", () => {
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockStoreProductsData, error: null });

    useOutletContext.mockReturnValue([mockUserCart.products, vi.fn()]);
    render(
      <MemoryRouter>
        <UserCartPage />
      </MemoryRouter>,
    );

    expect(CartProductItem).toHaveBeenCalledTimes(3);
  });

  it("renders 'Your Cart Is Empty' heading when the user cart is empty", () => {
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockStoreProductsData, error: null });
    useOutletContext.mockReturnValue([emptyMockUserCart.products, vi.fn()]);
    render(
      <MemoryRouter>
        <UserCartPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("heading", { name: "Your Cart Is Empty." })).toBeInTheDocument();
  });

  it("renders 'SHOP NOW' button when the user cart is empty", () => {
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockStoreProductsData, error: null });

    useOutletContext.mockReturnValue([emptyMockUserCart.products, vi.fn()]);
    render(
      <MemoryRouter>
        <UserCartPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: "Shop All Page" })).toBeInTheDocument();
  });

  it("renders the correct cart totals", () => {
    useFetchProducts.mockReturnValue({ loadingState: false, storeProductsData: mockStoreProductsData, error: null });
    useOutletContext.mockReturnValue([mockUserCart.products, vi.fn()]);
    render(
      <MemoryRouter>
        <UserCartPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Subtotal: $798.04")).toBeInTheDocument();
    expect(screen.getByText("Total: $808.04")).toBeInTheDocument();
  });
});
