const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const games = require("../models/games");

router.get("/", checkAuth, (req, res, next)=> {
    games.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const games = new games({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        rating: req.body.rating,
        description: req.body.description,
        category: req.body.category,
        producer: req.body.producer
    });
    games.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nową gre",
            createdgames: games
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:gamesId", checkAuth, (req, res, next)=> {
    const id = req.params.gamestId;
    games.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:gamesId", checkAuth, (req, res, next)=> {
    const id = req.params.gamesId;
    games.update({_id:id}, { $set: {
        title: req.body.title,
        rating: req.body.rating,
        description: req.body.description,
        category: req.body.category,
        producer: req.body.producer
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana gry o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:gamesId", checkAuth, (req, res, next)=> {
    const id = req.params.gamesId;
    games.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie gry o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;