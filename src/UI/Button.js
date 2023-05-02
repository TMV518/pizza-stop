import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.btn} ${props.className}`}
      type={props.type}
      form={props.form}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
