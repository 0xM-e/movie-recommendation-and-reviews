const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/id/:movieId', movieController.getMovieById);
router.get('/name/:movieName', movieController.getMovieByName);
router.get('/popular', movieController.getMostPopularMovies);
router.get('/search/:movieName', movieController.searchMovieByName);

router.put('/update/:tmdbID', authenticate, movieController.updateMovie);

router.delete('/delete/:tmdbID', authenticate, movieController.deleteMovie);

module.exports = router;
