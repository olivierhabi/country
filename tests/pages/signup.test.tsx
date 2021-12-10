import { render, screen } from "@testing-library/react";

import Signup from "../../pages/signup";

describe("Should render the app without crashing", () => {
  it("Renders the Dashboard page", () => {
    render(<Signup />);
    expect(
      screen.getByRole("button", { name: "Signup" })
    ).toBeInTheDocument();
  });
});
