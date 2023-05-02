import classes from "./CartItem.module.css";
import Card from "../UI/Card";
import { NavContext } from "../context/NavContext";
import { useContext } from "react";

const CartItem = (props) => {
  const { state, dispatch } = useContext(NavContext);

  const deleteItemHandler = () => {
    console.log("Deleting:", props.name);
    dispatch({
      type: "DEL_ITEM",
      payload: { key_id: props.key_id, price: props.price },
    });
  };

  return (
    <div className={classes["main-container"]}>
      <div className={classes.details}>
        <button
          className={classes["x-button"]}
          onClick={deleteItemHandler}
        ></button>
        <img src={props.iconRef} alt={props.altText} />
        <span>{props.name}</span>
        <span className={classes.price}>${props.price}</span>

        {/*<div className={classes.controls}>
            <span>x1</span>
            <div className={classes["plus-minus"]}>
              <button id={classes.minus}>-</button>
              <button id={classes.plus}>+</button>
            </div>
          </div>*/}
      </div>
      <div className={classes["add-ons"]}>
        {/*If there are addOns selected, then display them*/}
        {props.addOns.length > 0 && (
          <span>Add-Ons: {props.addOns.join(", ")}</span>
        )}
      </div>
    </div>
  );
};

export default CartItem;
