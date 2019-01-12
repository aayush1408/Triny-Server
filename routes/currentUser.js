const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/current-user', (req, res, next) => {
  if (req.session.userid) {
    User.findById(req.session.userid)
      .then(user => {
        if (!user) {
          res.send({
            message: 'User not authorized'
          })
        }
        const userData = {
          email: user.email,
          username: user.username
        };
        res.send({
          message: "success",
          data: userData
        });
      })
  }
  else {
    res.send({
      message: 'Not authorized'
    })
  }
});

module.exports = router;