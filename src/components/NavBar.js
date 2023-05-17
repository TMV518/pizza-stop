import classes from "./NavBar.module.css";
import Button from "../UI/Button";
import { useState, useEffect, useContext } from "react";
import { NavContext } from "../context/NavContext";

const NavBar = (props) => {
  const { setCartPageHandler, cartBtnText, cartAmtText } =
    useContext(NavContext);
  //const state = useContext(NavContext);

  return (
    <nav className={classes["main-container"]}>
      <ul>
        <li className={classes.logo}>
          PIZZA STOP<span>Pizza when you want!</span>
        </li>
        <div className={classes["right-section"]}>
          {/*<li>
            <Button className={classes["about-btn"]}>About</Button>
  </li>*/}
          <li>
            <Button
              className={classes["cart-btn"]}
              onClick={setCartPageHandler}
            >
              <span>{cartBtnText}</span>
              <span className={classes.cartAmt}>{cartAmtText}</span>
            </Button>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
