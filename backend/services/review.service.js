const Review = require('../models/Review');

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