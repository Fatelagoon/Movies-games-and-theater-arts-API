const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const AktorRoutes = require("./api/routes/Aktor");
const gamesRoutes = require("./api/routes/games");
const MovieRoutes = require("./api/routes/Movie");
const Theater_ArtsRoutes = require("./api/routes/Theater_Arts");
const TVseriesRoutes = require("./api/routes/TVseries");
const userRoutes = require("./api/routes/users");



mongoose.connect("mongodb+srv://shop:"+ process.env.MONGO_PASS + "@mbo-ns57q.mongodb.net/mbo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use((req, res, next)=> {
    const error = new Error("Nie znaleziono");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next)=> {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;

