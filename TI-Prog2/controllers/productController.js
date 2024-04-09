const productController = {
    index: function(req, res, next) {
        res.render('product');
    },

    newProd: function(req, res) {
        res.render("product-add");
    }

}

module.exports = productController