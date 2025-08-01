const movieService = require('../services/movie.service');
const Movie = require('../models/Movie');

exports.getMovieByName = async (req, res) => {
  const { movieName } = req.params;
  console.log(`Searching for movie: ${movieName}`);
  try {
    let movie = await Movie.findOne({ title: movieName });

    if (!movie) {

      // Fetch data from OMDb
      movie = await movieService.fetchMovieByName(movieName);
      const newMovie = new Movie();
      newMovie.imdbID = movie._id;
      newMovie.poster = movie.poster;
      newMovie.title = movie.title;
      newMovie.save();
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const { imdbID } = req.params;
    let movie = await Movie.findOne({ imdbID });

    if (!movie) {
      console.log(`Movie with ID ${imdbID} not found in database. Fetching from OMDb...`);
      // Fetch data from OMDb
      movie = await movieService.fetchMovieByImdbId(imdbID);
      const newMovie = new Movie();
      newMovie.imdbID = movie._id;
      newMovie.poster = movie.poster;
      newMovie.title = movie.title;
      newMovie.save();
    }
    else {
      console.log(`Movie with ID ${imdbID} found in database.`);
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { imdbID } = req.params;
    const updates = req.body;
    const user = req.user;

    const updateMovie = await movieService.updateMovie(user, imdbID, updates);
    if (!updateMovie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { imdbID } = req.params;
    const user = req.user;

    const deletedMovie = await movieService.deleteMovie(user, imdbID);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }

    res.json({ message: 'Movie deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMostPopularMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const mostPopularMovies = await movieService.getMostPopularMovies(page, limit);

    if (!mostPopularMovies || mostPopularMovies.length === 0) {
      return res.status(404).json({ message: 'No popular movies found.' });
    }

    res.json(mostPopularMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}