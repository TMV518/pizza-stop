import classes from "./BottomBar.module.css";
import { useContext } from "react";
import { NavContext } from "../context/NavContext";
import Button from "./Button";
import { useState, useEffect } from "react";

const BottomBar = (props) => {
  const { state } = useContext(NavContext);
  const [btnDisabled, setBtnDisabled] = useState(false);

  //handles greying-out of the button on the bottom bar
  //if there are no items in the cart, make the button disabled
  useEffect(() => {
    if (state.cartAmt <= 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [btnDisabled, state.cartAmt]);

  return (
    <div className={classes["bottom-bar"]}>
      <div className={classes["bottom-controls"]}>
        <span>Total: ${state.orderTotal.toFixed(2)}</span>
        <Button
          type={props.type}
          form={props.form}
          onClick={props.onButtonClick}
          disabled={btnDisabled}
        >
          {props.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
