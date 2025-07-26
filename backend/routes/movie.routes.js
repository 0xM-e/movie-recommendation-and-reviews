const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/id/:imdbID', movieController.getMovieById);
router.get('/name/:movieName', movieController.getMovieByName);
router.get('/popular', movieController.getMostPopularMovies);

router.put('/update/:imdbID', authenticate, movieController.updateMovie);

router.delete('/delete/:imdbID', authenticate, movieController.deleteMovie);

module.exports = router;
