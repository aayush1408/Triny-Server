const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;