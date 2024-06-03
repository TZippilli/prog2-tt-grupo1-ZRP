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
            return res.render ("product-add", {productos: result})
        }) .catch(function (err) {
            console.log (err)
        })
    },

    create: function(req, res) {
        db.Usuario.findOne()
            .then(function(results){
                return res.render('product-add', {usuario: results});
            })
            .catch(function(err){
                console.log(err);
            });
    },
    store: function(req, res) {
        let form = req.body;
        db.Producto.create(form)
        .then((result) => {
            return res.redirect("/")
        }).catch((err) => {
          return console.log(err);
        });
    }
    
}

module.exports = productController;
