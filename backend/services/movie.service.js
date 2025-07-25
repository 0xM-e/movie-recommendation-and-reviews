const Movie = require('../models/Movie');
const omdbApi = require('../external/omdb.api');

exports.fetchMovieByImdbId = async (imdbID) => {
    return await omdbApi.fetchMovieByImdbId(imdbID);
}

exports.fetchMovieByName = async (movieName) => {
    return await omdbApi.fetchMovieByName(movieName);
}



exports.calculateRating = async (imdbID, rating) => {
    const movie = await Movie.findOne({ imdbID });
    if (!movie) {
        return;
    }
    const newRating = (movie.rating * movie.reviewCount + rating) / (movie.reviewCount + 1);
    movie.rating = newRating;
    movie.reviewCount++;
    await movie.save();
}

exports.deleteRating = async (imdbID, rating) => {
    const movie = await Movie.findOne({ imdbID });
    if (!movie) {
        return;
    }
    const newRating = (movie.rating * movie.reviewCount - rating) / (movie.reviewCount - 1);
    movie.rating = newRating;
    movie.reviewCount--;
    await movie.save();
}

exports.updateRating = async (imdbID, previousRating, newRating) => {
    const movie = await Movie.findOne({ imdbID });
    if (!movie) {
        return;
    }
    const newMovieRating = (movie.rating * movie.reviewCount - previousRating + newRating) / movie.reviewCount;
    movie.rating = newMovieRating;
    await movie.save();
}