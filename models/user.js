const mongoose = require('mongoose');
const joi = require('joi');
const { flashcardsSchema } = require('./flshcards');

const userSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isGoldMember: { type: Boolean, default: false },
    shoppingCart: { type: [flashcardsSchema], default: [] },
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = joi.object({
        title: joi.string().required(),
    });
    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;

