const express = require("express");
const Admin = require("../models/admin");
const router = express.Router();
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;

router.get("/", (req, res) => {
    Admin.find()
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
            const admin = new Admin({
                username,
                name,
                gender,
                email,
                password: hashedPassword, // Store the hashed password
                role,
                position
            });

            admin
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
            const admin = {
                username,
                name,
                gender,
                email,
                password: hashedPassword, // Store the hashed password
                role,
                position
            };

            Admin.findByIdAndUpdate(req.params.id, admin, { new: true })
                .then((doc) => {
                    if (doc) {
                        res.json(doc);
                    } else {
                        res.status(404).send("Admin not found");
                    }
                })
                .catch((err) => {
                    console.log("Error in Admin Update: " + err);
                    res.status(500).send("Internal Server Error");
                });
        }
    });
});

router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("No record with given id:" + req.params.id);
    }

    Admin.findByIdAndDelete(req.params.id).then((doc) => {
        if (doc) {
            res.json(doc);
        } else {
            res.status(404).send("Admin not found");
        }
    })
});

router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid ID");
    }

    Admin.findById(req.params.id)
        .then((admin) => {
            if (admin) {
                res.json(admin);
            } else {
                res.status(404).send("Admin not found");
            }
        })
        .catch((err) => {
            console.log("Error in Admin Retrieval: " + err);
            res.status(500).send("Internal Server Error");
        });
});


module.exports = router;