import Modal from "../UI/Modal";
import Button from "../UI/Button";
import classes from "./UserInfoModal.module.css";

const UserInfoModal = (props) => {
  const content = (
    <form className={classes.content}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="">Name</label>
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Street</label>
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">City</label>
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">ZIP Code</label>
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Email</label>
            </td>
            <td>
              <input type="e-mail" />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="">Phone #</label>
            </td>
            <td>
              <input type="tel" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
  const controls = (
    <>
      <Button>Cancel</Button>
      <Button>Go to Cart</Button>
      <Button>Order</Button>
    </>
  );
  return (
    <Modal
      title={"Enter your information"}
      content={content}
      controls={controls}
      customModalStyle={classes}
    />
  );
};

export default UserInfoModal;
