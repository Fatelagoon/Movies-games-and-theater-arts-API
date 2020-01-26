const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const gTheater_Arts = require("../models/Theater_Arts");

router.get("/", checkAuth, (req, res, next)=> {
    Theater_Arts.find().exec()
    .then(docs=> {
        res.status(200).json(docs);
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.post("/", checkAuth, (req, res, next)=> {
    const Theater_Arts = new Theater_Arts({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        rating: req.body.rating,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        premiere: req.body.premiere,
    });
    Theater_Arts.save()
    .then(result => {
        res.status(200).json({
            message: "Dodano nową sztukę teatralną",
            createdTheater_Arts: Theater_Arts
        });
    })
    .catch(err => res.status(500).json({error: err}));
    
});

router.get("/:Theater_ArtsId", checkAuth, (req, res, next)=> {
    const id = req.params.Theater_ArtstId;
    Theater_Arts.findById(id).exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.patch("/:Theater_ArtsId", checkAuth, (req, res, next)=> {
    const id = req.params.Theater_ArtsId;
    Theater_Arts.update({_id:id}, { $set: {
        title: req.body.title,
        rating: req.body.rating,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        premiere: req.body.premiere,
    }}).exec()
    .then(result=> {
        res.status(200).json({message: "Zmiono sztukę teatralną o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));

    
});

router.delete("/:Theater_ArtsId", checkAuth, (req, res, next)=> {
    const id = req.params.Theater_ArtsId;
    Theater_Arts.remove({_id: id}).exec()
    .then(result=> {
        res.status(200).json({message: "Usunięto sztukę teatralną o numerze " + id});
    })
    .catch(err => res.status(500).json({error: err}));
    
});

module.exports = router;