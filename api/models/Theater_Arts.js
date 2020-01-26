const mongoose = require("mongoose");

const theater_artsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    rating: Number,
    description: String,
    category: String,
    location: String,
    premiera: new Date(year, month, day)
});

module.exports = mongoose.model("theater arts", theater_artsSchema);
