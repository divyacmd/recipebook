const { Locals, validateLocal } = require("../models/locals");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


router.get("/", [auth], async (req, res) => {
    const locals = await Locals.find()
        .select("-__v")
        .sort("date");
        
    res.send(locals);
});


router.get("/:id", [auth, validateObjectId], async (req, res) => {
    const local = await Locals.findById(req.params.id).select("-__v");

    if (!local)
        return res.status(404).send("The recipe with the given ID was not found.");

    res.send(local);
});


router.post("/", [auth], async (req, res) => {
    const { error } = validateLocal(req.body);
    if (error) return res.status(400).send(error.message);

    const local = new Locals({
        name: req.body.name,
        description: req.body.description
    });

    await local.save();

    res.send(local);
});


router.put("/:id", [auth], async (req, res) => {
    const { error } = validateLocal(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const local = await Locals.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            taste: req.body.taste
        },
        { new: true }
    );

    if (!local)
        return res.status(404).send("The recipe with the given ID was not found.");

    res.send(local);
});


router.delete("/:id", [auth], async (req, res) => {
    const local = await Locals.findByIdAndRemove(req.params.id);

    if (!local)
        return res.status(404).send("The recipe with the given ID was not found.");

    res.send(local);
});


module.exports = router;