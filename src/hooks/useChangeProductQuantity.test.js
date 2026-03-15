import { describe, expect } from "vitest";
import useChangeProductQuantity from "./useChangeProductQuantity.js";
import { renderHook, waitFor } from "@testing-library/react";

describe("useChangeProductQuantity", () => {
  const previousCartData = {
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:00.000Z",
    products: [
      {
        productId: 1,
        quantity: 3,
      },
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 3,
        quantity: 6,
      },
    ],
    __v: 0,
  };

  const successfulPutRequestData = {
    id: 1,
    userId: 1,
    date: "2020-03-02T00:00:00.000Z",
    products: [
      {
        productId: 1,
        quantity: 4,
      },
      {
        productId: 2,
        quantity: 1,
      },
      {
        productId: 3,
        quantity: 6,
      },
    ],
    __v: 0,
  };

  beforeEach(() => vi.restoreAllMocks());

  const mockResponse = {
    ok: true,
    json: () => Promise.resolve(successfulPutRequestData),
  };

  it("initializes with a loadingState of true", async () => {
    global.fetch = vi.fn(() => Promise.resolve(mockResponse));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartData, 2, 3));
    await waitFor(() => {
      expect(result.current.loadingState).toBe(true);
    });
  });

  it("completes a successful PUT request and updates cart", async () => {
    global.fetch = vi.fn(() => Promise.resolve(mockResponse));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartData, 2, 3));

    await waitFor(() => {
      expect(result.current.updatedUserCart).toEqual(successfulPutRequestData);
    });
  });

  it("has a loading state of false after a successful PUT request", async () => {
    global.fetch = vi.fn(() => Promise.resolve(mockResponse));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartData, 2, 3));

    await waitFor(() => {
      expect(result.current.updatedUserCart).toEqual(successfulPutRequestData);
    });

    expect(result.current.loadingState).toBe(false);
  });

  it("handles a failed PUT request", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("handles a failed PUT request")));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartData, 2, 3));

    await waitFor(() => {
      expect(result.current.error.message).toBe("handles a failed PUT request");
    });
  });

  it("has a loading state of false after a failed PUT request", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("handles a failed PUT request")));

    const { result } = renderHook(() => useChangeProductQuantity(previousCartData, 2, 3));

    await waitFor(() => {
      expect(result.current.error.message).toBe("handles a failed PUT request");
    });

    expect(result.current.loadingState).toBe(false);
  });
});
