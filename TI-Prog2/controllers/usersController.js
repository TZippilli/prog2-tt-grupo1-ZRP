const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {
    login: function (req, res, next) {
        res.render('login');

        const filtro = {
            where: { email: req.body.email }
        };

        db.User.findOne(filtro)
            .then((result) => {
                if (result) {
                    if (bcrypt.compareSync(req.body.password, result.contrasenia)) {
                        req.session.user = result;

                        if (req.body.recordarme) {
                            res.cookie("userId", result.id, { maxAge: 1000 * 60 * 35 });
                        }

                        return res.redirect("/product");
                    } else {
                        return res.send("Contraseña incorrecta");
                    }
                } else {
                    return res.send("No hay usuario registrado con el email: " + req.body.email);
                }
            }).catch((err) => {
                return console.log(err);
            });
    },

    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let form = req.body;
            let user = {
                nombre: form.nombre,
                email: form.email,
                contrasenia: bcrypt.hashSync(form.contrasenia, 10),
                fecha: form.fecha,
                numeroDocumento: form.numeroDocumento,
                foto: form.foto,
                createdAt: new Date()
            };
    
            db.User.create(user)
                .then(() => {
                    return res.redirect("/login");
                }).catch((err) => {
                    return console.log(err);
                });
        } else {
            return res.render("register", {
                errors: errors.mapped(),
                old: req.body
            });
        }
    },
    
    profileEdit: function (req, res, next) {
        res.render("profile-edit", { db: db });
    },

    profile: function (req, res, next) {
        res.render("profile", { db: db });
    },

    register: function (req, res, next) {
        if (req.session.user) {
            return res.redirect("/");
        } else {
            return res.render("register", {
                errors: {},
                old: {}
            });
        }
    },        

    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/");
    }
};

module.exports = usersController;
