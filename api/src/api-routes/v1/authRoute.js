const express = require('express');
const { AuthController } = require('../../controllers/index');

const recipeRouter = express.Router();
recipeRouter.route('/authenticate').get(AuthController.authenticate);

module.exports = recipeRouter;
