const { Flashcards, validate } = require('../models/flashcards');
const {Collection} = require('../models/collections')
const express = require('express');
const router = express.Router();
// All endpoints and route handlers go here

router.get('/', async (req, res) => {
    try {
        const flashcards = await Flashcards.find();
        return res.send(flashcards);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const flashcards = await Flashcards.findById(req.params.id);

        if (!flashcards)
            return res.status(400).send(`The flashcards with id "${req.params.id}" does not exist.`);

        return res.send(flashcards);

    }   catch (ex){
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

// Route to POST a new collection

router.post('/collection/', async (req, res) => {
    try {
       // TODO: define a validate function on the schema and call here
        const collection = new Collection({
            name: req.body.name,
        });

        await collection.save();

        return res.send(collection);
    } catch(ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }

})

// Route to GET that collection


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


router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const flashcards = await Flashcards.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
            },
            { new: true }
        );

        if (!flashcards)
            return res.status(400).send(`The flashcards with id "${req.params.id}" does not exist.`);
            
            await flashcards.save();

            return res.send(flashcards);
        }   catch (ex) {
            return res.status(500).send(`Internal Server Error: ${ex}`);
        }
    });


router.delete('/:id', async (req, res) => {
    try {

        const flashcards = await Flashcards.findByIdAndRemove(req.params.id);
        
        if (!flashcards)
            return res.status(400).send(`The flashcards with id "${req.params.id}" does not exist`);


        return res.send(flashcards);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

module.exports = router;