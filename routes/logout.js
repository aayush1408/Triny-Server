const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  if (req.session.userid) {
    req.session.destroy();
    res.status(200).send({
      message: 'Removed sessionId'
    })
  } else {
    res.send({
      message: 'Unable to logout'
    })
  }
});

module.exports = router;