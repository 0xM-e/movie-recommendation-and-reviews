import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reviewService from '../services/reviewService';
import '../styles/ImageSlider.css';

const ImageSlider = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reviewService.getDailyReviews();
        setData(response);
        console.log(response);
      } catch (error) {
        console.error('API data fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const repeatedPanels = [...data, ...data, ...data, ...data];

  return (
    <div className="slider-container">
      <div className="slider-track">
        {repeatedPanels.map((panel, index) => (
          <Link to={`/movies/${panel.movie.tmdbID}/${panel.movie.title}`} className="slider-card" key={index}>
            <img src={panel.movie.poster} alt={panel.movie.title} />
            <div className="title">{panel.movie.title}</div>
            <div className="rate">{panel.movie.rating}</div>
            <div className="director">{panel.movie.director}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
