const mongoose = require('mongoose');
const joi = require('joi');

const flashcardsSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 2, maxlength: 50 },
    description: { type: String, required: true },
});

const Flashcards = mongoose.model('Flashcards', flashcardsSchema);

function validateFlashcards(flashcards) {
    const schema = joi.object({
        title: joi.string().min(2).max(50).required(),
        description: joi.string().required(),
    
    });
    return schema.validate(flashcards);
}

module.exports.Flashcards = Flashcards;
module.exports.validate = validateFlashcards;
module.exports.flashcardsSchema = flashcardsSchema;