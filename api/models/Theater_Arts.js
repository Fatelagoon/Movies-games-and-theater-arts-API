const mongoose = require("mongoose");

const Theater_ArtsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    rating: Number,
    description: String,
    category: String,
    location: String,
    premiere: new Date(year, month, day)
});

module.exports = mongoose.model("theater arts", Theater_ArtsSchema);
