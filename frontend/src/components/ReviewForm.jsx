import React, { useState } from "react";
import reviewService from "../services/reviewService";
import "../styles/ReviewForm.css";

const ReviewForm = ({ movieID, setReviews }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newReview = { comment: newComment.trim(), rating };

    try {
      console.log(movieID)
      const response = await reviewService.submitReview(movieID, newReview);
      setReviews((prevReviews) => [response, ...prevReviews]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(error.response?.data?.message || "An error occurred while submitting your review.");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write your review here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="review-textarea"
      />
      <button type="submit" className="submit-review-button">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
