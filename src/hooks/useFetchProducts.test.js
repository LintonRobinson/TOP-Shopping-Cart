import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchProducts from "./useFetchProducts.js";

describe("useFetchProducts", () => {
  beforeEach(() => vi.restoreAllMocks());

  const mockedStoreProducts = [
    {
      id: 0,
      title: "string",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    },
    {
      id: 1,
      title: "string 2",
      price: 0.2,
      description: "string 2",
      category: "string 2",
      image: "http://example2.com",
    },
  ];

  it("returns an initial loading state of true", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockedStoreProducts) });
    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.loadingState).toBe(true);

    await waitFor(() => {
      expect(result.current.storeProductsData).toEqual(mockedStoreProducts);
    });
  });

  it("successfully fetches all products", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockedStoreProducts) });
    const { result } = renderHook(() => useFetchProducts());
    await waitFor(() => {
      expect(result.current.storeProductsData).toEqual(mockedStoreProducts);
    });
  });

  it("returns a loading state of false when fetch resolves", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockedStoreProducts) });
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.storeProductsData).toEqual(mockedStoreProducts);
    });

    expect(result.current.loadingState).toBe(false);
  });

  it("returns a error message when fetch rejects", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error: Something went wrong"));
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.loadingState).toBe(false);
    });

    expect(result.current.error.message).toBe("Network error: Something went wrong");
  });

  it("returns a loading state of false when fetch rejects", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error: Something went wrong"));
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.error.message).toBe("Network error: Something went wrong");
    });

    expect(result.current.loadingState).toBe(false);
  });
});
