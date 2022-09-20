const express = require('express');
const { RecipeController } = require('../../controllers/index');

const recipeRouter = express.Router();

recipeRouter.route('/recipes').get(RecipeController.getPage);
recipeRouter.route('/recipe').post(RecipeController.create);
recipeRouter.route('/recipe').patch(RecipeController.update);
recipeRouter.route('/recipes/:id').get(RecipeController.getById);
recipeRouter.route('/recipes/:id').delete(RecipeController.deleteById);

module.exports = recipeRouter;
