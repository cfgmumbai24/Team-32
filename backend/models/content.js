const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    title: String,
    description: String,
    links: [String],
    likes: [String],
    keywords: [String],
    mentorEmail: String,
    images: [String],
});

module.exports = mongoose.model("Content", contentSchema);