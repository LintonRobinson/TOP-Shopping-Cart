import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductQuantitySelector from "./ProductQuantitySelector.jsx";
import useChangeProductQuantity from "../../../hooks/useChangeProductQuantity.js";
import { ProgressBar } from "react-loader-spinner";
import { use } from "react";
describe("ProductQuantitySelector", () => {
  let mockHandleQuantityUpdate;
  vi.mock("../../../hooks/useChangeProductQuantity.js");
  vi.mock("react-loader-spinner", () => {
    const ProgressBar = vi.fn();
    return {
      default: ProgressBar,
      ProgressBar,
    };
  });

  beforeEach(() => {
    mockHandleQuantityUpdate = vi.fn();
    vi.clearAllMocks();
  });

  it("renders 'Add To Cart' button when the product quantity is 0", () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={0} productId={1} productTitle={"Dog Leash"} />);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });
    expect(addToCartButton).toBeInTheDocument();
  });

  it("renders the 'Quantity Selector' button with it's passed quantity of greater than 1", () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={5} productId={1} productTitle={"Dog Leash"} />);
    const productQuantitySpan = screen.getByLabelText("Product quantity");
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
    const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
    expect(decrementingButton).toBeInTheDocument();
    expect(incrementingButton).toBeInTheDocument();
    expect(productQuantitySpan).toHaveTextContent(5);
  });

  it("renders the 'Quantity Selector' button with a quantity of 1 when the 'Add To Cart' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={0} productId={1} productTitle={"Dog Leash"} />);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });
    const user = userEvent.setup();
    await user.click(addToCartButton);
    const productQuantitySpan = screen.getByLabelText("Product quantity");
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
    const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
    expect(decrementingButton).toBeInTheDocument();
    expect(incrementingButton).toBeInTheDocument();
    expect(productQuantitySpan).toHaveTextContent(1);
  });

  it("renders the 'Add To Cart' button when the 'Quantity Selector' decrement button is clicked with a quantity of 1 ", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={1} productId={1} productTitle={"Dog Leash"} />);

    const user = userEvent.setup();
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });

    await user.click(decrementingButton);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });

    expect(addToCartButton).toBeInTheDocument();
  });

  it("decrements the displayed quantity when the 'decrement' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={5} productId={1} productTitle={"Dog Leash"} />);
    const productQuantitySpan = screen.getByLabelText("Product quantity");
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
    const user = userEvent.setup();
    await user.click(decrementingButton);
    expect(productQuantitySpan).toHaveTextContent(4);
  });

  it("renders the loading bar while the server updates cart data after the 'Add to Cart' button is clicked.", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockChangeProductQuantity = vi.fn();
    useChangeProductQuantity
      .mockReturnValueOnce({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: null })
      .mockReturnValue({ changeProductQuantity: mockChangeProductQuantity, loadingState: true, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={0} productId={1} productTitle={"Dog Leash"} />);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });
    const user = userEvent.setup();
    await user.click(addToCartButton);
    expect(ProgressBar).toHaveBeenCalled();
  });

  it("renders the loading bar while the server updates cart data after the 'increment' button is clicked.", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockChangeProductQuantity = vi.fn();
    useChangeProductQuantity
      .mockReturnValueOnce({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: null })
      .mockReturnValue({ changeProductQuantity: mockChangeProductQuantity, loadingState: true, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={1} productId={1} productTitle={"Dog Leash"} />);
    const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
    const user = userEvent.setup();
    await user.click(incrementingButton);
    expect(ProgressBar).toHaveBeenCalled();
  });

  it("renders the loading bar while the server updates cart data after the 'decrement' button is clicked.", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockChangeProductQuantity = vi.fn();
    useChangeProductQuantity
      .mockReturnValueOnce({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: null })
      .mockReturnValue({ changeProductQuantity: mockChangeProductQuantity, loadingState: true, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={1} productId={1} productTitle={"Dog Leash"} />);
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
    const user = userEvent.setup();
    await user.click(decrementingButton);
    expect(ProgressBar).toHaveBeenCalled();
  });

  it("increments the displayed quantity when the 'increment' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={5} productId={1} productTitle={"Dog Leash"} />);
    const productQuantitySpan = screen.getByLabelText("Product quantity");
    const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
    const user = userEvent.setup();
    await user.click(incrementingButton);
    expect(productQuantitySpan).toHaveTextContent(6);
  });

  it("calls handlCartUpdate when 'a Cart' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockHandlCartUpdate = vi.fn();

    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={mockHandlCartUpdate} productQuantity={0} productId={1} productTitle={"Dog Leash"} />);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });
    const user = userEvent.setup();
    await user.click(addToCartButton);
    expect(mockHandlCartUpdate).toHaveBeenCalled();
  });

  it("calls handlCartUpdate when 'decrement' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockHandlCartUpdate = vi.fn();
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={mockHandlCartUpdate} productQuantity={5} productId={1} productTitle={"Dog Leash"} />);
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
    const user = userEvent.setup();
    await user.click(decrementingButton);
    expect(mockHandlCartUpdate).toHaveBeenCalled();
  });

  it("calls handlCartUpdate when 'increment' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockHandlCartUpdate = vi.fn();
    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={mockHandlCartUpdate} productQuantity={5} productId={1} productTitle={"Dog Leash"} />);
    const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
    const user = userEvent.setup();
    await user.click(incrementingButton);
    expect(mockHandlCartUpdate).toHaveBeenCalled();
  });

  it("renders the error button when there is an error with the server updating the cart data after the 'Add To Cart' button is clicked.", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockChangeProductQuantity = vi.fn();
    useChangeProductQuantity
      .mockReturnValueOnce({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: false })
      .mockReturnValue({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: true });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={0} productId={1} productTitle={"Dog Leash"} />);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });
    const user = userEvent.setup();
    await user.click(addToCartButton);
    const errorButton = screen.getByRole("button", { name: "Something went wrong. Try again" });
    expect(errorButton).toBeInTheDocument();
  });

  it("renders the error button when there is an error with the server updating the cart data after the 'increment' button is clicked.", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockChangeProductQuantity = vi.fn();
    useChangeProductQuantity
      .mockReturnValueOnce({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: false })
      .mockReturnValue({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: true });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={1} productId={1} productTitle={"Dog Leash"} />);
    const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
    const user = userEvent.setup();
    await user.click(incrementingButton);
    const errorButton = screen.getByRole("button", { name: "Something went wrong. Try again" });
    expect(errorButton).toBeInTheDocument();
  });

  it("renders the error button when there is an error with the server updating the cart data after the 'decrement' button is clicked.", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };
    const mockChangeProductQuantity = vi.fn();
    useChangeProductQuantity
      .mockReturnValueOnce({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: false })
      .mockReturnValue({ changeProductQuantity: mockChangeProductQuantity, loadingState: false, error: true });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={2} productId={1} productTitle={"Dog Leash"} />);
    const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
    const user = userEvent.setup();
    await user.click(decrementingButton);
    const errorButton = screen.getByRole("button", { name: "Something went wrong. Try again" });
    expect(errorButton).toBeInTheDocument();
  });

  it("renders the 'Add To Cart' pop up when the passed productQuantity prop is 0 and the 'Add To Cart' button is clicked", async () => {
    const mockCart = {
      id: 1,
      userId: 1,
      date: "2020-03-02T00:00:00.000Z",
      products: [],
    };

    useChangeProductQuantity.mockReturnValue({ changeProductQuantity: vi.fn(), loadingState: false, error: null });
    render(<ProductQuantitySelector userCartProducts={mockCart} handleCartUpdate={vi.fn()} productQuantity={0} productId={1} productTitle={"Dog Leash"} />);
    const addToCartButton = screen.getByRole("button", { name: "Add Dog Leash To Cart" });
    const user = userEvent.setup();
    await user.click(addToCartButton);
    expect(screen.getByText("Added To Cart ✅")).toBeInTheDocument();
  });
});
