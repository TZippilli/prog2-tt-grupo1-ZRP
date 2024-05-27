const db = require('../database/models');

const productController = {
    index: function (req, res, next) {


        const productId = req.params.id;

        let criterio = {
            include: [
                {association: "productComentario"},
                {association: ""}
            ]
        }

        db.Producto.findByPk(productId, criterio)
            .then(function (producto) {

                res.render('product', { producto: producto, comentarios: [] });
            })
            .catch(function (error) {
                return console.log(error);
            });
    },

    newProd: function (req, res) {
        res.render("product-add", { db: db });
    }
    
}

module.exports = productController;
