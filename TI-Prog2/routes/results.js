//search results
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('search-results');
});

module.exports = router;