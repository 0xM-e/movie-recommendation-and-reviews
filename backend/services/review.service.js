const Review = require('../models/Review');
const Movie = require('../models/Movie');
const movieService = require('./movie.service');
const mongoose = require('mongoose');

exports.getPaginatedReviews = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
        Review.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'username role')
            .populate('movie', 'title director poster reviewCount rating'),

        Review.countDocuments()
    ]);

    return {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        data: reviews
    };
};

exports.getReviewsByImdbID = async (imdbID) => {
    const reviews = await Review.find({ imdbID: imdbID }).populate('author', 'username role');
    return reviews;
}

exports.getDailyReviews = async () => {
    const today = new Date();
    const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));

    const reviews = await Review.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }
        },
        {
            $group: {
                _id: "$movie",
                reviewCount: { $sum: 1 }
            }
        },
        {
            $sort: { reviewCount: -1 }
        },
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "_id",
                as: "movie"
            }
        },
        { $unwind: "$movie" },
        {
            $project: {
                imdbID: "$movie.imdbID",
                movie: {
                    _id: "$movie._id",
                    poster: "$movie.poster",
                    title: "$movie.title",
                    reviewCount: "$reviewCount",
                    rating: "$movie.rating"
                },
                createdAt: "$movie.createdAt"
            }
        },
        { $limit: 10 }
    ]);

    return reviews;
};



exports.getWeeklyReviews = async () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    oneWeekAgo.setUTCHours(0, 0, 0, 0);

    const reviews = await Review.find({
        createdAt: { $gte: oneWeekAgo },
    })
        .select('imdbID rating createdAt')
        .sort({ rating: -1 })
        .limit(10)
        .populate('movie', 'title director poster reviewCount rating');

    return reviews;
};


exports.getTopRatedReviews = async () => {
    const reviews = await Review.find()
        .select('imdbID rating createdAt')
        .sort({ rating: -1 })
        .limit(10)
        .populate('movie', 'title director poster reviewCount rating');

    return reviews;
};

exports.createReview = async (imdbID, author, rating, comment) => {
    const existingReview = await Review.findOne({ imdbID, author: author });
    if (existingReview) {
        return null;
    }
    const existingMovie = await movieService.isMovieExists(imdbID);

    let movie;
    if (!existingMovie) {
        const fetchMovie = await movieService.fetchMovieById(imdbID);
        if (!fetchMovie) {
            throw new Error('Movie not found');
        }
        const newMovie = new Movie({
            imdbID: fetchMovie.imdbID,
            title: fetchMovie.title,
            director: fetchMovie.director,
            poster: fetchMovie.poster
        });
        movie = await newMovie.save();
    } else {
        movie = existingMovie;
    }

    const newReview = new Review({
        imdbID,
        author,
        rating,
        comment,
        movie: movie._id
    });

    await newReview.save();
    const populatedNewReview = await newReview.populate('author', 'username role');
    return populatedNewReview;
}

exports.updateReview = async (imdbID, author, reviewID, rating, comment) => {
    const existingReview = await Review.findOne({ imdbID: imdbID, author: author });
    if (!existingReview) {
        return null;
    }
    const previousReview = await Review.findOne({ imdbID: imdbID, _id: reviewID });
    await Review.findOneAndUpdate(
        { imdbID: imdbID, _id: reviewID },
        { rating, comment },
        { new: true }
    );

    return existingReview;
}

exports.deleteReview = async (imdbID, author, reviewID) => {
    const existingReview = await Review.findOne({
        imdbID: imdbID,
        author: new mongoose.Types.ObjectId(author),
        _id: new mongoose.Types.ObjectId(reviewID)
    });

    if (!existingReview) {
        return null;
    }

    await Review.findOneAndDelete({ _id: existingReview._id });
    return existingReview;
};

exports.markReviewAsUsefull = async (reviewID, user) => {
    const review = await Review.findById(reviewID);
    if (!review) {
        return null;
    }

    const userIdStr = user.id.toString();

    const notUsefullIndex = review.notusefullUsers.findIndex(id => id.toString() === userIdStr);
    if (notUsefullIndex !== -1) {
        review.notusefullUsers.splice(notUsefullIndex, 1);
        if (review.notusefull > 0) review.notusefull--;
    }

    if (review.usefullUsers.some(id => id.toString() === userIdStr)) {
        return null;
    }
    review.usefull++;
    review.usefullUsers.push(user.id);

    return await review.save();
}


exports.markReviewAsNotUsefull = async (reviewID, user) => {
    const review = await Review.findById(reviewID);
    if (!review) {
        return null;
    }

    const userIdStr = user.id.toString();

    const usefullIndex = review.usefullUsers.findIndex(id => id.toString() === userIdStr);
    if (usefullIndex !== -1) {
        review.usefullUsers.splice(usefullIndex, 1);
        if (review.usefull > 0) review.usefull--;
    }

    if (review.notusefullUsers.some(id => id.toString() === userIdStr)) {
        return null;
    }

    review.notusefull++;
    review.notusefullUsers.push(user.id);

    return await review.save();
}
