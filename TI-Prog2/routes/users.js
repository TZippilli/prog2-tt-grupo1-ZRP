var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.send('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

module.exports = router;