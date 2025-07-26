const Review = require('../models/Review');

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
    const newReview = new Review({
        imdbID,
        author,
        rating,
        comment
    });

    await newReview.save();
    return newReview;
}

exports.updateReview = async (imdbID, reviewID, rating, comment) => {
    const previousReview = await Review.findOne({ imdbID: imdbID, _id: reviewID });
    await Review.findOneAndUpdate(
        { imdbID: imdbID, _id: reviewID },
        { rating, comment },
        { new: true }
    );

    return previousReview;
}

exports.deleteReview = async (imdbID, reviewID) => {
    const deletedReview = await Review.findOneAndDelete({ imdbID: imdbID, _id: reviewID });
    return deletedReview;
}