const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    links: [String],
    keywords: [String],
    recruiterEmail: String,
});

module.exports = mongoose.model("Jobs", jobSchema);