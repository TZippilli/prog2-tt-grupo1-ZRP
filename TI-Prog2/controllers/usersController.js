const db = require('../database/models');
const bcrypt = require("bcryptjs")
const {validationResult}=require("express-validator")


const usersController = {
    login: function (req, res, next) {
        res.render('login');
        let filtro = {
            where: [{ email: form.email }]
        };

        db.User.findOne(filtro)
            .then((result) => {
                if (result != null) {
                    req.session.user = result;

                    if (form.recordarme != undefined) {
                        res.cookie("userId", result.id, { maxAge: 1000 * 60 * 35 })
                    }

                    req.session.user = result;
                    return res.redirect("/product");
                } else {
                    return res.send("No hay mails parecidos a: " + form.email);
                }

            }).catch((err) => {
                return console.log(err);
            })
    },

    store: (req,res)=> {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let form = req.body;
            let user {
                name: form.nombre, //coregir
                email: form.email,
                password: bcrypt.hashSync(form.password, 10)
            }

            db.User.create(user)
                .then((result) => {
                    return res.redirect("/login");
                }).catch((err) => {
                    return console.log(err);
                });


        } else{
            return res.render("register",{ //no tenemos registerUser, ver como lo adaptamos a lo nuestro
                errors:errors.mapped(),
                old: req.body
            })



        }

            
    }
    profileEdit: function (req, res, next) {
        res.render("profile-edit", { db: db });
    },

    profile: function (req, res, next) {
        res.render("profile", { db: db });
    },

    register: function (req, res, next) {
        res.render("register");

        if (req.session != undefined) {
            return res.redirect("/");
        } else {
            return res.render("register")
        }

    },
     
    logout: function(req, res) {
        req.session.destroy();
        res.clearCookies("userId");
        return res.redirect("/");
    }
    
};

module.exports = usersController;
