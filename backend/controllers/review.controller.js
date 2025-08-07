const reviewService = require('../services/review.service');
const moviesService = require('../services/movie.service');
const Review = require('../models/Review');

exports.getPaginatedReviews = async (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    try {
        const reviews = await reviewService.getPaginatedReviews(page, limit);
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: 'No reviews found' });
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMovieReviewsByImdbID = async (req, res) => {
    try {
        const { imdbID } = req.params;
        const reviews = await reviewService.getReviewsByImdbID(imdbID);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createReview = async (req, res) => {
    try {
        const { imdbID } = req.params;
        const { rating, comment } = req.body;
        const author = req.user.id;


        if (!imdbID || !author || rating === undefined || !comment) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newReview = await reviewService.createReview(imdbID, author, rating, comment);
        console.log(newReview);
        if (!newReview) {
            return res.status(400).json({ message: 'You have already submitted a review for this movie' });
        }

        moviesService.calculateRating(imdbID, rating);
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const { imdbID, reviewID } = req.params;
        const { rating, comment } = req.body;
        const author = req.user.id;

        if (!imdbID || !reviewID || rating === undefined || !comment) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedReview = await reviewService.updateReview(imdbID, author, reviewID, rating, comment);

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        moviesService.updateRating(imdbID, updatedReview.rating, rating);
        res.json({ message: 'Review updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const { imdbID, reviewID } = req.params;
        const author = req.user.id;
        if (!imdbID || !reviewID) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const deletedReview = await reviewService.deleteReview(imdbID, author, reviewID);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        moviesService.deleteRating(imdbID, deletedReview.rating);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.markReviewAsUsefull = async (req, res) => {
    try {
        const { reviewID } = req.params;
        const user = req.user;

        if (!reviewID || !user) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedReview = await reviewService.markReviewAsUsefull(reviewID, user);
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found or already marked as useful' });
        }

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.markReviewAsNotUsefull = async (req, res) => {
    try {
        const { reviewID } = req.params;
        const user = req.user;

        if (!reviewID || !user.id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedReview = await reviewService.markReviewAsNotUsefull(reviewID, user);
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found or already marked as not useful' });
        }

        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}