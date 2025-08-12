import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import reviewService from '../services/reviewService';
import { timeAgo } from '../utils/timeFormatter';
import '../styles/HomePage.css';

const HomePage = () => {
    const [comments, setComments] = useState([]);
    const [weeklyMovies, setWeeklyMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await reviewService.getPaginatedReviews(1, 5);
                setComments(response);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    useEffect(() => {
        const fetchWeeklyMovies = async () => {
            try {
                const response = await reviewService.getWeeklyReviews();
                setWeeklyMovies(response);
            } catch (error) {
                console.error('Error fetching weekly movies:', error);
            }
        };
        fetchWeeklyMovies();
    }, []);

    useEffect(() => {
        const fetchTopRatedMovies = async () => {
            try {
                const response = await reviewService.getTopRatedReviews();
                setTopRatedMovies(response);
            } catch (error) {
                console.error('Error fetching top-rated movies:', error);
            }
        };
        fetchTopRatedMovies();
    }, []);

    return (
        <div className='home-container'>
            <div className='home-wrapper'>
                <div className='home-item welcome-section'>
                    <h2>🎬 Welcome!</h2>
                    <p>Discover and review the best movies. Step into the world of cinema!</p>
                </div>

                <div className='home-item'>
                    <ImageSlider />
                </div>

                <div className='home-item'>
                    <h2>🍿 Weekly Movies</h2>
                    <div className="poster-grid">
                        {weeklyMovies.slice(0, 5).map((data, index) => (
                            <div className="poster-item" key={index}>
                                <Link to={`/movies/${data.tmdbID}/${data.movie.title}`}>
                                    <img src={data.movie.poster} alt={data.movie.title} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='home-item'>
                    <h2>🏆 Top Rated Movies</h2>
                    <div className="poster-grid">
                        {topRatedMovies.slice(0, 5).map((data, index) => (
                            <div className="poster-item" key={index}>
                                <Link to={`/movies/${data.tmdbID}/${data.movie.title}`}>
                                    <img src={data.movie.poster} alt={data.movie.title} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='home-item'>
                    <div className="reviews-container">
                        <h2 className="reviews-title">💬 Latest Reviews</h2>
                        <div className="reviews-table">
                            <div className="reviews-header">
                                <div className="reviews-cell movie-cell">Movie</div>
                                <div className="reviews-cell review-cell">Review</div>
                                <div className="reviews-cell user-cell">User</div>
                                <div className="reviews-cell date-cell">Date</div>
                            </div>
                            {comments?.data?.map((review) => (
                                <Link to={`/movies/${review.tmdbID}/${review.movie.title}`} className="reviews-link" key={review._id}>
                                    <div className="reviews-row">
                                        <div className="reviews-cell movie-cell">
                                            <img src={review.movie.poster} alt={review.movie.title} loading="lazy" />
                                            <small className="movie-title">{review.movie.title}</small>
                                        </div>

                                        <div className="reviews-cell review-cell">
                                            <p>{review.comment}</p>
                                            <span className="movie-rate">⭐ {review.rating}</span>
                                        </div>

                                        <div className="reviews-cell user-cell">
                                            <img src={null} alt={`${review.author.username} avatar`} className="user-avatar" loading="lazy" />
                                            <span className="user-name">{review.author.username}</span>
                                        </div>

                                        <div className="reviews-cell date-cell">{timeAgo(review.createdAt)}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
