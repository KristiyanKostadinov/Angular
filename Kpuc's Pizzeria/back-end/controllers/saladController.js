const express = require('express');
const multer = require('multer');
const path = require('path');
const Salad = require('../models/salad');
const router = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: './public/salads/', // Directory to store uploaded images
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create a Multer instance
const upload = multer({ storage: storage });

// Controller to save a salad with an uploaded image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, quantity, type} = req.body;
    const image = req.file.filename;

    // Create a new salad instance
    const salad = new Salad({
      name,
      image,
      description,
      price,
      quantity, 
      type
    });

    // Save the salad to the database
    await salad.save();

    res.status(201).json(salad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// Controller to get all salads
router.get('/', async (req, res) => {
  try {
    // Retrieve all salads from the database
    const salads = await Salad.find();

    res.status(200).json(salads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../public/salads/', filename); // Adjust the path based on your folder structure

  // Send the image file as a response
  res.sendFile(imagePath);
});

router.delete('/:id', async (req, res) => {
  try {
    const saladId = req.params.id;

    // Find the Salad by ID and remove it from the database
    const deletedSalad = await Salad.findByIdAndRemove(saladId);

    if (!deletedSalad) {
      return res.status(404).json({ success: false, error: 'Salad not found' });
    }

    // // Delete the corresponding image file from the server
    // const imagePath = path.join(__dirname, '../public/salads/', deletedSalad.image);
    // fs.unlinkSync(imagePath);

    res.status(200).json({ success: true, message: 'Salad deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

module.exports = router;
