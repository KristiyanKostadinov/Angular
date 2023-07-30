const mongoose = require('mongoose');

const saladSchema = new mongoose.Schema(
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

const Salad = mongoose.model('Salad', saladSchema);

module.exports = Salad;