const mongoose = require('mongoose');

const dessertSchema = new mongoose.Schema(
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

const Dessert = mongoose.model('Dessert', dessertSchema);

module.exports = Dessert;