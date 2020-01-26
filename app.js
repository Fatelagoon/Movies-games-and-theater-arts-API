const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const userRoutes = require("./api/routes/users");

mongoose.connect("mongodb+srv://Movies_tvseries:"+ process.env.MONGO_PASS + "@mbo-ns57q.mongodb.net/mbo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/movie", movieRoutes);
app.use("/tvseries", tvseriesRoutes);
app.use("/theater_arts", theater_artsRoutes);
app.use("/aktor", aktorRoutes);
app.use("/games", gamesRoutes);

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
