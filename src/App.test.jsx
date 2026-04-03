import { describe, it, expect, beforeEach, vi } from "vitest";
import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar/Navbar";
import { MemoryRouter } from "react-router";
import { render } from "@testing-library/react";
import App from "./App.jsx";
import Footer from "./components/layout/Footer/Footer.jsx";

describe("App", () => {
  vi.mock("./components/layout/Navbar/Navbar", () => ({
    default: vi.fn(() => <nav data-testid="Navbar" />),
  }));

  vi.mock("./components/layout/Footer/Footer.jsx", () => ({
    default: vi.fn(() => <footer data-testid="Footer" />),
  }));

  vi.mock("react-router", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      Outlet: vi.fn(() => <div data-testid="Outlet" />),
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(Navbar).toHaveBeenCalled();
  });

  it("passes the correct props to Navbar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(Navbar).toHaveBeenLastCalledWith(
      expect.objectContaining({
        userCart: 0,
      }),
      undefined,
    );
  });

  it("renders the react router Outlet", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(Outlet).toHaveBeenCalled();
  });

  it("passes the correct props to Outlet", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(Outlet).toHaveBeenLastCalledWith(
      expect.objectContaining({
        context: [expect.any(Array), expect.any(Function)],
      }),
      undefined,
    );
  });

  it("renders the react router Footer", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    expect(Footer).toHaveBeenCalled();
  });
});
