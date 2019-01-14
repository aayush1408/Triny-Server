const express = require('express');
const mongoose = require('mongoose');
const DataModel = require('../models/dataModel');
const router = express.Router();

router.post('/send-details', (req, res) => {
  const data = req.body;
  // Use this when in prod
  // const { parameters } = data.result;
  const newData = new DataModel(data);
  newData.save().then(() => {
    res.status(200).send('Success');
  });
});

module.exports = router;
