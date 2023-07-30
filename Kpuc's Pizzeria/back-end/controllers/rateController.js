const express = require("express");
const router = express.Router();
const Rate = require("../models/rate");

// Create a new rate
router.post("/", async (req, res) => {
    try {
        const rate = await Rate.create(req.body);
        res.status(201).json(rate);
    } catch (error) {
        res.status(500).json({ error: "Failed to create the rate." });
    }
});

// Get all rates
router.get("/", async (req, res) => {
    try {
        const rates = await Rate.find();
        res.status(200).json(rates);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rates." });
    }
});

// Get a single rate by ID
router.get("/:id", async (req, res) => {
    try {
        const rate = await Rate.findById(req.params.id);
        if (!rate) {
            return res.status(404).json({ error: "Rate not found." });
        }
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the rate." });
    }
});

// Update an rate by ID
router.put("/:id", async (req, res) => {
    try {
        const rate = await Rate.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!rate) {
            return res.status(404).json({ error: "Rate not found." });
        }
        res.status(200).json(rate);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the rate." });
    }
});

// Delete an rate by ID
router.delete("/:id", async (req, res) => {
    try {
        const rate = await Rate.findByIdAndDelete(req.params.id);
        if (!rate) {
            return res.status(404).json({ error: "rate not found." });
        }
        res.status(200).json({ message: "rate deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the rate." });
    }
});

module.exports = router;