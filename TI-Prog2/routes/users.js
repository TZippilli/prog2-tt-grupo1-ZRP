var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const {body} = require("express-validator")

router.get("/login", usersController.login);
router.get("/register", usersController.register);

const validations = [
    body('email').isEmail().withMessage('Debes ingresar un correo electrónico válido.'),
    body('nombre').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    body('contrasenia').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.')
];

router.post("/register", usersController.store);
router.get("/login", usersController.login);
router.get("/register", usersController.register);
router.post("/login", usersController.login);

module.exports = router;

