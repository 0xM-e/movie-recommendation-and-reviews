const reviewService = require('../services/review.service');
const moviesService = require('../services/movie.service');
const Review = require('../models/Review');

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
        const { author, rating, comment } = req.body;

        if (!imdbID || !author || rating === undefined || !comment) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newReview = reviewService.createReview(imdbID, author, rating, comment);
        if (!newReview) {
            return res.status(400).json({ message: 'Failed to create review' });
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

        if (!imdbID || !reviewID || rating === undefined || !comment) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedReview = await reviewService.updateReview(imdbID, reviewID, rating, comment);

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        moviesService.updateRating(imdbID, updatedReview.rating, rating);
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const { imdbID, reviewID } = req.params;

        if (!imdbID || !reviewID) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const deletedReview = await reviewService.deleteReview(imdbID, reviewID);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        moviesService.deleteRating(imdbID, deletedReview.rating);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}