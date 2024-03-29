//perfil y -edit
// lo mismo que product y cambio las rutas
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('profile');
  });

router.get('/edit', function(req, res, next) {
res.render('profile-edit');
});

module.exports = router;