const mongoose = require("mongoose");

const gamesSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    rating: Number,
    description: String,
    category: String,
    producer: String,
});

module.exports = mongoose.model("Games", gamesSchema);
