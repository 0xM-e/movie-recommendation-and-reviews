import React, { useState } from "react";
import VoteButtons from "./VoteButtons";
import "../styles/ReviewCard.css";

const ReviewCard = ({ review, votes, onVoteChange, onDeleteReview, onUpdateReview }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(review.comment);
  const [editedRating, setEditedRating] = useState(review.rating);

  const isReviewOwner = user && review.author?.username === user.username;

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      onDeleteReview(review._id);
    }
  };

  // Handle update action
  const handleUpdateClick = async () => {
    if (editedComment !== review.comment) {
      onUpdateReview(review._id, editedComment, editedRating); 
    }
    setIsEditing(false);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <img src={review.avatar} alt={review.user} className="review-avatar" />
        <div className="review-meta-comment">
          <div className="review-top-row">
            <div className="review-user-column">
              <h4 className="review-user">{review.author?.username || '????'}</h4>
              <span className="review-role">{review.author?.role || 'user'}</span>
            </div>
            {isEditing ? (
              <div className="edit-review">
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  rows="4"
                  cols="50"
                />
                <button className="update-btn" onClick={handleUpdateClick}>Update</button>
                <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <p className="review-text">{review.comment}</p>
            )}
          </div>
        </div>
      </div>
      <div className="review-footer">
        <VoteButtons reviewId={review.id} votes={votes} onVoteChange={onVoteChange} />
        {/* Show delete button only if the user is the owner of the review */}
        {isReviewOwner && (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
