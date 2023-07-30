const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema(
    {
        name: String,
        image: {
            type: String,
            required: true
        },
        description: String,
        price: Number,
        quantity: Number,
        type: String
    }
);

const Pizza = mongoose.model('Pizza', pizzaSchema);

module.exports = Pizza;