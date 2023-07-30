const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
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

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;