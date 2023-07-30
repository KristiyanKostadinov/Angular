const express = require('express');
const multer = require('multer');
const path = require('path');
const Pizza = require('../models/pizza');
const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: './public/pizzas/', // Directory to store uploaded images
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create a Multer instance
const upload = multer({ storage: storage });

// Controller to save a pizza with an uploaded image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, quantity, type } = req.body;
    const image = req.file.filename;

    // Create a new pizza instance
    const pizza = new Pizza({
      name,
      image,
      description,
      price,
      quantity,
      type
    });

    // Save the pizza to the database
    await pizza.save();

    res.status(201).json(pizza);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Controller to get all pizzas
router.get('/', async (req, res) => {
  try {
    // Retrieve all pizzas from the database
    const pizzas = await Pizza.find();

    res.status(200).json(pizzas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../public/pizzas/', filename); // Adjust the path based on your folder structure

  // Send the image file as a response
  res.sendFile(imagePath);
});

router.delete('/:id', async (req, res) => {
  try {
    const pizzaId = req.params.id;

    // Find the pizza by ID and remove it from the database
    const deletedPizza = await Pizza.findByIdAndRemove(pizzaId);

    if (!deletedPizza) {
      return res.status(404).json({ success: false, error: 'Pizza not found' });
    }


    res.status(200).json({ success: true, message: 'Pizza deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
