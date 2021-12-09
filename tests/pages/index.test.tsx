import React from "react";
import { render, screen } from "@testing-library/react";
import Provider from "../../src/contexts/provider";
import Index from "../../pages/index";


describe("Should render the app without crashing", () => {
  it("Renders the Dashboard page", () => {
    render(
      <Provider>
        <Index />
      </Provider>
    );
    expect(
      screen.getByRole("button", { name: "Filter by region" })
    ).toBeInTheDocument();
  });
});
