const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  if (req.session.userid && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;