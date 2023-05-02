import ItemCard from "./components/ItemCard.js";
//import UserInfoModal from "./components/UserInfoModal.js";
import NavBar from "./components/NavBar.js";
import { useState, useEffect, useContext, useReducer } from "react";
import { db } from "./firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import CartPage from "./components/CartPage.js";
import { NavContext } from "./context/NavContext.js";
import reducer from "./context/reducer.js";
//import UserInfoPage from "./components/UserInfoPage.js";

function App() {
  const [items, setItems] = useState([]);
  const cartCtx = useContext(NavContext);

  //database menu collection reference
  const itemsRef = collection(db, "menu");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsRef);
      console.log(data);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  //setting cart page and navbar text
  const [cartPage, setCartPage] = useState(false);
  const [cartBtnText, setCartBtnText] = useState("");

  //toggles cart page
  const setCartPageHandler = () => {
    setCartPage((prevCart) => !prevCart);
  };

  //changes text on top button
  useEffect(() => {
    if (cartPage) {
      setCartBtnText("Back");
    } else {
      setCartBtnText("Cart");
    }
  }, [cartPage]);

  //HANDLING CONTEXT//
  //const initialState = useContext(NoteListContext);
  //using reducer from reducer.js
  const [state, dispatch] = useReducer(reducer, cartCtx);
  console.log("cartAmt:", state.cartAmt);

  const [cartAmtText, setCartAmtText] = useState(cartCtx.cartAmt);

  const setCartAmtTextHandler = () => {
    setCartAmtText(state.cartAmt);
  };

  useEffect(() => {
    setCartAmtTextHandler();
  }, [state.cartAmt]);

  return (
    <div className="app-wrapper">
      {/*value contains all the states we wanna share/pass into the context*/}
      <NavContext.Provider
        value={{
          cartAmtText,
          setCartAmtTextHandler,
          cartPage,
          cartBtnText,
          setCartPageHandler,
          state,
          dispatch,
          hello: "Hello",
        }}
      >
        <NavBar />
        {!cartPage ? (
          items.map((item) => {
            return (
              <ItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                iconRef={item.iconref}
                altText={item.alttext}
                extrasHeader={item.extraheader}
                extras={item.extras}
                inputType={item.inputtype}
              />
            );
          })
        ) : (
          <CartPage />
        )}

        {/*<UserInfoPage />*/}
        {/*<CartModal addOns={DUMMY_ADDONS} />*/}
      </NavContext.Provider>
    </div>
  );
}

export default App;
