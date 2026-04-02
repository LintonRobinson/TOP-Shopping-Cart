import { describe, expect, it, beforeEach } from "vitest";
import useChangeProductQuantity from "./useChangeProductQuantity.js";
import { renderHook, act, waitFor } from "@testing-library/react";

describe("useChangeProductQuantity", () => {
  const previousCartProducts = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 1 },
    { id: 3, quantity: 6 },
  ];

  const successfulPutResponseData = {
    id: 1,
    products: [
      { id: 1, quantity: 4 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 6 },
    ],
  };

  beforeEach(() => vi.restoreAllMocks());

  const mockResponse = {
    ok: true,
    json: () => Promise.resolve(successfulPutResponseData),
  };

  it("initializes with a loadingState of false", () => {
    const { result } = renderHook(() => useChangeProductQuantity(previousCartProducts, 1));
    expect(result.current.loadingState).toBe(false);
  });

  it("completes a successful PUT request and returns updated cart", async () => {
    global.fetch = vi.fn(() => Promise.resolve(mockResponse));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartProducts, 1));

    let returnedCart;
    await act(async () => {
      returnedCart = await result.current.changeProductQuantity(4);
    });

    expect(returnedCart).toEqual(successfulPutResponseData);
  });

  it("has a loading state of false after a successful PUT request", async () => {
    global.fetch = vi.fn(() => Promise.resolve(mockResponse));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartProducts, 1));

    await act(async () => {
      await result.current.changeProductQuantity(4);
    });

    expect(result.current.loadingState).toBe(false);
  });

  it("returns previousCartProducts on a failed PUT request", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("network error")));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartProducts, 1));

    let returnedCart;
    await act(async () => {
      returnedCart = await result.current.changeProductQuantity(4);
    });

    expect(returnedCart).toEqual(previousCartProducts);
  });

  it("has a loading state of false after a failed PUT request", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("network error")));
    const { result } = renderHook(() => useChangeProductQuantity(previousCartProducts, 1));

    await act(async () => {
      await result.current.changeProductQuantity(4);
    });

    expect(result.current.loadingState).toBe(false);
  });
});
