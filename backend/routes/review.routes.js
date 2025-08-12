const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/getall', reviewController.getPaginatedReviews);
router.get('/daily', reviewController.getDailyReviews);
router.get('/weekly', reviewController.getWeeklyReviews);
router.get('/toprated', reviewController.getTopRatedReviews);
router.get('/:tmdbID', reviewController.getMovieReviewsByTmdbID);

router.post('/usefull/:reviewID', authenticate, reviewController.markReviewAsUsefull);
router.post('/notusefull/:reviewID', authenticate, reviewController.markReviewAsNotUsefull);


router.post('/:tmdbID', authenticate, reviewController.createReview);

router.put('/:tmdbID/:reviewID', authenticate, reviewController.updateReview);

router.delete('/:tmdbID/:reviewID', authenticate, reviewController.deleteReview);

module.exports = router;
