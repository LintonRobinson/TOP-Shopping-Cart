import AboutUs from "./AboutUs.jsx";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("About Us", () => {
  beforeEach(() => {
    render(<AboutUs />);
  });

  it("renders About Us heading", () => {
    expect(screen.getByText("About Dogs Downtown")).toBeInTheDocument();
  });

  it("renders About Us description", () => {
    const aboutUsDescription = "We believe the things you use every day should be made with care. Every product in our store is selected for its craftsmanship, durability, and timeless design.";
    expect(screen.getByText(aboutUsDescription)).toBeInTheDocument();
  });

  it("renders About Us image", () => {
    expect(screen.getByRole("img", { name: "Dogs Downtown Entrance" })).toBeInTheDocument();
  });

  it("renders About Us slogan quote", () => {
    const aboutUsQuote = "Better days start here — for every dog, every family.";
    expect(screen.getByText(aboutUsQuote)).toBeInTheDocument();
  });
});
