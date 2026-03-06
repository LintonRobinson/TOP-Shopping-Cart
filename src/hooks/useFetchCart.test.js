import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, renderHook, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import useFetchCart from "./useFetchCart.js";

describe("useFetchCart", () => {
  const mockUserCart = {
    id: 0,
    userId: 0,
    products: [
      {
        id: 0,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      },
    ],
  };

  beforeEach(() => vi.restoreAllMocks());

  it("returns an initial loading state of true", () => {
    const { result } = renderHook(() => useFetchCart("0"));
    expect(result.current.loadingState).toBe(true);
  });

  it("fetches the passed users cart successfully", () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUserCart),
    });

    const { result } = renderHook(() => useFetchCart("0"));

    waitFor(() => {
      expect(result.current.userCartData).toEqual(mockUserCart);
    });
  });

  it("returns a loading state of false after cart data has been fetched", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUserCart),
    });
    const { result } = renderHook(() => useFetchCart("0"));
    await waitFor(() => {
      expect(result.current.userCartData).toEqual(mockUserCart);
    });
    expect(result.current.loadingState).toBe(false);
  });

  it("returns a error state when cart data has failed to be fetched", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network error: Something went wrong"));
    const { result } = renderHook(() => useFetchCart("0"));
    await waitFor(() => {
      expect(result.current.loadingState).toBe(false);
    });
    expect(result.current.error.message).toBe("Network error: Something went wrong");
  });
});
