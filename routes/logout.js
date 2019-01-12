const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  if (req.session.userid) {
    req.session.destroy();
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;