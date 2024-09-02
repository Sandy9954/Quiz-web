const mongoose = require("mongoose");

// Define profile schema
const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    bio: {
        type: String,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create Profile model
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;