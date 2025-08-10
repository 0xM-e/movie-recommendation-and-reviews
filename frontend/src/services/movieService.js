import api from './api';

const movieService = {
    searchMoviesByName: async (movieName) => {
        console.log(`Searching for movie: ${movieName}`);
        const response = await api.get(`movies/search/${movieName}`);
        return response.data;
    },
    getMovieById: async (movieId) => {
        console.log(`Fetching movie by ID: ${movieId}`);
        const response = await api.get(`movies/id/${movieId}`);
        return response.data;
    }
};

export default movieService;
