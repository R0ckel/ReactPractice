import {useState} from "react";
import {CSSTransition} from "react-transition-group";
import modalStyles from "../../../css/modal.module.css";
import appStyles from "../../../css/app.module.css";
import helperStyles from '../../../css/helpers.module.css';

function useCommentForm() {
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (comment.trim().length === 0) {
      setModalMessage("Empty comment text is not valid. Please enter your comment.");
      setModalOpen(true);
      return;
    }
    console.log(comment);
    setModalMessage(`Your comment: "${comment}" was successfully added`);
    setModalOpen(true);
    clearComment();
  }

  function handleChange(event) {
    setComment(event.target.value);
  }

  function clearComment() {
    setComment("");
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return {comment, handleSubmit, handleChange, modalOpen, modalMessage, handleModalClose};
}

export function CommentForm() {
  const {comment, handleSubmit, handleChange, modalOpen, modalMessage, handleModalClose} = useCommentForm();

  return (
    <>
      <div className={helperStyles["center-wrapper"]}>
        <CSSTransition in={modalOpen} timeout={300} classNames={{
          enter: modalStyles["modal-enter"],
          enterActive: modalStyles["modal-enter-active"],
          exit: modalStyles["modal-exit"],
          exitActive: modalStyles["modal-exit-active"]
        }} unmountOnExit>
          <div className={modalStyles.modal}>
            <h3>{modalMessage}</h3>
            <button onClick={handleModalClose} className={appStyles.btn}>Close</button>
          </div>
        </CSSTransition>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Enter your comment:</label>
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder="Your comment here..."
          disabled={modalOpen}
        />
        <input type="submit" value="Send" disabled={modalOpen}/>
      </form>
    </>
  );
}