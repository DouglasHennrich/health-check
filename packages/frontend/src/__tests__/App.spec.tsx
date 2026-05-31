import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders and uses shared types", () => {
    const { getByText } = render(<App />);
    expect(getByText("Frontend")).toBeTruthy();
  });
});
