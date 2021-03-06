import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

//import { menuData } from '../../../assets/data/menu.data'

import { Directory } from "../Directory.component";

describe("Directory", () => {
  beforeAll(() => {
    render(<Directory />, { wrapper: MemoryRouter });
  });

  test("should display all MenuItems", () => {
    const menuItems = screen.getAllByTestId("menu-item");
    expect(menuItems).toHaveLength(5);
  });
});
