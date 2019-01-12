const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/UserModel');

const saltRounds = 10;

router.get('/register', (req, res) => {
  res.send('Registration page');
});

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
          res.send('Saved Succesfully');
        });
      }
      else {
        res.send('Error while hashing');
      }
    });
  }
  else {
    res.send('Please enter all the fields');
  }
});

module.exports = router;