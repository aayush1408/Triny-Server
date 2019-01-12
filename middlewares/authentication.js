let sessionChecker = (req, res, next) => {
  if (req.session.userid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

module.exports = sessionChecker;