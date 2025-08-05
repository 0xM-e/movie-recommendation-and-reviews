import api from './api';

const reviewService = {
    getReviewsByImdbId: async (imdbID) => {
        console.log(`Fetching reviews for movie: ${imdbID}`);
        const response = await api.get(`/reviews/${imdbID}`);
        return response.data;
    },
    submitReview: async (imdbID, reviewData) => {
        console.log(imdbID);
        console.log(`Submitting review for movie: ${imdbID}`);
        const response = await api.post(`/reviews/${imdbID}`, reviewData);
        console.log(`Review submitted:`, response.data);
        return response.data;
    },
};

export default reviewService;
