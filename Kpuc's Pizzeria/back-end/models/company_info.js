const mongoose = require('mongoose');

const company = new mongoose.Schema(
    {
        name: String,
        address: String,
        phone: String,
        email: String,
    }
);

const Company = mongoose.model('Company', company);

module.exports = Company;