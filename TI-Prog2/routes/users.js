var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

router.get("/login", usersController.login);
router.get("/register", usersController.register);
const {body} = require("express-validator")
const validations = [
    body("name")
    .notEmpty().withMessage("Debes ingresar un nombre").bail() //si queremos poner mas, agregamos una coma y seguimos
]

router.post("/register",validations, usersController.store);

module.exports = router;

