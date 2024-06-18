//perfil y -edit
// lo mismo que product y cambio las rutas
var express = require('express');
var router = express.Router();
const usersController = require("../controllers/usersController")

router.get("/profile/id/:id", usersController.profile);
router.get("/edit", usersController.profileEdit);

module.exports = router;