const { Foreigns, validateForeign } = require("../models/foreigns");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


router.get("/", [auth], async (req, res) => {
    const foreigns = await Foreigns.find()
        .select("-__v")
        .sort("date");
        
    res.send(foreigns);
});


router.get("/:id", [auth, validateObjectId], async (req, res) => {
    const foreign = await Foreigns.findById(req.params.id).select("-__v");

    if (!foreign)
        return res.status(404).send("The recipe with the given ID was not found.");

    res.send(foreign);
});


router.post("/", [auth], async (req, res) => {
    const { error } = validateForeign(req.body);
    if (error) return res.status(400).send(error.message);

    const foreign = new Foreigns({
        name: req.body.name,
        description: req.body.description
    });

    await foreign.save();

    res.send(foreign);
});


router.put("/:id", [auth], async (req, res) => {
    const { error } = validateForeign(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const foreign = await Foreigns.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            taste: req.body.taste
        },
        { new: true }
    );

    if (!foreign)
        return res.status(404).send("The recipe with the given ID was not found.");

    res.send(foreign);
});


router.delete("/:id", [auth], async (req, res) => {
    const foreign = await Foreigns.findByIdAndRemove(req.params.id);

    if (!foreign)
        return res.status(404).send("The recipe with the given ID was not found.");

    res.send(foreign);
});


module.exports = router;