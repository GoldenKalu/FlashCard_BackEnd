const { Flashcards, validate } = require('../models/flashcards');
const express = require('express');
const router = express.Router();
// All endpoints and route handlers go here
router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send(error);

        const flashcards = new Flashcards({
            title: req.body.title,
            description: req.body.description,
        });

        await flashcards.save();

        return res.send(flashcards);
    } catch(ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
});


module.exports = router;