const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true
        },
        alternatives: {
            type: [String],
            required: true
        },
        correctAlternativeIndex: {
            type: Number,
            required: true,
            min: 0,
            max: 3
        },
        phase: {
            type: String,
            required: true
        },
        userId: mongoose.ObjectId,
        userName: String,
        likes: Array,
        comments: Array,
        userAnswers: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                },
                userName: {
                    type: String,
                },
                selectedAlternativeIndex: Number,
                isCorrect: Boolean,
                answeredAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
    },
    {
        timestamps: true
    }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
