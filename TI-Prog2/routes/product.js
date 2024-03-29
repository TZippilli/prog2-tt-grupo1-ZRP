//productos y -add

var express = require('express'); //importo el módulo
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('product'); //rendirizo la vista product
  });

router.get('/add', function(req, res, next) { //defino la ruta
res.render('product-add'); //renderizo la segunda vista de product-add
});

module.exports = router; //exporto el router