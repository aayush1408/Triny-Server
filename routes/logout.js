const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  if (req.session.userid) {
    req.session.destroy();
    res.redirect('/');
  } else {
    res.send({
      message: 'Unable to logout'
    })
  }
});

module.exports = router;