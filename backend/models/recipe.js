const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instruction: {
    type: String,
    required: true,
  },
  imageUrl: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;