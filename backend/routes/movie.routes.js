const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.get('/id/:imdbID', movieController.getMovieById);
router.get('/name/:movieName', movieController.getMovieByName);


module.exports = router;
