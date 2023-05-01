import React from "react";
import {CSSTransition} from "react-transition-group";
import modalStyles from "../../../css/modal.module.css";
import appStyles from "../../../css/app.module.css";
import helperStyles from '../../../css/helpers.module.css';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

const CommentSchema = Yup.object().shape({
  comment: Yup.string()
  .required('No empty comments allowed')
});

export function CommentForm() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");

  function handleModalClose() {
    setModalOpen(false);
  }

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

      <Formik
        initialValues={{comment: ''}}
        validationSchema={CommentSchema}
        onSubmit={(values, {resetForm}) => {
          console.log(values.comment);
          setModalMessage(`Your comment: "${values.comment}" was successfully added`);
          setModalOpen(true);
          resetForm();
        }}
      >
        {({errors, touched}) => (
          <Form>
            <label htmlFor="comment">Enter your comment:</label>
            <Field name="comment" as="textarea" placeholder="Your comment here..." disabled={modalOpen}/>
            {errors.comment && touched.comment ? (
              <div style={{marginBottom: '10px'}}>{errors.comment}</div>
            ) : null}
            <input type="submit" value="Send" disabled={modalOpen}/>
          </Form>
        )}
      </Formik>
    </>
  );
}