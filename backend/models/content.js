const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const contentSchema = new mongoose.Schema({
    title: String,
    description: String,
    links: [String],
    likes: [String],
    keywords: [String],
    contentCreatorEmail: String,
    images: [String],
});

module.exports = mongoose.model("Content", contentSchema);