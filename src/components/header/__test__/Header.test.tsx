import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { renderWithRedux } from "../../../assets/helpers/test.helper";
// import { IUserAuth } from "../../../firebase/firebase.utils";

import { Header } from "../Header.component";

const mockOnLogout = jest.fn();
// const user: IUserAuth = {
//   uid: "mockId",
//   displayName: "mockName",
//   email: "mockEmail",
// };

const renderHeader = (currentUser = false, cartHidden = false) => {
  return renderWithRedux(
    <BrowserRouter>
      <Header onLogout={mockOnLogout} />
    </BrowserRouter>,
    currentUser,
    cartHidden
  );
};

describe("Header", () => {
  test("should render Header without crashing", () => {
    renderHeader();
  });

  test("should display logo", () => {
    const logo = renderHeader().getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  test("should display shop link", () => {
    const shopEl = renderHeader().getByText("SHOP");
    expect(shopEl).toBeInTheDocument();
  });

  test("should display contact link", () => {
    const contactEl = renderHeader().getByText("CONTACT");
    expect(contactEl).toBeInTheDocument();
  });

  test("should display auth link if not logged", () => {
    const signInEl = renderHeader().getByText("SIGN IN");
    expect(signInEl).toBeInTheDocument();
  });

  test("should display sign out button if logged", () => {
    const signOutEl = renderHeader(true).getByText("SIGN OUT");
    expect(signOutEl).toBeInTheDocument();
  });

  test("should display cartIcon", () => {
    const cartIcon = renderHeader().getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();
  });

  test("should not render cartdropdown if hidden", () => {
    const cartDrop = renderHeader(false, true).queryByTestId("cart-dropdown");
    expect(cartDrop).not.toBeInTheDocument();
  });

  test("should render cartdropdown if not hidden", () => {
    const cartDrop = renderHeader().getByTestId("cart-dropdown");
    expect(cartDrop).toBeInTheDocument();
  });

  test("should navigate to / when clicking logo", () => {
    const logo = renderHeader().getByTestId("logo");
    fireEvent.click(logo);

    expect(window.location.pathname).toBe("/");
  });

  test("should navigate to /shop when clicking shop link", () => {
    const shopEl = renderHeader().getByText("SHOP");
    fireEvent.click(shopEl);

    expect(window.location.pathname).toBe("/shop");
  });

  test("should navigate to /contact when clicking contact link", () => {
    const contactEl = renderHeader().getByText("CONTACT");
    fireEvent.click(contactEl);

    expect(window.location.pathname).toBe("/contact");
  });

  test("should navigate to /auth when clicking sign in link", () => {
    const signInEl = renderHeader().getByText("SIGN IN");
    fireEvent.click(signInEl);

    expect(window.location.pathname).toBe("/auth");
  });

  test("should run onLogout function if clicked on sign out button", () => {
    const signOutEl = renderHeader(true).getByText("SIGN OUT");
    fireEvent.click(signOutEl);

    expect(mockOnLogout).toHaveBeenCalled();
  });
});
