const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
  name: String,
  age: Number
});

const dataModel = mongoose.model('dataModel', dataSchema);

module.exports = dataModel;

