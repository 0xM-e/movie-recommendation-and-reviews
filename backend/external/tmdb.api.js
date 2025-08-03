const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

/**
 * @param {String|Number} movieId
 * @returns {Object}
 */
async function fetchMovieById(movieId) {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
            }
        });

        const data = response.data;

        return {
            _id: data.id,
            title: data.title,
            description: data.overview,
            year: parseInt(data.release_date?.split('-')[0]) || null,
            genres: data.genres?.map(g => g.name) || [],
            director: null,
            duration: data.runtime || null,
            poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null
        };
    } catch (error) {
        console.error('TMDb API Error:', error.message);
        throw new Error('Failed to fetch movie from TMDb API.');
    }
}

/**
 * @param {String} movieName
 * @returns {Object}
 */
async function fetchMovieByName(movieName) {
    try {
        const searchResponse = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: TMDB_API_KEY,
                query: movieName,
                language: 'en-US',
                page: 1,
                include_adult: false
            }
        });

        if (searchResponse.data.results.length === 0) {
            throw new Error('Movie not found in TMDb API.');
        }

        const firstMovie = searchResponse.data.results[0];

        return {
            _id: firstMovie.id,
            title: firstMovie.title,
            description: firstMovie.overview,
            year: parseInt(firstMovie.release_date?.split('-')[0]) || null,
            genres: [],
            director: null,
            duration: null,
            poster: firstMovie.poster_path ? `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}` : null
        };
    } catch (error) {
        console.error('TMDb API Error:', error.message);
        throw new Error('Failed to fetch movie from TMDb API.');
    }
}


module.exports = {
    fetchMovieById,
    fetchMovieByName
};
