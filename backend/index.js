const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const upload = require('./middlewares/upload');
const Recipe = require('./models/recipe');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipe-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const uploadMiddleware = multer({ storage });

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Include routes from the routes folder
const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes(uploadMiddleware));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
