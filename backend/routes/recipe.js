const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Recipe = require('../models/recipe');

// Get all recipes
router.get('/', (req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create a new recipe
router.post('/', upload.single('image'), (req, res) => {
  const { title, description, ingredients, instruction } = req.body;
  const imageUrl = req.file ? req.file.path : '';

  const recipe = new Recipe({ title, description, ingredients, instruction, imageUrl });
  recipe.save()
    .then(savedRecipe => res.json(savedRecipe))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get a recipe by ID
router.get('/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a recipe by ID
router.put('/:id', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file ? req.file.path : '';

  Recipe.findByIdAndUpdate(req.params.id, { title, description, imageUrl }, { new: true })
    .then(updatedRecipe => res.json(updatedRecipe))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Delete a recipe by ID
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'Recipe deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
