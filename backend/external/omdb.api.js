const axios = require('axios');

const API_KEY = process.env.OMDB_API_KEY;
const API_URL = process.env.OMDB_API_URL;

/**
 * Fetches movie data from OMDb API using IMDb ID
 * @param {String} imdbID
 * @returns {Object} movie data
 */
async function fetchMovieByImdbId(imdbID) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full'
      }
    });

    if (response.data.Response === 'False') {
      throw new Error('Movie not found in OMDb API.');
    }

    const data = response.data;

    return {
      _id: imdbID,
      title: data.Title,
      description: data.Plot,
      year: parseInt(data.Year),
      genres: data.Genre?.split(',').map((g) => g.trim()) || [],
      director: data.Director,
      duration: parseInt(data.Runtime) || null,
      poster: data.Poster
    };
  } catch (error) {
    console.error('OMDb API Error:', error.message);
    throw new Error('Failed to fetch movie from OMDb API.');
  }
}

/**
 * Fetches movie data from OMDb API using title
 * @param {String} title
 * @returns {Object} movie data
 */
async function fetchMovieByName(movieName) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        t: movieName,
        plot: 'full'
      }
    });

    if (response.data.Response === 'False') {
      throw new Error('Movie not found in OMDb API.');
    }

    const data = response.data;

    return {
      _id: data.imdbID,
      title: data.Title,
      description: data.Plot,
      year: parseInt(data.Year),
      genres: data.Genre?.split(',').map((g) => g.trim()) || [],
      director: data.Director,
      duration: parseInt(data.Runtime) || null,
      poster: data.Poster
    };
  } catch (error) {
    console.error('OMDb API Error:', error.message);
    throw new Error('Failed to fetch movie from OMDb API.');
  }
}

module.exports = {
  fetchMovieByImdbId,
  fetchMovieByName
};
