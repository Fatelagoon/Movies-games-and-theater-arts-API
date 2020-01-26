const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Movie = require("../models/movie");

router.get("/", checkAuth, (req, res, next)=> {
    Movie.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        lenght: req.body.lenght,
        premiere: req.body.premiere,
        producer: req.body.producer,
        description: req.body.description,
    });
    movie.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowy film",
            createdMovie: movie
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:movieId", checkAuth, (req, res, next)=> {
    const id = req.params.movieId;
    Movie.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:movieId", checkAuth, (req, res, next)=> {
    const id = req.params.movieId;
    Movie.update({_id:id}, { $set: {
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        lenght: req.body.lenght,
        premiere: req.body.premiere,
        producer: req.body.producer,
        description: req.body.description,
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana filmu o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:movieId", checkAuth, (req, res, next)=> {
    const id = req.params.movieId;
    Movie.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie filmu o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;