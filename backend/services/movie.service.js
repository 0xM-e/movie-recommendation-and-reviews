const Movie = require('../models/Movie');
const tmdbApi = require('../external/tmdb.api');

exports.fetchMovieById = async (movieId) => {
    return await tmdbApi.fetchMovieById(movieId);
}

exports.fetchMovieByName = async (movieName) => {
    return await tmdbApi.fetchMovieByName(movieName);
}

exports.isMovieExists = async (tmdbID) => {
    try {
        const movie = await Movie.findOne({ tmdbID });
        if (movie) {
            console.log(`Movie with ID ${tmdbID} already exists in the database.`);
            return movie;
        }
        return null;
    } catch (error) {
        console.error("Error occurred while checking movie existence:", error);
        return null;
    }
}
exports.updateMovie = async (user, tmdbID, updates) => {
    console.log(user.role);
    if (user.role !== 'admin') {
        throw new Error("Unauthorized: Only admins can update movies.");
    }
    const movie = await Movie.findOne({ tmdbID });
    if (!movie) {
        return;
    }
    Object.assign(movie, updates);
    await movie.save();
    return movie;
}

exports.deleteMovie = async (user, tmdbID) => {
    if (user.role !== 'admin') {
        throw new Error("Unauthorized: Only admins can delete movies.");
    }
    const movie = await Movie.findOneAndDelete({ tmdbID });
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


exports.calculateRating = async (tmdbID, rating) => {
    const movie = await Movie.findOne({ tmdbID });
    if (!movie) {
        return;
    }
    const newRating = (movie.rating * movie.reviewCount + rating) / (movie.reviewCount + 1);
    movie.rating = newRating;
    movie.reviewCount++;
    await movie.save();
}

exports.deleteRating = async (tmdbID, rating) => {
    const movie = await Movie.findOne({ tmdbID });
    if (!movie) {
        return;
    }
    if (movie.reviewCount <= 1) {
        movie.rating = 0;
        movie.reviewCount = 0;
        await movie.save();
        return;
    }

    let newRating = (movie.rating * movie.reviewCount - rating) / (movie.reviewCount - 1);

    if (newRating < 0 || isNaN(newRating)) newRating = 0;

    movie.rating = newRating;
    movie.reviewCount--;
    await movie.save();
}

exports.updateRating = async (tmdbID, previousRating, newRating) => {
    const movie = await Movie.findOne({ tmdbID });
    if (!movie) {
        return;
    }
    const newMovieRating = (movie.rating * movie.reviewCount - previousRating + newRating) / movie.reviewCount;
    movie.rating = newMovieRating;
    await movie.save();
}