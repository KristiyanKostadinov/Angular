const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
    {
        username: String,
        name: String,
        gender: String,
        email: String,
        password: String,
        role: String,
        position: String
    }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;