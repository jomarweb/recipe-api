const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
    required: false,
  },
  tokenExpiredAt: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
