import React from "react";
import { render, screen } from "@testing-library/react";
import Provider from "../../src/contexts/provider";
import Visited from "../../pages/visited";
import { Sessions } from "../../src/types";

import "@testing-library/jest-dom";
jest.mock("next-auth/client");

describe("Should render the app without crashing", () => {
  it("Renders the Dashboard page", () => {
    const mockSession: Sessions = {
      session: {
        expires: new Date("2021-12-10 00:35:39.246"),
        user: { id: 3, email: "a", name: "Delta", image: "c" },
      },
    };
    render(
      <Provider>
        <Visited {...mockSession} />
      </Provider>
    );
    expect(
      screen.getByText("MY LIST")
    ).toBeInTheDocument();
  });
});
