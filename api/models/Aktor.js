const mongoose = require("mongoose");

const aktorSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    surname: String,
    rating: Number,
});

module.exports = mongoose.model("Aktor", aktorSchema);
