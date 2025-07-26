const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    imdbID: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    usefull: { type: Number, default: 0 },
    notusefull: { type: Number, default: 0 },
    usefullUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    notusefullUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comment: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
