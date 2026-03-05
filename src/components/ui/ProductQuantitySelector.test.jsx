import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductQuantitySelector from "./ProductQuantitySelector.jsx";

describe("ProductQuantitySelector", () => {
  let mockHandleQuantityUpdate;

  beforeEach(() => {
    mockHandleQuantityUpdate = vi.fn();
  });

  describe("handleQuantityUpdate", () => {
    it("is called when the quantity is updated by clicking the decrementing or incrementing button", async () => {
      render(<ProductQuantitySelector productQuantity={0} handleQuantityUpdate={mockHandleQuantityUpdate} />);
      const user = userEvent.setup();
      const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
      const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
      await user.click(decrementingButton);
      await user.click(incrementingButton);
      expect(mockHandleQuantityUpdate).toHaveBeenCalledTimes(2);
    });
  });

  describe("Quantity Value", () => {
    it("renders the correct passed quantity", () => {
      render(<ProductQuantitySelector productQuantity={0} handleQuantityUpdate={mockHandleQuantityUpdate} />);
      const productQuantity = screen.getByText(0);
      expect(productQuantity).toBeInTheDocument();
    });
  });

  describe("Decrementing button", () => {
    it("renders the decrementing button", () => {
      render(<ProductQuantitySelector productQuantity={0} handleQuantityUpdate={mockHandleQuantityUpdate} />);
      const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
      expect(decrementingButton).toBeInTheDocument();
    });

    it("decrements and renders the quantity", async () => {
      render(<ProductQuantitySelector productQuantity={1} handleQuantityUpdate={mockHandleQuantityUpdate} />);
      const user = userEvent.setup();
      const decrementingButton = screen.getByRole("button", { name: "Decrementing Button" });
      await user.click(decrementingButton);
      const productQuantity = screen.getByText(0);
      expect(productQuantity).toBeInTheDocument();
    });
  });

  describe("Incrementing button", () => {
    it("renders the incrementing button", () => {
      render(<ProductQuantitySelector productQuantity={0} handleQuantityUpdate={mockHandleQuantityUpdate} />);
      const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
      expect(incrementingButton).toBeInTheDocument();
    });

    it("increments and renders the quantity", async () => {
      render(<ProductQuantitySelector productQuantity={0} handleQuantityUpdate={mockHandleQuantityUpdate} />);
      const user = userEvent.setup();
      const incrementingButton = screen.getByRole("button", { name: "Incrementing Button" });
      await user.click(incrementingButton);
      const productQuantity = screen.getByText(1);
      expect(productQuantity).toBeInTheDocument();
    });
  });
});
