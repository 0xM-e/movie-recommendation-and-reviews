import React, { useState } from "react";
import "../styles/MovieDetailPage.css";

const movie = {
  title: "The Color of Dreams",
  director: "Sofia Lumina",
  description:
    "A poetic journey through the memories of a young artist searching for meaning in a dreamlike city.",
  poster: "https://picsum.photos/id/1018/220/300",
  rating: 4.3,
};

const initialReviews = [
  {
    user: "Lara",
    role: "Film Critic",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    comment: "This film is a masterclass in visual storytelling. From the very first frame, it draws you into its world with rich, atmospheric cinematography and precise framing. The director clearly knows how to use silence and pacing as storytelling tools, which gives the film a meditative, almost poetic quality. While the plot might feel slow to some, it rewards patience with layers of emotion and subtle character development. I especially appreciated the way certain motifs were revisited throughout the film — a sign of thoughtful, deliberate filmmaking. Highly recommend it for anyone who values artful cinema over conventional storytelling.",
    useful: 21,
    notUseful: 2,
  },
  {
    user: "Okan",
    role: "Screenwriter",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    comment: "What struck me most about this film was how authentic the dialogue felt — nothing ever seemed forced or overly expository. The characters spoke like real people, which is harder to pull off than it sounds. The screenplay takes its time building tension and emotional stakes, and it never insults the audience’s intelligence by over-explaining. The third act was especially powerful, tying together earlier scenes in ways that felt natural and earned. I’d argue the writing is the film’s strongest asset, though the performances and direction certainly elevated the material even further. A great example of how simplicity, when executed well, can be incredibly impactful.",
    useful: 17,
    notUseful: 1,
  },
  {
    user: "Mira",
    role: "Cinephile",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "I went into this movie not knowing what to expect, and I came out completely floored. It’s not the kind of film that shouts its brilliance — instead, it whispers, draws you in slowly, and leaves a lingering impact long after the credits roll. The soundtrack was haunting in the best way, perfectly matching the tone without ever being too obvious. The production design was another standout element — small details in the background constantly added depth to the world and characters. What I loved most, though, was the emotional resonance: it’s a deeply human story told with care, subtlety, and a touch of melancholy. I found myself thinking about certain scenes days later, which is always the mark of something special.",
    useful: 19,
    notUseful: 0,
  },
];


const MovieDetailPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewVotes, setReviewVotes] = useState(
    initialReviews.map(({ useful, notUseful }) => ({ useful, notUseful }))
  );
  const [newComment, setNewComment] = useState("");

  const handleUsefulClick = (index) => {
    const updatedVotes = [...reviewVotes];
    updatedVotes[index].useful += 1;
    setReviewVotes(updatedVotes);
  };

  const handleNotUsefulClick = (index) => {
    const updatedVotes = [...reviewVotes];
    updatedVotes[index].notUseful += 1;
    setReviewVotes(updatedVotes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newReview = {
      user: "You",
      role: "Member",
      avatar: "https://randomuser.me/api/portraits/lego/5.jpg",
      comment: newComment.trim(),
      useful: 0,
      notUseful: 0,
    };

    setReviews([newReview, ...reviews]);
    setReviewVotes([{ useful: 0, notUseful: 0 }, ...reviewVotes]);
    setNewComment("");
  };

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-box">
        <div className="movie-header">
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-director">Directed by: {movie.director}</p>
            <p className="movie-description">{movie.description}</p>
            <p className="movie-rating">Rating: {movie.rating} ⭐</p>
          </div>
        </div>

        <div className="review-section">
          <h2 className="review-title">User Reviews</h2>

          {/* Review List */}
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet.</p>
          ) : (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <img
                    src={review.avatar}
                    alt={review.user}
                    className="review-avatar"
                  />
                  <div className="review-meta-comment">
                    <div className="review-top-row">
                      <div className="review-user-column">
                        <h4 className="review-user">{review.user}</h4>
                        <span className="review-role">{review.role}</span>
                      </div>
                      <p className="review-text">{review.comment}</p>
                    </div>
                  </div>
                </div>
                <div className="review-footer">
                  <button
                    className="vote-button useful"
                    onClick={() => handleUsefulClick(index)}
                  >
                    👍 {reviewVotes[index].useful}
                  </button>
                  <button
                    className="vote-button not-useful"
                    onClick={() => handleNotUsefulClick(index)}
                  >
                    👎 {reviewVotes[index].notUseful}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review Submission Form */}
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
      </div>
    </div>
  );

};

export default MovieDetailPage;
