const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const usersController = {
    
    loginGet: function(req,res){
        if(req.session.user != undefined){
            res.redirect('/')
        } else{
            res.render('login', {error:null})
        }
    },

    login: function(req, res){
        let {email, contrasenia, rememberMe} = req.body
    
        db.User.findOne({
            where:{
                email:email
            },
            raw:true
        })
        
        .then(function(resultados){
            if(resultados != null){
            let comparacionContra = bcrypt.compareSync(contrasenia, resultados.contrasenia)
            if(comparacionContra){
                req.session.user  = {
                    id: resultados.id,
                    nombre: resultados.nombre,
                    email:resultados.email
                }
                if(rememberMe === 'on'){
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
            }else{
                res.redirect('/users/register')
            }
        }else{
            res.redirect('/users/register')
        }
        })
        .catch(function(err){
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
        let idUser =req.params.clienteId;
        const filtro = {
          include: [
            {association: 'productos'}, 
            {association:'comentarios'}],
          
      }
      db.Usuario.findByPk(idUser, filtro)
      .then((results) => {
        let condition = false;
        if (req.session.user != undefined && req.session.usuario.clienteId == results.clienteId){
          condition = true;
        }
        return res.render("profile", {perfil: results, condition: condition, usuarioProducto: results.usuarioProducto, usuarioComentario: results.usuarioComentario});
      }).catch((err) => {
          return console.log(err);
      });   
      },        

    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie("userId");
        return res.redirect("/");
    }
};

module.exports = usersController;




