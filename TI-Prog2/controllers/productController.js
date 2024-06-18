const { Association } = require('sequelize');
const db = require('../database/models');
const { validationResult } = require('express-validator');

const productController = {
    index: function (req, res, next) {


        const productId = req.params.id;

//        let criterio = {
  //          include: [
  //              {association: "productComentario"},
   //             {association: ""}
  //          ]
   //     }

        db.Producto.findByPk(productId) //agregar ,criterio NO FUNCIONA
            .then(function (producto) {

                res.render('product', { producto: producto, comentarios: [] });
            })
            .catch(function (error) {
                return console.log(error);
            });
    },

    editProd: function (req, res) {
        let id = req.params.id
        let filtro = {
            include: [
                {association: "productoUsuario"}
              ]
        }
        db.Producto.findByPk (id, filtro)
        .then (function (result) {
            return res.render ("product-edit", {productos: result})
        }) .catch(function (err) {
            console.log (err)
        })
    },

    editProdForm: function(req, res) {
        let form = req.body;
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            let filtradoEdit = {
                include: [
                  {association: "productoUsuario"}
                ]
            };

            db.Producto.findByPk(req.params.id, filtradoEdit)
                .then((resultados) => {
                    return res.render('product-edit', {
                        errors: errors.array(),
                        old: req.body,
                        productFind: resultados
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).send('Error');
                });
        } else {
            let filtroSession= {
                where: { id: req.params.id }
            };

            if (req.session.user) {
                db.Producto.update(form, filtroSession)
                    .then(() => {
                        return res.redirect("/product/id/" + req.params.id);
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).send('Error');
                    });
            } else {
                return res.redirect("/users/profile/id/" + req.params.id);
            }
        }
    },

    detalle: function (req, res) {
        let idProduct = req.params.idProduct;

        const filtro = {
            include: [{
                association: 'productoComentario', 
                include: [{ association: 'comentarioUsuario' }]
            }, {
                association: 'productoUsuario'
            }],
            order: [
                ["productoComentario", "createdAt", "DESC"]
            ]
        }

        db.Producto.findByPk(idProduct, filtro)
          .then((result) => {
            return res.render("product", { productFind: result });
          }).catch((err) => {
            return console.log(err);
          });
        },
    create: function (req, res) {
        db.Usuario.findOne()
    
        if (req.session.user != undefined) {
          id = req.session.user.id;
        }
        else if (req.cookies.userId != undefined) {
          id = req.cookies.userId;
        }
        else {
          return res.redirect("/users/login");
        }
    
        db.Usuario.findByPk(id)
          .then(function (results) {
            return res.render('product-add', { title: "Add Product", usuario: results });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    
    store: function (req, res) {
        let form = req.body;
        let errors = validationResult(req);
    
        if (errors.isEmpty()) {
            db.Producto.create(form)
                .then((results) => {
                    return res.redirect("/product");
                })
                .catch((err) => {
                    return console.log(err);
                });
        } else {
            return res.render('product-add', { errors: errors.mapped(), old: req.body });
        }
    
      },

    update: function (req, res) {
        let form = req.body;
        let filtrado = {
          where: {
            id: form.id
          }
        }
    
        db.Producto.update(form, filtrado)
          .then((result) => {
            return res.redirect("/product/id/" + form.id)
          }).catch((err) => {
            return console.log(err);
          });
    
      },
    destroy: function (req, res) {
        let form = req.body;
    
        let filtrado = {
          where: {
            id: form.id
          }
        }
    
        db.Producto.destroy(filtrado)
          .then((result) => {
            return res.redirect("/product/");
          }).catch((err) => {
            return console.log(err);
          });
    
      }
    
    }
    


module.exports = productController;
