const db = require('../database/models');

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
        db.Producto.findByPk (id)
        .then (function (result) {
            return res.render ("product-edit", {productos: result})
        }) .catch(function (err) {
            console.log (err)
        })
    },

    detalle: function (req, res) {
        let idProduct = req.params.id;
    
        db.Producto.findByPk(idProduct)
          .then((result) => {
            return res.render("product", { productos: result });
          }).catch((err) => {
            return console.log(err);
          });
      },
      showFormCreate: function (req, res) {
        return res.render("product-edit");
      },
      showFormUpdate: function (req, res) {
        let idProduct = req.params.id;
    
        db.Producto.findByPk(idProduct)
          .then((result) => {
            return res.render("product-edit", { productos: result })
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
    
        db.Producto.create(form)
          .then((result) => {
            return res.redirect("/product")
          }).catch((err) => {
            return console.log(err);
          });
    
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
