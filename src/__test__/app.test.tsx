import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { App } from "../App";

const renderApp = (path: string = "/") => {
  window.history.pushState({}, "test", path);

  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe("App", () => {
  test("should render Header", () => {
    renderApp();

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  test("should render HomePage", () => {
    renderApp();

    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
  });

  test("should render ShopPage", () => {
    renderApp("/shop");

    const shopPage = screen.getByTestId("shop-page");
    expect(shopPage).toBeInTheDocument();
  });
});
