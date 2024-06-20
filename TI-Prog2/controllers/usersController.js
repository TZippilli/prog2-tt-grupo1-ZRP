const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {

    loginGet: function (req, res) {
        if (req.session.user != undefined) {
            res.redirect('/')
        } else {
            res.render('login', { error: null })
        }
    },

    login: function (req, res) {
        let { email, contrasenia, rememberMe } = req.body

        db.User.findOne({
            where: {
                email: email
            },
            raw: true
        })

            .then(function (resultados) {
                if (resultados != null) {
                    let comparacionContra = bcrypt.compareSync(contrasenia, resultados.contrasenia)
                    if (comparacionContra) {
                        req.session.user = {
                            id: resultados.id,
                            nombre: resultados.nombre,
                            email: resultados.email
                        }
                        if (rememberMe === 'on') {
                            res.cookie(
                                'rememberUser',
                                {
                                    id: clientes.id,
                                },
                                {
                                    maxAge: 1000 * 60 * 15
                                }
                            )
                        }

                        res.redirect("/") //revisar
                    } else {
                        res.redirect('/users/register')
                    }
                } else {
                    res.redirect('/users/register')
                }
            })
            .catch(function (err) {
                console.log(err)
            })
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
                    return res.redirect("/")
                }).catch((err) => {
                    return console.log(err);
                });

        } else {
            return res.render("register", { errors: errors.mapped, old: req.body });
        }
    },

    profileEdit: function (req, res, next) {
        return res.render("profile-edit", { db: db });
    },

    profile: function (req, res) {
        let idUsuario = req.params.id;
        let relaciones = { include: [{ association: 'productos' }, { association: 'comentarios' }] };
    
        db.User.findByPk(idUsuario, relaciones)
            .then(function (result) {
                if (result) {
                    res.render('profile', {
                        user: result,
                    });
                } else {
                    res.status(404).send('Usuario no encontrado');
                }
            })
            .catch(function (err) {
                console.log(err);
                res.status(500).send('Error en el servidor');
            });
    },
    
    
    


    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/");
    }
};

module.exports = usersController;




