const Joi = require('joi');
const mongoose = require('mongoose');


const Foreigns = mongoose.model('Foreigns', new mongoose.Schema({
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


function validateForeign(foreign) {
    const schema = {
        date: Joi.date().allow(''),
        name: Joi.string().min(2).max(255).required(),
        taste: Joi.boolean().allow(''),
        description: Joi.string().max(1024).allow('')
    };

    return Joi.validate(foreign, schema);
}

exports.Foreigns = Foreigns; 
exports.validateForeign = validateForeign;