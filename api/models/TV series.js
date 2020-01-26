const mongoose = require("mongoose");

const tvseriesSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    rating: Number,
    category: String,
    lenght: Number,
    premiere: new Date(year, month, day),
    producer: String,
    description: String

});

module.exports = mongoose.model("TV series", tvseriesSchema);