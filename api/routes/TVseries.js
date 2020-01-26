const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const TVseries = require("../models/movie");

router.get("/", checkAuth, (req, res, next)=> {
    TVseries.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const tvseries = new TVseries({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        lenght: req.body.lenght,
        premiere: req.body.premiere,
        producer: req.body.producer,
        description: req.body.description,
    });
    tvseries.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowy serial",
            createdTVseries: tvseries
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:tvseriesId", checkAuth, (req, res, next)=> {
    const id = req.params.tvseriesId;
    TVseries.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:tvseriesId", checkAuth, (req, res, next)=> {
    const id = req.params.tvseriesId;
    TVseries.update({_id:id}, { $set: {
        title: req.body.title,
        rating: req.body.rating,
        category: req.body.category,
        lenght: req.body.lenght,
        premiere: req.body.premiere,
        producer: req.body.producer,
        description: req.body.description,
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana serialu o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:tvseriesId", checkAuth, (req, res, next)=> {
    const id = req.params.tvseriesId;
    TVseries.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie serialu o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;