import { useState } from "react";

const ItemExtra = (props) => {
  return (
    <li key={props.id}>
      <input
        type={props.inputType}
        name="extra"
        id={props.id + props.mealName}
        value={props.name}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.name}</label>
    </li>
  );
};

export default ItemExtra;
