const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema(
    {
        userId: mongoose.ObjectId,
        questionId: mongoose.ObjectId,
        userName: String,
        userEmail: String,
        ratingValue: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;