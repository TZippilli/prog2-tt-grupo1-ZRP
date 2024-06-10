const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {
    login: function (req, res, next) {
        if (req.session.user !== undefined) {
            return res.redirect("/users/profile/id/" + req.session.user.id);
        } else {
            return res.render('login', { title: "Login" });
        }


    },

    loginUser: function (req, res, next) {
        let form = req.body;
        let filtro = { where: { email: form.email } };

        db.User.findOne(filtro)
            .then((result) => {
                if (result != null && bcrypt.compareSync(form.password, result.password)) {
                    req.session.user = result;

                    if (form.recordarme !== undefined) {
                        res.cookie("userId", result.id, { maxAge: 1000 * 60 * 35 });
                    }

                    return res.redirect("/product");
                } else {
                    return res.send("No hay mails parecidos a: " + form.email);
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
                name: form.nombre,
                email: form.email,
                password: bcrypt.hashSync(form.contrasenia, 10),
                fechaNacimiento: form.fechaNacimiento,
                numeroDocumento: form.numeroDocumento,
                foto: form.foto
            };

            db.User.create(user)
                .then((result) => {
                    return res.redirect("/");
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
        if (req.session.user !== undefined) {
            return res.redirect("/");
        } else {
            return res.render("register");
        }
    },

    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/");
    }
};

module.exports = usersController;