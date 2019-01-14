const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/UserModel');

const saltRounds = 10;

router.post('/register', (req, res) => {
  const { fullname, username, password, email } = req.body;
  if (fullname && username && password && email) {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (!err) {
        let newUser = new User({
          fullname,
          username,
          password: hash,
          email
        });
        newUser.save().then(() => {
          res.send({
            message: 'Saved Successfully',
            dataSaved: true
          });
        });
      }
      else {
        res.send({
          message: 'Error while hashing',
          dataSaved: false
        });
      }
    });
  }
  else {
    res.send({
      message: 'Please enter all the fields',
      dataSaved: false
    });
  }
});

module.exports = router;