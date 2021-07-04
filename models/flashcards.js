const mongoose = require('mongoose');

const flashcardsSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 255 },
    description: { type: String, required: true },
});

const Flashcards = mongoose.model('Flashcards', flashcardsSchema);

module.exports.Flashcards = Flashcards;
module.exports.flashcardsSchema = flashcardsSchema;