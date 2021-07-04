const mongoose = require('mongoose');
const { flashcardsSchema } = require('./flashcards');

const collectionsSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 255 },
    cards: { type: [flashcardsSchema], default: [] },
});

const Collection = mongoose.model('Collection', collectionsSchema);



