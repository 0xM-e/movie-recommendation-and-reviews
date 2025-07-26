const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/getall', reviewController.getPaginatedReviews);
router.get('/:imdbID', reviewController.getMovieReviewsByImdbID);

router.post('/usefull/:reviewID', authenticate, reviewController.markReviewAsUsefull);
router.post('/notusefull/:reviewID', authenticate, reviewController.markReviewAsNotUsefull);


router.post('/:imdbID', authenticate, reviewController.createReview);

router.put('/:imdbID/:reviewID', authenticate, reviewController.updateReview);

router.delete('/:imdbID/:reviewID', authenticate, reviewController.deleteReview);

module.exports = router;
