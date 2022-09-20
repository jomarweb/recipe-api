const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  ingredientsHTML: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  stepsHTML: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  photoURL: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
