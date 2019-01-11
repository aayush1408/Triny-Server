const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
}, {
    strict: false
  });

const dataModel = mongoose.model('dataModel', dataSchema);

module.exports = dataModel;

