const { User } = require('../models/user');
const { Flashcards, validate } = require('../models/flashcards');
const express = require('express');
const router = express.Router();


router.post('/:userId/shoppingcart/:flashcardId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

        const flashcards = await flashcards.findById(req.params.flashcardId);
        if (!flashcards) return res.status(400).send(`The flashcard with id "${req.params.flashcardId}" does not exist.`);


        user.shoppingCart.push(flashcards);

        await user.save();
        return res.send(user.shoppingCart);
    }   catch (ex) {
        return res.status(500).send('Internal Server Error: ${ex}');
    }
   });

router.put('/:userId/shoppingcart/:flashcardsId', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error);

        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist. `);

        const flashcards = user.shoppingCart.id(req.params.flashcardsId);
        if (!flashcards) return res.status(400).send(`The flashcards with id "${req.params.flashcardsId}" does not exist in the users shopping cart.`);

        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
        product.dateModified = Date.now();

        await user.save();
        return res.send(flashcards);
    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.delete('/:userId/shoppingcart/:flashcardsId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);


        let flashcards = user.shoppingCart.id(req.params.flashcardsId);
        if (!flashcards) return res.status(400).send(`The flashcards with id "${req.params.flashcardsId}" does not in the users shopping cart.`);
        
        flashcards = await flashcards.remove();

        await user.save();
        return res.send(flashcards);
    }    catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });


   module.exports = router;