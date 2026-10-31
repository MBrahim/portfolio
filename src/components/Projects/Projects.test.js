import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Projects from "./Projects";

jest.mock("react-tsparticles", () => () => null);

function renderProjects() {
  return render(
    <MemoryRouter>
      <Projects />
    </MemoryRouter>
  );
}

test("filters projects by category and restores all projects", () => {
  renderProjects();

  expect(screen.getByText("ICM-20948 Breakout Board")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Power" }));

  expect(screen.getByText("Supercapacitors Backup Controller")).toBeInTheDocument();
  expect(screen.queryByText("ICM-20948 Breakout Board")).not.toBeInTheDocument();
  expect(screen.getByText("Showing 4 of 6 projects")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "All" }));

  expect(screen.getByText("ICM-20948 Breakout Board")).toBeInTheDocument();
  expect(screen.getByText("Showing 6 of 6 projects")).toBeInTheDocument();
});

test("category buttons select their filter and update the result count", () => {
  renderProjects();

  [
    "IoT",
    "High-Speed",
    "Power",
    "Consumer Electronics",
    "OEMs",
    "Modules",
    "Robotics",
    "All",
  ].forEach((category) => {
    fireEvent.click(screen.getByRole("button", { name: category }));

    expect(screen.getByRole("button", { name: category })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByText(/^Showing \d+ of 6 projects$/)).toBeInTheDocument();
  });
});
