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

   
    search: function(req, res) {
        let search = req.query.search;
    
        let filtrado = {
            where: {
                nombreProduct: { [op.like]: "%" + search + "%" }
            }
        };
    
        db.Producto.findAll(filtrado)
        .then((result) => {
            return res.render("search-results", {productos : result})
            return res.send(result);
        }).catch((err) => {
            return console.log(err);
        });
    }
    
}

module.exports = indexController;
