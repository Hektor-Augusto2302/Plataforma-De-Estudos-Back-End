const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        profileImage: String,
        role: { type: String, enum: ['user', 'admin'], default: 'user' }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
