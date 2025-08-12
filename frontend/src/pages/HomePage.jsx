import React, { useEffect, useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import reviewService from '../services/reviewService';
import { timeAgo } from '../utils/timeFormatter';
import '../styles/HomePage.css';

const panels = [
    {
        id: 1,
        image: 'https://image.tmdb.org/t/p/w500/sjMN7DRi4sGiledsmllEw5HJjPy.jpg',
        title: 'Inception',
        rate: '⭐ 4.8',
        director: 'Christopher Nolan',
        year: 2010,
        genre: 'Science Fiction',
        description: 'A heist story set in a multi-layered dream world inside minds.'
    },
    {
        id: 2,
        image: 'https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg',
        title: 'Interstellar',
        rate: '⭐ 4.7',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Science Fiction, Drama',
        description: 'A space exploration mission for the survival of humanity.'
    },
    {
        id: 3,
        image: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        title: 'The Matrix',
        rate: '⭐ 4.6',
        director: 'Lana & Lilly Wachowski',
        year: 1999,
        genre: 'Action, Science Fiction',
        description: 'A dystopia that questions the line between reality and virtual world.'
    },
    {
        id: 4,
        image: 'https://image.tmdb.org/t/p/w500/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg',
        title: 'Parasite',
        rate: '⭐ 4.5',
        director: 'Bong Joon-ho',
        year: 2019,
        genre: 'Drama, Thriller',
        description: 'The unexpected intersecting lives of rich and poor families.'
    },
    {
        id: 5,
        image: 'https://image.tmdb.org/t/p/w500/mubt4bnVfpJ5lBMq93DidEuMkJr.jpg',
        title: 'Whiplash',
        rate: '⭐ 4.4',
        director: 'Damien Chazelle',
        year: 2014,
        genre: 'Drama, Music',
        description: 'The conflict between an ambitious drum student and his strict teacher.'
    },
    {
        id: 6,
        image: 'https://image.tmdb.org/t/p/w500/sjMN7DRi4sGiledsmllEw5HJjPy.jpg',
        title: 'Inception',
        rate: '⭐ 4.8',
        director: 'Christopher Nolan',
        year: 2010,
        genre: 'Science Fiction',
        description: 'A heist story set in a multi-layered dream world inside minds.'
    },
    {
        id: 7,
        image: 'https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg',
        title: 'Interstellar',
        rate: '⭐ 4.7',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Science Fiction, Drama',
        description: 'A space exploration mission for the survival of humanity.'
    },
    {
        id: 8,
        image: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
        title: 'The Matrix',
        rate: '⭐ 4.6',
        director: 'Lana & Lilly Wachowski',
        year: 1999,
        genre: 'Action, Science Fiction',
        description: 'A dystopia that questions the line between reality and virtual world.'
    },
    {
        id: 9,
        image: 'https://image.tmdb.org/t/p/w500/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg',
        title: 'Parasite',
        rate: '⭐ 4.5',
        director: 'Bong Joon-ho',
        year: 2019,
        genre: 'Drama, Thriller',
        description: 'The unexpected intersecting lives of rich and poor families.'
    },
    {
        id: 10,
        image: 'https://image.tmdb.org/t/p/w500/mubt4bnVfpJ5lBMq93DidEuMkJr.jpg',
        title: 'Whiplash',
        rate: '⭐ 4.4',
        director: 'Damien Chazelle',
        year: 2014,
        genre: 'Drama, Music',
        description: 'The conflict between an ambitious drum student and his strict teacher.'
    },
];

const posters = [
    "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    "https://image.tmdb.org/t/p/w500/eWUh4rgxtgypgnOa6uGMnUt01ux.jpg",
    "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    "https://image.tmdb.org/t/p/w500/cdqLnri3NEGcmfnqwk2TSIYtddg.jpg",
    "https://image.tmdb.org/t/p/w500/mubt4bnVfpJ5lBMq93DidEuMkJr.jpg",
    "https://image.tmdb.org/t/p/w500/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg",
    "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    "https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg",
    "https://image.tmdb.org/t/p/w500/sjMN7DRi4sGiledsmllEw5HJjPy.jpg",
    "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",];

const HomePage = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetching reviews
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
                        {posters.slice(0, 5).map((poster, index) => (
                            <div className="poster-item" key={index}>
                                <img src={poster} alt={`Poster ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='home-item'>
                    <h2>🏆 Top Rated Movies</h2>
                    <div className="poster-grid">
                        {posters.slice(5, 10).map((poster, index) => (
                            <div className="poster-item" key={index}>
                                <img src={poster} alt={`Poster ${index + 6}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='home-item'>
                    <div className="reviews-container">
                        <h2 className="reviews-title">💬 Latest Reviews</h2>
                        <div className="reviews-table">
                            <div className="reviews-header">
                                <div className="reviews-cell user-cell">User</div>
                                <div className="reviews-cell review-cell">Review</div>
                                <div className="reviews-cell movie-cell">Movie</div>
                                <div className="reviews-cell date-cell">Date</div>
                            </div>
                            {comments?.data?.map((review) => (
                                <div key={review._id} className="reviews-row">
                                    <div className="reviews-cell user-cell">
                                        <img src={null} alt={`${review.author.username} avatar`} className="user-avatar" loading="lazy" />
                                        <span className="user-name">{review.author.username}</span>
                                    </div>
                                    <div className="reviews-cell review-cell">
                                        <p>{review.comment}</p> <span className="movie-rate">⭐ {review.rating}</span>
                                    </div>
                                    <div className="reviews-cell movie-cell">
                                        <img src={review.movie.poster} alt={review.movie.title} loading="lazy" />
                                        <small className="movie-title">
                                            {review.movie.title} &nbsp;
                                        </small>
                                    </div>
                                    <div className="reviews-cell date-cell">{timeAgo(review.createdAt)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

