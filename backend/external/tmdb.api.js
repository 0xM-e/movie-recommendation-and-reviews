const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_URL = process.env.TMDB_API_URL;

/**
 * @param {String|Number} movieId
 * @returns {Object}
 */
async function fetchMovieById(movieId) {
    try {
        const response = await axios.get(`${TMDB_API_URL}movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                language: 'en-US',
                append_to_response: 'credits'
            }
        });

        const data = response.data;

        return {
            _id: data.id,
            imdbID: data.imdb_id || null,
            title: data.title,
            description: data.overview,
            year: parseInt(data.release_date?.split('-')[0]) || null,
            genres: data.genres?.map(g => g.name) || [],
            director: data.credits.crew.find(person => person.job === 'Director')?.name || null,
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
        const searchResponse = await axios.get(`${TMDB_API_URL}search/movie`, {
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
        console.log(searchResponse.data.results);
        const firstMovie = searchResponse.data.results.slice(0, 6);
        return firstMovie.map(movie => ({
            id: movie.id,
            imdbID: movie.imdb_id || null,
            title: movie.title,
            description: movie.overview,
            year: parseInt(movie.release_date?.split('-')[0]) || null,
            genres: movie.genre_ids || [],
            director: null, // Director info is not available in search results
            duration: null, // Duration info is not available in search results
            poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
        }));
        // return [{
        //     id: firstMovie.id,
        //     title: firstMovie.title,
        //     year: parseInt(firstMovie.release_date?.split('-')[0]) || null,
        //     poster: firstMovie.poster_path ? `https://image.tmdb.org/t/p/w500${firstMovie.poster_path}` : null
        // }];
    } catch (error) {
        console.error('TMDb API Error:', error.message);
        throw new Error('Failed to fetch movie from TMDb API.');
    }
}


module.exports = {
    fetchMovieById,
    fetchMovieByName
};
