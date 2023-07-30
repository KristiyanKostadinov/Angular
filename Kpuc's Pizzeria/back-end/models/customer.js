const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        gender: String,
        email: String,
        phone: String,
        password: String,
        role: String,
        resetCode: String
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;