const Movie = require('../models/Movie');
const omdbApi = require('../external/omdb.api');

exports.fetchMovieByImdbId = async (imdbID) => {
    return await omdbApi.fetchMovieByImdbId(imdbID);
}

exports.fetchMovieByName = async (movieName) => {
    return await omdbApi.fetchMovieByName(movieName);
}

exports.updateMovie = async (user, imdbID, updates) => {
    console.log(user.role);
    if (user.role !== 'admin') {
        throw new Error("Unauthorized: Only admins can update movies.");
    }
    const movie = await Movie.findOne({ imdbID });
    if (!movie) {
        return;
    }
    Object.assign(movie, updates);
    await movie.save();
    return movie;
}

exports.deleteMovie = async (user, imdbID) => {
    if (user.role !== 'admin') {
        throw new Error("Unauthorized: Only admins can delete movies.");
    }
    const movie = await Movie.findOneAndDelete({ imdbID });
    if (!movie) {
        return;
    }
    return movie;
}

exports.getMostPopularMovies = async (page, limit) => {
    const skip = (page - 1) * limit;
    console.log(`Fetching most popular movies: page ${page}, limit ${limit}, skip ${skip}`);
    const [movies, total] = await Promise.all([
        Movie.find()
            .sort({ rating: -1 })
            .skip(skip)
            .limit(limit),

        Movie.countDocuments()
    ]);
    return {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: movies
    };
};


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