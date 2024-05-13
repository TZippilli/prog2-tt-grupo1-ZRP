const db = require('../database/models');

const productController = {
    index: function (req, res, next) {
        const productId = req.params.id;

        db.Producto.findByPk(productId)
            .then(function (producto) {
                res.render('product', { producto: producto });
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
