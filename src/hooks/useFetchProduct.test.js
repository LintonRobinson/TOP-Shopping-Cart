import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchProduct from "./useFetchProduct.js";

describe("useFetchProduct", () => {
  const mockedProductData = {
    _id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  };

  const mockedApiResponse = {
    data: [mockedProductData],
  };

  beforeEach(() => vi.restoreAllMocks());

  it("has an initial loading state of true", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockedApiResponse) });
    const { result } = renderHook(() => useFetchProduct(1));
    expect(result.current.loadingState).toBe(true);
    await waitFor(() => {
      expect(result.current.loadingState).toBe(false);
    });
  });

  it("successfully fetches requested product", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockedApiResponse) });

    const { result } = renderHook(() => useFetchProduct(1));

    await waitFor(() => {
      expect(result.current.loadingState).toBe(false);
    });

    expect(result.current.productData).toEqual(mockedProductData);
  });

  it("throws an error on failed fetch", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error: Something went wrong"));

    const { result } = renderHook(() => useFetchProduct(1));

    await waitFor(() => {
      expect(result.current.loadingState).toBe(false);
    });

    expect(result.current.error.message).toBe("Network error: Something went wrong");
  });

  it("has a loading state of false when the fetch is complete", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockedApiResponse) });

    const { result } = renderHook(() => useFetchProduct(1));
    await waitFor(() => {
      expect(result.current.loadingState).toBe(false);
    });
  });
});
