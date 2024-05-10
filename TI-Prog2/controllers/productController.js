const db = require('../database/models');

const productController = {
    index: function(req, res, next) {
        const productId = req.params.id; 
        
        db.Producto.findByPk(productId, { include: 'comentarios' }) //agrego la captura de comentarios
        .then(function(producto) {
            if (!producto) {
                return res.status(404).send('Producto no encontrado');
            }
            res.render('product', { producto: producto });
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send('Error al obtener el producto');
        });
    },

    newProd: function(req, res) {
        res.render("product-add", {db: db});
    }
}

module.exports = productController;
