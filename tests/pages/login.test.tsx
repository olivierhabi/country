import { render, screen } from "@testing-library/react";

import Login from "../../pages/login";

describe("Should render the app without crashing", () => {
  it("Renders the Dashboard page", () => {
    render(<Login />);
    expect(
      screen.getByRole("button", { name: "Login" })
    ).toBeInTheDocument();
  });
});
