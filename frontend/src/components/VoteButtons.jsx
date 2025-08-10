import React from "react";
import "../styles/VoteButtons.css";

const VoteButtons = ({ reviewId, votes, onVoteChange }) => {
  return (
    <div className="vote-buttons">
      <button
        className="vote-button useful"
        onClick={() => onVoteChange(reviewId, "useful")}
      >
        👍 {votes?.useful || 0}
      </button>
      <button
        className="vote-button not-useful"
        onClick={() => onVoteChange(reviewId, "notUseful")}
      >
        👎 {votes?.notUseful || 0}
      </button>
    </div>
  );
};

export default VoteButtons;
