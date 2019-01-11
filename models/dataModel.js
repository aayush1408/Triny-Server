const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
  name: String,
  mobile: String
});

const dataModel = mongoose.model('dataModel', dataSchema);

module.exports = dataModel;

