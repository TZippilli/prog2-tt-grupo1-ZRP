const express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const {body} = require("express-validator")


const validationsRegister = [
    body('email').isEmail().withMessage('Debes ingresar un correo electrónico válido.').bail()
    .notEmpty().withMessage('Debes compeltar este campo con tu email'),

    body('nombre').notEmpty().withMessage('El nombre de usuario es obligatorio.'),
    body('contrasenia').isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.')
];

router.get("/register", usersController.register);
router.post("/register",validationsRegister, usersController.store);
router.get("/login", usersController.login);
router.post("/login",validationsRegister, usersController.login);
//cambiar validationsRegister por login//
router.post("/logout", usersController.logout);


  

module.exports = router;

