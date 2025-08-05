import React from "react";
import VoteButtons from "./VoteButtons";
import "../styles/ReviewCard.css";

const ReviewCard = ({ review, votes, onVoteChange }) => {
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
            <p className="review-text">{review.comment}</p>
          </div>
        </div>
      </div>
      <div className="review-footer">
        <VoteButtons reviewId={review.id} votes={votes} onVoteChange={onVoteChange} />
      </div>
    </div>
  );
};

export default ReviewCard;
