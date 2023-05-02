export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const newItem = {
        key_id: action.payload.key_id,
        name: action.payload.name, //the payload is the text here
        price: action.payload.price,
        icon: action.payload.icon,
        addOns: action.payload.addOns,
      };

      state.cartAmt++;

      state.orderTotal += newItem.price;

      state.cartText = "";

      console.log("Item being submitted:", newItem);

      const addedItems = [...state.cartItems, newItem];

      return { ...state, cartItems: addedItems };
    //deletes the note
    case "DEL_ITEM":
      const filteredItems = state.cartItems.filter(
        (item) => item.key_id !== action.payload.key_id //the payload is the key_id in this case
      );

      state.cartAmt--;

      state.orderTotal -= action.payload.price;
      state.orderTotal = Math.abs(state.orderTotal); //if i don't do this, the result is -0.00
      if (state.cartAmt <= 0) {
        state.cartText = "Cart is empty";
      }

      return { ...state, cartItems: filteredItems };

    default:
      return state;
  }
}
