const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/current-user', (req, res, next) => {
  User.findById(req.session.userid)
    .then(user => {
      if (!user) {
        const error = new Error("Not authorized");
        error.status = 400;
        return next(error);
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
});

module.exports = router;