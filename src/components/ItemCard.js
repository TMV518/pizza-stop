import Card from "../UI/Card.js";
import classes from "./ItemCard.module.css";
import { useState, useEffect, useContext } from "react";
import Button from "../UI/Button.js";
import ItemExtra from "./ItemExtra.js";
import { storageRef } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { NavContext } from "../context/NavContext.js";
import { v4 as uuid } from "uuid";

const ItemCard = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailBtnUp, setDetailBtnUp] = useState(true);

  const [selectedItems, setSelectedItems] = useState([]);

  //used for retrieving icon
  const imagesRef = ref(storageRef, "icons");
  const [iconRef, setIconRef] = useState();

  useEffect(() => {
    const getIconRef = async () => {
      const iconRef = await getDownloadURL(ref(imagesRef, props.iconRef));
      setIconRef(iconRef);

      //console.log(iconRef);
    };

    getIconRef();
  }, []);

  //changes button
  useEffect(() => {
    if (showDetails) {
      setDetailBtnUp(true);
    } else {
      setDetailBtnUp(false);
    }
  }, [showDetails]);

  const showDetailsHandler = () => {
    setShowDetails((prevDeets) => !prevDeets);
  };

  //used to add Add-Ons to order
  const checkBoxOnChangeHandler = (e) => {
    const isChecked = e.target.checked;

    let newItems = [];
    if (isChecked) {
      //adding to list when checked
      newItems = [...selectedItems, e.target.value];
    } else {
      //removing from list when unchecking it
      newItems = selectedItems.filter((addOn) => addOn !== e.target.value);
    }

    //if radio buttons, just get most recently selected
    if (e.target.type === "radio") {
      newItems = newItems.slice(-1);
    }

    setSelectedItems(newItems);

    console.log(e.target.id + " changed to " + isChecked);
  };

  const { state, dispatch } = useContext(NavContext);

  //submit form to add item to cart
  const submitItemHandler = (event) => {
    event.preventDefault();

    //seeing which Add-Ons are checked
    const item = {
      name: props.name,
      price: props.price,
      key_id: uuid(),
      icon: iconRef,
      addOns: selectedItems,
    };

    dispatch({ type: "ADD_ITEM", payload: item });
  };

  return (
    <Card>
      <div className={classes.item} onClick={showDetailsHandler}>
        <button
          className={classes.dropdown}
          style={{ transform: detailBtnUp ? "scaleY(1)" : "scaleY(-1)" }}
        ></button>
        <div className={classes.description}>
          <img src={iconRef} alt={props.altText} />
          <span className={classes.name}>{props.name}</span>
          <span className={classes.price}>${props.price}</span>
        </div>
      </div>
      {showDetails && (
        <div className={classes["item-details"]}>
          <hr></hr>
          <form className={classes["item-extras"]} onSubmit={submitItemHandler}>
            <h3>{props.extrasHeader}</h3>

            <ul className={classes.options}>
              {props.extras.map((extra) => {
                return (
                  <ItemExtra
                    name={extra}
                    mealName={props.name}
                    id={extra}
                    inputType={props.inputType}
                    onChange={checkBoxOnChangeHandler}
                  />
                );
              })}
            </ul>
            <div className={classes.controls}>
              {/*<span>x1</span>
              <div className={classes["plus-minus"]}>
                *<button id={classes.minus}>-</button>
                <button id={classes.plus}>+</button>
            </div>*/}

              <Button>Add to Cart</Button>
            </div>
          </form>
        </div>
      )}
    </Card>
  );
};

export default ItemCard;
