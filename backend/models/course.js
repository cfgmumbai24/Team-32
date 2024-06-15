const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    title: String,
    description: String,
    links: [String],
    keywords: [String],
    courseCreaterEmail: String,
    difficulty: String,
});

module.exports = mongoose.model("Courses", coursesSchema);