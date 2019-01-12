const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;