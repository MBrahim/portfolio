import { render, screen } from "@testing-library/react";
import Home from "./components/Home/Home";

jest.mock("react-tsparticles", () => () => null);

test("renders the portfolio home page", () => {
  render(<Home />);
  expect(screen.getByRole("heading", { name: /hi there/i })).toBeInTheDocument();
});
