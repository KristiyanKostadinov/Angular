const express = require('express');
const multer = require('multer');
const path = require('path');
const Dessert = require('../models/dessert');
const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: './public/desserts/', // Directory to store uploaded images
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create a Multer instance
const upload = multer({ storage: storage });

// Controller to save a dessert with an uploaded image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, quantity, type } = req.body;
    const image = req.file.filename;

    // Create a new dessert instance
    const dessert = new Dessert({
      name,
      image,
      description,
      price,
      quantity,
      type
    });

    // Save the dessert to the database
    await dessert.save();

    res.status(201).json(dessert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Controller to get all desserts
router.get('/', async (req, res) => {
  try {
    // Retrieve all desserts from the database
    const desserts = await Dessert.find();

    res.status(200).json(desserts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../public/desserts/', filename); // Adjust the path based on your folder structure

  // Send the image file as a response
  res.sendFile(imagePath);
});

router.delete('/:id', async (req, res) => {
  try {
    const dessertId = req.params.id;

    // Find the Dessert by ID and remove it from the database
    const deletedDessert = await Dessert.findByIdAndRemove(dessertId);

    if (!deletedDessert) {
      return res.status(404).json({ success: false, error: 'Dessert not found' });
    }


    res.status(200).json({ success: true, message: 'Dessert deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
