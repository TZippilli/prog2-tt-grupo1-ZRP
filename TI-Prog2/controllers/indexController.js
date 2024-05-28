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

        
    },



    /* REVISAR CLASE CRUD
    detalle: function(req, res) {
        let idProduct = req.params.id;
  
        db.Producto.findByPk(idProduct)
        .then((result) => {
          return res.render("product", {productos: result});
        }).catch((err) => {
          return console.log(err);
        });
      },
      showFormCreate: function(req,res) {
        return res.render("product-add");
      },
      showFormUpdate: function(req,res) {
        let idProduct = req.params.id;
  
        db.Producto.findByPk(idProduct)
        .then((result) => {
            return res.render("updateMovie", {movie : result})  
        }).catch((err) => {
          return console.log(err);
        });
  
      },
      
      store: function(req, res) {
        let form = req.body;
  
        db.Producto.create(form)
        .then((result) => {
            return res.redirect("/product")
        }).catch((err) => {
          return console.log(err);
        });
        
  
       
      },
      update: function(req, res) {
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
      delete: function(req, res) {
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
    */
}

module.exports = indexController;
