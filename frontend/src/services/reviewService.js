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
    deleteReview: async (imdbID, reviewID) => {
        console.log(`Deleting review ${reviewID} for movie: ${imdbID}`);
        const response = await api.delete(`/reviews/${imdbID}/${reviewID}`);
        console.log(`Review deleted:`, response.data);
        return response.data;
    },
    updateReview: async (imdbID, reviewID, reviewData) => {
        console.log(`Updating review ${reviewID} for movie: ${imdbID}`);
        const response = await api.put(`/reviews/${imdbID}/${reviewID}`, reviewData);
        console.log(`Review updated:`, response.data);
        return response.data;
    },
    getDailyReviews: async () => {
        console.log('Fetching daily reviews');
        const response = await api.get('/reviews/daily');
        return response.data;
    },
    getWeeklyReviews: async () => {
        console.log('Fetching weekly reviews');
        const response = await api.get('/reviews/weekly');
        return response.data;
    },
    getTopRatedReviews: async () => {
        console.log('Fetching top-rated reviews');
        const response = await api.get('/reviews/toprated');
        return response.data;
    },
    getPaginatedReviews: async (page, limit) => {
        console.log(`Fetching paginated reviews: page ${page}, limit ${limit}`);
        const response = await api.get('/reviews/getall', {
            params: { page, limit }
        });
        return response.data;
    }
};

export default reviewService;
