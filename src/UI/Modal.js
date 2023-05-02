import classes from "./Modal.module.css";
import Card from "./Card";
import Button from "./Button";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop}></div>;
};
const ModalOverlay = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose} />
      <Card className={`${classes.modal} ${props.customModalStyle}`}>
        <header
          className={`${classes.header} ${props.customModalStyle.header}`}
        >
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>{props.content}</div>
        <footer
          className={`${classes.actions} ${props.customModalStyle.controls}`}
        >
          {props.controls}
        </footer>
      </Card>
    </>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          content={props.content}
          onClose={props.onClose}
          onConfirm={props.onConfirm}
          customModalStyle={props.customModalStyle}
          controls={props.controls}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
