const express = require('express');
const mongoose = require('mongoose');
const DataModel = require('../models/dataModel');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  if (req.session.userid && req.cookies.user_sid) {
    DataModel.find({}).then((data) => {
      res.json(data);
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;

