const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    imdbID: { type: String, required: true, unique: true },
    poster: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, default: 0 , min: 0, max: 10 },
    reviewCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
