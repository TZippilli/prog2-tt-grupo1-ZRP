const db = require('../database/models');

// explicación en clase para buscar los titulos
const op = db.Sequelize.Op;

const indexController = {
    index: function (req, res, next) {
        db.Producto.findAll()
            .then(function (resultados) {
                return res.render("index", { productos: resultados });
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    search: function (req, res) {
        res.render("search-results", { db: db });
    }
}

module.exports = indexController;
