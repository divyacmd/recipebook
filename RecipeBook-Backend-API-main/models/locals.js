const Joi = require('joi');
const mongoose = require('mongoose');


const Locals = mongoose.model('Locals', new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    taste: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        maxlength: 1024
    }     
}));


function validateLocal(local) {
    const schema = {
        date: Joi.date().allow(''),
        name: Joi.string().min(2).max(255).required(),
        taste: Joi.boolean().allow(''),
        description: Joi.string().max(1024).allow('')
    };

    return Joi.validate(local, schema);
}

exports.Locals = Locals; 
exports.validateLocal = validateLocal;