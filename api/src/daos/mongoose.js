// getting-started.js
const mongoose = require('mongoose');
const config = require('../config/default.json');

const dbServer = config.database.server;

async function connectToDB() {
  try {
    await mongoose.connect(dbServer);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = connectToDB;
