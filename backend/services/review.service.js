const Review = require('../models/Review');
const mongoose = require('mongoose');

exports.getPaginatedReviews = async (page, limit) => {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
        Review.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'username role'),

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

exports.createReview = async (imdbID, author, rating, comment) => {
    const existingReview = await Review.findOne({ imdbID, author: author });
    if (existingReview) {
        return null;
    }
    const newReview = new Review({
        imdbID,
        author,
        rating,
        comment
    });

    await newReview.save();
    return newReview;
}

exports.updateReview = async (imdbID, author, reviewID, rating, comment) => {
    const existingReview = await Review.findOne({ imdbID: imdbID, author: author });
    if (existingReview) {
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