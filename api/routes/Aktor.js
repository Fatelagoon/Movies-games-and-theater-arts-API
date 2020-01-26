const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Aktor = require("../models/Aktor");

router.get("/", checkAuth, (req, res, next)=> {
    games.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const Aktor = new Aktor({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        rating: req.body.rating,
    });
    Aktor.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nowego aktora",
            createdAktor: Aktor
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:AktorId", checkAuth, (req, res, next)=> {
    const id = req.params.AktortId;
    Aktor.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:AktorId", checkAuth, (req, res, next)=> {
    const id = req.params.AktorId;
    Aktor.update({_id:id}, { $set: {
        name: req.body.name,
        surname: req.body.surname,
        rating: req.body.rating,
        
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiana Aktora o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:AktorId", checkAuth, (req, res, next)=> {
    const id = req.params.AktorId;
    Aktor.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięcie Aktora o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;