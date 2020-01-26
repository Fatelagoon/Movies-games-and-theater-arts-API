const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    rating: Number,
    category: String,
    lenght: Number,
    premiere: new Date(year, month, day),
    producer: String,
    description: String

});

module.exports = mongoose.model("Movie", movietSchema);