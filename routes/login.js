const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/UserModel');
const router = express.Router();

let sessionChecker = (req, res, next) => {
  if (req.session.userid && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

router.get('/login', sessionChecker, (req, res) => {
  res.send('Login page');
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  User.findOne({ username }).then(function (user) {
    if (!user) {
      res.redirect('/login');
    }
    else if (!(bcrypt.compareSync(password, user.password))) {
      res.redirect('/login');
    }
    else {
      req.session.userid = user._id;
      res.redirect('/dashboard');
    }
  });
});

module.exports = router;