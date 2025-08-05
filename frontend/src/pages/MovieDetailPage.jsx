import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import movieService from "../services/movieService";
import reviewService from "../services/reviewService";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import "../styles/MovieDetailPage.css";

const MovieDetailPage = () => {
    const { movieID } = useParams();
    const [movie, setMovie] = useState(null);
    const [imdbID, setImdbID] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewVotes, setReviewVotes] = useState({});

    // Fetch movie data
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const movieData = await movieService.getMovieById(movieID);
                setMovie(movieData);
                setImdbID(movieData.imdbID);
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };
        fetchMovieData();
    }, [movieID]);

    // Fetch reviews data
    useEffect(() => {
        if (movie && movie.imdbID) {
            const fetchReviewsData = async () => {
                try {
                    const reviewsData = await reviewService.getReviewsByImdbId(movie.imdbID);
                    setReviews(reviewsData);
                    const initialVotes = reviewsData.reduce((acc, review) => {
                        acc[review.id] = { useful: 0, notUseful: 0 };
                        return acc;
                    }, {});
                    setReviewVotes(initialVotes);
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                }
            };
            fetchReviewsData();
        }
    }, [movie]);

    const handleVoteChange = (reviewId, voteType) => {
        setReviewVotes((prevVotes) => ({
            ...prevVotes,
            [reviewId]: {
                ...prevVotes[reviewId],
                [voteType]: prevVotes[reviewId][voteType] + 1,
            },
        }));
    };

    return (
        <div className="movie-detail-container">
            <div className="movie-detail-box">
                {/* Movie information */}
                {movie && (
                    <div className="movie-header">
                        <img src={movie.poster} alt={movie.title} className="movie-poster" />
                        <div className="movie-info">
                            <h1 className="movie-title">{movie.title}</h1>
                            <p className="movie-director">Directed by: {movie.director}</p>
                            <p className="movie-description">{movie.description}</p>
                            <p className="movie-rating">Rating: {movie.rating} ⭐</p>
                        </div>
                    </div>
                )}

                {/* Reviews section */}
                <div className="review-section">
                    <h2 className="review-title">User Reviews</h2>
                    {reviews.length === 0 ? (
                        <p className="no-reviews">No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <ReviewCard
                                key={review._id}
                                review={review}
                                votes={reviewVotes[review.id]}
                                onVoteChange={handleVoteChange}
                            />
                        ))
                    )}
                </div>

                {/* Review form */}
                {imdbID && (
                    <ReviewForm movieID={imdbID} setReviews={setReviews} />
                )}
            </div>
        </div>
    );
};

export default MovieDetailPage;
