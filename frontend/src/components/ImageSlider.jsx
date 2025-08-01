import React from 'react';
import '../styles/ImageSlider.css';

const panels = [
  {
    id: 1,
    image: 'https://image.tmdb.org/t/p/w500/sjMN7DRi4sGiledsmllEw5HJjPy.jpg',
    title: 'Inception',
    rate: '⭐ 4.8',
    director: 'Director: Christopher Nolan.',
  },
  {
    id: 2,
    image: 'https://image.tmdb.org/t/p/w500/7tvAnzZj9e9AjdoHaN9jshm2Cjw.jpg',
    title: 'Interstellar',
    rate: '⭐ 4.7',
    director: 'Director: Christopher Nolan.',
  },
  {
    id: 3,
    image: 'https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg',
    title: 'The Matrix',
    rate: '⭐ 4.6',
    director: 'Director: Christopher Nolan.',
  },
  {
    id: 4,
    image: 'https://image.tmdb.org/t/p/w500/4YZpsylmjHbqeWzjKpUEF8gcLNW.jpg',
    title: 'Parasite',
    rate: '⭐ 4.5',
    director: 'Director: Christopher Nolan.',
  },
  {
    id: 5,
    image: 'https://image.tmdb.org/t/p/w500/mubt4bnVfpJ5lBMq93DidEuMkJr.jpg',
    title: 'Whiplash',
    rate: '⭐ 4.4',
    director: 'Director: Christopher Nolan.',
  },
];

const ImageSlider = () => {
  const repeatedPanels = [...panels, ...panels, ...panels, ...panels];

  return (
    <div className="slider-container">
      <div className="slider-track">
        {repeatedPanels.map((panel, index) => (
          <div className="slider-card" key={index}>
            <img src={panel.image} alt={panel.title} />
            <div className="title">{panel.title}</div>
            <div className="rate">{panel.rate}</div>
            <div className="director">{panel.director}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
