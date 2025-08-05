import React from 'react';
import Carousel from '../components/Carousel';
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
    {
        id: 11,
        image: 'https://image.tmdb.org/t/p/w500/mubt4bnVfpJ5lBMq93DidEuMkJr.jpg',
        title: 'Whiplash',
        rate: '⭐ 4.4',
        director: 'Damien Chazelle',
        year: 2014,
        genre: 'Drama, Music',
        description: 'The conflict between an ambitious drum student and his strict teacher.'
    },
    {
        id: 12,
        image: 'https://image.tmdb.org/t/p/w500/mubt4bnVfpJ5lBMq93DidEuMkJr.jpg',
        title: 'Whiplash',
        rate: '⭐ 4.4',
        director: 'Damien Chazelle',
        year: 2014,
        genre: 'Drama, Music',
        description: 'The conflict between an ambitious drum student and his strict teacher.'
    },
];

const comments = [
    {
        id: 1,
        username: "Alex",
        avatarUrl: "https://i.pravatar.cc/40?img=3",
        text: "Great design!",
        date: "2025-07-31",
        movieTitle: "Inception",
        movieRate: 4.8,
    },
    {
        id: 2,
        username: "Harry",
        avatarUrl: "https://i.pravatar.cc/40?img=5",
        text: "Looks very useful.",
        date: "2025-07-30",
        movieTitle: "Interstellar",
        movieRate: 4.7,
    },
    {
        id: 3,
        username: "Mark",
        avatarUrl: "https://i.pravatar.cc/40?img=7",
        text: "Colors and fonts are very harmonious.",
        date: "2025-07-29",
        movieTitle: "The Matrix",
        movieRate: 4.6,
    },
    {
        id: 4,
        username: "Sophia",
        avatarUrl: "https://i.pravatar.cc/40?img=9",
        text: "Fantastic plot and visuals!",
        date: "2025-07-28",
        movieTitle: "Inception",
        movieRate: 4.8,
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
    return (
        <div className='home-container'>
            <div className='home-wrapper'>
                <div className='home-item welcome-section'>
                    <h2>🎬 Welcome!</h2>
                    <p>Discover and review the best movies. Step into the world of cinema!</p>
                </div>

                <div className='home-item'>
                    <Carousel
                        panels={panels}
                        panelWidth={300}
                        panelHeight={550}
                        rotationSpeed={0.1}
                    />
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
                                <div className="reviews-cell date-cell">Date</div>
                            </div>
                            {comments.map(({ id, username, avatarUrl, text, date, movieTitle, movieRate }) => (
                                <div key={id} className="reviews-row">
                                    <div className="reviews-cell user-cell">
                                        <img src={avatarUrl} alt={`${username} avatar`} className="user-avatar" loading="lazy" />
                                        <span className="user-name">{username}</span>
                                    </div>
                                    <div className="reviews-cell review-cell">
                                        <p>{text}</p>
                                        <small className="movie-title">
                                            Movie: {movieTitle} &nbsp; <span className="movie-rate">⭐ {movieRate}</span>
                                        </small>
                                    </div>
                                    <div className="reviews-cell date-cell">{date}</div>
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
