const db = require('../database/models');

const productController = {
    index: function(req, res, next) {
        const productId = req.params.id; 

        const producto = db.productos.find(producto => producto.id === productId);

        res.render('product', { producto: producto });
    },

    newProd: function(req, res) {
        res.render("product-add", {db:db});
    }
}

module.exports = productController;
