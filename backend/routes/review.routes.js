const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

router.get('/:imdbID', reviewController.getMovieReviewsByImdbID);

router.post('/:imdbID', reviewController.createReview);

router.put('/:imdbID/:reviewID', reviewController.updateReview);

router.delete('/:imdbID/:reviewID', reviewController.deleteReview);

module.exports = router;
