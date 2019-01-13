const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const router = express.Router();
const authenticatedMw = require('../middlewares/authentication');

router.get('/login', authenticatedMw, (req, res) => {
  res.send({
    message: 'Login page'
  });
});


router.post('/login', (req, res) => {
  let { username, password } = req.body;
  User.findOne({ username }).then(function (user) {
    if (!user) {
      res.send({
        message: 'Incorrect username'
      });
    }
    else if (!(bcrypt.compareSync(password, user.password))) {
      res.send({
        message: 'Incorrect password'
      });
    }
    else {
      req.session.userid = user._id;
      res.send({
        message: 'User authenticated',
        data: user
      });
    }
  });
});

module.exports = router;