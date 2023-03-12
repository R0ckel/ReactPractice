import { useState } from "react";

function useCommentForm() {
  const [comment, setComment] = useState('');

  function handleSubmit() {
    console.log(comment);
    alert(`Your comment: "${comment}" was successfully added`);
  }

  function handleChange(event) {
    setComment(event.target.value);
  }

  function clearComment(){
    setComment('')
  }

  return { comment, clearComment, handleSubmit, handleChange };
}

export function CommentForm() {
  const { comment, clearComment, handleSubmit, handleChange } = useCommentForm();

  function onSubmit(event) {
    event.preventDefault();
    if (comment.trim().length === 0) {
      alert("Empty comment text is not valid. Please enter your comment.");
      return;
    }
    handleSubmit();
    clearComment();
  }

  return (
    <form onSubmit={onSubmit}>
      <label>Enter your comment:</label>
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="Your comment here..."
      />
      <input type="submit" value="Send" />
    </form>
  );
}