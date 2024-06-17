const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {
    loginGet: function (req, res) {
        if (req.session.user){
          res.redirect('/')
        }
        else {
          res.render('login', {error:null})
        }
      },
      
    
    
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
        let form = req.body;
        if (errors.isEmpty()) {
            let userPrueba = {
                nombre: form.nombre,
                email: form.email,
                contrasenia: bcrypt.hashSync(form.contrasenia, 10),
                fechaNacimiento: form.fechaNacimiento,
                numeroDocumento: form.numeroDocumento,
                foto: form.foto,
            };
            db.User.create(userPrueba)
                .then((result) => {
                    req.session.user = result;
                    return res.redirect ("/") 
                }).catch((err) => {
                    return console.log(err);
                });
        
        } else {
            return res.render ("register", {errors: errors.mapped, old: req.body});
        }
    },
    
    profileEdit: function (req, res, next) {
        res.render("profile-edit", { db: db });
    },

    profile: function (req, res, next) {
        res.render("profile", { db: db });
    },

    register: function (req, res, next) {
        if (req.session.user != undefined) {
            return res.redirect("/");
        } else {
            return res.render("register", {
                old: {},
                errors: {}
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




