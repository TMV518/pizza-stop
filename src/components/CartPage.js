import CartItem from "./CartItem";
import classes from "./CartPage.module.css";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";
import Button from "../UI/Button";
import { useState } from "react";
import UserInfoPage from "./UserInfoPage";
import BottomBar from "../UI/BottomBar";

const CartPage = () => {
  //const DUMMY_ADDONS = ["Pepperoni", "Cheese"];
  const { state } = useContext(NavContext);

  const [toggleUserInfo, setToggleUserInfo] = useState(false);

  const toggleUserInfoHandler = () => {
    setToggleUserInfo((prevInfo) => !prevInfo);
    console.log(toggleUserInfo);
  };

  const content = !toggleUserInfo ? (
    <div className={classes.content}>
      <h2>Your Cart{" (" + state.cartAmt + " items)"}</h2>
      <h3>{state.cartText}</h3>
      <div className={classes["item-list"]}>
        <ul>
          {state.cartItems.map((item) => {
            return (
              <li key={item.key_id}>
                <CartItem
                  name={item.name}
                  price={item.price}
                  iconRef={item.icon}
                  key_id={item.key_id}
                  addOns={item.addOns}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <BottomBar
        buttonText={"Continue"}
        onButtonClick={toggleUserInfoHandler}
      />
      {/*<div className={classes["bottom-bar"]}>
        <div className={classes["bottom-controls"]}>
          <span>Total: ${state.orderTotal.toFixed(2)}</span>
          <Button onClick={toggleUserInfoHandler}>Continue</Button>
        </div>
        </div>*/}
    </div>
  ) : (
    <UserInfoPage toggle={toggleUserInfoHandler} />
  );

  return content;
};

export default CartPage;
