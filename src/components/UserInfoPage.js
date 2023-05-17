import classes from "./UserInfoPage.module.css";
import ReactDOM from "react-dom";
import BottomBar from "../UI/BottomBar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useContext, useEffect, useState } from "react";
import { NavContext } from "../context/NavContext";

//using react-hook-form and yup packages
import { useForm } from "react-hook-form";

//yup helps resolve data types
//yupResolver helps connect react-hook-form and yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  //setting form field requirements
  name: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  zip: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).max(10).required(),
});

const UserInfoPage = (props) => {
  //used for loading
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  //used for order completing
  const [orderCompleted, setOrderCompleted] = useState(false);

  //refreshes page
  useEffect(() => {
    if (orderCompleted) {
      console.log("ORDER COMPLETE");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  }, [orderCompleted]);

  //destructuring functions and objects from useForm hook
  //register() determines which fields should be part of validation
  //handleSubmit() is put on onSubmit part of form
  //errors is an object containing errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //firebase stuff, adding to database
  const ordersCollectionRef = collection(db, "orders");

  const { state } = useContext(NavContext);

  //function used to submit order
  //data contains object submitted from form
  const submitForm = async (data) => {
    setLoading(true);
    setLoadingText("Loading...");

    console.log(data);
    console.log("ORDER TOTAL:", state.orderTotal);
    let itemsArr = state.cartItems.map((item) => {
      if (item.addOns.length <= 0) {
        return {
          name: item.name,
        };
      } else {
        return {
          name: item.name,
          addOns: item.addOns,
        };
      }
    });
    await addDoc(ordersCollectionRef, {
      user_info: data,
      total: Number(state.orderTotal.toFixed(2)),
      items: itemsArr,
    });

    setLoading(false);
    setLoadingText("");
    setOrderCompleted(true);
  };

  const content = (
    <div className={classes["user-info-container"]}>
      {!orderCompleted && (
        <>
          <button className={classes["close-button"]} onClick={props.toggle}>
            X
          </button>
          <form
            className={classes["user-info-form"]}
            onSubmit={handleSubmit(submitForm)}
            id="user-info-form"
          >
            <table>
              <tbody>
                {loading && (
                  <tr>
                    <td>{loadingText}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      className={classes["user-info-input"]}
                      {...register("name", { required: true })}
                    />
                    <span>{errors.name?.message}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Street"
                      className={classes["user-info-input"]}
                      {...register("street", { required: true })}
                    />
                    <span>{errors.street?.message}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      className={classes["user-info-input"]}
                      {...register("city", { required: true })}
                    />
                    <span>{errors.city?.message}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      placeholder="Zip Code"
                      className={classes["user-info-input"]}
                      {...register("zip", { required: true })}
                    />
                    <span>{errors.zip?.message}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="e-mail"
                      id="email"
                      name="email"
                      placeholder="E-Mail"
                      className={classes["user-info-input"]}
                      {...register("email", { required: true })}
                    />
                    <span>{errors.email?.message}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone #"
                      className={classes["user-info-input"]}
                      {...register("phone", { required: true })}
                    />
                    <span>{errors.phone?.message}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <BottomBar
            form={"user-info-form"}
            type={"submit"}
            buttonText={"Place Order"}
          />
        </>
      )}
      {orderCompleted && (
        <p>Order complete! You will now be redirected to the homepage.</p>
      )}
    </div>
  );
  return (
    <>
      {ReactDOM.createPortal(content, document.getElementById("overlay-root"))}
    </>
  );
};

export default UserInfoPage;
