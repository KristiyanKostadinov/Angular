const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/", (req, res) => {
    Employee.find()
        .then((docs) => {
            res.json(docs);
        })
        .catch((err) => {
            console.log("Error in Retrieving Customers: " + err);
            res.status(500).send("Internal Server Error");
        });
});

router.post("/", (req, res) => {
    const { username, name, gender, email, password, role, position } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Error hashing password: " + err);
            res.status(500).send("Internal Server Error");
        } else {
            const employee = new Employee({
                username,
                name,
                gender,
                email,
                password: hashedPassword, // Store the hashed password
                role,
                position
            });

            employee
                .save()
                .then((doc) => {
                    res.json(doc);
                })
                .catch((err) => {
                    console.log("Error in Customer Save: " + err);
                    res.status(500).send("Internal Server Error");
                });
        }
    });
});

router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("No record with given id:" + req.params.id);

    const { username, name, gender, email, password, role, position } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.log("Error hashing password: " + err);
            res.status(500).send("Internal Server Error");
        } else {
            const employee = {
                username,
                name,
                gender,
                email,
                password: hashedPassword, // Store the hashed password
                role,
                position
            };

            Employee.findByIdAndUpdate(req.params.id, employee, { new: true })
                .then((doc) => {
                    if (doc) {
                        res.json(doc);
                    } else {
                        res.status(404).send("Employee not found");
                    }
                })
                .catch((err) => {
                    console.log("Error in Employee Update: " + err);
                    res.status(500).send("Internal Server Error");
                });
        }
    });
});

router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record with given id:" + req.params.id);
    }

    Employee.findByIdAndDelete(req.params.id).then((doc) => {
        if (doc) {
            res.json(doc);
        } else {
            res.status(404).send("Employee not found");
        }
    })
});

router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid ID");
    }

    Employee.findById(req.params.id)
        .then((employee) => {
            if (employee) {
                res.json(employee);
            } else {
                res.status(404).send("Employee not found");
            }
        })
        .catch((err) => {
            console.log("Error in Employee Retrieval: " + err);
            res.status(500).send("Internal Server Error");
        });
});


module.exports = router;