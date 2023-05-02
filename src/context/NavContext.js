import { createContext } from "react";

//using this context in other files
export const NavContext = createContext({
  cartAmt: 0,
  cartItems: [],
  orderTotal: 0,
  cartText: "Cart is empty",

  //setting the cart page
  //cartPage: false,
  //cartBtnText: "Cart",
  //setCartBtnText: () => {},
  //setCartPage: () => {},
});
