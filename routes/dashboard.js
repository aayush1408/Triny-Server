const express = require('express');
const mongoose = require('mongoose');
const DataModel = require('../models/dataModel');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  if (req.session.userid) {
    DataModel.find({}).then((data) => {
      res.status(200).json(data);
    });
  } else {
    res.send({
      message: 'Not authorized'
    });
  }
});

module.exports = router;

