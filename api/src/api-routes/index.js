// In src/index.js
const express = require('express');
const cors = require('cors');
const config = require('../config/default.json');

const recipeRouter = require('./v1/recipeRoute');
const authRoute = require('./v1/authRoute');
const { UserService } = require('../services/index');

const { port } = config.server;

const middleware = async (req, res, next) => {
  // -----------------------------------------------------------------------
  // authentication middleware

  // parse user token.
  const token = req.headers['auth-token'];

  const thisUser = await UserService.getActiveAuthToken(token);

  // Verify token
  if (thisUser !== null) {
    // Access granted...
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in req.query) {
      req.query[key.toLowerCase()] = req.query[key];
    }

    // if post method.
    if (req.body !== null && req.method === 'POST') {
      req.body.createdBy = thisUser.userId;
    }

    return next();
  }

  // Access denied...
  return res.status(401).send('Authentication required.'); // custom message
};

module.exports = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/api/v1', authRoute);
  app.use('/api/v1', middleware, recipeRouter);

  app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
  });
};
