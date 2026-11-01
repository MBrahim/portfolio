import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./Navbar";

function renderNavbar(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <NavBar />
    </MemoryRouter>
  );
}

test("marks the home link as current on the home route", () => {
  renderNavbar("/");

  expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(screen.getByRole("link", { name: /projects/i })).not.toHaveAttribute(
    "aria-current"
  );
});

test("keeps the projects link active on a project detail route", () => {
  renderNavbar("/project/DRV8243");

  expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(screen.getByRole("link", { name: /home/i })).not.toHaveAttribute(
    "aria-current"
  );
});
