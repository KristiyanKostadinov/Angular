const express = require("express");
const router = express.Router();
const Company = require("../models/company_info");

// Create a new company info
router.post("/", async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to create the company info." });
    }
});

// Get all company info
router.get("/", async (req, res) => {
    try {
        const company = await Company.find();
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch company info." });
    }
});

// Get a single company info by ID
router.get("/:id", async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ error: "Company info not found." });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the company info." });
    }
});

// Update a company info by ID
router.put("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!company) {
            return res.status(404).json({ error: "Company info not found." });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the company info." });
    }
});

// Delete a company info by ID
router.delete("/:id", async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ error: "Company info not found." });
        }
        res.status(200).json({ message: "Company info deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the company info." });
    }
});

module.exports = router;
